// ===== 내 몸 상태 3D — 진짜 해부 모델 =====
// 모델: Open3DModel (CC BY-SA 4.0) — models/skeleton.glb (전신 뼈대, 오른쪽 반 + 거울로 왼쪽), models/leg-right.glb (오른쪽 다리 뼈·근육)
// 그 위에 2022-12-28 체형분석 수치를 얹는다:
//  · 뼈대의 머리·어깨·골반·다리를 결과지 각도대로(과장해서) 기울이고 돌린다
//  · 어깨·골반·무릎에 수평 기준선(흰 점선)과 실제 기울어진 선(빨강) + 각도 라벨
//  · 풀어줄 근육·힘 기를 근육은 그 근육 자체에 색 (모델에 있는 근육만), 나머지는 점
// index.html 이 쓰는 이름은 그대로: initBody3D · body3dView · body3dAuto · body3dLines · body3dFocus
(function(){
  const EXAG = 3;        // 선·라벨의 각도 과장 배수
  const POSE = 2;        // 뼈대 자세 과장 배수 (너무 크면 뼈가 벌어진다)
  const deg = d => d * Math.PI / 180;
  const COLOR = { pain:0xE05A4F, release:0xE8A33D, strength:0x4FA8A0 };
  const LOADER_BASE = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/';

  // 표시점의 근육 이름 → 모델 속 근육(원래 이름, 소문자·기호 제거 후 비교)
  const MUSCLE_MAP = {
    R_iliopsoas:  ['psoasmajor.r', 'psoasminor.r', 'iliacusmuscle.r'],
    R_adductor:   ['adductorlongus.r', 'adductormagnus.r', 'adductorbrevis.r', 'gracilismuscle.r', 'pectineusmuscle.r'],
    R_piriformis: ['piriformismuscle.r'],
    R_gastroc:    ['medialheadofgastrocnemius.r', 'lateralheadofgastrocnemius.r'],
    R_soleus:     ['soleusmuscle.r'],
    R_glute:      ['gluteusmaximusmuscle.r', 'gluteusmediusmuscle.r', 'gluteusminimusmuscle.r'],
    R_vastusMed:  ['vastusmedialismuscle.r'],
  };
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9.]/g, '');

  function loadGLB(loader, url){ return new Promise((ok, no)=> loader.load(url, ok, undefined, no)); }

  // 원래 이름(glb 의 node name)을 Object3D 에 달아 둔다 — GLTFLoader 가 이름의 점·공백을 지우기 때문
  function tagNames(gltf){
    const nodes = gltf.parser.json.nodes || [];
    gltf.scene.traverse(o=>{
      const a = gltf.parser.associations && gltf.parser.associations.get(o);
      // r128 은 {type:'nodes', index}, 뒤 판은 {nodes: index} — 둘 다 받는다
      const idx = a ? (a.type === 'nodes' ? a.index : a.nodes) : null;
      if(idx != null && nodes[idx]) o.userData.orig = nodes[idx].name;
    });
    // 메쉬가 노드 아래 자식으로 들어간 경우엔 부모 이름을 물려받는다
    gltf.scene.traverse(o=>{ if(o.isMesh && !o.userData.orig && o.parent && o.parent.userData.orig) o.userData.orig = o.parent.userData.orig; });
  }
  function meshesOf(root){ const r = []; root.traverse(o=>{ if(o.isMesh) r.push(o); }); return r; }
  function center(o){ return new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3()); }
  function bbox(o){ return new THREE.Box3().setFromObject(o); }
  // 여러 덩어리를 한 점(pivot)을 중심으로 같이 돌릴 수 있게 묶는다 (세계 좌표는 그대로)
  function pivotGroup(parent, objs, pivot){
    const g = new THREE.Group(); g.position.copy(pivot); parent.add(g);
    objs.forEach(o => g.attach(o));
    return g;
  }

  // ----- 뼈대·근육을 자세대로 기울이기 -----
  const HEAD_RE  = /^(frontalbone|parietalbone|occipitalbone|sphenoidbone|ethmoidbone|vomer|mandiblebone|maxillabone|nasalbone|lacrimalbone|zygomaticbone|temporalbone|palatinebone|inferiornasalconcha|atlas|axis)|(canine|incisor|molar|premolar)/;
  const ARM_RE   = /^(clavicle|scapula|humerus|radius|ulna|[0-9a-z]*metacarpal|.*phalanx.*finger(?!.*foot)|capitate|hamate|lunate|pisiform|scaphoid|trapezium|trapezoid|triquetrum|sesamoidbonesofhand)/;
  const PELV_RE  = /^(hipbone|sacrum|coccyx)/;
  const SPINE_RE = /vertebra|^(t12|l[1-5])/;
  function pose(root, F, sideSign){
    // sideSign: 오른쪽 덩어리면 -1 (x 음수), 거울 왼쪽이면 +1
    const all = meshesOf(root);
    const by = (re) => all.filter(m => re.test(norm(m.userData.orig)));
    // 머리: 오른쪽으로 기울기 · 왼쪽으로 회전 · 앞으로(거북목)
    const headParts = by(HEAD_RE);
    if(headParts.length){
      const g = pivotGroup(root, headParts, new THREE.Vector3(0, 1.45, 0));
      g.rotation.z = deg(-F.headTiltRight * POSE); g.rotation.y = deg(F.headRotLeft * POSE);
      g.position.z += F.forwardHead * 0.004 * POSE;
    }
    // 어깨·팔: 올라감 (왼쪽 4°, 오른쪽 2°)
    const armParts = by(ARM_RE);
    if(armParts.length){
      const up = sideSign < 0 ? F.shoulderRightUp : F.shoulderLeftUp;
      const g = pivotGroup(root, armParts, new THREE.Vector3(0, 1.4, 0));
      g.position.y += up * 0.004 * POSE;
      g.position.z += F.roundShoulder * 0.005 * POSE;   // 둥근어깨
    }
    // 골반: 앞기울기 + 오른쪽 낮음
    const pelvParts = by(PELV_RE);
    if(pelvParts.length){
      const g = pivotGroup(root, pelvParts, new THREE.Vector3(0, 0.98, 0));
      g.rotation.x = deg(-F.pelvisTiltFwd * POSE * 0.5);
      g.rotation.z = deg(F.pelvisRightLow * POSE);
    }
    // 다리: 덩어리의 높이로 허벅지/정강이/발을 가른다 (뼈든 근육이든)
    const legParts = all.filter(m => { const n = norm(m.userData.orig); return !HEAD_RE.test(n) && !ARM_RE.test(n) && !PELV_RE.test(n) && !SPINE_RE.test(n) && !/rib|sternum|costal/.test(n); });
    const seg = { hip:[], thigh:[], shank:[], foot:[] };
    legParts.forEach(m => { const y = center(m).y; (y > 0.86 ? seg.hip : y > 0.48 ? seg.thigh : y > 0.1 ? seg.shank : seg.foot).push(m); });
    const hx = sideSign * 0.09;
    const foot  = pivotGroup(root, seg.foot,  new THREE.Vector3(hx, 0.09, 0));
    const shank = pivotGroup(root, seg.shank.concat([foot]), new THREE.Vector3(hx, 0.49, 0));
    const thigh = pivotGroup(root, seg.thigh.concat([shank]), new THREE.Vector3(hx, 0.9, 0));
    if(sideSign < 0){
      thigh.rotation.y = deg(-F.rightHipExtRot * POSE);     // 고관절 바깥돌림
      shank.rotation.y = deg(-F.rightKneeExtRot * POSE);    // 무릎 바깥돌림
      shank.rotation.x = deg(F.kneeFlex * POSE * 0.5);      // 굽힘 무릎
      foot.rotation.y  = deg(-F.rightFootOut * POSE);       // 발끝 바깥
    }else{
      shank.rotation.y = deg(F.leftKneeIntRot * POSE);      // 왼 무릎 안쪽돌림
      foot.rotation.z  = deg(F.leftAnkleCollapse * POSE);   // 왼 발목 안으로
    }
    return { pelvParts, armParts, headParts };
  }

  // ----- 기준선: 수직 추선 + 어깨·골반·무릎 수평선 -----
  function textSprite(text, color){
    const FONT = '600 44px system-ui, -apple-system, "Noto Sans KR", sans-serif';
    const c = document.createElement('canvas');
    let x = c.getContext('2d'); x.font = FONT;
    const w = Math.ceil(x.measureText(text).width + 40);
    c.width = w; c.height = 96;
    x = c.getContext('2d'); x.font = FONT;
    x.fillStyle = 'rgba(20,24,28,0.82)';
    x.beginPath(); x.roundRect ? x.roundRect(0, 6, w, 84, 18) : x.rect(0, 6, w, 84); x.fill();
    x.fillStyle = color; x.textBaseline = 'middle'; x.fillText(text, 20, 50);
    const tex = new THREE.CanvasTexture(c); tex.minFilter = THREE.LinearFilter;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    const h = 0.1; s.scale.set(h * w / 96, h, 1); s.center.set(0, 0.5); s.renderOrder = 20;
    return s;
  }
  function buildLines(F, J){
    const g = new THREE.Group();
    const refMat = new THREE.LineDashedMaterial({ color:0xFFFFFF, dashSize:0.03, gapSize:0.02, transparent:true, opacity:0.55, depthTest:false });
    const tiltMat = new THREE.LineBasicMaterial({ color:0xFF5A4A, depthTest:false });
    function line(a, b, m){
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
      const l = new THREE.Line(geo, m); l.computeLineDistances(); l.renderOrder = 10; return l;
    }
    g.add(line([0, 0, 0], [0, J.headTop + 0.06, 0], refMat));
    const ht = deg(-F.headTiltRight * EXAG), hl = 0.13;
    g.add(line([ Math.sin(ht)*hl, J.headY - Math.cos(ht)*hl, 0], [-Math.sin(ht)*hl, J.headY + Math.cos(ht)*hl, 0], tiltMat));
    function pair(L, R, label){
      const y = (L[1] + R[1]) / 2, z = L[2];
      g.add(line([L[0] + 0.12, y, z], [R[0] - 0.12, y, z], refMat));
      g.add(line([L[0] + 0.1, L[1], z], [R[0] - 0.1, R[1], z], tiltMat));
      const s = textSprite(label, '#FFD9D2'); s.position.set(L[0] + 0.14, L[1] + 0.07, z); g.add(s);
    }
    pair(J.shoulderL, J.shoulderR, `어깨 왼 ${F.shoulderLeftUp}°↑ 오른 ${F.shoulderRightUp}°↑`);
    pair(J.pelvisL, J.pelvisR, `골반 오른쪽 ${F.pelvisRightLow}° 낮음`);
    pair(J.kneeL, J.kneeR, `오른 무릎 ${F.rightKneeLow}° 낮음`);
    const hs = textSprite(`머리 오른쪽 ${F.headTiltRight}° 기울기 · 거북목`, '#FFD9D2'); hs.position.set(0.14, J.headTop + 0.02, 0); g.add(hs);
    const ps = textSprite(`골반 앞기울기 ${F.pelvisTiltFwd}°`, '#FFD9D2'); ps.position.set(0.16, 0.95 - 0.14, 0.12); g.add(ps);
    return g;
  }

  // ----- 화면 -----
  window.initBody3D = async function(mountId, DATA, opt){
    opt = opt || {};
    const mount = document.getElementById(mountId);
    if(!mount || mount.dataset.ready) return;
    mount.dataset.ready = '1';
    const F = DATA.findings;
    const W = mount.clientWidth || 340, H = Math.max(380, Math.round(W * 1.15));

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(W, H);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 20);
    camera.position.set(0, 1.05, 3.9); camera.lookAt(0, 0.98, 0);
    scene.add(new THREE.HemisphereLight(0xFFFFFF, 0x445566, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(2, 3, 2.5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xDDE8FF, 0.5); fill.position.set(-2, 1, -2); scene.add(fill);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(0.55, 48), new THREE.MeshStandardMaterial({ color:0x2C333A, transparent:true, opacity:0.9 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.001; scene.add(floor);

    const body = new THREE.Group(); scene.add(body);
    const status = opt.onStatus || function(){};

    // 모델 읽기
    const loader = new THREE.GLTFLoader();
    const draco = new THREE.DRACOLoader(); draco.setDecoderPath(LOADER_BASE); loader.setDRACOLoader(draco);
    const base = opt.modelBase || 'models/';
    status('뼈대 불러오는 중…');
    const skel = await loadGLB(loader, base + 'skeleton.glb');
    tagNames(skel);
    status('다리 근육 불러오는 중…');
    const leg = await loadGLB(loader, base + 'leg-right.glb');
    tagNames(leg);
    status('');

    // 뼈대: 가운데(척추 등) + 오른쪽 + 거울로 만든 왼쪽
    const mid = skel.scene.getObjectByName('Bones');
    const rightParts = ['Bones_right', 'Cartilages_right'].map(n => skel.scene.getObjectByName(n)).filter(Boolean);
    const right = new THREE.Group(); rightParts.forEach(p => right.add(p));
    const left = right.clone(true); left.scale.x = -1;
    left.traverse(o => { if(o.userData.orig) o.userData.orig = o.userData.orig; });
    body.add(mid, right, left);

    // 오른쪽 다리 근육 (뼈는 뼈대 것을 쓰므로 다리 모델의 뼈는 숨긴다)
    const legBones = leg.scene.getObjectByName('Bones'); if(legBones) legBones.visible = false;
    const legMus = leg.scene.getObjectByName('Muscles');
    const legGroup = new THREE.Group(); if(legMus) legGroup.add(legMus);
    body.add(legGroup);
    const legMuscleMeshes = meshesOf(legGroup);   // 자세 기울이기에서 다른 묶음으로 옮겨가기 전에 잡아 둔다
    // 뼈대의 오른쪽 다리뼈는 근육 속에 묻히니 그대로 두되, 골반·발은 보이게 둔다

    // 관절 자리 (선 그릴 때) — 기울이기 전에 잰다
    const J = {};
    const find = (root, re) => meshesOf(root).find(m => re.test(norm(m.userData.orig)));
    const clavR = find(right, /^clavicle\.r$/), hipR = find(right, /^hipbone\.r$/), patR = find(right, /^patella\.r$/), frontal = find(mid, /^frontalbone/);
    const cb = clavR ? bbox(clavR) : new THREE.Box3(new THREE.Vector3(-0.2,1.4,0), new THREE.Vector3(0,1.42,0));
    const shY = cb.max.y, shX = cb.min.x, shZ = (cb.min.z + cb.max.z) / 2;
    J.shoulderR = [ shX, shY + F.shoulderRightUp * 0.0035 * EXAG, shZ];
    J.shoulderL = [-shX, shY + F.shoulderLeftUp  * 0.0035 * EXAG, shZ];
    const hb = hipR ? bbox(hipR) : new THREE.Box3(new THREE.Vector3(-0.15,0.85,-0.1), new THREE.Vector3(0,1.05,0.1));
    const asisX = (hb.min.x + hb.max.x) / 2 - 0.02, asisY = hb.max.y - 0.03, asisZ = hb.max.z;
    const dy = Math.abs(asisX) * Math.tan(deg(F.pelvisRightLow * EXAG));
    J.pelvisR = [ asisX, asisY - dy, asisZ];
    J.pelvisL = [-asisX, asisY + dy, asisZ];
    const kc = patR ? center(patR) : new THREE.Vector3(-0.09, 0.5, 0.05);
    J.kneeR = [ kc.x, kc.y - F.rightKneeLow * 0.004 * EXAG, kc.z + 0.03];
    J.kneeL = [-kc.x, kc.y, kc.z + 0.03];
    const fb = frontal ? bbox(frontal) : new THREE.Box3(new THREE.Vector3(-0.08,1.6,-0.08), new THREE.Vector3(0.08,1.7,0.08));
    J.headTop = fb.max.y; J.headY = (fb.min.y + fb.max.y) / 2 - 0.02;

    // 자세 기울이기 (오른쪽 -1, 왼쪽 +1). 가운데 뼈(두개골 등)는 오른쪽 묶음과 같이 처리
    const midAndRight = new THREE.Group(); body.add(midAndRight); midAndRight.attach(mid); midAndRight.attach(right); midAndRight.attach(legGroup);
    pose(midAndRight, F, -1);
    pose(left, F, +1);

    // 근육에 색 입히기 + 표시점
    const REG = {};
    legMuscleMeshes.forEach(m => { const n = norm(m.userData.orig); for(const k in MUSCLE_MAP){ if(MUSCLE_MAP[k].includes(n)) (REG[k] = REG[k] || []).push(m); } });
    const markers = [];
    DATA.markers.forEach(mk=>{
      const col = new THREE.Color(COLOR[mk.kind] || COLOR.pain);
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.018, 20, 14), new THREE.MeshStandardMaterial({ color:col, emissive:col, emissiveIntensity:0.45, depthTest:false }));
      s.renderOrder = 15; s.position.set(mk.x, mk.y, mk.z); s.userData = mk; body.add(s); markers.push(s);
      (mk.muscles || []).forEach(k => (REG[k] || []).forEach(mesh=>{
        mesh.material = mesh.material.clone();
        mesh.material.color.lerp(col, 0.75); mesh.material.emissive = col.clone(); mesh.material.emissiveIntensity = 0.15;
      }));
    });
    const lines = buildLines(F, J); body.add(lines);

    // ----- 돌리기 -----
    let rotY = 0, rotX = 0, targetY = 0, targetX = 0, dragging = false, lastX = 0, lastY = 0, auto = true;
    const el = renderer.domElement; el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e=>{ dragging = true; auto = false; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e=>{ if(!dragging) return; targetY += (e.clientX - lastX) * 0.012; targetX = Math.max(-0.6, Math.min(0.6, targetX + (e.clientY - lastY) * 0.006)); lastX = e.clientX; lastY = e.clientY; });
    el.addEventListener('pointerup', ()=>{ dragging = false; });
    el.addEventListener('pointercancel', ()=>{ dragging = false; });
    window.body3dView = function(name){ auto = false; targetX = 0; targetY = { front:0, right:Math.PI/2, back:Math.PI, left:-Math.PI/2 }[name] || 0; };
    window.body3dAuto = ()=>{ auto = !auto; return auto; };
    window.body3dLines = ()=>{ lines.visible = !lines.visible; return lines.visible; };
    let blink = null, blinkT = 0, blinkMeshes = [];
    window.body3dFocus = function(i){
      const m = markers[i]; if(!m) return;
      auto = false; targetY = m.userData.view || 0; targetX = 0;
      if(blink){ blink.scale.set(1,1,1); blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.15); }
      blink = m; blinkT = 0;
      blinkMeshes = [].concat(...(m.userData.muscles || []).map(k => REG[k] || []));
    };
    let last = performance.now();
    function tick(now){
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if(auto) targetY += dt * 0.35;
      rotY += (targetY - rotY) * 0.12; rotX += (targetX - rotX) * 0.12;
      body.rotation.y = rotY; body.rotation.x = rotX;
      if(blink){
        blinkT += dt; const p = Math.abs(Math.sin(blinkT * 6)); const s = 1 + 0.7 * p;
        blink.scale.set(s, s, s); blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.15 + 0.7 * p);
        if(blinkT > 2.5){ blink.scale.set(1,1,1); blinkMeshes.forEach(x=> x.material.emissiveIntensity = 0.15); blink = null; blinkMeshes = []; }
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    window.addEventListener('resize', ()=>{ const w = mount.clientWidth || W, h = Math.max(380, Math.round(w * 1.15)); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); });
    window.__body3d = { scene, body, J, REG, markers };   // 확인용
  };
})();
