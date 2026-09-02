/**
 * 검색창 괴이검색 UI 및 인터랙션 모듈
 * 
 * 인벤 몬스터 검색 폼에 괴이 탐구(Anomaly) 검색 매트릭스, 아코디언 토글,
 * 키보드 접근성(A11y), 및 FilterManager 연동 실시간 필터링/카운트 UI를 주입합니다.
 */
(function () {
  // DOM 준비 상태 검증 (Null Safety)
  if (typeof common === "undefined" || !common.isReady || !common.form) {
    return;
  }

  const searchBody = common.form.querySelector("tbody");
  if (!searchBody) {
    return;
  }

  // 1. 괴이 검색 메인 컨테이너 td 생성
  const anomaly_td = document.createElement("td");
  anomaly_td.id = "anomaly_td";
  anomaly_td.innerHTML = `
<div id="anomaly-container">
  <!-- 상단 컨트롤 및 상태 정보 바 -->
  <div id="anomaly-control-bar">
    <div id="anomaly-status-info">
      <span>필터 상태: <span id="current-filter-name" class="filter-tag tag-default">전체 몬스터</span></span>
      <span>결과: <span id="anomaly-match-count" class="count-badge">0</span>마리</span>
    </div>
    <div id="anomaly-actions">
      <button type="button" id="anomaly-toggle-btn" class="anomaly-btn" aria-expanded="true" aria-controls="anomaly-table-wrapper" title="괴이 매트릭스 접기/펼치기">
        <span class="toggle-icon">▼</span> 접기
      </button>
      <button type="button" id="anomaly-reset-btn" class="anomaly-btn" title="전체 필터 초기화">
        <span>↺</span> 초기화
      </button>
    </div>
  </div>

  <!-- 괴이 매트릭스 반응형 스크롤 래퍼 및 테이블 -->
  <div id="anomaly-table-wrapper" class="anomaly-table-responsive">
    <table id="anomaly-search">
    <colgroup>
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
        <col width="*"><col width="*"><col width="*"><col width="*"><col width="*">
    </colgroup>
    <thead>
        <tr>
            <th></th>
            <th>1~</th>
            <th colspan="2">11~</th>
            <th colspan="2">31~</th>
            <th colspan="2">51~</th>
            <th colspan="2">71~</th>
            <th colspan="1">91~</th>
            <th>101~</th>
            <th>111~</th>
            <th>131~</th>
            <th colspan="2">141~</th>
            <th colspan="2">161~</th>
            <th colspan="2">181~</th>
            <th colspan="2">201~</th>
            <th colspan="2">221~</th>
            <th colspan="6">241~</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th rowspan="2"><a class="ex color1" role="button" tabindex="0" aria-pressed="false">EX1</a></th>
            <td colspan="3"><a class="item color1" role="button" tabindex="0" aria-pressed="false">뼈</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">견골</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">중골</a></td>
        </tr>
        <tr>
            <td colspan="3"><a class="item color1" role="button" tabindex="0" aria-pressed="false">가죽</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">가죽+</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">두툼가죽</a></td>
        </tr>

        <tr>
            <th rowspan="2"><a class="ex color1" role="button" tabindex="0" aria-pressed="false">EX2</a></th>
            <td class="border0"></td>
            <td colspan="2"><a class="item color1" role="button" tabindex="0" aria-pressed="false">용골</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">견룡골</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">중용골</a></td>
        </tr>
        <tr>
            <td class="border0"></td>
            <td colspan="2"><a class="item color1" role="button" tabindex="0" aria-pressed="false">피</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">깨끗한피</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">정농혈</a></td>
        </tr>
        
        <tr>
            <th rowspan="2"><a class="ex color1" role="button" tabindex="0" aria-pressed="false">EX3</a></th>
            <td class="border0" colspan="2"></td>
            <td><a class="item color1" role="button" tabindex="0" aria-pressed="false">비늘</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">비늘+</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">두툼비늘</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="2"></td>
            <td><a class="item color1" role="button" tabindex="0" aria-pressed="false">갑각</a></td>
            <td colspan="7"><a class="item color2" role="button" tabindex="0" aria-pressed="false">견갑각</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">중갑각</a></td>
        </tr>
        
        <tr>
            <th rowspan="2"><a class="ex color1" role="button" tabindex="0" aria-pressed="false">EX4</a></th>
            <td class="border0" colspan="3"></td>
            <td colspan="7"><a class="item color1" role="button" tabindex="0" aria-pressed="false">이빨</a>/<a class="item color2" role="button" tabindex="0" aria-pressed="false">이빨+</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">중어금니</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="3"></td>
            <td colspan="7"><a class="item color1" role="button" tabindex="0" aria-pressed="false">발톱</a>/<a class="item color2" role="button" tabindex="0" aria-pressed="false">첨예발톱</a></td>
            <td colspan="19"><a class="item color3" role="button" tabindex="0" aria-pressed="false">억센발톱</a></td>
        </tr>
        
        <tr>
            <th rowspan="3"><a class="ex color4" role="button" tabindex="0" aria-pressed="false">EX5</a></th>
            <td class="border0" colspan="5"></td>
            <td colspan="5"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉뿔</a></td>
            <td colspan="5"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉첨예뿔</a></td>
            <td colspan="14"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉억센뿔</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="5"></td>
            <td colspan="5"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉뼈</a></td>
            <td colspan="5"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉견골</a></td>
            <td colspan="14"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉중골</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="5"></td>
            <td colspan="5"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉비늘</a></td>
            <td colspan="5"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉비늘+</a></td>
            <td colspan="14"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉두툼비늘</a></td>
        </tr>
        
        <tr>
            <th rowspan="2"><a class="ex color4" role="button" tabindex="0" aria-pressed="false">EX6</a></th>
            <td class="border0" colspan="7"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉갑각</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉견갑각</a></td>
            <td colspan="12"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉중갑각</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="7"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉발톱</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉첨예발톱</a></td>
            <td colspan="12"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉억센발톱</a></td>
        </tr>
        
        <tr>
            <th rowspan="3"><a class="ex color5" role="button" tabindex="0" aria-pressed="false">EX7</a></th>
            <td class="border0" colspan="9"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉이빨</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉이빨+</a></td>
            <td colspan="10"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉중어금니</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="9"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉피</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉깨끗한피</a></td>
            <td colspan="10"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉농혈</a></td>
        </tr>
        <tr>
            <td class="border0" colspan="9"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">흉익막</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">흉날개</a></td>
            <td colspan="10"><a class="item color6" role="button" tabindex="0" aria-pressed="false">흉억센날개</a></td>
        </tr>
        
        <tr>
            <th rowspan="1"><a class="ex color5" role="button" tabindex="0" aria-pressed="false">EX8</a></th>
            <td class="border0" colspan="11"></td>
            <td colspan="4"><a class="item color4" role="button" tabindex="0" aria-pressed="false">(용골)</a></td>
            <td colspan="6"><a class="item color5" role="button" tabindex="0" aria-pressed="false">(견룡골)</a></td>
            <td colspan="8"><a class="item color6" role="button" tabindex="0" aria-pressed="false">(중룡골)</a></td>
        </tr>
        
        <tr>
            <th rowspan="1"><a class="ex color6" role="button" tabindex="0" aria-pressed="false">EX9</a></th>
            <td class="border0" colspan="12"></td>
            <td colspan="7"><a class="item color4" role="button" tabindex="0" aria-pressed="false">(용혈)</a></td>
            <td colspan="4"><a class="item color5" role="button" tabindex="0" aria-pressed="false">(정용혈)</a></td>
            <td colspan="6"><a class="item color6" role="button" tabindex="0" aria-pressed="false">(농용혈)</a></td>
        </tr>
    </tbody>
    </table>
  </div>
</div>
`;

  // 2. th 및 tr 생성 후 인벤 검색 폼 tbody에 추가
  const anomaly_th = document.createElement("th");
  anomaly_th.innerText = "괴이탐구";

  const anomaly_tr = document.createElement("tr");
  anomaly_tr.id = "anomaly_tr";
  anomaly_tr.append(anomaly_th, anomaly_td);

  searchBody.append(anomaly_tr);

  // 3. 이름 검색 입력창에 문법 팁 가이드 문구 및 플레이스홀더 추가
  const nameInput = common.form.querySelector("input[name='name']");
  if (nameInput) {
    nameInput.placeholder = "예: 가란/디아, 레이아!, 레이아@, 레이아#";
    
    const tipDiv = document.createElement("div");
    tipDiv.id = "search-syntax-tip";
    tipDiv.innerHTML = `
      <span class="tip-title">💡 검색 팁:</span> 
      <span class="tip-syntax-or">A/B</span> 다중검색 &nbsp;|&nbsp; 
      <span class="tip-syntax-normal">이름!</span> 일반종만 &nbsp;|&nbsp; 
      <span class="tip-syntax-variant">이름@</span> 희소/아종만 &nbsp;|&nbsp; 
      <span class="tip-syntax-apex">이름#</span> 주인만 &nbsp;
      <span class="tip-example">(예: 야츠!/벨리/레이아@)</span>
    `;
    if (nameInput.parentNode) {
      nameInput.parentNode.appendChild(tipDiv);
    }
  }
})();


/**
 * 괴이 검색 인터랙션, 아코디언 토글, 접근성(A11y) 및 FilterManager 양방향 바인딩 모듈
 */
(function () {
  // DOM 준비 상태 검증
  if (typeof common === "undefined" || !common.isReady || !common.form) {
    return;
  }

  const anomalyContainer = document.getElementById("anomaly-container");
  const toggleBtn = document.getElementById("anomaly-toggle-btn");
  const statusNameEl = document.getElementById("current-filter-name");
  const matchCountEl = document.getElementById("anomaly-match-count");
  const resetBtn = document.getElementById("anomaly-reset-btn");

  // FilterManager 인스턴스 참조
  const filterManager =
    (typeof window !== "undefined" && window.FilterManager) ||
    (typeof globalThis !== "undefined" && globalThis.FilterManager) ||
    null;

  // 1. 아코디언 접기/펼치기 토글
  if (toggleBtn && anomalyContainer) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isCollapsed = anomalyContainer.classList.toggle("collapsed");
      toggleBtn.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
      toggleBtn.innerHTML = isCollapsed
        ? `<span class="toggle-icon">▲</span> 펼치기`
        : `<span class="toggle-icon">▼</span> 접기`;
    });
  }

  /**
   * FilterManager 상태에 맞춰 UI 버튼 active 클래스, aria-pressed, 필터명, 카운트 동기화
   * @param {Object} state - FilterManager state snapshot
   */
  function syncUI(state) {
    if (!state) return;

    // A. EX 레벨 버튼 active & aria-pressed 동기화
    const allExLinks = common.form.querySelectorAll("#anomaly-search a.ex");
    for (let btn of allExLinks) {
      const level = btn.innerText.trim().replace(/^EX/i, "");
      const isActive = Boolean(state.exLevel && state.exLevel === level);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }

    // B. 괴이 소재 버튼 active & aria-pressed 동기화
    const allItemLinks = common.form.querySelectorAll("#anomaly-search td a.item");
    for (let btn of allItemLinks) {
      const item = btn.innerText.trim();
      const isActive = Boolean(state.exMaterial && state.exMaterial === item);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }

    // C. 상태 태그 텍스트 및 클래스 동기화
    if (statusNameEl) {
      statusNameEl.className = "filter-tag";
      if (state.exLevel && state.exMaterial) {
        statusNameEl.innerText = `EX${state.exLevel} · ${state.exMaterial}`;
        statusNameEl.classList.add("tag-ex");
      } else if (state.exLevel) {
        statusNameEl.innerText = `EX ${state.exLevel}`;
        statusNameEl.classList.add("tag-ex");
      } else if (state.exMaterial) {
        statusNameEl.innerText = state.exMaterial;
        statusNameEl.classList.add("tag-material");
      } else if (state.rawKeyword) {
        statusNameEl.innerText = `검색어: ${state.rawKeyword}`;
        statusNameEl.classList.add("tag-keyword");
      } else {
        statusNameEl.innerText = "전체 몬스터";
        statusNameEl.classList.add("tag-default");
      }
    }

    // D. 매칭 카운트 동기화
    if (matchCountEl) {
      if (typeof state.visibleCount === "number") {
        matchCountEl.innerText = String(state.visibleCount);
      } else {
        let visibleCount = 0;
        const tableRows = common.table.body ? common.table.body.querySelectorAll("tr") : [];
        for (let el of tableRows) {
          if (el.style.display !== "none") {
            visibleCount++;
          }
        }
        matchCountEl.innerText = String(visibleCount);
      }
    }
  }

  // 2. FilterManager 구독 등록
  if (filterManager) {
    filterManager.subscribe(syncUI);
  }

  /**
   * 몬스터 괴이 레벨 필터 핸들러
   * @param {Event} e 
   */
  function handleExClick(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetLevel = target.innerText.trim().replace(/^EX/i, "");

    if (filterManager) {
      filterManager.setExLevel(targetLevel);
      filterManager.apply();
    }

    if (common.form) {
      common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  /**
   * 몬스터 괴이 소재 필터 핸들러
   * @param {Event} e 
   */
  function handleMaterialClick(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetItem = target.innerText.trim();

    if (filterManager) {
      filterManager.setExMaterial(targetItem);
      filterManager.apply();
    }

    if (common.form) {
      common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  /**
   * 키보드 접근성(A11y) 엔터/스페이스 키 핸들러
   * @param {KeyboardEvent} e 
   */
  function handleA11yKeydown(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      e.currentTarget.click();
    }
  }

  // 3. EX 레벨 버튼 이벤트 등록 (클릭 & 키보드 A11y)
  const exButtons = common.form.querySelectorAll("#anomaly-search a.ex");
  for (let btn of exButtons) {
    btn.addEventListener("click", handleExClick);
    btn.addEventListener("keydown", handleA11yKeydown);
  }

  // 4. 괴이 소재 버튼 이벤트 등록 (클릭 & 키보드 A11y)
  const itemButtons = common.form.querySelectorAll("#anomaly-search td a.item");
  for (let btn of itemButtons) {
    btn.addEventListener("click", handleMaterialClick);
    btn.addEventListener("keydown", handleA11yKeydown);
  }

  // 5. 전체 초기화 버튼 이벤트 등록
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (filterManager) {
        filterManager.resetAll();
        filterManager.apply();
      }
      const keywordInput = common.form.querySelector("input[name='name']");
      if (keywordInput) {
        keywordInput.value = "";
      }
    });
  }

  // 6. 초기 UI 상태 및 카운트 동기화
  if (filterManager) {
    syncUI(filterManager.getState());
    filterManager.apply();
  } else {
    syncUI({ exLevel: null, exMaterial: null, rawKeyword: "", visibleCount: null });
  }
})();