/**
 * 검색 쿼리 파서 (Search Parser)
 * Content Script (브라우저 전역 스코프) 및 Node.js (CommonJS / ESM) 모두 호환
 */
(function (global) {
  /**
   * 쉼표(,) 및 슬래시(/) 구분자로 분리된 검색어 목록 파싱
   * @param {string} rawQuery
   * @returns {string[]}
   */
  function splitQueryKeywords(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') return [];
    return rawQuery
      .replaceAll(',', '/')
      .split('/')
      .map(k => k.trim())
      .filter(k => k.length > 0);
  }

  /**
   * 개별 검색어에서 수식어(!: 일반종, @: 아종/희소종, #: 주인) 파싱
   * @param {string} keyword
   * @returns {{ name: string, isNormalOnly: boolean, isVariantOnly: boolean, isApexOnly: boolean }}
   */
  function parseQuery(keyword) {
    let isNormalOnly = false;
    let isVariantOnly = false;
    let isApexOnly = false;
    let cleanName = (keyword || '').trim();

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

  // Node.js CommonJS & ESM cjs-module-lexer interop
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      splitQueryKeywords,
      parseQuery,
    };
  }

  // Browser Global (Content Script)
  if (typeof window !== 'undefined') {
    window.SearchParser = {
      splitQueryKeywords,
      parseQuery,
    };
    window.splitQueryKeywords = splitQueryKeywords;
    window.parseQuery = parseQuery;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.SearchParser = {
      splitQueryKeywords,
      parseQuery,
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
