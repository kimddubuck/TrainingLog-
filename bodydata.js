// ===== 내 몸 상태 자료 =====
// 출처: 2022-12-28 바퍼 체형분석 결과지 (KIM EUN YOUNG) + 2026-10 증상
// 각도는 결과지 숫자 그대로. 숫자가 없는 항목(거북목, 머리 회전)은 보이게끔 작게 잡았다.
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
      x:0, y:1.6, z:0.08, view:Math.PI/2 },
    { kind:'release',  name:'어깨 (둥근어깨·굽은등)', muscles:['L_pec','R_pec'], note:'둥근어깨 2번 · 양쪽 올라감(왼쪽 더) · 굽은등',
      x:0.19, y:1.49, z:0.03, view:-Math.PI/2 },
    { kind:'strength', name:'골반 (전방경사 6.5°)', note:'오른쪽 ASIS 3° 낮음 · 허리 과한 앞굽음 → 엉덩이·깊은 복근으로 세우기',
      x:0.11, y:0.98, z:0.09, view:-0.4 },
    { kind:'strength', name:'엉덩이 (둔근)', muscles:['L_glute','R_glute'], note:'골반을 세우는 힘 · 글루트 브릿지·힙 쓰러스트',
      x:0.08, y:0.86, z:-0.11, view:Math.PI + 0.3 },
    { kind:'strength', name:'깊은 복근', muscles:['abs'], note:'악어호흡 · 바디컨트롤 전면 코어',
      x:0, y:1.1, z:0.1, view:0 },
    { kind:'strength', name:'오른쪽 무릎 안쪽 근육 (내측광근)', muscles:['R_vastusMed'], note:'무릎이 안으로 쏠리지 않게 잡아주는 힘',
      x:-0.06, y:0.6, z:0.07, view:0.5 },
    { kind:'release',  name:'왼쪽 발목',          note:'안쪽으로 약간 무너짐 · 왼쪽 무릎 안쪽돌림',
      x:0.1, y:0.09, z:0.02, view:-0.6 },
    { kind:'release',  name:'오른쪽 발끝',        note:'바깥으로 회전 · 고관절 바깥돌림과 한 줄',
      x:-0.1, y:0.03, z:0.15, view:0.6 },
  ],
  // ----- 해부 그림 (AI 일러스트) 위에 얹을 것들. 좌표는 그림 너비·높이에 대한 비율(0~1), 그림 왼쪽이 내 오른쪽 -----
  // lines: plumb(수직 추선) · pair(두 관절: 수평 기준 + 실제 선) · seg(그냥 선). label 은 그림 바깥 여백(side L/R)에, to 는 가리키는 점
  // marks: i = 위 markers 번호, x·y = 그림 위 자리. 뒤·옆에서만 보이는 점은 그 방향 그림이 생기면 넣는다
  illu: { views: {
    front: { src:'img/body-front.webp', w:354, h:1024,
      lines: [
        { kind:'plumb', x:0.505 },
        { kind:'seg',  a:[0.483, 0.015], b:[0.517, 0.125],
          label:'머리 오른쪽 2° 기울기\n거북목', side:'L', ly:0.05, to:[0.483, 0.03] },
        { kind:'pair', a:[0.29, 0.195], b:[0.78, 0.177],
          label:'어깨 왼 4°↑\n오른 2°↑', side:'R', ly:0.16, to:[0.78, 0.177] },
        { kind:'pair', a:[0.27, 0.44], b:[0.72, 0.416],
          label:'골반 오른쪽 3° 낮음\n앞기울기 6.5°', side:'L', ly:0.40, to:[0.27, 0.44] },
        { label:'오른 무릎 4° 낮음\n(그림은 든 자세)', side:'L', ly:0.58, to:[0.30, 0.53] },
      ],
      marks: [
        { i:0,  x:0.31, y:0.545 },   // 오른쪽 무릎 안쪽
        { i:2,  x:0.33, y:0.44 },    // 장요근
        { i:3,  x:0.42, y:0.52 },    // 내전근
        { i:6,  x:0.52, y:0.16 },    // 목
        { i:7,  x:0.63, y:0.24 },    // 어깨(둥근어깨 → 가슴)
        { i:8,  x:0.70, y:0.43 },    // 골반
        { i:10, x:0.57, y:0.40 },    // 깊은 복근
        { i:11, x:0.38, y:0.485 },    // 내측광근
        { i:12, x:0.57, y:0.915 },   // 왼쪽 발목
        { i:13, x:0.33, y:0.78 },    // 오른쪽 발끝
      ] },
    // right: { src:'img/body-right.webp', ... }  ← 옆모습 그림이 오면
    // back:  { src:'img/body-back.webp',  ... }  ← 뒷모습 그림이 오면
  } },
};
