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

var busca = (palavra)=> ajax(`http://dicionario-aberto.net/search-json/${palavra}`, 
        function (e) {
            var significados = JSON.parse(e.target.response);
            var def = significados.entry.sense[0].def;
            document.querySelector('#select').value = palavra;
            document.querySelector('#definicao').value = '';
            document.querySelector('#definicao').innerHTML = def;
        });