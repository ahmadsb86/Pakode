const API_URL = "http://localhost:8080/api"

const d = new Date();
d.setTime(d.getTime()+(360*24*60*60*1000))
let expires = "expires="+ d.toUTCString();
document.cookie = '' + "=" + cvalue + ";" + expires + ";path=/";
console.log(document.cookie)

$.get(`${API_URL}/get-problems`,
(data) => {
  for(let i = 0; i < data.length; i++){
    $('#links').append(`<a href="/POJ/view-problem?qid=${data[i].id}">${data[i].name}</a> <br>`)
  }
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}