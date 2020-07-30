const cron = require('node-cron');
const { clearUserValid } = require('./usersTasks');

function Api() {
  //const second = '* * * * * *';
  const minute = '59 * * * *';
  let i = 0;

  const task = cron.schedule(
    minute,
    () => {
      clearUserValid();
      i = i + 1;
      console.log(`running a task every minute ${i}`);
    },
    {
      scheduled: false,
    }
  );

  task.start();

  console.log('Task');
}

module.exports = Api;
