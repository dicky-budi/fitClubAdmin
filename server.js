// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
const path = require('path');
const port = 8100;
const r = require('request');
// let serverKey = fs.readFileSync('./server.key', 'utf8');
// const Cryptr = require('cryptr');
// const request = require('request');
// const cryptr = new Cryptr(serverKey);

let fastifyHelmet = require('fastify-helmet');
// Declare a route
fastify.register(fastifyHelmet)
  .register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  }).register(require('fastify-healthcheck'), {
    healthcheckUrl: '/custom-health',
    healthcheckUrlAlwaysFail: true
  })
  .register(require('under-pressure'), {
    maxEventLoopDelay: 1000,
    message: 'Under pressure!',
    retryAfter: 50
  });
const io = require('socket.io')(fastify.server);

var url = 'http://localhost:8888/ronaldSengkey/fitClub/api/v1';

fastify.get('/:origin', async function (req, reply) {
  switch (req.params.origin){
    case '':
      reply.redirect('/login');
      break;
    case 'login':
      reply.sendFile('layouts/login.html');
      break;
    case 'index':
      reply.sendFile('layouts/index.html');
      break;
    case 'dashboard':
      reply.sendFile('layouts/dashboard/dashboard.html');
      break;
    case 'classPage':
      reply.sendFile('layouts/class/classList.html');
      break;
    case 'schedule':
      reply.sendFile('layouts/schedule/scheduleList.html');
      break;
    case 'employee':
      reply.sendFile('layouts/employee/employeeList.html');
      break;
    case 'attendance':
      reply.sendFile('layouts/attendance/attendanceList.html');
      break;
    case 'scheduleForm':
      reply.sendFile('layouts/schedule/scheduleForm.html');
      break;
    case 'switchSchedule':
      reply.sendFile('layouts/schedule/switchSchedule.html');
      break;
    case 'addClass':
      reply.sendFile('layouts/class/addClass.html');
      break;
    default:
      break;
  }
});

fastify.post('/:origin', async function (req, reply) {
  var redirectUrl = url + '/' + req.params.origin;
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
      },
      "processData": false,
      "body":JSON.stringify(req.body),
  }
  try {
    let a = await actionPost(settings);
    reply.send(a);
  } catch (err) {
    reply.send(err)
  }
});

fastify.post('/submitSchedule', async function (req, reply) {
  var redirectUrl = url + '/coach/class/schedule/' + req.headers.token;
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
      },
      "processData": false,
      "body":JSON.stringify(req.body),
  }
  console.log('set',settings);
  try {
    let a = await actionPost(settings);
    reply.send(a);
  } catch (err) {
    reply.send(err)
  }
});

fastify.put('/switchSchedule', async function (req, reply) {
  var redirectUrl = url + '/coach/switchClass/' + req.headers.token;
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
      },
      "processData": false,
      "body":JSON.stringify(req.body),
  }
  console.log('set',settings);
  try {
    let a = await actionPut(settings);
    reply.send(a);
  } catch (err) {
    reply.send(err)
  }
});

fastify.get('/class/schedule', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json'
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

fastify.get('/classList', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json',
        "param": "all"
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

fastify.get('/place', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json'
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

fastify.get('/coach/class/schedule', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json',
        "filter" : "all"
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

fastify.get('/class', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json',
        "param" : 'all'
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

fastify.get('/coachlist', async function (req, reply){
  var redirectUrl = url + req.raw.url + '/' + req.headers.token
  try{
    let data = {
      "async": true,
      "crossDomain": true,
      "url": redirectUrl,
      "method": "GET",
      "headers": {
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Content-type":'application/json'
      }
    }
    let a = await actionGet(data);
    reply.send(a);
  }catch(err){
    console.log("error apa", err);
    reply.send(500);
  }
});

function actionPut(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let settings = data;
      r.put(settings, function (error, response, body) {
        if (error) {
          reject(500);
        } else {
          let result = JSON.parse(body);
          resolve(result);
        }
      })
    } catch (err) {
      console.log("error action post", err);
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  })
}

function actionPost(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let settings = data;
      r.post(settings, function (error, response, body) {
        if (error) {
          reject(500);
        } else {
          let result = JSON.parse(body);
          resolve(result);
        }
      })
    } catch (err) {
      console.log("error action post", err);
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  })
}

function actionGet(data) {
  return new Promise(async (resolve, reject) => {
    try {
      let settings = data;
      r.get(settings, function (error, response, body) {
        if (error) {
          reject(process.env.ERRORINTERNAL_RESPONSE);
        } else {
          let result = JSON.parse(body);
          resolve(result);
        }
      })
    } catch (err) {
      console.log("error action get", err);
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  })
}


const start = async () => {
  try {
    let fr = await fastify.ready();
    await fr.listen(port, '0.0.0.0');
    // console.log(fastify.memoryUsage())
    // fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()