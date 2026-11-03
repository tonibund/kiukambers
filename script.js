// Handy-Menü: Burger-Knopf klappt die Navigation auf und zu.
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!nav.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

// Neongrüner Blitz: nur beim Klick auf den Sticker-Titel der Startseite.
(function () {
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG = 'http://www.w3.org/2000/svg';

  // Zickzack-Linie zwischen zwei Punkten (Mittelpunkt-Verschiebung)
  function jag(a, b, rough, depth) {
    if (depth === 0) return [a, b];
    var m = [(a[0] + b[0]) / 2 + (Math.random() - 0.5) * rough,
             (a[1] + b[1]) / 2 + (Math.random() - 0.5) * rough * 0.3];
    return jag(a, m, rough / 2, depth - 1).concat(jag(m, b, rough / 2, depth - 1).slice(1));
  }
  function toPath(pts) {
    return 'M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L');
  }
  function bolt(hit) {
    var w = innerWidth, h = innerHeight;
    var start = [hit[0] + (Math.random() - 0.5) * w * 0.5, -20];
    var end = [hit[0] + (Math.random() - 0.5) * w * 0.4, h + 20];
    var main = jag(start, hit, w * 0.35, 6).concat(jag(hit, end, w * 0.3, 6).slice(1));
    var branches = [];
    for (var b = 0; b < 5; b++) {
      var from = main[Math.floor(Math.random() * (main.length - 10)) + 5];
      var to = [from[0] + (Math.random() - 0.5) * w * 0.5, from[1] + h * (0.1 + Math.random() * 0.25)];
      branches.push(toPath(jag(from, to, w * 0.12, 4)));
    }
    return { main: toPath(main), branches: branches.join(' ') };
  }

  // Blitz(e) zeichnen; hits = Einschlagpunkte
  function strike(hits) {
    var w = innerWidth, h = innerHeight;
    var svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'bolt');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var html = '';
    hits.forEach(function (hit) {
      var bo = bolt(hit);
      html +=
        '<path class="bolt-glow" d="' + bo.main + ' ' + bo.branches + '"/>' +
        '<path class="bolt-mid" d="' + bo.main + '"/>' +
        '<path class="bolt-branch" d="' + bo.branches + '"/>' +
        '<path class="bolt-core" d="' + bo.main + '"/>';
    });
    svg.innerHTML = html;
    var flash = document.createElement('div');
    flash.className = 'bolt-flash';
    document.body.appendChild(flash);
    document.body.appendChild(svg);
    setTimeout(function () { svg.remove(); flash.remove(); }, 950);
  }

  // Überall, wo KIUKAMBERS steht: Sticker-Titel, Schriftzug oben links,
  // Fusszeile und im Text
  function zap(el) {
    if (calm) return;
    var r = el.getBoundingClientRect();
    strike([[r.left + r.width * (0.3 + Math.random() * 0.4), r.top + r.height / 2]]);
    el.classList.remove('zapped');
    void el.offsetWidth;
    el.classList.add('zapped');
  }

  var title = document.querySelector('.ransom');
  if (title) {
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    title.setAttribute('title', 'Klick mich!');
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zap(title); }
    });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.ransom, .brand, .zap');
    if (!el) return;
    zap(el);
    // Schriftzug oben links ist ein Link zur Startseite: erst Blitz, dann weiter
    if (el.classList.contains('brand') && !calm) {
      e.preventDefault();
      var href = el.href;
      setTimeout(function () { location.href = href; }, 650);
    }
  });
})();

// Mauszeiger wie bei offspring.com, in Neongrün: grosse Plasma-Energiekugel,
// die der Maus weich folgt, plus kleiner Punkt. Dazu der Sticker-Titel,
// der der Maus folgt.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;

  // ---------- Sticker-Titel folgt der Maus ----------
  var hero = document.querySelector('.hero');
  var title = document.querySelector('.ransom');
  if (hero && title && fine) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      title.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
      title.style.setProperty('--my', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
    });
    hero.addEventListener('mouseleave', function () {
      title.style.setProperty('--mx', 0);
      title.style.setProperty('--my', 0);
    });
  }

  // ---------- Plasma-Kugel + Punkt ----------
  var SIZE = 128;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var canvas = document.createElement('canvas');
  canvas.className = 'cursor-ring cur-hidden';
  canvas.width = canvas.height = SIZE * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  var dot = document.createElement('div');
  dot.className = 'cursor-dot cur-hidden';
  document.body.appendChild(canvas);
  document.body.appendChild(dot);

  // Touch-Bedienung: Mauszeiger-Effekt entfernen
  document.addEventListener('touchstart', function () {
    canvas.remove();
    dot.remove();
  }, { once: true, passive: true });

  var C = SIZE / 2;
  var mx = -400, my = -400;                 // Maus
  var rx = -400, ry = -400, dx = -400, dy = -400;
  var ringScale = 1, ringTarget = 1, ringAlpha = 1, ringAlphaTarget = 1;
  var dotScale = 1, dotTarget = 1, dotAlpha = 1, dotAlphaTarget = 1;
  var started = false;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!started) {
      rx = dx = mx; ry = dy = my;
      started = true;
      canvas.classList.remove('cur-hidden');
      dot.classList.remove('cur-hidden');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) {
      canvas.classList.add('cur-hidden');
      dot.classList.add('cur-hidden');
    }
  });
  document.addEventListener('mouseover', function (e) {
    if (!e.relatedTarget) {
      canvas.classList.remove('cur-hidden');
      dot.classList.remove('cur-hidden');
    }
    var onLink = e.target.closest && e.target.closest('a, button');
    ringTarget = onLink ? 10 / 15 : 1;
    ringAlphaTarget = onLink ? 0.5 : 1;
    dotTarget = onLink ? 3 : 1;
    dotAlphaTarget = onLink ? 0.5 : 1;
  });

  // Energie-Fäden: viele feine, verästelte Linien; ein Teil wird jedes
  // Frame neu gewürfelt -> lebendiges Flackern wie im Offspring-Video
  var BOLTS = 42;
  var bolts = [];
  function makeBolt(i) {
    var a = (i / BOLTS) * Math.PI * 2 + Math.random() * 0.4;
    var r = 4, pts = [[C + Math.cos(a) * r, C + Math.sin(a) * r]];
    var maxR = SIZE * (0.2 + Math.random() * 0.24);
    var branch = null;
    while (r < maxR) {
      a += (Math.random() - 0.5) * 0.45;
      r += 3 + Math.random() * 4;
      pts.push([C + Math.cos(a) * r, C + Math.sin(a) * r]);
      if (!branch && r > maxR * 0.45 && Math.random() < 0.08) {
        var ba = a + (Math.random() < 0.5 ? -0.6 : 0.6), br = r;
        branch = [[pts[pts.length - 1][0], pts[pts.length - 1][1]]];
        for (var k = 0; k < 5; k++) {
          ba += (Math.random() - 0.5) * 0.5;
          br += 3 + Math.random() * 4;
          branch.push([C + Math.cos(ba) * br, C + Math.sin(ba) * br]);
        }
      }
    }
    return { pts: pts, branch: branch, w: 0.6 + Math.random() * 1.1 };
  }
  for (var bi = 0; bi < BOLTS; bi++) bolts.push(makeBolt(bi));

  function stroke(pts, width, color) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function glow(x, y, r, inner, outer) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPlasma(t) {
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // äusserer Dunst
    glow(C, C, SIZE * 0.48, 'rgba(57, 255, 20, 0.3)', 'rgba(57, 255, 20, 0)');

    // wolkige, brodelnde Energie
    for (var i = 0; i < 70; i++) {
      var a = i * 2.399 + t * (0.25 + (i % 5) * 0.06) * (i % 2 ? 1 : -1);
      var r = SIZE * (0.12 + 0.3 * ((i * 0.618) % 1) + 0.04 * Math.sin(t * 1.7 + i));
      var x = C + Math.cos(a) * r, y = C + Math.sin(a) * r;
      glow(x, y, SIZE * (0.035 + 0.025 * Math.sin(t * 2.3 + i * 1.3) + 0.02), 'rgba(80, 255, 60, 0.16)', 'rgba(80, 255, 60, 0)');
    }

    // Energie-Fäden
    for (var n = 0; n < 6; n++) {
      var idx = Math.floor(Math.random() * BOLTS);
      bolts[idx] = makeBolt(idx);
    }
    for (var b = 0; b < bolts.length; b++) {
      var bo = bolts[b];
      stroke(bo.pts, bo.w * 4, 'rgba(57, 255, 20, 0.14)');
      stroke(bo.pts, bo.w, 'rgba(190, 255, 170, 0.7)');
      if (bo.branch) stroke(bo.branch, bo.w * 0.8, 'rgba(150, 255, 120, 0.55)');
    }

    // heller Kern
    var pulse = 1 + 0.08 * Math.sin(t * 6) + 0.04 * Math.random();
    glow(C, C, SIZE * 0.26 * pulse, 'rgba(120, 255, 90, 0.9)', 'rgba(57, 255, 20, 0)');
    glow(C, C, SIZE * 0.15 * pulse, 'rgba(255, 255, 255, 1)', 'rgba(200, 255, 180, 0)');
    glow(C, C, SIZE * 0.07 * pulse, 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)');
    ctx.globalCompositeOperation = 'source-over';
  }

  (function loop(now) {
    var t = (now || 0) / 1000;
    // weich folgen (wie gsap quickTo, 0.5s): Kugel träge, Punkt schneller
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    dx += (mx - dx) * 0.25;
    dy += (my - dy) * 0.25;
    ringScale += (ringTarget - ringScale) * 0.1;
    ringAlpha += (ringAlphaTarget - ringAlpha) * 0.1;
    dotScale += (dotTarget - dotScale) * 0.15;
    dotAlpha += (dotAlphaTarget - dotAlpha) * 0.15;

    canvas.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%) scale(' + ringScale + ')';
    canvas.style.opacity = ringAlpha;
    dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) translate(-50%,-50%) scale(' + dotScale + ')';
    dot.style.opacity = dotAlpha;

    if (started) drawPlasma(t);
    requestAnimationFrame(loop);
  })();
})();
