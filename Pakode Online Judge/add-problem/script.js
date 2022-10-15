

/* -------------------------------------------------------------------------- */
/*                          ANCHOR Step change logic                          */
/* -------------------------------------------------------------------------- */

function goToStep(n){
  $('[step]').addClass('hidden')
  $('[step]').removeClass('animate')
  $(`[step=${n}]`).removeClass('hidden')
  $(`[step=${n}]`).addClass('animate')
}

stepIdx = 1
goToStep(1)

data = {
  name: '',
  statement : '',
  tests: []
}

$('[stepper]').click(function() {
  moveSteps = parseInt($(this).attr('stepper')) 
  if(moveSteps == -2){
    data.tests.push({in: $('#in').val(), out: $('#out').val()})
    $('#in').val('')
    $('#out').val('')
  }
  if(moveSteps == 100){
    data.tests.push({in: $('#in').val(), out: $('#out').val()})
    data.name = $('#name').val()
    data.statement = $('#statement').val()

    $.post("http://localhost:8080/api/post-problem" ,data,
    (data) => {
      console.log(data)
      console.log('Question Posted!')
    });

  }
  stepIdx += moveSteps
  goToStep(stepIdx)
})



/* -------------------------------------------------------------------------- */
/*                         ANCHOR Create button logic                         */
/* -------------------------------------------------------------------------- */

// $('.create-btn').click(()=>{
//   alert('clicked lol')
//   data.name = $('#name').val()
//   data.statement = $('#statement').val()
//   console.log(data)
//   // $.post("http://localhost:8080/api/post-problem" ,{
//   //     name: $('#name').val(),
//   //     statement: $('#statement').val(),
//   //   },
//   //   (data) => {
//   //     console.log(data)
//   //     console.log('Question Posted!')
//   //   });
// })