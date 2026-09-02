# MHR-Inven-Monster-Extension 종합 개선 설계 명세서 (Design Spec)

- **작성일**: 2026-09-02
- **대상 프로젝트**: MHR-Inven-Monster-Extension (Manifest V3)
- **상태**: 승인됨 (Approved)

---

## 1. 개요 및 목적 (Goal)

몬스터헌터 라이즈 선브레이크 인벤 몬스터 정보 확장 프로그램의 코드 품질, Manifest V3 규약 준수, UI/UX 편의성, 아키텍처 및 무결성 검증을 전면적으로 강화합니다.

---

## 2. 세부 설계 (Specifications)

### 2.1 Manifest V3 표준화 및 권한/에셋 정리
- **권한 최소화**: 코드에서 사용되지 않는 `"storage"` 권한 제거, `"tabs"` 유지
- **스타일시트 분리**: `src/content/ui.css`를 신규 생성하고 `manifest.json`의 `content_scripts.css`에 등록하여 JS 인라인 스타일 제거
- **아이콘 에셋**: 표준 크기(16x16, 48x48, 128x128)의 PNG 아이콘 에셋을 `icons/` 디렉토리에 추가하고 `manifest.json`에 연결
- **Service Worker 안정화**: `src/background/background.js`에서 URL 매칭 시 쿼리 파라미터가 있어도 안정적으로 판정하도록 개선하고, 배지 배경색(`setBadgeBackgroundColor`)을 명시

### 2.2 아키텍처 및 상태 관리 (Unified Filter State)
- **모듈 분리**:
  - `src/content/common.js`: DOM 캐싱, 안전한 탐색(Null Guard), 공통 헬퍼
  - `src/content/monsters.data.js`: 순수 몬스터 메타데이터 분리 (1400+ lines)
  - `src/content/monsters.js`: 테이블 DOM에 데이터셋 바인딩 및 매핑 누락 감지 로깅
  - `src/content/filter-state.js`: 괴이 레벨/소재 필터와 이름 검색어 필터를 단일 파이프라인으로 종합 평가하는 통합 상태 관리자
  - `src/content/ui-form.js`: 괴이 매트릭스 UI 생성 및 접기/펼치기(Accordion), 상태바/카운트 렌더링
  - `src/content/ui-table.js`: 유효속성/특효 렌더링, Ex 뱃지 렌더링
  - `src/content/search.js`: 검색어 파서 및 통합 필터 이벤트 연동
- **필터 파이프라인 로직**:
  - `FilterState = { exLevel: null, exMaterial: null, keywords: [] }`
  - 각 행에 대해 `(exLevelMatch || exLevel == null) && (materialMatch || material == null) && (keywordMatch || keywords.length == 0)` 조건을 일괄 평가하여 `display`를 일관되게 제어

### 2.3 UI/UX 및 접근성 (Accessibility)
- **괴이 매트릭스 접기/펼치기**: 상단 컨트롤바에 Accordion 토글 버튼을 추가하여 필요 시 매트릭스를 접어 화면 공간 확보
- **접근성(a11y)**: 클릭 가능한 요소들에 적절한 버튼 시맨틱, `role="button"`, `tabindex="0"`, `aria-pressed` 적용

### 2.4 데이터 무결성 및 자동화 검증
- Node.js 내장 테스트 러너(`node --test`)를 활용한 무의존성(Zero-dependency) 테스트 스위트 구축:
  - `tests/search-parser.test.js`: 검색 쿼리 파서(`!`, `@`, `#`, `/`) 검증
  - `tests/data-integrity.test.js`: 몬스터 데이터셋 유효성(중복 이름 없음, 필수 필드 존재, 유효한 레벨 범위) 검증

---

## 3. 전역 제약 조건 (Global Constraints)
- 순수 JavaScript (ES6+) 및 Manifest V3 표준 준수
- 외부 런타임 번들러나 무거운 라이브러리 없이 가볍고 빠른 Content Script 구조 유지
- 기존 인벤 웹페이지의 DOM 구조와 완벽히 호환
