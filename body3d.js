// ===== 내 몸 상태 3D =====
// 2022-12-28 체형분석 사진·수치 + 지금 증상을 사람 모양 위에 표시한다.
// 비율(어깨 너비·허리·팔다리 길이·굵기)은 체형분석 정면 사진에서 재서 맞췄다.
// three.js 를 쓴다. 손가락/마우스로 끌면 돌아가고, 아래 목록을 누르면 그 자리로 돌아간다.
// 기울기·돌림은 눈에 보이게 3배 과장했다 (화면에 "과장"이라고 적어 둔다).
(function(){
  const EXAG = 3;   // 각도 과장 배수
  const deg = d => d * Math.PI / 180;

  // 색: 빨강=지금 아픈 곳, 주황=풀어줄 곳(뭉친 근육), 초록=힘 기를 곳
  const COLOR = { pain:0xE05A4F, release:0xE8A33D, strength:0x4FA8A0,
                  skin:0xE2BBA2, shorts:0xA3A6A8, hair:0x2A2422, dark:0x4A3A33 };
  const FLAT = 0.64;  // 몸통은 앞뒤가 옆보다 납작하다 (앞뒤/좌우 비율)

  function mat(color, opacity){
    return new THREE.MeshStandardMaterial({ color, roughness:0.8, metalness:0.0,
      transparent: opacity != null, opacity: opacity == null ? 1 : opacity });
  }
  function sph(r, color){
    return new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), mat(color));
  }
  // 위아래 반지름이 다른 둥근 기둥 (팔·다리). 양 끝은 공으로 덮어 매끈하게.
  function limb(rTop, rBot, len, color){
    const g = new THREE.Group();
    const c = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, len, 28), mat(color));
    c.position.y = -len / 2;
    const a = sph(rTop, color); a.position.y = 0;
    const b = sph(rBot, color); b.position.y = -len;
    g.add(c, a, b);
    return g;
  }
  // 옆모습 선(반지름, 높이)을 돌려 만든 덩어리 (몸통·반바지)
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
    const skin = COLOR.skin;

    // 골반 그룹 (허리띠 높이). 기울기는 반바지 덩어리에만 준다 — 그룹에 주면 사람이 통째로 기운다
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.95;
    const shorts = lathe([
      [0.14, -0.20], [0.165, -0.14], [0.17, -0.07], [0.16, 0.02], [0.145, 0.08], [0.14, 0.10], [0, 0.10],
    ], COLOR.shorts);
    shorts.rotation.x = deg(F.pelvisTiltFwd * EXAG * 0.6) * -1;  // 앞으로 기울기 (반바지는 조금만)
    shorts.rotation.z = deg(F.pelvisRightLow * EXAG);       // 오른쪽(화면 왼쪽)이 내려감
    pelvis.add(shorts);
    body.add(pelvis);

    // 몸통 — 허리에서 어깨까지 한 덩어리. 배는 살짝 나오고, 가슴·어깨로 넓어진다
    const torso = new THREE.Group();
    const trunk = lathe([
      [0, 0.06], [0.135, 0.06], [0.14, 0.12], [0.145, 0.18], [0.15, 0.26], [0.165, 0.33],
      [0.175, 0.40], [0.19, 0.46], [0.2, 0.49], [0.17, 0.52], [0.09, 0.54], [0.06, 0.56], [0, 0.56],
    ], skin);
    trunk.rotation.x = deg(-F.pelvisTiltFwd * EXAG * 0.15);   // 허리 과한 앞굽음 (살짝 젖힘)
    torso.add(trunk);
    // 굽은등: 가슴 위쪽을 앞으로 조금 말아준다
    torso.rotation.x = deg(F.roundBack * EXAG * 0.3);
    pelvis.add(torso);

    // 어깨 — 양쪽 올라감, 왼쪽이 더. 둥근어깨는 앞으로
    const shoulders = new THREE.Group();
    shoulders.position.set(0, 0.47, F.roundShoulder * 0.008 * EXAG);
    const shL = sph(0.062, skin); shL.position.set( 0.185, F.shoulderLeftUp  * 0.0035 * EXAG, 0);
    const shR = sph(0.062, skin); shR.position.set(-0.185, F.shoulderRightUp * 0.0035 * EXAG, 0);
    shoulders.add(shL, shR);
    torso.add(shoulders);

    // 목·머리 — 거북목(앞으로), 오른쪽 2° 기울기, 왼쪽 회전
    const neck = limb(0.05, 0.058, 0.12, skin);
    neck.position.set(0, 0.64, F.forwardHead * 0.0015 * EXAG);
    neck.rotation.x = deg(F.forwardHead * EXAG * 0.6);
    torso.add(neck);
    const head = new THREE.Group();
    head.position.set(0, 0.75, F.forwardHead * 0.003 * EXAG);
    const headMesh = sph(0.095, skin); headMesh.scale.set(0.9, 1.18, 1);
    head.add(headMesh);
    const hair = sph(0.1, COLOR.hair); hair.scale.set(0.95, 0.95, 1); hair.position.set(0, 0.035, -0.012);
    head.add(hair);
    const nose = sph(0.016, skin); nose.position.set(0, -0.02, 0.095); head.add(nose);
    const eyeL = sph(0.011, COLOR.dark); eyeL.position.set( 0.035, 0.01, 0.085); head.add(eyeL);
    const eyeR = sph(0.011, COLOR.dark); eyeR.position.set(-0.035, 0.01, 0.085); head.add(eyeR);
    const earL = sph(0.02, skin); earL.position.set( 0.085, -0.01, -0.01); head.add(earL);
    const earR = sph(0.02, skin); earR.position.set(-0.085, -0.01, -0.01); head.add(earR);
    head.rotation.z = deg(F.headTiltRight * EXAG) * -1;   // 오른쪽으로 기울기
    head.rotation.y = deg(F.headRotLeft * EXAG);          // 왼쪽으로 회전
    torso.add(head);

    // 팔 — 어깨 1.42 → 팔꿈치 1.13 → 손목 0.84 → 손끝 0.79. 왼팔꿈치가 안쪽을 봄, 팔꿈치 4° 굽힘
    function arm(side){
      const L = side === 'L';
      const g = new THREE.Group();
      g.position.set(L ? 0.205 : -0.205, 0.47, 0);
      const up = limb(0.042, 0.036, 0.3, skin); g.add(up);
      const el = new THREE.Group(); el.position.y = -0.3;
      const fo = limb(0.036, 0.028, 0.29, skin); el.add(fo);
      const hand = sph(0.035, skin); hand.scale.set(0.8, 1.3, 0.5); hand.position.y = -0.33; el.add(hand);
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
      const g = new THREE.Group();
      g.position.set(R ? -0.09 : 0.09, -0.05, 0);
      const thigh = limb(0.082, 0.064, 0.37, skin); g.add(thigh);
      const knee = new THREE.Group(); knee.position.y = -0.37;
      const shin = limb(0.062, 0.036, 0.43, skin); knee.add(shin);
      const calf = sph(0.056, skin); calf.scale.set(1, 1.6, 1); calf.position.set(0, -0.15, -0.012); knee.add(calf);
      const ankle = new THREE.Group(); ankle.position.y = -0.43;
      const foot = sph(0.05, skin); foot.scale.set(1, 0.42, 2.5); foot.position.set(0, -0.035, 0.065);
      ankle.add(foot);
      knee.add(ankle);
      g.add(knee);
      if(R){
        g.rotation.y    = deg(-F.rightHipExtRot * EXAG);    // 고관절 바깥돌림
        knee.rotation.y = deg(-F.rightKneeExtRot * EXAG);   // 무릎 바깥돌림
        knee.rotation.x = deg(F.kneeFlex * EXAG * 0.6);     // 굽힘 무릎
        ankle.rotation.y = deg(-F.rightFootOut * EXAG);     // 발끝 바깥
        g.position.y -= F.rightKneeLow * 0.004;             // 오른 무릎 4° 낮음 (살짝 내려감)
      }else{
        knee.rotation.y = deg(F.leftKneeIntRot * EXAG);     // 무릎 안쪽돌림
        ankle.rotation.z = deg(F.leftAnkleCollapse * EXAG); // 발목 안으로 무너짐
      }
      return g;
    }
    pelvis.add(leg('L'), leg('R'));

    return body;
  }

  // ----- 표시점 -----
  function addMarkers(body, markers){
    const list = [];
    markers.forEach(m=>{
      const s = sph(0.026, COLOR[m.kind] || COLOR.pain);
      s.material.emissive = new THREE.Color(COLOR[m.kind] || COLOR.pain);
      s.material.emissiveIntensity = 0.4;
      s.position.set(m.x, m.y, m.z);
      s.userData = m;
      body.add(s);
      list.push(s);
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

    scene.add(new THREE.HemisphereLight(0xFFF4E8, 0x334, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 0.75); key.position.set(2, 3, 2.5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xDDE8FF, 0.35); fill.position.set(-2, 1, -2); scene.add(fill);

    // 바닥 원
    const floor = new THREE.Mesh(new THREE.CircleGeometry(0.55, 48), mat(0x2C333A, 0.9));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001; scene.add(floor);

    const body = buildBody(DATA.findings);
    const markers = addMarkers(body, DATA.markers);
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

    // 목록을 누르면 그 표시점이 보이는 각도로 + 깜빡임
    let blink = null, blinkT = 0;
    window.body3dFocus = function(i){
      const m = markers[i]; if(!m) return;
      auto = false;
      targetY = m.userData.view || 0; targetX = 0;
      blink = m; blinkT = 0;
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
        const s = 1 + 0.6 * Math.abs(Math.sin(blinkT * 6));
        blink.scale.set(s, s, s);
        if(blinkT > 2.5){ blink.scale.set(1,1,1); blink = null; }
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
