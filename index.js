const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());


const arrayOfNames = [];

// should sleep for n ms
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// should call get route
app.post('/user', async (req, res) => {
  const userName = req.body.username;

  console.log('Pausado por 10 seconds');
  await sleep(10000);

  arrayOfNames.push(userName);

  console.log('All names', arrayOfNames)

  return res.send('Success').status(200);
});

// should start server on port 3333
const server = app.listen(3333, () => {
  console.info('Server start on port 3333')
});

// should catch the process and stop anything when the end process called
const signals = [
  "SIGINT",
  "SIGTERM",
  "SIGQUIT"
];

signals.map(signal => {
  
  process.on(signal, () => {
    console.info(`${signal} signal received.`);
    console.log('Closing http server.');

    server.close(() => {
      console.log('Http server closed');

      process.exit(1);
    });

  });
});
