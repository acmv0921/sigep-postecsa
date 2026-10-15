/* SIGEP · Anuncio de novedades. Se muestra una sola vez por versión en cada equipo. */
(function () {
  var VERSION = '2.8.0';
  var CLAVE = 'sigep_novedades_vista';
  var FECHA = '13 de octubre de 2026';
  var CAMBIOS = [
    ['Materia prima por área', 'Al radicar una requisición ahora se indica si es materia prima y para qué área: QFT, POSTE, MÁQUINA AMARILLA, PREFABRICADOS, CALADOS o PLANTA GENERAL (o “No es materia prima”). El dato se ve en Compras, en Aprobaciones y en el mensaje de WhatsApp.'],
    ['Barra superior ajustada a la pantalla', 'En computadores con zoom o pantallas medianas, los botones de la barra superior (Nueva Requisición, usuario, Salir) ya no quedan cortados: la barra se acomoda en dos filas cuando no caben.'],
    ['Adjuntos por proveedor', 'Al agregar un proveedor en cada ítem ahora se pueden subir su cotización, su ficha técnica, varias fotos y un concepto técnico. El aprobador ve todos los archivos en la tabla de cotizaciones.'],
    ['Elegir otro contacto en el aviso', 'La ventana del aviso por WhatsApp ahora tiene, además del botón directo al responsable, el botón “Elegir otro contacto o grupo” para enviar el mensaje a cualquier número.'],
    ['Transporte ya no se cuenta dos veces', 'Si el transporte aparece como ítem y también como flete, el formulario de cotización lo avisa en rojo y ofrece quitarlo de uno de los dos lugares con un clic. “Usar como flete” ya limpia el ítem de transporte.'],
    ['Proveedor por ítem también con un solo ítem', 'Las requisiciones de un ítem ahora tienen la misma columna “Proveedor elegido”, el botón para agregar proveedores y el comparativo, igual que las de varios ítems.'],
    ['Recordatorio de anexos', 'Al cotizar se recuerda anexar cotización, ficha técnica, fotos y concepto técnico de cada proveedor.'],
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
