/* SIGEP · Buscadores escribibles. Convierte las listas largas (solicitante, equipo, catálogo, etc.)
   en un campo donde se escribe y se despliegan las coincidencias. No altera la lógica de la app:
   al elegir, actualiza la lista original y avisa el cambio como si se hubiera elegido con el mouse. */
(function () {
  var MIN = 8, n = 0, pares = [];
  var setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;
  function etiqueta(o) { return (o.textContent || '').replace(/\s+/g, ' ').trim(); }
  function candidata(sel) {
    if (sel.dataset.sgb || sel.multiple) return false;
    if (sel.closest('td,th')) return false;
    if (sel.options.length < MIN) return false;
    var p = etiqueta(sel.options[0]);
    if (/No mapear|Opcional/i.test(p)) return false;
    return true;
  }
  function sincronizar(sel, inp) {
    var o = sel.options[sel.selectedIndex];
    var v = o && o.value !== '' && o.value !== 'CUSTOM' && o.value !== 'all' ? etiqueta(o) : '';
    if (document.activeElement !== inp) inp.value = v;
  }
  function mejorar(sel) {
    var id = 'sgb-dl-' + (++n);
    sel.dataset.sgb = '1';
    var inp = document.createElement('input');
    inp.type = 'search';
    inp.setAttribute('list', id);
    inp.setAttribute('autocomplete', 'off');
    inp.className = sel.className;
    inp.placeholder = 'Escribe para buscar… (' + (sel.options.length - 1) + ' opciones)';
    inp.setAttribute('aria-label', sel.getAttribute('aria-label') || 'Buscar');
    inp.style.width = sel.style.width || '100%';
    var dl = document.createElement('datalist');
    dl.id = id;
    var mapa = {};
    function llenar() {
      dl.innerHTML = ''; mapa = {};
      for (var i = 0; i < sel.options.length; i++) {
        var o = sel.options[i];
        if (o.value === '' || o.value === 'CUSTOM' || (i === 0 && /^--/.test(etiqueta(o)))) continue;
        var t = etiqueta(o);
        if (mapa[t] !== undefined) t = t + ' [' + o.value + ']';
        mapa[t] = i;
        var op = document.createElement('option'); op.value = t; dl.appendChild(op);
      }
    }
    llenar();
    function aplicar(valor) {
      if (sel.value === valor) return;
      setter.call(sel, valor);
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
    inp.addEventListener('input', function () {
      var t = inp.value;
      if (mapa[t] !== undefined) { aplicar(sel.options[mapa[t]].value); inp.blur(); return; }
      if (t === '') aplicar(sel.options[0].value);
    });
    inp.addEventListener('blur', function () { sincronizar(sel, inp); });
    sel.style.display = 'none';
    sel.parentNode.insertBefore(inp, sel);
    sel.parentNode.insertBefore(dl, sel);
    sel.addEventListener('change', function () { sincronizar(sel, inp); });
    var obs = new MutationObserver(function () {
      if (!document.contains(sel)) { obs.disconnect(); return; }
      if (dl.childNodes.length !== sel.options.length - 1) llenar();
      sincronizar(sel, inp);
    });
    obs.observe(sel, { childList: true, subtree: true, attributes: true });
    sincronizar(sel, inp);
    pares.push([sel, inp]);
  }
  var pend = false;
  function barrer() {
    pend = false;
    try { var l = document.querySelectorAll('select'); for (var i = 0; i < l.length; i++) if (candidata(l[i])) mejorar(l[i]); } catch (e) {}
  }
  function programar() { if (!pend) { pend = true; setTimeout(barrer, 150); } }
  function iniciar() {
    barrer();
    setInterval(function () {
      pares = pares.filter(function (p) { return document.contains(p[0]); });
      pares.forEach(function (p) { sincronizar(p[0], p[1]); });
    }, 800);
    new MutationObserver(programar).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
