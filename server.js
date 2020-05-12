// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
const path = require('path');
// const rp = require('request-promise');
const port = 8100;
const r = require('request');
const fs = require('fs');
let serverKey = fs.readFileSync('./server.key', 'utf8');
const Cryptr = require('cryptr');
const request = require('request');
const cryptr = new Cryptr(serverKey);

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
    default:
      break;
  }
});


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