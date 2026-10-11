// 고등학교 1학년 통합과학 1~20번 핵심 원소 데이터베이스
// 각 원소의 주기성, 전자 배치, 화학적 분류 및 실생활 활용 정보를 정의합니다.

const ELEMENTS_DATA = [
  {
    number: 1,
    symbol: "H",
    nameKo: "수소",
    nameEn: "Hydrogen",
    weight: "1.008",
    period: 1, // 1주기 (전자 껍질 수: 1개)
    group: 1,   // 1족
    category: "nonmetal", // 비금속
    categoryName: "기타 비금속",
    valenceElectrons: 1, // 원자가 전자 수 (가장 바깥 껍질에서 화학 반응에 참여하는 전자)
    shells: [1], // 전자 배치 (K껍질: 1개)
    state: "기체 (25℃)",
    description: "우주에서 가장 풍부하고 가장 가벼운 원소입니다. 태양과 별의 주요 연료이며 물(H₂O)의 구성 성분입니다.",
    funFact: "우주 전체 물질 질량의 약 75%를 차지하며, 청정 수소 에너지로 주목받고 있어요!",
    color: "#4dabf7" // 비금속 테마 색상
  },
  {
    number: 2,
    symbol: "He",
    nameKo: "헬륨",
    nameEn: "Helium",
    weight: "4.003",
    period: 1,
    group: 18,
    category: "noble-gas", // 비활성 기체
    categoryName: "비활성 기체",
    valenceElectrons: 0, // 최외각 전자 2개이나 반응성이 없어 원자가 전자 수는 0
    shells: [2], // K껍질: 2개 (최대 수용)
    state: "기체 (25℃)",
    description: "1주기 18족 비활성 기체로, K 전자 껍질이 완전히 채워져 매우 안정하고 다른 물질과 반응하지 않습니다.",
    funFact: "공기보다 가벼워 파티 풍선이나 비행선에 쓰이며, 들이마시면 목소리가 가늘어지는 효과로 유명해요.",
    color: "#b197fc"
  },
  {
    number: 3,
    symbol: "Li",
    nameKo: "리튬",
    nameEn: "Lithium",
    weight: "6.94",
    period: 2, // 2주기 (전자 껍질 수: 2개)
    group: 1,  // 1족 알칼리 금속
    category: "alkali-metal", // 알칼리 금속
    categoryName: "알칼리 금속",
    valenceElectrons: 1,
    shells: [2, 1], // K: 2, L: 1
    state: "고체 (25℃)",
    description: "가장 가벼운 금속 원소로, 물과 격렬하게 반응하여 수소 기체를 발생시키고 염기성 용액을 만듭니다.",
    funFact: "스마트폰, 노트북, 전기차의 리튬 이온 2차 배터리에 없어서는 안 될 핵심 자원이에요!",
    color: "#ff8787"
  },
  {
    number: 4,
    symbol: "Be",
    nameKo: "베릴륨",
    nameEn: "Beryllium",
    weight: "9.012",
    period: 2,
    group: 2,
    category: "alkaline-earth", // 알칼리 토금속
    categoryName: "알칼리 토금속",
    valenceElectrons: 2,
    shells: [2, 2],
    state: "고체 (25℃)",
    description: "가볍고 단단하며 열을 잘 견디는 2족 알칼리 토금속 원소입니다. 에메랄드 보석의 주성분입니다.",
    funFact: "강철보다 가볍고 단단해서 제임스 웹 우주망원경의 반사경 거울과 항공우주 합금에 사용됩니다.",
    color: "#ffa94d"
  },
  {
    number: 5,
    symbol: "B",
    nameKo: "붕소",
    nameEn: "Boron",
    weight: "10.81",
    period: 2,
    group: 13,
    category: "metalloid", // 준금속 (금속과 비금속의 중간 성질)
    categoryName: "준금속",
    valenceElectrons: 3,
    shells: [2, 3],
    state: "고체 (25℃)",
    description: "금속과 비금속의 성질을 모두 지닌 준금속(중간 성질) 원소입니다. 열 충격에 강한 내열 유리에 쓰입니다.",
    funFact: "뜨거운 오븐에 넣어도 깨지지 않는 내열 유리(파이렉스)와 슬라임 장난감 제조에 활용돼요.",
    color: "#69db7c"
  },
  {
    number: 6,
    symbol: "C",
    nameKo: "탄소",
    nameEn: "Carbon",
    weight: "12.011",
    period: 2,
    group: 14,
    category: "nonmetal",
    categoryName: "기타 비금속",
    valenceElectrons: 4, // 4개의 공유 결합 가능
    shells: [2, 4],
    state: "고체 (25℃)",
    description: "원자가 전자가 4개로 최대 4개의 단일 결합이 가능하여 무수히 다양한 화합물을 만드는 생명체의 중심 원소입니다.",
    funFact: "같은 탄소라도 결합 구조에 따라 가장 무른 연필심(흑연)이 되기도 하고 가장 단단한 다이아몬드가 돼요!",
    color: "#4dabf7"
  },
  {
    number: 7,
    symbol: "N",
    nameKo: "질소",
    nameEn: "Nitrogen",
    weight: "14.007",
    period: 2,
    group: 15,
    category: "nonmetal",
    categoryName: "기타 비금속",
    valenceElectrons: 5,
    shells: [2, 5],
    state: "기체 (25℃)",
    description: "질소 분자(N₂)는 삼중 결합으로 매우 안정하며, 지구 대기의 약 78%를 차지하고 단백질의 필수 구성 성분입니다.",
    funFact: "과자가 부서지거나 기름이 산패되지 않도록 봉지 과자를 빵빵하게 채우는 충전 기체예요.",
    color: "#4dabf7"
  },
  {
    number: 8,
    symbol: "O",
    nameKo: "산소",
    nameEn: "Oxygen",
    weight: "15.999",
    period: 2,
    group: 16,
    category: "nonmetal",
    categoryName: "기타 비금속",
    valenceElectrons: 6,
    shells: [2, 6],
    state: "기체 (25℃)",
    description: "생명체의 호흡과 물질의 연소에 반드시 필요한 기체이며, 지각과 인체에서 질량 비율이 가장 높은 원소입니다.",
    funFact: "우리가 숨 쉬는 대기의 약 21%를 차지하며, 높은 성층권에서는 자외선을 막아주는 오존층(O₃)을 이룹니다.",
    color: "#4dabf7"
  },
  {
    number: 9,
    symbol: "F",
    nameKo: "플루오린",
    nameEn: "Fluorine",
    weight: "18.998",
    period: 2,
    group: 17,
    category: "halogen", // 할로젠
    categoryName: "할로젠 원소",
    valenceElectrons: 7, // 전자 1개를 얻어 안정한 음이온(-1)이 되기 쉬움
    shells: [2, 7],
    state: "기체 (25℃)",
    description: "반응성이 가장 강한 비금속 원소 중 하나로, 17족 할로젠 원소입니다. 치아 표면을 보호하는 성분으로 쓰입니다.",
    funFact: "충치를 예방하기 위해 치약에 불소(플루오린 화합물) 형태로 첨가되어 치아 법랑질을 튼튼하게 해줘요.",
    color: "#38d9a9"
  },
  {
    number: 10,
    symbol: "Ne",
    nameKo: "네온",
    nameEn: "Neon",
    weight: "20.180",
    period: 2,
    group: 18,
    category: "noble-gas",
    categoryName: "비활성 기체",
    valenceElectrons: 0,
    shells: [2, 8], // 옥텟 규칙(최외각 전자 8개) 만족, 매우 안정
    state: "기체 (25℃)",
    description: "최외각 전자 껍질이 8개의 전자로 꽉 채워져 있어 화학 반응을 거의 하지 않는 비활성 기체입니다.",
    funFact: "유리관에 네온 기체를 넣고 고전압 전기를 통과시키면 매혹적인 붉은 주황빛 네온사인이 반짝입니다.",
    color: "#b197fc"
  },
  {
    number: 11,
    symbol: "Na",
    nameKo: "나트륨 (소듐)",
    nameEn: "Sodium",
    weight: "22.990",
    period: 3, // 3주기 (전자 껍질 수: 3개)
    group: 1,  // 1족 알칼리 금속
    category: "alkali-metal",
    categoryName: "알칼리 금속",
    valenceElectrons: 1,
    shells: [2, 8, 1], // K: 2, L: 8, M: 1
    state: "고체 (25℃)",
    description: "버터처럼 칼로 쉽게 잘릴 만큼 무른 금속으로, 물과 폭발적으로 반응해 수소 기체와 수산화나트륨(강염기)을 만듭니다.",
    funFact: "위험한 금속이지만 독성 염소(Cl) 기체와 반응하면 맛있는 식탁의 소금(NaCl)이 됩니다!",
    color: "#ff8787"
  },
  {
    number: 12,
    symbol: "Mg",
    nameKo: "마그네슘",
    nameEn: "Magnesium",
    weight: "24.305",
    period: 3,
    group: 2,
    category: "alkaline-earth",
    categoryName: "알칼리 토금속",
    valenceElectrons: 2,
    shells: [2, 8, 2],
    state: "고체 (25℃)",
    description: "가볍고 단단한 은백색 금속으로, 연소할 때 눈부신 백색 빛을 뿜어내며 식물의 광합성 엽록소 핵심 중심 원소입니다.",
    funFact: "노트북 바디 합금, 불꽃놀이의 흰색 섬광탄, 그리고 눈 떨림 증상을 예방하는 건강 보충제로 친숙해요.",
    color: "#ffa94d"
  },
  {
    number: 13,
    symbol: "Al",
    nameKo: "알루미늄",
    nameEn: "Aluminium",
    weight: "26.982",
    period: 3,
    group: 13,
    category: "post-transition", // 전이후 금속
    categoryName: "금속 원소",
    valenceElectrons: 3,
    shells: [2, 8, 3],
    state: "고체 (25℃)",
    description: "지각에 세 번째로 많고 금속 중에서는 가장 풍부한 원소입니다. 가볍고 표면에 얇은 산화 피막이 생겨 녹이 잘 슬지 않습니다.",
    funFact: "주방의 알루미늄 호일, 음료수 캔, 가벼운 비행기 기체 프레임 제작에 널리 사용됩니다.",
    color: "#ffd43b"
  },
  {
    number: 14,
    symbol: "Si",
    nameKo: "규소 (실리콘)",
    nameEn: "Silicon",
    weight: "28.085",
    period: 3,
    group: 14,
    category: "metalloid",
    categoryName: "준금속",
    valenceElectrons: 4,
    shells: [2, 8, 4],
    state: "고체 (25℃)",
    description: "지각에서 산소 다음으로 풍부한 원소(모래와 암석의 주성분)이며, 현대 IT 문명을 지탱하는 반도체의 핵심 원소입니다.",
    funFact: "순수한 모래(석영)에서 추출한 규소는 컴퓨터 CPU, 인공지능 칩, 태양광 패널의 웨이퍼로 재탄생합니다.",
    color: "#69db7c"
  },
  {
    number: 15,
    symbol: "P",
    nameKo: "인",
    nameEn: "Phosphorus",
    weight: "30.974",
    period: 3,
    group: 15,
    category: "nonmetal",
    categoryName: "기타 비금속",
    valenceElectrons: 5,
    shells: [2, 8, 5],
    state: "고체 (25℃)",
    description: "생명체의 유전 물질인 DNA, RNA의 뼈대와 뼈, 치아의 주성분입니다. 식물 성장에 필수적인 비료 3대 요소 중 하나입니다.",
    funFact: "성냥갑 옆면의 마찰면에 붉은 인(적린)이 칠해져 있어 불을 붙일 때 마찰열로 발화합니다.",
    color: "#4dabf7"
  },
  {
    number: 16,
    symbol: "S",
    nameKo: "황",
    nameEn: "Sulfur",
    weight: "32.06",
    period: 3,
    group: 16,
    category: "nonmetal",
    categoryName: "기타 비금속",
    valenceElectrons: 6,
    shells: [2, 8, 6],
    state: "고체 (25℃)",
    description: "독특한 노란색을 띠는 고체 비금속 원소로 화산 지대와 온천에 많으며, 머리카락 단백질(케라틴) 결합에도 관여합니다.",
    funFact: "천연고무에 황을 첨가(가황 공정)하면 끈적이지 않고 탄성이 뛰어난 질긴 타이어 고무가 완성됩니다.",
    color: "#4dabf7"
  },
  {
    number: 17,
    symbol: "Cl",
    nameKo: "염소",
    nameEn: "Chlorine",
    weight: "35.45",
    period: 3,
    group: 17,
    category: "halogen",
    categoryName: "할로젠 원소",
    valenceElectrons: 7,
    shells: [2, 8, 7],
    state: "기체 (25℃)",
    description: "황록색의 자극적인 냄새가 나는 17족 할로젠 원소입니다. 강한 산화력으로 살균 및 소독 작용이 탁월합니다.",
    funFact: "우리가 마시는 수돗물의 정수 살균, 수영장 소독제, 그리고 락스 표백제의 핵심 유효 성분입니다.",
    color: "#38d9a9"
  },
  {
    number: 18,
    symbol: "Ar",
    nameKo: "아르곤",
    nameEn: "Argon",
    weight: "39.948",
    period: 3,
    group: 18,
    category: "noble-gas",
    categoryName: "비활성 기체",
    valenceElectrons: 0,
    shells: [2, 8, 8],
    state: "기체 (25℃)",
    description: "그리스어로 '게으른 자(비활성)'라는 뜻을 가졌으며, 대기 중에 세 번째로 많은 기체(약 0.93%)입니다.",
    funFact: "백열전구의 필라멘트가 타서 끊어지지 않도록 보호하는 전구 내부 충전 기체 및 특수 용접에 쓰입니다.",
    color: "#b197fc"
  },
  {
    number: 19,
    symbol: "K",
    nameKo: "칼륨 (포타슘)",
    nameEn: "Potassium",
    weight: "39.098",
    period: 4, // 4주기 (전자 껍질 수: 4개)
    group: 1,  // 1족 알칼리 금속
    category: "alkali-metal",
    categoryName: "알칼리 금속",
    valenceElectrons: 1,
    shells: [2, 8, 8, 1], // K: 2, L: 8, M: 8, N: 1
    state: "고체 (25℃)",
    description: "반응성이 나트륨보다 훨씬 큰 알칼리 금속 원소로, 물에 닿으면 보라색 불꽃을 내며 폭발적으로 반응합니다.",
    funFact: "인체 내에서 나트륨과 함께 신경 신호 전달과 혈압 조절을 담당하며, 바나나와 감자에 풍부해요.",
    color: "#ff8787"
  },
  {
    number: 20,
    symbol: "Ca",
    nameKo: "칼슘",
    nameEn: "Calcium",
    weight: "40.078",
    period: 4,
    group: 2,
    category: "alkaline-earth",
    categoryName: "알칼리 토금속",
    valenceElectrons: 2,
    shells: [2, 8, 8, 2], // K: 2, L: 8, M: 8, N: 2
    state: "고체 (25℃)",
    description: "생체 내에서 가장 풍부한 금속 원소로, 단단한 뼈와 치아를 형성하고 근육 수축과 혈액 응고에 관여합니다.",
    funFact: "우유와 멸치에 많이 들어 있으며, 조개껍데기, 석회암, 대리석, 분필의 주성분(탄산칼슘)입니다.",
    color: "#ffa94d"
  }
];

// 분류 범례 정보 정의
const CATEGORY_MAP = {
  "alkali-metal": { name: "알칼리 금속 (1족)", color: "#ff8787", desc: "물과 격렬히 반응하여 수소 기체 생성" },
  "alkaline-earth": { name: "알칼리 토금속 (2족)", color: "#ffa94d", desc: "원자가 전자가 2개인 반응성 좋은 금속" },
  "post-transition": { name: "금속 원소", color: "#ffd43b", desc: "전기 및 열 전도성이 뛰어난 가벼운 금속" },
  "metalloid": { name: "준금속", color: "#69db7c", desc: "금속과 비금속의 중간 성질 (반도체)" },
  "nonmetal": { name: "기타 비금속", color: "#4dabf7", desc: "생명체를 구성하는 필수적 비금속 원소" },
  "halogen": { name: "할로젠 (17족)", color: "#38d9a9", desc: "반응성이 매우 크며 1가 음이온 형성" },
  "noble-gas": { name: "비활성 기체 (18족)", color: "#b197fc", desc: "최외각 전자 껍질이 꽉 차 매우 안정" }
};
