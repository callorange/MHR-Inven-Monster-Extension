import test from 'node:test';
import assert from 'node:assert/strict';
import { FilterManager, createFilterManager } from '../src/content/filter-state.js';
import { monstersData } from '../src/content/monsters.data.js';
import { common } from '../src/content/common.js';

test('common object should provide null safety when DOM is absent', () => {
  assert.ok(common, 'common object should be defined');
  assert.strictEqual(typeof common.isReady, 'boolean');
  assert.strictEqual(typeof common.func.checkApexElement, 'function');
  assert.strictEqual(common.func.checkApexElement(null), false);
  assert.strictEqual(common.func.checkApexElement({}), false);
  assert.strictEqual(common.func.checkApexElement({ dataset: {} }), false);
  assert.strictEqual(common.func.checkApexElement({ dataset: { name: '리오레이아' } }), false);
  assert.strictEqual(common.func.checkApexElement({ dataset: { name: '주인 리오레이아' } }), true);
});

test('FilterManager initializes with empty state', () => {
  const fm = new FilterManager();
  const state = fm.getState();

  assert.strictEqual(state.exLevel, null);
  assert.strictEqual(state.exMaterial, null);
  assert.strictEqual(state.rawKeyword, '');
  assert.deepEqual(state.parsedKeywords, []);
});

test('FilterManager handles setExLevel and toggle behavior', () => {
  const fm = createFilterManager();

  fm.setExLevel('5');
  assert.strictEqual(fm.getState().exLevel, '5');

  // Passing same level toggles to null
  fm.setExLevel('5');
  assert.strictEqual(fm.getState().exLevel, null);

  // Number input and EX prefix normalization
  fm.setExLevel(3);
  assert.strictEqual(fm.getState().exLevel, '3');

  fm.setExLevel('EX3');
  assert.strictEqual(fm.getState().exLevel, null); // toggled off since '3' === '3'

  fm.setExLevel('EX7');
  assert.strictEqual(fm.getState().exLevel, '7');

  // Explicit null / empty string
  fm.setExLevel(null);
  assert.strictEqual(fm.getState().exLevel, null);

  fm.setExLevel('');
  assert.strictEqual(fm.getState().exLevel, null);
});

test('FilterManager handles setExMaterial and toggle behavior', () => {
  const fm = new FilterManager();

  fm.setExMaterial('견골');
  assert.strictEqual(fm.getState().exMaterial, '견골');

  // Passing same material toggles to null
  fm.setExMaterial('견골');
  assert.strictEqual(fm.getState().exMaterial, null);

  fm.setExMaterial('흉비늘');
  assert.strictEqual(fm.getState().exMaterial, '흉비늘');

  // Change to different material
  fm.setExMaterial('중용골');
  assert.strictEqual(fm.getState().exMaterial, '중용골');

  // Explicit null
  fm.setExMaterial(null);
  assert.strictEqual(fm.getState().exMaterial, null);

  fm.setExMaterial('');
  assert.strictEqual(fm.getState().exMaterial, null);
});

test('FilterManager handles setKeyword and parsed keywords', () => {
  const fm = new FilterManager();

  fm.setKeyword('가란/디아, 레이아!');
  const state = fm.getState();
  assert.strictEqual(state.rawKeyword, '가란/디아, 레이아!');
  assert.deepEqual(state.parsedKeywords, [
    { name: '가란', isNormalOnly: false, isVariantOnly: false, isApexOnly: false },
    { name: '디아', isNormalOnly: false, isVariantOnly: false, isApexOnly: false },
    { name: '레이아', isNormalOnly: true, isVariantOnly: false, isApexOnly: false },
  ]);

  fm.setKeyword('');
  assert.strictEqual(fm.getState().rawKeyword, '');
  assert.deepEqual(fm.getState().parsedKeywords, []);

  // Non-string keyword
  fm.setKeyword(null);
  assert.strictEqual(fm.getState().rawKeyword, '');
});

test('FilterManager resetAll resets all filter states', () => {
  const fm = new FilterManager();
  fm.setExLevel('4');
  fm.setExMaterial('견골');
  fm.setKeyword('레이아@');

  fm.resetAll();
  const state = fm.getState();
  assert.strictEqual(state.exLevel, null);
  assert.strictEqual(state.exMaterial, null);
  assert.strictEqual(state.rawKeyword, '');
  assert.deepEqual(state.parsedKeywords, []);
});

test('FilterManager getState returns a defensive snapshot', () => {
  const fm = new FilterManager();
  fm.setKeyword('레이아!');

  const state1 = fm.getState();
  state1.parsedKeywords.push({ name: '해킹', isNormalOnly: false, isVariantOnly: false, isApexOnly: false });

  const state2 = fm.getState();
  assert.strictEqual(state2.parsedKeywords.length, 1);
  assert.strictEqual(state2.parsedKeywords[0].name, '레이아');
});

test('FilterManager evaluateRow with sample monster dataset', () => {
  const fm = new FilterManager();

  const dataset = [
    { name: '리오레이아', anomalyLevel: '2', anomalyAfflicted: '용골/견룡골/중용골' },
    { name: '리오레이아 아종', anomalyLevel: '0', anomalyAfflicted: '' },
    { name: '리오레이아 희소종', anomalyLevel: '7', anomalyAfflicted: '흉이빨/흉이빨+/흉중어금니' },
    { name: '주인 리오레이아', anomalyLevel: '8', anomalyAfflicted: '(용골)/(견룡골)/(중룡골)' },
    { name: '쿠루루야크', anomalyLevel: '1', anomalyAfflicted: '가죽/가죽+/두툼가죽' },
    { name: '가란고르무', anomalyLevel: '5', anomalyAfflicted: '흉뼈/흉견골/흉중골' },
    { name: '디아블로스', anomalyLevel: '6', anomalyAfflicted: '흉갑각/흉견갑각/흉중갑각' },
  ];

  // 1. Initial: all pass
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '리오레이아', '리오레이아 아종', '리오레이아 희소종', '주인 리오레이아', '쿠루루야크', '가란고르무', '디아블로스'
  ]);

  // 2. EX Level Filter Only
  fm.setExLevel('2');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['리오레이아']);

  fm.setExLevel('7');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['리오레이아 희소종']);

  fm.setExLevel('9');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), []);

  fm.resetAll();

  // 3. Anomaly Material Filter Only
  fm.setExMaterial('중용골');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['리오레이아']);

  fm.setExMaterial('두툼가죽');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['쿠루루야크']);

  fm.setExMaterial('흉견골');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['가란고르무']);

  fm.setExMaterial('존재하지않는소재');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), []);

  fm.resetAll();

  // 4. Keyword Filter with Modifiers Only
  // 4.1 Base keyword search
  fm.setKeyword('레이아');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '리오레이아', '리오레이아 아종', '리오레이아 희소종', '주인 리오레이아'
  ]);

  // 4.2 Normal only (!)
  fm.setKeyword('레이아!');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['리오레이아']);

  // 4.3 Variant / Rare only (@)
  fm.setKeyword('레이아@');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '리오레이아 아종', '리오레이아 희소종'
  ]);

  // 4.4 Apex only (#)
  fm.setKeyword('레이아#');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['주인 리오레이아']);

  // 4.5 Multi-keyword search (/)
  fm.setKeyword('가란/디아');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '가란고르무', '디아블로스'
  ]);

  // 4.6 Standalone modifier search (!, @, #)
  fm.setKeyword('!');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '리오레이아', '쿠루루야크', '가란고르무', '디아블로스'
  ]);

  fm.setKeyword('@');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), [
    '리오레이아 아종', '리오레이아 희소종'
  ]);

  fm.setKeyword('#');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['주인 리오레이아']);

  fm.resetAll();

  // 5. Complex Combined Filter (EX Level + Keyword / Material)
  fm.setExLevel('7');
  fm.setKeyword('레이아@');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['리오레이아 희소종']);

  // Level matches but keyword variant does not match
  fm.setExLevel('2');
  fm.setKeyword('레이아@');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), []);

  // Level + Material + Keyword
  fm.setExLevel('5');
  fm.setExMaterial('흉뼈');
  fm.setKeyword('가란');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), ['가란고르무']);

  // Level + Wrong Material + Keyword
  fm.setExMaterial('흉비늘');
  assert.deepEqual(dataset.filter(row => fm.evaluateRow(row)).map(r => r.name), []);
});

test('FilterManager evaluateRow handles invalid inputs safely', () => {
  const fm = new FilterManager();
  assert.strictEqual(fm.evaluateRow(null), false);
  assert.strictEqual(fm.evaluateRow(undefined), false);
  assert.strictEqual(fm.evaluateRow({}), true); // matches all when no filters active
});

test('FilterManager evaluateRow supports DOM-like element with dataset', () => {
  const fm = new FilterManager();
  fm.setExLevel('5');

  const mockElement = {
    dataset: {
      name: '가란고르무',
      anomalyLevel: '5',
      anomalyAfflicted: '흉뼈/흉견골/흉중골',
    },
  };

  assert.strictEqual(fm.evaluateRow(mockElement), true);

  fm.setExLevel('6');
  assert.strictEqual(fm.evaluateRow(mockElement), false);
});

test('FilterManager apply updates row display and notifies subscribers', () => {
  const fm = new FilterManager();

  const mockRows = [
    { dataset: { name: '리오레이아', anomalyLevel: '2', anomalyAfflicted: '용골/견룡골/중용골' }, style: { display: '' } },
    { dataset: { name: '쿠루루야크', anomalyLevel: '1', anomalyAfflicted: '가죽/가죽+/두툼가죽' }, style: { display: '' } },
    { dataset: { name: '가란고르무', anomalyLevel: '5', anomalyAfflicted: '흉뼈/흉견골/흉중골' }, style: { display: '' } },
  ];

  let subscriberEvents = [];
  const unsubscribe = fm.onStateChange((event) => {
    subscriberEvents.push(event);
  });

  // Adding an error-throwing listener should not prevent other listeners or crash
  fm.subscribe(() => {
    throw new Error('Listener error test');
  });

  fm.setExLevel('1');
  const visibleCount = fm.apply(mockRows);

  assert.strictEqual(visibleCount, 1);
  assert.strictEqual(mockRows[0].style.display, 'none');
  assert.strictEqual(mockRows[1].style.display, 'table-row');
  assert.strictEqual(mockRows[2].style.display, 'none');

  assert.strictEqual(subscriberEvents.length, 1);
  assert.strictEqual(subscriberEvents[0].visibleCount, 1);
  assert.strictEqual(subscriberEvents[0].exLevel, '1');

  // Unsubscribe test
  unsubscribe();
  fm.resetAll();
  fm.apply(mockRows);
  assert.strictEqual(subscriberEvents.length, 1, 'Subscriber should not receive events after unsubscribe');
  assert.strictEqual(mockRows[0].style.display, 'table-row');
  assert.strictEqual(mockRows[1].style.display, 'table-row');
  assert.strictEqual(mockRows[2].style.display, 'table-row');
});

test('FilterManager evaluates real monstersData correctly', () => {
  const fm = new FilterManager();

  // EX 9 monsters in real data
  fm.setExLevel('9');
  const ex9Monsters = monstersData.filter(m => fm.evaluateRow({
    name: m.name,
    anomalyLevel: m.anomaly.level,
    anomalyAfflicted: m.anomaly.afflicted,
  }));

  assert.ok(ex9Monsters.length > 0, 'Should find EX9 monsters in dataset');
  for (const m of ex9Monsters) {
    assert.strictEqual(m.anomaly.level, 9);
  }

  // Apex monsters (#)
  fm.resetAll();
  fm.setKeyword('#');
  const apexMonsters = monstersData.filter(m => fm.evaluateRow({
    name: m.name,
    anomalyLevel: m.anomaly.level,
    anomalyAfflicted: m.anomaly.afflicted,
  }));

  assert.ok(apexMonsters.length > 0, 'Should find Apex monsters in dataset');
  for (const m of apexMonsters) {
    assert.ok(m.name.includes('주인'), `Monster ${m.name} should include '주인'`);
  }
});
