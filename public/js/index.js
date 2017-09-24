document.querySelector('#teste').addEventListener('click', function(e) {
  busca(document.querySelector('#palavra').value);
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

var significados = ''; 

var busca = (palavra)=> ajax(`http://dicionario-aberto.net/search-json/${palavra}`, 
        function (e) {
            significados = JSON.parse(e.target.response);
            significados.entry.sense[0].def // caminho com significados
        });