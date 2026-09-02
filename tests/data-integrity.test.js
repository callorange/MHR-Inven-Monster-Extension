import test from 'node:test';
import assert from 'node:assert/strict';
import { monstersData, defaultMonster } from '../src/content/monsters.data.js';

test('Monsters dataset exports validation', () => {
  assert.ok(Array.isArray(monstersData), 'monstersData should be an array');
  assert.ok(monstersData.length > 0, 'monstersData should not be empty');
  assert.ok(defaultMonster && typeof defaultMonster === 'object', 'defaultMonster should be an object');
});

test('Monsters data should not have duplicate names', () => {
  const names = new Set();
  const duplicates = [];
  for (const m of monstersData) {
    if (names.has(m.name)) {
      duplicates.push(m.name);
    }
    names.add(m.name);
  }
  assert.deepEqual(duplicates, [], `Duplicate monster names found: ${duplicates.join(', ')}`);
  assert.equal(names.size, monstersData.length, 'Unique name count must equal total monster count');
});

test('Every monster name should be a non-empty string', () => {
  for (const m of monstersData) {
    assert.equal(typeof m.name, 'string', 'Monster name must be a string');
    assert.ok(m.name.trim().length > 0, 'Monster name must not be empty');
  }
});

test('Monsters anomaly levels should be in range 0-9', () => {
  for (const m of monstersData) {
    assert.ok(m.anomaly && typeof m.anomaly === 'object', `${m.name} should have an anomaly object`);
    assert.ok(
      Number.isInteger(m.anomaly.level) && m.anomaly.level >= 0 && m.anomaly.level <= 9,
      `${m.name} has invalid anomaly level: ${m.anomaly?.level}`
    );
    assert.equal(typeof m.anomaly.afflicted, 'string', `${m.name} anomaly.afflicted should be a string`);
  }
});

test('Monsters anti-skill properties should be valid booleans', () => {
  const antiProps = ['aerial', 'dragon', 'aquatic', 'franged', 'small'];
  for (const m of monstersData) {
    assert.ok(m.anti && typeof m.anti === 'object', `${m.name} should have an anti object`);
    for (const prop of antiProps) {
      assert.equal(
        typeof m.anti[prop],
        'boolean',
        `${m.name} anti.${prop} should be a boolean, got ${typeof m.anti[prop]}`
      );
    }
  }
});

test('Monsters element field should follow valid element specifications', () => {
  const validElements = new Set(['화', '수', '뇌', '빙', '용']);
  for (const m of monstersData) {
    assert.equal(typeof m.element, 'string', `${m.name} element should be a string`);
    if (m.element.trim().length > 0) {
      const parts = m.element.split(',').map(e => e.trim());
      for (const part of parts) {
        assert.ok(
          validElements.has(part),
          `${m.name} contains invalid element: '${part}' in '${m.element}'`
        );
      }
    }
  }
});

test('Monsters elembane field should be an array', () => {
  for (const m of monstersData) {
    assert.ok(Array.isArray(m.elembane), `${m.name} elembane should be an array`);
    assert.ok(m.elembane.length > 0, `${m.name} elembane should not be empty`);
    for (const val of m.elembane) {
      assert.ok(
        typeof val === 'number' || typeof val === 'boolean',
        `${m.name} elembane value should be a number or boolean, got ${typeof val}`
      );
    }
  }
});

test('Default monster structure matches specification', () => {
  assert.equal(defaultMonster.name, '');
  assert.deepEqual(defaultMonster.anomaly, { level: 0, afflicted: '' });
  assert.deepEqual(defaultMonster.anti, {
    aerial: false,
    dragon: false,
    aquatic: false,
    franged: false,
    small: true,
  });
  assert.equal(defaultMonster.element, '');
  assert.deepEqual(defaultMonster.elembane, [false]);
  assert.equal(defaultMonster.comment, '');
});
