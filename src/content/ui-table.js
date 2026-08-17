/**
 * 몬스터 테이블 UI 확장 모듈 (제안 A: 유효속성 속통 병합 + 특효 물리 2칸 최적화 + 수직/중앙 정렬 + 폰트 밸런스 완비)
 * 
 * 1. 몬스터 사진 좌상단에 Ex 레벨 플로팅 뱃지 부착 (10px 볼드)
 * 2. 몬스터 이름 하단에 단계별 괴이 소재 화살표 흐름(Stepped Flow: 12px) 및 코멘트(11px) '중앙 정렬' 렌더링
 * 3. 인벤 기존 '유효속성' 컬럼에 속통룡주/약특 이모지(🌠, ⭐, ⚠️: 12px) 우측 '수직 일렬 정렬(Flex Space-between)' 병합
 * 4. '특효' 컬럼에는 순수 물리 특효주(공/룡/류/수)만 유효 항목 1~2칸(12px)으로 심플하게 렌더링
 */

/**
 * 1. 몬스터 테이블 레이아웃 최적화
 */
(function () {
  common.table.all.tableLayout = "auto";
  // 유효속성 컬럼 너비를 확보하고, 특효 컬럼 너비를 컴팩트하게 축소
  common.table.colgroup.innerHTML = `<col width="10%"><col width="*"><col width="6%"><col width="16%"><col width="12%"><col width="11%"><col width="8%"><col width="7%">`;
})();

/**
 * 2. 몬스터 테이블 상단 특효/속성 가이드 설명 바 주입
 */
(function () {
  if (!common.table.all) return;

  const guideBox = document.createElement("div");
  guideBox.id = "monster-table-guide";
  guideBox.style.cssText = "box-sizing: border-box; width: 100%; margin: 8px auto 6px auto; padding: 6px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; color: #475569; line-height: 1.6; letter-spacing: -0.2px;";
  guideBox.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px;">
      <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
        <div>
          <strong style="color:#1e293b;">[유효속성]</strong> 
          <span>🌠 속통룡주(25+)</span> &nbsp;
          <span>⭐ 약특속성(20+)</span> &nbsp;
          <span style="color:#94a3b8;">⚠️ 비추천</span>
        </div>
        <div style="border-left:1px solid #cbd5e1; padding-left:12px;">
          <strong style="color:#1e293b;">[물리 특효]</strong> 
          <span><strong style="color:#334155;">공:</strong> 파공(비행)</span> &nbsp;
          <span><strong style="color:#334155;">룡:</strong> 파룡(용족)</span> &nbsp;
          <span><strong style="color:#334155;">류:</strong> 파류(수서)</span> &nbsp;
          <span><strong style="color:#334155;">수:</strong> 파수(아수)</span>
        </div>
      </div>
    </div>
  `;

  common.table.all.insertAdjacentElement("beforebegin", guideBox);
})();

/**
 * 3. 몬스터 테이블 thead 확장 ('특효' 헤더)
 */
(function () {
  let anti_th = document.createElement("th");
  anti_th.innerHTML = "특효";
  common.table.head.querySelector("tr").append(anti_th);
})();

/**
 * 4. 몬스터 테이블 tbody 확장
 */
(function () {
  let anti_td = document.createElement("td");
  anti_td.style.whiteSpace = "nowrap";

  // 괴이 소재 텍스트 컬러 팔레트
  const colors = ['#d6336c', '#d9480f', '#e03131', '#1c7ed6', '#3b5bdb', '#9c36b5'];

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
    let el_data = element.dataset;
    let el_name = element.querySelector("td.name");

    // --- A. 괴이화 레벨: 몬스터 사진 좌상단 플로팅 뱃지 부착 (10px 볼드) ---
    let ex_level = Number(el_data.anomalyLevel);
    if (ex_level > 0) {
      let el_icon = element.querySelector("td.icon") || element.querySelector("td:first-child");
      if (el_icon) {
        let floatingBadge = document.createElement("span");
        floatingBadge.className = "anomaly-floating-badge";
        floatingBadge.innerText = `Ex ${ex_level}`;
        floatingBadge.style.cssText = `
          position: absolute;
          top: 2px;
          left: 2px;
          z-index: 2;
          background: linear-gradient(135deg, #be123c, #881337);
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 3px;
          line-height: 1.1;
          box-shadow: 0 1px 3px rgba(0,0,0,0.35);
          pointer-events: none;
          letter-spacing: -0.2px;
        `;

        let iconLink = el_icon.querySelector("a") || el_icon;
        iconLink.style.position = "relative";
        iconLink.style.display = "inline-block";
        iconLink.appendChild(floatingBadge);
      }
    }

    // --- B. 몬스터 이름 하단: 단계별 괴이 소재 화살표 흐름 (12px, 중앙 정렬) ---
    if (el_data.anomalyAfflicted) {
      let i = ex_level < 5 ? 0 : 3;
      let items = el_data.anomalyAfflicted.split("/");
      let itemSpans = items.map((val, idx) => {
        let itemColor = colors[idx + i] || "#334155";
        let fontWeight = idx === 0 ? "500" : (idx === 1 ? "600" : "700");
        return `<span style='color:${itemColor}; font-weight:${fontWeight};'>${val}</span>`;
      });
      let itemsHtml = itemSpans.join(`<span style='color:#64748b; font-size:10px; font-weight:700; margin:0 3px;'>➔</span>`);
      let flowHtml = `
        <div style='margin-top:4px; font-size:12px; line-height:1.3; display:flex; align-items:center; justify-content:center; flex-wrap:wrap;'>
          ${itemsHtml}
        </div>
      `;
      el_name.innerHTML = `${el_name.innerHTML}${flowHtml}`;
    }

    // --- C. 몬스터 주요 팁 코멘트 추가 (12px 앰버 팁 뱃지 & 화살표 정제) ---
    if (el_data.comment) {
      let formattedComment = el_data.comment
        .replaceAll("->", " ➔ ")
        .replaceAll("&gt;", " ➔ ");
      
      let co_html = `
        <div style='margin-top:4px; display:flex; justify-content:center;'>
          <span style='display:inline-flex; align-items:center; gap:3px; padding:2px 8px; border-radius:3px; font-size:12px; font-weight:700; background:#fffbeb; color:#92400e; border:1px solid #fde68a; line-height:1.3; text-align:center;'>
            <span>💡</span><span>${formattedComment}</span>
          </span>
        </div>
      `;
      el_name.innerHTML = `${el_name.innerHTML}${co_html}`;
    }

    // --- D. 인벤 기존 '유효속성' 컬럼(5번째 td)에 속통/약특 이모지(12px) 우측 일렬 정렬(Flex) 병합 ---
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

      // 인벤 유효속성 td의 각 라인을 <br>로 분리하여 Flex row로 재구성 (우측 수직 일렬 정렬)
      let rawLines = el_attr_td.innerHTML.split(/<br\s*\/?>/i).filter(l => l.trim().length > 0);
      if (rawLines.length > 0) {
        let formattedLines = rawLines.map(line => {
          let matchedAttr = ['화', '수', '뇌', '빙', '용'].find(a => line.includes(`${a}:`));
          let emoji = matchedAttr && attrEmojiMap[matchedAttr] ? attrEmojiMap[matchedAttr] : "";
          
          return `
            <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; line-height:1.4;">
              <span style="display:inline-flex; align-items:center;">${line.trim()}</span>
              <span style="display:inline-block; min-width:16px; text-align:right; font-size:12px;">${emoji}</span>
            </div>
          `;
        });
        el_attr_td.innerHTML = `<div style="display:flex; flex-direction:column; width:100%; max-width:85px; margin:0 auto;">${formattedLines.join('')}</div>`;
      }
    }

    // --- E. '특효' 신규 컬럼: 순수 물리 특효주(공/룡/류/수)만 1~2칸(12px)으로 심플 렌더링 ---
    let new_anti_td = anti_td.cloneNode();
    new_anti_td.style.padding = "6px 8px";
    new_anti_td.style.verticalAlign = "middle";
    new_anti_td.style.textAlign = "center";

    if (JSON.parse(el_data.antiSmall || "false")) {
      // 소형 몬스터
      new_anti_td.innerHTML = `<span style="font-size:11px; color:#9ca3af;">-</span>`;
    } else {
      // 적용되는 물리 특효주 추출
      let activeAntiItems = [];
      if (el_data.antiAerial === "true") activeAntiItems.push({ label: "공", name: "파공룡주" });
      if (el_data.antiDragon === "true") activeAntiItems.push({ label: "룡", name: "파룡룡주" });
      if (el_data.antiAquatic === "true") activeAntiItems.push({ label: "류", name: "파류룡주" });
      if (el_data.antiFranged === "true") activeAntiItems.push({ label: "수", name: "파수룡주" });

      if (activeAntiItems.length > 0) {
        let antiLines = activeAntiItems.map(item => `
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; font-weight:700; color:#1e293b; padding:1px 0;" title="${item.name}">
            <span>${item.label}:</span>
            <span style="font-size:12px;">⭐</span>
          </div>
        `).join('');
        new_anti_td.innerHTML = `<div style="display:flex; flex-direction:column; max-width:46px; margin:0 auto;">${antiLines}</div>`;
      } else {
        new_anti_td.innerHTML = `<span style="font-size:11px; color:#9ca3af;" title="물리 특효주 미적용">-</span>`;
      }
    }

    element.append(new_anti_td);
  }
})();
