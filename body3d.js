// ===== 내 몸 상태 3D (해부도 스타일) =====
// 2022-12-28 체형분석 사진·수치 + 지금 증상을 근육이 보이는 사람(에코르셰) 위에 표시한다.
// 비율(어깨 너비·허리·팔다리 길이·굵기)은 체형분석 정면 사진에서 재서 맞췄다.
// 근육은 하나하나 덩어리로 만들고, 풀어줄 근육·힘 기를 근육은 그 근육 자체에 색을 입힌다.
// 어깨·골반·무릎에는 수평 기준선(흰 점선)과 실제 기울어진 선(빨강)을 겹쳐 어디가 틀어졌는지 보여준다.
// three.js 를 쓴다. 손가락/마우스로 끌면 돌아가고, 아래 목록을 누르면 그 자리로 돌아간다.
// 기울기·돌림은 눈에 보이게 3배 과장했다 (화면에 "과장"이라고 적어 둔다).
(function(){
  const EXAG = 3;   // 각도 과장 배수
  const deg = d => d * Math.PI / 180;

  // 색: 빨강=지금 아픈 곳, 주황=풀어줄 곳(뭉친 근육), 초록=힘 기를 곳
  const COLOR = { pain:0xE05A4F, release:0xE8A33D, strength:0x4FA8A0,
                  deep:0x5E2A26, bone:0xD9CDBA, tendon:0xE6DCC9 };
  const MUSCLE = [0xA8433B, 0xB24B42, 0x9D3D36];   // 근육 살색 (조금씩 다르게)
  let mi = 0;
  const FLAT = 0.64;  // 몸통은 앞뒤가 옆보다 납작하다 (앞뒤/좌우 비율)

  // 근육 등록부: 이름 → 덩어리들. 표시점이 이 이름을 가리키면 그 근육에 색을 입힌다.
  const REG = {};
  function reg(key, m){ (REG[key] = REG[key] || []).push(m); return m; }

  function mat(color, opacity){
    return new THREE.MeshStandardMaterial({ color, roughness:0.72, metalness:0.02,
      transparent: opacity != null, opacity: opacity == null ? 1 : opacity });
  }
  function sph(r, color){
    return new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), mat(color));
  }
  // 타원 덩어리 (근육 하나). rx·ry·rz 는 반지름
  function ell(rx, ry, rz, color){
    const m = sph(1, color == null ? MUSCLE[(mi++) % MUSCLE.length] : color);
    m.scale.set(rx, ry, rz);
    return m;
  }
  function put(m, x, y, z, rx, ry, rz){
    m.position.set(x, y, z);
    if(rx || ry || rz) m.rotation.set(rx || 0, ry || 0, rz || 0);
    return m;
  }
  // 위아래 반지름이 다른 둥근 기둥 (뼈·깊은 조직). 양 끝은 공으로 덮어 매끈하게.
  function limb(rTop, rBot, len, color){
    const g = new THREE.Group();
    const c = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, len, 24), mat(color));
    c.position.y = -len / 2;
    const a = sph(rTop, color); a.position.y = 0;
    const b = sph(rBot, color); b.position.y = -len;
    g.add(c, a, b);
    return g;
  }
  // 옆모습 선(반지름, 높이)을 돌려 만든 덩어리 (몸통 속)
  function lathe(points, color){
    const pts = points.map(p => new THREE.Vector2(p[0], p[1]));
    const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 36), mat(color));
    m.scale.z = FLAT;
    return m;
  }

  // ----- 사람 만들기 (키 1.75, 발바닥이 y=0) -----
  // 사진에서 잰 높이: 어깨 1.42 · 가슴 1.26 · 배꼽 1.07 · 허리띠 1.03 · 가랑이 0.87 · 무릎 0.53 · 발목 0.10
  // 사진에서 잰 너비: 어깨 0.42 · 가슴 0.33 · 허리 0.27 · 골반 0.31 · 허벅지 0.16 · 종아리 0.11
  function buildBody(F){
    const body = new THREE.Group();
    const J = {};   // 관절 위치 (기준선 그릴 때 쓴다) — 몸 좌표

    // 골반 그룹 (허리띠 높이). 기울기는 골반 덩어리에만 준다 — 그룹에 주면 사람이 통째로 기운다
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.95;
    const hipBone = put(ell(0.16, 0.1, 0.09, COLOR.bone), 0, -0.06, 0);
    hipBone.rotation.x = deg(F.pelvisTiltFwd * EXAG * 0.6) * -1;   // 앞으로 기울기
    hipBone.rotation.z = deg(F.pelvisRightLow * EXAG);              // 오른쪽(화면 왼쪽)이 내려감
    pelvis.add(hipBone);
    // 엉덩이 근육(둔근) 좌우
    pelvis.add(reg('L_glute', put(ell(0.085, 0.09, 0.06), 0.085, -0.08, -0.075, 0, 0, deg(-10))));
    pelvis.add(reg('R_glute', put(ell(0.085, 0.09, 0.06), -0.085, -0.08, -0.075, 0, 0, deg(10))));
    // 이상근 — 엉덩이 깊은 곳, 살짝 보이게
    pelvis.add(reg('R_piriformis', put(ell(0.05, 0.022, 0.03), -0.07, -0.03, -0.1, 0, 0, deg(25))));
    pelvis.add(reg('L_piriformis', put(ell(0.05, 0.022, 0.03), 0.07, -0.03, -0.1, 0, 0, deg(-25))));
    // 장요근 — 골반 앞에서 허벅지로 내려오는 끈
    pelvis.add(reg('R_iliopsoas', put(ell(0.028, 0.09, 0.025), -0.06, -0.04, 0.075, deg(10), 0, deg(-12))));
    pelvis.add(reg('L_iliopsoas', put(ell(0.028, 0.09, 0.025), 0.06, -0.04, 0.075, deg(10), 0, deg(12))));
    body.add(pelvis);
    const ASIS_Y = 0.95 - 0.02;
    J.pelvisL = [ 0.12, ASIS_Y + 0.12 * Math.tan(deg(F.pelvisRightLow * EXAG)), 0.1];
    J.pelvisR = [-0.12, ASIS_Y - 0.12 * Math.tan(deg(F.pelvisRightLow * EXAG)), 0.1];

    // 몸통 — 속은 어두운 덩어리, 그 위에 근육을 붙인다
    const torso = new THREE.Group();
    const trunk = lathe([
      [0, 0.06], [0.125, 0.06], [0.13, 0.12], [0.135, 0.18], [0.14, 0.26], [0.155, 0.33],
      [0.165, 0.40], [0.18, 0.46], [0.19, 0.49], [0.16, 0.52], [0.09, 0.54], [0.06, 0.56], [0, 0.56],
    ], COLOR.deep);
    trunk.rotation.x = deg(-F.pelvisTiltFwd * EXAG * 0.15);   // 허리 과한 앞굽음 (살짝 젖힘)
    torso.add(trunk);
    torso.rotation.x = deg(F.roundBack * EXAG * 0.3);          // 굽은등: 윗몸을 앞으로 조금
    // 앞: 가슴(대흉근)
    torso.add(reg('L_pec', put(ell(0.095, 0.062, 0.035), 0.09, 0.40, 0.08, 0, 0, deg(-12))));
    torso.add(reg('R_pec', put(ell(0.095, 0.062, 0.035), -0.09, 0.40, 0.08, 0, 0, deg(12))));
    // 앞: 복직근 (여섯 조각)
    [0.30, 0.235, 0.17, 0.105].forEach((y, i)=>{
      torso.add(reg('abs', put(ell(0.036, 0.032, 0.02), 0.04, y, 0.082)));
      torso.add(reg('abs', put(ell(0.036, 0.032, 0.02), -0.04, y, 0.082)));
    });
    // 옆: 외복사근
    torso.add(reg('L_oblique', put(ell(0.045, 0.1, 0.03), 0.105, 0.2, 0.035, 0, 0, deg(-15))));
    torso.add(reg('R_oblique', put(ell(0.045, 0.1, 0.03), -0.105, 0.2, 0.035, 0, 0, deg(15))));
    // 뒤: 승모근 (위·아래), 광배근, 척추기립근
    torso.add(reg('upperTrap', put(ell(0.16, 0.07, 0.03), 0, 0.5, -0.07)));
    torso.add(reg('upperTrap', put(ell(0.055, 0.1, 0.03), 0, 0.6, -0.03)));
    torso.add(reg('L_lat', put(ell(0.07, 0.15, 0.03), 0.105, 0.3, -0.07, 0, 0, deg(18))));
    torso.add(reg('R_lat', put(ell(0.07, 0.15, 0.03), -0.105, 0.3, -0.07, 0, 0, deg(-18))));
    torso.add(reg('L_erector', put(ell(0.027, 0.2, 0.025), 0.03, 0.24, -0.082)));
    torso.add(reg('R_erector', put(ell(0.027, 0.2, 0.025), -0.03, 0.24, -0.082)));
    pelvis.add(torso);

    // 어깨 — 삼각근. 양쪽 올라감, 왼쪽이 더. 둥근어깨는 앞으로
    const shoulders = new THREE.Group();
    shoulders.position.set(0, 0.47, F.roundShoulder * 0.008 * EXAG);
    const shLy = F.shoulderLeftUp  * 0.0035 * EXAG, shRy = F.shoulderRightUp * 0.0035 * EXAG;
    shoulders.add(reg('L_deltoid', put(ell(0.065, 0.07, 0.06), 0.19, shLy, 0)));
    shoulders.add(reg('R_deltoid', put(ell(0.065, 0.07, 0.06), -0.19, shRy, 0)));
    // 빗장뼈
    shoulders.add(put(ell(0.17, 0.012, 0.012, COLOR.bone), 0, 0.03, 0.07));
    torso.add(shoulders);
    J.shoulderL = [ 0.205, 0.95 + 0.47 + shLy, 0.08];
    J.shoulderR = [-0.205, 0.95 + 0.47 + shRy, 0.08];

    // 목·머리 — 거북목(앞으로), 오른쪽 2° 기울기, 왼쪽 회전
    const neck = limb(0.045, 0.052, 0.12, COLOR.deep);
    neck.position.set(0, 0.64, F.forwardHead * 0.0015 * EXAG);
    neck.rotation.x = deg(F.forwardHead * EXAG * 0.6);
    // 흉쇄유돌근 (목 앞 비스듬한 끈)
    neck.add(reg('scm', put(ell(0.014, 0.065, 0.014), 0.03, -0.06, 0.035, deg(-8), 0, deg(-18))));
    neck.add(reg('scm', put(ell(0.014, 0.065, 0.014), -0.03, -0.06, 0.035, deg(-8), 0, deg(18))));
    torso.add(neck);
    const head = new THREE.Group();
    head.position.set(0, 0.75, F.forwardHead * 0.003 * EXAG);
    const skull = sph(0.095, COLOR.bone); skull.scale.set(0.9, 1.18, 1); head.add(skull);
    const jaw = put(ell(0.07, 0.05, 0.075, COLOR.bone), 0, -0.07, 0.01); head.add(jaw);
    const faceM = put(ell(0.06, 0.045, 0.03), 0, -0.04, 0.075); head.add(faceM);   // 볼·턱 근육
    const eyeL = put(sph(0.013, 0x3A2A28), 0.035, 0.015, 0.082); head.add(eyeL);
    const eyeR = put(sph(0.013, 0x3A2A28), -0.035, 0.015, 0.082); head.add(eyeR);
    head.rotation.z = deg(F.headTiltRight * EXAG) * -1;   // 오른쪽으로 기울기
    head.rotation.y = deg(F.headRotLeft * EXAG);          // 왼쪽으로 회전
    torso.add(head);
    J.headTop = 0.95 + 0.75 + 0.112; J.headY = 0.95 + 0.75;
    J.headTilt = -F.headTiltRight * EXAG;

    // 팔 — 어깨 1.42 → 팔꿈치 1.13 → 손목 0.84 → 손끝 0.79. 왼팔꿈치가 안쪽을 봄, 팔꿈치 4° 굽힘
    function arm(side){
      const L = side === 'L';
      const g = new THREE.Group();
      g.position.set(L ? 0.205 : -0.205, 0.47 + (L ? shLy : shRy), 0);
      g.add(limb(0.034, 0.03, 0.3, COLOR.deep));
      g.add(reg(side + '_biceps',  put(ell(0.03, 0.1, 0.03),  0, -0.14,  0.028)));
      g.add(reg(side + '_triceps', put(ell(0.03, 0.11, 0.03), 0, -0.15, -0.028)));
      const el = new THREE.Group(); el.position.y = -0.3;
      el.add(put(sph(0.03, COLOR.bone), 0, 0, -0.01));
      el.add(limb(0.028, 0.02, 0.29, COLOR.deep));
      el.add(reg(side + '_forearm', put(ell(0.026, 0.1, 0.024), 0, -0.1, 0.018)));
      el.add(reg(side + '_forearm', put(ell(0.024, 0.1, 0.022), 0, -0.12, -0.018)));
      const hand = put(ell(0.03, 0.045, 0.016, COLOR.tendon), 0, -0.33, 0); el.add(hand);
      el.rotation.x = deg(-F.elbowFlex * EXAG * 0.5);
      g.add(el);
      g.rotation.z = L ? deg(-5) : deg(5);
      if(L) g.rotation.y = deg(F.leftElbowIn * EXAG);
      return g;
    }
    torso.add(arm('L'), arm('R'));

    // 다리 — 고관절 0.90 → 무릎 0.53 → 발목 0.10. 오른쪽: 고관절·무릎·발끝 바깥돌림 / 왼쪽: 무릎 안쪽돌림·발목 안으로
    function leg(side){
      const R = side === 'R';
      const sx = R ? -1 : 1;    // 바깥쪽 방향
      const g = new THREE.Group();
      g.position.set(R ? -0.09 : 0.09, -0.05, 0);
      g.add(limb(0.065, 0.05, 0.37, COLOR.deep));
      // 허벅지 앞: 대퇴직근 · 외측광근 · 내측광근
      g.add(reg(side + '_rectusFem', put(ell(0.04, 0.16, 0.035), 0, -0.17, 0.045)));
      g.add(reg(side + '_vastusLat', put(ell(0.036, 0.15, 0.04), sx * 0.045, -0.2, 0.015)));
      g.add(reg(side + '_vastusMed', put(ell(0.034, 0.08, 0.034), -sx * 0.035, -0.28, 0.035)));
      // 허벅지 안: 내전근
      g.add(reg(side + '_adductor', put(ell(0.032, 0.15, 0.03), -sx * 0.045, -0.15, 0.0)));
      // 허벅지 뒤: 햄스트링 두 가닥
      g.add(reg(side + '_hamstring', put(ell(0.04, 0.16, 0.038), -sx * 0.015, -0.18, -0.045)));
      g.add(reg(side + '_hamstring', put(ell(0.03, 0.15, 0.03), sx * 0.04, -0.19, -0.04)));
      // 무릎
      const knee = new THREE.Group(); knee.position.y = -0.37;
      knee.add(sph(0.05, COLOR.deep));
      knee.add(put(ell(0.03, 0.036, 0.02, COLOR.bone), 0, 0, 0.052));   // 무릎뼈
      // 종아리: 앞정강근 · 비복근(두 머리) · 가자미근 · 아킬레스건
      knee.add(limb(0.045, 0.028, 0.43, COLOR.deep));
      knee.add(reg(side + '_tibialis', put(ell(0.024, 0.14, 0.024), sx * 0.012, -0.15, 0.036)));
      knee.add(reg(side + '_gastroc', put(ell(0.03, 0.11, 0.034), 0.024, -0.11, -0.038)));
      knee.add(reg(side + '_gastroc', put(ell(0.03, 0.11, 0.034), -0.024, -0.11, -0.038)));
      knee.add(reg(side + '_soleus', put(ell(0.03, 0.1, 0.028), 0, -0.24, -0.03)));
      knee.add(put(ell(0.012, 0.06, 0.012, COLOR.tendon), 0, -0.37, -0.028));
      const ankle = new THREE.Group(); ankle.position.y = -0.43;
      ankle.add(put(ell(0.05, 0.021, 0.125, COLOR.tendon), 0, -0.035, 0.065));
      knee.add(ankle);
      g.add(knee);
      if(R){
        g.rotation.y    = deg(-F.rightHipExtRot * EXAG);    // 고관절 바깥돌림
        knee.rotation.y = deg(-F.rightKneeExtRot * EXAG);   // 무릎 바깥돌림
        knee.rotation.x = deg(F.kneeFlex * EXAG * 0.6);     // 굽힘 무릎
        ankle.rotation.y = deg(-F.rightFootOut * EXAG);     // 발끝 바깥
        g.position.y -= F.rightKneeLow * 0.004 * EXAG;      // 오른 무릎이 낮음
      }else{
        knee.rotation.y = deg(F.leftKneeIntRot * EXAG);     // 무릎 안쪽돌림
        ankle.rotation.z = deg(F.leftAnkleCollapse * EXAG); // 발목 안으로 무너짐
      }
      return g;
    }
    pelvis.add(leg('L'), leg('R'));
    J.kneeL = [ 0.09, 0.53, 0.07];
    J.kneeR = [-0.09, 0.53 - F.rightKneeLow * 0.004 * EXAG, 0.07];

    return { body, J };
  }

  // ----- 기준선: 수직 추선 + 어깨·골반·무릎 수평선 -----
  function textSprite(text, color){
    // 글자 길이에 맞춰 캔버스 너비를 정한다 (고정 너비면 긴 글이 잘린다)
    const FONT = '600 44px system-ui, -apple-system, "Noto Sans KR", sans-serif';
    const c = document.createElement('canvas');
    let x = c.getContext('2d'); x.font = FONT;
    const w = Math.ceil(x.measureText(text).width + 40);
    c.width = w; c.height = 96;
    x = c.getContext('2d'); x.font = FONT;   // 크기를 바꾸면 설정이 지워지므로 다시
    x.fillStyle = 'rgba(20,24,28,0.82)';
    x.beginPath(); x.roundRect ? x.roundRect(0, 6, w, 84, 18) : x.rect(0, 6, w, 84); x.fill();
    x.fillStyle = color; x.textBaseline = 'middle'; x.fillText(text, 20, 50);
    const tex = new THREE.CanvasTexture(c); tex.minFilter = THREE.LinearFilter;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    const h = 0.1;
    s.scale.set(h * w / 96, h, 1);
    s.center.set(0, 0.5);   // 왼쪽 끝을 기준으로 놓는다
    s.renderOrder = 20;
    return s;
  }
  function buildLines(F, J){
    const g = new THREE.Group();
    const refMat = new THREE.LineDashedMaterial({ color:0xFFFFFF, dashSize:0.03, gapSize:0.02, transparent:true, opacity:0.5, depthTest:false });
    const tiltMat = new THREE.LineBasicMaterial({ color:0xFF5A4A, depthTest:false });
    function line(a, b, m){
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
      const l = new THREE.Line(geo, m); l.computeLineDistances(); l.renderOrder = 10; return l;
    }
    // 수직 추선 (귀·어깨·골반·무릎·발목이 한 줄에 있어야 한다)
    g.add(line([0, 0, 0], [0, J.headTop + 0.06, 0], refMat));
    // 머리 기울기: 머리 가운데 세로선
    const ht = deg(J.headTilt), hl = 0.13;
    // (머리는 z축으로 -기울기 만큼 돌아가 있으니, 위쪽 끝은 (-sin, cos) 방향)
    g.add(line([ Math.sin(ht)*hl, J.headY - Math.cos(ht)*hl, 0],
               [-Math.sin(ht)*hl, J.headY + Math.cos(ht)*hl, 0], tiltMat));
    // 어깨·골반·무릎: 흰 점선(수평) 위에 실제 선(빨강)
    function pair(L, R, label){
      const y = (L[1] + R[1]) / 2, z = L[2];
      g.add(line([L[0] + 0.12, y, z], [R[0] - 0.12, y, z], refMat));
      g.add(line([L[0] + 0.1, L[1], z], [R[0] - 0.1, R[1], z], tiltMat));
      const s = textSprite(label, '#FFD9D2'); s.position.set(L[0] + 0.14, L[1] + 0.07, z); g.add(s);
    }
    pair(J.shoulderL, J.shoulderR, `어깨 왼 ${F.shoulderLeftUp}°↑ 오른 ${F.shoulderRightUp}°↑`);
    pair(J.pelvisL, J.pelvisR, `골반 오른쪽 ${F.pelvisRightLow}° 낮음`);
    pair(J.kneeL, J.kneeR, `오른 무릎 ${F.rightKneeLow}° 낮음`);
    const hs = textSprite(`머리 오른쪽 ${F.headTiltRight}° 기울기 · 거북목`, '#FFD9D2');
    hs.position.set(0.14, J.headTop + 0.02, 0); g.add(hs);
    const ps = textSprite(`골반 앞기울기 ${F.pelvisTiltFwd}°`, '#FFD9D2');
    ps.position.set(0.16, 0.95 - 0.14, 0.12); g.add(ps);
    return g;
  }

  // ----- 표시점 -----
  function addMarkers(body, markers){
    const list = [];
    markers.forEach(m=>{
      const s = sph(0.02, COLOR[m.kind] || COLOR.pain);
      s.material.emissive = new THREE.Color(COLOR[m.kind] || COLOR.pain);
      s.material.emissiveIntensity = 0.45;
      s.material.depthTest = false; s.renderOrder = 15;
      s.position.set(m.x, m.y, m.z);
      s.userData = m;
      body.add(s);
      list.push(s);
      // 가리키는 근육에 색 입히기
      const target = new THREE.Color(COLOR[m.kind] || COLOR.pain);
      (m.muscles || []).forEach(k => (REG[k] || []).forEach(mesh=>{
        mesh.material.color.lerp(target, 0.8);
        mesh.material.emissive = target.clone(); mesh.material.emissiveIntensity = 0.12;
        mesh.userData.marked = true;
      }));
    });
    return list;
  }

  // ----- 화면 -----
  window.initBody3D = function(mountId, DATA){
    const mount = document.getElementById(mountId);
    if(!mount || mount.dataset.ready) return;
    mount.dataset.ready = '1';
    const W = mount.clientWidth || 340, H = Math.max(380, Math.round(W * 1.15));

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 20);
    camera.position.set(0, 1.05, 3.9);
    camera.lookAt(0, 0.98, 0);

    scene.add(new THREE.HemisphereLight(0xFFF4E8, 0x334, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.8); key.position.set(2, 3, 2.5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xDDE8FF, 0.35); fill.position.set(-2, 1, -2); scene.add(fill);

    // 바닥 원
    const floor = new THREE.Mesh(new THREE.CircleGeometry(0.55, 48), mat(0x2C333A, 0.9));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001; scene.add(floor);

    const { body, J } = buildBody(DATA.findings);
    const markers = addMarkers(body, DATA.markers);
    const lines = buildLines(DATA.findings, J);
    body.add(lines);
    scene.add(body);

    // ----- 돌리기 (끌기 / 터치) -----
    let rotY = 0, rotX = 0, targetY = 0, targetX = 0, dragging = false, lastX = 0, lastY = 0, auto = true;
    const el = renderer.domElement;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e=>{ dragging = true; auto = false; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e=>{
      if(!dragging) return;
      targetY += (e.clientX - lastX) * 0.012;
      targetX = Math.max(-0.6, Math.min(0.6, targetX + (e.clientY - lastY) * 0.006));
      lastX = e.clientX; lastY = e.clientY;
    });
    el.addEventListener('pointerup', ()=>{ dragging = false; });
    el.addEventListener('pointercancel', ()=>{ dragging = false; });

    function view(name){
      auto = false;
      targetX = 0;
      targetY = { front:0, right:Math.PI/2, back:Math.PI, left:-Math.PI/2 }[name] || 0;
      if(name === 'top'){ targetX = 0.6; }
    }
    window.body3dView = view;
    window.body3dAuto = ()=>{ auto = !auto; return auto; };
    window.body3dLines = ()=>{ lines.visible = !lines.visible; return lines.visible; };

    // 목록을 누르면 그 표시점이 보이는 각도로 + 깜빡임 (점과 그 근육이 같이)
    let blink = null, blinkT = 0, blinkMeshes = [];
    window.body3dFocus = function(i){
      const m = markers[i]; if(!m) return;
      auto = false;
      targetY = m.userData.view || 0; targetX = 0;
      if(blink){ blink.scale.set(1,1,1); blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.12); }
      blink = m; blinkT = 0;
      blinkMeshes = [].concat(...(m.userData.muscles || []).map(k => REG[k] || []));
    };

    let last = performance.now();
    function tick(now){
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if(auto) targetY += dt * 0.35;
      rotY += (targetY - rotY) * 0.12;
      rotX += (targetX - rotX) * 0.12;
      body.rotation.y = rotY; body.rotation.x = rotX;
      if(blink){
        blinkT += dt;
        const p = Math.abs(Math.sin(blinkT * 6));
        const s = 1 + 0.7 * p;
        blink.scale.set(s, s, s);
        blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.12 + 0.7 * p);
        if(blinkT > 2.5){
          blink.scale.set(1,1,1); blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.12);
          blink = null; blinkMeshes = [];
        }
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // 창 크기 바뀌면 맞춘다
    window.addEventListener('resize', ()=>{
      const w = mount.clientWidth || W, h = Math.max(380, Math.round(w * 1.15));
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    });
  };
})();
