// ===== 종목 사전 — 앱(index.html)과 선생님 페이지(report.html)가 같이 쓴다 =====
// 종목 이름만 보고 ① 어떤 기구인지 ② 한쪽씩인지 양쪽 같이인지 ③ BTT·CCT·RMT 중 어디인지 를 정하고,
// 각각 "왜 그런지"와 "근거가 얼마나 확실한지"를 같이 돌려준다.
//
// 근거 (지어내지 않기 — 아래 링크에 있는 말만 쓴다)
//  · BTT·CCT·RMT 뜻     : WeckMethod 공식 강좌 소개 (만든 사람 David Weck)
//  · CCT 의 예(스플릿·런지·프레스·로우) : WeckMethod 공식 글 "Coiling Core Training: Practical Applications"
//  · 버티는 코어(브레이싱) : WeckMethod 공식 글 "Learn 2 Forms of Core Strength"
//  · RMT 도구(클럽·로프)  : WeckMethod 공식 글 "Rotational Movement Training: Functional Application of Swinging"
//  · 자유 무게 vs 머신     : Haugen 외 2023, 메타분석 13편 1,016명
//  · 한쪽 vs 양쪽          : Kassiano 외 2025, Sports Medicine, 메타분석 9편
(function(){
  const SRC = {
    weckDef:   { url:'https://www.weckmethod.com/services/rotational-movement-training-live-instructor-course',
                 name:'WeckMethod 공식 — RMT 강좌 소개 (BTT·CCT·RMT 정의)' },
    weckCCT:   { url:'https://www.weckmethod.com/articles/coiling-core-training-practical-applications-in-strength-training',
                 name:'WeckMethod 공식 — CCT 를 근력운동에 쓰는 법' },
    weckBrace: { url:'https://www.weckmethod.com/articles/rotational-movement-training-learn-2-forms-of-core-strength',
                 name:'WeckMethod 공식 — 두 가지 코어 (꼬는 코어 · 버티는 코어)' },
    weckRMT:   { url:'https://www.weckmethod.com/articles/rotational-movement-training-core-tenets',
                 name:'WeckMethod 공식 — RMT 스윙 (클럽·로프)' },
    freeVsMachine: { url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10426227/',
                 name:'Haugen 외 2023 · 자유 무게 vs 머신 메타분석 (13편 · 1,016명)' },
    uniVsBi:   { url:'https://doi.org/10.1007/s40279-024-02169-z',
                 name:'Kassiano 외 2025 · Sports Medicine · 한쪽 vs 양쪽 메타분석 (9편)' },
  };

  // ----- BTT · CCT · RMT (+ 셋 다 아님 · 확인 필요) -----
  const WECK = {
    BTT: { key:'BTT', full:'Bilateral Torsion Training', kr:'양쪽 같이 비틀기', color:'#5B9BD5',
           kid:'양손·양발이 <b>똑같이 같이</b> 움직여서 몸통을 한쪽으로 꼴 수 없는 운동. 그래도 몸통이 비틀리는 힘은 같이 써요.',
           official:'제자리멀리뛰기 · 접영 · 전통 파워리프팅(스쿼트·벤치프레스·데드리프트) · 키핑 풀업',
           src:'weckDef' },
    CCT: { key:'CCT', full:'Coiling Core Training', kr:'한쪽으로 꼬아 버티기', color:'#E8A33D',
           kid:'<b>한 번에 한쪽</b>으로 옆구리를 굽히며 몸통을 꽈배기처럼 꼬고(코일링), 그 꼰 힘으로 버티거나 미는 운동.',
           official:'로열 코일(꼬고 버티기) · 스플릿 스쿼트·런지 · 꼰 자세에서 시작하는 프레스 · 끝에서 꼬아 마무리하는 로우',
           src:'weckCCT' },
    RMT: { key:'RMT', full:'Rotational Movement Training', kr:'이쪽 꼬임 → 저쪽 꼬임', color:'#4FA8A0',
           kid:'한쪽으로 꼰 힘을 <b>반대쪽으로 넘기며</b> 흐르듯 움직이는 운동. 클럽·로프를 휘두르는 스윙이 대표예요.',
           official:'RMT 클럽 스윙(8자 돌리기 등) · RMT 로프',
           src:'weckRMT' },
    '일반': { key:'일반', full:'', kr:'셋 다 아님', color:'#7A858C',
           kid:'WeckMethod 가 셋 중 어디라고 말한 적 없는 운동. 기계·한 관절 운동, 유산소, 스트레칭·호흡, '
              + '그리고 플랭크 같은 <b>버티는 코어</b>(Weck 은 이걸 "브레이싱 코어"라고 따로 불러요).',
           official:'', src:'weckBrace' },
    '?':  { key:'?', full:'', kr:'선생님 확인', color:'#C1666B',
           kid:'선생님만의 동작이라 공식 자료에 없어요. 선생님께 여쭤보고 종목 목록에서 단추로 정해요.',
           official:'', src:null },
  };
  // 근거가 얼마나 확실한지
  const BASIS = {
    '공식': 'WeckMethod 가 직접 예로 든 운동',
    '정의': '공식 정의에 맞춰 나눈 것',
    '확인': '공식 자료에 없음 · 선생님 확인 필요',
    '수정': '앱에서 직접 바꾼 것',
  };

  // ----- 기구 -----
  const TOOLS = {
    '바벨':     { icon:'🏋️', kid:'양손이 한 봉을 같이 들어요. <b>가장 무겁게</b> 들 수 있어 힘 키우기의 기본. 대신 센 쪽이 몰래 더 일할 수 있어요.',
                  short:'가장 무겁게 → 힘' },
    '덤벨':     { icon:'💪', kid:'양손이 <b>따로</b> 버텨요. 약한 쪽이 바로 드러나고, 팔이 더 넓게 움직여요.',
                  short:'좌우 따로 → 약한 쪽이 드러남' },
    '케이블':   { icon:'🧵', kid:'줄이 처음부터 끝까지 당겨줘서 근육이 쉬지 못해요. 자극 찾기·마무리에 좋아요.',
                  short:'끝까지 당김 일정 → 자극 찾기' },
    '머신':     { icon:'⚙️', kid:'기계가 길을 잡아줘서 안전해요. 근육 하나에 집중해 끝까지 밀어붙이기 좋아요. 균형 잡는 연습은 적어요.',
                  short:'길이 정해짐 → 안전하게 집중' },
    '케틀벨':   { icon:'🔔', kid:'무게가 손 밖에 매달려 있어서 어깨·몸통이 흔들리지 않게 잡아야 해요.',
                  short:'무게가 손 밖 → 어깨·몸통 안정' },
    '맨몸':     { icon:'🤸', kid:'내 몸무게로 해요. 몸을 조절하는 힘과 관절 안정에 좋아요.',
                  short:'몸 조절 · 관절 안정' },
    '회전 도구': { icon:'🌀', kid:'클럽·로프를 휘둘러 몸통 회전으로 힘을 보내요.',
                  short:'휘두르기 → 회전 힘' },
    '유산소':   { icon:'🫀', kid:'심장·폐를 튼튼하게. 회복과 체지방 관리에.',
                  short:'심폐 · 회복' },
    '회복':     { icon:'🧘', kid:'굳은 곳을 풀고 숨을 고르는 시간.',
                  short:'풀기 · 숨 고르기' },
    '교정':     { icon:'🧩', kid:'틀어진 자세를 바로잡는 동작. 무게 없이, 가볍게, 정확하게, 자주.',
                  short:'자세 바로잡기' },
    '웨이트':   { icon:'🏋️', kid:'이름만으로는 기구(바벨/덤벨/기계)를 알 수 없어요.',
                  short:'기구 확인' },
  };
  const SIDES = {
    '양쪽 같이': '양손·양발이 같이 움직여요',
    '양손 따로': '양손이 동시에, 하지만 따로 버텨요',
    '한쪽씩':   '한쪽씩 해요 → 오른쪽·왼쪽 차이를 비교할 수 있어요',
    '좌우 번갈아': '오른쪽·왼쪽을 번갈아 써요',
  };

  // 연구로 확인된 것 (과장 없이)
  const SCIENCE = [
    { t:'바벨·덤벨(자유 무게)과 머신은 <b>근육이 커지는 정도가 비슷</b>했어요. 힘은 연습한 방식으로 잴 때 더 늘었어요.',
      src:'freeVsMachine' },
    { t:'한쪽씩 운동과 양쪽 같이 운동도 <b>근육이 커지는 정도는 비슷</b>했어요. 한쪽으로 연습하면 한쪽 힘이, 양쪽으로 연습하면 양쪽 힘이 더 늘었어요.',
      src:'uniVsBi' },
    { t:'"한쪽 운동이 좌우 차이를 없애준다"는 걸 직접 잰 연구는 아직 부족해요. 그래서 이 앱에선 한쪽 운동을 <b>좌우를 비교하고 약한 쪽을 따로 챙기는 용도</b>로 써요.',
      src:'uniVsBi' },
  ];

  // ----- 교정운동 사전: 무엇을 바로잡는지(결과지 항목) · 하는 법 · 근거 수준 -----
  // basis: '연구' = 무작위 비교 연구가 있음 · '교과' = 물리치료·재활 교과서/전문가 지침 · '일반' = 널리 쓰이지만 직접 비교 연구는 적음
  const FIX = {
    '발가락수건잡기':   { for:'왼발 아치 무너짐 · 발 안쪽 근육', how:'바닥 수건을 발가락으로 끌어 모으기. 발뒤꿈치는 바닥에', basis:'연구', src:'foot' },
    '발바닥마사지':     { for:'발바닥 근막 · 종아리 뭉침 (오른쪽)', how:'공(테니스공·마사지볼)을 발바닥에 두고 뒤꿈치~발가락 앞까지 천천히 굴리기. 아픈 곳은 10초 머물기', basis:'일반', src:null },
    '백년척추디스크예방(허리·목뒤로젖히기)': { for:'허리 디스크 예방 · 거북목 · 굽은등 (앉아 있던 하루 되돌리기)', how:'서서 손을 허리 뒤에 대고 허리를 뒤로 10번 젖히기 → 턱을 당긴 채 고개를 뒤로 젖히기. 아프면 작게', basis:'교과', src:'baeknyeon' },
    'T레이즈':         { for:'어깨 뒤 · 날개뼈 모으기 (둥근어깨)', how:'엎드리거나 상체 숙여서, 양팔을 옆으로 벌려 T 모양. 엄지는 하늘, 날개뼈를 등 가운데로 모으며 들기', basis:'일반', src:'ytw' },
    'W레이즈':         { for:'어깨 뒤 · 날개뼈 아래로 당기기', how:'팔꿈치를 접어 W 모양. 팔꿈치를 뒤로 당기며 날개뼈를 아래·안쪽으로', basis:'일반', src:'ytw' },
    'Y레이즈':         { for:'아래 승모근 · 어깨 올라감 잡기 (왼쪽 4° 오른쪽 2°)', how:'양팔을 비스듬히 위로 뻗어 Y 모양. 어깨가 귀 쪽으로 올라가지 않게, 엄지는 하늘', basis:'일반', src:'ytw' },
    '마사지볼풀기—골반옆·허벅지앞·엉덩이': { for:'① 풀기 — 허리 통증의 앞쪽 원인 (골반 옆·허벅지 앞·이상근)', how:'공을 골반 옆(바지 주머니 자리) → 허벅지 앞 → 엉덩이 깊은 곳 순서로 두고 체중을 실어 천천히. 아픈 곳은 10초 머물기. 골프공은 쓰지 않기', basis:'강의', src:'lecture' },
    '마사지볼풀기—쇄골아래·겨드랑이·어깨뒤': { for:'① 풀기 — 둥근어깨의 앞쪽 원인', how:'벽에 등을 대고 공을 쇄골 아래 오목한 곳(고개는 반대로) → 겨드랑이 앞 접히는 곳 → 어깨 뒤 관절 아래에 두고 천천히', basis:'강의', src:'lecture' },
    '의자햄스트링스트레칭': { for:'② 늘리기 — 뒷벅지 (내일 안 뻐근하게)', how:'의자에 뒤꿈치 올리고 ① 그쪽 골반을 아래로 ② 발목 젖히기 ③ 허벅지와 배를 붙이기(가장 중요, 무릎 굽혀도 됨) ④ 엉덩이 빼며 무릎 펴기 5초 ⑤ 뒤꿈치로 의자 누르기 ⑥ 상체만 돌리기 10번', basis:'강의', src:'lecture' },
    '문틀가슴스트레칭':   { for:'② 늘리기 — 가슴 앞 (둥근어깨의 당기는 쪽)', how:'문틀에 팔꿈치를 어깨 높이로 대고 한 발 앞으로 → 가슴 앞이 늘어나는 곳에서 30초. 허리는 젖히지 않기', basis:'강의', src:'lecture' },
    '승모근아래깨우기(손바닥뒤로내리기)': { for:'③ 깨우기 — 중·하부 승모근 (어깨 올라감 잡기)', how:'서서 손바닥을 뒤로 향하게 하고 팔을 아래로 길게 내리기. 꼬리뼈는 아래로, 날개뼈는 아래·안쪽으로 모으기', basis:'강의', src:'lecture' },
    '엎드려코브라':       { for:'③ 깨우기 — 등 뒤 전체 (둥근어깨·굽은등)', how:'엎드려 손바닥 뒤로 향하게 하고 가슴·팔을 바닥에서 살짝 들기. 엄지는 하늘, 턱은 당긴 채 10초', basis:'강의', src:'lecture' },
    '반무릎장요근스트레칭': { for:'② 늘리기 — 오른쪽 장요근·허벅지 앞 (골반 앞기울기)', how:'한 무릎 꿇고, 엉덩이에 힘 준 채 골반을 앞으로 살짝. 허리를 젖히지 말고 30초', basis:'일반', src:null },
    '클램쉘':            { for:'③ 깨우기 — 중둔근 (오른 무릎 안쪽 쏠림)', how:'옆으로 누워 무릎 굽히고, 발은 붙인 채 위 무릎만 조개처럼 열기. 골반이 뒤로 안 넘어가게', basis:'일반', src:null },
    '벽종아리스트레칭':   { for:'② 늘리기 — 오른쪽 종아리 (발목 가동성 → 무릎 부담 줄이기)', how:'벽 짚고 뒷다리 뒤꿈치를 바닥에 붙인 채 30초. 무릎 펴고 한 번, 살짝 굽히고 한 번', basis:'일반', src:null },
    '마사지볼풀기—종아리·정강이앞': { for:'① 풀기 — 종아리(비복근)·정강이 앞(전경골근)', how:'공 위에 종아리를 올려 천천히 굴리고, 정강이 바깥 근육도 손이나 공으로. 아픈 곳은 10초 머물기', basis:'강의', src:'lecture' },
    '밸런스리치(한발서서앞·뒤터치)': { for:'④ 통합 — 발목·무릎·엉덩이가 같이 균형 잡기', how:'한 발로 서서 엉덩이를 뒤로 빼며 다른 발로 앞·뒤를 최대한 멀리 터치. 서 있는 무릎은 두 번째 발가락 방향, 흔들리면 잡기', basis:'강의', src:'lecture' },
    '플랭크':           { for:'코어 안티 모션 — 허리가 꺾이는 걸 막는 힘', how:'팔꿈치는 어깨 아래 일직선, 팔꿈치 고정한 채 무릎을 뒤로 당기는 느낌. 8~10초 하고 2초 쉬기 × 8~10번. 5분 버티기는 하지 않기 (강사: 10초 넘으면 다른 근육이 대신 쓴다)', basis:'강의', src:'lecture' },
    '수트케이스캐리(한손케틀벨들고걷기)': { for:'코어 안티 모션 — 옆으로 쏠리는 걸 막는 힘 (골반 좌우 높이)', how:'한 손에 케틀벨을 들고 몸이 기울지 않게 똑바로 걷기. 어깨 높이 같게, 반대쪽 배가 당기면 맞게 하는 것. 좌우 바꿔서', basis:'강의', src:'lecture' },
    '책위밸런스(한발·일자서기)': { for:'④ 통합 — 좌우 차이 느끼기 (왼발목·오른 무릎)', how:'책 위에서 일자 서기(앞발 뒤꿈치에 뒷발 앞꿈치) 눈 뜨고 10초 → 눈 감고 20초 → 한 발 서기. 새끼발가락·골반·시선 정면, 무릎 안 굽히기. 흔들리면 잡는 연습', basis:'강의', src:'lecture' },
  };
  const FIX_SRC = {
    foot:      { url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5140815', name:'발 아치 운동(수건 집기 등) 연구 — 작은 규모, 직접 비교는 약함' },
    baeknyeon: { url:null, name:'정선근 《백년허리》·《백년목》 — 허리·목을 뒤로 젖히는 신전 원리 (맥켄지 방식 계열)' },
    ytw:       { url:null, name:'Y·T·W 레이즈 — 날개뼈 안정화 운동으로 재활·트레이닝에서 널리 씀 (직접 비교 연구는 적음)' },
    lecture:   { url:null, name:'웰니스데이 신체지도 강의 (2026-10-16) — 재활 4단계: 풀기 → 늘리기 → 깨우기 → 통합' },
  };
  function fixTip(name){ return FIX[norm(name)] || null; }

  // ----- 부위별 재활 4단계 (어깨 · 허리 · 무릎) -----
  // 뼈대: NASM 교정운동 연속체(Inhibit → Lengthen → Activate → Integrate) = 웰니스 강의(2026-10-16)의 "풀기 → 늘리기 → 깨우기 → 통합".
  // 부위별 순서는 강의에서 든 예시(어깨·발목·허리)를 그대로 따르고, 결과지(2022-12-28)의 상필님 항목에 맞춰 종목을 골랐다.
  // 강의 핵심: 마사지(풀기)에서 멈추지 말고 통합(움직임)까지 가야 진짜 재활. 앞쪽은 풀고 뒤쪽은 깨운다.
  const REHAB = {
    shoulder: { name:'어깨', icon:'🫱', why:'둥근어깨 · 왼쪽 어깨 4° 올라감 · 거북목',
      note:'강의 순서: 쇄골 아래·광배·견갑거근 풀기 → 가슴 스트레칭 → 중·하부 승모근 깨우기 → 코브라 → 당기기로 통합',
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤', set:'좌우 2분', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'문틀 가슴 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'백년척추 디스크 예방 (허리·목 뒤로 젖히기)', set:'10회 × 2세트', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'승모근 아래 깨우기 (손바닥 뒤로 내리기)', set:'10회 × 2세트', sets:2 }, { n:'Y 레이즈', set:'10회 × 2세트', sets:2 }, { n:'엎드려 코브라', set:'10초 × 5', sets:5 } ] },
        { s:'④ 통합', items:[ { n:'덤벨 로우', set:'3세트 × 12회', sets:3 }, { n:'원암 케이블 회전 로우 (불균형 교정)', set:'15회씩 × 3세트', sets:3 } ] },
      ] },
    back: { name:'허리', icon:'🧍', why:'골반 앞기울기 6.5° · 오른쪽 허리 아래 욱신 · 오른쪽 장요근 당김',
      note:'강의 순서: 골반 옆(대퇴근막장근)·허벅지 앞·엉덩이(이상근) 풀기 → 스트레칭 → 엉덩이 운동·스쿼트·런지',
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이', set:'좌우 2분', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'반무릎 장요근 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'의자 햄스트링 스트레칭', set:'좌우 30초', sets:1 }, { n:'백년척추 디스크 예방 (허리·목 뒤로 젖히기)', set:'10회 × 2세트', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'글루트 브릿지', set:'15회 × 2세트', sets:2 }, { n:'클램쉘', set:'좌우 15회 × 2세트', sets:2 } ] },
        { s:'④ 통합', items:[ { n:'고관절 힌지 보조운동', set:'15회 × 2세트', sets:2 }, { n:'가블릿 스쿼트', set:'10회 × 2세트 (무릎 괜찮은 날만)', sets:2 } ] },
      ] },
    knee: { name:'무릎', icon:'🦵', why:'오른 무릎 안쪽 통증·붓기 · 오른 무릎 바깥돌림 · 왼발목 안으로 무너짐',
      note:'강의: 무릎은 안정성 관절 — 위(고관절)·아래(발목) 가동성이 떨어지면 무릎이 대신 고생. 그래서 발목·엉덩이부터. 붓기 있는 날은 ①②만',
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 종아리·정강이 앞', set:'좌우 2분', sets:1 }, { n:'발바닥 마사지', set:'좌우 2분', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'벽 종아리 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'내전근 스트레칭', set:'좌우 30초 × 2', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'클램쉘', set:'좌우 15회 × 2세트', sets:2 }, { n:'발가락 수건 잡기', set:'15회 × 2세트', sets:2 }, { n:'월싯(벽 스쿼트)', set:'20초 × 3 (아프지 않은 각도)', sets:3 } ] },
        { s:'④ 통합', items:[ { n:'책 위 밸런스 (한 발·일자 서기)', set:'좌우 20초 × 2', sets:2 }, { n:'밸런스 리치 (한 발 서서 앞·뒤 터치)', set:'좌우 5회 × 2세트', sets:2 } ] },
      ] },
  };
  const REHAB_SRC = [
    { url:'https://www.nasm.org/resource-center/blog/recovery/a-guide-to-nasms-corrective-exercise-continuum', name:'NASM 교정운동 연속체 (Inhibit → Lengthen → Activate → Integrate)' },
    { url:null, name:'웰니스데이 신체지도 강의 (2026-10-16) — 재활 4단계와 부위별 순서' },
  ];
  // opt.addBtn: 담기 단추를 그릴지 (앱만), opt.part: 한 부위만
  function rehabHTML(opt){
    opt = opt || {};
    const parts = opt.part ? [opt.part] : Object.keys(REHAB);
    const blocks = parts.map(k=>{
      const r = REHAB[k];
      const stages = r.stages.map(st => `<div class="rh-stage"><div class="rh-s">${esc(st.s)}</div>
        <div class="rh-items">${st.items.map(it => `<div class="rh-item"><span class="rh-n">${esc(it.n)}</span><span class="rh-set">${esc(it.set)}</span></div>`).join('')}</div></div>`).join('');
      return `<div class="rh-part" data-part="${k}">
        <div class="rh-head"><b>${r.icon} ${esc(r.name)}</b> <span>${esc(r.why)}</span></div>
        <div class="rh-note">${esc(r.note)}</div>
        ${stages}
        ${opt.addBtn ? `<button class="rh-add" data-rhadd="${k}">${esc(r.name)} 4단계 오늘 기록에 담기</button>` : ''}
      </div>`;
    }).join('');
    return `<div class="rh">${blocks}
      <div class="xi-src">근거: ${REHAB_SRC.map(s => s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a>` : esc(s.name)).join(' · ')}<br>
      ※ 통증이 심하거나 붓기가 있으면 ①②(풀기·늘리기)까지만. 무릎은 정형외과·선생님 말씀이 먼저예요.</div></div>`;
  }

  // ----- 운동의 철학 · 목적 (메인 화면 맨 위). 앱에서 고치면 저장본(philosophy)이 이긴다 -----
  const PHILO_DEFAULT = `🎯 목적 — 내 몸을 자유롭게 쓰고, 아프지 않게.
근육을 키우는 건 그다음이다. 오른 무릎·허리를 고치고, 틀어진 몸(골반 앞기울기·둥근어깨)을 바로 세운다.

🪜 순서 — 신체지도 (집짓기처럼 바닥부터)
1. 바닥: 잘 먹고 · 잘 자고 · 마음이 편할 것
2. 순환(심폐): 모든 운동의 1순위 — 서서 걷고 뛰기
3. 코어: 힘을 내는 곳이 아니라 움직임을 막아 주는 곳 (안티 모션)
4. 밸런스: 흔들리지 않는 게 아니라, 흔들렸을 때 잡는 것 · 좌우 차이 느끼기
5. 재활: 풀기 → 늘리기 → 깨우기 → 통합. 마사지에서 멈추지 않는다
6. 그 위에 근지구력 → 근육 → 힘 → 파워

🤝 약속
· 알고 하기(인지) · 목적을 정하고, 즐겁게
· 같은 운동만 반복하지 않기 (운동 편식 금지) · 가끔은 새로운 운동
· 한 시간 안 · 끝범위에서, 내가 통제할 수 있는 만큼
· 앞은 풀고 뒤는 깨우기 · 아프면 멈추기 · 선생님 말씀이 먼저`;
  // 기본 글은 짧은 인포그래픽으로: 한 줄 목적 → 신체지도 사다리(가로) → 약속 딱지
  const PHILO = {
    goal: '내 몸을 자유롭게 쓰고, 아프지 않게',
    sub: '근육은 그다음 · 무릎·허리 고치고 틀어진 몸 바로 세우기',
    ladder: [ ['🍚', '바닥', '먹고·자고·마음'], ['🫀', '순환', '1순위'], ['🧱', '코어', '막는 힘'],
              ['⚖️', '밸런스', '흔들릴 때 잡기'], ['🩹', '재활', '풀→늘→깨→통합'], ['🚀', '파워', '지구력→근육→힘'] ],
    promises: ['알고 하기', '목적 정하고 즐겁게', '편식 금지', '한 시간 안', '끝범위 · 통제되는 만큼', '앞은 풀고 뒤는 깨우기', '아프면 멈춤', '선생님 먼저'],
  };
  function philoGraphic(){
    return `<div class="pg">
      <div class="pg-goal">🎯 ${esc(PHILO.goal)}</div>
      <div class="pg-sub">${esc(PHILO.sub)}</div>
      <div class="pg-ladder">${PHILO.ladder.map((s, i) => `<div class="pg-step" style="--k:${i}"><span class="pg-ic">${s[0]}</span><b>${esc(s[1])}</b><small>${esc(s[2])}</small></div>`).join('')}</div>
      <div class="pg-prom">${PHILO.promises.map(p => `<span>${esc(p)}</span>`).join('')}</div>
    </div>`;
  }
  // 직접 고친 글이면 문단으로, 기본 글이면 인포그래픽으로
  function philoHTML(text){
    const t = String(text || '').trim();
    if(!t || t === PHILO_DEFAULT.trim()) return philoGraphic();
    return t.split(/\n\s*\n/).map(p => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('');
  }

  // ----- 아침 기상 루틴: 뉴로 웜업(센서리 웜업) 21단계 -----
  // 출처: 유튜브 '바디해킹트레이너' — 신경계 체조/필수 준비운동/뉴로 웜업, 센서리 웜업 (https://youtu.be/CDY3DKA37cU)
  // 순서·이름은 영상 화면 목록 그대로. 요령은 영상 자막에서 들리는 만큼만 적었다 (자세한 건 영상).
  // 원리(영상 설명): 만성통증을 줄이려면 잘 움직여야 하고, 잘 움직이려면 감각을 먼저 깨워야 근육을 잘 쓴다.
  const MORNING = {
    url: 'https://youtu.be/CDY3DKA37cU', src: '유튜브 바디해킹트레이너 — 뉴로 웜업·센서리 웜업',
    steps: [
      { k:'teeth',  g:'머리·얼굴', n:'치아 치기',      h:'위아래 이를 가볍게 딱딱' },
      { k:'tongue', g:'머리·얼굴', n:'혀 – 잇몸',      h:'혀로 잇몸 안팎 훑기' },
      { k:'face',   g:'머리·얼굴', n:'얼굴 세수',      h:'세수하듯 구석구석 문지르기, 최대한 부드럽게' },
      { k:'eyes',   g:'머리·얼굴', n:'눈 주변',        h:'눈 주변 뼈·근육만 가볍게, 눈 안쪽(눈물샘 자리)까지' },
      { k:'scalp',  g:'머리·얼굴', n:'두피',           h:'손가락 끝으로 골고루, 뒤 끝까지' },
      { k:'subocc', g:'머리·얼굴', n:'후두하근',       h:'뒤통수 아래 오목한 곳을 엄지로 눌러주기' },
      { k:'ear',    g:'머리·얼굴', n:'귀',             h:'누르고 당기고 접기 — 연골·귓구멍 쪽까지. 아프지 않고 야들야들해야 좋은 상태' },
      { k:'neck',   g:'몸통',     n:'목',             h:'목 앞·옆·뒤 피부를 따라 쓸기' },
      { k:'chest',  g:'몸통',     n:'가슴',           h:'가슴을 원 그리며 문지르기' },
      { k:'arm',    g:'몸통',     n:'팔',             h:'팔 안쪽→바깥쪽 쓸기 (팔이 힘들면 팔을 내리고)' },
      { k:'rib',    g:'몸통',     n:'갈비뼈',         h:'갈비뼈 사이를 문지르기' },
      { k:'belly',  g:'몸통',     n:'복부',           h:'배를 둥글게 문지르기' },
      { k:'waist',  g:'몸통',     n:'허리 (요방형근)', h:'허리 옆·뒤를 눌러주기' },
      { k:'leg',    g:'다리·발',  n:'엉덩이 ~ 발목',   h:'엉덩이→허벅지 안쪽→종아리→사타구니, 뒤쪽 오금·종아리까지. 허리가 불편하면 끝까지 숙이지 말고 아프지 않은 만큼만' },
      { k:'top',    g:'다리·발',  n:'발등',           h:'뒤꿈치 → 발가락 → 발등에 체중 실어 밟기' },
      { k:'sole',   g:'다리·발',  n:'발바닥 – 발가락', h:'발바닥·발가락 눌러 자극' },
      { k:'tiptoe', g:'다리·발',  n:'까치발 털기',     h:'까치발로 가볍게 털기' },
      { k:'twist',  g:'마무리',   n:'몸통 회전',       h:'다리까지 써서 끝까지 비틀기 — 어지러우면 천천히, 통증은 참지 않기' },
      { k:'aero',   g:'마무리',   n:'에어로빅',        h:'팔다리 가볍게 흔들며 풀기' },
      { k:'eyemv',  g:'마무리',   n:'눈',             h:'손가락을 눈으로 따라가기 (눈 운동)' },
      { k:'breath', g:'마무리',   n:'심호흡',          h:'코로 들이마시고 내쉬기를 더 길게 (입으로 뱉어도 됨)' },
    ],
  };
  // 기록 글: "🌅 기상 루틴 15/21 · 07:12"
  function morningText(e){
    const m = e && e.morning; if(!m || !m.steps) return '';
    const done = MORNING.steps.filter(s => m.steps[s.k]).length;
    if(!done) return '';
    return `<b>🌅 기상 루틴</b> ${done}/${MORNING.steps.length}${done === MORNING.steps.length ? ' ✓' : ''}${m.t ? ` <span class="mslot-time">${esc(m.t)}</span>` : ''}`;
  }

  // ----- 종목 그림: free-exercise-db (퍼블릭 도메인, https://github.com/yuhonas/free-exercise-db) -----
  // 값: [그림 번호, 1이면 "비슷한 동작" 그림]. 그림 두 장(시작/끝)은 raw.githubusercontent 에서 바로 불러온다.
  const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
  const IMG = {
    '벤치프레스':['Barbell_Bench_Press_-_Medium_Grip'],
    '인클라인 벤치프레스':['Barbell_Incline_Bench_Press_-_Medium_Grip'],
    '덤벨 벤치프레스':['Dumbbell_Bench_Press'],
    '인클라인 덤벨프레스':['Incline_Dumbbell_Press'],
    '체스트프레스':['Leverage_Chest_Press'],
    '케이블 플라이':['Flat_Bench_Cable_Flyes'],
    '체스트 플라이':['Dumbbell_Flyes'],
    '펙덱 플라이':['Butterfly'],
    '케이블 크로스오버':['Cable_Crossover'],
    '딥스':['Dips_-_Chest_Version'],
    '딥스(맨몸)':['Bench_Dips',1],
    '푸쉬업(팔굽혀펴기)':['Pushups'],
    '오버헤드프레스':['Barbell_Shoulder_Press'],
    '밀리터리 프레스':['Standing_Military_Press'],
    '덤벨 숄더프레스':['Dumbbell_Shoulder_Press'],
    '사이드 레터럴 레이즈':['Side_Lateral_Raise'],
    '프론트 레이즈':['Front_Dumbbell_Raise'],
    '리어 델트 플라이':['Seated_Bent-Over_Rear_Delt_Raise'],
    '후면 리어 델토이드 플라이':['Seated_Bent-Over_Rear_Delt_Raise'],
    '페이스풀':['Face_Pull'],
    '업라이트로우':['Upright_Barbell_Row'],
    '랫풀다운':['Wide-Grip_Lat_Pulldown'],
    '비하인드 렛풀다운':['Wide-Grip_Pulldown_Behind_The_Neck'],
    '암풀다운':['Straight-Arm_Pulldown'],
    '어시스턴트 풀업':['Band_Assisted_Pull-Up'],
    '풀업(턱걸이)':['Pullups'],
    '턱걸이(맨몸)':['Pullups'],
    '바벨 로우':['Bent_Over_Barbell_Row'],
    '덤벨 로우':['One-Arm_Dumbbell_Row'],
    '롱풀로우 머신':['Seated_Cable_Rows'],
    '시티드 케이블 로우':['Seated_Cable_Rows'],
    '인버티드로우':['Inverted_Row'],
    '원암 케이블 회전 로우 (불균형 교정)':['Seated_One-arm_Cable_Pulley_Rows',1],
    '데드리프트':['Barbell_Deadlift'],
    '스티프 데드리프트':['Stiff-Legged_Barbell_Deadlift'],
    '루마니안 데드리프트':['Romanian_Deadlift'],
    '바벨 컬':['Barbell_Curl'],
    '덤벨 컬':['Dumbbell_Bicep_Curl'],
    '해머 컬':['Hammer_Curls'],
    '덤벨 해머컬':['Hammer_Curls'],
    '케이블 푸쉬다운':['Triceps_Pushdown'],
    '케이블 로프푸쉬다운':['Triceps_Pushdown_-_Rope_Attachment'],
    '오버헤드 익스텐션':['Cable_Rope_Overhead_Triceps_Extension'],
    '라잉 트라이셉스 익스텐션':['Lying_Triceps_Press'],
    '스쿼트':['Barbell_Squat'],
    '가블릿 스쿼트':['Goblet_Squat'],
    '맨몸 스쿼트':['Bodyweight_Squat'],
    '레그프레스':['Leg_Press'],
    '레그 익스텐션':['Leg_Extensions'],
    '레그 컬':['Lying_Leg_Curls'],
    '런지':['Dumbbell_Lunges'],
    '프론트런지':['Dumbbell_Lunges',1],
    '맨몸 런지':['Bodyweight_Walking_Lunge'],
    '불가리안 스플릿 스쿼트':['Split_Squat_with_Dumbbells'],
    '카프 레이즈':['Standing_Calf_Raises'],
    '힙 쓰러스트':['Barbell_Hip_Thrust'],
    '글루트 브릿지':['Butt_Lift_Bridge'],
    '이너타이 머신':['Thigh_Adductor'],
    '힙어드덕션':['Thigh_Abductor'],
    '굿모닝 운동':['Good_Morning'],
    '케틀벨 굿모닝':['Good_Morning',1],
    '토터치':['Standing_Toe_Touches',1],
    '러닝머신':['Running_Treadmill'],
    '실내자전거':['Bicycling_Stationary'],
    '일립티컬':['Elliptical_Trainer'],
    '스텝밀(천국의계단)':['Stairmaster'],
    '로잉머신':['Rowing_Stationary'],
    '걷기':['Walking_Treadmill',1],
    '슬로우 조깅':['Jogging_Treadmill',1],
    '야외 러닝':['Trail_Running_Walking',1],
    '자전거(야외)':['Bicycling'],
    '등산':['Trail_Running_Walking',1],
    '플랭크':['Plank'],
    '크런치':['Crunches'],
    '싯업(윗몸)':['Sit-Up'],
    '레그 레이즈':['Flat_Bench_Lying_Leg_Raise'],
    '마운틴 클라이머':['Mountain_Climbers'],
    '슈퍼맨':['Superman'],
    '겟업동작':['Kettlebell_Turkish_Get-Up_Lunge_style',1],
    '수트케이스 캐리 (한 손 케틀벨 들고 걷기)':['Farmers_Walk',1],
    '케틀벨 암바':['Kettlebell_Windmill',1],
    '반무릎 장요근 스트레칭':['Kneeling_Hip_Flexor'],
    '벽 종아리 스트레칭':['Calf_Stretch_Hands_Against_Wall'],
    '의자 햄스트링 스트레칭':['Hamstring_Stretch',1],
    '내전근 스트레칭':['Side_Lying_Groin_Stretch',1],
    '문틀 가슴 스트레칭':['Dynamic_Chest_Stretch',1],
    '엎드려 코브라':['Superman',1],
  };
  function imgOf(name){
    const v = IMG[String(name || '').trim()]; if(!v) return null;
    return { a: IMG_BASE + v[0] + '/0.jpg', b: IMG_BASE + v[0] + '/1.jpg', approx: !!v[1] };
  }
  // 그림이 없으면 유튜브에서 자세 영상을 찾는 링크
  function videoUrl(name){ return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(String(name || '').replace(/\s*\(.*?\)\s*/g, ' ').trim() + ' 운동 자세'); }
  // 작은 그림 두 장 (없으면 영상 찾기 링크)
  function imgHTML(name, size){
    const im = imgOf(name); const s = size || 64;
    if(!im) return `<a class="xi-vid" href="${videoUrl(name)}" target="_blank" rel="noopener">▶ 영상 찾기</a>`;
    return `<span class="xi-img" style="--s:${s}px"><img src="${im.a}" loading="lazy" alt=""><img src="${im.b}" loading="lazy" alt="">${im.approx ? '<em>비슷한 그림</em>' : ''}</span>`;
  }

  // ----- 이름 → 기구 · 쪽 · 결 -----
  const norm = s => String(s || '').replace(/\s+/g, '');
  function toolOf(n, type){
    if(type === 'cardio') return '유산소';
    if(FIX[n]) return '교정';
    if(/RMT|클럽스윙/.test(n) || /^RMT로프$/.test(n)) return '회전 도구';
    if(/스트레칭|호흡|이완|폼롤러/.test(n)) return '회복';
    if(/케틀벨|커틀벨/.test(n)) return '케틀벨';
    if(type === 'bodyweight') return '맨몸';            // 레그 레이즈 같은 맨몸 운동이 아래 '레이즈'에 걸리지 않게 먼저
    if(/덤벨|해머컬|사이드레터럴|프론트레이즈|체스트플라이|리어델트|리어델토이드|가블릿/.test(n)) return '덤벨';
    if(/케이블|푸쉬다운|페이스풀|크로스오버|랫풀|렛풀|암풀다운|시티드|롱풀/.test(n)) return '케이블';   // 롱풀로우 = 앉아서 당기는 케이블 로우
    if(/머신|레그프레스|레그익스텐션|레그컬|펙덱|체스트프레스|이너타이|힙어드덕션|어시스턴트풀업/.test(n)) return '머신';
    if(/바벨|^스쿼트$|벤치프레스|데드리프트|오버헤드프레스|밀리터리|굿모닝운동|힙쓰러스트/.test(n)) return '바벨';
    if(type === 'bodyweight' || /딥스|풀업|턱걸이|푸쉬업|인버티드/.test(n)) return '맨몸';
    return '웨이트';
  }
  function sideOf(n, tool){
    if(/원암|한팔|싱글|덤벨로우|스플릿|불가리안|런지|겟업|암바|불균형교정/.test(n)) return '한쪽씩';
    if(tool === '회전 도구' || /크랩워킹|걷기|러닝|조깅|수영|자전거|등산|일립티컬|스텝밀|마운틴/.test(n)) return '좌우 번갈아';
    if((tool === '덤벨' || tool === '케틀벨') && !/가블릿|굿모닝/.test(n)) return '양손 따로';
    return '양쪽 같이';
  }
  const W = (key, basis, why) => ({ key, basis, why });
  function weckOf(n, type, tool, side){
    // ① 공식 자료가 직접 이름을 든 것
    if(/RMT/.test(n)) return W('RMT', '공식', 'RMT 클럽·로프 스윙은 WeckMethod 가 RMT 도구로 직접 든 것');
    if(/스플릿|런지/.test(n)) return W('CCT', '공식', '스플릿 스쿼트·런지는 WeckMethod 가 CCT 를 쓰는 예로 직접 든 것');
    if(/^스쿼트$|^벤치프레스$|^데드리프트$/.test(n)) return W('BTT', '공식', '전통 파워리프팅(스쿼트·벤치·데드)은 WeckMethod 가 BTT 예로 직접 든 것');
    if(/플랭크|크런치|싯업|윗몸|레그레이즈|슈퍼맨|월싯|캐리/.test(n)) return W('일반', '공식', '버티는 코어 — WeckMethod 는 이걸 셋과 따로 "브레이싱 코어"라고 불러요');
    if(FIX[n]){
      if(/레이즈$/.test(n)) return W('BTT', '정의', '양팔이 같이 똑같이 올라가 한쪽으로 꼴 수 없음 → BTT 정의 (교정 동작)');
      if(/백년척추/.test(n)) return W('BTT', '정의', '허리·목을 양쪽 같이 뒤로 젖힘 — 한쪽으로 꼬지 않음 → BTT 정의 (교정 동작)');
      return W('일반', '정의', '발·발바닥 동작 — 몸통 비틀림이 없어 셋에 해당 근거 없음 (무엇을 바로잡는지는 🧩 설명)');
    }
    // ② 이름만으로는 무슨 동작인지 모르는 것 · 선생님만의 동작
    if(/^커틀벨$|^오버헤드$/.test(n)) return W('?', '확인', '이름만으로는 어떤 동작인지 몰라요');
    // 원암 케이블 회전 로우(선생님 이름: 불균형 교정운동) — 사진으로 동작 확인: 한 팔로 당기며 몸통을 꼰다
    if(/회전로우/.test(n)) return W('CCT', '정의', '한 팔로 당기며 몸통을 꼬아 마무리 — 공식 CCT 예 "끝에서 꼬아 마무리하는 로우"와 같은 모양');
    if(/겟업|암바/.test(n)) return W('CCT', '확인', '한쪽으로 몸통을 꼬는 동작이라 정의상 CCT 쪽 — 공식 자료엔 없어서 선생님 확인 필요');
    if(/크랩워킹|토터치|그라운드소통|바디컨트롤|스핀롤/.test(n)) return W('?', '확인', '선생님만의 동작이라 공식 자료에 없어요');
    // ③ 셋 중 근거가 없는 것
    if(type === 'cardio') return W('일반', '정의', '유산소 — 셋 중 어디라고 한 적 없음 (접영만 BTT 예로 나와요)');
    if(tool === '회복') return W('일반', '정의', '스트레칭·호흡·이완 — 셋에 해당 근거 없음');
    if(/노드릭|힌지보조|고관절운동/.test(n)) return W('일반', '정의', '준비·보조 동작 — 셋에 해당 근거 없음');
    if(/풀업|턱걸이/.test(n)) return W('BTT', '정의', '양팔이 같이 당기는 턱걸이 — 공식 예 "키핑 풀업"과 같은 집안');
    if(tool === '머신') return W('일반', '정의', '기계가 길을 잡아줘서 몸통을 꼬거나 비틀 일이 거의 없음');
    if(/마운틴/.test(n)) return W('일반', '정의', '버티는 코어 쪽 — 셋에 해당 근거 없음');
    if(/컬|레이즈|플라이|익스텐션|푸쉬다운|페이스풀|크로스오버|카프|어덕션|업라이트로우|암풀다운/.test(n))
      return W('일반', '정의', '한 관절만 쓰는 운동 — 셋에 해당 근거 없음');
    // ④ 정의를 적용한 것
    if(side === '한쪽씩') return W('CCT', '정의', '한쪽씩 하는 동작이라 한쪽으로 꼬아 쓸 수 있음 → CCT 쪽 (로우는 "끝에서 꼬는 로우"가 공식 예)');
    return W('BTT', '정의', '양손·양발이 같이 움직여 한쪽으로 꼴 수 없음 → BTT 정의에 맞음');
  }

  // ex: {name, type, part} · grp: 앱에서 직접 바꾼 값(있으면 그게 이김)
  function classify(ex, grp){
    const n = norm(ex && ex.name);
    const type = ex && ex.type;
    const tool = toolOf(n, type);
    const side = sideOf(n, tool);
    let weck = weckOf(n, type, tool, side);
    if(grp){
      const g = grp === '기본' ? '일반' : grp;
      if(WECK[g] && g !== weck.key) weck = W(g, '수정', '앱의 종목 목록에서 직접 정한 것');
    }
    return { name: ex && ex.name, tool, side, weck,
             toolText: TOOLS[tool].short, toolKid: TOOLS[tool].kid, icon: TOOLS[tool].icon,
             sideText: SIDES[side] };
  }

  // ----- 화면 조각 (두 페이지가 같이 쓴다) -----
  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // 작은 딱지: [BTT] [바벨 · 양쪽 같이]
  function chipsHTML(info){
    const wk = info.weck.key;
    const sure = info.weck.basis === '확인' ? '?' : '';
    return `<span class="xi-wk xi-${wk === '?' ? 'Q' : wk}" title="${esc(info.weck.why)}">${wk === '?' ? '확인' : wk}${wk !== '?' ? sure : ''}</span>`
         + `<span class="xi-tl">${esc(info.tool)} · ${esc(info.side)}</span>`;
  }
  // 펼쳐 보는 설명 한 덩어리
  function detailHTML(info){
    return `<div class="xi-detail">
      <div class="xi-detail-img">${imgHTML(info.name, 72)}</div>
      <div><b>${esc(info.icon)} ${esc(info.tool)}</b> — ${info.toolKid}</div>
      <div><b>${esc(info.side)}</b> — ${esc(info.sideText)}</div>
      <div><b>${esc(info.weck.key === '?' ? '선생님 확인' : info.weck.key)}</b> — ${esc(info.weck.why)}
        <span class="xi-basis b-${esc(info.weck.basis)}">${esc(info.weck.basis)}</span></div>
    </div>`;
  }
  function srcLink(k){ const s = SRC[k]; return s ? `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a>` : ''; }

  // 사람 그림 (막대 인형) — BTT: 양팔 대칭 / CCT: 한쪽으로 꼼 / RMT: 좌우로 휘두름
  const FIG = {
    BTT: `<svg viewBox="0 0 120 120" class="xi-fig"><g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none">
      <circle cx="60" cy="20" r="10"/><line x1="60" y1="31" x2="60" y2="70"/>
      <line x1="60" y1="40" x2="34" y2="22"/><line x1="60" y1="40" x2="86" y2="22"/>
      <line x1="22" y1="18" x2="98" y2="18" stroke-width="6"/>
      <line x1="60" y1="70" x2="44" y2="105"/><line x1="60" y1="70" x2="76" y2="105"/></g>
      <g fill="currentColor" opacity=".55"><path d="M16 60 l10 -6 v12z"/><path d="M104 60 l-10 -6 v12z"/></g></svg>`,
    CCT: `<svg viewBox="0 0 120 120" class="xi-fig"><g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none">
      <circle cx="50" cy="22" r="10"/><path d="M52 33 C 58 48, 46 56, 58 70"/>
      <line x1="54" y1="42" x2="80" y2="54"/><line x1="54" y1="42" x2="34" y2="58"/>
      <line x1="58" y1="70" x2="38" y2="104"/><line x1="58" y1="70" x2="82" y2="102"/></g>
      <g stroke="currentColor" stroke-width="3" fill="none" opacity=".6">
      <path d="M88 30 c 10 0 10 8 0 8 c -10 0 -10 8 0 8 c 10 0 10 8 0 8 c -10 0 -10 8 0 8"/></g></svg>`,
    RMT: `<svg viewBox="0 0 120 120" class="xi-fig"><g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none">
      <circle cx="60" cy="24" r="10"/><line x1="60" y1="35" x2="60" y2="72"/>
      <line x1="60" y1="44" x2="84" y2="30"/><line x1="84" y1="30" x2="100" y2="12" stroke-width="7"/>
      <line x1="60" y1="72" x2="44" y2="106"/><line x1="60" y1="72" x2="76" y2="106"/></g>
      <g stroke="currentColor" stroke-width="3" fill="none" opacity=".6" stroke-dasharray="5 5">
      <path d="M18 70 Q 60 118 102 70"/></g>
      <g fill="currentColor" opacity=".6"><path d="M102 70 l-2 12 l-9 -8z"/></g></svg>`,
  };

  // "BTT·CCT·RMT 가 뭐예요?"
  function weckHTML(){
    const cards = ['BTT','CCT','RMT'].map(k=>{
      const w = WECK[k];
      return `<div class="xi-wcard" style="--wk:${w.color}">
        <div class="xi-wfig">${FIG[k]}</div>
        <div class="xi-wbody">
          <div class="xi-wname"><b>${k}</b> <span>${esc(w.kr)}</span></div>
          <div class="xi-wfull">${esc(w.full)}</div>
          <div class="xi-wkid">${w.kid}</div>
          <div class="xi-wex"><b>공식 예시</b> ${esc(w.official)}</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="xi-weck">
      ${cards}
      <div class="xi-wcard plain" style="--wk:${WECK['일반'].color}">
        <div class="xi-wbody"><div class="xi-wname"><b>셋 다 아님</b></div><div class="xi-wkid">${WECK['일반'].kid}</div></div>
      </div>
      <div class="xi-wcard plain" style="--wk:${WECK['?'].color}">
        <div class="xi-wbody"><div class="xi-wname"><b>확인</b> <span>선생님께 여쭤보기</span></div><div class="xi-wkid">${WECK['?'].kid}</div></div>
      </div>
      <div class="xi-basis-key">
        딱지 뜻:
        <span class="xi-basis b-공식">공식</span> ${BASIS['공식']} ·
        <span class="xi-basis b-정의">정의</span> ${BASIS['정의']} ·
        <span class="xi-basis b-확인">확인</span> ${BASIS['확인']}
      </div>
      <div class="xi-warn">⚠ 인터넷 글에 "BTT = 좌우 불균형을 바로잡는 운동"이라는 설명이 있지만, 공식 정의에는 그런 말이 없어요.
        공식 뜻은 <b>"양쪽이 같이 움직여서 한쪽으로 꼴 수 없을 때"</b>예요. 한쪽씩 하는 런지·스플릿 스쿼트는 오히려 공식 자료에서 <b>CCT</b> 예로 나와요.</div>
      <div class="xi-src">근거: ${srcLink('weckDef')} · ${srcLink('weckCCT')} · ${srcLink('weckBrace')} · ${srcLink('weckRMT')}</div>
    </div>`;
  }

  // "바벨·덤벨·머신은 뭐가 달라요?"
  function toolsHTML(){
    const order = ['바벨','덤벨','케이블','머신','케틀벨','맨몸','회전 도구','유산소','회복'];
    return `<div class="xi-tools">
      ${order.map(k=>`<div class="xi-trow"><span class="xi-ticon">${TOOLS[k].icon}</span><div><b>${esc(k)}</b><div>${TOOLS[k].kid}</div></div></div>`).join('')}
      <div class="xi-science">
        <div class="xi-sci-title">🔬 연구로 확인된 것</div>
        ${SCIENCE.map(s=>`<div class="xi-sci">• ${s.t} <span class="xi-src">— ${srcLink(s.src)}</span></div>`).join('')}
        <div class="xi-sci">→ 그래서 <b>"바벨 = 근비대, 덤벨 = 균형"</b>처럼 딱 나뉘진 않아요. 셋 다 근육을 키우고,
          바벨은 <b>가장 무겁게</b>, 덤벨·한쪽 운동은 <b>좌우를 따로</b>, 머신은 <b>안전하게 끝까지</b>가 장점이에요.</div>
      </div>
    </div>`;
  }

  // "프로그램은 이렇게 만들어져요" — 그림으로
  // opt.days: [{dow, tag, kind}] 일~토, opt.theme: 'BTT'|'CCT'|'RMT' (이번 주)
  const DEFAULT_DAYS = [
    { dow:'일', tag:'하체', kind:'w' }, { dow:'월', tag:'회복', kind:'r' }, { dow:'화', tag:'PT', kind:'p' },
    { dow:'수', tag:'가슴·등', kind:'w' }, { dow:'목', tag:'어깨·팔', kind:'w' }, { dow:'금', tag:'PT', kind:'p' },
    { dow:'토', tag:'회복', kind:'r' },
  ];
  function howHTML(opt){
    opt = opt || {};
    const days = opt.days || DEFAULT_DAYS;
    const th = opt.theme || '';
    const step = (n, icon, title, body, note) => `<div class="xh-step">
      <div class="xh-num">${n}</div>
      <div class="xh-main"><div class="xh-title">${icon} ${title}</div>${body}${note ? `<div class="xh-note">${note}</div>` : ''}</div>
    </div>`;
    const week = `<div class="xh-week">${days.map(d=>`<div class="xh-day k-${d.kind}"><span>${esc(d.dow)}</span><b>${esc(d.tag)}</b></div>`).join('')}</div>`;
    const warm = `<div class="xh-chain"><span>WGS 스트레칭</span><i>→</i><span>케틀벨 암바</span><i>→</i><span>바디컨트롤</span></div>`;
    const ring = `<div class="xh-ring">${['BTT','CCT','RMT'].map((k,i)=>`<span class="xh-rk${k===th?' on':''}" style="--wk:${WECK[k].color}">${k}<small>${esc(WECK[k].kr)}</small></span>${i<2?'<i>→</i>':'<i>↺</i>'}`).join('')}</div>`;
    const funnel = `<div class="xh-funnel">
      <div class="f1">선생님이 가르쳐주신 종목</div>
      <div class="f2">그중 가장 오래 안 한 것</div>
      <div class="f3">이번 주에 아직 안 쓴 것</div>
      <div class="f4">✅ 오늘 종목</div></div>`;
    const knee = `<div class="xh-chain warn"><span>스쿼트 · 런지 · 레그프레스 · 달리기</span><i>→</i><span>⚠ 맨 아래로</span></div>`;
    const bar = `<div class="xh-bar"><span class="s1" style="flex:6">준비</span><span class="s2" style="flex:12">워밍업</span><span class="s3" style="flex:42">본 운동</span><span class="s4" style="flex:10">⏱</span></div>
      <div class="xh-bar-key"><span>0분</span><span>60분</span></div>`;
    return `<div class="xh">
      ${step(1, '📅', '요일은 선생님 표대로', week, '바뀌지 않아요 · 회복날(월·토)은 <b>재활 4단계</b> 순서: ① 풀기(발바닥·마사지볼) → ② 늘리기(스트레칭·백년척추) → ③ 깨우기(T·W·Y·수건 잡기) → ④ 통합(선생님 동작·결·밸런스·코어 안티 모션) → 심폐 20분. 운동날 끝에도 코어 한 자리. 모두 한 시간 안')}
      ${step(2, '🔥', '운동하는 날 맨 앞엔 워밍업', warm, 'PT 날에도 붙여요')}
      ${step(3, '🔄', '이번 주 결 — 3주에 한 바퀴', ring, '운동날·회복날 모두 ① 그 주 결의 기능성 한 자리가 들어가고 ② 다른 자리도 그 결에 맞는 종목을 먼저 골라요' + (th ? ` · 이번 주는 <b>${th}</b>` : ''))}
      ${step(4, '🎯', '자리는 그대로, 종목만 바꿔 넣기', funnel, '"가슴 주운동" 같은 자리는 고정 → 종목만 돌아가서 운동 편식이 없어요')}
      ${step(5, '🦵', '무릎 관리 중', knee, '무릎을 깊게 접거나 충격이 오는 종목은 아래로 · "담기"에서도 빠져요')}
      ${step(6, '⏱', '한 시간에 맞추기', bar, '웨이트 1세트 2분 · 맨몸 1.2분 · 유산소는 적힌 시간 · 60분 넘는 종목은 흐려지고 ⏱')}
      ${step(7, '✍️', '기록하면 → 다음 고르기 재료', `<div class="xh-chain"><span>오늘 한 것 기록</span><i>→</i><span>"가장 오래 안 한 것"이 바뀜</span><i>→</i><span>④로 돌아가요</span></div>`, '')}
      <div class="xh-foot">※ 몸이 안 좋으면 추천은 무시하고 쉬어도 돼요. 선생님이 다르게 진행하면 선생님 말씀이 먼저예요.</div>
    </div>`;
  }

  // CSS 는 한 번만 넣는다 (두 페이지 모두 --surface, --ink 같은 색 이름을 쓴다)
  function injectCSS(){
    if(document.getElementById('xi-css')) return;
    const st = document.createElement('style'); st.id = 'xi-css';
    st.textContent = `
    .xi-wk{display:inline-block;font-size:10.5px;font-weight:700;line-height:1;padding:3px 6px;border-radius:6px;margin-right:4px;letter-spacing:.02em;vertical-align:1px;color:#fff;}
    .xi-BTT{background:#5B9BD5;} .xi-CCT{background:#C98420;} .xi-RMT{background:#3E8F88;} .xi-일반{background:#55606A;} .xi-Q{background:#A9545A;}
    .xi-tl{font-size:11px;color:var(--ink-faint);margin-right:6px;}
    .xi-img{display:inline-flex;gap:4px;align-items:center;flex-wrap:wrap;margin:4px 0;}
    .xi-img img{width:var(--s,64px);height:var(--s,64px);object-fit:cover;border-radius:8px;background:#fff;border:1px solid var(--border);}
    .xi-img em{font-style:normal;font-size:10px;color:var(--ink-faint);}
    .xi-vid{display:inline-block;font-size:11px;color:var(--accent-b);text-decoration:none;border:1px solid var(--border);border-radius:8px;padding:3px 8px;margin:4px 0;}
    .xi-detail-img{margin-bottom:6px;}
    .xi-detail{margin-top:6px;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.04);font-size:12px;line-height:1.6;color:var(--ink-dim);word-break:keep-all;}
    .xi-detail b{color:var(--ink);}
    .xi-basis{display:inline-block;font-size:10px;padding:1px 6px;border-radius:999px;border:1px solid currentColor;margin-left:4px;vertical-align:1px;}
    .xi-basis.b-공식{color:#7FC08A;} .xi-basis.b-정의{color:#93A0A8;} .xi-basis.b-확인{color:#E07A80;} .xi-basis.b-수정{color:#E8A33D;}
    .xi-weck{display:flex;flex-direction:column;gap:10px;}
    .xi-wcard{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid var(--border);border-left:4px solid var(--wk);}
    .xi-wcard.plain{padding:10px 12px;}
    .xi-wfig{flex:none;width:76px;color:var(--wk);}
    .xi-fig{width:76px;height:76px;display:block;}
    .xi-wbody{flex:1;min-width:0;}
    .xi-wname{font-size:15px;color:var(--ink);} .xi-wname b{color:var(--wk);margin-right:4px;} .xi-wname span{font-size:13px;font-weight:600;}
    .xi-wfull{font-size:10.5px;color:var(--ink-faint);margin:1px 0 6px;letter-spacing:.02em;}
    .xi-wkid{font-size:12.5px;line-height:1.6;color:var(--ink-dim);word-break:keep-all;} .xi-wkid b{color:var(--ink);}
    .xi-wex{margin-top:6px;font-size:11.5px;line-height:1.55;color:var(--ink-dim);word-break:keep-all;}
    .xi-wex b{color:var(--wk);margin-right:4px;}
    .xi-basis-key{font-size:11px;color:var(--ink-faint);line-height:1.9;}
    .xi-warn{font-size:12px;line-height:1.6;color:var(--ink-dim);background:rgba(224,90,79,.08);border:1px solid rgba(224,90,79,.25);border-radius:10px;padding:10px 12px;word-break:keep-all;}
    .xi-warn b{color:var(--ink);}
    .xi-src{font-size:10.5px;color:var(--ink-faint);line-height:1.6;word-break:keep-all;}
    .xi-src a{color:var(--ink-dim);}
    .xi-tools{display:flex;flex-direction:column;gap:8px;}
    .xi-trow{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;line-height:1.55;color:var(--ink-dim);word-break:keep-all;}
    .xi-trow b{color:var(--ink);} .xi-ticon{font-size:20px;line-height:1.2;flex:none;width:26px;text-align:center;}
    .xi-science{margin-top:6px;padding:10px 12px;border-radius:10px;background:rgba(79,168,160,.08);border:1px solid rgba(79,168,160,.25);}
    .xi-sci-title{font-size:12.5px;font-weight:700;color:var(--ink);margin-bottom:4px;}
    .xi-sci{font-size:12px;line-height:1.6;color:var(--ink-dim);margin-top:4px;word-break:keep-all;} .xi-sci b{color:var(--ink);}
    .philo{border-left:4px solid var(--accent-a);}
    .pg-goal{font-size:15px;font-weight:800;color:var(--ink);line-height:1.35;word-break:keep-all;}
    .pg-sub{font-size:11.5px;color:var(--ink-faint);margin:2px 0 10px;word-break:keep-all;}
    .pg-ladder{display:grid;grid-template-columns:repeat(6,1fr);gap:3px;align-items:end;}
    .pg-step{display:flex;flex-direction:column;align-items:center;text-align:center;border-radius:8px;padding:6px 2px 5px;
      background:color-mix(in srgb, var(--accent-a) calc(8% + var(--k) * 4%), transparent);border-bottom:2px solid color-mix(in srgb, var(--accent-a) calc(30% + var(--k) * 10%), transparent);}
    .pg-ic{font-size:15px;line-height:1.1;} .pg-step b{font-size:11.5px;color:var(--ink);margin-top:2px;}
    .pg-step small{font-size:9px;color:var(--ink-faint);line-height:1.25;margin-top:1px;word-break:keep-all;}
    .pg-prom{display:flex;flex-wrap:wrap;gap:4px;margin-top:9px;}
    .pg-prom span{font-size:10.5px;color:var(--ink-dim);border:1px solid var(--border);border-radius:999px;padding:2px 8px;white-space:nowrap;}
    .philo-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
    .philo-title{font-size:14px;font-weight:700;color:var(--ink);}
    .philo-edit{background:none;border:1px solid var(--border);color:var(--ink-dim);border-radius:8px;padding:4px 9px;font-size:12px;cursor:pointer;font-family:inherit;}
    .philo-body p{margin:0 0 8px;font-size:13px;line-height:1.7;color:var(--ink);word-break:keep-all;white-space:normal;}
    .philo-body p:last-child{margin-bottom:0;}
    .philo textarea{width:100%;min-height:220px;box-sizing:border-box;border:1px solid var(--border-strong);border-radius:10px;background:var(--bg);color:var(--ink);font-family:inherit;font-size:13px;line-height:1.6;padding:10px;resize:vertical;}
    .philo-btns{display:flex;gap:8px;margin-top:8px;}
    .philo-btns button{flex:1;padding:9px;border-radius:9px;border:1px solid var(--border-strong);background:var(--surface-2);color:var(--ink);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
    .philo-btns .ghost{flex:0 0 auto;padding:9px 14px;color:var(--ink-faint);font-weight:500;}
    .rh{display:flex;flex-direction:column;gap:12px;}
    .rh-part{border:1px solid var(--border);border-radius:12px;padding:12px;background:rgba(255,255,255,.02);}
    .rh-head{font-size:14px;color:var(--ink);} .rh-head b{margin-right:6px;} .rh-head span{font-size:11.5px;color:var(--ink-dim);word-break:keep-all;}
    .rh-note{font-size:11.5px;color:var(--ink-faint);line-height:1.55;margin:6px 0 8px;word-break:keep-all;}
    .rh-stage{display:grid;grid-template-columns:62px 1fr;gap:8px;padding:7px 0;border-top:1px dashed var(--border);}
    .rh-s{font-size:12px;font-weight:700;color:var(--accent-a);padding-top:2px;}
    .rh-items{display:flex;flex-direction:column;gap:5px;min-width:0;}
    .rh-item{display:flex;justify-content:space-between;gap:8px;font-size:12.5px;}
    .rh-n{color:var(--ink);word-break:keep-all;} .rh-set{color:var(--ink-faint);white-space:nowrap;font-size:11.5px;}
    .rh-add{width:100%;margin-top:10px;padding:10px;border-radius:9px;border:1px solid var(--border-strong);background:var(--surface-2);color:var(--ink);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
    .rh-tabs{display:flex;gap:6px;margin-bottom:10px;}
    .rh-tab{flex:1;padding:8px 0;border-radius:8px;border:1px solid var(--border);background:var(--surface);color:var(--ink-dim);font-size:12.5px;cursor:pointer;font-family:inherit;}
    .rh-tab.on{border-color:var(--accent-a);color:var(--accent-a);}
    .xh{display:flex;flex-direction:column;gap:2px;}
    .xh-step{display:flex;gap:10px;position:relative;padding-bottom:14px;}
    .xh-step:not(:last-of-type)::before{content:'';position:absolute;left:13px;top:30px;bottom:0;width:2px;background:var(--border);}
    .xh-num{flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent-a);color:#1B1F23;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;z-index:1;}
    .xh-main{flex:1;min-width:0;}
    .xh-title{font-size:13.5px;font-weight:700;color:var(--ink);margin:4px 0 7px;}
    .xh-note{font-size:11.5px;color:var(--ink-faint);margin-top:6px;line-height:1.55;word-break:keep-all;} .xh-note b{color:var(--ink-dim);}
    .xh-week{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
    .xh-day{text-align:center;border-radius:7px;padding:5px 0;font-size:10px;color:var(--ink-faint);background:rgba(255,255,255,.04);}
    .xh-day span{display:block;} .xh-day b{display:block;font-size:10.5px;color:var(--ink);font-weight:600;white-space:nowrap;letter-spacing:-.3px;}
    .xh-day.k-w{background:rgba(232,163,61,.16);} .xh-day.k-p{background:rgba(193,102,107,.18);} .xh-day.k-r{background:rgba(79,168,160,.14);}
    .xh-chain{display:flex;flex-wrap:wrap;align-items:center;gap:5px;font-size:11.5px;}
    .xh-chain span{padding:4px 8px;border-radius:8px;background:rgba(255,255,255,.06);color:var(--ink);word-break:keep-all;}
    .xh-chain i{font-style:normal;color:var(--ink-faint);}
    .xh-chain.warn span:last-child{background:rgba(224,90,79,.16);}
    .xh-ring{display:grid;grid-template-columns:1fr 12px 1fr 12px 1fr 12px;align-items:center;gap:3px;}
    .xh-rk{display:flex;flex-direction:column;align-items:center;min-width:0;padding:5px 3px;border-radius:10px;border:1.5px solid var(--wk);color:var(--wk);font-weight:800;font-size:13px;opacity:.6;}
    .xh-rk small{font-size:9.5px;font-weight:500;color:var(--ink-dim);text-align:center;line-height:1.3;word-break:keep-all;}
    .xh-rk.on{opacity:1;background:color-mix(in srgb, var(--wk) 18%, transparent);box-shadow:0 0 0 2px color-mix(in srgb, var(--wk) 35%, transparent);}
    .xh-ring i{font-style:normal;color:var(--ink-faint);}
    .xh-funnel{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11.5px;color:var(--ink);}
    .xh-funnel div{text-align:center;padding:5px 6px;border-radius:7px;background:rgba(232,163,61,.14);word-break:keep-all;}
    .xh-funnel .f1{width:100%;} .xh-funnel .f2{width:84%;} .xh-funnel .f3{width:68%;}
    .xh-funnel .f4{width:52%;background:rgba(79,168,160,.25);font-weight:700;}
    .xh-bar{display:flex;height:24px;border-radius:7px;overflow:hidden;font-size:10.5px;}
    .xh-bar span{display:flex;align-items:center;justify-content:center;color:#1B1F23;font-weight:700;white-space:nowrap;overflow:hidden;}
    .xh-bar .s1{background:#93A0A8;} .xh-bar .s2{background:#E8A33D;} .xh-bar .s3{background:#4FA8A0;} .xh-bar .s4{background:rgba(255,255,255,.12);color:var(--ink-faint);}
    .xh-bar-key{display:flex;justify-content:space-between;font-size:10px;color:var(--ink-faint);margin-top:2px;}
    .xh-foot{font-size:11.5px;color:var(--ink-faint);border-top:1px dashed var(--border);padding-top:8px;line-height:1.6;}
    `;
    document.head.appendChild(st);
  }

  // "교정운동은 뭘 바로잡나요?"
  function fixHTML(){
    const rows = Object.keys(FIX).map(k=>{
      const f = FIX[k];
      return `<div class="xi-trow"><span class="xi-ticon">🧩</span><div><b>${esc(f.for)}</b><div>${esc(f.how)} <span class="xi-basis b-${f.basis === '연구' ? '공식' : (f.basis === '교과' || f.basis === '강의') ? '수정' : '정의'}">${esc(f.basis)}</span>${f.src && FIX_SRC[f.src] ? ` <span class="xi-src">— ${FIX_SRC[f.src].url ? `<a href="${FIX_SRC[f.src].url}" target="_blank" rel="noopener">${esc(FIX_SRC[f.src].name)}</a>` : esc(FIX_SRC[f.src].name)}</span>` : ''}</div></div></div>`;
    }).join('');
    return `<div class="xi-tools">${rows}
      <div class="xi-science"><div class="xi-sci-title">딱지 뜻</div>
        <div class="xi-sci"><span class="xi-basis b-공식">연구</span> 무작위 비교 연구가 있음 · <span class="xi-basis b-수정">교과</span> 물리치료·재활 교과서/전문가 지침 · <span class="xi-basis b-수정">강의</span> 직접 들은 웰니스 강의(2026-10-16) · <span class="xi-basis b-정의">일반</span> 널리 쓰이지만 직접 비교 연구는 적음</div>
        <div class="xi-sci">※ 교정운동은 상필님이 직접 고른 것이고, 결과지(2022-12-28) 항목과 맞춰 적었어요. 아프면 멈추고, 무릎·허리는 선생님·정형외과 말씀이 먼저예요.</div>
      </div></div>`;
  }
  window.EXINFO = { SRC, WECK, BASIS, TOOLS, SIDES, SCIENCE, FIX, fixTip, fixHTML, MORNING, morningText, REHAB, rehabHTML, PHILO_DEFAULT, philoHTML, IMG, imgOf, imgHTML, videoUrl, classify, chipsHTML, detailHTML, weckHTML, toolsHTML, howHTML, injectCSS };
})();
