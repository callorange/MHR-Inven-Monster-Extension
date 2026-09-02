/**
 * 몬스터 DOM 데이터셋 바인딩 (Monster DOM Dataset Binding)
 */
(function (global) {
  // monsters.data.js에서 로드된 전역 데이터 또는 fallback
  const monstersData =
    (typeof window !== "undefined" && window.__MHR_MONSTERS_DATA__) ||
    (typeof globalThis !== "undefined" && globalThis.__MHR_MONSTERS_DATA__) ||
    [];

  const defaultMonster =
    (typeof window !== "undefined" && window.__MHR_DEFAULT_MONSTER__) ||
    (typeof globalThis !== "undefined" && globalThis.__MHR_DEFAULT_MONSTER__) ||
    {
      name: "",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: true,
      },
      element: "",
      elembane: [false],
      comment: "",
    };

  const monstersMap = new Map();
  monstersData.forEach(monster => monstersMap.set(monster.name, monster));

  /**
   * 몬스터 정보 세팅
   */
  const tableBody = typeof common !== "undefined" && common.table && common.table.body;
  if (!tableBody) {
    return;
  }

  for (let element of tableBody.querySelectorAll("tr")) {
    const monsterName = element.dataset.name;
    const currentMonster = monstersMap.get(monsterName);

    if (!currentMonster) {
      if (monsterName) {
        console.debug("[MHR Extension] Unknown monster:", monsterName);
      }
    }

    const monsterInfo = currentMonster || defaultMonster;

    element.dataset.anomalyLevel = monsterInfo.anomaly.level;
    element.dataset.anomalyAfflicted = monsterInfo.anomaly.afflicted;
    element.dataset.antiAerial = monsterInfo.anti.aerial;
    element.dataset.antiDragon = monsterInfo.anti.dragon;
    element.dataset.antiAquatic = monsterInfo.anti.aquatic;
    element.dataset.antiFranged = monsterInfo.anti.franged;
    element.dataset.antiSmall = monsterInfo.anti.small;
    element.dataset.element = monsterInfo.element;
    element.dataset.elembane = monsterInfo.elembane;
    element.dataset.comment = monsterInfo.comment;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
