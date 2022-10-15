$('#create-btn').click(()=>{
  $.post("http://localhost:8080/api/post-tc" ,{
      qid: $('#qid').val(),
      in: $('#testIn').val(),
      out: $('#testOut').val()
    },
    (data) => {
      console.log('Question Posted!')
    });
})