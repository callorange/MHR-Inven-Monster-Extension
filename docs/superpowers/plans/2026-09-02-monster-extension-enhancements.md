# MHR-Inven-Monster-Extension Comprehensive Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MHR-Inven-Monster-Extension의 Manifest V3 표준 준수, 미사용 권한 제거, CSS/데이터 모듈 분리, 통합 필터링 파이프라인 구축, 괴이 매트릭스 접기/펼치기 UI 및 단위 테스트 스위트를 완성합니다.

**Architecture:** 
1. 정적 몬스터 데이터(`monsters.data.js`)와 DOM 바인딩 로직(`monsters.js`)을 분리합니다.
2. 독립된 통합 필터 상태 관리자(`filter-state.js`)를 중심으로 괴이 매트릭스 필터와 이름 검색어 필터를 단일 파이프라인으로 통합 평가합니다.
3. 인라인 CSS를 `src/content/ui.css`로 분리하고, 표준 아이콘 에셋을 추가하여 Manifest V3 구조를 최적화합니다.
4. Node.js 내장 테스트 러너(`node --test`)로 제로 디펜던시 단위 테스트를 구축합니다.

**Tech Stack:** Vanilla JavaScript (ES6+), Chrome Extension Manifest V3, Node.js Test Runner

**Spec:** `docs/superpowers/specs/2026-09-02-monster-extension-enhancements-design.md`

## Global Constraints

- 순수 JavaScript (ES6+) 및 Chrome Extension Manifest V3 표준을 엄격 준수한다.
- 런타임 외부 종속성 없이 경량 Content Script 아키텍처를 유지한다.
- 인벤 기존 몬스터 페이지(`https://mhf.inven.co.kr/dataninfo/mhr/monster/`)의 DOM 구조와 완벽히 호환되어야 한다.

---

### Task 1: 테스트 환경 구축 및 검색 쿼리 파서 / 데이터 무결성 단위 테스트

**Files:**
- Create: `tests/search-parser.test.js`
- Create: `tests/data-integrity.test.js`
- Create: `src/content/search-parser.js`

**Interfaces:**
- Consumes: Node.js `node:test`, `node:assert/strict`
- Produces: `parseQuery(rawKeyword)` -> `{ baseKeywords: string[], isNormalOnly: boolean, isVariantOnly: boolean, isApexOnly: boolean }`

- [ ] **Step 1: Write failing unit test for search query parser**

```javascript
// tests/search-parser.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuery, splitQueryKeywords } from '../src/content/search-parser.js';

test('splitQueryKeywords splits by slash and comma', () => {
  assert.deepEqual(splitQueryKeywords('가란/디아, 레이아'), ['가란', '디아', '레이아']);
  assert.deepEqual(splitQueryKeywords(''), []);
});

test('parseQuery parses modifiers correctly', () => {
  // 일반종만
  assert.deepEqual(parseQuery('레이아!'), {
    name: '레이아',
    isNormalOnly: true,
    isVariantOnly: false,
    isApexOnly: false,
  });

  // 아종/희소종만
  assert.deepEqual(parseQuery('레이아@'), {
    name: '레이아',
    isNormalOnly: false,
    isVariantOnly: true,
    isApexOnly: false,
  });

  // 주인만
  assert.deepEqual(parseQuery('레이아#'), {
    name: '레이아',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: true,
  });

  // 기본 검색
  assert.deepEqual(parseQuery('고샤하기'), {
    name: '고샤하기',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: false,
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/search-parser.test.js`
Expected: FAIL (Cannot find module `src/content/search-parser.js`)

- [ ] **Step 3: Implement `src/content/search-parser.js`**

```javascript
// src/content/search-parser.js
export function splitQueryKeywords(rawQuery) {
  if (!rawQuery) return [];
  return rawQuery
    .replaceAll(',', '/')
    .split('/')
    .map(k => k.trim())
    .filter(k => k.length > 0);
}

export function parseQuery(keyword) {
  let isNormalOnly = false;
  let isVariantOnly = false;
  let isApexOnly = false;
  let cleanName = keyword.trim();

  if (cleanName.includes('!')) {
    isNormalOnly = true;
    cleanName = cleanName.replaceAll('!', '');
  }
  if (cleanName.includes('@')) {
    isVariantOnly = true;
    cleanName = cleanName.replaceAll('@', '');
  }
  if (cleanName.includes('#')) {
    isApexOnly = true;
    cleanName = cleanName.replaceAll('#', '');
  }

  return {
    name: cleanName.trim(),
    isNormalOnly,
    isVariantOnly,
    isApexOnly,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/search-parser.test.js`
Expected: PASS

---

### Task 2: 몬스터 데이터셋 분리 및 데이터 무결성 테스트

**Files:**
- Create: `src/content/monsters.data.js`
- Modify: `src/content/monsters.js`
- Create: `tests/data-integrity.test.js`

**Interfaces:**
- Consumes: `src/content/monsters.data.js` (exported / window global)
- Produces: `window.__MHR_MONSTERS_DATA__` and dataset properties on `tr` elements

- [ ] **Step 1: Create `src/content/monsters.data.js` and extract 1400+ lines data**

Extract the raw array from `src/content/monsters.js` into `src/content/monsters.data.js` making it available both in ES modules (for tests) and global browser script context.

- [ ] **Step 2: Write data integrity tests in `tests/data-integrity.test.js`**

```javascript
// tests/data-integrity.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { monstersData } from '../src/content/monsters.data.js';

test('Monsters data should not have duplicate names', () => {
  const names = new Set();
  const duplicates = [];
  for (const m of monstersData) {
    if (names.has(m.name)) duplicates.push(m.name);
    names.add(m.name);
  }
  assert.deepEqual(duplicates, [], `Duplicate monster names found: ${duplicates.join(', ')}`);
});

test('Monsters anomaly levels should be in range 0-9', () => {
  for (const m of monstersData) {
    assert.ok(m.anomaly.level >= 0 && m.anomaly.level <= 9, `${m.name} has invalid anomaly level: ${m.anomaly.level}`);
  }
});
```

- [ ] **Step 3: Run data integrity test to verify it passes**

Run: `node --test tests/data-integrity.test.js`
Expected: PASS

- [ ] **Step 4: Refactor `src/content/monsters.js` to consume `monsters.data.js`**

Add debug logging for table row names not found in dataset.

---

### Task 3: DOM Null Safety 및 통합 필터 상태 관리기 (`filter-state.js`)

**Files:**
- Modify: `src/content/common.js`
- Create: `src/content/filter-state.js`

**Interfaces:**
- Consumes: `common.table.body`, `parseQuery`, `splitQueryKeywords`
- Produces: `window.FilterManager` with methods:
  - `setExLevel(level: string | null)`
  - `setExMaterial(item: string | null)`
  - `setKeyword(rawQuery: string)`
  - `resetAll()`
  - `apply()`
  - `onStateChange(callback)`

- [ ] **Step 1: Enhance `src/content/common.js` with Null Safety**

Ensure `common.table.all`, `common.table.body`, `common.form` have safe fallback wrappers so script execution does not crash if Inven HTML changes.

- [ ] **Step 2: Implement `src/content/filter-state.js`**

Implement unified state filtering pipeline that iterates over table rows and evaluates:
`isMatch = matchExLevel && matchExMaterial && matchKeyword;`
Updates visibility (`display: table-row` vs `none`) and emits state change event with `visibleCount`.

---

### Task 4: CSS 분리 (`src/content/ui.css`) 및 UI 폼/테이블 현대화

**Files:**
- Create: `src/content/ui.css`
- Modify: `src/content/ui-form.js`
- Modify: `src/content/ui-table.js`

**Interfaces:**
- Consumes: `ui.css`, `FilterManager`
- Produces: Clean semantic HTML without inline `<style>`, Accordion toggle button for Anomaly matrix, keyboard accessible buttons (`role="button"`, `tabindex="0"`)

- [ ] **Step 1: Create `src/content/ui.css`**

Consolidate all matrix styles, button styles, badges, responsive scroll, and accordion transitions.

- [ ] **Step 2: Update `src/content/ui-form.js`**

- Remove template string `<style>` block.
- Add "괴이 매트릭스 접기/펼치기" (Accordion) toggle button to `#anomaly-control-bar`.
- Connect matrix clicks (`EX1~9`, materials, Reset button) directly to `FilterManager`.
- Add proper ARIA attributes (`aria-pressed`, `aria-label`).

- [ ] **Step 3: Update `src/content/ui-table.js`**

- Replace inline style strings with CSS utility classes defined in `ui.css`.
- Ensure column headers and cells render smoothly with minimal layout shift.

---

### Task 5: 검색창 연동 리팩토링 (`src/content/search.js`)

**Files:**
- Modify: `src/content/search.js`

**Interfaces:**
- Consumes: `FilterManager`, `common.form`
- Produces: Real-time search query dispatching to `FilterManager` on submit and input

- [ ] **Step 1: Refactor `src/content/search.js`**

Connect search form submit and input events to `FilterManager.setKeyword(...)` so that typing or submitting seamlessly filters the list alongside active anomaly filters.

---

### Task 6: Manifest V3 표준화, 권한 정리, 에셋 생성 및 Background Worker

**Files:**
- Modify: `manifest.json`
- Modify: `src/background/background.js`
- Create: `icons/icon-16.png`, `icons/icon-48.png`, `icons/icon-128.png`

**Interfaces:**
- Consumes: Chrome Extension APIs (`chrome.action`, `chrome.tabs`)
- Produces: Compliant Manifest V3 package with no unused permissions

- [ ] **Step 1: Generate crisp PNG icons (16, 48, 128)**

Create standard icon assets using canvas/png scripts and place them in `icons/`.

- [ ] **Step 2: Update `manifest.json`**

- Remove `"storage"` from `permissions`.
- Add `"css": ["src/content/ui.css"]` to `content_scripts`.
- Add `src/content/search-parser.js`, `src/content/monsters.data.js`, `src/content/filter-state.js` in proper order.
- Register `icons` (`16`, `48`, `128`) and `action.default_icon`.

- [ ] **Step 3: Update `src/background/background.js`**

- Improve URL check to handle query parameters and sub-paths safely.
- Explicitly set `setBadgeBackgroundColor({ color: "#be123c", tabId })`.

---

### Task 7: 문서 업데이트 및 전체 자동화 검증

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Run all test suites**

Run: `node --test tests/*.test.js`
Expected: ALL PASS

- [ ] **Step 2: Update `README.md` and `CHANGELOG.md`**

Reflect v1.2.0 features, unified filter architecture, CSS separation, and testing suite.
