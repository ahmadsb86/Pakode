const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('qid');
console.log(q)

const API_URL = "http://localhost:8080/api"


startString = {
  "cpp": `#include <bits/stdc++.h>
using namespace std;

int main(){
  // Code here
}`,
  "py": `#code here`
}

modeMap = {
  "cpp": "c_cpp",
  "py": "python"
}

language = ''


var editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.setOptions({fontSize: "16pt"})

$('[mode]').click(function (){
  $('#language-selector').addClass('hidden')
  $('#ide').removeClass('hidden') 
  language = $(this).attr('mode')
  editor.setValue(startString[language])
  editor.session.setMode(`ace/mode/${modeMap[language]}`);
})

$.post(`${API_URL}/get-info`, {
  qid: q
}, (res) => {
  $('#qname').html(res.name) 
  $('#qstatement').html(res.statement)
})

$('#btn').click( ()=>{

  $([document.documentElement, document.body]).animate({
    scrollTop: $("#output").offset().top
}, 2000);
  $("#output").html("Results pending...")

  $.post(`${API_URL}/judge` ,{
      code: editor.getValue(),
      lang: language,
      qid: q
    },
    (data) => {
      string = ''
      for(let i = 0; i<data.length; i++){
        if(data[i].startsWith('Correct'))
          string += `<span class="text-green-300">${i+1}. ${data[i]}</span> <br>`
        else
          string += `<span class="text-red-400">${i+1}. ${data[i]}</span> <br>`
      }
      console.log(string)
      $('#output').html('')
      $('#output').html(string)
    });

} )
