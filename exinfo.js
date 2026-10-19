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

  // ----- 종목 분류: 기능성 · 재활 · 중량(근비대) · 유산소 (2026-10-18 상필님. 예전 BTT·CCT·RMT 는 뺐다) -----
  // 이름은 예전 그대로 WECK / weck 로 둔다 (여러 곳에서 info.weck.key 를 읽어서). 뜻만 바뀌었다
  const WECK = {
    '기능성': { key:'기능성', kr:'기능성', color:'#4FA8C9',
           kid:'한 관절만 쓰는 <b>고립 운동이 아니라</b>, 여러 몸 부위를 <b>같이 쓰는</b> 운동. 맨몸·케틀벨·선생님 동작처럼 몸을 한 덩어리로 움직여요.' },
    '재활':   { key:'재활', kr:'재활', color:'#C1666B',
           kid:'<b>뭉친 근육을 풀고</b>(마사지볼) <b>늘리고</b>(스트레칭), 영상을 보며 약한 근육을 <b>키우는</b> 운동. 회복날(월·토)에 해요.' },
    '중량':   { key:'중량', kr:'중량 (근비대)', color:'#E8A33D',
           kid:'바벨·덤벨·머신·케이블로 <b>무게를 들어 근육을 키우는</b> 운동. 근테크의 중심이에요.' },
    '유산소': { key:'유산소', kr:'유산소', color:'#E36F8E',
           kid:'심폐 · 순환. 모든 운동의 1순위예요.' },
  };
  // 근거가 얼마나 확실한지
  const BASIS = {
    '공식': '확인된 근거',
    '정의': '기준(기능성 = 여러 부위 · 재활 = 풀고 늘리고 깨우기 · 중량 = 무게로 근육 키우기)에 맞춰 나눈 것',
    '확인': '확인이 필요한 것',
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
    '반무릎장요근스트레칭': { for:'② 늘리기 — 오른쪽 장요근·허벅지 앞 (골반 앞기울기)', how:'한 무릎 꿇고 골반을 뒤로 말고(꼬리뼈 아래로) 엉덩이를 조인 채 몸을 앞으로 살짝. 허리를 젖히지 말고 30초 (NASM)', basis:'NASM', src:'nasm_apt' },
    '클램쉘':            { for:'③ 깨우기 — 중둔근 (오른 무릎 안쪽 쏠림)', how:'옆으로 누워 무릎 굽히고, 발은 붙인 채 위 무릎만 조개처럼 열기. 골반이 뒤로 안 넘어가게', basis:'일반', src:null },
    '벽종아리스트레칭':   { for:'② 늘리기 — 오른쪽 종아리 (발목 가동성 → 무릎 부담 줄이기)', how:'벽 짚고 뒷다리 뒤꿈치를 바닥에 붙인 채 30초. 무릎 펴고 한 번, 살짝 굽히고 한 번', basis:'일반', src:null },
    '마사지볼풀기—종아리·정강이앞': { for:'① 풀기 — 종아리(비복근)·정강이 앞(전경골근)', how:'공 위에 종아리를 올려 천천히 굴리고, 정강이 바깥 근육도 손이나 공으로. 아픈 곳은 10초 머물기', basis:'강의', src:'lecture' },
    '밸런스리치(한발서서앞·뒤터치)': { for:'④ 통합 — 발목·무릎·엉덩이가 같이 균형 잡기', how:'한 발로 서서 엉덩이를 뒤로 빼며 다른 발로 앞·뒤를 최대한 멀리 터치. 서 있는 무릎은 두 번째 발가락 방향, 흔들리면 잡기', basis:'강의', src:'lecture' },
    '플랭크':           { for:'코어 안티 모션 — 허리가 꺾이는 걸 막는 힘', how:'팔꿈치는 어깨 아래 일직선, 팔꿈치 고정한 채 무릎을 뒤로 당기는 느낌. 8초 버티고 2초 쉬기 × 8번. 코어가 제대로 힘을 내는 건 8~10초뿐 — 그 이상 버티면 다른 근육이 대신 써서 효과가 없다 (강사). 5분 버티기 금지', basis:'강의', src:'lecture' },
    '수트케이스캐리(한손케틀벨들고걷기)': { for:'코어 안티 모션 — 옆으로 쏠리는 걸 막는 힘 (골반 좌우 높이)', how:'한 손에 케틀벨을 들고 몸이 기울지 않게 똑바로 걷기. 어깨 높이 같게, 반대쪽 배가 당기면 맞게 하는 것. 좌우 바꿔서', basis:'강의', src:'lecture' },
    '내몸풀기(하체부터·WGS·점프)': { for:'운동 전 몸풀기 — 강의 틀(고관절부터 → 마지막 점프로 순환) + 내가 하던 WGS · 약 4분', how:'① 제자리 무릎 높이 올리기 좌우 10번 ② 스쿼트 10번 — 무릎은 세 번째 발가락 방향, 엄지발가락 꽉 누르기 ③ WGS 좌우 5번씩 — 런지 자세에서 팔꿈치를 앞발 안쪽으로 내렸다가 몸통을 돌려 팔을 하늘로 ④ 힙힌지 3번(강의) — 허벅지와 배 붙이고 엉덩이 뒤로 → 올라와 만세 ⑤ 거북목 풀기 10번(강의) — 엄지 따봉, 팔은 Y보다 조금 아래, 엄지를 뒤로 보내며 올리기 ⑥ 손 털기 10초 · 턱으로 목 천천히 좌우 3번 ⑦ 기마자세로 콩콩 10번 → 위로 점프 10번(강의). 무릎이 붓는 날엔 점프 대신 제자리 걷기 30초', basis:'강의', src:'lecture' },
    // --- NASM 교정운동 (2026-10-17) ---
    '턱당기기(깊은목근육)': { for:'③ 깨우기 — 깊은 목 굽힘근 (거북목)', how:'벽에 등과 뒤통수를 대고 서서, 고개를 숙이지 말고 턱을 뒤로 밀어 이중턱 만들듯 당기기. 목 앞 깊은 곳이 당기면 맞게 하는 것. 5초 버티기', basis:'NASM', src:'nasm_ucs' },
    '위승모근스트레칭(목옆늘리기)': { for:'② 늘리기 — 위 승모근·견갑거근 (어깨 올라감)', how:'한 손으로 의자 끝을 잡아 그쪽 어깨를 내리고, 고개를 반대쪽으로 기울여 30초. 견갑거근은 고개를 반대쪽 겨드랑이 보듯 숙여서. 살살', basis:'NASM', src:'nasm_ucs' },
    '폼롤러등펴기(흉추)': { for:'② 늘리기 — 등 위쪽(흉추) 펴기 (굽은 등)', how:'폼롤러를 날개뼈 아래에 가로로 두고 누워 손으로 머리를 받치고, 엉덩이는 바닥에. 등 위쪽만 롤러 위로 젖혔다 오기 — 허리는 젖히지 않기(갈비뼈 안 들리게). 롤러를 한 칸씩 옮겨 가며', basis:'NASM', src:'nasm_ucs' },
    '월슬라이드': { for:'③ 깨우기 — 앞톱니근 · 날개뼈 위로 돌리기 (팔 올리기)', how:'벽을 마주 보고 팔뚝을 벽에 댄 채 위로 밀어 올리기. 꼭대기에서 벽을 살짝 밀어 날개뼈를 앞으로. 어깨 으쓱 금지, 허리 젖히지 않기', basis:'NASM', src:'nasm_ucs' },
    '폼롤러광배근풀기': { for:'① 풀기 — 광배근 (팔이 머리 위로 안 올라가는 주범)', how:'옆으로 누워 겨드랑이 아래에 폼롤러, 엄지를 하늘로 하고 팔을 위로 뻗은 채 겨드랑이~갈비뼈 옆을 천천히. 아픈 곳 30~45초', basis:'NASM', src:'nasm_osa' },
    '광배근스트레칭(짐볼·벤치)': { for:'② 늘리기 — 광배근 (팔 올리기 가동성)', how:'무릎 꿇고 엄지를 위로 한 손을 짐볼이나 벤치 위에 올린 뒤, 엉덩이를 뒤로 빼며 가슴을 바닥 쪽으로. 겨드랑이 아래가 늘어나는 곳에서 30초. 허리는 젖히지 않기', basis:'NASM', src:'nasm_osa' },
    '데드버그': { for:'③ 깨우기 — 깊은 코어 (허리가 뜨지 않게)', how:'누워서 팔은 천장으로, 무릎·엉덩이는 90도로 들기. 허리를 바닥에 붙인 채 반대 팔·다리를 천천히 뻗었다 돌아오기. 허리가 뜨거나 갈비뼈가 들리면 거기까지만', basis:'NASM', src:'nasm_apt' },
    '아기자세(차일드포즈)': { for:'② 늘리기 — 허리 근육(척추세움근)', how:'무릎 꿇고 엉덩이를 뒤꿈치 쪽으로 내리며 팔을 앞으로 길게 뻗기. 숨을 등 뒤로 넣으며 30초', basis:'NASM', src:'nasm_apt' },
    '책위밸런스(한발·일자서기)': { for:'④ 통합 — 좌우 차이 느끼기 (왼발목·오른 무릎)', how:'책 위에서 일자 서기(앞발 뒤꿈치에 뒷발 앞꿈치) 눈 뜨고 10초 → 눈 감고 20초 → 한 발 서기. 새끼발가락·골반·시선 정면, 무릎 안 굽히기. 흔들리면 잡는 연습', basis:'강의', src:'lecture' },
  };
  const FIX_SRC = {
    foot:      { url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5140815', name:'발 아치 운동(수건 집기 등) 연구 — 작은 규모, 직접 비교는 약함' },
    baeknyeon: { url:null, name:'정선근 《백년허리》·《백년목》 — 허리·목을 뒤로 젖히는 신전 원리 (맥켄지 방식 계열)' },
    ytw:       { url:null, name:'Y·T·W 레이즈 — 날개뼈 안정화 운동으로 재활·트레이닝에서 널리 씀 (직접 비교 연구는 적음)' },
    lecture:   { url:null, name:'웰니스데이 신체지도 강의 (2026-10-16) — 재활 4단계: 풀기 → 늘리기 → 깨우기 → 통합' },
    nasm_ucs:  { url:'https://www.nasm.org/resource-center/blog/recovery/correcting-upper-crossed-syndrome-a-trainers-assessment-to-program-guide', name:'NASM 둥근어깨·거북목 교정' },
    nasm_osa:  { url:'https://www.nasm.org/resource-center/blog/training/how-to-perform-an-overhead-squat-assessment-osa', name:'NASM 오버헤드 스쿼트 평가 — 팔이 앞으로 떨어짐' },
    nasm_apt:  { url:'https://www.nasm.org/resource-center/blog/recovery/pelvic-tilt-how-personal-trainers-can-assess-and-address-it-in-clients', name:'NASM 골반 기울기 교정' },
  };
  function fixTip(name){ return FIX[norm(name)] || null; }

  // ----- 부위별 재활 4단계 (어깨 · 허리 · 무릎) -----
  // 뼈대: NASM 교정운동 연속체(Inhibit → Lengthen → Activate → Integrate) = 웰니스 강의(2026-10-16)의 "풀기 → 늘리기 → 깨우기 → 통합".
  // 부위별 순서는 강의에서 든 예시(어깨·발목·허리)를 그대로 따르고, 결과지(2022-12-28)의 상필님 항목에 맞춰 종목을 골랐다.
  // 강의 핵심: 마사지(풀기)에서 멈추지 말고 통합(움직임)까지 가야 진짜 재활. 앞쪽은 풀고 뒤쪽은 깨운다.
  const REHAB = {
    shoulder: { name:'어깨', icon:'🫱', why:'둥근어깨 · 왼쪽 어깨 4° 올라감 · 거북목 · 팔이 머리 위로 잘 안 올라감',
      note:'가슴, 광배근, 위 승모근은 풀고 늘려요. 깊은 목 근육, 아래 승모근, 앞톱니근은 깨워요. 로우는 어깨를 내리고 머리를 세운 채로 해요.',
      vids:[ ['qM0c_xXjKa8','NASM Quick Fix: 팔이 앞으로 떨어짐 (어깨 가동성) 6분'], ['YGSa44JGF8Q','NASM: 둥근어깨·거북목 15분'] ],
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤', set:'아픈 곳마다 30~45초', sets:1 }, { n:'폼롤러 광배근 풀기', set:'좌우 아픈 곳마다 30~45초', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'문틀 가슴 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'광배근 스트레칭 (짐볼·벤치)', set:'좌우 30초 × 2', sets:2 }, { n:'위 승모근 스트레칭 (목 옆 늘리기)', set:'좌우 30초', sets:1 }, { n:'폼롤러 등 펴기 (흉추)', set:'10회 × 2세트', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'턱 당기기 (깊은 목 근육)', set:'5초 × 10', sets:1 }, { n:'Y 레이즈', set:'10회 × 2세트 (T·W도 번갈아)', sets:2 }, { n:'월 슬라이드', set:'10회 × 2세트', sets:2 }, { n:'엎드려 코브라', set:'10초 × 5', sets:5 } ] },
        { s:'④ 통합', items:[ { n:'덤벨 로우', set:'3세트 × 12회 (어깨 내리고)', sets:3 }, { n:'원암 케이블 회전 로우 (불균형 교정)', set:'15회씩 × 3세트', sets:3 } ] },
      ] },
    back: { name:'허리', icon:'🧍', why:'골반 앞기울기 6.5° · 오른쪽 허리 아래 욱신 · 오른쪽 장요근 당김',
      note:'고관절 앞과 허리 근육은 풀고 늘려요. 엉덩이와 깊은 코어는 깨워요. 힌지, 캐리, 스쿼트로 마무리해요.',
      vids:[ ['j2rOw4qrE6Y','NASM Quick Fix: 허리 아치 (골반 앞기울기) 9분'], ['YUv-ZqW7PRs','NASM: 골반 앞기울기 근육 3분'] ],
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이', set:'아픈 곳마다 30~45초', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'반무릎 장요근 스트레칭', set:'좌우 30초 × 2 (골반 말고 엉덩이 조이기)', sets:2 }, { n:'아기 자세 (차일드 포즈)', set:'30초 × 2', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'데드버그', set:'좌우 8회 × 2세트', sets:2 }, { n:'글루트 브릿지', set:'15회 × 2세트', sets:2 }, { n:'플랭크', set:'8초 버티고 2초 쉬기 × 8 (골반 말고)', sets:1 } ] },
        { s:'④ 통합', items:[ { n:'고관절 힌지 보조운동', set:'15회 × 2세트', sets:2 }, { n:'가블릿 스쿼트', set:'10회 × 2세트 (무릎 괜찮은 날만)', sets:2 }, { n:'수트케이스 캐리 (한 손 케틀벨 들고 걷기)', set:'좌우 30초 × 2', sets:2 } ] },
      ] },
    knee: { name:'무릎', icon:'🦵', why:'오른 무릎 안쪽 통증·붓기 · 오른 무릎 바깥돌림 · 왼발목 안으로 무너짐',
      note:'종아리, 허벅지 안쪽, 골반 옆은 풀고 늘려요. 엉덩이 옆 근육은 깨워요. 붓는 날은 ①②만 해요. 무릎 안쪽 통증은 정형외과가 먼저예요.',
      vids:[ ['qh2JJnvMKv0','NASM: 발이 벌어지고 무릎이 안으로 9분'] ],
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 종아리·정강이 앞', set:'아픈 곳마다 30~45초', sets:1 }, { n:'발바닥 마사지', set:'좌우 1분', sets:1 }, { n:'마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이', set:'아픈 곳마다 30~45초', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'벽 종아리 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'내전근 스트레칭', set:'좌우 30초 × 2', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'클램쉘', set:'좌우 15회 × 2세트', sets:2 }, { n:'발가락 수건 잡기', set:'15회 × 2세트', sets:2 }, { n:'월싯(벽 스쿼트)', set:'20초 × 3 (아프지 않은 각도)', sets:3 } ] },
        { s:'④ 통합', items:[ { n:'책 위 밸런스 (한 발·일자 서기)', set:'좌우 20초 × 2', sets:2 }, { n:'밸런스 리치 (한 발 서서 앞·뒤 터치)', set:'좌우 5회 × 2세트', sets:2 } ] },
      ] },
  };
  const REHAB_SRC = [
    { url:'https://www.nasm.org/resource-center/blog/recovery/a-guide-to-nasms-corrective-exercise-continuum', name:'NASM 교정운동 연속체 (풀기 → 늘리기 → 깨우기 → 통합)' },
    { url:'https://www.nasm.org/resource-center/blog/recovery/correcting-upper-crossed-syndrome-a-trainers-assessment-to-program-guide', name:'NASM 둥근어깨·거북목' },
    { url:'https://www.nasm.org/resource-center/blog/training/how-to-perform-an-overhead-squat-assessment-osa', name:'NASM 오버헤드 스쿼트 평가 (팔이 앞으로 · 무릎이 안으로)' },
    { url:'https://www.nasm.org/resource-center/blog/recovery/pelvic-tilt-how-personal-trainers-can-assess-and-address-it-in-clients', name:'NASM 골반 기울기' },
    { url:null, name:'웰니스데이 신체지도 강의 (2026-10-16)' },
  ];
  // 종목별 시범 영상 — NASM 공식 유튜브 (제목으로 동작 확인). 없으면 유튜브 검색 링크
  const VIDEO = {
    '마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤':['a8KjvtbkM8E','NASM · 가슴 폼롤러'],
    '폼롤러 광배근 풀기':['1GaR-a9TWYM','NASM · 광배근 폼롤러'],
    '문틀 가슴 스트레칭':['2EeBa3dksnw','NASM · 가슴 스트레칭'],
    '광배근 스트레칭 (짐볼·벤치)':['24RTK4XLzSA','모스틱 자세연구소 · 광배근 스트레칭 정석'],   // 2026-10-18 상필님이 고른 영상 (전: NASM 볼 스트레칭 kEH6jatSVSw)
    '위 승모근 스트레칭 (목 옆 늘리기)':['RNTlUaKeuXE','NASM · 위 승모근 스트레칭'],
    '폼롤러 등 펴기 (흉추)':['NS73eSohTbc','NASM · 등(흉추) 폼롤러 — 비슷'],
    'Y 레이즈':['rXcLUXzEA-w','NASM 자격 트레이너 · 엎드려 Y·T·W'],
    '엎드려 코브라':['keErJXdp2lE','NASM · 바닥 코브라'],
    '원암 케이블 회전 로우 (불균형 교정)':['8fAJEs3L110','NASM · 한 팔 회전 로우'],
    '마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이':['asigNf1sh-k','NASM · 골반 옆(TFL) 폼롤러'],
    '반무릎 장요근 스트레칭':['UU7Nqd_Dric','NASM · 무릎 꿇고 장요근'],
    '아기 자세 (차일드 포즈)':['O_K116taN8o','NASM · 아기 자세'],
    '데드버그':['EW65I2LyI2c','NASM · 데드버그 (한국어)'],
    '글루트 브릿지':['Z3cY3d3BBo4','NASM · 브릿지'],
    '플랭크':['xhk1JkbF2lg','NASM · 플랭크'],
    '가블릿 스쿼트':['MWHIs0zxkCU','NASM · 고블릿 스쿼트'],
    '마사지볼 풀기 — 종아리·정강이 앞':['w-e7YIpiok0','NASM · 종아리 폼롤러'],
    '발바닥 마사지':['ZqwV6pJgvgE','NASM · 발바닥 풀기'],
    '벽 종아리 스트레칭':['URK3EXjTUP4','NASM · 종아리 스트레칭'],
    '내전근 스트레칭':['IzHUoWs0maQ','NASM · 서서 내전근 스트레칭'],
    '클램쉘':['V_AnVxKPFlY','NASM · 클램쉘'],
    '밸런스 리치 (한 발 서서 앞·뒤 터치)':['1sbENKqlslg','NASM · 한 발 앞뒤 리치'],
    '라쿠다 밴드 30분 루틴':['PV08L0Dqq9k','레드밸런스 · 30분 체형교정 전신 루틴'],
  };
  const ytWatch = id => 'https://www.youtube.com/watch?v=' + id;
  function vidHTML(name){
    const v = VIDEO[String(name || '').trim()];
    return v ? `<a class="rh-vid nasm" href="${ytWatch(v[0])}" target="_blank" rel="noopener">▶ ${esc(v[1])}</a>`
             : `<a class="rh-vid" href="${videoUrl(name)}" target="_blank" rel="noopener">▶ 영상 찾기</a>`;
  }
  function rhRow(it){
    const pic = imgOf(it.n) ? imgHTML(it.n, 42) : '<span class="rh-noimg">그림 준비 중</span>';
    return `<div class="rh-item"><span class="rh-pic">${pic}</span><span class="rh-txt"><span class="rh-n">${esc(it.n)}</span><span class="rh-set">${esc(it.set)}</span>${vidHTML(it.n)}</span></div>`;
  }
  // opt.addBtn: 담기 단추를 그릴지 (앱만), opt.part: 한 부위만
  function rehabHTML(opt){
    opt = opt || {};
    const parts = opt.part ? [opt.part] : Object.keys(REHAB);
    const blocks = parts.map(k=>{
      const r = REHAB[k];
      const stages = r.stages.map(st => `<div class="rh-stage"><div class="rh-s">${esc(st.s)}</div>
        <div class="rh-items">${st.items.map(rhRow).join('')}</div></div>`).join('');
      return `<div class="rh-part" data-part="${k}">
        <div class="rh-head"><b>${r.icon} ${esc(r.name)}</b> <span>${esc(r.why)}</span></div>
        <div class="rh-note">${esc(r.note)}</div>
        ${(r.vids || []).length ? `<div class="rh-vids">📺 ${r.vids.map(v => `<a href="${ytWatch(v[0])}" target="_blank" rel="noopener">${esc(v[1])}</a>`).join(' · ')}</div>` : ''}
        ${anatHTML(k)}
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
    goal: '내 몸을 자유롭게 쓰고, 아프지 않기',
    sub: '노후준비를 위한 근테크',   // 2026-10-18 상필님: 자유롭게 · 아프지 않게 · 나머지는 근테크
    ladder: [ ['🍚', '바닥', '먹고·자고·마음'], ['🫀', '순환', '1순위'], ['🧱', '코어', '막는 힘'],
              ['⚖️', '밸런스', '흔들릴 때 잡기'], ['🩹', '재활', '풀기→스트레칭→키우기'], ['🚀', '파워', '지구력→근육→힘'] ],
    promises: ['연결된 근육까지', '알고 하기', '목적 정하고 즐겁게', '편식 금지', '한 시간 안', '끝범위 · 통제되는 만큼', '앞은 풀고 뒤는 깨우기', '아프면 멈춤', '선생님 먼저'],
  };
  function philoGraphic(){
    return `<div class="pg">
      <div class="pg-goal">🎯 ${esc(PHILO.goal)}</div>
      <div class="pg-sub">${esc(PHILO.sub)}</div>
      <div class="pg-ladder">${PHILO.ladder.map((s, i) => `<div class="pg-step" style="--k:${i}"><span class="pg-ic">${s[0]}</span><b>${esc(s[1])}</b><small>${esc(s[2])}</small></div>`).join('')}</div>
      <div class="pg-prom">${PHILO.promises.map(p => `<span>${esc(p)}</span>`).join('')}</div>
    </div>`;
  }
  // 제목 밑 짧은 판: 🎯 목적 한 줄 + 신체지도 한 줄. 직접 고친 글이면 첫 줄을 목적으로 쓴다
  function philoMiniHTML(text){
    const t = String(text || '').trim();
    const goal = (!t || t === PHILO_DEFAULT.trim()) ? PHILO.goal : t.split('\n')[0].replace(/^[^\w가-힣]+/, '').replace(/^목적\s*[—-]\s*/, '');
    return `<div class="pm-goal">🎯 ${esc(goal)}<span class="pm-sub">💰 노후준비를 위한 근테크 · 🔗 연결된 근육까지</span></div>`;   // 사다리 줄(바닥 → 순환 → …)은 머리에서 뺐다 — 자세히 보기 안에 있어요 (2026-10-18)
  }
  // 직접 고친 글이면 문단으로, 기본 글이면 인포그래픽으로
  function philoHTML(text){
    const t = String(text || '').trim();
    if(!t || t === PHILO_DEFAULT.trim()) return philoGraphic();
    return t.split(/\n\s*\n/).map(p => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('');
  }

  // ----- 철학 접기 카드: 제목 밑 두 줄(요약)을 누르면 자세한 그림이 펼쳐진다 -----
  // 근거: 신체지도 강의(2026-10-16) 정리 — 신체지도 6단계 · 관절마다 맡은 일 · 손가락 스트레칭 3종 · 끝범위 원칙 · 파워 5단계
  //       내 몸 문제(어깨·허리·무릎 통증, 어깨·고관절·등 가동성)는 상필님이 말한 것. 요일표는 index.html WEEK_PLAN 과 같게.
  const PF = {
    house: [ // 위(지붕)에서 아래(바닥)로 그린다
      { ic:'🚀', n:'파워', d:'안정화 → 근지구력 → (근육) → (힘) → 파워 · 근육·최대근력은 옵션, 꼭 필요한 건 근지구력', app:'선생님 근력 운동',
        say:'할부로 사면 파워가 없고, 일시불로 사면 파워가 있다 — 가장 짧은 시간에 가장 큰 힘. 강사님도 "왜 기록이 안 늘지?" 했는데 옵션(근육·최대근력)만 하고 있었대요' },
      { ic:'🩹', n:'재활', d:'풀기 → 늘리기 → 깨우기 → 통합 · 마사지에서 멈추지 않기, 근력(통합)까지', app:'회복날에만 · 근육 풀기 → 스트레칭 → 영상으로 근육 키우기',
        say:'컴퓨터 고치기 — 백업(풀기) → 자리 비우기(늘리기) → 프로그램 깔기(깨우기) → 여러 개를 한꺼번에 켜도 잘 돌아가게(통합). "마사지 받고 나았다"는 첫 단계만 한 것' },
      { ic:'⚖️', n:'밸런스', d:'흔들리지 않는 게 아니라 흔들릴 때 잡는 것 · 좌우 차이 느끼기', app:'책 위 밸런스 · 밸런스 리치',
        say:'책 위에 일자로 서서 눈 감고 20초를 못 버티면 50대 몸. 독일은 음주 측정을 똑바로 걷기로 해요. 50대부터 좌우 차이가 생겨요' },
      { ic:'🧱', n:'코어', d:'힘을 내는 곳이 아니라 움직임을 막는 곳(안티 모션) · 8초가 한계', app:'8초 버티고 2초 쉬기 × 8',
        say:'무거운 걸 한 손에 들고 걸으면 옆으로 쏠리지 않으려고 배가 당겨요 — 그게 코어. 플랭크 5분은 금지, 10초 넘으면 다른 근육이 대신 써요' },
      { ic:'🫀', n:'순환', d:'모든 운동의 1순위 · 앉아서 말고 서서 움직이기', app:'슬로우 조깅 ↔ 수영 · 몸풀기 끝 점프',
        say:'수술이 끝나면 의사가 제일 먼저 "걸으세요"라고 해요. 피가 안 돌면 운동 효과가 없어요. 무릎 아프다고 마사지부터? 순서가 틀렸다, 심폐 먼저' },
      { ic:'🍚', n:'바닥', d:'잘 먹고 · 잘 자고 · 마음이 편할 것', app:'식단 · 물 · 잠 7시간',
        say:'마음의 아픔과 몸의 아픔은 뇌의 같은 곳에서 처리돼요. 막 이별한 사람이 운동하는 건 막 교통사고 난 사람이 운동하는 것과 같아요' },
    ],
    joints: [ // 위에서 아래로 (몸 모양 그대로)
      { n:'목·어깨', r:'가동성', me:'어깨 가동성 부족 · 통증' },
      { n:'등(흉추)', r:'가동성', me:'등 가동성 부족' },
      { n:'허리', r:'안정성', me:'허리 통증' },
      { n:'고관절', r:'가동성', me:'고관절 가동성 부족' },
      { n:'무릎', r:'안정성', me:'오른 무릎 통증' },
      { n:'발목', r:'가동성', me:'왼발 아치' },
    ],
    mob: [ ['늘리기', '패시브 — 30초 늘리기'], ['끝에서 버티기', '아이소메트릭 — 끝에서 5초 밀기'], ['끝에서 움직이기', '액티브 — 넓힌 범위를 내 힘으로'] ],
    week: [ ['일','하체','무릎 · 고관절'], ['월','회복','슬로우 조깅'], ['화','PT',''], ['수','가슴·등','허리 · 등'], ['목','어깨·팔','어깨'], ['금','PT',''], ['토','회복','수영'] ],
  };
  function philoFoldHTML(text){
    const t = String(text || '').trim();
    const custom = t && t !== PHILO_DEFAULT.trim();
    const sec = (ic, title, body) => `<div class="pf-sec"><div class="pf-h">${ic} ${esc(title)}</div>${body}</div>`;
    const house = `<div class="pf-house">${PF.house.map((h, i) => `<div class="pf-floor" style="--w:${88 + i * 2.4}%">
        <div class="pf-fn">${h.ic} <b>${esc(h.n)}</b></div>
        <div class="pf-fd">${esc(h.d)}<span class="pf-app">📱 ${esc(h.app)}</span>${h.say ? `<span class="pf-say">💬 ${esc(h.say)}</span>` : ''}</div></div>`).join('')}
      <div class="pf-base">밑에 깔린 두 가지 — 💡 <b>인지</b>(알고 하기) · 🎯 <b>목적</b>(왜 하는지 정하기)
        <span class="pf-say">💬 인지: 원효대사 해골물 — 알고 하면 같은 운동도 효과가 달라요. 호텔 청소부에게 "당신 일이 곧 운동"이라고 알려 주니 몸이 더 변했어요</span>
        <span class="pf-say">💬 목적: 공을 차면 무릎이 안 다치는데, 허공에 발차기를 하면 무릎이 나가요. 어디서 멈출지 알아야 안 다쳐요</span></div>
      <div class="pf-note">💬 집짓기처럼 — 바닥을 안 다지고 지붕(파워)만 올리면 무너져요. 그래서 아래층부터.</div></div>`;
    const joints = `<div class="pf-joints">${PF.joints.map(j => `<div class="pf-j ${j.r === '가동성' ? 'mob' : 'stb'}">
        <span class="pf-jn">${esc(j.n)}</span><span class="pf-jr">${j.r === '가동성' ? '↔ 가동성' : '■ 안정성'}</span><span class="pf-me">${esc(j.me)}</span></div>`).join('')}</div>
      <div class="pf-note">가동성 자리는 <b>넓히고</b>, 안정성 자리는 <b>버티게</b>. 무릎이 아픈 건 위(고관절)·아래(발목)가 굳어서인 경우가 많아요.</div>
      <div class="pf-say pf-say-box">💬 집에 물이 새면 바닥만 닦지 말고 지붕을 고쳐야 해요. 실습에서도 아픈 건 왼쪽 어깨인데 실제로는 오른쪽이 더 나빴어요 — 아픈 곳과 원인이 다를 수 있어요</div>`;
    const mob = `<div class="pf-mob">${PF.mob.map((m, i) => `<div class="pf-m"><b>${i + 1}</b><span>${esc(m[0])}</span><small>${esc(m[1])}</small></div>`).join('<i>→</i>')}</div>
      <div class="pf-note">다치는 곳은 늘 <b>가동범위의 끝</b> → 운동은 끝범위에서, 내가 통제할 수 있는 만큼.</div>
      <div class="pf-say pf-say-box">💬 손가락으로 해 보기: 다른 손으로 손가락 하나를 뒤로 젖히고(늘리기) → 그 손가락으로 반대 손을 세게 밀고(버티기) → 그대로 둔 채 나머지 손가락으로 주먹 쥐기(움직이기). 유연성은 "남이 당겨 줬을 때 늘어나는 것", 가동성은 "내 힘으로 거기까지 가서 쓰는 것". 발목을 접질리는 것도 끝범위에서예요</div>`;
    const week = `<div class="pf-week">${PF.week.map(w => `<div class="pf-d ${w[1] === 'PT' ? 'pt' : (w[1] === '회복' ? 'rest' : 'work')}"><b>${w[0]}</b><span>${esc(w[1])}</span><small>${esc(w[2])}</small></div>`).join('')}</div>
      <div class="pf-note">매일 아침 기상 루틴 · 운동 전엔 <b>내 몸풀기 4분</b>(하체부터 → WGS → 점프) · 운동날은 한 시간 안</div>`;
    const prom = `<div class="pg-prom">${PHILO.promises.map(p => `<span>${esc(p)}</span>`).join('')}</div>`;
    const mine = custom ? `<div class="pf-mine">${t.split(/\n\s*\n/).map(p => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('')}</div>` : '';
    return `<details class="pf">
      <summary>${philoMiniHTML(text)}<span class="pf-more">자세히 보기</span></summary>
      <div class="pf-body">
        ${mine}
        <div class="pf-goal"><div class="pf-gt">🎯 ${esc(PHILO.goal)}</div><div class="pf-gs">건강한 신체</div>
          <div class="pf-gs">💰 <b>노후준비를 위한 근테크</b> — 다치지 않는 범위에서 근육을 꾸준히 쌓아 가기<br><small>근테크는 노후 준비예요 — 나이가 들면 근육이 저절로 줄어요(근감소). 지금 쌓아 둔 만큼 나중에 덜 잃어요</small></div>
          <div class="pf-gs">🔗 근육은 다 <b>연결</b>돼 있어요 — 아픈 곳만 말고 이어진 근육까지 같이 운동해요<br><small>무릎이 아프면 위의 고관절·아래의 발목까지 · 어깨가 아프면 등·가슴까지</small></div>
          <div class="pf-tags"><span><em>고칠 곳</em>오른 무릎 · 허리 · 어깨</span><span><em>넓힐 곳</em>어깨 · 고관절 · 등</span><span><em>바로 세울 것</em>골반 앞기울기 · 둥근어깨</span></div></div>
        ${sec('🏠', '신체지도 — 집짓기처럼 바닥부터', house)}
        ${sec('🦴', '관절마다 맡은 일 — 내 몸에 대 보기', joints)}
        ${sec('🔁', '가동성 넓히는 3단계 (손가락 스트레칭처럼)', mob)}
        ${sec('📅', '한 주는 이렇게', week)}
        ${sec('🤝', '나와의 약속', prom)}
        <div class="pf-src">근거: 신체지도 강의(2026-10-16) 정리 · 선생님 루틴 · 내 몸 상태</div>
      </div></details>`;
  }

  // ----- 종목 지도 (종목 탭): 묶음 → 종목 → 설명, 나뭇가지처럼 펼친다 -----
  // 묶음은 상필님이 말한 대로 (2026-10-17): T·W·Y = 어깨, 수건 잡기·내전근 = 하체, 토터치·크랩워킹·폼롤러 = 엉덩이,
  // 바디컨트롤·플랭크 = 복부. '#' 로 시작하는 줄은 묶음 안의 작은 제목. 여기 없는 종목은 "그 밖에"로 간다.
  const TREE = [
    { k:'chest', ic:'🏋️', n:'가슴', sub:'밀기 — 가슴 앞', c:'#E8A33D',
      names:['벤치프레스','인클라인 덤벨프레스','덤벨 벤치프레스','케이블 플라이','딥스'] },
    { k:'back', ic:'🧗', n:'등', sub:'당기기 — 둥근어깨 반대쪽', c:'#4FA8A0',
      names:['#위에서 당기기','랫풀다운','비하인드 렛풀다운','어시스턴트 풀업','암풀다운','#앞에서 당기기','롱풀로우 머신','바벨 로우','덤벨 로우','인버티드로우','#들기 · 회전','데드리프트','원암 케이블 회전 로우 (불균형 교정)'] },
    { k:'shoulder', ic:'🙆', n:'어깨', sub:'머리 위로 밀기 · 어깨 뒤', c:'#C98BD6',
      names:['#밀기','밀리터리 프레스','오버헤드프레스','덤벨 숄더프레스','#어깨 뒤 · 날개뼈','후면 리어 델토이드 플라이','업라이트로우','T 레이즈','W 레이즈','Y 레이즈'] },
    { k:'arm', ic:'💪', n:'팔', sub:'이두 · 삼두', c:'#7FA7E0',
      names:['#이두','바벨 컬','덤벨 해머컬','#삼두','케이블 푸쉬다운','라잉 트라이셉스 익스텐션'] },
    { k:'leg', ic:'🦵', n:'하체', sub:'허벅지 · 무릎 · 종아리 · 발', c:'#E07A5F',
      names:['#허벅지','스쿼트','가블릿 스쿼트','런지','프론트런지','레그프레스','이너타이 머신','내전근 스트레칭','#종아리 · 발','카프 레이즈','발가락 수건 잡기'] },
    { k:'hip', ic:'🍑', n:'엉덩이·고관절', sub:'접기(힌지) · 엉덩이 옆', c:'#D9A05B',
      names:['#접기(힌지)','굿모닝 운동','케틀벨 굿모닝','스티프 데드리프트','케틀벨 스윙','고관절 힌지 보조운동','리버스 노드릭컬','#엉덩이 옆','토터치','크랩워킹','고관절 운동(폼롤러)','클램쉘'] },
    { k:'core', ic:'🧱', n:'복부·코어', sub:'움직임을 막는 힘 · 8초', c:'#B5B35C',
      names:['플랭크','데드버그','바디컨트롤 전면 코어','레그 레이즈','수트케이스 캐리 (한 손 케틀벨 들고 걷기)','악어호흡'] },
    { k:'move', ic:'🌀', n:'움직임·가동성', sub:'몸풀기 · 흐르는 움직임', c:'#5FB3D9',
      names:['내 몸풀기 (하체부터 · WGS · 점프)','케틀벨 암바','겟업동작','그라운드 소통','스핀롤'] },
    { k:'rehab', ic:'🩹', n:'재활·풀기', sub:'풀기 → 늘리기 → 깨우기 → 균형', c:'#C1666B',
      names:['#① 풀기','발바닥 마사지','마사지볼 풀기 — 종아리·정강이 앞','마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이','마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤',
             '폼롤러 광배근 풀기',
             '#② 늘리기','문틀 가슴 스트레칭','광배근 스트레칭 (짐볼·벤치)','위 승모근 스트레칭 (목 옆 늘리기)','폼롤러 등 펴기 (흉추)','반무릎 장요근 스트레칭','아기 자세 (차일드 포즈)','의자 햄스트링 스트레칭','벽 종아리 스트레칭','백년척추 디스크 예방 (허리·목 뒤로 젖히기)',
             '#③ 깨우기','턱 당기기 (깊은 목 근육)','월 슬라이드','승모근 아래 깨우기 (손바닥 뒤로 내리기)','엎드려 코브라','#④ 균형(통합)','책 위 밸런스 (한 발·일자 서기)','밸런스 리치 (한 발 서서 앞·뒤 터치)'] },
    { k:'cardio', ic:'🫀', n:'유산소', sub:'순환 — 모든 운동의 1순위', c:'#E36F8E',
      names:['슬로우 조깅','수영'] },
  ];
  // items: [{ name, part, info(classify 결과), tip(선생님 말씀), where(프로그램 어디) }]
  // opt.etc === false 면 "그 밖에" 묶음을 빼고 프로그램 종목만 (쌤 보기 페이지)
  function treeHTML(items, opt){
    opt = opt || {};
    const byName = new Map(items.map(x => [norm(x.name), x]));
    const used = new Set();
    const roleTag = r => r ? `<span class="tr-tag">${esc(r.role.split(' · ')[0])}</span>` : '';
    const leaf = x => {
      const r = roleOf(x.name), f = fixTip(x.name), w = x.info && x.info.weck;
      const wk = w && WECK[w.key];
      const badges = (x.tip ? '<span class="tr-b t">쌤</span>' : '') + (f && f.basis === '강의' ? '<span class="tr-b l">강의</span>' : '') + (f && f.basis === 'NASM' ? '<span class="tr-b n">NASM</span>' : '')
                   + (w && wk ? `<span class="tr-b w" style="--wk:${wk.color}">${w.key}</span>` : '');
      return `<details class="tr-leaf"><summary><span class="tr-ln">${esc(x.name)}</span>${badges}${roleTag(r)}</summary>
        <div class="tr-detail">
          <div class="tr-img">${imgHTML(x.name, 64)}${m3dBtnHTML(x.name)}</div>
          ${r ? `<div class="tr-row">🎯 <b>${esc(r.muscles)}</b> · ${esc(r.role)} · ${esc(r.joint)}<br><span class="tr-dim">${esc(r.note)}</span></div>` : ''}
          ${x.tip ? `<div class="tr-row tr-tip">💬 쌤: ${esc(x.tip)}</div>` : ''}
          ${f ? `<div class="tr-row tr-fix">🧩 <b>${esc(f.for)}</b><br>${esc(f.how)}</div>` : ''}
          <div class="tr-row">${vidHTML(x.name)}</div>
          ${x.where && x.where.length ? `<div class="tr-row">📅 ${x.where.map(esc).join(' · ')}</div>` : ''}
          ${x.info ? `<div class="tr-row tr-dim">${esc(x.info.icon)} ${esc(x.info.toolText)} · ${esc(x.info.sideText)} · ${esc((WECK[w.key] || {}).kr || w.key)} — ${esc(w.why)}</div>` : ''}
        </div></details>`;
    };
    const branch = (g, rows, vids) => {
      const count = rows.filter(r => typeof r !== 'string').length;
      if(!count) return '';
      const body = rows.map(r => typeof r === 'string' ? `<div class="tr-sub">${esc(r)}</div>` : leaf(r)).join('') + (vids || '');
      return `<details class="tr-group" style="--gc:${g.c}"><summary><span class="tr-gi">${g.ic}</span><span class="tr-gn">${esc(g.n)}<small>${esc(g.sub)}</small></span>${vids ? `<span class="tr-gv" title="따라 할 영상">📺 ${(vids.match(/class="tv-i"/g) || []).length}</span>` : ''}<span class="tr-gc">${count}</span></summary>
        <div class="tr-branch">${body}</div></details>`;
    };
    const groups = TREE.map(g => {
      const rows = [];
      g.names.forEach(n => {
        if(n[0] === '#'){ rows.push(n.slice(1)); return; }
        const x = byName.get(norm(n)); if(!x || used.has(norm(n))) return;
        used.add(norm(n)); rows.push(x);
      });
      // 작은 제목 뒤에 종목이 하나도 없으면 그 제목은 지운다
      const clean = rows.filter((r, i) => typeof r !== 'string' || (rows[i + 1] && typeof rows[i + 1] !== 'string'));
      return branch(g, clean, opt.vids === false ? '' : treeVidsHTML(g.k));
    }).join('');
    const rest = items.filter(x => !used.has(norm(x.name)));
    const total = items.length - rest.length;
    const etc = (rest.length && opt.etc !== false) ? branch({ ic:'📦', n:'그 밖에', sub:'프로그램엔 안 나와요 · 검색해서 기록할 때만', c:'#5E6A72' }, rest) : '';
    return `<div class="tr">
      <div class="tr-root">🌳 내 종목 지도 <b>${total}개</b><small>묶음을 누르면 종목이, 종목을 누르면 설명이 펼쳐져요</small></div>
      <div class="tr-trunk">${groups}${etc}</div>
      <div class="tr-legend"><span class="tr-b t">쌤</span> 선생님이 가르쳐 준 것 · <span class="tr-b l">강의</span> 신체지도 강의 · <span class="tr-b w" style="--wk:#4FA8C9">기능성</span> <span class="tr-b w" style="--wk:#C1666B">재활</span> <span class="tr-b w" style="--wk:#E8A33D">중량</span> 운동 분류</div>
    </div>`;
  }

  // ----- 근육 지도 (재활 카드 위): 해부도 + 풀 근육 🔴 / 깨울 근육 🟢 -----
  // 근거: NASM 둥근어깨·거북목 글, NASM 골반 기울기 글, NASM 오버헤드 스쿼트 글 (풀 근육·깨울 근육 목록)
  //       NASM 교과(간접) = 공식 글엔 없고 교과 요약 자료에 있는 것. 강의 = 신체지도 강의(2026-10-16). 일반 = 해부학 상식
  // 그림: 위키미디어 공용 해부도 (파일·라이선스는 img/anat/CREDITS.md). pins 는 그림 위 % 좌표
  const ANAT = {
    shoulder: {
      title:'어깨 · 목 근육 지도', sub:'둥근어깨 · 거북목 · 팔이 머리 위로 안 올라감',
      link:'어깨는 세 뼈가 한 덩어리예요.\n위팔뼈, 쇄골, 날개뼈예요.\n앞 가슴이 짧아지면 뒤 날개뼈 근육이 약해져요.\n그래서 앞은 풀고, 뒤는 깨워요.\n광배근은 골반까지 이어져요.\n그래서 허리와도 연결돼요.',
      imgs:[{f:'img/anat/girdle.jpg',cap:'앞(왼쪽) · 뒤(오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1118_Muscles_that_Position_the_Pectoral_Girdle.jpg',pins:[{m:1,x:26,y:36},{m:8,x:28,y:52},{m:2,x:68,y:25},{m:6,x:74,y:70},{m:7,x:86,y:52}]},{f:'img/anat/trapezius.jpg',cap:'승모근 — 주황 위 · 빨강 가운데 · 자주 아래 (뒤에서)',by:'BodyParts3D © DBCLS',lic:'CC BY-SA 2.1 JP',url:'https://commons.wikimedia.org/wiki/File:Trapezius_back.png',pins:[{m:2,x:50,y:30},{m:6,x:50,y:62}]},{f:'img/anat/humerus.jpg',cap:'광배근 · 회전근개 · 앞톱니근',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1119_Muscles_that_Move_the_Humerus.jpg',pins:[{m:1,x:22,y:7},{m:5,x:65,y:25},{m:8,x:30,y:74},{m:10,x:79,y:62}]},{f:'img/anat/neck.jpg',cap:'목 옆(왼쪽) · 뒤(가운데)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1111_Posterior_and_Side_Views_of_the_Neck.jpg',pins:[{m:4,x:12,y:38},{m:2,x:17,y:57},{m:3,x:46,y:33}]},{f:'img/anat/longus-colli.jpg',cap:'목뼈 앞 깊은 근육 (빨강) — 앞에서',by:'Gray 해부학 1918 · Uwe Gille',lic:'퍼블릭 도메인',url:'https://commons.wikimedia.org/wiki/File:Longus_colli.png',pins:[{m:9,x:57,y:55}]}],
      nerves:[{n:'상완신경총',en:'brachial plexus',mesh:['superiortrunkofbrachialplexus.r','middletrunkofbrachialplexus.r','inferiortrunkofbrachialplexus.r','anteriordivisionsofbrachialplexus.r','posteriordivisionsofbrachialplexus.r','lateralcordofbrachialplexus.r','medialcordofbrachialplexus.r','posteriorcordofbrachialplexus.r'],where:'목 옆에서 나와요.\n쇄골 아래를 지나요.\n작은가슴근 아래를 지나 팔로 가요.',why:'팔 전체의 신경 다발이에요.\n작은가슴근이 짧아지면 이 길이 좁아져요.\n그러면 팔이 저릴 수 있어요.',src:'교과'},{n:'긴가슴신경',en:'long thoracic nerve',mesh:['longthoracicnerve.r'],where:'겨드랑이 옆이에요.\n갈비뼈 위를 세로로 지나요.',why:'앞톱니근을 움직여요.\n앞톱니근이 약하면 날개뼈가 들떠요.\n월 슬라이드로 깨워요.',src:'교과'},{n:'등쪽어깨신경',en:'dorsal scapular nerve',mesh:['dorsalscapularnerve.r'],where:'목 옆에서 날개뼈 안쪽 모서리를 따라가요.',why:'마름근과 어깨올림근을 움직여요.',src:'교과'},{n:'어깨위신경',en:'suprascapular nerve',mesh:['suprascapularnerve.r'],where:'어깨뼈 위 홈을 지나요.\n뒷면으로 가요.',why:'회전근개를 움직여요.\n홈에서 눌리면 회전근개가 약해져요.\n어깨 뒤가 아플 수 있어요.',src:'교과'}],
      muscles:[{k:1,n:'가슴근',s:'가슴근',en:'pectoralis major/minor',t:'r',where:'가슴 앞이에요.\n쇄골 아래 오목한 곳도요.',does:'어깨를 앞으로 말아요.\n둥근어깨를 만드는 근육이에요.',me:'둥근어깨예요.\n어깨가 2° 앞으로 기울었어요.\n등도 굽었어요.',rel:'마사지볼을 쇄골 아래에 대요.\n겨드랑이 앞도 대요.\n아픈 곳마다 30초 눌러요.',str:'문틀 가슴 스트레칭을 해요.\n좌우 30초씩 2번이에요.\n허리는 젖히지 않아요.',int:'로우를 할 때 어깨를 내려요.\n가슴을 편 채로 당겨요.',src:'NASM'},{k:2,n:'위 승모근',s:'위 승모근',en:'upper trapezius',t:'r',where:'목과 어깨 사이예요.\n두툼한 곳이에요.',does:'어깨를 귀 쪽으로 올려요.',me:'양쪽 어깨가 올라갔어요.\n왼쪽이 4°, 오른쪽이 2°예요.',rel:'마사지볼을 목과 어깨 사이에 대요.\n벽에 기대고 30초 눌러요.',str:'목 옆 늘리기를 해요.\n의자를 잡아 어깨를 내려요.\n고개를 반대로 기울여 30초예요.',int:'운동할 때 어깨를 으쓱하지 않아요.\n턱을 당겨요.',src:'NASM'},{k:3,n:'어깨올림근',s:'어깨올림근',en:'levator scapulae',t:'r',where:'목 옆에서 날개뼈 위까지예요.',does:'날개뼈를 위로 끌어올려요.\n거북목과 짝이에요.',me:'거북목이에요.\n어깨 올라감과 한 줄이에요.',rel:'마사지볼을 날개뼈 위 안쪽에 대요.\n30초 눌러요.',str:'고개를 반대쪽 겨드랑이 보듯 숙여요.\n30초예요.',int:'날개뼈를 내리는 느낌을 익혀요.\n승모근 아래 깨우기와 짝이에요.',src:'NASM'},{k:4,n:'목빗근',s:'목빗근',en:'sternocleidomastoid',t:'r',where:'목 옆 굵은 줄이에요.\n이마를 손으로 밀면 튀어나와요.',does:'턱을 앞으로 내밀어요.\n거북목을 만들어요.\n강의에서 뒷골 당김 원인이라 했어요.',me:'거북목이에요.\n목뼈가 왼쪽으로 볼록해요.\n머리가 오른쪽으로 2° 기울었어요.',rel:'손가락으로 살살 집어 풀어요.\n세게 하지 않아요.',str:'고개를 반대쪽으로 돌려요.\n살짝 뒤로 젖혀 20초예요.',int:'턱 당기기를 해요.\n깊은 목 근육이 대신 일하게 해요.',src:'NASM'},{k:5,n:'광배근',s:'광배근',en:'latissimus dorsi',t:'r',where:'겨드랑이 뒤에서 허리까지예요.\n넓게 퍼져 있어요.',does:'팔을 아래로 당겨요.\n짧으면 팔이 머리 위로 안 올라가요.\n골반까지 이어져요.',me:'팔이 머리 위로 잘 안 올라가요.',rel:'폼롤러를 겨드랑이 아래에 대요.\n옆으로 누워 30초 굴려요.',str:'광배근 스트레칭을 해요.\n짐볼이나 벤치에 손을 올려요.\n좌우 30초씩 2번이에요.',int:'케틀벨 암바를 해요.\n오버헤드프레스는 허리를 젖히지 않아요.',src:'NASM'},{k:6,n:'아래 승모근',s:'아래 승모근',en:'middle/lower trapezius',t:'g',where:'날개뼈 사이와 아래예요.\n등 가운데예요.',does:'날개뼈를 모아요.\n날개뼈를 아래로 내려요.',me:'어깨가 올라갔어요.\n왼쪽이 더 올라갔어요.\n날개뼈가 들떠요.',act:'승모근 아래 깨우기 10번씩 2번이에요.\nY 레이즈 10번씩 2번이에요.\nT와 W도 번갈아 해요.',int:'덤벨 로우를 해요.\n어깨를 내리고 당겨요.\n끝에서 2초 버텨요.',src:'NASM'},{k:7,n:'마름근',s:'마름근',en:'rhomboids',t:'g',where:'날개뼈와 척추 사이예요.',does:'날개뼈를 척추 쪽으로 모아요.',me:'둥근어깨 때문에 늘어났어요.\n약해졌어요.',act:'T 레이즈 10번씩 2번이에요.\n엎드려 코브라 10초씩 5번이에요.',int:'로우 끝에서 날개뼈를 모아요.\n2초 버텨요.',src:'NASM'},{k:8,n:'앞톱니근',s:'앞톱니근',en:'serratus anterior',t:'g',where:'겨드랑이 아래예요.\n갈비뼈 옆에 톱니 모양이에요.',does:'날개뼈를 갈비뼈에 붙여요.\n팔 올릴 때 날개뼈를 돌려요.',me:'등이 굽었어요.\n팔 올릴 때 날개뼈가 안 따라 돌아가요.',act:'월 슬라이드 10번씩 2번이에요.\n꼭대기에서 벽을 밀어요.',int:'프레스 꼭대기에서 어깨를 살짝 밀어 올려요.',src:'NASM'},{k:9,n:'깊은 목 근육',s:'깊은 목 근육',en:'deep cervical flexors',t:'g',where:'목뼈 바로 앞이에요.\n깊은 곳이에요.',does:'턱을 당겨요.\n목을 곧게 세워요.',me:'거북목이에요.\n머리가 오른쪽으로 2° 기울었어요.',act:'턱 당기기 5초씩 10번이에요.\n벽에 뒤통수를 대고 해요.',int:'로우와 프레스 때 턱을 당겨요.\n책 위 밸런스 때 시선은 정면이에요.',src:'NASM'},{k:10,n:'회전근개',s:'회전근개',en:'rotator cuff',t:'g',where:'날개뼈 앞뒤예요.\n어깨 뒤 관절 아래예요.',does:'어깨 공을 소켓 가운데에 잡아요.',me:'어깨 가동성이 부족해요.\n어깨가 앞으로 말렸어요.',act:'케틀벨 암바 좌우 8번씩 2번이에요.\n후면 리어 델토이드 플라이 15번이에요.',int:'덤벨 로우를 해요.\n어깨 공을 소켓에 넣은 느낌으로요.',src:'NASM'}] },
    back: {
      title:'허리 · 골반 · 고관절 근육 지도', sub:'골반 앞기울기 6.5° · 오른쪽 허리 아래 욱신 · 오른쪽 장요근 당김',
      link:'허리, 골반, 고관절은 한 덩어리예요.\n강의에서 이걸 코어라고 했어요.\n앞 고관절 근육이 짧아지면 골반이 앞으로 기울어요.\n그러면 허리가 대신 일해요.\n그래서 앞은 풀고, 뒤 엉덩이와 코어는 깨워요.',
      imgs:[{f:'img/anat/hip-thigh.jpg',cap:'오른 다리 앞(위) · 뒤(아래 오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1122_Gluteal_Muscles_that_Move_the_Femur.jpg',pins:[{m:1,x:21,y:13},{m:3,x:15,y:20},{m:2,x:18,y:27},{m:7,x:79,y:56},{m:5,x:78,y:62},{m:6,x:71,y:65},{m:9,x:75,y:79}]},{f:'img/anat/abdomen.jpg',cap:'배 근육(위) · 허리 앞 깊은 근육(아래)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1112_Muscles_of_the_Abdomen.jpg',pins:[{m:8,x:85,y:18},{m:1,x:40,y:74}]},{f:'img/anat/neck-back.jpg',cap:'등 깊은 근육 — 척추세움근 (아래 가운데)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1117_Muscles_of_the_Neck_and_Back.jpg',pins:[{m:4,x:45,y:68}]}],
      nerves:[{n:'좌골신경',en:'sciatic nerve',mesh:['sciaticnerve.r'],where:'엉덩이 깊은 곳이에요.\n이상근 바로 아래로 나와요.\n허벅지 뒤로 내려가요.',why:'몸에서 가장 굵은 신경이에요.\n이상근이 뭉치면 눌려요.\n그러면 엉덩이와 다리 뒤가 저려요.\n오래 앉으면 저린 것과 관련돼요.\n허리 디스크도 같은 곳이 저려요.\n구분은 검사로 해요.',src:'교과'},{n:'볼기신경',en:'superior / inferior gluteal nerve',mesh:['superiorglutealnerve.r','inferiorglutealnerve.r'],where:'이상근 위와 아래로 나와요.\n엉덩이 근육으로 가요.',why:'중둔근과 대둔근을 움직여요.\n깨울 근육에 명령을 보내는 줄이에요.',src:'교과'},{n:'대퇴신경',en:'femoral nerve',mesh:['femoralnerve.r','femoralnervemuscularbranches.r'],where:'허리뼈에서 나와요.\n장요근 사이로 내려와요.\n사타구니 앞으로 가요.',why:'허벅지 앞 근육을 움직여요.\n장요근이 굳으면 영향을 줄 수 있다고 해요.\n근거는 약해요.',src:'추정'},{n:'폐쇄신경',en:'obturator nerve',mesh:['obturatornerve.r','obturatornerveanteriorbranch.r','obturatornerveposteriorbranch.r'],where:'골반 안쪽 구멍을 지나요.\n내전근 사이로 가요.',why:'내전근을 움직여요.\n선생님이 말한 내전근 터널의 신경이에요.',src:'쌤'}],
      muscles:[{k:1,n:'장요근',s:'장요근',en:'iliopsoas',t:'r',where:'허리뼈 앞 깊은 곳이에요.\n골반 안쪽을 지나 허벅지 뼈까지예요.',does:'다리를 들어 올려요.\n짧으면 골반을 앞으로 기울여요.\n허리를 당겨요.',me:'오른쪽 고관절 앞이 불편해요.\n런지로 펴면 시원해요.\n골반이 6.5° 앞으로 기울었어요.',rel:'마사지볼을 골반 앞 뼈 안쪽에 대요.\n살살 30초예요.\n아프면 멈춰요.',str:'반무릎 장요근 스트레칭을 해요.\n골반을 뒤로 말아요.\n엉덩이를 조여요.\n좌우 30초씩 2번이에요.',int:'런지와 힌지를 해요.\n골반을 세운 채로요.',src:'NASM'},{k:2,n:'대퇴직근',s:'대퇴직근',en:'rectus femoris',t:'r',where:'허벅지 앞 한가운데예요.\n골반 앞 뼈에서 시작해요.',does:'골반 앞기울기를 거들어요.\n허벅지 앞 근육 중 골반에 붙은 유일한 근육이에요.',me:'골반 앞기울기를 거들어요.',rel:'마사지볼이나 폼롤러를 허벅지 앞에 대요.\n30초 굴려요.',str:'반무릎 자세에서 뒷발을 손으로 잡아요.\n당기면 같이 늘어나요.\n30초예요.',int:'가블릿 스쿼트를 해요.\n골반을 세운 채 내려가요.',src:'NASM'},{k:3,n:'TFL',s:'TFL',en:'tensor fasciae latae',t:'r',where:'골반 옆 바지 주머니 자리예요.\n허벅지 바깥 띠로 무릎까지 이어져요.',does:'골반 옆을 당겨요.\n무릎 바깥까지 당겨요.',me:'오른쪽 골반이 3° 낮아요.\n오른 무릎이 바깥으로 돌아요.',rel:'마사지볼을 골반 옆에 대요.\n30초 눌러요.\n허벅지 바깥 띠는 굴리지 않아요.',str:'서서 다리를 꼬아요.\n골반을 옆으로 밀어요.\n30초예요.',int:'클램쉘을 해요.\n중둔근이 대신 일하게 해요.',src:'강의'},{k:4,n:'허리 세움근',s:'허리 세움근',en:'lumbar erector spinae',t:'r',where:'허리뼈 양옆이에요.\n세로로 긴 근육 기둥이에요.',does:'허리를 뒤로 젖혀요.\n골반이 앞으로 기울면 너무 많이 일해요.',me:'오른쪽 허리 아래가 욱신해요.\n허리가 너무 앞으로 휘었어요.\n골반 앞기울기 때문으로 보여요.',rel:'허리는 폼롤러로 굴리지 않아요.\n대신 골반 옆, 허벅지 앞, 엉덩이를 풀어요.\n그러면 허리가 편해져요.',str:'아기 자세를 해요.\n숨을 등 뒤로 보내요.\n30초씩 2번이에요.',int:'플랭크와 데드버그를 해요.\n코어가 허리 대신 잡아요.\n힌지 때는 엉덩이를 써요.',src:'NASM'},{k:5,n:'이상근',s:'이상근',en:'piriformis',t:'r',where:'엉덩이 깊은 곳이에요.\n꼬리뼈 옆에서 허벅지 뼈까지예요.',does:'고관절을 바깥으로 돌려요.\n뭉치면 엉덩이가 아파요.\n아래 좌골신경이 눌려 저려요.',me:'오래 앉으면 저려요.\n테니스공으로 풀면 시원해요.\n오른 고관절이 바깥으로 돌아요.',rel:'마사지볼 위에 앉아요.\n엉덩이 깊은 곳을 30초 눌러요.',str:'누워서 다리를 4자로 꼬아요.\n당겨서 30초예요.',int:'크랩워킹과 클램쉘을 해요.\n발끝을 11자로 걸어요.',src:'강의'},{k:6,n:'대둔근',s:'대둔근',en:'gluteus maximus',t:'g',where:'엉덩이 전체예요.\n가장 큰 근육이에요.',does:'고관절을 펴요.\n골반을 뒤로 말아 세워요.',me:'골반이 앞으로 기울었어요.\n엉덩이가 약해 보여요.\n그래서 종아리와 허리가 대신 일해요.',act:'글루트 브릿지 15번씩 2번이에요.\n꼭대기에서 엉덩이를 2초 조여요.',int:'힌지, 가블릿 스쿼트, 케틀벨 스윙을 해요.',src:'NASM'},{k:7,n:'중둔근',s:'중둔근',en:'gluteus medius',t:'g',where:'엉덩이 위 바깥쪽이에요.\n골반 뼈 바로 아래예요.',does:'한 발로 설 때 골반을 잡아요.\n골반이 옆으로 안 떨어지게 해요.',me:'오른쪽 골반이 3° 낮아요.\n무릎이 안으로 쏠려요.',act:'클램쉘 좌우 15번씩 2번이에요.\n크랩워킹과 토터치도 해요.',int:'수트케이스 캐리 좌우 30초예요.\n책 위 밸런스와 런지도 해요.',src:'NASM'},{k:8,n:'깊은 코어',s:'깊은 코어',en:'transversus abdominis',t:'g',where:'배 가장 안쪽이에요.\n허리를 띠처럼 감싸요.',does:'허리가 움직이는 걸 막아요.',me:'허리가 너무 앞으로 휘었어요.\n엉덩이와 깊은 복근으로 세워야 해요.',act:'악어호흡 3분이에요.\n데드버그 좌우 8번씩 2번이에요.\n플랭크는 8초 버티고 2초 쉬기 8번이에요.',int:'바디컨트롤 전면 코어를 해요.\n모든 운동 전에 배에 힘을 잡아요.',src:'NASM'},{k:9,n:'햄스트링',s:'햄스트링',en:'hamstrings',t:'g',where:'허벅지 뒤예요.\n골반 뒤 앉는 뼈에서 시작해요.',does:'골반을 뒤로 당겨요.\n골반이 앞으로 기울면 늘어난 채 약해져요.',me:'늘어난 채 약해졌어요.\n굳은 느낌은 당겨져서 긴장한 것일 수 있어요.\n짧아서가 아닐 수 있어요.',str:'먼저 검사해요.\n누워서 고관절을 90°로 세워요.\n무릎을 펴요.\n거의 다 펴지면 짧은 게 아니에요.\n그러면 강화가 먼저예요.\n30° 넘게 안 펴지면 의자 햄스트링 스트레칭도 해요.',act:'스티프 데드리프트 15번이에요.\n끝에서 집중해요.\n의자 햄스트링 ⑤⑥도 해요.',int:'힌지와 케틀벨 스윙을 해요.',src:'NASM 교과(간접)'}] },
    knee: {
      title:'무릎 · 발목 · 발 근육 지도', sub:'오른 무릎 안쪽 통증 · 무릎 바깥돌림 · 왼발목 안으로 무너짐',
      link:'무릎은 버티는 관절이에요.\n위 고관절과 아래 발목이 굳으면 무릎이 대신 돌아가요.\n허벅지 안쪽과 바깥 띠가 당기면 무릎이 안으로 모여요.\n엉덩이 옆 근육이 위에서 잡아 줘야 해요.\n무릎 안쪽 통증은 거위발 자리일 수 있어요.\n진단은 정형외과에서 받아요.',
      imgs:[{f:'img/anat/hip-thigh.jpg',cap:'오른 다리 앞(위) · 뒤(아래 오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1122_Gluteal_Muscles_that_Move_the_Femur.jpg',pins:[{m:1,x:23,y:20},{m:2,x:15,y:20},{m:6,x:23,y:32},{m:5,x:79,y:56},{m:4,x:77,y:76}]},{f:'img/anat/lower-leg.jpg',cap:'종아리 앞(왼쪽) · 뒤(가운데) · 뒤 깊은 곳(오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1123_Muscles_of_the_Leg_that_Move_the_Foot_and_Toes.jpg',pins:[{m:7,x:23,y:25},{m:3,x:61,y:45},{m:7,x:93,y:43}]},{f:'img/anat/foot.jpg',cap:'발바닥 — 발바닥 근막 (아래 왼쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1124_Intrinsic_Muscles_of_the_Foot.jpg',pins:[{m:8,x:17,y:58}]},{f:'img/anat/pes-anserinus.jpg',cap:'거위발 — 무릎 안쪽 아래 동그라미',by:'M. Häggström · Gray 434',lic:'퍼블릭 도메인',url:'https://commons.wikimedia.org/wiki/File:Pes_anserinus.png',pins:[{m:9,x:37,y:91}]}],
      nerves:[{n:'총비골신경',en:'common fibular nerve',mesh:['commonfibularnerve.r','superficialfibularnerve.r','deepfibularnerve.r'],where:'무릎 뒤에서 나와요.\n무릎 바깥 뼈를 감아요.\n정강이 앞으로 가요.',why:'무릎 바깥 뼈 옆이라 눌리기 쉬워요.\n눌리면 발등이 저려요.\n발목을 못 들어요.\n다리 꼬고 앉기는 피해요.',src:'교과'},{n:'경골신경',en:'tibial nerve',mesh:['tibialnerve.r'],where:'무릎 뒤 가운데예요.\n종아리 속 깊이 내려가요.',why:'종아리와 발바닥 근육을 움직여요.\n종아리가 뭉치면 같이 불편할 수 있어요.',src:'교과'},{n:'복재신경',en:'saphenous nerve',mesh:['saphenousbranchoffemoralisnerve.r','saphenousnervemedialcruralcutaneousbranches.r','infrapatellarbranchofsaphenousnerve.r'],where:'내전근 터널을 지나요.\n무릎 안쪽으로 나와요.\n정강이 안쪽 피부로 가요.',why:'무릎 안쪽 피부 감각 신경이에요.\n거위발 근처를 지나요.\n무릎 안쪽 통증과 섞여 보일 수 있어요.\n구분은 정형외과에서 해요.',src:'교과'},{n:'발바닥 신경',en:'medial / lateral plantar nerve',mesh:['medialplantarnerve.r','lateralplantarnerve.r'],where:'발목 안쪽 복사뼈 뒤를 돌아요.\n발바닥으로 가요.',why:'발 아치 근육을 움직여요.\n발바닥 감각도 맡아요.',src:'교과'}],
      muscles:[{k:1,n:'내전근',s:'내전근',en:'adductors',t:'r',where:'허벅지 안쪽이에요.',does:'짧으면 무릎을 안으로 끌어요.',me:'오른쪽 허벅지 안쪽이에요.\n신경이 지나는 터널이에요.\n선생님이 알려 주셨어요.\n오른 무릎 안쪽 통증과 엮여요.',rel:'폼롤러를 허벅지 안쪽에 대요.\n엎드려 다리를 옆으로 하고 30초예요.',str:'내전근 스트레칭을 해요.\n좌우 30초씩 2번이에요.\n끝에서 5초씩 3번 눌러요.',int:'이너타이 머신을 해요.\n가블릿 스쿼트 때 무릎은 셋째 발가락 쪽이에요.',src:'NASM'},{k:2,n:'TFL',s:'TFL',en:'TFL / IT band',t:'r',where:'골반 옆이에요.\n허벅지 바깥 띠로 무릎까지예요.',does:'무릎 바깥을 당겨요.\n무릎이 돌아가게 해요.',me:'오른 무릎이 6° 바깥으로 돌아요.\n오른쪽 골반이 3° 낮아요.',rel:'마사지볼을 골반 옆에 대요.\n30초예요.',str:'서서 다리를 꼬아요.\n골반을 옆으로 밀어요.\n30초예요.',int:'클램쉘과 크랩워킹을 해요.\n중둔근이 대신 일하게 해요.',src:'NASM'},{k:3,n:'종아리',s:'종아리',en:'gastrocnemius / soleus',t:'r',where:'종아리 뒤예요.\n겉과 속 두 층이에요.',does:'굳으면 발목이 안 젖혀져요.\n그러면 발과 무릎이 안으로 무너져요.',me:'오른쪽 종아리가 항상 뭉쳐요.\n엉덩이가 약해서 종아리가 대신 일하는 것 같아요.\n오른 발끝이 바깥으로 돌아요.',rel:'마사지볼로 종아리를 풀어요.\n정강이 앞도 풀어요.\n발바닥 마사지도 해요.',str:'벽 종아리 스트레칭을 해요.\n무릎 펴고 30초예요.\n무릎 굽히고 30초예요.',int:'카프 레이즈를 해요.\n끝까지 내려 2초 버텨요.\n책 위 밸런스도 해요.',src:'NASM 교과(간접)'},{k:4,n:'대퇴이두근',s:'대퇴이두근',en:'biceps femoris',t:'r',where:'허벅지 뒤 바깥쪽이에요.',does:'무릎을 바깥으로 돌려요.',me:'오른 무릎이 6° 바깥으로 돌아요.\n오른 발끝도 바깥으로 돌아요.\n고관절 바깥돌림과 한 줄이에요.',rel:'폼롤러를 허벅지 뒤 바깥에 대요.\n30초예요.',str:'의자 햄스트링 스트레칭을 해요.\n발끝을 안쪽으로 살짝 돌려요.',int:'스티프 데드리프트를 해요.\n발끝은 11자예요.',src:'NASM 교과(간접)'},{k:5,n:'중둔근',s:'중둔근',en:'gluteus medius',t:'g',where:'엉덩이 위 바깥쪽이에요.',does:'무릎이 안으로 모이는 걸 위에서 막아요.',me:'왼 무릎이 4° 안으로 돌아요.\n왼 발목이 안으로 무너져요.',act:'클램쉘 좌우 15번씩 2번이에요.\n크랩워킹과 토터치도 해요.',int:'밸런스 리치를 해요.\n책 위 밸런스와 런지도 해요.',src:'NASM'},{k:6,n:'내측광근',s:'내측광근',en:'vastus medialis',t:'g',where:'무릎 바로 위 안쪽이에요.\n물방울 모양이에요.',does:'무릎뼈가 안쪽으로 잘 미끄러지게 잡아요.',me:'오른쪽 무릎 안쪽 근육이에요.\n무릎이 안으로 쏠리지 않게 잡아 줘요.',act:'월싯 20초씩 3번이에요.\n아프지 않은 각도로요.\n레그프레스 마지막은 천천히 펴요.',int:'스쿼트와 레그프레스를 해요.\n통제되는 깊이까지만요.\n손잡이를 잡고 코어에 힘을 줘요.',src:'NASM 교과(간접)'},{k:7,n:'정강근',s:'정강근',en:'tibialis anterior / posterior',t:'g',where:'정강이 앞이에요.\n종아리 속 깊은 곳도요.',does:'발 아치를 세워요.\n발목을 젖혀요.',me:'왼쪽 발목이 안으로 무너져요.\n왼 무릎이 안으로 돌아요.',act:'카프 레이즈 15번이에요.\n끝까지 내려 2초 버텨요.\n발가락 수건 잡기 15번씩 2번이에요.',int:'책 위 밸런스를 해요.\n새끼발가락 쪽을 눌러요.\n밸런스 리치도 해요.',src:'NASM 교과(간접)'},{k:8,n:'발바닥',s:'발바닥',en:'plantar fascia / intrinsic foot',t:'g',where:'발바닥이에요.\n뒤꿈치에서 발가락까지예요.',does:'아치를 받쳐요.\n뭉치면 종아리까지 당겨요.',me:'왼발 아치가 무너졌어요.',rel:'발바닥 마사지를 해요.\n공을 좌우 1분씩 굴려요.\n아픈 곳은 10초 멈춰요.',act:'발가락 수건 잡기 15번씩 2번이에요.\n뒤꿈치는 바닥에 둬요.',int:'밸런스 리치를 해요.\n맨발로 책 위 밸런스도 해요.',src:'강의'},{k:9,n:'거위발',s:'거위발',en:'pes anserinus',t:'p',where:'무릎 안쪽 아래예요.\n세 근육이 정강이 뼈에 붙는 곳이에요.',does:'무릎 안쪽 통증이 자주 생기는 자리예요.\n내전근과 햄스트링이 당기면 여기가 아파요.',me:'오른쪽 무릎 안쪽이 욱신해요.\n접으면 불편해요.\n부어요.\n달리면 아파요.\n1~2주 안에 정형외과에 가요.',rel:'붓는 날은 ①②만 해요.\n내전근과 햄스트링을 풀면 당김이 줄어요.\n얼음 10분도 해요.',str:'내전근 스트레칭을 해요.\n의자 햄스트링 스트레칭도 해요.\n아프지 않은 범위로요.',int:'붓기가 없을 때만 해요.\n월싯과 책 위 밸런스예요.\n달리기와 점프는 쉬어요.',src:'일반'}] },
  };

  // 근육 지도 그리기: 해부도 + 번호 핀 + 근육 목록 (🔴 풀고 늘리기 · 🟢 깨우기 · ⚠ 조심)
  if(typeof document !== 'undefined' && !window.__anPinBound){
    window.__anPinBound = true;
    document.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('.an-pin'); if(!b) return;
      e.preventDefault();
      const row = document.getElementById('an-' + b.dataset.anpin); if(!row) return;
      document.querySelectorAll('.an-m.hit').forEach(x => x.classList.remove('hit'));
      row.classList.add('hit'); row.scrollIntoView({ behavior:'smooth', block:'center' });
      setTimeout(() => row.classList.remove('hit'), 2500);
    });
  }
  // 근육 하나의 "내 증상 + ① 풀기 ② 늘리기 ③ 깨우기 ④ 통합" (앱 3D 설명 상자와 재활 카드가 같이 씀)
  const br = t => esc(t).replace(/\n/g, '<br>');
  // 글 속 운동 이름 → 사진이 있는 앱 종목 (긴 것부터 맞춘다)
  const EX_ALIAS = [
    [/마사지볼[^\n]*(쇄골|겨드랑이)/, '마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤'],
    [/마사지볼[^\n]*(골반|허벅지 앞|엉덩이)/, '마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이'],
    [/마사지볼[^\n]*(종아리|정강이)|종아리를 풀어/, '마사지볼 풀기 — 종아리·정강이 앞'],
    [/발바닥 마사지/, '발바닥 마사지'],
    [/폼롤러[^\n]*(겨드랑이|광배근)/, '폼롤러 광배근 풀기'],
    [/광배근 스트레칭/, '광배근 스트레칭 (짐볼·벤치)'],
    [/문틀 가슴/, '문틀 가슴 스트레칭'],
    [/목 옆 늘리기|위 승모근 스트레칭/, '위 승모근 스트레칭 (목 옆 늘리기)'],
    [/승모근 아래 깨우기/, '승모근 아래 깨우기 (손바닥 뒤로 내리기)'],
    [/Y 레이즈/, 'Y 레이즈'], [/T 레이즈|T와 W/, 'T 레이즈'], [/W 레이즈/, 'W 레이즈'],
    [/코브라/, '엎드려 코브라'], [/월 슬라이드/, '월 슬라이드'], [/턱 당기기/, '턱 당기기 (깊은 목 근육)'],
    [/케틀벨 암바/, '케틀벨 암바'], [/원암 회전 로우|회전 로우/, '원암 케이블 회전 로우 (불균형 교정)'], [/덤벨 로우|로우를|로우 끝|로우는|로우와/, '덤벨 로우'],
    [/후면 리어/, '후면 리어 델토이드 플라이'], [/오버헤드프레스|프레스 꼭대기|프레스 때/, '오버헤드프레스'],
    [/반무릎/, '반무릎 장요근 스트레칭'], [/아기 자세/, '아기 자세 (차일드 포즈)'], [/글루트 브릿지/, '글루트 브릿지'],
    [/클램쉘/, '클램쉘'], [/크랩워킹/, '크랩워킹'], [/토터치/, '토터치'], [/데드버그/, '데드버그'], [/플랭크/, '플랭크'], [/악어호흡/, '악어호흡'],
    [/캐리/, '수트케이스 캐리 (한 손 케틀벨 들고 걷기)'], [/책 위 밸런스/, '책 위 밸런스 (한 발·일자 서기)'], [/밸런스 리치/, '밸런스 리치 (한 발 서서 앞·뒤 터치)'],
    [/런지/, '런지'], [/힌지/, '고관절 힌지 보조운동'], [/가블릿 스쿼트/, '가블릿 스쿼트'], [/스쿼트/, '스쿼트'], [/케틀벨 스윙/, '케틀벨 스윙'], [/케틀벨 굿모닝/, '케틀벨 굿모닝'],
    [/스티프 데드리프트/, '스티프 데드리프트'], [/의자 햄스트링/, '의자 햄스트링 스트레칭'], [/내전근 스트레칭/, '내전근 스트레칭'], [/이너타이/, '이너타이 머신'],
    [/벽 종아리/, '벽 종아리 스트레칭'], [/카프 레이즈/, '카프 레이즈'], [/수건 잡기/, '발가락 수건 잡기'], [/월싯/, '월싯(벽 스쿼트)'], [/레그프레스/, '레그프레스'],
    [/바디컨트롤/, '바디컨트롤 전면 코어'], [/4자/, '이상근 스트레칭 (4자)'],
  ];
  // 글 한 토막에 나오는 운동들의 사진 (사진 있는 것만, 겹치지 않게)
  function exPicsHTML(text){
    const seen = new Set(); const out = [];
    EX_ALIAS.forEach(([re, name]) => {
      if(seen.has(name) || !re.test(text)) return;
      const im = imgOf(name); if(!im) return;
      seen.add(name);
      out.push(`<a class="an-ex" href="${im.credit ? im.a : videoUrl(name)}" target="_blank" rel="noopener" title="${esc(name)}"><img src="${im.a}" loading="lazy" alt=""><small>${esc(name.replace(/\s*\(.*?\)\s*|\s*—.*$/g, ''))}</small></a>`);
    });
    return out.length ? `<div class="an-exs">${out.join('')}</div>` : '';
  }
  // ----- 손으로 근육 찾기 (촉진) — 그 근육만 하는 작은 동작에 힘을 주면 근육이 튀어나온다 (Muscolino 촉진 원칙) -----
  // 근육 이름(n) → [{ t 작은 이름, p 자세, h 손 위치, f 힘주기, e 느낌, w 주의, s 출처, self 혼자 하기용으로 바꾼 동작, gen 일반 지식 섞임 }]
  const PALP = { "가슴근": [ { "t": "큰가슴근", "p": "앉거나 선다.", "h": "반대손으로 겨드랑이 앞 접힌 살을 엄지와 손가락으로 잡는다.", "f": "팔을 앞으로 뻗는다.\n손바닥으로 책상 모서리를 몸 안쪽으로 민다.", "e": "겨드랑이 앞 살이 굵고 단단해진다.", "w": "가슴 가운데 말고 근육 가장자리를 만진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/shoulder/muscles/glenohumeral_pectoralis_sternal.html" ], "self": true }, { "t": "작은가슴근", "p": "앉는다.\n찾는 쪽 손등을 허리 뒤에 댄다.", "h": "쇄골 바깥 끝 아래 오목한 곳에서 조금 안쪽 아래로 간다.\n단단한 뼈 돌기 바로 아래에 손가락을 둔다.", "f": "허리 뒤 손을 등에서 살짝 뗀다.", "e": "큰가슴근 밑에서 줄이 팽팽해진다.", "w": "팔이 저리면 바로 손을 뗀다.\n밑으로 신경과 혈관이 지나간다.", "s": [ "https://learnmuscles.com/blog/2026/05/06/pectoralis-minor-anatomy-functions-and-clinical-application/" ] } ], "위 승모근": [ { "p": "앉거나 선다.", "h": "반대손을 어깨 위, 날개뼈 위쪽에 올린다.", "f": "어깨를 살짝 으쓱한다.\n고개를 아주 조금 뒤로 젖혀도 된다.", "e": "어깨 위 두꺼운 살이 단단해진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/shoulder/muscles/scapulothoracic_upper_trapezius.html" ] } ], "어깨올림근": [ { "p": "앉는다.\n찾는 쪽 손등을 허리 뒤에 댄다.\n이러면 위 승모근이 쉰다.", "h": "반대손을 어깨 너머로 넘긴다.\n날개뼈 위 안쪽 모서리 바로 위에 둔다.", "f": "어깨를 아주 짧고 약하게 으쓱한다.", "e": "목 옆 뒤로 비스듬한 줄이 단단해진다.", "s": [ "https://www.learnmuscles.com/wp-content/uploads/2016/08/Mass-Aust-Iss-67-Palpation-Article.pdf" ] } ], "목빗근": [ { "p": "앉는다.\n고개를 반대쪽으로 돌린다.\n찾는 쪽 귀를 찾는 쪽 어깨로 조금 기울인다.", "h": "찾는 쪽 손바닥을 관자놀이에 대고 버틴다.\n반대손으로 목 앞 줄을 집게처럼 잡는다.", "f": "머리를 더 기울이려고 손을 민다.\n돌린 고개는 그대로 둔다.", "e": "귀 뒤에서 가슴 가운데 뼈 쪽으로 굵은 줄이 선다.", "w": "꾹 누르지 말고 집어서 만진다.\n한쪽씩만 한다.\n맥이 뛰면 손을 옮긴다.", "s": [ "https://www.learnmuscles.com/wp-content/uploads/2016/08/springarticle.pdf" ] } ], "광배근": [ { "p": "앉아서 팔을 옆 책상 위에 올린다.", "h": "반대손으로 겨드랑이 뒤 접힌 살을 잡는다.", "f": "팔꿈치로 책상을 아래로 꾹 누른다.", "e": "겨드랑이 뒤 살이 굵고 단단해진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/shoulder/muscles/glenohumeral_latissimus.html" ], "self": true } ], "아래 승모근": [ { "p": "엎드린다.\n팔을 옆으로 벌려 비행기 날개처럼 든다.", "h": "아래쪽은 등 아래 척추 바로 옆이다.\n가운데는 날개뼈와 척추 사이다.", "f": "날개뼈를 척추 쪽으로 살짝 모은다.\n세게 모으지 않는다.", "e": "날개뼈 안쪽 아래로 비스듬한 판이 단단해진다.", "w": "혼자서는 손이 잘 안 닿는다.\n거울을 보거나 다른 사람 손을 빌린다.", "s": [ "https://learnmuscles.com/wp-content/uploads/2018/06/palpation_book_newpgs.pdf" ] } ], "마름근": [ { "p": "앉는다.\n찾는 쪽 손등을 허리 뒤에 댄다.", "h": "반대손을 어깨 너머로 넘긴다.\n날개뼈 안쪽 끝과 척추 사이에 둔다.", "f": "허리 뒤 손을 등에서 살짝 뗀다.\n뗐다 붙였다를 반복한다.", "e": "날개뼈 안쪽이 단단해졌다 풀린다.", "w": "혼자서는 윗부분만 닿는다.", "s": [ "https://learnmuscles.com/blog/2026/05/08/rhomboids-attachments-functions-palpation-treatment/" ] } ], "앞톱니근": [ { "p": "앉는다.\n팔을 앞으로 들어 어깨 높이에 둔다.", "h": "반대손을 겨드랑이 아래 옆 갈비뼈 위에 둔다.", "f": "주먹으로 벽을 밀듯이 팔을 앞으로 쭉 내민다.\n몸통은 숙이지 않는다.", "e": "갈비뼈 위에서 톱날 같은 줄이 단단해진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/shoulder/muscles/scapulothoracic_serratus.html", "https://www.learnmuscles.com/wp-content/uploads/2016/04/MSM4e-Sample-Pages.pdf" ] } ], "깊은 목 근육": [ { "p": "누워서 무릎을 세운다.", "h": "손가락을 목 앞 목빗근 줄 위에 가볍게 둔다.", "f": "머리는 들지 않는다.\n턱만 아주 작게 \"네\" 하듯 끄덕인다.", "e": "깊은 근육은 직접 못 만진다.\n목빗근이 말랑하게 남아 있으면 깊은 근육을 쓴 것이다.", "w": "목 앞을 깊게 누르지 않는다.\n기도와 큰 혈관이 있다.", "s": [ "https://www.learnmuscles.com/wp-content/uploads/2016/08/springarticle.pdf", "https://pubmed.ncbi.nlm.nih.gov/18804003/" ] } ], "회전근개": [ { "t": "가시아래근", "p": "앉는다.\n찾는 쪽 팔꿈치를 옆구리에 붙이고 90도 굽힌다.", "h": "반대손을 가슴 앞으로 넘긴다.\n날개뼈 가로 뼈 바로 아래 바깥쪽에 둔다.", "f": "손등으로 문틀을 바깥으로 살짝 민다.", "e": "날개뼈 아래 바깥쪽이 볼록 단단해진다.", "s": [ "https://learnmuscles.com/?p=174993" ], "self": true }, { "t": "가시위근", "p": "앉는다.\n찾는 쪽 손등을 허리 뒤에 댄다.", "h": "반대손을 어깨 너머로 넘긴다.\n날개뼈 가로 뼈 바로 위 오목한 곳에 둔다.", "f": "팔을 옆으로 아주 조금만 든다.\n한 뼘도 안 든다.", "e": "승모근 밑 깊은 곳이 단단해진다.", "w": "크게 들면 승모근이 섞여서 헷갈린다.", "s": [ "https://learnmuscles.com/blog/2026/06/03/the-supraspinatus-cannot-abduct-the-arm/" ] } ], "장요근": [ { "p": "누워서 무릎을 세운다.", "h": "배꼽과 골반 앞 튀어나온 뼈 사이 중간에 둔다.\n윗몸일으키기 근육 바로 바깥이다.", "f": "숨을 내쉴 때마다 척추 쪽으로 천천히 들어간다.\n그다음 발을 아주 조금 든다.", "e": "깊은 곳에서 굵은 줄이 단단해진다.", "w": "맥이 뛰면 바로 바깥으로 옮긴다. 큰 혈관이다.\n배가 아프거나 속이 불편하면 멈춘다.", "s": [ "https://www.abmp.com/massage-and-bodywork-magazine/issues/januaryfebruary-2019/palpation-psoas-major-thorough-exploration-how-access-core-muscle", "https://www.vhdissector.com/lessons/surface-palpation-guide/pelvis_hip/muscles/psoas_major.html" ] } ], "대퇴직근": [ { "p": "의자에 앉는다.", "h": "골반 앞 뼈 바로 아래에서 TFL 보다 한 칸 안쪽에 둔다.", "f": "무릎을 펴서 발을 앞으로 찬다.", "e": "허벅지 앞 가운데 줄이 단단해진다.\n옆 근육은 말랑하다.", "s": [ "https://www-b.abmp.com/massage-and-bodywork-magazine/issues/januaryfebruary-2024/palpating-anterior-hip" ] } ], "TFL": [ { "p": "눕거나 앉는다.", "h": "골반 앞 튀어나온 뼈에서 바로 아래, 조금 바깥이다.", "f": "무릎을 안쪽으로 돌린다.\n그 상태로 무릎을 살짝 든다.", "e": "손가락 밑 작은 덩어리가 톡 튀어나온다.", "s": [ "https://www-b.abmp.com/massage-and-bodywork-magazine/issues/januaryfebruary-2024/palpating-anterior-hip" ] } ], "허리 세움근": [ { "p": "엎드린다.\n한 팔은 앞으로 뻗는다.", "h": "다른 손을 허리뼈 바로 옆에 둔다.", "f": "뻗은 팔과 가슴을 살짝 든다.", "e": "척추 양옆 기둥이 단단해진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/spine/muscles/erector_spinae_group.html" ] } ], "이상근": [ { "p": "엎드린다.\n무릎을 90도 굽힌다.", "h": "엉치뼈 옆 가장자리와 허벅지 바깥 위 뼈 사이에 둔다.", "f": "발을 반대 다리 쪽으로 아주 약하게 넘긴다.", "e": "엉덩이 깊은 곳에서 줄이 톡 튀어나온다.", "w": "세게 하면 큰볼기근이 덮어 버린다.\n다리가 저리면 멈춘다. 좌골신경이 가깝다.", "s": [ "https://learnmuscles.com/?p=173233", "https://learnmuscles.com/wp-content/uploads/2018/06/palpation_book_newpgs.pdf" ] } ], "대둔근": [ { "p": "선다.", "h": "엉덩이 한가운데에 손을 둔다.", "f": "다리를 뒤로 민다.\n엉덩이를 꽉 조여도 된다.", "e": "엉덩이 전체가 단단해진다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/pelvis_hip/muscles/gluteus_maximus.html" ] } ], "중둔근": [ { "p": "선다.", "h": "골반 옆 뼈 위쪽 가운데에서 손가락 한두 개 아래다.", "f": "반대쪽 발을 들고 한 발로 선다.", "e": "디딘 쪽 골반 옆이 단단해진다.", "s": [ "https://learnmuscles.com/blog/2026/05/26/gluteus-medius-the-deltoid-of-the-hip/" ] } ], "깊은 코어": [ { "p": "누워서 무릎을 세운다.", "h": "골반 앞 튀어나온 뼈에서 2cm 안쪽, 조금 아래에 손가락 두 개를 둔다.", "f": "숨을 내쉰다.\n배꼽을 등 쪽으로 천천히 당긴다.", "e": "천천히 깊게 팽팽해지면 맞다.\n갑자기 툭 튀어나오면 다른 배근육이다.", "w": "복횡근만 따로 만지기는 어렵다.\n깊은 배근육 전체 느낌이다.", "s": [ "https://pmc.ncbi.nlm.nih.gov/articles/PMC7918832/" ] } ], "햄스트링": [ { "p": "의자에 앉는다.\n무릎을 조금 굽힌다.", "h": "무릎 뒤 안쪽 줄과 바깥 줄에 손가락을 둔다.", "f": "발뒤꿈치로 의자 다리를 뒤로 민다.\n안쪽은 발끝을 안으로, 바깥쪽은 발끝을 밖으로 돌린다.", "e": "무릎 뒤 양쪽에 굵은 줄이 선다.", "w": "무릎 뒤 한가운데는 누르지 않는다.\n혈관과 신경이 있다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/knee_leg/muscles/hamstrings_semitendinosus.html", "https://www.vhdissector.com/lessons/surface-palpation-guide/knee_leg/muscles/hamstrings_biceps_femoris.html" ], "self": true } ], "내전근": [ { "p": "의자에 앉는다.", "h": "허벅지 안쪽 맨 위, 두덩뼈 바로 아래에 둔다.", "f": "무릎 사이에 공이나 주먹을 끼우고 꾹 조인다.", "e": "사타구니 안쪽에 가장 굵은 줄이 하나 선다.", "w": "맥이 뛰는 곳은 피한다.\n바로 바깥에 큰 혈관이 있다.", "s": [ "https://learnmuscles.com/blog/2026/08/27/assess-diagnose-client-adductor-strain/", "https://www-b.abmp.com/massage-and-bodywork-magazine/issues/januaryfebruary-2024/palpating-anterior-hip" ] } ], "종아리": [ { "t": "장딴지근", "p": "벽을 잡고 선다.\n무릎을 편다.", "h": "종아리 위쪽에 손을 둔다.", "f": "까치발을 든다.", "e": "위쪽에 두 덩어리가 볼록 선다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/ankle_foot/muscles/gastrocnemius.html" ] }, { "t": "가자미근", "p": "벽을 잡고 선다.\n무릎을 굽힌다.", "h": "아킬레스 힘줄 양옆에 손을 둔다.", "f": "무릎을 굽힌 채 까치발을 든다.", "e": "종아리 아래 옆쪽이 단단해진다.\n바깥쪽이 더 잘 잡힌다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/ankle_foot/muscles/soleus.html" ] } ], "대퇴이두근": [ { "p": "의자에 앉는다.\n무릎을 90도 굽힌다.", "h": "무릎 바깥 아래 동그란 뼈 바로 위, 뒤쪽이다.", "f": "발끝을 밖으로 돌린다.\n발뒤꿈치로 의자 다리를 뒤로 민다.", "e": "무릎 바깥 뒤에 굵은 밧줄이 선다.", "w": "동그란 뼈 뒤 아래는 세게 누르지 않는다.\n신경이 지나간다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/knee_leg/muscles/hamstrings_biceps_femoris.html" ], "self": true } ], "내측광근": [ { "p": "앉아서 다리를 앞으로 쭉 편다.", "h": "무릎뼈 위 안쪽 모서리 바로 위다.", "f": "허벅지에 힘을 준다.\n무릎 뒤를 바닥으로 꾹 누른다.", "e": "물방울 모양 덩어리가 볼록 선다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/knee_leg/muscles/vastus_medialis_oblique.html" ] } ], "정강근": [ { "t": "앞정강근", "p": "의자에 앉는다.", "h": "정강이뼈 바로 바깥, 위쪽 부분이다.", "f": "발등을 몸 쪽으로 당긴다.\n발바닥을 안쪽으로 살짝 돌린다.", "e": "정강이 옆 근육이 단단해진다.\n발목 앞 안쪽에 힘줄이 선다.", "s": [ "https://www.vhdissector.com/lessons/surface-palpation-guide/ankle_foot/muscles/anterior_tibialis.html" ] }, { "t": "뒤정강근", "p": "앉아서 발을 반대 무릎 위에 올린다.", "h": "안쪽 복숭아뼈 바로 뒤 아래다.", "f": "발끝을 조금 내린다.\n발바닥을 안쪽으로 돌려 반대손에 민다.", "e": "뼈에 가장 가까운 힘줄이 팽팽해진다.", "w": "가볍게 누른다.\n바로 뒤에 맥 뛰는 혈관이 있다.", "s": [ "https://podiatry-anatomy-app.qut.edu.au/content/muscles/tibialis-posterior-tendon.html" ] } ], "발바닥": [ { "p": "앉아서 발을 반대 무릎 위에 올린다.", "h": "발뒤꿈치 안쪽 앞에서 엄지발가락 쪽 아치를 따라간다.", "f": "반대손으로 엄지발가락을 발등 쪽으로 젖힌다.", "e": "아치 안쪽에 팽팽한 띠가 선다.", "s": [ "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8031382/" ], "gen": true } ], "거위발": [ { "p": "의자에 앉는다.\n무릎을 90도 굽힌다.", "h": "무릎 안쪽 관절선에서 손가락 세 개쯤 아래, 정강이 안쪽 앞이다.", "f": "발뒤꿈치로 의자 다리를 뒤로 민다.\n무릎 뒤 안쪽 줄이 아래로 이어지는 곳을 따라간다.", "e": "정강이 안쪽 위에 납작한 힘줄 판이 있다.\n세 힘줄을 하나씩 나누기는 어렵다.", "w": "붓거나 누르면 아픈 곳이면 세게 누르지 않는다.", "s": [ "https://www.ncbi.nlm.nih.gov/sites/books/NBK532941/" ], "gen": true } ] };
  function palpHTML(m){
    const L = PALP[m.n]; if(!L) return '';
    const one = x => `<div class="pa-one">${x.t ? `<div class="pa-t">${esc(x.t)}</div>` : ''}
      <div class="pa-row"><i>🪑</i><span>${br(x.p)}</span></div>
      <div class="pa-row"><i>👉</i><span>${br(x.h)}</span></div>
      <div class="pa-row"><i>💪</i><span>${br(x.f)}</span></div>
      <div class="pa-row"><i>✨</i><span>${br(x.e)}</span></div>
      ${x.w ? `<div class="pa-row w"><i>⚠️</i><span>${br(x.w)}</span></div>` : ''}
      <div class="pa-src">근거 ${(x.s || []).map((u, i) => `<a href="${u}" target="_blank" rel="noopener">${i + 1}</a>`).join(' ')}${x.self ? ' · 혼자 하기용으로 바꾼 동작' : ''}${x.gen ? ' · 일반 지식 섞임' : ''}</div></div>`;
    return `<details class="an-palp"><summary>✋ 손으로 찾기 <small>힘을 주면 튀어나와요</small></summary>${L.map(one).join('')}</details>`;
  }
  function anatPlanHTML(m){
    const L = [];
    if(m.me)  L.push(`<div class="an-me"><b>🙋 내 증상</b>${br(m.me)}</div>`);
    L.push(palpHTML(m));
    // 글은 왼쪽(.an-st), 운동 그림은 오른쪽 — 세로 공간을 덜 쓴다 (2026-10-18)
    if(m.rel) L.push(`<div class="an-step r"><b>① 풀기</b><div class="an-st">${br(m.rel)}</div>${exPicsHTML(m.rel)}</div>`);
    if(m.str) L.push(`<div class="an-step r"><b>② 늘리기</b><div class="an-st">${br(m.str)}</div>${exPicsHTML(m.str)}</div>`);
    if(m.act) L.push(`<div class="an-step g"><b>③ 깨우기</b><div class="an-st">${br(m.act)}</div>${exPicsHTML(m.act)}</div>`);
    if(m.int) L.push(`<div class="an-step i"><b>④ 통합</b><div class="an-st">${br(m.int)}</div>${exPicsHTML(m.int)}</div>`);
    if(!L.length && m.fix) L.push(`<div class="an-fix">${esc(m.fix)}</div>`);
    return `<div class="an-plan">${L.join('')}</div>`;
  }
  // 근육 하나의 그림 조각 — 해부도(ANAT[part].imgs)에서 그 근육 핀 자리를 확대해 보여 준다
  function anatThumbHTML(part, m, size){
    const a = ANAT[part]; if(!a) return '';
    let pick = null;
    (a.imgs || []).some(im => { const p = (im.pins || []).find(x => x.m === m.k); if(p){ pick = { im, p }; return true; } return false; });
    if(!pick) return '';
    const S = 2.6, px = pick.p.x / 100, py = pick.p.y / 100;
    // 그림의 (px,py) 점이 조각 한가운데 오게: background-position P = (0.5 − p·S) / (1 − S)
    const bx = (0.5 - px * S) / (1 - S) * 100, by = (0.5 - py * S) / (1 - S) * 100;
    const sz = size || 76;
    return `<a class="an-thumb ${m.t}" href="${pick.im.f}" target="_blank" rel="noopener" style="width:${sz}px;height:${sz}px;background-image:url('${pick.im.f}');background-size:${S * 100}% auto;background-position:${bx.toFixed(1)}% ${by.toFixed(1)}%" title="누르면 큰 그림"><i></i></a>`;
  }
  function anatHTML(part){
    const a = ANAT[part]; if(!a) return '';
    const byK = {}; a.muscles.forEach(m => byK[m.k] = m);
    const figs = (a.imgs || []).map(im => `<figure class="an-fig">
        <div class="an-wrap"><img src="${im.f}" alt="" loading="lazy">
          ${(im.pins || []).map(p => { const m = byK[p.m]; return m ? `<button type="button" class="an-pin ${m.t}${p.x > 66 ? ' flip' : ''}${p.y < 12 ? ' low' : ''}" style="left:${p.x}%;top:${p.y}%" data-anpin="${part}-${m.k}" title="${esc(m.n)}"><i class="dot"></i><span class="an-pl">${m.k} ${esc(m.s || m.n)}</span></button>` : ''; }).join('')}
        </div>
        <figcaption>${esc(im.cap || '')}<a class="xi-credit" href="${im.url}" target="_blank" rel="noopener">${esc(im.by)} · ${esc(im.lic)}</a></figcaption>
      </figure>`).join('');
    const row = m => `<div class="an-m ${m.t}" id="an-${part}-${m.k}">
        <span class="an-k">${m.k}</span>
        <div class="an-body"><div class="an-n">${esc(m.n)} <small>${esc(m.en)}</small><span class="xi-basis b-${m.src === 'NASM' ? '수정' : (m.src === '강의' ? '수정' : '정의')}">${esc(m.src)}</span></div>
          <div class="an-where">📍 ${br(m.where)}</div>
          <div class="an-does">${br(m.does)}</div></div>${anatThumbHTML(part, m)}
          ${anatPlanHTML(m)}</div>`;   // 계획(내 증상·손으로 찾기·①~④)은 그림 아래로 — 전체 폭을 쓴다 (2026-10-18)
    const red = a.muscles.filter(m => m.t === 'r'), green = a.muscles.filter(m => m.t === 'g'), other = a.muscles.filter(m => m.t !== 'r' && m.t !== 'g');
    return `<details class="an"><summary><span class="an-title">🫀 ${esc(a.title)}</span><small>${esc(a.sub)}</small><span class="an-more">근육 보기 ▾</span></summary>
      <div class="an-body-wrap">
        <div class="an-link">💡 ${br(a.link)}</div>
        ${figs}
        <div class="an-legend"><span class="r">🔴 풀고 늘리기 — 너무 일하는 근육 (①②)</span><span class="g">🟢 깨우기 — 쉬고 있는 근육 (③④)</span></div>
        <div class="an-tip">그림 속 영어 글자는 안 봐도 돼요.<br>색 번호와 한글 이름만 보면 돼요.<br>번호를 누르면 그 근육 설명으로 가요.</div>
        <div class="an-palp-how"><b>✋ 내 손으로 근육 찾는 법</b>① 그 근육이 붙은 두 뼈 사이에 손가락을 둔다.<br>② 그 근육만 하는 작은 동작을 약하게 한다. 내 손으로 살짝 막아도 된다.<br>③ 3~5초씩 힘주기와 풀기를 번갈아 한다. 단단해졌다 말랑해지는 곳이 그 근육이다.<br><small>근육마다 "✋ 손으로 찾기"를 누르면 자세히 나와요 · 근거: <a href="https://www.learnmuscles.com/wp-content/uploads/2016/08/Mass-Aust-Iss-67-Palpation-Article.pdf" target="_blank" rel="noopener">Muscolino 촉진</a></small></div>
        <div class="an-h r">🔴 풀고 늘리기</div>${red.map(row).join('')}
        <div class="an-h g">🟢 깨우기</div>${green.map(row).join('')}
        ${other.length ? `<div class="an-h p">⚠ 조심할 자리</div>${other.map(row).join('')}` : ''}
        ${(a.nerves || []).length ? `<div class="an-h n">⚡ 이 근육들 곁을 지나는 신경</div><div class="an-tip">신경이 실제로 눌리는지는 검사로만 알 수 있어요. 여기선 "어디를 지나서 어떤 근육과 엮이는지"만</div>${a.nerves.map(nv => `<div class="an-m n"><span class="an-k">⚡</span><div class="an-body"><div class="an-n">${esc(nv.n)} <small>${esc(nv.en)}</small><span class="xi-basis b-${nv.src === '교과' ? '수정' : (nv.src === '쌤' ? '공식' : '확인')}">${esc(nv.src)}</span></div><div class="an-where">📍 ${br(nv.where)}</div><div class="an-does">${br(nv.why)}</div></div></div>`).join('')}` : ''}
      </div></details>`;
  }

  // ----- 휴먼밸런스TV (신체지도 강의를 한 곳의 유튜브 채널) — 내 문제 부위별로 골라 둔 영상 -----
  // 제목·재생목록으로 골랐고 영상을 전부 본 건 아니에요. gear: 'bw' = 맨몸으로도 가능(제 판단), 'cable' = 필라케이블·코어케이블(그 회사 기구) 필요
  const HB = {
    channel:'https://www.youtube.com/@HUMANBALANCE_TV', name:'휴먼밸런스TV',
    groups:[
      { t:'🫱 어깨 · 거북목 · 굽은등', items:[
        { id:'harTIZ8JMNg', n:'숄더 풀다운 — 라운드숄더·굽은등 교정', len:'', gear:'cable' },
        { id:'QAKFxXsNmtU', n:'숄더 익스텐션 — 어깨 교정', gear:'cable' },
        { id:'-mfsp5J4nHc', n:'컬업 플라이 — 거북목 교정', gear:'cable' },
        { id:'zQH_78wNBIc', n:'어깨가 말린 사람들을 위한 스트레칭 4분 타바타', gear:'cable' },
        { id:'TQLowdplsvc', n:'목통증 스트레칭 대신 이거 하나', gear:'cable' },
        { id:'QjtX9qWHNjA', n:'스마트폰 세상에서 등근육을 키워야 하는 이유 (짧은 영상)', gear:'bw' },
      ] },
      { t:'🧍 등 · 허리', items:[
        { id:'k0JNOQrsE0c', n:'스탠딩 롤다운 — 굽은등 스트레칭', gear:'bw', note:'핸들 없이 팔만 내려도 돼요' },
        { id:'Zxz_wTYJbyk', n:'캣 스트레치 — 척추 유연성', gear:'bw' },
        { id:'DupZZ8XbGFY', n:'스파인 스트레치 — 척추 스트레칭', gear:'cable' },
        { id:'TJKc2HcPt-g', n:'케이블 브릿지 — 허리 통증 없이 힙업', gear:'cable' },
        { id:'PUZx2jNkxUU', n:'케이블 롤오버 — 코어·허리 강화', gear:'cable' },
      ] },
      { t:'🍑 골반 · 고관절 · 하체', items:[
        { id:'h0-wfLOVWtQ', n:'원 레그 서클 — 골반 통증 개선', gear:'cable' },
        { id:'BL1F080gzc0', n:'원 레그 플라이 — 힙업과 균형감각', gear:'cable' },
        { id:'MmYVXDIx-kU', n:'런지 플라이 — 힙 강화', gear:'cable' },
        { id:'w4pr9HllpNg', n:'2025 웰니스 다이브 골반운동 (짧은 영상)', gear:'bw' },
        { id:'hr2kAA9Q5KE', n:'무게 중심이 앞으로 치우친 직장인이 해야 할 운동 (짧은 영상)', gear:'bw' },
      ] },
      { t:'🧱 코어 · 전신 흐름', items:[
        { id:'NVQwOXqupi8', n:'매일 하면 좋은 4분 플랭크 타바타', gear:'bw', note:'강의 원칙대로 8~10초씩 끊어서' },
        { id:'HhPQyRbcuvc', n:'맨몸운동 1분 플로우', gear:'bw' },
        { id:'28DORKDR0ps', n:'바디 플로우 타바타 — 자유로운 움직임', gear:'bw' },
        { id:'7lAgzztkF6k', n:'10분 요가 플로우', gear:'bw' },
        { id:'KP3TEt6mxKM', n:'컨트롤 밸런스 — 코어 밸런스 강화', gear:'cable' },
        { id:'ss4poKZMDk4', n:'레시프로컬 패턴 — 좌우 교대 움직임의 중요성 (짧은 영상)', gear:'bw' },
      ] },
    ],
  };
  // "하루 5분" (@5min_dailymove) — 맨몸 가동성 채널. 개인 채널이라 근거는 '일반' (강의·NASM 과는 다름). sh:true = 짧은 영상
  const HB2 = {
    channel:'https://www.youtube.com/@5min_dailymove', name:'하루 5분',
    tip:'맨몸으로 하는 가동성 영상이 많은 개인 채널이에요.\n회원 전용 영상은 뺐어요. 누구나 볼 수 있는 것만이에요.\n근거는 "일반"이에요. 강의나 NASM 과는 달라요.\n제목으로 골랐고 영상을 다 본 건 아니에요.',
    groups:[
      { t:'🫱 어깨 · 목 · 굽은등', items:[
        { id:'Qz0U8GHs9_Q', n:'어깨 필수 가동성 동작 5가지', sh:true, pick:true }, { id:'wWUC_a8QnUk', n:'30년간 굳은 말린 어깨 되돌리는 동작', sh:true },
        { id:'7-boBAcgoC4', n:'내 승모근이 계속 뭉치는 이유', sh:true },
        { id:'Mey2Myd1BPw', n:'겨드랑이 옆이 뻣뻣하면 생기는 문제 (광배근)', sh:true },
        { id:'nYhI5J3khuc', n:'굽은 몸 한 번에 펴주는 동작', sh:true }, { id:'ypmLu6CrgyI', n:'캣카우 스트레칭 제대로', sh:true },
      ] },
      { t:'🍑 골반 · 고관절 · 허벅지', items:[
        { id:'-v-ZDIrVg0E', n:'하체 필수 가동성 동작 5가지', sh:true, pick:true }, { id:'8rGQzOeemRI', n:'고관절 스트레칭만 하면 안 되는 이유 — 90/90 루틴' },
        { id:'fBByTVXCONA', n:'고관절·골반 뻐근할 때 이 동작', sh:true }, { id:'KJdm8eXAKFM', n:'허벅지 앞이 짧아지고 뻣뻣해지면?', sh:true },
        { id:'hrZQxlNijRU', n:'햄스트링은 늘어난 범위를 기억하지 않습니다', note:'햄스트링은 늘리기보다 쓰기 — 앱 설명과 같은 쪽' },
        { id:'YkAA-X5Lp64', n:'하체가 뻣뻣하다면 스트레칭 말고 바닥에서 움직여보세요' },
      ] },
      { t:'🦵 무릎 · 발목 · 발', items:[ { id:'V_8s9gQGd18', n:'무릎 통증 없애는 하루 5분 루틴', sh:true },
        { id:'KPOvkM_y020', n:'무릎 바깥쪽 통증, 장경인대만 풀고 있나요?', sh:true },
      ] },
      { t:'🧱 몸통 · 아침 · 자기 전', items:[
        { id:'ZmLCJy5gFCs', n:'하루 1분, 몸통을 돌려보세요', sh:true }, { id:'dPrXUac3Njc', n:'복근 운동 딱 하나만 — 할로우 바디', sh:true },
        { id:'Z1O7kwObK8s', n:'몸통이 단단히 굳은 느낌이라면', sh:true }, { id:'0eKeKBjP8NI', n:'통나무 같은 몸 풀어주는 전신 동작', sh:true }, { id:'MkqMew92om4', n:'자기 전 5분 전신 이완 루틴', sh:true },
        { id:'9uRP2_KQR3M', n:'러닝 전 최고의 5분 운동 루틴', sh:true, note:'슬로우 조깅 전에' },
      ] },
    ],
  };
  // 레드밸런스 (레드코드·토구 등 재활 기구 수입사) 의 "라쿠다" 체형교정 밴드 영상 — 밴드가 있어야 따라 할 수 있다. 근거는 '일반'
  const HB3 = {
    channel:'https://www.youtube.com/playlist?list=PLAVxPrBb55wE5C7r4ll2eMtDc7X-iDkLZ', name:'레드밸런스 · 라쿠다 밴드',
    tip:'라쿠다는 구슬이 든 체형교정 밴드예요.\n밴드가 있어야 따라 할 수 있어요.\n목·어깨·견갑·골반·회전을 한 밴드로 다 해요.\n회사 채널 영상이라 근거는 "일반"이에요.',
    groups:[
      { t:'🪢 라쿠다 밴드 루틴', items:[
        { id:'PV08L0Dqq9k', n:'30분 체형교정 전신 루틴', gear:'band', pick:true, note:'목 → 어깨 돌리기 → 어깨 3D 가동성 → 견갑 모으기 → 골반 좌우·전후 → 골반 회전 → 몸통 회전 → 호흡' },
        { id:'Fn98cfpmzuk', n:'기본 동작편 (6분)', gear:'band', note:'ABC 기본 동작 — 처음 사면 이것부터' },
        { id:'VAvBed5lB5A', n:'굽은 등과 어깨가 한 번에! 전신 정렬 요가 (20분)', gear:'band' },
        { id:'3v_9U51I4V8', n:'50분 전신 스트레칭 & 요가 루틴', gear:'band', note:'시간 넉넉한 회복날에' },
        { id:'Vm8-ix8r09U', n:'의자 스트레칭 (시니어용이지만 사무실에서 쓸 만함)', gear:'band' },
      ] },
    ],
  };
  const GEAR_TXT = { bw:'맨몸으로도 가능', cable:'필라케이블·코어케이블 필요', band:'라쿠다 밴드 필요' };
  function hbChannelHTML(ch, showGear){
    const g = ch.groups.filter(gr => gr.items.some(it => !it.wait)).map(gr => `<div class="hb-g"><div class="hb-t">${esc(gr.t)}</div>${gr.items.filter(it => !it.wait).map(it => `
      <a class="hb-i" href="https://www.youtube.com/${it.sh ? 'shorts/' : 'watch?v='}${it.id}" target="_blank" rel="noopener">
        <img src="https://i.ytimg.com/vi/${it.id}/mqdefault.jpg" loading="lazy" alt="">
        <span class="hb-x"><span class="hb-n">${it.pick ? '⭐ ' : ''}${esc(it.n)}</span>${(showGear || it.gear) ? `<span class="hb-gear ${it.gear}">${GEAR_TXT[it.gear] || it.gear}</span>` : (it.sh ? '<span class="hb-gear bw">짧은 영상 · 맨몸</span>' : '<span class="hb-gear bw">맨몸</span>')}${it.note ? `<span class="hb-note">${esc(it.note)}</span>` : ''}</span></a>`).join('')}</div>`).join('');
    return `<details class="hb-ch"${showGear ? ' open' : ''}><summary><span class="hb-head">📺 <b>${esc(ch.name)}</b> 따라하기</span><a href="${ch.channel}" target="_blank" rel="noopener">채널 열기</a><span class="hb-more">▾</span></summary>
      <div class="hb-tip">${esc(ch.tip).replace(/\n/g, '<br>')}</div>${g}</details>`;
  }
  // 회복날 자리용: 날짜마다 다른 영상 하나 (하루 5분 채널을 차례로 돌린다. 같은 날은 늘 같은 영상)
  // key = 그날 운동 (legs·chestback·shoulderarm·pt). 그 부위 묶음에서만 고른다. 회복날(key 없음)은 전체에서
  const MOB_PICK = { legs:[1, 2], chestback:[0, 3], shoulderarm:[0], pt:[0, 1, 2, 3] };
  // 운동날 "관절 챙기기 영상" — 가슴등·어깨팔(프레스) = 손목·팔꿈치, 하체 = 무릎·발목. 뻔더에서 확인된 영상만. 날마다 다른 것
  const JOINT_PICK = { chestback:'🦴 손목 · 팔꿈치', shoulderarm:'🦴 손목 · 팔꿈치', legs:'🦵 무릎 · 발 · 발목' };
  // 매일 루틴 "오늘의 뻔더" — 뻔더 영상 중 회원 전용이 아닌 것(확인된 것, wait 아님)에서 날마다 하나
  function bdDaily(ds){
    const all = []; BD.groups.forEach(g => g.items.forEach(it => { if(!it.wait) all.push(it); }));
    if(!all.length) return null;
    const d = Math.floor((new Date(String(ds || '').slice(0, 10) + 'T00:00:00') - new Date('2026-01-04T00:00:00')) / 86400000);
    const it = all[((d * 11) % all.length + all.length) % all.length];
    return { ...it, url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id };
  }
  function jointVideo(ds, key){
    const g = BD.groups.find(x => x.t === JOINT_PICK[key]); if(!g) return null;
    const all = g.items.filter(it => !it.wait); if(!all.length) return null;
    const d = Math.floor((new Date(String(ds || '').slice(0, 10) + 'T00:00:00') - new Date('2026-01-04T00:00:00')) / 86400000);
    const it = all[((d * 3) % all.length + all.length) % all.length];
    return { ...it, url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id };
  }
  // ----- 회복날 ③ 근육 키우기 영상 — 부위별 묶음 (휴먼밸런스·하루 5분·뻔더, 맨몸으로 되는 것만) -----
  // id 만 적고 이름·채널은 vidLookup 에서 찾는다. 확인 전(wait) 영상은 자동으로 빠지고, 확인되면 저절로 들어온다
  const REHAB_VID = {
    // 어깨팔 날 🧩 어깨 가동성 영상 (하루 5분 · 뻔더 · 휴먼밸런스, 맨몸)
    shoulderMob: ['Qz0U8GHs9_Q','wWUC_a8QnUk','Mey2Myd1BPw','nYhI5J3khuc','ypmLu6CrgyI','7-boBAcgoC4','oQ9z0LXsFbI','8cN6ln6VxZ0','uYdWoooEqpc','48gD-RW-jjg','mGjTgOyZDh0','tpkXdXxSRC0','rKsSbDY6-Mc','QjtX9qWHNjA'],
    knee:     ['R-y8PiIrL10','xayphsXCvmw','CQ-y9pVp__Q','yetSXpXQolA','DAwIKTGlSSE','V_8s9gQGd18','KPOvkM_y020','KJdm8eXAKFM','-v-ZDIrVg0E'],
    hip:      ['jm5HhxdJXiA'],   // 골반 좌우 맞추기 — 고관절 비대칭 (상필님 2026-10-18)
    foot:     ['9Olfw9_EATU','5UGwiN_yabI','BS0Zxr6C0xk','m91Pdesc0W8','avOcecxNWTg','f8kekYD0M2I','xLd9UK2J3b8','cPQXOtISCJk','rC_TK21aFdw','10ZNiEjRee8','fBByTVXCONA','8rGQzOeemRI','hrZQxlNijRU','w4pr9HllpNg'],
    shoulder: ['Qz0U8GHs9_Q','wWUC_a8QnUk','nYhI5J3khuc','Mey2Myd1BPw','7-boBAcgoC4','QjtX9qWHNjA','k0JNOQrsE0c','JsF8lersqxk','EqCgw8BPbTM','qQwUoq8ya3M','48gD-RW-jjg','lCSf9FuBm20','DU3pVnoEcd8','8cN6ln6VxZ0'],
    back:     ['LSJuhzT-00Y','MqtsvXYEZ_w','yx0o3fzVFvU','U3Uo3G6IApw','dJaBp1AxCs8','4ctg0QU4XaY','XcIFjvUIVxo','HbMsD1deA6k','dPrXUac3Njc','Z1O7kwObK8s','NVQwOXqupi8','Zxz_wTYJbyk','ypmLu6CrgyI'],
  };
  function rehabVideo(ds, key){
    const m = vidLookup();
    const pool = (REHAB_VID[key] || []).map(id => m.get(id)).filter(v => v && (!v.gear || v.gear === 'bw'));
    if(!pool.length) return null;
    const d = Math.floor((new Date(String(ds || '').slice(0, 10) + 'T00:00:00') - new Date('2026-01-04T00:00:00')) / 86400000);
    const it = pool[((d * 5) % pool.length + pool.length) % pool.length];
    return { ...it, chName: CH_TAG[it.ch] || '', url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id };
  }
  // 영상 종목 하나가 고를 수 있는 영상 전부 (↻ 바꾸기용) — exId: rv-무릎 등 · jointvid · mobvid, dayKey: 그날 운동
  function vidPool(exId, dayKey){
    const U = it => ({ ...it, chName: it.ch ? (CH_TAG[it.ch] || '') : '', url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id });
    if(/^rv-/.test(exId)){ const m = vidLookup(); return (REHAB_VID[exId.slice(3)] || []).map(id => m.get(id)).filter(v => v && (!v.gear || v.gear === 'bw')).map(U); }
    if(exId === 'jointvid'){ const g = BD.groups.find(x => x.t === JOINT_PICK[dayKey]); return g ? g.items.filter(it => !it.wait).map(it => U({ ...it, ch:'BD' })) : []; }
    if(exId === 'mobvid'){ const gi = MOB_PICK[dayKey]; const all = []; HB2.groups.forEach((g, i) => { if(!gi || gi.includes(i)) g.items.forEach(it => { if(!it.wait) all.push(U({ ...it, ch:'HB2' })); }); }); return all; }
    return [];
  }
  // ----- 종목 → 3D 근육 (2026-10-19 상필님: "각 종목 운동 부위를 3D 모델로 · 근육 움직임") -----
  // 주로 쓰는 근육(주동근)만 — 운동 교과서에서 흔히 쓰는 분류. 3D 모델에는 오른쪽 다리·어깨 둘레 근육만 있어서
  // 팔(이두·삼두)·복근·허리 세움근은 못 보여 준다 (그런 종목은 단추가 안 나온다)
  // v: 그 근육이 잘 보이는 쪽 (front 앞 · back 뒤 · side 오른쪽 옆)
  const M3D_G = {
    Q:  { n:'대퇴사두근', v:'front', m:['rectusfemoris.r','vastuslateralismuscle.r','vastusmedialismuscle.r','vastusintermediusmuscle.r'] },
    RF: { n:'대퇴직근', v:'front', m:['rectusfemoris.r'] },
    G:  { n:'대둔근', v:'back', m:['gluteusmaximusmuscle.r'] },
    GM: { n:'중둔근', v:'side', m:['gluteusmediusmuscle.r','gluteusminimusmuscle.r'] },
    H:  { n:'햄스트링', v:'back', m:['semitendinosusmuscle.r','semimembranosusmuscle.r','longheadofbicepsfemoris.r','shortheadofbicepsfemoris.r'] },
    AD: { n:'내전근', v:'front', m:['adductorlongus.r','adductormagnus.r','adductorbrevis.r','gracilismuscle.r','pectineusmuscle.r'] },
    CA: { n:'종아리', v:'back', m:['medialheadofgastrocnemius.r','lateralheadofgastrocnemius.r','soleusmuscle.r'] },
    TA: { n:'정강이 앞', v:'front', m:['tibialisanteriormuscle.r'] },
    IP: { n:'장요근', v:'front', m:['psoasmajor.r','psoasminor.r','iliacusmuscle.r'] },
    PI: { n:'이상근', v:'back', m:['piriformismuscle.r'] },
    TFL:{ n:'TFL', v:'side', m:['tensorfasciaelatae.r'] },
    PEC:{ n:'가슴', v:'front', m:['clavicularheadofpectoralismajormuscle.r','sternocostalheadofpectoralismajormuscle.r','abdominalheadofpectoralismajormuscle.r'] },
    DF: { n:'앞 어깨', v:'front', m:['clavicularpartofdeltoidmuscle.r'] },
    DS: { n:'옆 어깨', v:'side', m:['acromialpartofdeltoidmuscle.r'] },
    DR: { n:'뒤 어깨', v:'back', m:['spinalpartofdeltoidmuscle.r'] },
    LAT:{ n:'광배근', v:'back', m:['latissimusdorsi.r','teresmajormuscle.r'] },
    TU: { n:'위 승모근', v:'back', m:['descendingpartoftrapeziusmuscle.r'] },
    TM: { n:'중·아래 승모근', v:'back', m:['transversepartoftrapeziusmuscle.r','ascendingpartoftrapeziusmuscle.r'] },
    RH: { n:'능형근', v:'back', m:['rhomboidmajormuscle.r','rhomboidminormuscle.r'] },
    SA: { n:'전거근', v:'side', m:['serratusanteriormuscle.r'] },
    RC: { n:'회전근개', v:'back', m:['infraspinatusmuscle.r','supraspinatusmuscle.r','teresminormuscle.r','subscapularismuscle.r'] },
    LS: { n:'어깨올림근', v:'back', m:['levatorscapulae.r'] },
    PM: { n:'작은가슴근', v:'front', m:['pectoralisminormuscle.r'] },
    FT: { n:'발바닥', v:'back', m:['plantaraponeurosis.r','abductorhallucis.r','flexordigitorumbrevis.r'] },
    // 팔 (models/arm-right.glb — 팔 종목을 열 때만 받는다)
    BI: { n:'이두근', v:'front', arm:true, m:['longheadofbicepsbrachii.r','shortheadofbicepsbrachii.r'] },
    BR: { n:'상완근', v:'front', arm:true, m:['brachialismuscle.r'] },
    BRR:{ n:'상완요골근', v:'side', arm:true, m:['brachioradialismuscle.r'] },
    TRI:{ n:'삼두근', v:'back', arm:true, m:['longheadoftricepsbrachii.r','lateralheadoftricepsbrachii.r','medialheadoftricepsbrachii.r'] },
    FF: { n:'손목 굽힘근', v:'front', arm:true, m:['flexorcarpiradialis.r','palmarislongusmuscle.r','humeralheadofflexorcarpiulnaris.r','ulnarheadofflexorcarpiulnaris.r','flexordigitorumsuperficialishumeroulnarhead.r','flexordigitorumsuperficialisradialhead.r'] },
  };
  // 위에서부터 처음 맞는 줄. s = 스트레칭(늘어나는 근육) · r = 풀기(공·폼롤러로 누르는 곳 · 움직임 없음)
  const M3D_RULES = [
    // 복근·허리 세움근·목 깊은 근육·호흡 — 3D 모델에 없음
    [/데드버그|코브라|슈퍼맨|플랭크|크런치|바디컨트롤|턱\s*당기기|악어호흡|디스크|흉추|그라운드|RMT\s*로프|책\s*위|내\s*몸풀기/, null],
    // 유산소 — 주로 쓰는 다리·등 근육
    [/수트케이스|캐리/, ['GM','TU','FF']],
    [/로잉/, ['LAT','Q','H','BI']],
    [/수영/, ['LAT','PEC','DF']],
    [/자전거|사이클/, ['Q','G','CA']],
    [/스텝밀|천국의\s*계단|등산/, ['Q','G','CA']],
    [/줄넘기|점핑잭/, ['CA','Q']],
    [/슬로우|조깅|러닝|일립티컬|걷기/, ['Q','H','G','CA']],
    [/싯업|레그\s*레이즈/, ['IP','RF']],                 // 복근은 모델에 없음 — 다리 들어 올리는 고관절 굽힘근
    [/마운틴/, ['IP','Q','DF']],
    [/버피/, ['Q','G','PEC','DF']],
    [/WGS/, ['IP','H','AD'], 's'],
    [/아기\s*자세|차일드/, ['LAT','G'], 's'],
    [/폼롤러\s*광배근/, ['LAT'], 'r'],
    [/마사지볼.*종아리/, ['CA','TA'], 'r'],
    [/마사지볼.*(골반|허벅지\s*앞)/, ['TFL','Q','G'], 'r'],
    [/마사지볼.*쇄골/, ['PM','RC'], 'r'],
    [/발바닥\s*마사지/, ['FT'], 'r'],
    [/발가락\s*수건/, ['FT']],
    [/장요근\s*스트레칭/, ['IP','RF'], 's'],
    [/허벅지\s*앞\s*늘리기/, ['Q'], 's'],
    [/내전근\s*스트레칭/, ['AD'], 's'],
    [/햄스트링\s*스트레칭/, ['H'], 's'],
    [/종아리\s*스트레칭/, ['CA'], 's'],
    [/이상근\s*스트레칭|4자/, ['PI','G'], 's'],
    [/가슴\s*스트레칭/, ['PEC','DF'], 's'],
    [/광배근\s*스트레칭/, ['LAT'], 's'],
    [/승모근\s*스트레칭|목\s*옆\s*늘리기/, ['TU','LS'], 's'],
    [/해머\s*컬/, ['BR','BRR','BI']],
    [/(바벨|덤벨|케이블|이두|프리처|컨센트레이션|EZ)\s*컬/, ['BI','BR']],
    [/트라이셉스|오버헤드\s*익스텐션|푸쉬다운|푸시다운|킥백/, ['TRI']],
    [/레그\s*익스텐션/, ['Q']],
    [/레그\s*컬|레그컬|노르딕|노드릭/, ['H']],
    [/카프/, ['CA']],
    [/어브덕션|크랩|클램|사이드\s*스텝|밴드\s*워크/, ['GM','TFL']],
    [/어덕션|내전근|이너타이/, ['AD']],
    [/밸런스\s*리치/, ['GM','G']],
    [/힙\s*쓰러스트|브릿지|글루트/, ['G','H']],
    [/데드|루마니안|스티프|굿모닝|힌지|스윙/, ['H','G']],
    [/리어|후면|페이스\s*풀|리버스\s*플라이/, ['DR','TM','RH']],
    [/^T\s*레이즈/, ['TM','RH','DR']],
    [/^Y\s*레이즈|승모근\s*아래/, ['TM','DR']],
    [/^W\s*레이즈/, ['RC','TM']],
    [/월\s*슬라이드/, ['SA','TM']],
    [/스쿼트|레그\s*프레스|런지|스플릿|스텝\s*업|핵/, ['Q','G','AD']],
    [/딥스/, ['PEC','TRI','DF']],
    [/벤치|체스트\s*프레스|푸쉬\s*업|푸시\s*업|인클라인|덤벨\s*프레스/, ['PEC','DF','TRI']],
    [/펙덱|플라이(?!.*(리어|후면|리버스))|크로스\s*오버/, ['PEC','DF']],
    [/레터럴|사이드\s*레이즈|업라이트/, ['DS','TU']],
    [/숄더\s*프레스|오버헤드|밀리터리|시소/, ['DF','DS','TRI']],
    [/프론트\s*레이즈/, ['DF']],
    [/풀\s*업|친\s*업|풀다운|랫|턱걸이/, ['LAT','RH','TM','BI']],
    [/로우/, ['LAT','RH','TM','DR','BI']],
    [/슈러그/, ['TU','LS']],
    [/암바/, ['RC','SA']],
    [/겟업/, ['DS','RC','G']],
  ];
  function m3dOf(name){
    const n = String(name || '');
    for(const [re, keys, mode] of M3D_RULES){ if(re.test(n)) return keys ? { mode: mode === 's' ? 'stretch' : (mode === 'r' ? 'release' : 'work'), groups: keys.map(k => ({ key:k, ...M3D_G[k] })) } : null; }
    return null;
  }
  // ----- 3D 모델에 없는 근육(복근·허리 세움근·목 깊은 근육) = 2D 해부 그림에 점과 이름 (2026-10-19 상필님 "2D 그림으로") -----
  // 그림: img/anat (CREDITS.md) — 점 자리는 그림 속 이름표가 가리키는 곳을 % 로 (가로 x · 세로 y), crop = 보여 줄 세로 범위 %
  const M2D_IMG = {
    abd:  { f:'img/anat/abdomen.jpg', w:852, h:1100, by:'OpenStax 해부생리학 · CC BY 4.0' },
    back: { f:'img/anat/neck-back.jpg', w:947, h:1100, by:'OpenStax 해부생리학 · CC BY 4.0' },
    lc:   { f:'img/anat/longus-colli.jpg', w:443, h:600, by:"Gray's Anatomy · 퍼블릭 도메인" },
  };
  const M2D_G = {
    RA:  { n:'복직근', img:'abd', x:35, y:27, crop:[0, 44] },
    EO:  { n:'배 바깥 빗근', img:'abd', x:48, y:17, crop:[0, 44], l:true },   // 이름을 왼쪽에 (복횡근 이름과 겹치지 않게)
    TA:  { n:'복횡근 (깊은 코어)', img:'abd', x:85, y:20, crop:[0, 44] },
    QL:  { n:'허리네모근', img:'abd', x:35, y:57, crop:[44, 100] },
    ES:  { n:'척추세움근', img:'back', x:42, y:64, crop:[33, 93] },
    DNF: { n:'목 깊은 굽힘근', img:'lc', x:57, y:55, crop:[0, 100] },
  };
  const M2D_RULES = [
    [/플랭크/, ['RA','TA','EO']],
    [/크런치/, ['RA']],
    [/데드버그|바디컨트롤/, ['TA','RA']],
    [/슈퍼맨/, ['ES']],
    [/코브라/, ['RA'], 's'],
    [/디스크|젖히기/, ['ES']],
    [/흉추|등\s*펴기/, ['ES'], 'r'],
    [/턱\s*당기기/, ['DNF']],
  ];
  function m2dOf(name){
    const n = String(name || '');
    for(const [re, keys, mode] of M2D_RULES){ if(re.test(n)) return { two:true, mode: mode === 's' ? 'stretch' : (mode === 'r' ? 'release' : 'work'), groups: keys.map(k => ({ key:k, ...M2D_G[k] })) }; }
    return null;
  }
  // 그림 한 장마다 잘라서 보여 주고, 근육 자리에 점 + 바로 옆에 이름
  function m2dHTML(spec){
    const COL = ['#E8A33D', '#4FA8C9', '#5CC08A', '#E36F8E'];
    const byImg = {};
    spec.groups.forEach((g, i) => { (byImg[g.img] = byImg[g.img] || []).push({ ...g, col: COL[i % 4] }); });
    return Object.keys(byImg).map(k => {
      const im = M2D_IMG[k], L = byImg[k];
      const c0 = Math.min(...L.map(g => g.crop[0])), c1 = Math.max(...L.map(g => g.crop[1])), span = c1 - c0;
      const pins = L.map(g => { const top = (g.y - c0) / span * 100, right = g.l != null ? g.l : g.x > 60; return `<i class="m2d-pin" style="left:${g.x}%;top:${top.toFixed(1)}%;--c:${g.col}"><b class="${right ? 'l' : ''}">${esc(g.n)}</b></i>`; }).join('');
      return `<div class="m2d-fig" style="aspect-ratio:${im.w} / ${(im.h * span / 100).toFixed(0)}"><img src="${im.f}" alt="" style="top:${(-c0 / span * 100).toFixed(1)}%">${pins}</div><div class="m2d-by">그림: ${esc(im.by)}</div>`;
    }).join('');
  }
  function m3dBtnHTML(name){ if(!m3dOf(name) && m2dOf(name)) return `<button class="m3d-btn" data-m3d="${esc(name)}" title="그림에서 이 운동이 쓰는 근육 보기">🦴 근육 그림</button>`; return m3dOf(name) ? `<button class="m3d-btn" data-m3d="${esc(name)}" title="3D 모델에서 이 운동이 쓰는 근육 보기">🦴 3D 근육</button>` : ''; }
  function mobVideo(ds, key){
    const gi = MOB_PICK[key];
    const all = []; HB2.groups.forEach((g, i) => { if(!gi || gi.includes(i)) g.items.forEach(it => all.push(it)); });
    const d = Math.floor((new Date(String(ds || '').slice(0, 10) + 'T00:00:00') - new Date('2026-01-04T00:00:00')) / 86400000);
    const it = all[((d * 7) % all.length + all.length) % all.length];   // 7칸씩 건너뛰어 묶음이 섞이게
    return { ...it, url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id };
  }
  // 뻔더 (@fundamental_kr) — 맨몸 움직임 개인 채널. 쇼츠(1분 안팎)만. 근거는 '일반'
  // wait:true = 회원 전용인지 아직 확인 전 → 화면에 안 나온다. _temp/영상확인/batch.js 가 며칠에 나눠 확인해서 wait 를 지우거나(무료) 줄을 지운다(회원 전용)
  const BD = {
    channel:'https://www.youtube.com/@fundamental_kr/playlists', name:'뻔더',
    tip:'맨몸 움직임을 1분 안팎으로 짧게 알려 주는 개인 채널이에요.\n회원 전용이 아닌지 하나씩 확인한 것만 보여요.\n나머지는 며칠에 나눠 확인하고 있어요.\n근거는 "일반"이에요. 강의나 NASM 과는 달라요.',
    groups:[
      { t:'🫱 굽은 등 · 말린 어깨', items:[
        { id:'lCSf9FuBm20', n:'굽은 등, 어깨 이렇게 펴보세요', sh:true, wait:true },
        { id:'hCC3jNlJv24', n:'굽은 등의 원인 — 이곳이 움직여야 해요', sh:true, wait:true },
        { id:'s5P9UN_ujkM', n:'굽은 등과 거북목 데일리 스트레칭', sh:true, wait:true },
        { id:'DU3pVnoEcd8', n:'굽은등·라운드숄더 1분 따라 하기', sh:true, wait:true },
        { id:'EqCgw8BPbTM', n:'말린 어깨 펴는 운동 10가지', sh:true, wait:true },
        { id:'qQwUoq8ya3M', n:'말린 어깨·굽은 등 운동 TOP 1', sh:true, wait:true },
        { id:'er7l9X-eHdY', n:'말린 어깨를 위한 팔돌리기 팁 3가지', sh:true, wait:true },
        { id:'LvpDob9qYIY', n:'나쁜 굽은 등, 좋은 굽은 등 구별법', sh:true, wait:true },
        { id:'JsF8lersqxk', n:'상체 운동 전 필수 동작 (흉추 회전)', sh:true },
        { id:'a8eNvDkLDZw', n:'턱걸이 전 꼭 해야 하는 준비운동', sh:true, wait:true },
      ] },
      { t:'🙆 어깨 가동성', items:[
        { id:'oQ9z0LXsFbI', n:'어깨 운동 전 이 동작부터', sh:true, wait:true },
        { id:'8cN6ln6VxZ0', n:'어깨는 돌려야 합니다', sh:true, wait:true },
        { id:'uYdWoooEqpc', n:'팔을 180도로 들 수 없다면', sh:true, wait:true },
        { id:'48gD-RW-jjg', n:'병든 어깨를 치료해 줄 5가지 동작', sh:true, wait:true },
        { id:'mGjTgOyZDh0', n:'팔이 몸 뒤로 잘 올라가지 않는다면', sh:true, wait:true },
        { id:'tpkXdXxSRC0', n:'어깨가 뻣뻣하고 자주 아프다면', sh:true, wait:true },
        { id:'rKsSbDY6-Mc', n:'혼자 등을 못 긁는다면', sh:true, wait:true },
      ] },
      { t:'🐢 목 · 거북목', items:[
        { id:'sMcn4jZMg9M', n:'목과 승모근이 뻐근하다면', sh:true, wait:true },
        { id:'7fUwH-QySlA', n:'뻐근한 목, 스트레칭만 하지 마세요', sh:true, wait:true },
        { id:'jc7kfGBZZFI', n:'자라목 바로 집어넣지 마세요', sh:true, wait:true },
        { id:'_55XoEBleRc', n:'목 통증, 스트레칭만 하셨나요?', sh:true, wait:true },
        { id:'Ymkkv72R8FM', n:'평소 목이 자주 불편하다면', sh:true, wait:true },
        { id:'cp2DkTN7nEs', n:'휴대폰 볼 때 최악의 자세', sh:true, wait:true },
      ] },
      { t:'🍑 고관절 · 골반 · 허리', items:[
        { id:'xLd9UK2J3b8', n:'고관절이 뻣뻣하다면', sh:true },
        { id:'cPQXOtISCJk', n:'유연하고 강한 고관절을 위한 한 가지 동작', sh:true },
        { id:'hhqPzF12cAI', n:'고관절 기름칠하기', sh:true },
        { id:'rC_TK21aFdw', n:'고관절 내·외회전 스트레칭 3가지', sh:true },
        { id:'BwUgrlnzhpg', n:'스쿼트 전 고관절 필수 웜업', sh:true },
        { id:'XparnX9xSRc', n:'힙힌지 단계별 접근법 (데드리프트)', sh:true },
        { id:'HbMsD1deA6k', n:'골반 움직임 느끼기 (앞·뒤 기울기)', sh:true },
        { id:'10ZNiEjRee8', n:'골반 한쪽이 자꾸 떨어진다면', sh:true },
        { id:'LSJuhzT-00Y', n:'뻣뻣한 허리를 움직여 보세요', sh:true },
        { id:'MqtsvXYEZ_w', n:'허리가 아픈데 오래 앉아있다면', sh:true },
        { id:'yx0o3fzVFvU', n:'앉아있다 일어날 때 허리가 아프다면', sh:true },
        { id:'U3Uo3G6IApw', n:'코어 운동 후 허리가 더 아프다면', sh:true },
        { id:'dJaBp1AxCs8', n:'복근운동할 때 허리만 아프다면', sh:true },
        { id:'4ctg0QU4XaY', n:'코어에 힘주라는 건 어떤 뜻일까', sh:true },
        { id:'XcIFjvUIVxo', n:'허리 아프지 않게 햄스트링 유연성 늘리기', sh:true },
      ] },
      { t:'🦴 손목 · 팔꿈치', items:[
        { id:'IcPZMH07BPM', n:'푸쉬업할 때 손목이 아프다면', sh:true },
        { id:'TIeIZdlPOvM', n:'운동할 때 손목이 아프다면', sh:true },
        { id:'gl-oi3SZfWo', n:'바닥에 손을 짚을 때 손목이 아프다면', sh:true },
        { id:'hU-dsspvM5U', n:'티타늄 손목 만들기', sh:true },
        { id:'hDAhbkzIT8Q', n:'강철 손목 만들기', sh:true },
        { id:'il_BNtH-rI8', n:'오래 일해서 손목이 아프다면 (일상 손목 운동 3가지)', sh:true },
        { id:'tQeCixxZm1A', n:'운동할 때 팔꿈치가 아프다면', sh:true },
        { id:'eawRM8FSxCY', n:'팔꿈치에서 뼈 소리가 난다면', sh:true },
      ] },
      { t:'🦵 무릎 · 발 · 발목', items:[
        { id:'R-y8PiIrL10', n:'계단 내려갈 때 무릎이 아프다면', sh:true },
        { id:'xayphsXCvmw', n:'스쿼트할 때 무릎이 아프다면', sh:true },
        { id:'CQ-y9pVp__Q', n:'계단을 이용한 무릎 강화 동작 2가지', sh:true },
        { id:'yetSXpXQolA', n:'무릎 건강을 지키는 4가지 운동', sh:true },
        { id:'DAwIKTGlSSE', n:'티타늄 무릎 만드는 법', sh:true },
        { id:'m91Pdesc0W8', n:'발의 아치가 무너졌다면', sh:true, note:'왼발 아치', wait:true },
        { id:'f8kekYD0M2I', n:'발 아치가 무너지면 생기는 일', sh:true, wait:true },
        { id:'avOcecxNWTg', n:'발가락 운동 6가지', sh:true, wait:true },
        { id:'9Olfw9_EATU', n:'발·발목 강화 운동 10가지', sh:true },
        { id:'5UGwiN_yabI', n:'발목이 계속 삔다면', sh:true },
        { id:'kQGutIiivw0', n:'러닝 후 종아리·발목이 아프다면', sh:true },
        { id:'BS0Zxr6C0xk', n:'접질린 발목 재활 4단계', sh:true },
        { id:'SY5RvX5aeXs', n:'러닝 후 발·발목이 아프다면', sh:true },
        { id:'XEFomDG-gGc', n:'러닝 후 무릎·발목이 아프다면', sh:true },
        { id:'rbvIttDiSvY', n:'걷거나 달린 후 관절이 아프다면', sh:true },
      ] },
      { t:'🌀 전신 · 웜업', items:[
        { id:'0YGv8gP8yjc', n:'관절 움직이기 8가지', sh:true, wait:true },
        { id:'-VnE2Mz_xvY', n:'하루 6시간 이상 앉아 있다면', sh:true, wait:true },
        { id:'PD5mohzZAio', n:'하루 6시간 이상 앉아있다면 (어깨)', sh:true, wait:true },
        { id:'LZKlQ9o3lMw', n:'골반·흉추·목을 한 번에 푸는 스트레칭', sh:true, wait:true },
        { id:'FTKSSdtT8FY', n:'아침 스트레칭 루틴', sh:true, wait:true },
        { id:'Gaw3d6-8ICg', n:'운동 전 필수 웜업 5가지', sh:true, wait:true },
        { id:'-HkyGYT18kc', n:'운동 전 이 동작 1분만', sh:true, wait:true },
      ] },
    ],
  };
  // ----- 종목 탭: 묶음마다 따라 할 영상 (휴먼밸런스·하루 5분·뻔더·라쿠다를 부위별로 섞음). id 만 적고 이름·채널은 위 목록에서 찾는다
  // '#' 로 시작하면 작은 제목. 2026-10-18 상필님: 재활 영상을 가슴·등 같은 부위로 종목에 나눠서
  const TREE_VIDS = {
    arm:['#팔꿈치','tQeCixxZm1A','eawRM8FSxCY','#손목','TIeIZdlPOvM','hU-dsspvM5U','hDAhbkzIT8Q','il_BNtH-rI8'],
    chest:['#벤치·푸쉬업 때 손목','IcPZMH07BPM','gl-oi3SZfWo','#가슴 앞이 짧아져 어깨가 말릴 때','EqCgw8BPbTM','wWUC_a8QnUk','zQH_78wNBIc','DU3pVnoEcd8','qQwUoq8ya3M','er7l9X-eHdY'],
    back:['#굽은 등 · 흉추','lCSf9FuBm20','hCC3jNlJv24','s5P9UN_ujkM','LvpDob9qYIY','JsF8lersqxk','nYhI5J3khuc','k0JNOQrsE0c','Zxz_wTYJbyk','ypmLu6CrgyI','DupZZ8XbGFY','harTIZ8JMNg',
          '#당기기 · 광배근','Mey2Myd1BPw','a8eNvDkLDZw','QjtX9qWHNjA'],
    shoulder:['#어깨 가동성','Qz0U8GHs9_Q','8cN6ln6VxZ0','uYdWoooEqpc','48gD-RW-jjg','mGjTgOyZDh0','tpkXdXxSRC0','rKsSbDY6-Mc','oQ9z0LXsFbI','QAKFxXsNmtU',
              '#목 · 거북목 · 승모근','sMcn4jZMg9M','7fUwH-QySlA','jc7kfGBZZFI','_55XoEBleRc','Ymkkv72R8FM','cp2DkTN7nEs','7-boBAcgoC4','-mfsp5J4nHc','TQLowdplsvc'],
    leg:['#무릎','R-y8PiIrL10','xayphsXCvmw','CQ-y9pVp__Q','yetSXpXQolA','DAwIKTGlSSE','V_8s9gQGd18','KPOvkM_y020','KJdm8eXAKFM',
         '#발 · 발목 (왼발 아치)','m91Pdesc0W8','f8kekYD0M2I','avOcecxNWTg','9Olfw9_EATU','5UGwiN_yabI','BS0Zxr6C0xk','SY5RvX5aeXs','XEFomDG-gGc','rbvIttDiSvY'],
    hip:['#고관절','-v-ZDIrVg0E','xLd9UK2J3b8','cPQXOtISCJk','hhqPzF12cAI','rC_TK21aFdw','8rGQzOeemRI','fBByTVXCONA','BwUgrlnzhpg','XparnX9xSRc',
         '#골반 · 좌우 균형','HbMsD1deA6k','10ZNiEjRee8','h0-wfLOVWtQ','w4pr9HllpNg','hr2kAA9Q5KE',
         '#뒷벅지','hrZQxlNijRU','XcIFjvUIVxo','YkAA-X5Lp64'],
    core:['#허리','LSJuhzT-00Y','MqtsvXYEZ_w','yx0o3fzVFvU','U3Uo3G6IApw','dJaBp1AxCs8',
          '#코어','4ctg0QU4XaY','dPrXUac3Njc','NVQwOXqupi8','TJKc2HcPt-g','PUZx2jNkxUU','KP3TEt6mxKM'],
    move:['#전신 · 하루 루틴','0YGv8gP8yjc','-VnE2Mz_xvY','PD5mohzZAio','FTKSSdtT8FY','MkqMew92om4','ZmLCJy5gFCs','Z1O7kwObK8s','0eKeKBjP8NI','LZKlQ9o3lMw',
          '#운동 전 웜업','Gaw3d6-8ICg','-HkyGYT18kc',
          '#흐르는 움직임','HhPQyRbcuvc','28DORKDR0ps','7lAgzztkF6k','ss4poKZMDk4',
          '#라쿠다 밴드','PV08L0Dqq9k','Fn98cfpmzuk','VAvBed5lB5A'],
    cardio:['9uRP2_KQR3M','kQGutIiivw0'],
  };
  // 메디쌤 — 상필님이 직접 고른 영상만 (2026-10-18 · 무료 쇼츠)
  const MD = { channel:'https://www.youtube.com/@%EB%A9%94%EB%94%94%EC%8C%A4', name:'메디쌤', groups:[
    { t:'🦵 골반 · 다리 길이', items:[ { id:'jm5HhxdJXiA', n:'다리길이 맞춰지는 셀프 골반 교정법', sh:true } ] },
  ] };
  const CH_TAG = { HB:'휴먼밸런스', HB2:'하루 5분', HB3:'라쿠다', BD:'뻔더', MD:'메디쌤' };
  let vidMap = null;
  function vidLookup(){
    if(vidMap) return vidMap;
    vidMap = new Map();
    [['HB', HB], ['HB2', HB2], ['HB3', HB3], ['BD', BD], ['MD', MD]].forEach(([k, ch]) => ch.groups.forEach(g => g.items.forEach(it => { if(!it.wait && !vidMap.has(it.id)) vidMap.set(it.id, { ...it, ch:k }); })));
    return vidMap;
  }
  // 종목 묶음 하나의 영상 목록 (없으면 '')
  function treeVidsHTML(k){
    const L = TREE_VIDS[k]; if(!L) return '';
    const m = vidLookup(); const rows = []; let n = 0;
    L.forEach(x => {
      if(x[0] === '#'){ rows.push(`<div class="tv-sub">${esc(x.slice(1))}</div>`); return; }
      const v = m.get(x); if(!v) return; n++;
      const gear = v.gear && v.gear !== 'bw' ? GEAR_TXT[v.gear] : '맨몸';
      rows.push(`<a class="tv-i" href="https://www.youtube.com/${v.sh ? 'shorts/' : 'watch?v='}${v.id}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" loading="lazy" alt=""><span class="tv-x"><span class="tv-n">${esc(v.n)}</span><span class="tv-m"><b class="tv-ch ${v.ch}">${CH_TAG[v.ch]}</b> · ${esc(gear)}${v.sh ? ' · 1분' : ''}</span></span></a>`);
    });
    if(!n) return '';
    // 영상이 없는 작은 제목은 지운다
    const body = rows.filter((r, i) => !r.startsWith('<div class="tv-sub"') || (rows[i + 1] && rows[i + 1].startsWith('<a'))).join('');
    return `<details class="tr-leaf tr-vids"><summary><span class="tr-ln">📺 따라 할 영상 ${n}개</span><span class="tr-tag">재활·가동성</span></summary><div class="tv">${body}</div></details>`;
  }
  function hbHTML(){
    HB.tip = '신체지도 강의를 한 곳의 채널이에요.\n내 문제 부위에 맞는 영상만 골랐어요.\n제목으로 고른 거라 영상을 다 본 건 아니에요.\n대부분 그 회사 기구를 써요. 맨몸으로 되는 건 표시했어요.';
    return `<div class="hb">${hbChannelHTML(HB, true)}${hbChannelHTML(HB2, false)}${hbChannelHTML(HB3, false)}${hbChannelHTML(BD, false)}</div>`;
  }

  // ----- 스트레칭 미션 (30분마다 하나): 문제 부위별 1분 안 · 사무실에서 가능한 것 위주 -----
  // n = 앱 종목 이름 (그림·영상 찾기용). 부위를 먼저 고르고 그 안에서 하나 → 부위가 골고루 나온다
  // 오래 앉기·스마트폰 볼 때 굳는 근육을 "푸는" 스트레칭만 (2026-10-18 상필님). n = 사진용 앱 종목, label = 보여 줄 이름
  // 스트레칭 양: ACSM 지침 — 한 번 10~30초 · 2~4번 · 한 동작 모두 60초 → 좌우 30초 × 2 (2026-10-19 상필님)
  // 상필님 2026-10-18: 오래 앉거나 서 있을 때 아픈 곳 = 허리 · 무릎 · 어깨 · 손목 → p 를 이 네 부위로 묶는다 (부위가 고르게 나온다)
  // pool = 영상 하나 미션: 뽑힐 때 그 묶음의 확인된 무료 영상(맨몸) 중 하나를 붙인다
  const MISSIONS = [
    // ── 허리 ── (앉으면 굽는 등·허리, 짧아지는 고관절 앞·엉덩이)
    { p:'허리', n:'백년척추 디스크 예방 (허리·목 뒤로 젖히기)', label:'일어나서 뒤로 젖히기', set:'10회', why:'앉아서 굽은 등·허리 되돌리기' },
    { p:'허리', n:'반무릎 장요근 스트레칭', label:'반무릎 장요근 스트레칭', set:'좌우 30초 × 2 (골반 말고 엉덩이 조이기)', why:'앉으면 짧아지는 고관절 앞 — 허리를 앞으로 당긴다' },
    { p:'허리', n:'이상근 스트레칭 (4자)', label:'앉아서 4자 다리 숙이기', set:'좌우 30초 × 2', why:'오래 앉으면 저린 엉덩이 깊은 곳' },
    { p:'허리', n:'아기 자세 (차일드 포즈)', label:'아기 자세', set:'30초 × 2', why:'허리 세움근 풀기 (바닥 있을 때)' },
    // 상필님 2026-10-18 "미션에 자주 나오게" — often: 최근 3개 안에 없으면 30% 로 먼저 뽑힌다
    { p:'허리', n:'서 있을 때 허리 영상', label:'서 있을 때 허리 — 영상 따라하기', set:'영상 따라 1분', why:'오래 서 있으면 아픈 허리 (닥터 마디마디 쇼츠)',
      vid:{ id:'ZlAOi6B5_wE', t:'닥터 마디마디 · 서 있을 때 허리가 아프세요?' }, often:true },
    { p:'허리', n:'허리 영상 하나', label:'허리 — 영상 하나 따라하기', set:'영상 따라 1~5분', why:'허리·고관절 (뻔더·하루 5분·휴먼밸런스 중 무료·맨몸)', pool:'back' },
    // ── 무릎 ── (앉으면 굳는 허벅지 앞·뒤·안쪽·종아리 = 무릎 위아래)
    { p:'무릎', n:'서서 허벅지 앞 늘리기', label:'서서 발 뒤로 잡고 허벅지 앞 늘리기', set:'좌우 30초 × 2 (벽 잡고)', why:'앉으면 짧아지는 허벅지 앞 — 무릎뼈를 누른다' },
    { p:'무릎', n:'의자 햄스트링 스트레칭', label:'의자 햄스트링 스트레칭', set:'좌우 30초 × 2 (허벅지와 배 붙이기)', why:'앉아서 당겨진 뒷벅지' },
    { p:'무릎', n:'내전근 스트레칭', label:'내전근 스트레칭', set:'좌우 30초 × 2', why:'앉으면 굳는 허벅지 안쪽' },
    { p:'무릎', n:'벽 종아리 스트레칭', label:'벽 종아리 스트레칭', set:'좌우 30초 × 2', why:'종아리·발목이 굳으면 무릎이 고생' },
    { p:'무릎', n:'무릎 영상 하나', label:'무릎 — 영상 하나 따라하기', set:'영상 따라 1분', why:'무릎·발목 (뻔더 쇼츠 중 무료)', pool:'bdKnee' },
    // ── 어깨 · 목 ── (폰·모니터로 말린 어깨, 올라간 목)
    { p:'어깨 · 목', n:'위 승모근 스트레칭 (목 옆 늘리기)', label:'목 옆 늘리기', set:'좌우 30초 × 2', why:'폰 볼 때 올라간 어깨·목 풀기' },
    { p:'어깨 · 목', n:'위 승모근 스트레칭 (목 옆 늘리기)', label:'어깨올림근 늘리기', set:'고개를 반대쪽 겨드랑이 보듯 숙여 좌우 30초 × 2', why:'거북목 때 짧아지는 목 옆 뒤' },
    { p:'어깨 · 목', n:'문틀 가슴 스트레칭', label:'문틀 가슴 스트레칭', set:'좌우 30초 × 2', why:'앉아서 말린 가슴 열기' },
    { p:'어깨 · 목', n:'광배근 스트레칭 (짐볼·벤치)', label:'책상 짚고 광배근 늘리기', set:'좌우 30초 × 2', why:'팔 올리기 가동성' },
    { p:'어깨 · 목', n:'어깨 영상 하나', label:'어깨 — 영상 하나 따라하기', set:'영상 따라 1~5분', why:'어깨 (뻔더·하루 5분·휴먼밸런스 중 무료·맨몸)', pool:'shoulder' },
    // ── 손목 ── (키보드·마우스·폰)
    { p:'손목', n:'손목 영상 하나', label:'손목 — 영상 하나 따라하기', set:'영상 따라 1분', why:'오래 일해서 굳은 손목·팔꿈치 (뻔더 쇼츠 중 무료)', pool:'bdWrist' },
  ];
  // 영상 하나 미션의 영상 묶음 — 확인된 무료(맨몸)만
  function missionPool(key){
    if(key === 'bdKnee' || key === 'bdWrist'){
      const g = BD.groups.find(x => x.t === JOINT_PICK[key === 'bdKnee' ? 'legs' : 'chestback']);
      return g ? g.items.filter(it => !it.wait) : [];
    }
    const m = vidLookup();
    return (REHAB_VID[key] || []).map(id => m.get(id)).filter(v => v && (!v.gear || v.gear === 'bw'));
  }
  function withVid(m){
    if(!m || !m.pool) return m;
    const L = missionPool(m.pool); if(!L.length) return m;
    const it = L[Math.floor(Math.random() * L.length)];
    const ch = it.ch ? (CH_TAG[it.ch] || '') : '뻔더';
    return { ...m, vid:{ id:it.id, t:(ch ? ch + ' · ' : '') + it.n, url:'https://www.youtube.com/' + (it.sh ? 'shorts/' : 'watch?v=') + it.id } };
  }
  // 최근 한 것(avoid: 이름 배열)은 피하고, 부위를 먼저 뽑아서 골고루
  function pickMission(avoid){
    const av = new Set(avoid || []);
    const near = new Set((avoid || []).slice(0, 3));
    const fav = MISSIONS.filter(m => m.often && !near.has(m.label || m.n));
    if(fav.length && Math.random() < 0.3) return withVid(fav[Math.floor(Math.random() * fav.length)]);
    const pool = MISSIONS.filter(m => !av.has(m.label || m.n));
    const list = pool.length ? pool : MISSIONS;
    const parts = [...new Set(list.map(m => m.p))];
    const p = parts[Math.floor(Math.random() * parts.length)];
    const inPart = list.filter(m => m.p === p);
    return withVid(inPart[Math.floor(Math.random() * inPart.length)]);
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
    return `<b>🌅 뉴로빅</b> ${done === MORNING.steps.length ? '✓' : done + '/' + MORNING.steps.length}${m.t ? ` <span class="mslot-time">${esc(m.t)}</span>` : ''}`;
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
    '밀리터리 프레스':['Smith_Machine_Overhead_Shoulder_Press'],
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
    '케틀벨 스윙':['One-Arm_Kettlebell_Swings',1],
    '반무릎 장요근 스트레칭':['Kneeling_Hip_Flexor'],
    '벽 종아리 스트레칭':['Calf_Stretch_Hands_Against_Wall'],
    // 재활 카드 (2026-10-17) — 공은 아니고 폼롤러·롤러로 같은 자리를 푸는 그림
    '발바닥 마사지':['Foot-SMR',1],
    '폼롤러 광배근 풀기':['Latissimus_Dorsi-SMR'],
    '광배근 스트레칭 (짐볼·벤치)':['One_Arm_Against_Wall',1],
    '위 승모근 스트레칭 (목 옆 늘리기)':['Side_Neck_Stretch'],
    '데드버그':['Dead_Bug'],
    '아기 자세 (차일드 포즈)':['Childs_Pose'],
    '마사지볼 풀기 — 종아리·정강이 앞':['Calves-SMR',1],
    '마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이':['Iliotibial_Tract-SMR',1],
    '마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤':['Latissimus_Dorsi-SMR',1],
    '의자 햄스트링 스트레칭':['Hamstring_Stretch',1],
    '내전근 스트레칭':['Side_Lying_Groin_Stretch',1],
    '문틀 가슴 스트레칭':['Dynamic_Chest_Stretch',1],
    '엎드려 코브라':['Superman',1],
  };
  // 다른 출처 그림 (논문·정부·국제 도구). 파일은 이 저장소 img/ 폴더에 받아 두고 출처·라이선스를 같이 보인다
  // { f: 'img/..', approx, by: '저작자·출처', lic: '라이선스', url: '라이선스가 적힌 쪽' }
  // 2026-10-17: 공개 논문(PMC, CC BY)·위키미디어(CC BY-SA) — 목록·라이선스 원문은 img/rehab/CREDITS.md
  const IMG_EXT = {
    '클램쉘': { f:'img/rehab/clamshell.jpg', approx:false, by:'Nielsen 외, J Exp Orthop 2020', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7007455/' },
    '월싯(벽 스쿼트)': { f:'img/rehab/wallsit.jpg', approx:false, by:'Rees-Roberts 외, NIHR Open Res 2025', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12869024/' },
    '발가락 수건 잡기': { f:'img/rehab/towelcurl.jpg', approx:false, by:'Kanayama 외, Sci Rep 2022', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9056519/' },
    '책 위 밸런스 (한 발·일자 서기)': { f:'img/rehab/tandem.jpg', approx:false, by:'Augustine11, Wikimedia Commons', lic:'CC BY-SA 3.0', url:'https://commons.wikimedia.org/wiki/File:SCAT_Balance_testing_Tandem_Stance.png' },
    '밸런스 리치 (한 발 서서 앞·뒤 터치)': { f:'img/rehab/ybalance.jpg', approx:false, by:'Zhou 외, Front Hum Neurosci 2024', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11183502/' },
    '백년척추 디스크 예방 (허리·목 뒤로 젖히기)': { f:'img/rehab/standing-extension.jpg', approx:false, by:'Sakaguchi 외, J Clin Med 2024 (일부 자름)', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11122457/' },
    '승모근 아래 깨우기 (손바닥 뒤로 내리기)': { f:'img/rehab/lowtrap.jpg', approx:true, by:'Levine·Rigby, Healthcare 2018', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6023437/' },
    'Y 레이즈': { f:'img/rehab/prone-y.jpg', approx:false, by:'Liu 외, Medicine 2025 (일부 자름)', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12440407/' },
    '턱 당기기 (깊은 목 근육)': { f:'img/rehab/chintuck.jpg', approx:false, by:'Kim·Park, Medicina 2026', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13609262/' },
    '월 슬라이드': { f:'img/rehab/wallslide.jpg', approx:false, by:'Ruiz Ibán 외, Open Orthop J 2017 (일부 자름)', lic:'CC BY 4.0', url:'https://openorthopaedicsjournal.com/VOLUME/11/PAGE/812/' },
    '폼롤러 등 펴기 (흉추)': { f:'img/rehab/tspine-foamroll.jpg', approx:false, by:'Bayram·Kaya, BMC Sports Sci Med Rehabil 2026 (일부 자름·얼굴 흐림)', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13094134/' },
    '고관절 힌지 보조운동': { f:'img/rehab/hiphinge-dowel.jpg', approx:true, by:'Michaud 외, Sensors 2021', lic:'CC BY 4.0', url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8402067/' },
  };
  function imgOf(name){
    const key = String(name || '').trim();
    const x = IMG_EXT[key];
    if(x) return { a: x.f, b: null, approx: !!x.approx, credit: x };
    const v = IMG[key]; if(!v) return null;
    return { a: IMG_BASE + v[0] + '/0.jpg', b: IMG_BASE + v[0] + '/1.jpg', approx: !!v[1] };
  }
  // 그림이 없으면 유튜브에서 자세 영상을 찾는 링크
  function videoUrl(name){
    const r = roleOf(name);
    const q = (r && r.video) ? r.video : String(name || '').replace(/\s*\(.*?\)\s*/g, ' ').trim() + ' 운동 자세';
    return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  }
  // 작은 그림 두 장 (없으면 영상 찾기 링크)
  function imgHTML(name, size){
    const im = imgOf(name); const s = size || 64;
    if(!im) return `<a class="xi-vid" href="${videoUrl(name)}" target="_blank" rel="noopener">▶ 영상 찾기</a>`;
    const credit = im.credit ? `<a class="xi-credit" href="${im.credit.url}" target="_blank" rel="noopener">${esc(im.credit.by)} · ${esc(im.credit.lic)}</a>` : '';
    return `<span class="xi-img${im.b ? '' : ' one'}" style="--s:${s}px"><img src="${im.a}" loading="lazy" alt="">${im.b ? `<img src="${im.b}" loading="lazy" alt="">` : ''}${im.approx ? '<em>비슷한 그림</em>' : ''}${credit}</span>`;
  }

  // ----- 종목 정리표: 근육 · 역할 · 관절 (상필님과 하나씩 맞춰 가는 표) -----
  // role: 가동성(잘 돌게) / 안정성(버티게) / 근력 / 교정 / 회복 — 강의의 "관절마다 맡은 일" 기준
  // ok: '확인됨' = 상필님이 맞다고 한 것. 없으면 제 짐작 (화면에 "짐작"이라 표시)
  const ROLE = {
    '그라운드소통':       { muscles:'등(흉추)·어깨·고관절', role:'가동성', joint:'등·어깨', ok:'확인됨',
                           note:'움직임을 부드럽게 이어 흐르게 (바디컨트롤 Lv.1 · 닐링 암쓰레드/숄더 로테이션)', video:'바디컨트롤 그라운드 소통' },
    '바디컨트롤전면코어':  { muscles:'복부 (복사근 — 몸통 회전)', role:'안정성', joint:'허리·골반', ok:'확인됨',
                           note:'복부 회전 운동 — 몸통을 꼬며 배로 잡기 (바디컨트롤 전면 코어 1~3단계)', video:'바디컨트롤 전면 코어' },
    '고관절운동(폼롤러)': { muscles:'엉덩이(둔근) · 뒷벅지', role:'안정성', joint:'고관절', ok:'확인됨',
                           note:'엉덩이 운동 · 허리 통증 예방 — 폼롤러를 무릎 뒤에 끼우고 한 다리로 천천히 숙이기(동전 줍듯). 허리 대신 엉덩이가 일하게 (선생님 9/15)', video:'싱글레그 데드리프트 폼롤러' },
    '토터치':            { muscles:'엉덩이(둔근)', role:'안정성', joint:'고관절·무릎', ok:'확인됨',
                           note:'엉덩이 운동 — 스텝 위에서 덤벨 들고, 대각선 방향으로 다리를 뻗으며 런지. 뒤쪽에 체중이 너무 쏠리지 않게 (선생님)', video:'대각선 런지 스텝박스' },
    '크랩워킹':           { muscles:'엉덩이(둔근 — 옆쪽 중둔근)', role:'안정성', joint:'고관절', ok:'확인됨',
                           note:'엉덩이 운동 — 무릎에 밴드 끼고 인사하는 자세(힙힌지)에서 옆으로 벌리며 이동 (선생님 7/24)', video:'밴드 크랩워킹 사이드 스텝' },
    // --- 가슴 묶음 (2026-10-17 상필님 확인) ---
    '벤치프레스':        { muscles:'가슴 전체 · 어깨 앞 · 삼두', role:'근력', joint:'어깨', ok:'확인됨', note:'누워서 바벨을 가슴 위로 밀기 — 가슴 힘의 기본' },
    '덤벨벤치프레스':     { muscles:'가슴 · 어깨 앞 · 삼두', role:'근력', joint:'어깨', ok:'확인됨', note:'덤벨 두 개로 밀기 — 양손이 따로 버텨 약한 쪽이 드러남' },
    '인클라인덤벨프레스': { muscles:'윗가슴 · 어깨 앞 · 삼두', role:'근력', joint:'어깨', ok:'확인됨', note:'머리 쪽을 올린 벤치에서 덤벨 밀기 — 둥근어깨로 처지기 쉬운 윗가슴' },
    '케이블플라이':       { muscles:'가슴 안쪽', role:'근력', joint:'어깨', ok:'확인됨', note:'서서 양쪽 케이블을 앞으로 모으기 — 가슴만 따로 자극하는 마무리' },
    '딥스':             { muscles:'가슴 아래쪽 · 삼두 · 어깨 앞', role:'근력', joint:'어깨·팔꿈치', ok:'확인됨', note:'평행봉에서 내렸다 밀어 올리기 — 둥근어깨라 너무 깊이 내려가지 않기' },
    // --- 등 묶음 (2026-10-17 상필님 확인) ---
    '랫풀다운':          { muscles:'광배근(등 넓은 근육)', role:'근력', joint:'어깨', ok:'확인됨', note:'앉아서 바를 위에서 가슴 쪽으로 당기기' },
    '비하인드렛풀다운':   { muscles:'등 위쪽', role:'근력', joint:'어깨', ok:'확인됨', note:'바를 머리 뒤로 당기기 (상부 등)' },
    '어시스턴트풀업':     { muscles:'광배근 · 이두', role:'근력', joint:'어깨·팔꿈치', ok:'확인됨', note:'기계가 받쳐주는 턱걸이' },
    '암풀다운':          { muscles:'광배근만 따로', role:'근력', joint:'어깨', ok:'확인됨', note:'팔을 편 채로 바를 허벅지까지 내리기' },
    '롱풀로우머신':       { muscles:'등 가운데 · 날개뼈', role:'근력', joint:'어깨', ok:'확인됨', note:'앉아서 손잡이를 배 쪽으로 당기기' },
    '바벨로우':          { muscles:'등 전체 · 허리 버티기', role:'근력', joint:'어깨·허리', ok:'확인됨', note:'숙여서 바벨을 배 쪽으로 당기기' },
    '덤벨로우':          { muscles:'광배근', role:'근력', joint:'어깨', ok:'확인됨', note:'한 팔로 덤벨 당기기 — 한쪽씩' },
    '인버티드로우':       { muscles:'등 가운데 · 날개뼈', role:'근력', joint:'어깨', ok:'확인됨', note:'바 밑에 누워 몸을 당겨 올리기' },
    '원암케이블회전로우(불균형교정)': { muscles:'등 · 몸통 꼬기', role:'교정', joint:'등·어깨', ok:'확인됨', note:'한 팔로 당기며 반대 팔꿈치를 높이 — 몸통을 꼬아 좌우 불균형 잡기' },
    '데드리프트':         { muscles:'등 뒤쪽 전체 · 엉덩이 · 뒷벅지', role:'근력', joint:'고관절·허리', ok:'확인됨', note:'바닥의 바벨을 서면서 들기 (수요일 가슴·등 날)' },
    '스티프데드리프트':    { muscles:'뒷벅지 · 엉덩이', role:'근력', joint:'고관절', ok:'확인됨', note:'무릎을 거의 편 채 숙였다 서기' },
    // --- 어깨 묶음 (2026-10-17 상필님 확인) ---
    '오버헤드프레스':     { muscles:'어깨 전체(앞·옆) · 삼두 · 몸통 버티기', role:'근력', joint:'어깨', ok:'확인됨', note:'서서 바벨을 머리 위로 밀기 — 거북목이라 머리를 앞으로 빼지 않게' },
    '밀리터리프레스':     { muscles:'어깨(앞·옆) · 삼두', role:'근력', joint:'어깨', ok:'확인됨', note:'앉아서 스미스머신으로 머리 위로 밀기 — 길이 정해져 있어 어깨만 집중' },
    '덤벨숄더프레스':     { muscles:'어깨 · 삼두', role:'근력', joint:'어깨', ok:'확인됨', note:'덤벨 두 개를 머리 위로 — 왼쪽 어깨가 더 올라가는 것(결과지 4°)을 볼 수 있음' },
    '업라이트로우':       { muscles:'어깨 옆 · 승모근 위쪽', role:'근력', joint:'어깨', ok:'확인됨', note:'바를 몸 앞에서 끌어올리기 — 어깨가 올라간 몸이라 명치까지만' },
    '후면리어델토이드플라이': { muscles:'어깨 뒤쪽', role:'근력', joint:'어깨', ok:'확인됨', note:'숙여서 덤벨을 옆으로 — 둥근어깨의 약한 뒤쪽 키우기 (교정 효과)' },
    // --- 팔 묶음 (2026-10-17 상필님 확인 · 해머 컬·로프푸쉬다운은 중복이라 뺌) ---
    '바벨컬':            { muscles:'이두', role:'근력', joint:'팔꿈치', ok:'확인됨', note:'바벨 들어 올리기 — 팔꿈치 뒤로 당긴 채' },
    '덤벨해머컬':         { muscles:'이두 바깥쪽 · 아래팔', role:'근력', joint:'팔꿈치', ok:'확인됨', note:'손바닥 마주 보게 덤벨 컬' },
    '케이블푸쉬다운':      { muscles:'삼두', role:'근력', joint:'팔꿈치', ok:'확인됨', note:'케이블을 아래로 밀기 (바·로프 같은 운동)' },
    '라잉트라이셉스익스텐션': { muscles:'삼두 (긴 쪽)', role:'근력', joint:'팔꿈치', ok:'확인됨', note:'누워서 이마 쪽에서 팔 펴기 — 완전히 펴지 않기' },
    // --- 하체 (2026-10-17 상필님 영상) ---
    '런지':             { muscles:'엉덩이 · 허벅지 앞', role:'근력 · 교정', joint:'고관절·무릎', ok:'확인됨', note:'양손에 덤벨 들고 앞뒤로 다리 벌려 내려갔다 오기 — 고관절을 바르게 (선생님: 중요)' },
    '레그프레스':        { muscles:'허벅지 앞 · 엉덩이', role:'근력', joint:'무릎·고관절', ok:'확인됨', note:'45° 기계에 누워 발판 밀기 — 옆 손잡이를 꽉 잡아야 코어에 힘이 들어감' },
    // --- 어깨·등 교정 (2026-10-17 상필님 확인) ---
    'T레이즈':          { muscles:'어깨 뒤 · 날개뼈 사이(중간 승모근)', role:'교정', joint:'어깨·등', ok:'확인됨', note:'양팔을 옆으로 T — 날개뼈 모으기 (둥근어깨)' },
    'W레이즈':          { muscles:'날개뼈 아래쪽 · 어깨 뒤', role:'교정', joint:'어깨·등', ok:'확인됨', note:'팔꿈치 접어 W — 날개뼈를 아래·안쪽으로' },
    'Y레이즈':          { muscles:'아래 승모근', role:'교정', joint:'어깨·등', ok:'확인됨', note:'양팔을 비스듬히 위로 Y — 올라간 어깨(왼 4°·오른 2°) 내리기' },
    // --- 복부·코어 묶음 (2026-10-17) — 코어는 움직이는 게 아니라 움직임을 막는 힘(안티 모션), 8초가 한계 ---
    '플랭크':           { muscles:'복부 전체 · 허리 둘레', role:'안정성', joint:'허리·골반', ok:'확인됨', note:'팔꿈치로 버티기 — 허리가 꺾이는 걸 막기. 8초 버티고 2초 쉬기 × 8' },
    '레그레이즈':        { muscles:'아랫배 · 고관절 굴곡근', role:'안정성', joint:'허리·골반', ok:'확인됨', note:'누워 다리 들기 — 하체 전에 복부 자극 (허리 부담 줄이기)' },
    '수트케이스캐리(한손케틀벨들고걷기)': { muscles:'옆구리(복사근) · 엉덩이 옆', role:'안정성', joint:'허리·골반', ok:'확인됨', note:'한 손에 케틀벨 들고 기울지 않게 걷기 — 옆으로 쏠리는 걸 막기 (강의)' },
    '악어호흡':          { muscles:'횡격막 · 깊은 복근', role:'회복', joint:'갈비뼈·허리', ok:'확인됨', note:'엎드려 배 뒤쪽으로 숨 넣기 — 코어의 바닥(호흡)부터' },
    // --- 2026-10-17 상필님 확인 ---
    '내몸풀기(하체부터·WGS·점프)': { muscles:'전신 (고관절 먼저)', role:'가동성', joint:'고관절 → 등 → 어깨·목', ok:'확인됨', note:'무릎 올리기 → 스쿼트 → WGS → 힙힌지 → 거북목 → 손 털기 → 점프 10번 (강의 틀 + 내 WGS)', video:'월드 그레이티스트 스트레칭' },
    '가동성영상따라하기': { muscles:'전신 가동성', role:'가동성', joint:'그날 영상의 관절', ok:'일반', note:'회복날마다 다른 영상 하나 (하루 5분 채널 · 맨몸). 프로그램 탭에서 ▶ 링크로 열기. 근거는 일반 — 아프면 그 동작은 건너뛰기', video:'하루 5분 가동성' },
    '라쿠다밴드30분루틴': { muscles:'목 · 어깨 · 견갑 · 골반 · 몸통', role:'가동성', joint:'전신', ok:'일반', note:'바쁜 날 집에서 — 레드밸런스 라쿠다 밴드 30분 체형교정 전신 루틴 영상 따라하기 (목 → 어깨 → 견갑 → 골반 → 몸통 회전 → 호흡)', video:'라쿠다 30분 체형교정 전신 루틴' },
    '수영':             { muscles:'전신 · 심폐', role:'회복', joint:'—', ok:'확인됨', note:'유산소 — 무릎 충격이 적음. 회복날에 슬로우 조깅과 번갈아 (강사도 시간이 없어 수영으로 유산소를 해결한다고 함)', video:'자유형 천천히 오래 수영' },
    '카프레이즈':        { muscles:'종아리', role:'근력', joint:'발목', ok:'확인됨', note:'맨몸 · 뒤꿈치를 들었다 내렸다 (선생님). 계단·책 끝에 앞꿈치만 올리고 벽을 잡는다 → 뒤꿈치를 끝까지 내려 2초 버티기 → 까치발로 끝까지 올라가기. 천천히 — 발목 끝범위까지 쓰는 게 목적' },
    '케틀벨암바':        { muscles:'어깨 · 등(흉추)', role:'가동성', joint:'어깨·등', ok:'확인됨', note:'누워서 케틀벨 들고 몸을 굴리며 어깨·등을 열기 — 매 운동 워밍업' },
    '겟업동작':          { muscles:'전신 연결', role:'가동성', joint:'어깨·고관절', ok:'확인됨', note:'그라운드 소통처럼 움직임을 이어 주는 운동 — 누웠다 일어나기 흐름' },
    '내전근스트레칭':     { muscles:'허벅지 안쪽(내전근)', role:'가동성', joint:'고관절', ok:'확인됨', note:'양손 바닥 짚고 한 다리를 옆으로 쭉 뻗어 허벅지 안쪽 늘리기 — 고관절 힌지가 잘 되게 (선생님 사진)', video:'내전근 스트레칭 사이드 런지' },
    '리버스노드릭컬':     { muscles:'고관절 굴곡근(장요근) · 허벅지 앞', role:'근력', joint:'고관절·무릎', ok:'확인됨',
                           note:'무릎 꿇고 엉덩이에 힘 준 채 몸을 뒤로 기울였다 오기 — 고관절 굴곡근 강화 (선생님: 10번씩)', video:'리버스 노르딕컬 고관절 굴곡근' },
    '시소프레스':         { muscles:'옆 몸통(옆구리) · 어깨', role:'근력', joint:'어깨·몸통', ok:'확인됨',
                           note:'선생님(2026-10-18): 몸통의 회전 힘으로 옆 몸통을 쓰는 운동. 케틀벨 두 개 — 한쪽 팔꿈치를 골반 쪽으로 찍어 누르면서 반대쪽이 길어지게 머리 위로 프레스, 시소처럼 번갈아', video:'케틀벨 시소 프레스' },
    '케틀벨스윙':         { muscles:'엉덩이(둔근) · 뒷벅지', role:'근력', joint:'고관절', ok:'확인됨',
                           note:'힙힌지로 케틀벨을 다리 사이로 보냈다가 엉덩이 힘으로 튕겨 올리기. 팔은 줄처럼 (선생님 종목 "커틀벨")', video:'케틀벨 스윙 자세' },
    '스핀롤':            { muscles:'고관절 둘레 · 등', role:'가동성', joint:'고관절', ok:'확인됨',
                           note:'고관절을 잘 움직이게 — 몸을 말아 구르는 움직임 회복 (바디컨트롤)', video:'바디컨트롤 스핀롤' },
  };
  function roleOf(name){ return ROLE[norm(name)] || null; }

  // ----- 이름 → 기구 · 쪽 · 결 -----
  const norm = s => String(s || '').replace(/\s+/g, '');
  function toolOf(n, type){
    if(type === 'cardio') return '유산소';
    if(FIX[n]) return '교정';
    if(/RMT|클럽스윙/.test(n) || /^RMT로프$/.test(n)) return '회전 도구';
    if(/스트레칭|호흡|이완|폼롤러/.test(n)) return '회복';
    if(/케틀벨|커틀벨|시소프레스/.test(n)) return '케틀벨';
    if(type === 'bodyweight') return '맨몸';            // 레그 레이즈 같은 맨몸 운동이 아래 '레이즈'에 걸리지 않게 먼저
    if(/덤벨|해머컬|사이드레터럴|프론트레이즈|체스트플라이|리어델트|리어델토이드|가블릿/.test(n)) return '덤벨';
    if(/케이블|푸쉬다운|페이스풀|크로스오버|랫풀|렛풀|암풀다운|시티드|롱풀/.test(n)) return '케이블';   // 롱풀로우 = 앉아서 당기는 케이블 로우
    if(/머신|밀리터리|레그프레스|레그익스텐션|레그컬|펙덱|체스트프레스|이너타이|힙어드덕션|어시스턴트풀업/.test(n)) return '머신';   // 밀리터리 프레스 = 앉아서 스미스머신 (상필님)
    if(/바벨|^스쿼트$|벤치프레스|데드리프트|오버헤드프레스|밀리터리|굿모닝운동|힙쓰러스트/.test(n)) return '바벨';
    if(type === 'bodyweight' || /딥스|풀업|턱걸이|푸쉬업|인버티드/.test(n)) return '맨몸';
    return '웨이트';
  }
  function sideOf(n, tool){
    if(/시소프레스|원암|한팔|싱글|덤벨로우|스플릿|불가리안|런지|겟업|암바|불균형교정|토터치|고관절운동\(폼롤러\)/.test(n)) return '한쪽씩';
    if(tool === '회전 도구' || /크랩워킹|걷기|러닝|조깅|수영|자전거|등산|일립티컬|스텝밀|마운틴/.test(n)) return '좌우 번갈아';
    if((tool === '덤벨' || tool === '케틀벨') && !/가블릿|굿모닝|스윙/.test(n)) return '양손 따로';
    return '양쪽 같이';
  }
  const W = (key, basis, why) => ({ key, basis, why });
  // 종목 → 기능성 · 재활 · 중량 · 유산소
  function weckOf(n, type, tool, side){
    if(type === 'cardio' || tool === '유산소') return W('유산소', '정의', '심폐 운동 — 순환');
    // 선생님 동작 중 이름에 "폼롤러"가 붙었지만 한 다리씩 숙이는 고관절 움직임
    if(/고관절운동\(폼롤러\)/.test(n)) return W('기능성', '정의', '한 다리씩 숙이며 고관절·몸통을 같이 쓰는 선생님 동작');
    // 기능성 이름이 먼저 — 교정 목록(FIX)에 있어도 여러 부위를 쓰는 동작은 기능성 (플랭크·캐리·한 발 균형·몸풀기)
    if(/딥스/.test(n)) return W('중량', '정의', '몸무게를 무게로 쓰는 가슴·삼두 근력 운동 (상필님: 중량)');
    if(/내몸풀기|WGS|겟업|그라운드소통|스핀롤|바디컨트롤|크랩워킹|토터치|힌지보조|노드릭|밸런스|캐리|암바|회전로우|불균형교정|플랭크|카프레이즈|라쿠다|시소프레스/.test(n))
      return W('기능성', '정의', '여러 몸 부위를 한 번에 쓰는 움직임 — 고립 운동이 아니에요');
    // 재활 — 풀기·늘리기·깨우기·교정
    if(FIX[n]) return W('재활', '정의', '교정·재활 동작 — 굳은 곳을 풀고 늘리고, 잠든 근육을 깨워요');
    if(tool === '회복' || /마사지|수건잡기|턱당기기|월슬라이드|코브라|클램쉘|데드버그|글루트브릿지|백년척추|아기자세|가동성영상|관절챙기기|키우기영상/.test(n))
      return W('재활', '정의', '근육 풀기·스트레칭·근육 키우기 — 회복날 재활에 쓰는 운동');
    if(tool === '케틀벨' || tool === '맨몸' || type === 'bodyweight')
      return W('기능성', '정의', '맨몸·케틀벨로 몸을 한 덩어리로 쓰는 운동');
    // 나머지 — 바벨·덤벨·머신·케이블
    return W('중량', '정의', '무게를 들어 근육을 키우는 운동 — 근테크');
  }

  // ex: {name, type, part} · grp: 앱에서 직접 바꾼 값(있으면 그게 이김)
  function classify(ex, grp){
    const n = norm(ex && ex.name);
    const type = ex && ex.type;
    const tool = toolOf(n, type);
    const side = sideOf(n, tool);
    let weck = weckOf(n, type, tool, side);
    // 앱에서 직접 정한 분류가 있으면 그게 이긴다 (예전 BTT·CCT 값은 WECK 에 없어서 그냥 무시된다)
    if(grp && WECK[grp] && grp !== weck.key) weck = W(grp, '수정', '앱의 종목 목록에서 직접 정한 것');
    return { name: ex && ex.name, tool, side, weck,
             toolText: TOOLS[tool].short, toolKid: TOOLS[tool].kid, icon: TOOLS[tool].icon,
             sideText: SIDES[side] };
  }

  // ----- 화면 조각 (두 페이지가 같이 쓴다) -----
  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // 작은 딱지: [기능성] [바벨 · 양쪽 같이]
  function chipsHTML(info){
    const wk = info.weck.key, c = (WECK[wk] || {}).color || '#55606A';
    return `<span class="xi-wk" style="background:${c}" title="${esc(info.weck.why)}">${esc(wk)}</span>`
         + `<span class="xi-tl">${esc(info.tool)} · ${esc(info.side)}</span>`;
  }
  // 펼쳐 보는 설명 한 덩어리
  function detailHTML(info){
    return `<div class="xi-detail">
      <div class="xi-detail-img">${imgHTML(info.name, 72)}</div>
      ${(r => r ? `<div><b>${esc(r.muscles)}</b> — ${esc(r.role)} (${esc(r.joint)}) <span class="xi-basis b-공식">${esc(r.ok || '짐작')}</span><br><span style="color:var(--ink-faint)">${esc(r.note)}</span></div>` : '')(roleOf(info.name))}
      <div><b>${esc(info.icon)} ${esc(info.tool)}</b> — ${info.toolKid}</div>
      <div><b>${esc(info.side)}</b> — ${esc(info.sideText)}</div>
      <div><b>${esc((WECK[info.weck.key] || {}).kr || info.weck.key)}</b> — ${esc(info.weck.why)}
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

  // "기능성 · 재활 · 중량이 뭐예요?"
  function weckHTML(){
    const cards = ['기능성','재활','중량','유산소'].map(k => { const w = WECK[k];
      return `<div class="xi-wcard plain" style="--wk:${w.color}"><div class="xi-wbody"><div class="xi-wname"><b>${esc(w.kr)}</b></div><div class="xi-wkid">${w.kid}</div></div></div>`; }).join('');
    return `<div class="xi-weck">${cards}
      <div class="xi-wkid">운동날 순서: 🔥 열 내기 → 🧩 <b>기능성</b> → 🏋️ <b>중량</b>. <b>재활</b>은 회복날(월·토)에: 근육 풀기 → 스트레칭 → 근육 키우기(영상).</div></div>`;
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
    const warm = `<div class="xh-chain"><span>내 몸풀기 (하체부터 상체로 순환 · WGS · 점프)</span></div>`;
    const funnel = `<div class="xh-funnel">
      <div class="f1">선생님이 가르쳐주신 종목만</div>
      <div class="f2">그중 가장 오래 안 한 것</div>
      <div class="f3">이번 주에 아직 안 쓴 것</div>
      <div class="f4">✅ 오늘 종목</div></div>`;
    const knee = `<div class="xh-chain warn"><span>스쿼트 · 런지 · 레그프레스 · 달리기</span><i>→</i><span>⚠ 맨 아래로</span></div>`;
    const bar = `<div class="xh-bar"><span class="s1" style="flex:6">준비</span><span class="s2" style="flex:12">워밍업</span><span class="s3" style="flex:42">본 운동</span><span class="s4" style="flex:10">⏱</span></div>
      <div class="xh-bar-key"><span>0분</span><span>60분</span></div>`;
    return `<div class="xh">
      ${step(1, '📅', '요일은 선생님 표대로', week, '바뀌지 않아요 · 운동날은 <b>🔥 열 내기(가동성·관절 영상) → 🧩 기능성 → 🏋️ 중량 → 마무리</b> · 코어는 <b>8초 버티고 2초 쉬기</b> · 회복날(월·토)은 <b>전날 부위로 재활 한 바퀴</b> — 월 = 무릎, 토 = 허리·어깨: ① 근육 풀기 → ② 스트레칭 → ③ 근육 키우기(휴먼밸런스·하루 5분·뻔더 영상) → 심폐 20분. 모두 한 시간 안')}
      ${step(2, '🔥', '운동하는 날 맨 앞엔 내 몸풀기', warm, 'PT 날엔 안 붙여요 · 가동성 영상은 그날 자리에서')}
      ${step(3, '🎯', '자리는 그대로, 종목만 바꿔 넣기', funnel, '"가슴 주운동" 같은 자리는 고정 → 종목만 돌아가서 운동 편식이 없어요')}
      ${step(4, '🦵', '무릎은 내가 판단', `<div class="xh-chain"><span>스쿼트 · 런지 · 레그프레스도 제자리에</span><i>→</i><span>붓는 날은 직접 빼기</span></div>`, '무릎 자동 규칙은 꺼 두었어요 — 선생님이 중요하다고 한 런지·레그프레스를 정상으로 하기 위해')}
      ${step(5, '⏱', '한 시간에 맞추기', bar, '웨이트 1세트 2분 · 맨몸 1.2분 · 유산소는 적힌 시간 · 60분 넘는 종목은 흐려지고 ⏱')}
      ${step(6, '✍️', '기록하면 → 다음 고르기 재료', `<div class="xh-chain"><span>오늘 한 것 기록</span><i>→</i><span>"가장 오래 안 한 것"이 바뀜</span><i>→</i><span>③으로 돌아가요</span></div>`, '')}
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
    .pm{margin:6px 0 2px;}
    .hb{display:flex;flex-direction:column;gap:12px;}
    .hb-ch>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;-webkit-tap-highlight-color:transparent;} .hb-ch>summary::-webkit-details-marker{display:none;}
    .hb-ch>summary a{font-size:11px;color:var(--accent-b);} .hb-more{margin-left:auto;color:var(--ink-faint);font-size:12px;} .hb-ch[open] .hb-more{transform:rotate(180deg);}
    .hb-ch .hb-tip{margin-top:6px;} .hb-ch .hb-g{margin-top:8px;}
    .hb-head{font-size:14px;color:var(--ink);}
    .hb-tip{font-size:11.5px;color:var(--ink-dim);line-height:1.55;word-break:keep-all;}
    .hb-g{display:flex;flex-direction:column;gap:6px;} .hb-t{font-size:12.5px;font-weight:800;color:var(--ink);margin-top:4px;}
    .hb-i{display:grid;grid-template-columns:96px 1fr;gap:8px;align-items:center;text-decoration:none;background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:6px;}
    .hb-i img{width:96px;height:54px;object-fit:cover;border-radius:6px;background:#000;}
    .hb-x{display:flex;flex-direction:column;gap:2px;min-width:0;} .hb-n{font-size:12px;color:var(--ink);font-weight:600;line-height:1.35;word-break:keep-all;}
    .hb-gear{font-size:10px;border-radius:999px;padding:1px 7px;align-self:flex-start;} .hb-gear.bw{color:#7FC08A;border:1px solid rgba(127,192,138,.45);} .hb-gear.cable{color:var(--ink-faint);border:1px solid var(--border);} .hb-gear.band{color:var(--accent-a);border:1px solid rgba(232,163,61,.45);}
    .hb-note{font-size:10.5px;color:var(--ink-dim);}
    .an{margin:0 0 10px;border:1px solid var(--border);border-radius:12px;background:rgba(255,255,255,.02);}
    .an>summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;padding:10px 12px;-webkit-tap-highlight-color:transparent;}
    .an>summary::-webkit-details-marker{display:none;}
    .an-title{font-size:13.5px;font-weight:700;color:var(--ink);flex:1;} .an>summary small{flex:1 1 100%;order:3;font-size:11px;color:var(--ink-dim);word-break:keep-all;}
    .an-more{font-size:11px;color:var(--accent-a);border:1px solid var(--accent-a-dim);border-radius:999px;padding:1px 9px;white-space:nowrap;}
    .an[open] .an-more{font-size:0;} .an[open] .an-more::before{content:'접기 ▴';font-size:11px;}
    .an-body-wrap{padding:0 12px 12px;display:flex;flex-direction:column;gap:10px;}
    .an-link{font-size:11.5px;color:var(--ink);line-height:1.5;background:var(--accent-b-dim);border-radius:8px;padding:8px 10px;word-break:keep-all;}
    .an-fig{margin:0;} .an-wrap{position:relative;display:block;background:#fff;border-radius:10px;overflow:hidden;}
    .an-wrap img{display:block;width:100%;height:auto;}
    .an-pin{position:absolute;transform:translate(-50%,-50%);width:12px;height:12px;border:0;padding:0;background:transparent;cursor:pointer;font-family:inherit;}
    .an-pin .dot{display:block;width:12px;height:12px;border-radius:50%;background:currentColor;border:2px solid #fff;box-sizing:border-box;box-shadow:0 0 0 1.5px currentColor;}
    .an-pin.r{color:#D9534F;} .an-pin.g{color:#3FA35B;} .an-pin.p{color:#E8A33D;}
    .an-pin::before{content:'';position:absolute;left:5px;bottom:9px;width:2px;height:16px;background:#fff;transform:rotate(-42deg);transform-origin:bottom center;box-shadow:0 0 0 .5px rgba(0,0,0,.35);}
    .an-pl{position:absolute;left:12px;bottom:18px;padding:1px 4px;border-radius:4px;background:rgba(20,24,28,.85);color:#fff;font-size:9px;font-weight:700;line-height:1.4;white-space:nowrap;pointer-events:none;}
    .an-pin.r .an-pl{color:#FFB3B0;} .an-pin.g .an-pl{color:#A8E6B5;} .an-pin.p .an-pl{color:#FFD9A0;}
    .an-pin.flip::before{left:auto;right:5px;transform:rotate(42deg);} .an-pin.flip .an-pl{left:auto;right:12px;}
    .an-pin.low::before{bottom:auto;top:9px;transform:rotate(42deg);transform-origin:top center;} .an-pin.low .an-pl{bottom:auto;top:18px;}
    .an-pin.flip.low::before{transform:rotate(-42deg);}
    .an-fig figcaption{font-size:10px;color:var(--ink-faint);margin-top:3px;display:flex;flex-wrap:wrap;gap:4px 8px;} .an-fig .xi-credit{display:inline;width:auto;margin:0;}
    .an-legend{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:10.5px;color:var(--ink-dim);}
    .an-tip{font-size:10.5px;color:var(--ink-faint);word-break:keep-all;}
    .an-h{font-size:12px;font-weight:800;margin-top:4px;} .an-h.r{color:#E07A80;} .an-h.g{color:#7FC08A;} .an-h.p{color:var(--accent-a);} .an-h.n{color:#FFD54A;}
    .an-m.n{border-left-color:#FFD54A;} .an-m.n .an-k{background:#FFD54A;color:#1B1F23;font-size:12px;}
    .an-m{display:grid;grid-template-columns:24px 1fr auto;gap:8px;align-items:start;padding:7px 8px;border-radius:9px;border:1px solid var(--border);border-left:4px solid;background:var(--surface);}
    .an-thumb{margin:0;border-radius:9px;background-repeat:no-repeat;background-color:#fff;border:2px solid var(--border-strong);position:relative;display:block;}
    .an-thumb.r{border-color:#D9534F;} .an-thumb.g{border-color:#3FA35B;} .an-thumb.p{border-color:#E8A33D;}
    .an-thumb i{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;border:2px solid currentColor;box-shadow:0 0 0 2px rgba(255,255,255,.7);}
    .an-thumb.r i{color:#D9534F;} .an-thumb.g i{color:#3FA35B;} .an-thumb.p i{color:#E8A33D;}
    .an-m.r{border-left-color:#D9534F;} .an-m.g{border-left-color:#3FA35B;} .an-m.p{border-left-color:#E8A33D;}
    .an-m.hit{box-shadow:0 0 0 2px var(--accent-a) inset;}
    .an-k{width:22px;height:22px;border-radius:50%;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px;}
    .an-m.r .an-k{background:#D9534F;} .an-m.g .an-k{background:#3FA35B;} .an-m.p .an-k{background:#E8A33D;color:#1B1F23;}
    .an-body{min-width:0;display:flex;flex-direction:column;gap:3px;font-size:12px;line-height:1.55;word-break:keep-all;}
    .an-n{font-size:12.5px;font-weight:700;color:var(--ink);} .an-n small{font-weight:400;color:var(--ink-faint);font-size:10px;margin-left:4px;}
    .an-where{color:var(--ink-dim);} .an-does{color:var(--ink);} .an-fix{color:var(--accent-b);}
    .an-plan{display:flex;flex-direction:column;gap:3px;margin-top:4px;padding-top:4px;border-top:1px dashed var(--border);}
    .an-m > .an-plan{grid-column:2 / -1;min-width:0;}   /* 그림 칸 아래까지 넓게 — 오른쪽 빈자리 없이 */
    .an-me{color:var(--accent-a);font-size:12px;word-break:keep-all;line-height:1.55;} .an-me b{display:block;}
    .an-palp{border:1px solid rgba(91,179,217,.35);border-radius:9px;background:rgba(91,179,217,.06);padding:5px 8px;}
    .an-palp>summary{cursor:pointer;font-size:12px;font-weight:700;color:#5FB3D9;list-style:none;} .an-palp>summary::-webkit-details-marker{display:none;}
    .an-palp>summary small{font-weight:400;color:var(--ink-dim);margin-left:4px;font-size:10.5px;}
    .pa-one{margin-top:6px;display:flex;flex-direction:column;gap:2px;} .pa-one+.pa-one{border-top:1px dashed var(--border);padding-top:6px;}
    .pa-t{font-size:11.5px;font-weight:800;color:var(--ink);}
    .pa-row{display:grid;grid-template-columns:18px 1fr;gap:4px;font-size:11.5px;color:var(--ink);line-height:1.5;word-break:keep-all;} .pa-row i{font-style:normal;}
    .pa-row.w{color:#E8A33D;} .pa-src{font-size:10px;color:var(--ink-faint);} .pa-src a{color:var(--accent-b);margin:0 2px;}
    .an-palp-how{font-size:11.5px;line-height:1.6;color:var(--ink);background:rgba(91,179,217,.08);border-radius:9px;padding:7px 10px;word-break:keep-all;} .an-palp-how b{display:block;color:#5FB3D9;} .an-palp-how small{color:var(--ink-dim);} .an-palp-how a{color:var(--accent-b);}
    .an-step{font-size:12px;color:var(--ink);word-break:keep-all;line-height:1.55;display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:8px;align-items:start;} .an-step b{display:block;margin-top:2px;grid-column:1/-1;}
    .an-step .an-st{min-width:0;} .an-step .an-exs{grid-column:2;grid-row:2;margin:0;max-width:124px;justify-content:flex-end;}
    .an-step.r b{color:#E07A80;} .an-step.g b{color:#7FC08A;} .an-step.i b{color:var(--accent-b);}
    .an-exs{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0 2px;}
    .an-ex{display:flex;flex-direction:column;align-items:center;width:58px;text-decoration:none;}
    .an-ex img{width:54px;height:54px;object-fit:cover;border-radius:8px;background:#fff;border:1px solid var(--border-strong);}
    .an-ex small{font-size:9.5px;color:var(--ink-dim);text-align:center;line-height:1.2;margin-top:2px;word-break:keep-all;}
    .tr{display:flex;flex-direction:column;gap:8px;}
    .tr-root{align-self:center;text-align:center;background:var(--accent-a-dim);color:var(--ink);border-radius:14px;padding:8px 16px;font-size:14px;font-weight:700;}
    .tr-root b{color:var(--accent-a);margin-left:4px;} .tr-root small{display:block;font-size:10.5px;font-weight:400;color:var(--ink-dim);margin-top:2px;}
    .tr-trunk{position:relative;padding-left:18px;display:flex;flex-direction:column;gap:6px;}
    .tr-trunk::before{content:'';position:absolute;left:7px;top:-8px;bottom:14px;width:2px;background:var(--border-strong);border-radius:2px;}
    .tr-group{position:relative;}
    .tr-group::before{content:'';position:absolute;left:-11px;top:21px;width:11px;height:2px;background:var(--border-strong);}
    .tr-group>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:12px;background:var(--surface);border:1px solid var(--border);border-left:5px solid var(--gc);-webkit-tap-highlight-color:transparent;}
    .tr-group>summary::-webkit-details-marker,.tr-leaf>summary::-webkit-details-marker{display:none;}
    .tr-group[open]>summary{background:color-mix(in srgb, var(--gc) 16%, var(--surface));}
    .tr-gi{font-size:20px;line-height:1;} .tr-gn{flex:1;font-size:14px;font-weight:700;color:var(--ink);}
    .tr-gn small{display:block;font-size:10.5px;font-weight:400;color:var(--ink-dim);margin-top:1px;}
    .tr-gv{font-size:11px;font-weight:700;color:var(--ink-dim);border:1px dashed var(--border-strong);border-radius:999px;padding:1px 7px;white-space:nowrap;}   /* 묶음의 영상 개수 (2026-10-18) */
    .tr-gc{font-size:12px;font-weight:700;color:var(--gc);min-width:26px;text-align:center;border:1px solid var(--gc);border-radius:999px;padding:1px 6px;}
    .tr-gc::after{content:' ▾';font-size:9px;} .tr-group[open]>summary .tr-gc::after{content:' ▴';}
    .tr-branch{position:relative;margin:6px 0 4px 16px;padding-left:16px;display:flex;flex-direction:column;gap:4px;}
    .tr-branch::before{content:'';position:absolute;left:0;top:-6px;bottom:12px;width:2px;background:var(--gc);opacity:.55;border-radius:2px;}
    .tr-sub{font-size:10.5px;font-weight:700;color:var(--gc);margin:6px 0 0 -4px;}
    .tr-leaf{position:relative;}
    .tr-leaf::before{content:'';position:absolute;left:-16px;top:15px;width:14px;height:2px;background:var(--gc);opacity:.55;}
    .tr-leaf>summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;padding:6px 10px;border-radius:9px;background:rgba(242,240,234,0.04);border:1px solid var(--border);-webkit-tap-highlight-color:transparent;}
    .tr-leaf[open]>summary{border-color:var(--gc);}
    .tr-vids>summary{background:color-mix(in srgb, var(--gc) 10%, transparent);border-style:dashed;}
    .tv{display:flex;flex-direction:column;gap:5px;margin:5px 0 6px;}
    .tv-sub{font-size:10.5px;font-weight:700;color:var(--gc);margin-top:4px;}
    .tv-i{display:grid;grid-template-columns:64px 1fr;gap:8px;align-items:center;text-decoration:none;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:4px;}
    .tv-i img{width:64px;height:36px;object-fit:cover;border-radius:5px;background:#000;}
    .tv-x{display:flex;flex-direction:column;gap:1px;min-width:0;} .tv-n{font-size:11.5px;color:var(--ink);font-weight:600;line-height:1.35;word-break:keep-all;}
    .tv-m{font-size:10px;color:var(--ink-dim);} .tv-ch{font-weight:700;} .tv-ch.HB{color:var(--accent-b);} .tv-ch.HB2{color:#7FC08A;} .tv-ch.BD{color:#C98BD6;} .tv-ch.HB3{color:var(--accent-a);}
    .tr-ln{font-size:12.5px;color:var(--ink);font-weight:600;word-break:keep-all;}
    .tr-tag{font-size:10px;color:var(--ink-dim);border:1px solid var(--border-strong);border-radius:999px;padding:0 6px;margin-left:auto;}
    .tr-b{font-size:9.5px;font-weight:700;border-radius:4px;padding:1px 4px;line-height:1.3;}
    .tr-b.t{background:var(--accent-a-dim);color:var(--accent-a);} .tr-b.l{background:var(--accent-b-dim);color:var(--accent-b);}
    .tr-b.n{background:rgba(127,192,138,.16);color:#7FC08A;}
    .tr-b.w{background:color-mix(in srgb, var(--wk) 22%, transparent);color:var(--wk);}
    .tr-detail{margin:4px 0 6px;padding:8px 10px;border-radius:9px;background:var(--surface);border:1px dashed var(--border-strong);display:flex;flex-direction:column;gap:6px;font-size:11.5px;color:var(--ink);line-height:1.5;}
    .tr-img img{border-radius:6px;} .tr-dim{color:var(--ink-dim);font-size:11px;}
    .tr-row{word-break:keep-all;} .tr-tip{color:var(--accent-a);} .tr-fix b{color:var(--accent-b);}
    .tr-legend{font-size:10.5px;color:var(--ink-dim);text-align:center;margin-top:4px;}
    .pf summary{list-style:none;cursor:pointer;-webkit-tap-highlight-color:transparent;}
    .pf summary::-webkit-details-marker{display:none;}
    .pf-more{display:inline-block;margin-top:5px;font-size:11px;color:var(--accent-a);border:1px solid var(--accent-a-dim);border-radius:999px;padding:1px 9px;}
    .pf-more::after{content:' ▾';} .pf[open] .pf-more::after{content:' ▴';}
    .pf[open] .pf-more{font-size:0;padding:1px 9px;} .pf[open] .pf-more::before{content:'접기';font-size:11px;}
    .pf-body{margin-top:10px;display:flex;flex-direction:column;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:12px;}
    .pf-goal{text-align:center;padding:4px 0 2px;}
    .pf-gt{font-size:16px;font-weight:800;color:var(--accent-a);word-break:keep-all;}
    .pf-gs{font-size:12px;color:var(--ink-dim);margin:2px 0 8px;word-break:keep-all;} .pf-gs b{color:var(--accent-a);} .pf-gs small{color:var(--ink-faint);font-size:10.5px;}
    .pm-sub{display:block;font-size:.82em;font-weight:600;color:var(--ink-dim);}
    .pf-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;}
    .pf-tags span{font-size:11px;color:var(--ink);background:rgba(242,240,234,0.05);border:1px solid var(--border);border-radius:8px;padding:3px 8px;}
    .pf-tags em{font-style:normal;color:var(--ink-faint);margin-right:5px;font-size:10px;}
    .pf-h{font-size:12.5px;font-weight:800;color:var(--ink);margin-bottom:7px;}
    .pf-house{display:flex;flex-direction:column;align-items:center;gap:3px;}
    .pf-floor{width:var(--w);min-width:0;display:grid;grid-template-columns:58px 1fr;gap:6px;align-items:center;background:var(--accent-b-dim);border-radius:8px;padding:5px 8px;box-sizing:border-box;}
    .pf-floor:first-child{background:var(--accent-a-dim);border-radius:16px 16px 8px 8px;}
    .pf-floor:nth-last-child(2){background:rgba(242,240,234,0.07);}
    .pf-fn{font-size:12px;color:var(--ink);white-space:nowrap;}
    .pf-fd{font-size:10.5px;color:var(--ink-dim);line-height:1.35;word-break:keep-all;}
    .pf-app{display:block;color:var(--accent-b);font-size:10px;margin-top:1px;}
    .pf-say{display:block;color:var(--ink);font-size:10.5px;line-height:1.45;margin-top:3px;padding:3px 6px;background:rgba(242,240,234,0.06);border-radius:6px;word-break:keep-all;text-align:left;}
    .pf-base .pf-say{margin-top:4px;}
    .pf-say-box{margin-top:6px;}
    .pf-floor:first-child .pf-app{color:var(--accent-a);}
    .pf-base{width:100%;text-align:center;font-size:10.5px;color:var(--ink-dim);border-top:2px solid var(--border-strong);padding-top:5px;margin-top:2px;}
    .pf-joints{display:flex;flex-direction:column;gap:3px;}
    .pf-j{display:grid;grid-template-columns:62px 66px 1fr;align-items:center;gap:6px;font-size:11px;border-radius:8px;padding:4px 8px;border-left:4px solid;}
    .pf-j.mob{border-color:var(--accent-b);background:var(--accent-b-dim);} .pf-j.stb{border-color:var(--accent-a);background:var(--accent-a-dim);}
    .pf-jn{color:var(--ink);font-weight:700;} .pf-j.mob .pf-jr{color:var(--accent-b);} .pf-j.stb .pf-jr{color:var(--accent-a);}
    .pf-me{color:var(--ink-dim);font-size:10.5px;}
    .pf-note{font-size:10.5px;color:var(--ink-dim);line-height:1.45;margin-top:6px;word-break:keep-all;}
    .pf-note b{color:var(--ink);}
    .pf-mob{display:grid;grid-template-columns:1fr 12px 1fr 12px 1fr;align-items:stretch;}
    .pf-mob>i{font-style:normal;color:var(--ink-faint);font-size:11px;align-self:center;text-align:center;}
    .pf-m{display:flex;flex-direction:column;align-items:center;text-align:center;background:rgba(242,240,234,0.05);border:1px solid var(--border);border-radius:8px;padding:6px 3px;}
    .pf-m b{width:18px;height:18px;line-height:18px;border-radius:50%;background:var(--accent-b);color:var(--bg);font-size:11px;}
    .pf-m span{font-size:11.5px;color:var(--ink);font-weight:700;margin-top:3px;word-break:keep-all;}
    .pf-m small{font-size:9.5px;color:var(--ink-faint);line-height:1.3;margin-top:2px;word-break:keep-all;}
    .pf-week{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
    .pf-d{display:flex;flex-direction:column;align-items:center;text-align:center;border-radius:8px;padding:5px 1px;min-width:0;}
    .pf-d b{font-size:11px;color:var(--ink-faint);} .pf-d span{font-size:11px;color:var(--ink);font-weight:700;margin-top:1px;word-break:keep-all;line-height:1.2;}
    .pf-d small{font-size:9px;color:var(--ink-dim);line-height:1.2;margin-top:2px;word-break:keep-all;}
    .pf-d.work{background:var(--accent-a-dim);} .pf-d.pt{background:var(--accent-pt-dim);} .pf-d.rest{background:var(--accent-b-dim);}
    .pf-mine{font-size:12px;color:var(--ink);line-height:1.5;border-left:3px solid var(--accent-a);padding-left:8px;}
    .pf-mine p{margin:0 0 6px;}
    .pf-src{font-size:10px;color:var(--ink-faint);text-align:right;}
    .pm-goal{font-size:14.5px;font-weight:700;color:var(--accent-a);line-height:1.4;word-break:keep-all;}
    .pm-ladder{display:flex;flex-wrap:wrap;align-items:center;gap:2px 4px;margin-top:4px;font-size:11px;color:var(--ink-dim);}
    .pm-ladder span{white-space:nowrap;} .pm-ladder i{font-style:normal;color:var(--ink-faint);font-size:10px;}
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
    .rh-item{display:grid;grid-template-columns:88px 1fr;align-items:center;gap:8px;font-size:12.5px;}
    .rh-txt{display:flex;flex-direction:column;gap:1px;min-width:0;} .rh-txt .rh-set{white-space:normal;}
    .rh-vid{align-self:flex-start;margin-top:3px;font-size:10.5px;color:var(--accent-b);text-decoration:none;border:1px solid var(--border);border-radius:999px;padding:1px 8px;}
    .rh-vid.nasm{color:#7FC08A;border-color:rgba(127,192,138,.45);}
    .rh-noimg{display:flex;align-items:center;justify-content:center;width:86px;height:42px;border:1px dashed var(--border-strong);border-radius:8px;font-size:9.5px;color:var(--ink-faint);}
    .rh-vids{font-size:11px;line-height:1.6;margin:-2px 0 8px;color:var(--ink-dim);word-break:keep-all;}
    .rh-vids a{color:#7FC08A;}
    .rh-pic{width:88px;} .rh-pic .xi-vid{font-size:10px;white-space:nowrap;margin:0;}
    .rh-pic .xi-img{flex-wrap:wrap;gap:2px;margin:0;} .rh-pic .xi-img em{font-size:9px;}
    .xi-img.one img{width:calc(var(--s) * 2 + 2px);height:var(--s);object-fit:contain;background:#fff;}
    .xi-credit{display:block;width:100%;font-size:8.5px;line-height:1.2;color:var(--ink-faint);text-decoration:none;margin-top:1px;word-break:keep-all;}
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
      return `<div class="xi-trow"><span class="xi-ticon">🧩</span><div><b>${esc(f.for)}</b><div>${esc(f.how)} <span class="xi-basis b-${f.basis === '연구' ? '공식' : (f.basis === '교과' || f.basis === '강의' || f.basis === 'NASM') ? '수정' : '정의'}">${esc(f.basis)}</span>${f.src && FIX_SRC[f.src] ? ` <span class="xi-src">— ${FIX_SRC[f.src].url ? `<a href="${FIX_SRC[f.src].url}" target="_blank" rel="noopener">${esc(FIX_SRC[f.src].name)}</a>` : esc(FIX_SRC[f.src].name)}</span>` : ''}</div></div></div>`;
    }).join('');
    return `<div class="xi-tools">${rows}
      <div class="xi-science"><div class="xi-sci-title">딱지 뜻</div>
        <div class="xi-sci"><span class="xi-basis b-공식">연구</span> 무작위 비교 연구가 있음 · <span class="xi-basis b-수정">교과</span> 물리치료·재활 교과서/전문가 지침 · <span class="xi-basis b-수정">강의</span> 직접 들은 웰니스 강의(2026-10-16) · <span class="xi-basis b-수정">NASM</span> 미국 NASM 교정운동 공식 자료 · <span class="xi-basis b-정의">일반</span> 널리 쓰이지만 직접 비교 연구는 적음</div>
        <div class="xi-sci">※ 교정운동은 상필님이 직접 고른 것이고, 결과지(2022-12-28) 항목과 맞춰 적었어요. 아프면 멈추고, 무릎·허리는 선생님·정형외과 말씀이 먼저예요.</div>
      </div></div>`;
  }
  window.EXINFO = { SRC, WECK, BASIS, TOOLS, SIDES, SCIENCE, FIX, fixTip, fixHTML, MORNING, morningText, REHAB, rehabHTML, PHILO_DEFAULT, philoHTML, philoMiniHTML, philoFoldHTML, treeHTML, TREE, ANAT, anatHTML, anatPlanHTML, PALP, palpHTML, anatThumbHTML, HB, HB2, HB3, BD, TREE_VIDS, treeVidsHTML, hbHTML, mobVideo, jointVideo, bdDaily, vidPool, m3dOf, m3dBtnHTML, M3D_G, m2dOf, m2dHTML, rehabVideo, REHAB_VID, MISSIONS, pickMission, vidHTML, ROLE, roleOf, IMG, imgOf, imgHTML, videoUrl, classify, chipsHTML, detailHTML, weckHTML, toolsHTML, howHTML, injectCSS };
})();
