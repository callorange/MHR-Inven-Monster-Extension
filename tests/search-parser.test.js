import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuery, splitQueryKeywords } from '../src/content/search-parser.js';

test('splitQueryKeywords splits by slash and comma', () => {
  assert.deepEqual(splitQueryKeywords('가란/디아, 레이아'), ['가란', '디아', '레이아']);
  assert.deepEqual(splitQueryKeywords('벨리오로스 ,  나르가  / 티가'), ['벨리오로스', '나르가', '티가']);
  assert.deepEqual(splitQueryKeywords('가란//디아,, 레이아'), ['가란', '디아', '레이아']);
  assert.deepEqual(splitQueryKeywords(''), []);
  assert.deepEqual(splitQueryKeywords('   '), []);
  assert.deepEqual(splitQueryKeywords(',,, /// ,'), []);
  assert.deepEqual(splitQueryKeywords(null), []);
  assert.deepEqual(splitQueryKeywords(undefined), []);
  assert.deepEqual(splitQueryKeywords(123), []);
});

test('parseQuery parses modifiers correctly', () => {
  // 일반종만 (!)
  assert.deepEqual(parseQuery('레이아!'), {
    name: '레이아',
    isNormalOnly: true,
    isVariantOnly: false,
    isApexOnly: false,
  });
  assert.deepEqual(parseQuery('!레이아'), {
    name: '레이아',
    isNormalOnly: true,
    isVariantOnly: false,
    isApexOnly: false,
  });

  // 아종/희소종만 (@)
  assert.deepEqual(parseQuery('레이아@'), {
    name: '레이아',
    isNormalOnly: false,
    isVariantOnly: true,
    isApexOnly: false,
  });
  assert.deepEqual(parseQuery('@레이아'), {
    name: '레이아',
    isNormalOnly: false,
    isVariantOnly: true,
    isApexOnly: false,
  });

  // 주인만 (#)
  assert.deepEqual(parseQuery('레이아#'), {
    name: '레이아',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: true,
  });
  assert.deepEqual(parseQuery('#레이아'), {
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
  assert.deepEqual(parseQuery('  고샤하기  '), {
    name: '고샤하기',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: false,
  });

  // 복합 수식어 및 엣지 케이스
  assert.deepEqual(parseQuery('!@#'), {
    name: '',
    isNormalOnly: true,
    isVariantOnly: true,
    isApexOnly: true,
  });
  assert.deepEqual(parseQuery(''), {
    name: '',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: false,
  });
  assert.deepEqual(parseQuery(null), {
    name: '',
    isNormalOnly: false,
    isVariantOnly: false,
    isApexOnly: false,
  });
});
