var findWord = function () {
  var textarea = document.querySelector('textarea');
  var pos = textarea.selectionStart;
  var palavras = textarea.value.split(' ');
  var palavra;
  for (var i = qnt = 0; (i < palavras.length && !palavra); i++) {
    qnt += palavras[i].length+1;
    if (qnt > pos && !palavra) palavra = palavras[i];
  }
  return palavra
}

var buildMeaning = function (significado, string) {
  var def = significado;
  var definicao = '';
  if (def.superEntry) {
      for (var i = 0; i < def.superEntry.length; i++){
        definicao += def.superEntry[i].entry.sense[0].def+'<br/>';
      }
  } else definicao += def.entry.sense[0].def;

  while (definicao.indexOf('_') != -1) { 
    definicao = definicao.replace('_',''); 
  }            
  document.querySelector('#select').value = string;
  document.querySelector('#definicao').value = '';
  document.querySelector('#definicao').innerHTML = definicao;
}

document.querySelector('#palavra').addEventListener('click', function (e) {
  busca(findWord());
  e.preventDefault();
});

document.querySelector('#palavra').addEventListener('keydown', function (e) {
  if (e.keyCode > 36 && e.keyCode < 41) { 
    busca(findWord());
    return true
  } else return true
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

var busca = (palavra)=> ajax(`http://dicionario-aberto.net/search-json/${palavra}`, (e)=> buildMeaning(JSON.parse(e.target.response), palavra));