const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get('qname');
console.log(q)

$('#btn').click( ()=>{

  $.post("http://localhost:8080/judge" ,{
      code: $('#code').val(),
      lang: $('#lang').find(":selected").val(),
      question: 'hello-world'
    },
    (data) => {
      $('#output').html(data)
    });

} )
