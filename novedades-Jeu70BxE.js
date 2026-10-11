/* SIGEP · Anuncio de novedades. Se muestra una sola vez por versión en cada equipo. */
(function () {
  var VERSION = '2.6.0';
  var CLAVE = 'sigep_novedades_vista';
  var FECHA = '11 de octubre de 2026';
  var CAMBIOS = [
    ['Varios proveedores por ítem', 'En Compras, cada ítem puede tener ofertas de uno o varios proveedores. Un proveedor puede cotizar solo algunos ítems (deja en blanco el precio de los que no cotiza). El comparativo por ítem muestra el precio de cada oferta y marca la más económica con ★.'],
    ['Una orden de compra por proveedor', 'Compras elige el ganador de cada ítem y el aprobador puede cambiarlo. Al aprobar, la requisición se divide y se emite una OC por proveedor; cada parte sigue su propia recepción y factura (códigos REQ-…, REQ-…-B, etc.).'],
    ['Buscadores con escritura', 'Las listas largas (solicitante, equipo, catálogo, proveedores) ahora se buscan escribiendo letras y se despliegan las coincidencias.'],
    ['Proveedores nuevos al instante', 'Si escribes un proveedor que no existe al cotizar, se crea automáticamente en la base de proveedores; puedes completar sus datos luego.'],
    ['Avisos por WhatsApp', 'Cuando se emite una requisición, cuando Compras envía cotizaciones a aprobación y cuando se aprueba, el sistema avisa por WhatsApp a Abdiel, Lorena y Adriana (requiere activar el servicio una sola vez por persona).']
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
