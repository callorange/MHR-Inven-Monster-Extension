
/**
 * 검색창 괴이검색 내용
 */
 (function (){
    // td를 만든다.
    let anomaly_td = document.createElement("td");
    anomaly_td.id = "anomaly_td";
    anomaly_td.style.padding = "0px";
    anomaly_td.innerHTML = `
<style>
    #anomaly-search {border-collapse: collapse; table-layout: auto; width: 100%; word-break: keep-all;}

    #anomaly-search thead th {position: sticky; top: 0px; padding: 1px 2px; background-color:#990000; color:white; border:1px solid #383b40; text-align:left;}

    #anomaly-search tbody th,
    #anomaly-search tbody td {padding: 5px 5px; background-color:#1f2023; color:#383b40; border:1px solid #383b40; font-weight:bold;}
    #anomaly-search tbody td.border0 {border: none;}
    #anomaly-search tbody tr:last-child td.border0 {border-bottom: 1px solid #383b40;}

    #anomaly-search tbody th {text-align:center}

    #anomaly-search .color1 {color:#ff5687}
    #anomaly-search .color1 {color:#ff5687}
    #anomaly-search .color2 {color:#c56520}
    #anomaly-search .color3 {color:#ff4c17}
    #anomaly-search .color4 {color:#9fccff}
    #anomaly-search .color5 {color:#486eff}
    #anomaly-search .color6 {color:#a43597}
</style>
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
        <td colspan="7"><a class="item color1">이빨</a>/<a class="color2">이빨+</a></td>
        <td colspan="19"><a class="item color3">중어금니</a></td>
    </tr>
    <tr>
        <td class="border0" colspan="3"></td>
        <td colspan="7"><a class="item color1">발톱</a>/<a class="color2">첨예발톱</a></td>
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
`;
  
    // th 만들기
    let anomaly_th = document.createElement("th");
    anomaly_th.innerText = "추가";
  
    // tr 만들고 th, td 추가
    let anomaly_tr = document.createElement("tr");
    anomaly_tr.id = "anomaly_tr"
    anomaly_tr.append(anomaly_th, anomaly_td);
  
    // tr을 테이블에 추가.
    let searchBody = common.form.querySelector("tbody");
    searchBody.append(anomaly_tr);
  })();
  
  
/**
 * 괴이검색 기능 이벤트 추가
 */
(function () {
    // 몬스터 괴이 레벨로 검색
    function find_ex_level(e) {
      for (let el of common.table.body.querySelectorAll("tr")) {
        let display = el.dataset.anomalyLevel == e.target.text.substr(-1) ? true : false;
        el.style.display = display ? "table-row" : "none";
      }
      // 검색폼이 viewport에 들어오도록
      common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    }
    for (let btn of common.form.querySelectorAll("#anomaly-search a.ex")) {
      btn.addEventListener("click", find_ex_level);
    }
  
    // 몬스터 괴이 재료로 검색
    function find_ex_value(e) {
      for (let el of common.table.body.querySelectorAll("tr")) {
        let display = el.dataset.anomalyAfflicted.split("/").includes(e.target.text) ? true : false;
        el.style.display = display ? "table-row" : "none";
      }
      // 검색폼이 viewport에 들어오도록
      common.form.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    }
    for (let btn of common.form.querySelectorAll("#anomaly-search td a")) {
      btn.addEventListener("click", find_ex_value);
    }
  })();