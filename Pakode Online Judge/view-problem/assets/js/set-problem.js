$('#create-btn').click(()=>{
  console.log('clicked')
  $.post("http://localhost:8080/post-problem" ,{
      name: $('#name').val(),
      statement: $('#statement').val(),
      testIn: $('#testIn').val(),
      testOut: $('#testOut').val()
    },
    (data) => {
      console.log('done')
    });
})