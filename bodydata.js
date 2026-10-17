// ===== 내 몸 상태 자료 =====
// 출처: 2022-12-28 바퍼 체형분석 결과지 (KIM EUN YOUNG) + 2026-10 증상
// 각도는 결과지 숫자 그대로. 숫자가 없는 항목(거북목, 머리 회전)은 보이게끔 작게 잡았다.
// 3D "근육 보기": 부위마다 보여 줄 근육 (모델 속 이름, 소문자·기호 제거) → 근육 지도(EXINFO.ANAT[part].muscles 의 k)
// 모델은 오른쪽만 있다 (leg-right.glb · shoulder-right.glb). 전체 보기의 왼쪽 근육은 오른쪽을 거울로 복사한 것.
// 신경은 EXINFO.ANAT[부위].nerves (이름·설명·근거) — 3D 파일은 nerves-leg-right.glb · nerves-shoulder-right.glb (⚡ 누를 때만 받음)
window.BODY_REGIONS = {
  // 어깨 모델(shoulder-right.glb)엔 '승모근 전체'·'삼각근 전체'·'큰가슴근 전체' 덩어리와 그 부분 덩어리가 같이 들어 있어 전체 덩어리는 숨긴다(hide)
  shoulder: { name:'어깨 · 목', lookFrom:2.6, camY:1.33, dist:1.35, hide:['trapeziusmuscle.r','deltoidmuscle.r','pectoralismajor.r'], groups:{
    1:['clavicularheadofpectoralismajormuscle.r','sternocostalheadofpectoralismajormuscle.r','abdominalheadofpectoralismajormuscle.r','pectoralisminormuscle.r'],
    2:['descendingpartoftrapeziusmuscle.r'],
    3:['levatorscapulae.r'],
    5:['latissimusdorsi.r'],
    6:['transversepartoftrapeziusmuscle.r','ascendingpartoftrapeziusmuscle.r'],
    7:['rhomboidmajormuscle.r','rhomboidminormuscle.r'],
    8:['serratusanteriormuscle.r'],
    10:['infraspinatusmuscle.r','supraspinatusmuscle.r','subscapularismuscle.r','teresminormuscle.r'],
  } },
  back: { name:'허리 · 골반 · 고관절', lookFrom:0.55, camY:0.92, dist:1.45, groups:{
    1:['psoasmajor.r','psoasminor.r','iliacusmuscle.r'],
    2:['rectusfemoris.r'],
    3:['tensorfasciaelatae.r'],
    5:['piriformismuscle.r'],
    6:['gluteusmaximusmuscle.r'],
    7:['gluteusmediusmuscle.r','gluteusminimusmuscle.r'],
    9:['semitendinosusmuscle.r','semimembranosusmuscle.r','longheadofbicepsfemoris.r'],
  } },
  knee: { name:'무릎 · 발목 · 발', lookFrom:0.4, camY:0.42, dist:1.55, groups:{
    1:['adductorlongus.r','adductormagnus.r','adductorbrevis.r','gracilismuscle.r','pectineusmuscle.r'],
    2:['tensorfasciaelatae.r'],
    3:['medialheadofgastrocnemius.r','lateralheadofgastrocnemius.r','soleusmuscle.r'],
    4:['shortheadofbicepsfemoris.r','longheadofbicepsfemoris.r'],
    5:['gluteusmediusmuscle.r','gluteusminimusmuscle.r'],
    6:['vastusmedialismuscle.r'],
    7:['tibialisanteriormuscle.r','tibialisposteriormuscle.r'],
    8:['plantaraponeurosis.r','abductorhallucis.r','flexordigitorumbrevis.r'],
    9:['pesanserinuscommontendon.r'],
  } },
};
window.BODY_DATA = {
  measuredAt: '2022-12-28',
  findings: {
    headTiltRight: 2,      // 머리 오른쪽으로 2° 기울기
    headRotLeft: 8,        // 머리 왼쪽으로 회전 (각도 미기재)
    forwardHead: 6,        // 거북목 (각도 미기재)
    shoulderLeftUp: 4,     // 왼쪽 빗장뼈 4° 올라감
    shoulderRightUp: 2,    // 오른쪽 빗장뼈 2° 올라감
    roundShoulder: 2,      // 둥근어깨 2번, 2° 전방경사
    roundBack: 5,          // 굽은등
    elbowFlex: 4,          // 팔꿈치 4° 굽힘
    leftElbowIn: 5,        // 왼팔꿈치가 안쪽을 봄
    pelvisTiltFwd: 6.5,    // 골반 전방경사 6.5° 초과
    pelvisRightLow: 3,     // 오른쪽 ASIS 3° 낮음
    rightHipExtRot: 5,     // 오른쪽 고관절 바깥돌림 (2.5° 모음 + 바깥돌림)
    rightKneeExtRot: 6,    // 오른쪽 무릎 바깥돌림
    rightKneeLow: 4,       // 오른쪽 무릎이 왼쪽보다 4° 낮음
    kneeFlex: 4,           // 굽힘 무릎 4°
    rightFootOut: 8,       // 오른쪽 발끝 바깥 회전
    leftKneeIntRot: 4,     // 왼쪽 무릎 안쪽돌림
    leftAnkleCollapse: 3,  // 왼쪽 발목 안쪽으로 무너짐
  },
  // 표시점. x: 몸의 오른쪽이 음수(-), y: 발바닥 0 · 골반 0.95 · 어깨 1.42 · 머리 1.70, z: 앞이 양수(+)
  // view: 그 자리가 잘 보이는 회전 각 (0 앞 · π/2 오른쪽 · π 뒤 · -π/2 왼쪽)
  // muscles: 색을 입힐 근육 이름 (body3d.js 등록부). 관절·뼈 자리는 점만 찍는다
  markers: [
    { kind:'pain',     name:'오른쪽 무릎 안쪽',   note:'욱신, 접으면 불편 · 붓기 · 달리면 아픔 → 1~2주 안에 정형외과',
      x:-0.06, y:0.53, z:0.06, view:0.6 },
    { kind:'pain',     name:'오른쪽 허리 아래', muscles:['R_erector'], note:'욱신 · (추론) 골반 앞기울기로 L4·L5 뒤쪽이 눌림',
      x:-0.07, y:1.08, z:-0.12, view:Math.PI },
    { kind:'release',  name:'오른쪽 고관절 앞 (장요근)', muscles:['R_iliopsoas'], note:'불편 · 런지로 펴면 시원 → 풀어줄 곳',
      x:-0.11, y:0.97, z:0.1, view:0.4 },
    { kind:'release',  name:'오른쪽 허벅지 안쪽 (내전근)', muscles:['R_adductor'], note:'신경이 지나는 터널 · 선생님 내전근 스트레칭',
      x:-0.05, y:0.76, z:0.04, view:0.3 },
    { kind:'release',  name:'오른쪽 엉덩이 (이상근)', muscles:['R_piriformis'], note:'오래 앉으면 저림 · 테니스공으로 풀면 시원',
      x:-0.12, y:0.88, z:-0.1, view:Math.PI - 0.5 },
    { kind:'release',  name:'오른쪽 종아리', muscles:['R_gastroc','R_soleus'], note:'항상 뭉침 · (추론) 엉덩이가 약해 종아리가 과로',
      x:-0.09, y:0.3, z:-0.06, view:Math.PI - 0.4 },
    { kind:'release',  name:'목 (거북목)', muscles:['scm','upperTrap'], note:'목뼈 왼쪽 볼록 · 머리 오른쪽 2° 기울기',
      x:0.03, y:1.5, z:0.06, view:Math.PI/2 },   // 목 앞 (예전엔 1.6 이라 눈 자리에 찍혔다)
    { kind:'release',  name:'어깨 (둥근어깨·굽은등)', muscles:['L_pec','R_pec'], note:'둥근어깨 2번 · 양쪽 올라감(왼쪽 더) · 굽은등',
      x:0.17, y:1.43, z:0.03, view:-Math.PI/2 },
    { kind:'strength', name:'골반 (전방경사 6.5°)', note:'오른쪽 ASIS 3° 낮음 · 허리 과한 앞굽음 → 엉덩이·깊은 복근으로 세우기',
      x:0.11, y:0.98, z:0.09, view:-0.4 },
    { kind:'strength', name:'엉덩이 (둔근)', muscles:['L_glute','R_glute'], note:'골반을 세우는 힘 · 글루트 브릿지·힙 쓰러스트',
      x:0.08, y:0.86, z:-0.11, view:Math.PI + 0.3 },
    { kind:'strength', name:'깊은 복근', muscles:['abs'], note:'악어호흡 · 바디컨트롤 전면 코어',
      x:0, y:1.1, z:0.08, view:0 },
    { kind:'strength', name:'오른쪽 무릎 안쪽 근육 (내측광근)', muscles:['R_vastusMed'], note:'무릎이 안으로 쏠리지 않게 잡아주는 힘',
      x:-0.06, y:0.6, z:0.07, view:0.5 },
    { kind:'release',  name:'왼쪽 발목',          note:'안쪽으로 약간 무너짐 · 왼쪽 무릎 안쪽돌림',
      x:0.1, y:0.09, z:0.02, view:-0.6 },
    { kind:'release',  name:'오른쪽 발끝',        note:'바깥으로 회전 · 고관절 바깥돌림과 한 줄',
      x:-0.1, y:0.03, z:0.15, view:0.6 },
  ],
};
