// ===== 내 몸 상태 — 해부 그림 위에 기준선·표시점 얹기 =====
// 그림(img/body-*.webp)은 AI가 그린 해부 일러스트. 그 위에 SVG 로
//  · 수직 추선(흰 점선) · 어깨/골반 수평 기준(흰 점선)과 실제 기울어진 선(빨강) · 각도 라벨
//  · 아픈 곳/풀어줄 곳/힘 기를 곳 번호 점
// 을 그린다. 좌표는 그림 크기에 대한 비율(0~1)로 bodydata.js 의 illu 에 적어 둔다.
// 그림은 앞·오른쪽·뒤·왼쪽 네 방향 자리가 있고, 아직 없는 방향은 안내만 보여준다.
(function(){
  const COLOR = { pain:'#E05A4F', release:'#E8A33D', strength:'#4FA8A0' };
  const ORDER = ['front', 'right', 'back', 'left'];
  const NAME  = { front:'앞', right:'오른쪽 옆', back:'뒤', left:'왼쪽 옆' };
  const SIDE  = 0.42;   // 그림 양옆에 라벨 둘 여백 (그림 너비 대비)

  const svgNS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, text){
    const e = document.createElementNS(svgNS, tag);
    for(const k in attrs) e.setAttribute(k, attrs[k]);
    if(text != null) e.textContent = text;
    return e;
  }

  window.initBodyIllu = function(mountId, DATA){
    const mount = document.getElementById(mountId);
    if(!mount || mount.dataset.ready) return;
    mount.dataset.ready = '1';
    const ILLU = DATA.illu;
    let cur = 'front';
    let dots = {};   // 표시점 번호 → svg 요소

    function draw(){
      const v = ILLU.views[cur];
      mount.innerHTML = '';
      if(!v){
        mount.innerHTML = '<div class="illu-empty">' + NAME[cur] + ' 그림은 아직 없어요.<br>같은 자세·같은 격자 배경으로 그림을 보내주면 여기에 넣어요.<br><span>← 끌어서 다른 방향 보기 →</span></div>';
        dots = {};
        return;
      }
      const W = v.w, H = v.h, M = Math.round(W * SIDE), TW = W + M * 2;
      const svg = el('svg', { viewBox:`0 0 ${TW} ${H}`, class:'illu-svg' });
      svg.appendChild(el('image', { href:v.src, x:M, y:0, width:W, height:H, preserveAspectRatio:'none' }));
      const X = fx => M + fx * W, Y = fy => fy * H;
      const fs = Math.round(W * 0.062);   // 글자 크기 (그림 너비 기준)

      // 선
      (v.lines || []).forEach(L=>{
        if(L.kind === 'plumb'){
          svg.appendChild(el('line', { x1:X(L.x), y1:0, x2:X(L.x), y2:H, class:'illu-ref' }));
        }else if(L.kind === 'pair'){
          const y = (L.a[1] + L.b[1]) / 2;
          svg.appendChild(el('line', { x1:X(L.a[0]) - W*0.1, y1:Y(y), x2:X(L.b[0]) + W*0.1, y2:Y(y), class:'illu-ref' }));
          svg.appendChild(el('line', { x1:X(L.a[0]) - W*0.06, y1:Y(L.a[1]), x2:X(L.b[0]) + W*0.06, y2:Y(L.b[1]), class:'illu-tilt' }));
          [L.a, L.b].forEach(p => svg.appendChild(el('circle', { cx:X(p[0]), cy:Y(p[1]), r:W*0.013, class:'illu-joint' })));
        }else if(L.kind === 'seg'){
          svg.appendChild(el('line', { x1:X(L.a[0]), y1:Y(L.a[1]), x2:X(L.b[0]), y2:Y(L.b[1]), class:'illu-tilt' }));
        }
        if(L.label){
          // 라벨은 그림 바깥 여백에. side:'L' 왼쪽 여백 / 'R' 오른쪽 여백. 가리키는 점까지 가는 선을 긋는다
          const left = L.side !== 'R';
          const tx = left ? 6 : TW - 6, ty = Y(L.ly);
          const t = el('text', { x:tx, y:ty, 'font-size':fs, 'text-anchor': left ? 'start' : 'end', class:'illu-label' });
          L.label.split('\n').forEach((ln, i)=>{
            t.appendChild(el('tspan', { x:tx, dy: i ? fs * 1.15 : 0 }, ln));
          });
          svg.appendChild(t);
          if(L.to){
            const ax = left ? M - 4 : M + W + 4;
            svg.appendChild(el('line', { x1:ax, y1:ty - fs*0.35, x2:X(L.to[0]), y2:Y(L.to[1]), class:'illu-lead' }));
          }
        }
      });

      // 표시점 (번호는 목록 순서 + 1)
      dots = {};
      (v.marks || []).forEach(mk=>{
        const m = DATA.markers[mk.i]; if(!m) return;
        const g = el('g', { class:'illu-dot', 'data-i':mk.i });
        g.appendChild(el('circle', { cx:X(mk.x), cy:Y(mk.y), r:W*0.03, fill:COLOR[m.kind] || COLOR.pain, 'fill-opacity':0.92, stroke:'#fff', 'stroke-width':W*0.006 }));
        g.appendChild(el('text', { x:X(mk.x), y:Y(mk.y) + fs*0.35, 'font-size':fs*0.95, 'text-anchor':'middle', fill:'#fff', 'font-weight':'700' }, String(mk.i + 1)));
        g.addEventListener('click', ()=> window.body3dFocusAll && window.body3dFocusAll(mk.i));
        svg.appendChild(g);
        dots[mk.i] = g;
      });

      svg.appendChild(el('text', { x:TW/2, y:H - fs*0.5, 'font-size':fs*0.8, 'text-anchor':'middle', class:'illu-foot' },
        NAME[cur] + ' · 숫자는 2022 결과지 (3배 과장) · ← 끌어서 돌리기 →'));
      mount.appendChild(svg);
    }

    // 끌어서 방향 바꾸기
    let sx = null;
    mount.addEventListener('pointerdown', e=>{ sx = e.clientX; });
    mount.addEventListener('pointerup', e=>{
      if(sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if(Math.abs(dx) < 40) return;
      const k = ORDER.indexOf(cur);
      cur = ORDER[(k + (dx < 0 ? 1 : ORDER.length - 1)) % ORDER.length];
      draw();
      if(window.onBodyIlluView) window.onBodyIlluView(cur);
    });

    window.bodyIlluView = function(name){ if(ORDER.includes(name)){ cur = name; draw(); } return cur; };
    window.bodyIlluHas  = function(name){ return !!ILLU.views[name]; };
    // 목록을 누르면 그 점이 깜빡인다. 이 방향 그림에 없으면 false
    window.bodyIlluFocus = function(i){
      Object.values(dots).forEach(d => d.classList.remove('blink'));
      const d = dots[i]; if(!d) return false;
      d.classList.add('blink');
      setTimeout(()=> d.classList.remove('blink'), 2600);
      return true;
    };
    draw();
  };
})();
