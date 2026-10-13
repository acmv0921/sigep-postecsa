/* SIGEP · Anuncio de novedades. Se muestra una sola vez por versión en cada equipo. */
(function () {
  var VERSION = '2.7.0';
  var CLAVE = 'sigep_novedades_vista';
  var FECHA = '11 de octubre de 2026';
  var CAMBIOS = [
    ['Aviso obligatorio por WhatsApp en cada etapa', 'Al cerrar una etapa (requisición emitida, aprobación inicial, cotizaciones enviadas a aprobar, aprobada o rechazada, recibida en planta) aparece una ventana que abre WhatsApp directamente con el siguiente responsable y el mensaje listo. La etapa no se da por cerrada hasta pulsar el botón verde y volver a confirmar.'],
    ['Proveedor por cada ítem, a la vista', 'En Compras, cada fila de la tabla de ítems tiene el botón “＋ Agregar proveedor y precio” y la columna “Proveedor elegido (por ítem)” para escoger el ganador (★ el más económico).'],
    ['Buscador de proveedor que despliega', 'Al cotizar, “Buscar proveedor registrado” despliega coincidencias mientras escribes letras del nombre, NIT o ciudad.'],
    ['Una orden de compra por proveedor', 'Al aprobar, la requisición se divide y se emite una OC por proveedor, con los ítems que ganó cada uno.']
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
