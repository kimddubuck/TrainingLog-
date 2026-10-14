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

  // ----- 이름 → 기구 · 쪽 · 결 -----
  const norm = s => String(s || '').replace(/\s+/g, '');
  function toolOf(n, type){
    if(type === 'cardio') return '유산소';
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
    if(/플랭크|크런치|싯업|윗몸|레그레이즈|슈퍼맨|월싯/.test(n)) return W('일반', '공식', '버티는 코어 — WeckMethod 는 이걸 셋과 따로 "브레이싱 코어"라고 불러요');
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
      ${step(1, '📅', '요일은 선생님 표대로', week, '바뀌지 않아요')}
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

  window.EXINFO = { SRC, WECK, BASIS, TOOLS, SIDES, SCIENCE, classify, chipsHTML, detailHTML, weckHTML, toolsHTML, howHTML, injectCSS };
})();
