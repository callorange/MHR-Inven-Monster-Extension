/**
 * 몬스터 정보
 */

/**
 * @typedef {Object} MonsterInfo 몬스터 정보 객체
 * @property {String} name 이름. 인벤 몬스터 페이지에 세팅된 이름이어야함.
 * @property {Object} anomaly 괴이화 정보
 * @property {Number} anomaly.level 괴이레벨. 0~4
 * @property {String} anomaly.afflicted 괴이소재.
 * @property {Object} anti 특효스킬 정보
 * @property {Boolean} anti.aerial 파공룡주(아수종 특효: 비행 능력을 가진 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.dragon 파룡룡주(용 특효: 조룡종, 비룡종, 수룡종, 해룡종, 어룡종, 아룡종 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.aquatic 파류룡주(수서계 특효: 물가에서 사는 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.franged 파수룡주(공서계 특효: 아수종 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.small 파소룡주(소형 특효: 소형 몬스터에게 주는 대미지 증가)
 * @property {String} element 추천 속성
 * @property {Boolean} elembane 속통룡주 추천
 * @property {String} comment 추가 코멘트
 */

(function () {
  /**
   * 몬스터 추가 정보 기본
   * @type {MonsterInfo} 기본 몬스터 정보
   */
  let default_monster = {
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

  /**
   * 몬스터 추가 정보 객체 배열
   * @type {MonsterInfo[]} 몬스터정보 배열
   */
  const monsters = [
    {
      name: "청웅수아오아시라",
      anomaly: {
        level: 1,
        afflicted: "뼈/견골/중골",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "적갑수랑그로토라",
      anomaly: {
        level: 1,
        afflicted: "뼈/견골/중골",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "백토수울크스스",
      anomaly: {
        level: 1,
        afflicted: "뼈/견골/중골",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    
    {
      name: "겸유룡오사이즈치",
      anomaly: {
        level: 1,
        afflicted: "가죽/가죽+/두툼가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "면구룡도스바기",
      anomaly: {
        level: 1,
        afflicted: "가죽/가죽+/두툼가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "독구룡도스프로기",
      anomaly: {
        level: 1,
        afflicted: "가죽/가죽+/두툼가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },
    {
      name: "소조쿠루루야크",
      anomaly: {
        level: 1,
        afflicted: "가죽/가죽+/두툼가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [2],
      comment: "",
    },

    {
      name: "산조아케노시름",
      anomaly: {
        level: 2,
        afflicted: "용골/견룡골/중용골",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "수괴수로아루드로스",
      anomaly: {
        level: 2,
        afflicted: "용골/견룡골/중용골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "토사룡볼보로스",
      anomaly: {
        level: 2,
        afflicted: "용골/견룡골/중용골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화,수",
      elembane: [1,1],
      comment: "머리부파->타격<br>진흙상태:수속(O)/화속(X)",
    },
    {
      name: "암룡바살모스",
      anomaly: {
        level: 2,
        afflicted: "용골/견룡골/중용골",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [1],
      comment: "",
    },

    {
      name: "방패게다이묘자자미",
      anomaly: {
        level: 2,
        afflicted: "피/깨끗한피/정농혈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "기괴룡푸루푸루",
      anomaly: {
        level: 2,
        afflicted: "피/깨끗한피/정농혈",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "하동와요츠미와두",
      anomaly: {
        level: 2,
        afflicted: "피/깨끗한피/정농혈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "천구수비슈텐고",
      anomaly: {
        level: 2,
        afflicted: "피/깨끗한피/정농혈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },

    {
      name: "독요조푸케푸케",
      anomaly: {
        level: 3,
        afflicted: "비늘/비늘+/두툼비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "만악룡안쟈나프",
      anomaly: {
        level: 3,
        afflicted: "비늘/비늘+/두툼비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "코피->진흙구리로 가능",
    },
    {
      name: "자화룡리오레이아",
      anomaly: {
        level: 3,
        afflicted: "비늘/비늘+/두툼비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    {
      name: "비뢰룡토비카가치",
      anomaly: {
        level: 3,
        afflicted: "비늘/비늘+/두툼비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },

    {
      name: "이어룡쥬라토도스",
      anomaly: {
        level: 3,
        afflicted: "갑각/견갑각/중갑각",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "수,뇌",
      elembane: [1,1],
      comment: "진흙상태:수속(O)/뇌속(X)",
    },
    {
      name: "비천구수비슈텐고 아종",
      anomaly: {
        level: 3,
        afflicted: "갑각/견갑각/중갑각",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "인어룡이소네미쿠니",
      anomaly: {
        level: 3,
        afflicted: "갑각/견갑각/중갑각",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "낫게쇼군기자미",
      anomaly: {
        level: 3,
        afflicted: "갑각/견갑각/중갑각",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },

    {
      name: "원호룡마가이마가도",
      anomaly: {
        level: 4,
        afflicted: "이빨/이빨+/중어금니",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [2],
      comment: "",
    },
    {
      name: "빙아룡벨리오로스",
      anomaly: {
        level: 4,
        afflicted: "이빨/이빨+/중어금니",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [2],
      comment: "",
    },
    {
      name: "신룡나르가쿠르가",
      anomaly: {
        level: 4,
        afflicted: "이빨/이빨+/중어금니",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "",
    },
    {
      name: "강전수가란고르무",
      anomaly: {
        level: 4,
        afflicted: "이빨/이빨+/중어금니",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "뇌,빙",
      elembane: [2,2],
      comment: "",
    },

    {
      name: "비지주야츠카다키",
      anomaly: {
        level: 4,
        afflicted: "발톱/첨예발톱/억센발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [1],
      comment: "",
    },
    {
      name: "설귀수고샤하기",
      anomaly: {
        level: 4,
        afflicted: "발톱/첨예발톱/억센발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "화",
      elembane: [2],
      comment: "",
    },
    {
      name: "이옹룡오로미도로",
      anomaly: {
        level: 4,
        afflicted: "발톱/첨예발톱/억센발톱",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "빙인어룡이소네미쿠니 아종",
      anomaly: {
        level: 4,
        afflicted: "발톱/첨예발톱/억센발톱",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [2],
      comment: "",
    },

    {
      name: "각룡디아블로스",
      anomaly: {
        level: 5,
        afflicted: "흉뿔/흉첨예뿔/흉억센뿔",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },
    {
      name: "천인룡셀레기오스",
      anomaly: {
        level: 5,
        afflicted: "흉뿔/흉첨예뿔/흉억센뿔",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [2],
      comment: "",
    },
    {
      name: "뇌랑룡진오우거",
      anomaly: {
        level: 5,
        afflicted: "흉뿔/흉첨예뿔/흉억센뿔",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [2],
      comment: "",
    },

    {
      name: "빙랑룡루나가론",
      anomaly: {
        level: 5,
        afflicted: "흉뼈/흉견골/흉중골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [2],
      comment: "",
    },
    {
      name: "용옹룡오로미도로 아종",
      anomaly: {
        level: 5,
        afflicted: "흉뼈/흉견골/흉중골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "굉룡티가렉스",
      anomaly: {
        level: 5,
        afflicted: "흉뼈/흉견골/흉중골",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [3],
      comment: "머리만 25",
    },

    {
      name: "전룡라이젝스",
      anomaly: {
        level: 5,
        afflicted: "흉비늘/흉비늘+/흉두툼비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [1],
      comment: "",
    },
    {
      name: "포호룡타마미츠네",
      anomaly: {
        level: 5,
        afflicted: "흉비늘/흉비늘+/흉두툼비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [2],
      comment: "",
    },
    {
      name: "화룡리오레우스",
      anomaly: {
        level: 5,
        afflicted: "흉비늘/흉비늘+/흉두툼비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },

    {
      name: "극룡에스피나스",
      anomaly: {
        level: 6,
        afflicted: "흉갑각/흉견갑각/흉중갑각",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },
    {
      name: "흑식룡고어-마가라",
      anomaly: {
        level: 6,
        afflicted: "흉갑각/흉견갑각/흉중갑각",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [1],
      comment: "",
    },
    {
      name: "폭린룡바젤기우스",
      anomaly: {
        level: 6,
        afflicted: "흉갑각/흉견갑각/흉중갑각",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [2],
      comment: "흥분시 머리 뇌속 20",
    },

    {
      name: "치비지주야츠카다키 아종",
      anomaly: {
        level: 6,
        afflicted: "흉발톱/흉첨예발톱/흉억센발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "금사자라잔",
      anomaly: {
        level: 6,
        afflicted: "흉발톱/흉첨예발톱/흉억센발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },

    {
      name: "원호룡원망 서린 마가이마가도",
      anomaly: {
        level: 7,
        afflicted: "흉이빨/흉이빨+/흉중어금니",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [2],
      comment: "",
    },
    {
      name: "금사자격앙 라잔",
      anomaly: {
        level: 7,
        afflicted: "흉이빨/흉이빨+/흉중어금니",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "격앙상태:머리데미지",
    },

    {
      name: "극다룡에스피나스 아종",
      anomaly: {
        level: 7,
        afflicted: "흉피/흉깨끗한피/흉농혈",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "폭린룡홍련의 솟구치는 바젤기우스",
      anomaly: {
        level: 7,
        afflicted: "흉피/흉깨끗한피/흉농혈",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },

    {
      name: "은화룡리오레우스 희소종",
      anomaly: {
        level: 7,
        afflicted: "흉익막/흉날개/흉억센날개",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [3],
      comment: "",
    },
    {
      name: "금화룡리오레이아 희소종",
      anomaly: {
        level: 7,
        afflicted: "흉익막/흉날개/흉억센날개",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [1],
      comment: "",
    },
    {
      name: "하룡괴이 극복 오나즈치",
      anomaly: {
        level: 8,
        afflicted: "(용골)/(견룡골)/(중룡골)",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "염왕룡괴이 극복 테오-테스카토르",
      anomaly: {
        level: 8,
        afflicted: "(용골)/(견룡골)/(중룡골)",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [2],
      comment: "",
    },
    {
      name: "강룡괴이 극복 크샬다오라",
      anomaly: {
        level: 8,
        afflicted: "(용골)/(견룡골)/(중룡골)",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [1],
      comment: "풍압->독 유효",
    },
    {
      name: "흑식룡혼돈에 신음하는 고어-마가라",
      anomaly: {
        level: 8,
        afflicted: "흉피/흉깨끗한피/흉농혈",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [2],
      comment: "",
    },
    {
      name: "천혜룡괴이 극복 발파루크",
      anomaly: {
        level: 9,
        afflicted: "(용혈)/(정용혈)/(농용혈)",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수,빙",
      elembane: [1,1],
      comment: "",
    },
    {
      name: "천회룡괴이 극복 샤가르마가라",
      anomaly: {
        level: 9,
        afflicted: "(용혈)/(정용혈)/(농용혈)",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },

    /****************************************************************
     ****************************************************************
     ****************************************************************/

    {
      name: "월신룡나르가쿠르가 희소종",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },
    {
      name: "명연룡가이아델름",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    {
      name: "천회룡샤가르마가라",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    {
      name: "은작룡멜-제나",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    {
      name: "천혜룡영묘한 광채의 발파루크",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수,빙",
      elembane: [1,1],
      comment: "",
    },
    {
      name: "뇌신룡백룡 연원 나루하타타히메",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [2],
      comment: "",
    },
    {
      name: "하룡오나즈치",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "머리파괴->반투명",
    },
    {
      name: "강룡크샬다오라",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [1],
      comment: "풍압->독 유효",
    },
    {
      name: "염왕룡테오-테스카토르",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "수",
      elembane: [2],
      comment: "",
    },
    {
      name: "뇌신룡나루하타타히메",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [2],
      comment: "",
    },
    {
      name: "풍신룡이부시마키히코",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    {
      name: "염호룡타마미츠네 희소종",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [1],
      comment: "",
    },
    {
      name: "빙룡이베르카나",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "폭풍룡아마츠마가츠치",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },
    {
      name: "은작룡원초를 새기는 멜-제나",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [3],
      comment: "",
    },
    
    /****************************************************************
     ****************************************************************
     ****************************************************************/

    {
      name: "각룡주인 디아블로스",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [3],
      comment: "",
    },
    {
      name: "화룡주인 리오레우스",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [2],
      comment: "",
    },
    {
      name: "뇌랑룡주인 진오우거",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "빙",
      elembane: [2],
      comment: "",
    },
    {
      name: "포호룡주인 타마미츠네",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      element: "뇌",
      elembane: [2],
      comment: "",
    },
    {
      name: "자화룡주인 리오레이아",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      element: "용",
      elembane: [2],
      comment: "",
    },
    {
      name: "청웅수주인 아오아시라",
      anomaly: {
        level: 0,
        afflicted: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      element: "화",
      elembane: [3],
      comment: "",
    },

  ];

  /**
   * 몬스터 정보 세팅
   */
  for (let element of common.table.body.querySelectorAll("tr")) {
    let current_monster =
      monsters.find((monster) => element.dataset.name == monster.name) ||
      default_monster;

    element.dataset.anomalyLevel = current_monster.anomaly.level;
    element.dataset.anomalyAfflicted = current_monster.anomaly.afflicted;
    element.dataset.antiAerial = current_monster.anti.aerial;
    element.dataset.antiDragon = current_monster.anti.dragon;
    element.dataset.antiAquatic = current_monster.anti.aquatic;
    element.dataset.antiFranged = current_monster.anti.franged;
    element.dataset.antiSmall = current_monster.anti.small;
    element.dataset.element = current_monster.element;
    element.dataset.elembane = current_monster.elembane;
    element.dataset.comment = current_monster.comment;
  }
})();
