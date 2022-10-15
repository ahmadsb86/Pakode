const { Sequelize, Op, Model, DataTypes  } = require('sequelize');
const express = require('express');
const axios = require("axios");
const bodyParser = require('body-parser');
const qs = require("qs");
const chalk = require('chalk');

var app = express();


/* -------------------------------------------------------------------------- */
/*                              ANCHOR Middleware                             */
/* -------------------------------------------------------------------------- */


app.use(bodyParser.urlencoded({ extended: true }));


/* -------------------------------------------------------------------------- */
/*                               ANCHOR DB Init                               */
/* -------------------------------------------------------------------------- */


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

try {
  sequelize.authenticate();
  console.log(chalk.green('Connection has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    alloNull: false
  },
  statement: {
    type: DataTypes.TEXT,
  },
});

const TC = sequelize.define('TC', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  in: {
    type: DataTypes.STRING,
  },
  out: {
    type: DataTypes.TEXT,
  },
});

Question.hasMany(TC)

sequelize.sync()



/* -------------------------------------------------------------------------- */
/*                            ANCHOR Static Routes                            */
/* -------------------------------------------------------------------------- */

app.use('/POJ/view-problem/', express.static('view-problem'));
app.use('/POJ/add-problem', express.static('add-problem'));
app.use('/POJ/dashboard', express.static('dashboard'));

/* -------------------------------------------------------------------------- */
/*                              ANCHOR API Routes                             */
/* -------------------------------------------------------------------------- */

app.get('/api/get-problems', async (req,res)=>{
  Qs = await Question.findAll()
  res.send(Qs)
})

app.post('/api/post-problem', async (req,res)=>{
  const r = req.body
  Question.create({name: r.name, statement: r.statement})
  .then(result => {
    for (let i = 0; i < r.tests.length; i++)
      TC.create({QuestionId: result.id, in: r.tests[i].in, out: r.tests[i].out})
  })
})

app.post('/api/get-info', async (req,res)=>{
  const r = await Question.findByPk(req.body.qid)
  console.log(chalk.blue(`Found R: ${r}`))
  res.send(r)
})


app.get('/api/get-names', async (req,res)=>{
  r = await Question.findAll()
  res.send(r)
})

app.post('/api/judge', async (req, res)=>{

  q = await Question.findByPk(req.body.qid)

  testCase = await TC.findAll({
    where: {
      QuestionId: req.body.qid
    }
  })

  arr = []
  for(let i=0; i<testCase.length;i++){
    response = await judgeit(req.body.code, req.body.lang, testCase[i]).then((rawData)=>{
      data = rawData.substring(0,1000)
      console.log(chalk.magenta(data))
      arr.push(data)
    })
  }

  console.log(chalk.yellow('out of for loop'))

  res.send(arr)

});


/* -------------------------------------------------------------------------- */
/*                             ANCHOR Code Judger                             */
/* -------------------------------------------------------------------------- */



async function judgeit(code, lang, test){

  var data = qs.stringify({
    code: code,
    language:lang,
    input: test.in,
  });
  var config = {
    method: "post",
    url: "https://codex-api.herokuapp.com/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  return await axios(config)
  .then( response => {
    
    if(!response.data.success){
      return `${response.data.error}`
    }

    rawOutput =  JSON.stringify(response.data.output)
    answer = test.out
    attempt = rawOutput.slice(1,-1)
    attemptNoNL = rawOutput.slice(1,-3)

    if(attempt == answer || attemptNoNL == answer || rawOutput == answer)
      return 'Correct'

    return `Wrong. Your answer: ${rawOutput}. Expected output: "${answer}"`

  })
  .catch( error => {
    console.log(chalk.red(error));
    finalResponse = 'Fatal Server Side error'
  });


}

/* -------------------------------------------------------------------------- */
/*                               ANCHOR 404 Page                              */
/* -------------------------------------------------------------------------- */

app.get('*', function(req, res){
  res.status(404).send('No page here. 404');
});


/* -------------------------------------------------------------------------- */
/*                             ANCHOR Start Server                            */
/* -------------------------------------------------------------------------- */

app.listen(8080);
console.log(chalk.green('Server is listening on port 3000'));