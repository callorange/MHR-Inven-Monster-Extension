
/**
 * 검색창 괴이검색 내용
 */
(function () {
    // td를 만든다.
    let anomaly_td = document.createElement("td");
    anomaly_td.id = "anomaly_td";
    anomaly_td.style.padding = "0px";
    anomaly_td.innerHTML = `
<style>
    #anomaly-search {
        box-sizing: border-box;
        border-collapse: separate; 
        border-spacing: 0;
        table-layout: auto; 
        width: calc(100% - 2px);
        margin: 0 auto;
        max-width: 100%;
        word-break: keep-all;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        border: 1px solid #e9ecef;
        font-family: 'Inter', 'Noto Sans KR', sans-serif;
    }

    #anomaly-search thead th {
        position: sticky; top: 0px; 
        padding: 6px 8px; 
        background: linear-gradient(135deg, #b30000, #dc143c); 
        color: white; 
        border-bottom: 2px solid #8c0000; 
        text-align: left;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    #anomaly-search tbody th,
    #anomaly-search tbody td {
        padding: 2px 2px; 
        background-color: #ffffff; 
        color: #333333; 
        border: 1px solid #f1f3f5; 
        font-weight: 600;
        transition: background-color 0.2s ease;
    }
    
    #anomaly-search tbody tr:hover td {
        background-color: #f8f9fa;
    }

    #anomaly-search tbody td.border0 {border: none; background-color: transparent;}
    #anomaly-search tbody tr:last-child td.border0 {border-bottom: 1px solid #f1f3f5;}

    #anomaly-search tbody th {
        text-align: center;
        background-color: #f8f9fa;
        color: #495057;
    }

    #anomaly-search tbody td a.item, #anomaly-search tbody th a.ex {
        display: inline-block;
        padding: 3px 6px;
        border-radius: 6px;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        transition: all 0.2s ease;
        cursor: pointer;
        text-decoration: none;
    }

    #anomaly-search tbody td a.item:hover, #anomaly-search tbody th a.ex:hover {
        background-color: #ffffff;
        border-color: #ced4da;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    }

    /* Light Theme 대비 가독성 확보된 비비드 컬러 세트 */
    #anomaly-search .color1 {color: #d6336c;}
    #anomaly-search .color2 {color: #d9480f;}
    #anomaly-search .color3 {color: #e03131;}
    #anomaly-search .color4 {color: #1c7ed6;}
    #anomaly-search .color5 {color: #3b5bdb;}
    #anomaly-search .color6 {color: #9c36b5;}
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
        common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
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
        common.form.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    for (let btn of common.form.querySelectorAll("#anomaly-search td a")) {
        btn.addEventListener("click", find_ex_value);
    }
})();