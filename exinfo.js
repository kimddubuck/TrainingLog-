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
      note:'NASM 둥근어깨·거북목 + 팔이 앞으로 떨어짐: 가슴·광배근·위 승모근은 풀고 늘리기 → 깊은 목 근육·중하부 승모근·앞톱니근 깨우기 → 로우를 어깨 내리고 머리 세운 채로',
      vids:[ ['qM0c_xXjKa8','NASM Quick Fix: 팔이 앞으로 떨어짐 (어깨 가동성) 6분'], ['YGSa44JGF8Q','NASM: 둥근어깨·거북목 15분'] ],
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 쇄골 아래·겨드랑이·어깨 뒤', set:'아픈 곳마다 30~45초', sets:1 }, { n:'폼롤러 광배근 풀기', set:'좌우 아픈 곳마다 30~45초', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'문틀 가슴 스트레칭', set:'좌우 30초 × 2', sets:2 }, { n:'광배근 스트레칭 (짐볼·벤치)', set:'좌우 30초 × 2', sets:2 }, { n:'위 승모근 스트레칭 (목 옆 늘리기)', set:'좌우 30초', sets:1 }, { n:'폼롤러 등 펴기 (흉추)', set:'10회 × 2세트', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'턱 당기기 (깊은 목 근육)', set:'5초 × 10', sets:1 }, { n:'Y 레이즈', set:'10회 × 2세트 (T·W도 번갈아)', sets:2 }, { n:'월 슬라이드', set:'10회 × 2세트', sets:2 }, { n:'엎드려 코브라', set:'10초 × 5', sets:5 } ] },
        { s:'④ 통합', items:[ { n:'덤벨 로우', set:'3세트 × 12회 (어깨 내리고)', sets:3 }, { n:'원암 케이블 회전 로우 (불균형 교정)', set:'15회씩 × 3세트', sets:3 } ] },
      ] },
    back: { name:'허리', icon:'🧍', why:'골반 앞기울기 6.5° · 오른쪽 허리 아래 욱신 · 오른쪽 장요근 당김',
      note:'NASM 골반 앞기울기: 고관절 앞·허리 근육은 풀고 늘리기 → 엉덩이·깊은 코어 깨우기 → 힌지·캐리·스쿼트로 통합',
      vids:[ ['j2rOw4qrE6Y','NASM Quick Fix: 허리 아치 (골반 앞기울기) 9분'], ['YUv-ZqW7PRs','NASM: 골반 앞기울기 근육 3분'] ],
      stages: [
        { s:'① 풀기', items:[ { n:'마사지볼 풀기 — 골반 옆·허벅지 앞·엉덩이', set:'아픈 곳마다 30~45초', sets:1 } ] },
        { s:'② 늘리기', items:[ { n:'반무릎 장요근 스트레칭', set:'좌우 30초 × 2 (골반 말고 엉덩이 조이기)', sets:2 }, { n:'아기 자세 (차일드 포즈)', set:'30초 × 2', sets:2 } ] },
        { s:'③ 깨우기', items:[ { n:'데드버그', set:'좌우 8회 × 2세트', sets:2 }, { n:'글루트 브릿지', set:'15회 × 2세트', sets:2 }, { n:'플랭크', set:'8초 버티고 2초 쉬기 × 8 (골반 말고)', sets:1 } ] },
        { s:'④ 통합', items:[ { n:'고관절 힌지 보조운동', set:'15회 × 2세트', sets:2 }, { n:'가블릿 스쿼트', set:'10회 × 2세트 (무릎 괜찮은 날만)', sets:2 }, { n:'수트케이스 캐리 (한 손 케틀벨 들고 걷기)', set:'좌우 30초 × 2', sets:2 } ] },
      ] },
    knee: { name:'무릎', icon:'🦵', why:'오른 무릎 안쪽 통증·붓기 · 오른 무릎 바깥돌림 · 왼발목 안으로 무너짐',
      note:'NASM 무릎이 안으로 모임: 종아리·내전근·골반 옆(TFL)은 풀고 늘리기 → 엉덩이 옆(중둔근) 깨우기. 강의: 무릎은 안정성 관절, 발목·엉덩이부터. NASM은 무릎 통증 치료는 다루지 않아요 — 붓기 있는 날은 ①②만, 안쪽 통증은 정형외과 먼저',
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
    '광배근 스트레칭 (짐볼·벤치)':['kEH6jatSVSw','NASM · 광배근 볼 스트레칭'],
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
  // 제목 밑 짧은 판: 🎯 목적 한 줄 + 신체지도 한 줄. 직접 고친 글이면 첫 줄을 목적으로 쓴다
  function philoMiniHTML(text){
    const t = String(text || '').trim();
    const goal = (!t || t === PHILO_DEFAULT.trim()) ? PHILO.goal : t.split('\n')[0].replace(/^[^\w가-힣]+/, '').replace(/^목적\s*[—-]\s*/, '');
    return `<div class="pm-goal">🎯 ${esc(goal)}</div>
      <div class="pm-ladder">${PHILO.ladder.map(s => `<span>${s[0]} ${esc(s[1])}</span>`).join('<i>→</i>')}</div>`;
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
      { ic:'🩹', n:'재활', d:'풀기 → 늘리기 → 깨우기 → 통합 · 마사지에서 멈추지 않기, 근력(통합)까지', app:'운동날 그 부위 재활 · 회복날 4단계',
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
        <div class="pf-goal"><div class="pf-gt">🎯 ${esc(PHILO.goal)}</div>
          <div class="pf-gs">근육을 키우는 건 그다음</div>
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
                   + (w && /^(BTT|CCT|RMT)$/.test(w.key) ? `<span class="tr-b w" style="--wk:${wk.color}">${w.key}</span>` : '');
      return `<details class="tr-leaf"><summary><span class="tr-ln">${esc(x.name)}</span>${badges}${roleTag(r)}</summary>
        <div class="tr-detail">
          <div class="tr-img">${imgHTML(x.name, 64)}</div>
          ${r ? `<div class="tr-row">🎯 <b>${esc(r.muscles)}</b> · ${esc(r.role)} · ${esc(r.joint)}<br><span class="tr-dim">${esc(r.note)}</span></div>` : ''}
          ${x.tip ? `<div class="tr-row tr-tip">💬 쌤: ${esc(x.tip)}</div>` : ''}
          ${f ? `<div class="tr-row tr-fix">🧩 <b>${esc(f.for)}</b><br>${esc(f.how)}</div>` : ''}
          <div class="tr-row">${vidHTML(x.name)}</div>
          ${x.where && x.where.length ? `<div class="tr-row">📅 ${x.where.map(esc).join(' · ')}</div>` : ''}
          ${x.info ? `<div class="tr-row tr-dim">${esc(x.info.icon)} ${esc(x.info.toolText)} · ${esc(x.info.sideText)} · ${esc(w.key === '?' ? '선생님 확인' : (w.key === '일반' ? '셋 다 아님' : w.key))} — ${esc(w.why)}</div>` : ''}
        </div></details>`;
    };
    const branch = (g, rows) => {
      const count = rows.filter(r => typeof r !== 'string').length;
      if(!count) return '';
      const body = rows.map(r => typeof r === 'string' ? `<div class="tr-sub">${esc(r)}</div>` : leaf(r)).join('');
      return `<details class="tr-group" style="--gc:${g.c}"><summary><span class="tr-gi">${g.ic}</span><span class="tr-gn">${esc(g.n)}<small>${esc(g.sub)}</small></span><span class="tr-gc">${count}</span></summary>
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
      return branch(g, clean);
    }).join('');
    const rest = items.filter(x => !used.has(norm(x.name)));
    const total = items.length - rest.length;
    const etc = (rest.length && opt.etc !== false) ? branch({ ic:'📦', n:'그 밖에', sub:'프로그램엔 안 나와요 · 검색해서 기록할 때만', c:'#5E6A72' }, rest) : '';
    return `<div class="tr">
      <div class="tr-root">🌳 내 종목 지도 <b>${total}개</b><small>묶음을 누르면 종목이, 종목을 누르면 설명이 펼쳐져요</small></div>
      <div class="tr-trunk">${groups}${etc}</div>
      <div class="tr-legend"><span class="tr-b t">쌤</span> 선생님이 가르쳐 준 것 · <span class="tr-b l">강의</span> 신체지도 강의 · <span class="tr-b w" style="--wk:#888">BTT</span> 비틀기 결</div>
    </div>`;
  }

  // ----- 근육 지도 (재활 카드 위): 해부도 + 풀 근육 🔴 / 깨울 근육 🟢 -----
  // 근거: NASM 둥근어깨·거북목 글, NASM 골반 기울기 글, NASM 오버헤드 스쿼트 글 (풀 근육·깨울 근육 목록)
  //       NASM 교과(간접) = 공식 글엔 없고 교과 요약 자료에 있는 것. 강의 = 신체지도 강의(2026-10-16). 일반 = 해부학 상식
  // 그림: 위키미디어 공용 해부도 (파일·라이선스는 img/anat/CREDITS.md). pins 는 그림 위 % 좌표
  const ANAT = {
    shoulder: {
      title:'어깨 · 목 근육 지도', sub:'둥근어깨 · 거북목 · 팔이 머리 위로 안 올라감',
      link:'💡 연결: 어깨는 위팔뼈 + 쇄골 + 날개뼈가 한 덩어리(어깨 복합체, 강의). 앞(가슴)이 짧아지면 뒤(날개뼈 근육)가 늘어난 채 약해져요 → 앞은 풀고 뒤는 깨우기. 광배근은 골반까지 내려가서 허리와도 이어져요',
      imgs:[{f:'img/anat/girdle.jpg',cap:'앞(왼쪽) · 뒤(오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1118_Muscles_that_Position_the_Pectoral_Girdle.jpg',pins:[{m:1,x:26,y:36},{m:8,x:28,y:52},{m:2,x:68,y:25},{m:6,x:74,y:70},{m:7,x:86,y:52}]},{f:'img/anat/trapezius.jpg',cap:'승모근 — 주황 위 · 빨강 가운데 · 자주 아래 (뒤에서)',by:'BodyParts3D © DBCLS',lic:'CC BY-SA 2.1 JP',url:'https://commons.wikimedia.org/wiki/File:Trapezius_back.png',pins:[{m:2,x:50,y:30},{m:6,x:50,y:62}]},{f:'img/anat/humerus.jpg',cap:'광배근 · 회전근개 · 앞톱니근',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1119_Muscles_that_Move_the_Humerus.jpg',pins:[{m:1,x:22,y:7},{m:5,x:65,y:25},{m:8,x:30,y:74},{m:10,x:79,y:62}]},{f:'img/anat/neck.jpg',cap:'목 옆(왼쪽) · 뒤(가운데)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1111_Posterior_and_Side_Views_of_the_Neck.jpg',pins:[{m:4,x:12,y:38},{m:2,x:17,y:57},{m:3,x:46,y:33}]},{f:'img/anat/longus-colli.jpg',cap:'목뼈 앞 깊은 근육 (빨강) — 앞에서',by:'Gray 해부학 1918 · Uwe Gille',lic:'퍼블릭 도메인',url:'https://commons.wikimedia.org/wiki/File:Longus_colli.png',pins:[{m:9,x:57,y:55}]}],
      muscles:[
        { k:1, n:'큰가슴근 · 작은가슴근', en:'pectoralis major/minor', t:'r', where:'가슴 앞 · 쇄골 아래 오목한 곳', does:'어깨를 앞으로 말아 당겨요 (둥근어깨의 주범)', fix:'🔴 마사지볼 쇄골 아래 → 문틀 가슴 스트레칭', src:'NASM' },
        { k:2, n:'위 승모근', en:'upper trapezius', t:'r', where:'목과 어깨 사이 두툼한 곳', does:'어깨를 귀 쪽으로 올려요 (왼쪽 어깨 4° 올라감)', fix:'🔴 위 승모근 스트레칭 (목 옆 늘리기)', src:'NASM' },
        { k:3, n:'어깨올림근 (견갑거근)', en:'levator scapulae', t:'r', where:'목 옆에서 날개뼈 위 안쪽 모서리까지', does:'날개뼈를 위로 끌어올리고 거북목과 짝을 이뤄요', fix:'🔴 고개를 반대쪽 겨드랑이 보듯 숙여 늘리기', src:'NASM' },
        { k:4, n:'목빗근 (흉쇄유돌근)', en:'sternocleidomastoid', t:'r', where:'목 옆 비스듬한 굵은 줄 (이마를 손으로 밀면 튀어나옴)', does:'턱을 앞으로 내밀어요 (거북목) · 강의: 뒷골 당김의 원인', fix:'🔴 손·볼로 살살 풀기', src:'NASM' },
        { k:5, n:'넓은등근 (광배근)', en:'latissimus dorsi', t:'r', where:'겨드랑이 뒤에서 허리·골반까지 넓게', does:'팔을 아래·안쪽으로 당겨요 → 짧으면 팔이 머리 위로 못 올라가요. 골반까지 이어져 허리와 연결', fix:'🔴 폼롤러 겨드랑이 → 광배근 스트레칭', src:'NASM' },
        { k:6, n:'중·아래 승모근', en:'middle/lower trapezius', t:'g', where:'날개뼈 사이 · 날개뼈 아래 등 가운데', does:'날개뼈를 모으고 아래로 내려요 (어깨 올라감 잡기)', fix:'🟢 Y·T·W 레이즈 · 승모근 아래 깨우기', src:'NASM' },
        { k:7, n:'마름근 (능형근)', en:'rhomboids', t:'g', where:'날개뼈 안쪽 모서리와 척추 사이', does:'날개뼈를 척추 쪽으로 모아요', fix:'🟢 T 레이즈 · 로우', src:'NASM' },
        { k:8, n:'앞톱니근 (전거근)', en:'serratus anterior', t:'g', where:'겨드랑이 아래 갈비뼈 옆 톱니 모양', does:'날개뼈를 갈비뼈에 붙이고, 팔 올릴 때 날개뼈를 위로 돌려요', fix:'🟢 월 슬라이드', src:'NASM' },
        { k:9, n:'깊은 목 굽힘근', en:'deep cervical flexors (longus colli)', t:'g', where:'목뼈 바로 앞 깊은 곳', does:'턱을 당겨 목을 곧게 세워요 (거북목 반대 힘)', fix:'🟢 턱 당기기', src:'NASM' },
        { k:10, n:'회전근개 (가시아래근 등)', en:'rotator cuff (infraspinatus)', t:'g', where:'날개뼈 뒷면 · 어깨 뒤 관절 아래', does:'어깨 공을 소켓 가운데에 잡아 둬요', fix:'🟢 로우 (어깨 내리고) · 케틀벨 암바', src:'NASM' },
      ] },
    back: {
      title:'허리 · 골반 · 고관절 근육 지도', sub:'골반 앞기울기 6.5° · 오른쪽 허리 아래 욱신 · 오른쪽 장요근 당김',
      link:'💡 연결: 강의의 코어 = 허리뼈 + 골반 + 고관절 한 덩어리(LPHC). 광배근은 골반에, 뒷벅지는 고관절에 붙어서 모든 근육이 여기로 모여요. 앞(고관절 굽힘근)이 짧아지면 골반이 앞으로 기울고 허리가 대신 일해요 → 앞은 풀고 뒤(엉덩이·코어)는 깨우기',
      imgs:[{f:'img/anat/hip-thigh.jpg',cap:'오른 다리 앞(위) · 뒤(아래 오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1122_Gluteal_Muscles_that_Move_the_Femur.jpg',pins:[{m:1,x:21,y:13},{m:3,x:15,y:20},{m:2,x:18,y:27},{m:7,x:79,y:56},{m:5,x:78,y:62},{m:6,x:71,y:65},{m:9,x:75,y:79}]},{f:'img/anat/abdomen.jpg',cap:'배 근육(위) · 허리 앞 깊은 근육(아래)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1112_Muscles_of_the_Abdomen.jpg',pins:[{m:8,x:85,y:18},{m:1,x:40,y:74}]},{f:'img/anat/neck-back.jpg',cap:'등 깊은 근육 — 척추세움근 (아래 가운데)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1117_Muscles_of_the_Neck_and_Back.jpg',pins:[{m:4,x:45,y:68}]}],
      muscles:[
        { k:1, n:'장요근 (큰허리근 + 엉덩근)', en:'iliopsoas', t:'r', where:'허리뼈 앞 깊은 곳에서 골반 안쪽을 지나 허벅지 뼈 안쪽까지', does:'다리를 들어 올려요. 짧아지면 골반을 앞으로 기울이고 허리를 당겨요 (오른쪽 당김)', fix:'🔴 반무릎 장요근 스트레칭 — 골반 말고 엉덩이 조이기', src:'NASM' },
        { k:2, n:'넙다리곧은근 (대퇴직근)', en:'rectus femoris', t:'r', where:'허벅지 앞 한가운데 (골반 앞 뼈에서 시작)', does:'허벅지 앞 네 근육 중 유일하게 골반에서 시작해 골반 앞기울기를 거들어요', fix:'🔴 마사지볼 허벅지 앞', src:'NASM' },
        { k:3, n:'넙다리근막긴장근 (TFL) + 장경인대', en:'tensor fasciae latae / IT band', t:'r', where:'골반 옆 바지 주머니 자리 → 허벅지 바깥 띠 → 무릎 바깥', does:'골반 옆을 당기고 무릎 바깥까지 이어져요 (허리와 무릎 둘 다 관여)', fix:'🔴 마사지볼 골반 옆', src:'강의' },
        { k:4, n:'척추세움근 (허리 부분)', en:'lumbar erector spinae', t:'r', where:'허리뼈 양옆 세로 근육 기둥', does:'허리를 뒤로 젖혀요. 골반이 앞으로 기울면 과하게 일해서 뻐근해요 (오른쪽 허리 아래 욱신)', fix:'🔴 아기 자세', src:'NASM' },
        { k:5, n:'궁둥구멍근 (이상근)', en:'piriformis', t:'r', where:'엉덩이 깊은 곳, 꼬리뼈 옆에서 허벅지 뼈 윗부분까지', does:'고관절을 바깥으로 돌려요. 뭉치면 엉덩이·허리 통증', fix:'🔴 마사지볼 엉덩이 깊은 곳', src:'강의' },
        { k:6, n:'큰볼기근 (대둔근)', en:'gluteus maximus', t:'g', where:'엉덩이 전체 가장 큰 근육', does:'고관절을 펴고 골반을 뒤로 말아 세워요 (골반 앞기울기 반대 힘)', fix:'🟢 글루트 브릿지 · 힌지 · 스쿼트', src:'NASM' },
        { k:7, n:'중간볼기근 (중둔근)', en:'gluteus medius', t:'g', where:'엉덩이 위 바깥쪽 (골반 뼈 바로 아래)', does:'한 발로 설 때 골반이 옆으로 떨어지지 않게 잡아요', fix:'🟢 클램쉘 · 캐리', src:'NASM' },
        { k:8, n:'배가로근 · 깊은 코어', en:'transversus abdominis', t:'g', where:'배 가장 안쪽, 허리를 띠처럼 감싸는 층', does:'허리가 움직이는 걸 막아 줘요 (안티 모션)', fix:'🟢 데드버그 · 플랭크 8초', src:'NASM' },
        { k:9, n:'뒷벅지 (햄스트링)', en:'hamstrings', t:'g', where:'허벅지 뒤 (골반 뒤 앉는 뼈에서 시작)', does:'골반을 뒤로 당겨요. 골반이 앞으로 기울면 늘어난 채 약해져요', fix:'🟢 힌지 · 스티프 데드리프트', src:'NASM 교과(간접)' },
      ] },
    knee: {
      title:'무릎 · 발목 · 발 근육 지도', sub:'오른 무릎 안쪽 통증 · 무릎 바깥돌림 · 왼발목 안으로 무너짐',
      link:'💡 연결: 무릎은 안정성 관절 — 위(고관절)와 아래(발목)가 굳으면 무릎이 대신 돌아가요 (강의). 무릎이 안으로 모이는 건 허벅지 안쪽·바깥 띠가 당기고 엉덩이 옆이 못 잡아 줘서예요 (NASM). 무릎 안쪽 통증 자리는 거위발(허벅지 안쪽 세 근육이 붙는 곳)일 수 있어요 — 진단은 정형외과',
      imgs:[{f:'img/anat/hip-thigh.jpg',cap:'오른 다리 앞(위) · 뒤(아래 오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1122_Gluteal_Muscles_that_Move_the_Femur.jpg',pins:[{m:1,x:23,y:20},{m:2,x:15,y:20},{m:6,x:23,y:32},{m:5,x:79,y:56},{m:4,x:77,y:76}]},{f:'img/anat/lower-leg.jpg',cap:'종아리 앞(왼쪽) · 뒤(가운데) · 뒤 깊은 곳(오른쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1123_Muscles_of_the_Leg_that_Move_the_Foot_and_Toes.jpg',pins:[{m:7,x:23,y:25},{m:3,x:61,y:45},{m:7,x:93,y:43}]},{f:'img/anat/foot.jpg',cap:'발바닥 — 발바닥 근막 (아래 왼쪽)',by:'OpenStax 해부생리학',lic:'CC BY 4.0',url:'https://commons.wikimedia.org/wiki/File:1124_Intrinsic_Muscles_of_the_Foot.jpg',pins:[{m:8,x:17,y:58}]},{f:'img/anat/pes-anserinus.jpg',cap:'거위발 — 무릎 안쪽 아래 동그라미',by:'M. Häggström · Gray 434',lic:'퍼블릭 도메인',url:'https://commons.wikimedia.org/wiki/File:Pes_anserinus.png',pins:[{m:9,x:37,y:91}]}],
      muscles:[
        { k:1, n:'모음근 (내전근)', en:'adductors', t:'r', where:'허벅지 안쪽', does:'짧아지면 무릎을 안으로 끌어당겨요', fix:'🔴 내전근 스트레칭', src:'NASM' },
        { k:2, n:'TFL + 장경인대', en:'TFL / IT band', t:'r', where:'골반 옆 → 허벅지 바깥 띠 → 무릎 바깥', does:'무릎 바깥을 당겨 무릎이 돌아가게 해요', fix:'🔴 마사지볼 골반 옆', src:'NASM' },
        { k:3, n:'장딴지근 · 가자미근 (종아리)', en:'gastrocnemius / soleus', t:'r', where:'종아리 뒤 (겉·속 두 층)', does:'굳으면 발목이 안 젖혀져 발·무릎이 안으로 무너져요', fix:'🔴 종아리 폼롤러 → 벽 종아리 스트레칭', src:'NASM 교과(간접)' },
        { k:4, n:'넙다리두갈래근 (대퇴이두근)', en:'biceps femoris', t:'r', where:'허벅지 뒤 바깥쪽', does:'무릎을 바깥으로 돌려요 (오른 무릎 바깥돌림)', fix:'🔴 폼롤러 허벅지 뒤 바깥', src:'NASM 교과(간접)' },
        { k:5, n:'중간볼기근 (중둔근)', en:'gluteus medius', t:'g', where:'엉덩이 위 바깥쪽', does:'무릎이 안으로 모이는 걸 위에서 막아 줘요', fix:'🟢 클램쉘 · 밸런스 리치', src:'NASM' },
        { k:6, n:'안쪽넓은근 (내측광근)', en:'vastus medialis', t:'g', where:'무릎 바로 위 안쪽 물방울 모양', does:'무릎뼈가 안쪽으로 잘 미끄러지게 잡아요', fix:'🟢 월싯 (아프지 않은 각도)', src:'NASM 교과(간접)' },
        { k:7, n:'앞정강근 · 뒤정강근', en:'tibialis anterior / posterior', t:'g', where:'정강이 앞 · 종아리 속 깊은 곳', does:'발 아치를 세우고 발목을 젖혀요 (왼발목 안으로 무너짐)', fix:'🟢 카프 레이즈(끝까지 내려) · 수건 잡기', src:'NASM 교과(간접)' },
        { k:8, n:'발바닥 근막 · 발 안쪽 근육', en:'plantar fascia / intrinsic foot', t:'g', where:'발바닥 뒤꿈치에서 발가락까지', does:'아치를 받쳐요. 뭉치면 종아리까지 당겨요', fix:'🔴 발바닥 마사지 → 🟢 수건 잡기', src:'강의' },
        { k:9, n:'거위발 (무릎 안쪽)', en:'pes anserinus', t:'p', where:'무릎 안쪽 아래 정강이 뼈에 세 근육(넙다리빗근·두덩정강근·반힘줄근)이 붙는 곳', does:'무릎 안쪽 통증이 자주 생기는 자리 — 내전근·햄스트링이 당기면 여기가 아파요', fix:'⚠ 붓거나 아프면 ①② 까지만 · 정형외과', src:'일반' },
      ] },
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
  function anatHTML(part){
    const a = ANAT[part]; if(!a) return '';
    const byK = {}; a.muscles.forEach(m => byK[m.k] = m);
    const figs = (a.imgs || []).map(im => `<figure class="an-fig">
        <div class="an-wrap"><img src="${im.f}" alt="" loading="lazy">
          ${(im.pins || []).map(p => { const m = byK[p.m]; return m ? `<button type="button" class="an-pin ${m.t}" style="left:${p.x}%;top:${p.y}%" data-anpin="${part}-${m.k}" title="${esc(m.n)}">${m.k}</button>` : ''; }).join('')}
        </div>
        <figcaption>${esc(im.cap || '')}<a class="xi-credit" href="${im.url}" target="_blank" rel="noopener">${esc(im.by)} · ${esc(im.lic)}</a></figcaption>
      </figure>`).join('');
    const row = m => `<div class="an-m ${m.t}" id="an-${part}-${m.k}">
        <span class="an-k">${m.k}</span>
        <div class="an-body"><div class="an-n">${esc(m.n)} <small>${esc(m.en)}</small><span class="xi-basis b-${m.src === 'NASM' ? '수정' : (m.src === '강의' ? '수정' : '정의')}">${esc(m.src)}</span></div>
          <div class="an-where">📍 ${esc(m.where)}</div>
          <div class="an-does">${esc(m.does)}</div>
          <div class="an-fix">${esc(m.fix)}</div></div></div>`;
    const red = a.muscles.filter(m => m.t === 'r'), green = a.muscles.filter(m => m.t === 'g'), other = a.muscles.filter(m => m.t !== 'r' && m.t !== 'g');
    return `<details class="an"><summary><span class="an-title">🫀 ${esc(a.title)}</span><small>${esc(a.sub)}</small><span class="an-more">근육 보기 ▾</span></summary>
      <div class="an-body-wrap">
        <div class="an-link">${esc(a.link)}</div>
        ${figs}
        <div class="an-legend"><span class="r">🔴 풀고 늘리기 — 너무 일하는 근육 (①②)</span><span class="g">🟢 깨우기 — 쉬고 있는 근육 (③④)</span></div>
        <div class="an-tip">번호를 누르면 그 근육 설명으로 가요 · 그림은 해부학 교과서(OpenStax)와 공개 자료 — 번호 자리는 제가 표시한 것</div>
        <div class="an-h r">🔴 풀고 늘리기</div>${red.map(row).join('')}
        <div class="an-h g">🟢 깨우기</div>${green.map(row).join('')}
        ${other.length ? `<div class="an-h p">⚠ 조심할 자리</div>${other.map(row).join('')}` : ''}
      </div></details>`;
  }

  // ----- 스트레칭 미션 (1시간마다 하나): 문제 부위별 1분 안 · 사무실에서 가능한 것 위주 -----
  // n = 앱 종목 이름 (그림·영상 찾기용). 부위를 먼저 고르고 그 안에서 하나 → 부위가 골고루 나온다
  const MISSIONS = [
    { p:'목 · 거북목', n:'턱 당기기 (깊은 목 근육)', set:'5초 × 10번', why:'앞으로 나온 머리를 뒤로' },
    { p:'목 · 거북목', n:'위 승모근 스트레칭 (목 옆 늘리기)', set:'좌우 30초', why:'올라간 왼쪽 어깨 내리기' },
    { p:'어깨 · 둥근어깨', n:'문틀 가슴 스트레칭', set:'좌우 30초', why:'앞으로 말린 가슴 열기' },
    { p:'어깨 · 둥근어깨', n:'월 슬라이드', set:'10회', why:'날개뼈 위로 돌리기 — 팔 올리기' },
    { p:'어깨 · 둥근어깨', n:'승모근 아래 깨우기 (손바닥 뒤로 내리기)', set:'10회', why:'날개뼈 아래로' },
    { p:'어깨 · 둥근어깨', n:'T 레이즈', set:'맨몸 10회 (서서 상체 숙이고)', why:'날개뼈 모으기' },
    { p:'어깨 · 둥근어깨', n:'광배근 스트레칭 (짐볼·벤치)', set:'책상 짚고 좌우 30초', why:'팔 올리기 가동성' },
    { p:'등 · 굽은등', n:'백년척추 디스크 예방 (허리·목 뒤로 젖히기)', set:'일어나서 10회', why:'앉아 있던 등 되돌리기' },
    { p:'등 · 굽은등', n:'Y 레이즈', set:'맨몸 10회 (벽에 등 대고)', why:'아래 승모근 깨우기' },
    { p:'허리 · 골반', n:'반무릎 장요근 스트레칭', set:'좌우 30초 (골반 말고 엉덩이 조이기)', why:'골반 앞기울기 — 앞쪽 풀기' },
    { p:'허리 · 골반', n:'고관절 힌지 보조운동', set:'10회', why:'허리 대신 엉덩이 쓰기' },
    { p:'허리 · 골반', n:'플랭크', set:'8초 버티고 2초 쉬기 × 5', why:'깊은 코어 깨우기' },
    { p:'고관절', n:'내전근 스트레칭', set:'좌우 30초', why:'고관절 가동성' },
    { p:'고관절', n:'클램쉘', set:'좌우 15회', why:'엉덩이 옆 깨우기 — 무릎 지키기' },
    { p:'무릎 · 발목', n:'벽 종아리 스트레칭', set:'좌우 30초', why:'발목이 풀려야 무릎이 편해요' },
    { p:'무릎 · 발목', n:'카프 레이즈', set:'15회 (끝까지 내려 2초)', why:'종아리 · 발목 끝범위' },
    { p:'무릎 · 발목', n:'책 위 밸런스 (한 발·일자 서기)', set:'한 발 좌우 20초', why:'흔들릴 때 잡기' },
    { p:'발', n:'발가락 수건 잡기', set:'15회 (수건 없으면 발가락 오므리기)', why:'왼발 아치 세우기' },
    { p:'순환', n:'내 몸풀기 (하체부터 · WGS · 점프)', set:'제자리 걷기 1분 → 기마자세 콩콩 10 → 점프 10', why:'순환 — 모든 운동의 1순위' },
  ];
  // 최근 한 것(avoid: 이름 배열)은 피하고, 부위를 먼저 뽑아서 골고루
  function pickMission(avoid){
    const av = new Set(avoid || []);
    const pool = MISSIONS.filter(m => !av.has(m.n));
    const list = pool.length ? pool : MISSIONS;
    const parts = [...new Set(list.map(m => m.p))];
    const p = parts[Math.floor(Math.random() * parts.length)];
    const inPart = list.filter(m => m.p === p);
    return inPart[Math.floor(Math.random() * inPart.length)];
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
    '수영':             { muscles:'전신 · 심폐', role:'회복', joint:'—', ok:'확인됨', note:'유산소 — 무릎 충격이 적음. 회복날에 슬로우 조깅과 번갈아 (강사도 시간이 없어 수영으로 유산소를 해결한다고 함)', video:'자유형 천천히 오래 수영' },
    '카프레이즈':        { muscles:'종아리', role:'근력', joint:'발목', ok:'확인됨', note:'뒤꿈치를 들었다 내렸다 — 선생님 종아리 운동' },
    '케틀벨암바':        { muscles:'어깨 · 등(흉추)', role:'가동성', joint:'어깨·등', ok:'확인됨', note:'누워서 케틀벨 들고 몸을 굴리며 어깨·등을 열기 — 매 운동 워밍업' },
    '겟업동작':          { muscles:'전신 연결', role:'가동성', joint:'어깨·고관절', ok:'확인됨', note:'그라운드 소통처럼 움직임을 이어 주는 운동 — 누웠다 일어나기 흐름' },
    '내전근스트레칭':     { muscles:'허벅지 안쪽(내전근)', role:'가동성', joint:'고관절', ok:'확인됨', note:'양손 바닥 짚고 한 다리를 옆으로 쭉 뻗어 허벅지 안쪽 늘리기 — 고관절 힌지가 잘 되게 (선생님 사진)', video:'내전근 스트레칭 사이드 런지' },
    '리버스노드릭컬':     { muscles:'고관절 굴곡근(장요근) · 허벅지 앞', role:'근력', joint:'고관절·무릎', ok:'확인됨',
                           note:'무릎 꿇고 엉덩이에 힘 준 채 몸을 뒤로 기울였다 오기 — 고관절 굴곡근 강화 (선생님: 10번씩)', video:'리버스 노르딕컬 고관절 굴곡근' },
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
    if(/케틀벨|커틀벨/.test(n)) return '케틀벨';
    if(type === 'bodyweight') return '맨몸';            // 레그 레이즈 같은 맨몸 운동이 아래 '레이즈'에 걸리지 않게 먼저
    if(/덤벨|해머컬|사이드레터럴|프론트레이즈|체스트플라이|리어델트|리어델토이드|가블릿/.test(n)) return '덤벨';
    if(/케이블|푸쉬다운|페이스풀|크로스오버|랫풀|렛풀|암풀다운|시티드|롱풀/.test(n)) return '케이블';   // 롱풀로우 = 앉아서 당기는 케이블 로우
    if(/머신|밀리터리|레그프레스|레그익스텐션|레그컬|펙덱|체스트프레스|이너타이|힙어드덕션|어시스턴트풀업/.test(n)) return '머신';   // 밀리터리 프레스 = 앉아서 스미스머신 (상필님)
    if(/바벨|^스쿼트$|벤치프레스|데드리프트|오버헤드프레스|밀리터리|굿모닝운동|힙쓰러스트/.test(n)) return '바벨';
    if(type === 'bodyweight' || /딥스|풀업|턱걸이|푸쉬업|인버티드/.test(n)) return '맨몸';
    return '웨이트';
  }
  function sideOf(n, tool){
    if(/원암|한팔|싱글|덤벨로우|스플릿|불가리안|런지|겟업|암바|불균형교정|토터치|고관절운동\(폼롤러\)/.test(n)) return '한쪽씩';
    if(tool === '회전 도구' || /크랩워킹|걷기|러닝|조깅|수영|자전거|등산|일립티컬|스텝밀|마운틴/.test(n)) return '좌우 번갈아';
    if((tool === '덤벨' || tool === '케틀벨') && !/가블릿|굿모닝|스윙/.test(n)) return '양손 따로';
    return '양쪽 같이';
  }
  const W = (key, basis, why) => ({ key, basis, why });
  function weckOf(n, type, tool, side){
    // ① 공식 자료가 직접 이름을 든 것
    if(/RMT/.test(n)) return W('RMT', '공식', 'RMT 클럽·로프 스윙은 WeckMethod 가 RMT 도구로 직접 든 것');
    if(/스플릿|런지/.test(n)) return W('CCT', '공식', '스플릿 스쿼트·런지는 WeckMethod 가 CCT 를 쓰는 예로 직접 든 것');
    if(/^스쿼트$|^벤치프레스$|^데드리프트$/.test(n)) return W('BTT', '공식', '전통 파워리프팅(스쿼트·벤치·데드)은 WeckMethod 가 BTT 예로 직접 든 것');
    if(/플랭크|크런치|싯업|윗몸|레그레이즈|슈퍼맨|월싯|캐리/.test(n)) return W('일반', '공식', '버티는 코어 — WeckMethod 는 이걸 셋과 따로 "브레이싱 코어"라고 불러요');
    if(/내몸풀기/.test(n)) return W('일반', '정의', '여러 동작을 한 번씩 하는 몸풀기 흐름 — 셋에 해당 근거 없음');
    if(FIX[n]){
      if(/레이즈$/.test(n)) return W('BTT', '정의', '양팔이 같이 똑같이 올라가 한쪽으로 꼴 수 없음 → BTT 정의 (교정 동작)');
      if(/백년척추/.test(n)) return W('BTT', '정의', '허리·목을 양쪽 같이 뒤로 젖힘 — 한쪽으로 꼬지 않음 → BTT 정의 (교정 동작)');
      return W('일반', '정의', '교정·재활 동작 — 몸통을 한쪽으로 꼬지 않아 셋에 해당 근거 없음 (무엇을 바로잡는지는 🧩 설명)');
    }
    // ② 이름만으로는 무슨 동작인지 모르는 것 · 선생님만의 동작
    if(/^커틀벨$|^오버헤드$/.test(n)) return W('?', '확인', '이름만으로는 어떤 동작인지 몰라요');
    // 원암 케이블 회전 로우(선생님 이름: 불균형 교정운동) — 사진으로 동작 확인: 한 팔로 당기며 몸통을 꼰다
    if(/회전로우/.test(n)) return W('CCT', '정의', '한 팔로 당기며 몸통을 꼬아 마무리 — 공식 CCT 예 "끝에서 꼬아 마무리하는 로우"와 같은 모양');
    if(/암바/.test(n)) return W('일반', '정의', '어깨·등 가동성 운동 — 셋에 해당 근거 없음 (상필님 확인)');
    if(/겟업/.test(n)) return W('일반', '정의', '그라운드 소통 같은 움직임 흐름 운동 — 셋에 해당 근거 없음 (상필님 확인)');
    if(/바디컨트롤전면코어/.test(n)) return W('CCT', '정의', '복부 회전 — 몸통을 한쪽으로 꼬며 배로 잡는 동작 → CCT 정의 (상필님 확인)');
    if(/그라운드소통|스핀롤/.test(n)) return W('일반', '정의', '가동성 흐름(등·어깨·고관절 돌리기) — 셋에 해당 근거 없음 (상필님 확인)');
    if(/고관절운동\(폼롤러\)/.test(n)) return W('CCT', '정의', '한 다리씩 숙이는 동작 — 공식 CCT 예(스플릿·런지)처럼 한쪽씩 (상필님 확인)');
    if(/토터치/.test(n)) return W('CCT', '정의', '대각선으로 한 다리씩 뻗는 런지 — 공식 CCT 예(런지)와 같은 집안 (상필님 확인)');
    if(/크랩워킹/.test(n)) return W('일반', '정의', '밴드 끼고 옆으로 걷기 — 몸통을 꼬지 않아 셋에 해당 근거 없음 (상필님 확인)');
    // ③ 셋 중 근거가 없는 것
    if(type === 'cardio') return W('일반', '정의', '유산소 — 셋 중 어디라고 한 적 없음 (접영만 BTT 예로 나와요)');
    if(tool === '회복') return W('일반', '정의', '스트레칭·호흡·이완 — 셋에 해당 근거 없음');
    if(/노드릭/.test(n)) return W('BTT', '정의', '양 무릎 꿇고 몸통을 같이 뒤로 — 한쪽으로 꼬지 않음 → BTT 정의 (상필님 확인)');
    if(/케틀벨스윙/.test(n)) return W('BTT', '정의', '양손으로 같이 휘두르는 힙힌지 — 한쪽으로 꼬지 않음 → BTT 정의');
    if(/힌지보조|고관절운동/.test(n)) return W('일반', '정의', '준비·보조 동작 — 셋에 해당 근거 없음');
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
      ${(r => r ? `<div><b>${esc(r.muscles)}</b> — ${esc(r.role)} (${esc(r.joint)}) <span class="xi-basis b-공식">${esc(r.ok || '짐작')}</span><br><span style="color:var(--ink-faint)">${esc(r.note)}</span></div>` : '')(roleOf(info.name))}
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
    const warm = `<div class="xh-chain"><span>내 몸풀기 (하체부터 · WGS · 점프)</span><i>→</i><span>케틀벨 암바</span><i>→</i><span>바디컨트롤</span></div>`;
    const ring = `<div class="xh-ring" style="grid-template-columns:1fr 18px 1fr 18px">${['BTT','CCT'].map((k,i)=>`<span class="xh-rk${k===th?' on':''}" style="--wk:${WECK[k].color}">${k}<small>${esc(WECK[k].kr)}</small></span>${i<1?'<i>↔</i>':'<i>↺</i>'}`).join('')}</div>`;
    const funnel = `<div class="xh-funnel">
      <div class="f1">선생님이 가르쳐주신 종목만</div>
      <div class="f2">그중 가장 오래 안 한 것</div>
      <div class="f3">이번 주에 아직 안 쓴 것</div>
      <div class="f4">✅ 오늘 종목</div></div>`;
    const knee = `<div class="xh-chain warn"><span>스쿼트 · 런지 · 레그프레스 · 달리기</span><i>→</i><span>⚠ 맨 아래로</span></div>`;
    const bar = `<div class="xh-bar"><span class="s1" style="flex:6">준비</span><span class="s2" style="flex:12">워밍업</span><span class="s3" style="flex:42">본 운동</span><span class="s4" style="flex:10">⏱</span></div>
      <div class="xh-bar-key"><span>0분</span><span>60분</span></div>`;
    return `<div class="xh">
      ${step(1, '📅', '요일은 선생님 표대로', week, '바뀌지 않아요 · 운동날은 <b>그날 관절의 가동성(늘리기 → 끝에서 버티기 → 끝에서 움직이기) + 그 부위 재활 + 선생님 근력</b> — 일 하체=무릎·고관절, 수 가슴·등=허리·등, 목 어깨·팔=어깨 · 코어는 <b>8초 버티고 2초 쉬기</b> · 회복날(월·토)은 <b>재활 4단계</b> 순서: ① 풀기(발바닥·마사지볼) → ② 늘리기(스트레칭·백년척추) → ③ 깨우기(T·W·Y·수건 잡기) → ④ 통합(선생님 동작·결·밸런스·코어 안티 모션) → 심폐 20분. 운동날 끝에도 코어 한 자리. 모두 한 시간 안')}
      ${step(2, '🔥', '운동하는 날 맨 앞엔 워밍업', warm, 'PT 날에도 붙여요')}
      ${step(3, '🔄', '이번 주 결 — BTT ↔ CCT 한 주씩 (RMT는 배우면 추가)', ring, '운동날·회복날 모두 ① 그 주 결의 기능성 한 자리가 들어가고 ② 다른 자리도 그 결에 맞는 종목을 먼저 골라요' + (th ? ` · 이번 주는 <b>${th}</b>` : ''))}
      ${step(4, '🎯', '자리는 그대로, 종목만 바꿔 넣기', funnel, '"가슴 주운동" 같은 자리는 고정 → 종목만 돌아가서 운동 편식이 없어요')}
      ${step(5, '🦵', '무릎은 내가 판단', `<div class="xh-chain"><span>스쿼트 · 런지 · 레그프레스도 제자리에</span><i>→</i><span>붓는 날은 직접 빼기</span></div>`, '무릎 자동 규칙은 꺼 두었어요 — 선생님이 중요하다고 한 런지·레그프레스를 정상으로 하기 위해')}
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
    .pm{margin:6px 0 2px;}
    .an{margin:0 0 10px;border:1px solid var(--border);border-radius:12px;background:rgba(255,255,255,.02);}
    .an>summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;padding:10px 12px;-webkit-tap-highlight-color:transparent;}
    .an>summary::-webkit-details-marker{display:none;}
    .an-title{font-size:13.5px;font-weight:700;color:var(--ink);} .an>summary small{flex:1;font-size:11px;color:var(--ink-dim);word-break:keep-all;}
    .an-more{font-size:11px;color:var(--accent-a);border:1px solid var(--accent-a-dim);border-radius:999px;padding:1px 9px;white-space:nowrap;}
    .an[open] .an-more{font-size:0;} .an[open] .an-more::before{content:'접기 ▴';font-size:11px;}
    .an-body-wrap{padding:0 12px 12px;display:flex;flex-direction:column;gap:10px;}
    .an-link{font-size:11.5px;color:var(--ink);line-height:1.5;background:var(--accent-b-dim);border-radius:8px;padding:8px 10px;word-break:keep-all;}
    .an-fig{margin:0;} .an-wrap{position:relative;display:block;background:#fff;border-radius:10px;overflow:hidden;}
    .an-wrap img{display:block;width:100%;height:auto;}
    .an-pin{position:absolute;transform:translate(-50%,-50%);width:22px;height:22px;border-radius:50%;border:2px solid #fff;color:#fff;font-size:11px;font-weight:800;line-height:1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.45);padding:0;font-family:inherit;}
    .an-pin.r{background:#D9534F;} .an-pin.g{background:#3FA35B;} .an-pin.p{background:#E8A33D;color:#1B1F23;}
    .an-fig figcaption{font-size:10px;color:var(--ink-faint);margin-top:3px;display:flex;flex-wrap:wrap;gap:4px 8px;} .an-fig .xi-credit{display:inline;width:auto;margin:0;}
    .an-legend{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:10.5px;color:var(--ink-dim);}
    .an-tip{font-size:10.5px;color:var(--ink-faint);word-break:keep-all;}
    .an-h{font-size:12px;font-weight:800;margin-top:4px;} .an-h.r{color:#E07A80;} .an-h.g{color:#7FC08A;} .an-h.p{color:var(--accent-a);}
    .an-m{display:grid;grid-template-columns:24px 1fr;gap:8px;padding:7px 8px;border-radius:9px;border:1px solid var(--border);border-left:4px solid;background:var(--surface);}
    .an-m.r{border-left-color:#D9534F;} .an-m.g{border-left-color:#3FA35B;} .an-m.p{border-left-color:#E8A33D;}
    .an-m.hit{box-shadow:0 0 0 2px var(--accent-a) inset;}
    .an-k{width:22px;height:22px;border-radius:50%;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px;}
    .an-m.r .an-k{background:#D9534F;} .an-m.g .an-k{background:#3FA35B;} .an-m.p .an-k{background:#E8A33D;color:#1B1F23;}
    .an-body{min-width:0;display:flex;flex-direction:column;gap:2px;font-size:11.5px;line-height:1.45;word-break:keep-all;}
    .an-n{font-size:12.5px;font-weight:700;color:var(--ink);} .an-n small{font-weight:400;color:var(--ink-faint);font-size:10px;margin-left:4px;}
    .an-where{color:var(--ink-dim);} .an-does{color:var(--ink);} .an-fix{color:var(--accent-b);}
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
    .tr-gc{font-size:12px;font-weight:700;color:var(--gc);min-width:26px;text-align:center;border:1px solid var(--gc);border-radius:999px;padding:1px 6px;}
    .tr-gc::after{content:' ▾';font-size:9px;} .tr-group[open]>summary .tr-gc::after{content:' ▴';}
    .tr-branch{position:relative;margin:6px 0 4px 16px;padding-left:16px;display:flex;flex-direction:column;gap:4px;}
    .tr-branch::before{content:'';position:absolute;left:0;top:-6px;bottom:12px;width:2px;background:var(--gc);opacity:.55;border-radius:2px;}
    .tr-sub{font-size:10.5px;font-weight:700;color:var(--gc);margin:6px 0 0 -4px;}
    .tr-leaf{position:relative;}
    .tr-leaf::before{content:'';position:absolute;left:-16px;top:15px;width:14px;height:2px;background:var(--gc);opacity:.55;}
    .tr-leaf>summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;padding:6px 10px;border-radius:9px;background:rgba(242,240,234,0.04);border:1px solid var(--border);-webkit-tap-highlight-color:transparent;}
    .tr-leaf[open]>summary{border-color:var(--gc);}
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
    .pf-gs{font-size:11.5px;color:var(--ink-faint);margin:2px 0 8px;}
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
  window.EXINFO = { SRC, WECK, BASIS, TOOLS, SIDES, SCIENCE, FIX, fixTip, fixHTML, MORNING, morningText, REHAB, rehabHTML, PHILO_DEFAULT, philoHTML, philoMiniHTML, philoFoldHTML, treeHTML, TREE, ANAT, anatHTML, MISSIONS, pickMission, vidHTML, ROLE, roleOf, IMG, imgOf, imgHTML, videoUrl, classify, chipsHTML, detailHTML, weckHTML, toolsHTML, howHTML, injectCSS };
})();
