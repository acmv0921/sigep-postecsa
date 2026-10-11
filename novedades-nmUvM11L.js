/* SIGEP · Anuncio de novedades. Se muestra una sola vez por versión en cada equipo. */
(function () {
  var VERSION = '2.6.2';
  var CLAVE = 'sigep_novedades_vista';
  var FECHA = '11 de octubre de 2026';
  var CAMBIOS = [
    ['Proveedor por cada ítem, a la vista', 'En Compras, la tabla de ítems tiene ahora la columna “Proveedor elegido (por ítem)”: desplegable con las ofertas de cada ítem (★ la más económica). Registra una cotización por proveedor y elige el ganador de cada ítem ahí mismo.'],
    ['Buscador de proveedor que despliega', 'Al registrar una cotización, “Buscar proveedor registrado” muestra una lista mientras escribes letras del nombre, NIT o ciudad; al tocar uno se llenan sus datos. Si no existe, se crea como nuevo al registrar.'],
    ['Una orden de compra por proveedor', 'Al aprobar, la requisición se divide y se emite una OC por proveedor, con los ítems que ganó cada uno.'],
    ['Avisos por WhatsApp con un toque', 'Botón verde “Avisar por WhatsApp” en la bandeja, Compras y Aprobaciones: abre WhatsApp con el mensaje listo.']
  ];
  var ls = null;
  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar() { try { localStorage.setItem(CLAVE, VERSION); } catch (e) {} }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function cerrar() { var m = document.getElementById('sigep-novedades'); if (m) m.remove(); guardar(); }
  function mostrar() {
    if (document.getElementById('sigep-novedades')) return;
    var cont = document.createElement('div');
    cont.id = 'sigep-novedades';
    cont.setAttribute('role', 'dialog');
    cont.setAttribute('aria-modal', 'true');
    cont.setAttribute('aria-label', 'Novedades de la versión ' + VERSION);
    var lista = CAMBIOS.map(function (c) {
      return '<li><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></li>';
    }).join('');
    cont.innerHTML =
      '<div class="sgn-caja"><div class="sgn-cab"><div class="sgn-tag">NUEVA VERSIÓN</div>' +
      '<h2>SIGEP ' + VERSION + '</h2><p>' + FECHA + '</p></div>' +
      '<div class="sgn-cuerpo"><p class="sgn-tit">Esto es lo que cambió:</p><ul>' + lista + '</ul></div>' +
      '<div class="sgn-pie"><button type="button" id="sgn-ok">Entendido</button></div></div>';
    document.body.appendChild(cont);
    document.getElementById('sgn-ok').addEventListener('click', cerrar);
    cont.addEventListener('click', function (e) { if (e.target === cont) cerrar(); });
  }
  function boton() {
    if (document.getElementById('sigep-ver')) return;
    var b = document.createElement('button');
    b.id = 'sigep-ver'; b.type = 'button'; b.textContent = 'v' + VERSION;
    b.title = 'Ver novedades de esta versión';
    b.addEventListener('click', mostrar);
    document.body.appendChild(b);
  }
  function iniciar() {
    try {
      boton();
      if (leer() !== VERSION) setTimeout(mostrar, 1200);
    } catch (e) { /* el anuncio nunca debe romper la app */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
