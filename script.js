/* CV Genaro Pereira — mejoras progresivas mínimas.
   El sitio funciona sin JavaScript; esto solo agrega una red de seguridad. */
(function () {
  'use strict';

  // Si por algún motivo el PDF estático no estuviera disponible (404),
  // ofrecemos imprimir/guardar la página como PDF desde el navegador.
  var links = document.querySelectorAll('a[href$=".pdf"][download]');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var url = link.getAttribute('href');
      // Comprobación rápida: solo en http(s); en file:// el navegador descarga directo.
      if (location.protocol === 'file:') return;
      fetch(url, { method: 'HEAD' })
        .then(function (res) {
          if (!res.ok) throw new Error('no pdf');
        })
        .catch(function () {
          e.preventDefault();
          window.print();
        });
    });
  });
})();
