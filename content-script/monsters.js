/**
 * 몬스터 정보
 */

/**
 * @typedef {Object} MonsterInfo 몬스터 정보 객체
 * @property {String} name 이름. 인벤 몬스터 페이지에 세팅된 이름이어야함.
 * @property {Object} ex 괴이화 정보
 * @property {Number} ex.level 괴이레벨. 0~4
 * @property {value} ex.value 괴이소재.
 * @property {Object} anti 특효스킬 정보
 * @property {Boolean} anti.aerial 파공룡주(아수종 특효: 비행 능력을 가진 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.dragon 파룡룡주(용 특효: 조룡종, 비룡종, 수룡종, 해룡종, 어룡종, 아룡종 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.aquatic 파수룡주(공서계 특효: 아수종 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.franged 파류룡주(수서계 특효: 물가에서 사는 몬스터에게 주는 대미지 증가)
 * @property {Boolean} anti.small 파소룡주(소형 특효: 소형 몬스터에게 주는 대미지 증가)
 * @property {String} comment 추가 코멘트
 */

(function () {
  /**
   * 몬스터 추가 정보 기본
   * @type {MonsterInfo} 기본 몬스터 정보
   */
  let default_monster = {
    name: "",
    ex: {
      level: 0,
      value: "",
    },
    anti: {
      aerial: false,
      dragon: false,
      aquatic: false,
      franged: false,
      small: true,
    },
    comment: "",
  };

  /**
   * 몬스터 추가 정보 객체 배열
   * @type {MonsterInfo[]} 몬스터정보 배열
   */
  const monsters = [
    {
      name: "명연룡가이아델름",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "금사자격앙 라잔",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "천회룡샤가르마가라",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "은작룡멜-제나",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "치비지주야츠카다키 아종",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "천인룡셀레기오스",
      ex: {
        level: 5,
        value: "흉뿔",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "흑식룡고어-마가라",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "극룡에스피나스",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "전룡라이젝스",
      ex: {
        level: 5,
        value: "흉비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "빙랑룡루나가론",
      ex: {
        level: 5,
        value: "흉뼈",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "용옹룡오로미도로 아종",
      ex: {
        level: 5,
        value: "흉뼈",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "낫게쇼군기자미",
      ex: {
        level: 3,
        value: "갑각",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "강전수가란고르무",
      ex: {
        level: 4,
        value: "이빨",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "원호룡원망 서린 마가이마가도",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "빙인어룡이소네미쿠니 아종",
      ex: {
        level: 4,
        value: "발톱",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "비천구수비슈텐고 아종",
      ex: {
        level: 3,
        value: "갑각",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "방패게다이묘자자미",
      ex: {
        level: 2,
        value: "피",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "껍질부파->타격",
    },
    {
      name: "천혜룡영묘한 광채의 발파루크",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "뇌신룡백룡 연원 나루하타타히메",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "각룡주인 디아블로스",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "화룡주인 리오레우스",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "뇌랑룡주인 진오우거",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "포호룡주인 타마미츠네",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "자화룡주인 리오레이아",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "청웅수주인 아오아시라",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "폭린룡바젤기우스",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "하룡오나즈치",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "강룡크샬다오라",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
      },
      comment: "풍압->독 유효",
    },
    {
      name: "염왕룡테오-테스카토르",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "뇌신룡나루하타타히메",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "풍신룡이부시마키히코",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: true,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "금사자라잔",
      ex: {
        level: 0,
        value: "",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "비지주야츠카다키",
      ex: {
        level: 4,
        value: "발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "각룡디아블로스",
      ex: {
        level: 5,
        value: "흉뿔",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "굉룡티가렉스",
      ex: {
        level: 5,
        value: "흉뼈",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "뇌랑룡진오우거",
      ex: {
        level: 5,
        value: "흉뿔",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "이옹룡오로미도로",
      ex: {
        level: 4,
        value: "발톱",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "화룡리오레우스",
      ex: {
        level: 5,
        value: "흉비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "설귀수고샤하기",
      ex: {
        level: 4,
        value: "발톱",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "포호룡타마미츠네",
      ex: {
        level: 5,
        value: "흉비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "신룡나르가쿠르가",
      ex: {
        level: 4,
        value: "이빨",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "만악룡안쟈나프",
      ex: {
        level: 3,
        value: "비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
      },
      comment: "코피->진흙구리로 가능",
    },
    {
      name: "원호룡마가이마가도",
      ex: {
        level: 4,
        value: "이빨",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "비뢰룡토비카가치",
      ex: {
        level: 3,
        value: "비늘",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "빙아룡벨리오로스",
      ex: {
        level: 4,
        value: "이빨",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "자화룡리오레이아",
      ex: {
        level: 3,
        value: "비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "인어룡이소네미쿠니",
      ex: {
        level: 3,
        value: "갑각",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "암룡바살모스",
      ex: {
        level: 2,
        value: "용골",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "이어룡쥬라토도스",
      ex: {
        level: 3,
        value: "갑각",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
      },
      comment: "진흙상태:수속(O)/뇌속(X)",
    },
    {
      name: "독요조푸케푸케",
      ex: {
        level: 3,
        value: "비늘",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "천구수비슈텐고",
      ex: {
        level: 2,
        value: "피",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "하동와요츠미와두",
      ex: {
        level: 2,
        value: "피",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "기괴룡푸루푸루",
      ex: {
        level: 2,
        value: "피",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "토사룡볼보로스",
      ex: {
        level: 2,
        value: "용골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
      },
      comment: "머리부파->타격<br>진흙상태:수속(O)/화속(X)",
    },
    {
      name: "수괴수로아루드로스",
      ex: {
        level: 2,
        value: "용골",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: true,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "산조아케노시름",
      ex: {
        level: 2,
        value: "용골",
      },
      anti: {
        aerial: true,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "적갑수랑그로토라",
      ex: {
        level: 1,
        value: "뼈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "백토수울크스스",
      ex: {
        level: 1,
        value: "뼈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "청웅수아오아시라",
      ex: {
        level: 1,
        value: "뼈",
      },
      anti: {
        aerial: false,
        dragon: false,
        aquatic: false,
        franged: true,
        small: false,
      },
      comment: "",
    },
    {
      name: "독구룡도스프로기",
      ex: {
        level: 1,
        value: "가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "소조쿠루루야크",
      ex: {
        level: 1,
        value: "가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "면구룡도스바기",
      ex: {
        level: 1,
        value: "가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
      comment: "",
    },
    {
      name: "겸유룡오사이즈치",
      ex: {
        level: 1,
        value: "가죽",
      },
      anti: {
        aerial: false,
        dragon: true,
        aquatic: false,
        franged: false,
        small: false,
      },
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

    element.dataset.exLevel = current_monster.ex.level;
    element.dataset.exValue = current_monster.ex.value;
    element.dataset.aerial = current_monster.anti.aerial;
    element.dataset.dragon = current_monster.anti.dragon;
    element.dataset.aquatic = current_monster.anti.aquatic;
    element.dataset.franged = current_monster.anti.franged;
    element.dataset.small = current_monster.anti.small;
    element.dataset.comment = current_monster.comment;
  }
})();
