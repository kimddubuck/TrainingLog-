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
    // 거울로 만든 왼쪽 묶음(x 를 뒤집음)에서는 y·z 축 회전 방향이 반대로 나오므로 부호를 뒤집어 준다 (x 축 회전은 그대로)
    const mir = sideSign > 0 ? -1 : 1;
    // 머리: 오른쪽으로 기울기 · 왼쪽으로 회전 · 앞으로(거북목)
    const headParts = by(HEAD_RE);
    if(headParts.length){
      const g = pivotGroup(root, headParts, new THREE.Vector3(0, 1.45, 0));
      g.rotation.z = mir * deg(-F.headTiltRight * POSE); g.rotation.y = mir * deg(F.headRotLeft * POSE);
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
      g.rotation.z = mir * deg(F.pelvisRightLow * POSE * 0.7);
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
    const CAM0 = { y:0.98, dist:3.9 };
    const cam = { y:CAM0.y, dist:CAM0.dist, ty:CAM0.y, tdist:CAM0.dist };   // 지금 값 · 목표값
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
    status('어깨 근육 불러오는 중…');
    let sh = null;
    try{ sh = await loadGLB(loader, base + 'shoulder-right.glb'); tagNames(sh); }catch(e){ console.warn('shoulder model', e); }
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
    // 오른쪽 어깨 근육 — 평소엔 숨기고 "근육 보기 › 어깨"에서만 보인다 (전신 보기에서 뼈대를 가리지 않게)
    const shGroup = new THREE.Group();
    if(sh){ let shMus = null; sh.scene.traverse(o => { if(!shMus && o.userData.orig === 'Pectoral girdle - muscles') shMus = o; }); if(!shMus) shMus = sh.scene; shGroup.add(shMus); }   // GLTFLoader 가 이름의 공백·기호를 지우므로 원래 이름(userData.orig)으로 찾는다
    body.add(shGroup);
    const shMuscleMeshes = meshesOf(shGroup);
    shMuscleMeshes.forEach(m => { m.visible = false; });
    const legMuscleMeshes = meshesOf(legGroup).concat(shMuscleMeshes);   // 자세 기울이기에서 다른 묶음으로 옮겨가기 전에 잡아 둔다 (어깨 근육 포함)
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
    const midAndRight = new THREE.Group(); body.add(midAndRight); midAndRight.attach(mid); midAndRight.attach(right); midAndRight.attach(legGroup); midAndRight.attach(shGroup);
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

    // ----- 근육 보기: 부위별 근육만 색 입혀 보여 주고 확대, 누르면 설명 -----
    const REGIONS = window.BODY_REGIONS || {};
    const TCOL = { r:0xD9534F, g:0x3FA35B, p:0xE8A33D };
    const boneMeshes = meshesOf(mid).concat(meshesOf(right), meshesOf(left));
    const origMat = new Map();
    [].concat(boneMeshes, legMuscleMeshes).forEach(m => origMat.set(m, m.material));
    const dimBone = new THREE.MeshStandardMaterial({ color:0xBFC5CC, transparent:true, opacity:0.18, depthWrite:false });
    const dimMus  = new THREE.MeshStandardMaterial({ color:0x6E7B86, transparent:true, opacity:0.12, depthWrite:false });
    let region = null, regionMeshes = [], pickHL = [], pickT = 0;
    // 부위마다 근육 덩어리 중심(회전 전에 잰다)
    const regionBox = {};
    Object.keys(REGIONS).forEach(k => {
      const names = [].concat(...Object.values(REGIONS[k].groups));
      const ms = legMuscleMeshes.filter(m => names.includes(norm(m.userData.orig)));
      const bx = new THREE.Box3(); ms.forEach(m => bx.expandByObject(m));
      regionBox[k] = bx;
    });
    function restoreAll(){
      [].concat(boneMeshes, legMuscleMeshes).forEach(m => { m.material = origMat.get(m); m.visible = !shMuscleMeshes.includes(m); delete m.userData.anatK; });
    }
    window.body3dRegion = function(key){
      pickHL = []; region = REGIONS[key] ? key : null;
      if(!region){
        restoreAll(); markers.forEach(s => s.visible = true); lines.visible = linesOn;
        cam.ty = CAM0.y; cam.tdist = CAM0.dist; auto = true; targetX = 0;
        return null;
      }
      const R = REGIONS[region];
      const anat = (window.EXINFO && EXINFO.ANAT && EXINFO.ANAT[region]) || { muscles:[] };
      const byK = {}; anat.muscles.forEach(m => byK[m.k] = m);
      boneMeshes.forEach(m => { m.material = dimBone; m.visible = true; });
      regionMeshes = [];
      const hide = R.hide || [];
      legMuscleMeshes.forEach(m => { m.material = dimMus; m.visible = !hide.includes(norm(m.userData.orig)); delete m.userData.anatK; });
      Object.keys(R.groups).forEach(k => {
        const info = byK[+k]; const col = new THREE.Color(TCOL[(info && info.t) || 'r']);
        R.groups[k].forEach(nm => legMuscleMeshes.filter(m => norm(m.userData.orig) === nm).forEach(m => {
          m.material = new THREE.MeshStandardMaterial({ color:col, emissive:col, emissiveIntensity:0.18, roughness:0.6 });
          m.userData.anatK = +k; regionMeshes.push(m);
        }));
      });
      markers.forEach(s => s.visible = false); lines.visible = false;
      const bx = regionBox[region]; const c = bx.getCenter(new THREE.Vector3()); const sz = bx.getSize(new THREE.Vector3());
      cam.ty = (R.camY != null) ? R.camY : c.y; cam.tdist = (R.dist != null) ? R.dist : Math.max(1.1, Math.min(3.9, Math.max(sz.x, sz.y, sz.z) * 2.4));
      auto = false; targetX = 0; targetY = R.lookFrom || 0;
      return { name:R.name, count:regionMeshes.length };
    };
    window.body3dZoom = function(f){ cam.tdist = Math.max(0.6, Math.min(5, cam.tdist * f)); auto = false; };
    window.body3dHighlight = function(k){
      pickHL = regionMeshes.filter(m => m.userData.anatK === k); pickT = 0;
    };
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    function pickAt(x, y){
      if(!region || !regionMeshes.length) return null;
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(regionMeshes, false)[0];
      if(!hit) return null;
      const k = hit.object.userData.anatK; window.body3dHighlight(k);
      return { part: region, k, orig: hit.object.userData.orig };
    }

    // ----- 돌리기 -----
    let rotY = 0, rotX = 0, targetY = 0, targetX = 0, dragging = false, lastX = 0, lastY = 0, auto = true, linesOn = true;
    const el = renderer.domElement; el.style.touchAction = 'none';
    const ptrs = new Map(); let pinchD = 0, moved = 0, downX = 0, downY = 0;
    el.addEventListener('pointerdown', e=>{ ptrs.set(e.pointerId, [e.clientX, e.clientY]); dragging = true; auto = false; lastX = e.clientX; lastY = e.clientY; downX = e.clientX; downY = e.clientY; moved = 0; el.setPointerCapture(e.pointerId);
      if(ptrs.size === 2){ const [a, b] = [...ptrs.values()]; pinchD = Math.hypot(a[0]-b[0], a[1]-b[1]); } });
    el.addEventListener('pointermove', e=>{
      if(!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      if(ptrs.size === 2){ const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0]-b[0], a[1]-b[1]); if(pinchD) cam.tdist = Math.max(0.6, Math.min(5, cam.tdist * (pinchD / d))); pinchD = d; return; }
      if(!dragging) return;
      moved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
      targetY += (e.clientX - lastX) * 0.012; targetX = Math.max(-0.6, Math.min(0.6, targetX + (e.clientY - lastY) * 0.006)); lastX = e.clientX; lastY = e.clientY; });
    el.addEventListener('pointerup', e=>{ ptrs.delete(e.pointerId); pinchD = 0; dragging = false;
      if(moved < 8){ const hit = pickAt(e.clientX, e.clientY); if(hit && opt.onPick) opt.onPick(hit); } });
    el.addEventListener('pointercancel', e=>{ ptrs.delete(e.pointerId); pinchD = 0; dragging = false; });
    el.addEventListener('wheel', e=>{ e.preventDefault(); window.body3dZoom(e.deltaY > 0 ? 1.12 : 0.89); }, { passive:false });
    window.body3dView = function(name){ auto = false; targetX = 0; targetY = { front:0, right:Math.PI/2, back:Math.PI, left:-Math.PI/2 }[name] || 0; };
    window.body3dAuto = ()=>{ auto = !auto; return auto; };
    window.body3dLines = ()=>{ linesOn = !linesOn; lines.visible = linesOn && !region; return linesOn; };
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
      cam.y += (cam.ty - cam.y) * 0.1; cam.dist += (cam.tdist - cam.dist) * 0.1;
      camera.position.set(0, cam.y + 0.07 * (cam.dist / CAM0.dist), cam.dist); camera.lookAt(0, cam.y, 0);
      if(pickHL.length){ pickT += dt; const p = Math.abs(Math.sin(pickT * 5)); pickHL.forEach(m => m.material.emissiveIntensity = 0.18 + 0.6 * p); if(pickT > 2.2){ pickHL.forEach(m => m.material.emissiveIntensity = 0.18); pickHL = []; } }
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
    window.__body3d = { scene, body, J, REG, markers, regionBox, cam, camera };   // 확인용
  };
})();
