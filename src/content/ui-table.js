/**
 * 몬스터 테이블 UI 확장 모듈
 * 
 * 1. 몬스터 사진 좌상단에 Ex 레벨 플로팅 뱃지 부착 (.anomaly-floating-badge)
 * 2. 몬스터 이름 하단에 단계별 괴이 소재 화살표 흐름 및 팁 코멘트 렌더링 (.anomaly-material-flow, .monster-tip-badge)
 * 3. 인벤 기존 '유효속성' 컬럼에 속통룡주/약특 이모지(🌠, ⭐, ⚠️) 우측 정렬 (.attr-column, .attr-row)
 * 4. '특효' 컬럼에 순수 물리 특효주(공/룡/류/수) 유효 항목 렌더링 (.anti-cell, .anti-column, .anti-row)
 * 5. 테이블 상단 특효/속성 가이드 설명 바 주입 (#monster-table-guide)
 */

(function () {
  // DOM 준비 상태 및 Null Safety 검증
  if (
    typeof common === "undefined" ||
    !common.isReady ||
    !common.table.all ||
    !common.table.head ||
    !common.table.body
  ) {
    return;
  }

  // 1. 몬스터 테이블 레이아웃 최적화
  common.table.all.tableLayout = "auto";
  if (common.table.colgroup) {
    common.table.colgroup.innerHTML = `<col width="10%"><col width="*"><col width="6%"><col width="16%"><col width="12%"><col width="11%"><col width="8%"><col width="7%">`;
  }

  // 2. 몬스터 테이블 상단 특효/속성 가이드 설명 바 주입
  if (!document.getElementById("monster-table-guide")) {
    const guideBox = document.createElement("div");
    guideBox.id = "monster-table-guide";
    guideBox.innerHTML = `
      <div class="guide-content">
        <div class="guide-section-group">
          <div>
            <strong class="guide-section-title">[유효속성]</strong> 
            <span>🌠 속통룡주(25+)</span> &nbsp;
            <span>⭐ 약특속성(20+)</span> &nbsp;
            <span class="guide-muted">⚠️ 비추천</span>
          </div>
          <div class="guide-divider">
            <strong class="guide-section-title">[물리 특효]</strong> 
            <span><strong class="guide-highlight">공:</strong> 파공(비행)</span> &nbsp;
            <span><strong class="guide-highlight">룡:</strong> 파룡(용족)</span> &nbsp;
            <span><strong class="guide-highlight">류:</strong> 파류(수서)</span> &nbsp;
            <span><strong class="guide-highlight">수:</strong> 파수(아수)</span>
          </div>
        </div>
      </div>
    `;
    common.table.all.insertAdjacentElement("beforebegin", guideBox);
  }

  // 3. 몬스터 테이블 thead 확장 ('특효' 헤더)
  const theadTr = common.table.head.querySelector("tr");
  if (theadTr && !theadTr.querySelector("th.anti-header")) {
    const anti_th = document.createElement("th");
    anti_th.className = "anti-header";
    anti_th.innerText = "특효";
    theadTr.append(anti_th);
  }

  // 4. 몬스터 테이블 tbody 확장
  /**
   * 속통룡주 관련 정보에 따라 이모지 리턴
   * @param {Number|String} value 
   * @return {String}
   */
  function starEmoji2(value) {
    let result = "";
    switch (String(value).trim()) {
      case "1":
        result = "⚠️";
        break;
      case "2":
        result = "⭐";
        break;
      case "3":
        result = "🌠";
        break;
    }
    return result;
  }

  // tbody 내 몬스터 행 순회
  for (let element of common.table.body.querySelectorAll("tr")) {
    let el_data = element.dataset || {};
    let el_name = element.querySelector("td.name");

    // --- A. 괴이화 레벨: 몬스터 사진 좌상단 플로팅 뱃지 부착 ---
    let ex_level = Number(el_data.anomalyLevel);
    if (ex_level > 0) {
      let el_icon = element.querySelector("td.icon") || element.querySelector("td:first-child");
      if (el_icon) {
        let badgeClass = "badge-ex1-4";
        if (ex_level === 5 || ex_level === 6) {
          badgeClass = "badge-ex5-6";
        } else if (ex_level === 7 || ex_level === 8) {
          badgeClass = "badge-ex7-8";
        } else if (ex_level >= 9) {
          badgeClass = "badge-ex9";
        }

        let floatingBadge = document.createElement("span");
        floatingBadge.className = `anomaly-floating-badge ${badgeClass}`;
        floatingBadge.innerText = `Ex ${ex_level}`;

        let iconLink = el_icon.querySelector("a") || el_icon;
        iconLink.classList.add("anomaly-icon-wrapper");
        iconLink.appendChild(floatingBadge);
      }
    }

    // --- B. 몬스터 이름 하단: 단계별 괴이 소재 화살표 흐름 ---
    if (el_data.anomalyAfflicted && el_name) {
      let i = ex_level < 5 ? 0 : 3;
      let items = el_data.anomalyAfflicted.split("/").map(s => s.trim()).filter(Boolean);
      let itemSpans = items.map((val, idx) => {
        let colorNum = Math.min(6, (idx + i) + 1);
        return `<span class="color${colorNum}">${val}</span>`;
      });
      let itemsHtml = itemSpans.join(`<span class="flow-arrow">➔</span>`);
      
      let flowDiv = document.createElement("div");
      flowDiv.className = "anomaly-material-flow";
      flowDiv.innerHTML = itemsHtml;
      el_name.appendChild(flowDiv);
    }

    // --- C. 몬스터 주요 팁 코멘트 추가 ---
    if (el_data.comment && el_name) {
      let formattedComment = el_data.comment
        .replaceAll("->", " ➔ ")
        .replaceAll("&gt;", " ➔ ");
      
      let tipContainer = document.createElement("div");
      tipContainer.className = "monster-tip-container";
      tipContainer.innerHTML = `
        <span class="monster-tip-badge">
          <span>💡</span><span>${formattedComment}</span>
        </span>
      `;
      el_name.appendChild(tipContainer);
    }

    // --- D. 인벤 기존 '유효속성' 컬럼(5번째 td)에 속통/약특 이모지 우측 정렬 병합 ---
    let allTds = element.querySelectorAll("td");
    let el_attr_td = allTds[4]; // 인벤 유효속성 컬럼 (0:아이콘, 1:이름, 2:종별, 3:약점, 4:유효속성)
    if (el_attr_td && el_data.element) {
      let elements = el_data.element.split(",").map(e => e.trim());
      let elembanes = el_data.elembane ? el_data.elembane.split(",").map(e => e.trim()) : [];

      let attrEmojiMap = {};
      elements.forEach((elem, idx) => {
        let emoji = starEmoji2(elembanes[idx] || "");
        if (emoji) {
          attrEmojiMap[elem] = emoji;
        }
      });

      // 인벤 유효속성 td의 각 라인을 <br>로 분리하여 Flex row로 재구성
      let rawLines = el_attr_td.innerHTML.split(/<br\s*\/?>/i).filter(l => l.trim().length > 0);
      if (rawLines.length > 0) {
        let formattedLines = rawLines.map(line => {
          let matchedAttr = ['화', '수', '뇌', '빙', '용'].find(a => line.includes(`${a}:`));
          let emoji = matchedAttr && attrEmojiMap[matchedAttr] ? attrEmojiMap[matchedAttr] : "";
          
          return `
            <div class="attr-row">
              <span class="attr-label">${line.trim()}</span>
              <span class="attr-emoji">${emoji}</span>
            </div>
          `;
        });
        el_attr_td.innerHTML = `<div class="attr-column">${formattedLines.join('')}</div>`;
      }
    }

    // --- E. '특효' 신규 컬럼: 순수 물리 특효주(공/룡/류/수)만 심플 렌더링 ---
    let new_anti_td = document.createElement("td");
    new_anti_td.className = "anti-cell";

    if (JSON.parse(el_data.antiSmall || "false")) {
      new_anti_td.innerHTML = `<span class="anti-none">-</span>`;
    } else {
      let activeAntiItems = [];
      if (el_data.antiAerial === "true") activeAntiItems.push({ label: "공", name: "파공룡주" });
      if (el_data.antiDragon === "true") activeAntiItems.push({ label: "룡", name: "파룡룡주" });
      if (el_data.antiAquatic === "true") activeAntiItems.push({ label: "류", name: "파류룡주" });
      if (el_data.antiFranged === "true") activeAntiItems.push({ label: "수", name: "파수룡주" });

      if (activeAntiItems.length > 0) {
        let antiLines = activeAntiItems.map(item => `
          <div class="anti-row" title="${item.name}">
            <span class="anti-label">${item.label}:</span>
            <span class="anti-icon">⭐</span>
          </div>
        `).join('');
        new_anti_td.innerHTML = `<div class="anti-column">${antiLines}</div>`;
      } else {
        new_anti_td.innerHTML = `<span class="anti-none" title="물리 특효주 미적용">-</span>`;
      }
    }

    element.append(new_anti_td);
  }
})();
