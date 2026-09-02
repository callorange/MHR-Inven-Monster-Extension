import test from 'node:test';
import assert from 'node:assert/strict';
import { FilterManager } from '../src/content/filter-state.js';
import { initSearch } from '../src/content/search.js';

test('initSearch handles absent DOM safely', () => {
  assert.strictEqual(typeof initSearch, 'function');
  const result = initSearch({ common: null });
  assert.strictEqual(result, null);

  const resultNotReady = initSearch({
    common: {
      isReady: false,
      form: null,
    },
  });
  assert.strictEqual(resultNotReady, null);
});

test('initSearch handles form without name input safely', () => {
  const mockForm = {
    querySelector: () => null,
    addEventListener: () => {},
  };
  const result = initSearch({
    common: {
      isReady: true,
      form: mockForm,
    },
  });
  assert.strictEqual(result, null);
});

test('initSearch integrates form submit and input events with FilterManager', () => {
  const fm = new FilterManager();

  let scrolled = false;
  const mockInput = {
    value: '가란/디아, 레이아!',
    events: {},
    addEventListener(event, fn) {
      this.events[event] = fn;
    },
    removeEventListener(event, fn) {
      delete this.events[event];
    },
  };

  const mockForm = {
    events: {},
    querySelector(sel) {
      if (sel === "input[name='name']") return mockInput;
      return null;
    },
    addEventListener(event, fn) {
      this.events[event] = fn;
    },
    removeEventListener(event, fn) {
      delete this.events[event];
    },
    scrollIntoView(options) {
      scrolled = true;
      assert.strictEqual(options.behavior, 'smooth');
      assert.strictEqual(options.block, 'nearest');
      assert.strictEqual(options.inline, 'center');
    },
  };

  const mockRows = [
    { dataset: { name: '가란고르무', anomalyLevel: '1', anomalyAfflicted: '뼈' }, style: { display: '' } },
    { dataset: { name: '디아블로스', anomalyLevel: '4', anomalyAfflicted: '견갑각' }, style: { display: '' } },
    { dataset: { name: '리오레이아', anomalyLevel: '2', anomalyAfflicted: '가죽' }, style: { display: '' } },
    { dataset: { name: '주인 리오레이아', anomalyLevel: '0', anomalyAfflicted: '' }, style: { display: '' } },
    { dataset: { name: '푸케푸케', anomalyLevel: '1', anomalyAfflicted: '가죽' }, style: { display: '' } },
  ];

  const mockCommon = {
    isReady: true,
    form: mockForm,
    table: {
      body: {
        querySelectorAll(sel) {
          if (sel === 'tr') return mockRows;
          return [];
        },
      },
    },
  };

  const controller = initSearch({
    common: mockCommon,
    filterManager: fm,
  });

  assert.ok(controller, 'controller should be initialized');
  assert.strictEqual(typeof controller.handleSubmit, 'function');
  assert.strictEqual(typeof controller.handleInput, 'function');
  assert.strictEqual(typeof controller.cleanup, 'function');

  // Trigger form submit
  mockForm.events['submit']({ preventDefault: () => {} });

  assert.strictEqual(scrolled, true, 'scrollIntoView should be called');
  assert.strictEqual(fm.getState().rawKeyword, '가란/디아, 레이아!');
  assert.strictEqual(mockRows[0].style.display, 'table-row'); // 가란고르무
  assert.strictEqual(mockRows[1].style.display, 'table-row'); // 디아블로스
  assert.strictEqual(mockRows[2].style.display, 'table-row'); // 리오레이아 (normal)
  assert.strictEqual(mockRows[3].style.display, 'none'); // 주인 리오레이아 (excluded by 레이아!)
  assert.strictEqual(mockRows[4].style.display, 'none'); // 푸케푸케

  // Input event when search is cleared
  mockInput.value = '   ';
  mockInput.events['input']();

  assert.strictEqual(fm.getState().rawKeyword, '');
  assert.strictEqual(mockRows[0].style.display, 'table-row');
  assert.strictEqual(mockRows[1].style.display, 'table-row');
  assert.strictEqual(mockRows[2].style.display, 'table-row');
  assert.strictEqual(mockRows[3].style.display, 'table-row');
  assert.strictEqual(mockRows[4].style.display, 'table-row');

  // Input event when search has text should not clear filter
  mockInput.value = '고샤';
  mockInput.events['input']();
  assert.strictEqual(fm.getState().rawKeyword, ''); // still '' until submit

  // Cleanup
  controller.cleanup();
  assert.strictEqual(mockForm.events['submit'], undefined);
  assert.strictEqual(mockInput.events['input'], undefined);
});
