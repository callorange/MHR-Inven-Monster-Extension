/**
 * 검색창 괴이검색 UI 및 인터랙션 모듈
 * 
 * 인벤 몬스터 검색 폼에 괴이 탐구(Anomaly) 검색 매트릭스 및 실시간 필터링/카운트 UI를 주입합니다.
 */
(function () {
  // 1. 괴이 검색 메인 컨테이너 td 생성
  const anomaly_td = document.createElement("td");
  anomaly_td.id = "anomaly_td";
  anomaly_td.style.padding = "0px";
  anomaly_td.innerHTML = `
<style>
  /* 괴이 탐구 검색 컨테이너 */
  #anomaly-container {
    box-sizing: border-box;
    width: calc(100% - 4px);
    margin: 4px auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
  }

  /* 상단 상태 및 컨트롤 바 */
  #anomaly-control-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    margin-bottom: 6px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 12px;
  }

  #anomaly-status-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    font-weight: 500;
  }

  #anomaly-status-info .filter-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #bae6fd;
  }

  #anomaly-status-info .count-badge {
    font-weight: 700;
    color: #d9480f;
  }

  #anomaly-reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #475569;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  #anomaly-reset-btn:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
    color: #1e293b;
    transform: translateY(-1px);
  }

  /* 괴이 테이블 스타일 */
  #anomaly-search {
    box-sizing: border-box;
    border-collapse: separate; 
    border-spacing: 0;
    table-layout: auto; 
    width: 100%;
    margin: 0 auto;
    word-break: keep-all;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
  }

  #anomaly-search thead th {
    position: sticky; 
    top: 0px; 
    padding: 6px 4px; 
    background: linear-gradient(135deg, #881337, #be123c); 
    color: #ffffff; 
    border-bottom: 2px solid #701a28; 
    text-align: center;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: -0.2px;
  }

  #anomaly-search tbody th,
  #anomaly-search tbody td {
    padding: 3px 2px; 
    background-color: #ffffff; 
    color: #334155; 
    border: 1px solid #f1f5f9; 
    font-weight: 600;
    font-size: 11px;
    text-align: center;
    transition: background-color 0.15s ease;
  }
  
  #anomaly-search tbody tr:hover td {
    background-color: #f8fafc;
  }

  #anomaly-search tbody td.border0 {
    border: none; 
    background-color: transparent;
  }
  
  #anomaly-search tbody tr:last-child td.border0 {
    border-bottom: 1px solid #f1f5f9;
  }

  #anomaly-search tbody th {
    text-align: center;
    background-color: #f8fafc;
    color: #475569;
    vertical-align: middle;
  }

  /* 클릭 버튼 스타일 (레벨 & 소재) */
  #anomaly-search tbody td a.item, 
  #anomaly-search tbody th a.ex {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 6px;
    margin: 1px;
    border-radius: 5px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: all 0.15s ease;
    cursor: pointer;
    text-decoration: none;
    font-size: 11px;
    user-select: none;
  }

  #anomaly-search tbody td a.item:hover, 
  #anomaly-search tbody th a.ex:hover {
    background-color: #ffffff;
    border-color: #cbd5e1;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  /* 활성화(Active/Selected) 상태 스타일 */
  #anomaly-search tbody th a.ex.active {
    background: #be123c !important;
    color: #ffffff !important;
    border-color: #881337 !important;
    font-weight: 700;
    box-shadow: 0 0 0 2px rgba(190, 18, 60, 0.3) !important;
    transform: scale(1.04);
  }

  #anomaly-search tbody td a.item.active {
    background: #0284c7 !important;
    color: #ffffff !important;
    border-color: #0369a1 !important;
    font-weight: 700;
    box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.35) !important;
    transform: scale(1.04);
  }

  /* 고대비 비비드 텍스트 컬러 팔레트 */
  #anomaly-search .color1 { color: #db2777; font-weight: 700; }
  #anomaly-search .color2 { color: #ea580c; font-weight: 700; }
  #anomaly-search .color3 { color: #dc2626; font-weight: 700; }
  #anomaly-search .color4 { color: #0284c7; font-weight: 700; }
  #anomaly-search .color5 { color: #4f46e5; font-weight: 700; }
  #anomaly-search .color6 { color: #7c3aed; font-weight: 700; }
</style>

<div id="anomaly-container">
  <!-- 상단 컨트롤 및 상태 정보 바 -->
  <div id="anomaly-control-bar">
    <div id="anomaly-status-info">
      <span>필터 상태: <span id="current-filter-name" class="filter-tag">전체 몬스터</span></span>
      <span>결과: <span id="anomaly-match-count" class="count-badge">0</span>마리</span>
    </div>
    <button type="button" id="anomaly-reset-btn">
      <span>↺</span> 전체 초기화
    </button>
  </div>

  <!-- 괴이 매트릭스 테이블 -->
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
          <th rowspan="2"><a class="ex color1">EX1</a></th>
          <td colspan="3"><a class="item color1">뼈</a></td>
          <td colspan="7"><a class="item color2">견골</a></td>
          <td colspan="19"><a class="item color3">중골</a></td>
      </tr>
      <tr>
          <td colspan="3"><a class="item color1">가죽</a></td>
          <td colspan="7"><a class="item color2">가죽+</a></td>
          <td colspan="19"><a class="item color3">두툼가죽</a></td>
      </tr>

      <tr>
          <th rowspan="2"><a class="ex color1">EX2</a></th>
          <td class="border0"></td>
          <td colspan="2"><a class="item color1">용골</a></td>
          <td colspan="7"><a class="item color2">견룡골</a></td>
          <td colspan="19"><a class="item color3">중용골</a></td>
      </tr>
      <tr>
          <td class="border0"></td>
          <td colspan="2"><a class="item color1">피</a></td>
          <td colspan="7"><a class="item color2">깨끗한피</a></td>
          <td colspan="19"><a class="item color3">정농혈</a></td>
      </tr>
      
      <tr>
          <th rowspan="2"><a class="ex color1">EX3</a></th>
          <td class="border0" colspan="2"></td>
          <td><a class="item color1">비늘</a></td>
          <td colspan="7"><a class="item color2">비늘+</a></td>
          <td colspan="19"><a class="item color3">두툼비늘</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="2"></td>
          <td><a class="item color1">갑각</a></td>
          <td colspan="7"><a class="item color2">견갑각</a></td>
          <td colspan="19"><a class="item color3">중갑각</a></td>
      </tr>
      
      <tr>
          <th rowspan="2"><a class="ex color1">EX4</a></th>
          <td class="border0" colspan="3"></td>
          <td colspan="7"><a class="item color1">이빨</a>/<a class="item color2">이빨+</a></td>
          <td colspan="19"><a class="item color3">중어금니</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="3"></td>
          <td colspan="7"><a class="item color1">발톱</a>/<a class="item color2">첨예발톱</a></td>
          <td colspan="19"><a class="item color3">억센발톱</a></td>
      </tr>
      
      <tr>
          <th rowspan="3"><a class="ex color4">EX5</a></th>
          <td class="border0" colspan="5"></td>
          <td colspan="5"><a class="item color4">흉뿔</a></td>
          <td colspan="5"><a class="item color5">흉첨예뿔</a></td>
          <td colspan="14"><a class="item color6">흉억센뿔</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="5"></td>
          <td colspan="5"><a class="item color4">흉뼈</a></td>
          <td colspan="5"><a class="item color5">흉견골</a></td>
          <td colspan="14"><a class="item color6">흉중골</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="5"></td>
          <td colspan="5"><a class="item color4">흉비늘</a></td>
          <td colspan="5"><a class="item color5">흉비늘+</a></td>
          <td colspan="14"><a class="item color6">흉두툼비늘</a></td>
      </tr>
      
      <tr>
          <th rowspan="2"><a class="ex color4">EX6</a></th>
          <td class="border0" colspan="7"></td>
          <td colspan="4"><a class="item color4">흉갑각</a></td>
          <td colspan="6"><a class="item color5">흉견갑각</a></td>
          <td colspan="12"><a class="item color6">흉중갑각</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="7"></td>
          <td colspan="4"><a class="item color4">흉발톱</a></td>
          <td colspan="6"><a class="item color5">흉첨예발톱</a></td>
          <td colspan="12"><a class="item color6">흉억센발톱</a></td>
      </tr>
      
      <tr>
          <th rowspan="3"><a class="ex color5">EX7</a></th>
          <td class="border0" colspan="9"></td>
          <td colspan="4"><a class="item color4">흉이빨</a></td>
          <td colspan="6"><a class="item color5">흉이빨+</a></td>
          <td colspan="10"><a class="item color6">흉중어금니</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="9"></td>
          <td colspan="4"><a class="item color4">흉피</a></td>
          <td colspan="6"><a class="item color5">흉깨끗한피</a></td>
          <td colspan="10"><a class="item color6">흉농혈</a></td>
      </tr>
      <tr>
          <td class="border0" colspan="9"></td>
          <td colspan="4"><a class="item color4">흉익막</a></td>
          <td colspan="6"><a class="item color5">흉날개</a></td>
          <td colspan="10"><a class="item color6">흉억센날개</a></td>
      </tr>
      
      <tr>
          <th rowspan="1"><a class="ex color5">EX8</a></th>
          <td class="border0" colspan="11"></td>
          <td colspan="4"><a class="item color4">(용골)</a></td>
          <td colspan="6"><a class="item color5">(견룡골)</a></td>
          <td colspan="8"><a class="item color6">(중룡골)</a></td>
      </tr>
      
      <tr>
          <th rowspan="1"><a class="ex color6">EX9</a></th>
          <td class="border0" colspan="12"></td>
          <td colspan="7"><a class="item color4">(용혈)</a></td>
          <td colspan="4"><a class="item color5">(정용혈)</a></td>
          <td colspan="6"><a class="item color6">(농용혈)</a></td>
      </tr>
  </tbody>
  </table>
</div>
`;

  // 2. th 및 tr 생성 후 인벤 검색 폼 tbody에 추가
  const anomaly_th = document.createElement("th");
  anomaly_th.innerText = "괴이탐구";

  const anomaly_tr = document.createElement("tr");
  anomaly_tr.id = "anomaly_tr";
  anomaly_tr.append(anomaly_th, anomaly_td);

  const searchBody = common.form.querySelector("tbody");
  searchBody.append(anomaly_tr);

  // 3. 이름 검색 입력창에 문법 팁 가이드 문구 및 플레이스홀더 추가
  const nameInput = common.form.querySelector("input[name='name']");
  if (nameInput) {
    nameInput.placeholder = "예: 가란/디아, 레이아!, 레이아@, 레이아#";
    
    const tipDiv = document.createElement("div");
    tipDiv.id = "search-syntax-tip";
    tipDiv.style.cssText = "margin-top: 4px; font-size: 12px; color: #64748b; line-height: 1.4; letter-spacing: -0.2px;";
    tipDiv.innerHTML = `
      <span style="font-weight: 700; color: #475569;">💡 검색 팁:</span> 
      <span style="color:#0284c7; font-weight:600;">A/B</span> 다중검색 &nbsp;|&nbsp; 
      <span style="color:#e11d48; font-weight:600;">이름!</span> 일반종만 &nbsp;|&nbsp; 
      <span style="color:#7c3aed; font-weight:600;">이름@</span> 희소/아종만 &nbsp;|&nbsp; 
      <span style="color:#d97706; font-weight:600;">이름#</span> 주인만 &nbsp;
      <span style="color:#94a3b8;">(예: 야츠!/벨리/레이아@)</span>
    `;
    nameInput.parentNode.appendChild(tipDiv);
  }
})();


/**
 * 괴이 검색 인터랙션 및 상태 관리 이벤트 핸들러
 */
(function () {
  const statusNameEl = document.getElementById("current-filter-name");
  const matchCountEl = document.getElementById("anomaly-match-count");
  const resetBtn = document.getElementById("anomaly-reset-btn");
  const tableRows = common.table.body.querySelectorAll("tr");

  /** @type {{ type: 'level'|'item'|null, value: string|null, targetEl: HTMLElement|null }} */
  let activeState = {
    type: null,
    value: null,
    targetEl: null,
  };

  /**
   * 전체 몬스터 테이블 행 중 표시 중인 몬스터 수를 갱신
   */
  function updateCount() {
    let visibleCount = 0;
    for (let el of tableRows) {
      if (el.style.display !== "none") {
        visibleCount++;
      }
    }
    if (matchCountEl) {
      matchCountEl.innerText = visibleCount.toString();
    }
  }

  /**
   * 활성 상태 스타일 초기화
   */
  function clearActiveClasses() {
    for (let el of common.form.querySelectorAll("#anomaly-search a.active")) {
      el.classList.remove("active");
    }
  }

  /**
   * 필터 전체 해제 및 전체 몬스터 복원
   */
  function resetFilter() {
    activeState = { type: null, value: null, targetEl: null };
    clearActiveClasses();

    for (let el of tableRows) {
      el.style.display = "table-row";
    }

    if (statusNameEl) {
      statusNameEl.innerText = "전체 몬스터";
      statusNameEl.style.background = "#f1f5f9";
      statusNameEl.style.color = "#475569";
      statusNameEl.style.borderColor = "#e2e8f0";
    }

    updateCount();
  }

  /**
   * 몬스터 괴이 레벨 필터링 (EX1 ~ EX9)
   * @param {MouseEvent} e 
   */
  function find_ex_level(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetLevel = target.innerText.trim().replace("EX", "");

    // 이미 선택된 항목 재클릭 시 토글(해제)
    if (activeState.type === "level" && activeState.value === targetLevel) {
      resetFilter();
      return;
    }

    // 상태 갱신
    activeState = { type: "level", value: targetLevel, targetEl: target };
    clearActiveClasses();
    target.classList.add("active");

    for (let el of tableRows) {
      const isMatch = el.dataset.anomalyLevel === targetLevel;
      el.style.display = isMatch ? "table-row" : "none";
    }

    if (statusNameEl) {
      statusNameEl.innerText = `EX ${targetLevel}`;
      statusNameEl.style.background = "#ffe4e6";
      statusNameEl.style.color = "#be123c";
      statusNameEl.style.borderColor = "#fecdd3";
    }

    updateCount();
    common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  /**
   * 몬스터 괴이 재료 필터링
   * @param {MouseEvent} e 
   */
  function find_ex_value(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetItem = target.innerText.trim();

    // 이미 선택된 항목 재클릭 시 토글(해제)
    if (activeState.type === "item" && activeState.value === targetItem) {
      resetFilter();
      return;
    }

    // 상태 갱신
    activeState = { type: "item", value: targetItem, targetEl: target };
    clearActiveClasses();
    target.classList.add("active");

    for (let el of tableRows) {
      const afflictedList = el.dataset.anomalyAfflicted ? el.dataset.anomalyAfflicted.split("/") : [];
      const isMatch = afflictedList.includes(targetItem);
      el.style.display = isMatch ? "table-row" : "none";
    }

    if (statusNameEl) {
      statusNameEl.innerText = targetItem;
      statusNameEl.style.background = "#e0f2fe";
      statusNameEl.style.color = "#0369a1";
      statusNameEl.style.borderColor = "#bae6fd";
    }

    updateCount();
    common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  // EX 레벨 클릭 이벤트 등록
  for (let btn of common.form.querySelectorAll("#anomaly-search a.ex")) {
    btn.addEventListener("click", find_ex_level);
  }

  // 괴이 소재 클릭 이벤트 등록
  for (let btn of common.form.querySelectorAll("#anomaly-search td a.item")) {
    btn.addEventListener("click", find_ex_value);
  }

  // 전체 초기화 버튼 이벤트 등록
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetFilter();
    });
  }

  // 검색 폼 전송(이름 검색) 시 결과 카운트 동기화
  common.form.addEventListener("submit", () => {
    setTimeout(() => {
      clearActiveClasses();
      if (statusNameEl) {
        const keywordInput = common.form.querySelector("input[name='name']");
        const keyword = keywordInput ? keywordInput.value.trim() : "";
        if (keyword) {
          statusNameEl.innerText = `검색어: ${keyword}`;
          statusNameEl.style.background = "#fef3c7";
          statusNameEl.style.color = "#b45309";
          statusNameEl.style.borderColor = "#fde68a";
        } else {
          statusNameEl.innerText = "전체 몬스터";
          statusNameEl.style.background = "#f1f5f9";
          statusNameEl.style.color = "#475569";
          statusNameEl.style.borderColor = "#e2e8f0";
        }
      }
      updateCount();
    }, 50);
  });

  // 초기 몬스터 수 계산
  updateCount();
})();