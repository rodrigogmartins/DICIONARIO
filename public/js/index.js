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
            var def = (JSON.parse(e.target.response));//.entry.sense[0].def;
            var definicao = '';
            (def.superEntry)? (definicao += def.superEntry[0].entry.sense[0].def+'<br/>', 
            definicao += def.superEntry[1].entry.sense[0].def) : definicao += def.entry.sense[0].def;

            while (definicao.indexOf('_') != -1) { definicao = definicao.replace('_',''); }
            
            document.querySelector('#select').value = palavra;
            document.querySelector('#definicao').value = '';
            document.querySelector('#definicao').innerHTML = definicao;
        });