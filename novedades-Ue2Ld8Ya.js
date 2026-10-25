/* SIGEP · Anuncio de novedades. Se muestra una sola vez por versión en cada equipo. */
(function () {
  var VERSION = '3.3.3';
  var CLAVE = 'sigep_novedades_vista';
  var FECHA = '25 de octubre de 2026';
  var CAMBIOS = [
    ['Viabilidad de la compra', 'Al enviar el cuadro comparativo, Compras pulsa “SOLICITAR VIABILIDAD” con una justificación obligatoria. La requisición va al aprobador, que decide Cerrar (se anula) o Esperar.'],
    ['En Espera por Viabilidad', 'Las requisiciones en espera salen de la mesa de Compras (no cuentan contra su tiempo) y quedan en Aprobaciones con los días que llevan esperando y aviso cuando pasa un mes. El aprobador puede reactivarlas o cerrarlas en cualquier momento.'],
    ['Buscador en Aprobaciones', 'Sobre la lista de Aprobaciones hay un buscador (por ítem, código, solicitante, área o proveedor) que filtra la pestaña en la que estás.'],
    ['Pendiente por Financiera', 'En Compras, una requisición aprobada que no se puede comprar por falta de fondos se marca “Pendiente por Financiera” con justificación. No cuenta contra Compras. Si pasa de 16 días corridos aparece el aviso de guardafuegos para escalar a Gerencia. Al resolverse se pulsa “Resolver por Financiera”.'],
    ['Todo lo anterior sigue igual', 'Cotizar desde la Bandeja, el buscador de Compras y la compra por proveedor funcionan como antes.']
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
