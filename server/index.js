const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const accounts = [
  {
    accountBalance: 40.0,
    id: '1234',
    withdrawHistory: [
      {
        amount: 5.0,
        date: 'Tue Jul 04 2023 13:04:35 GMT-0500 (Central Daylight Time)',
        type: 'withdrawal',
      },
      {
        amount: 15.45,
        date: 'Tue May 14 2019 09:21:35 GMT-0500 (Central Daylight Time)',
        type: 'withdraw',
      },
    ],
  },
  {
    accountBalance: 40.0,
    id: '2345',
    withdrawHistory: [
      {
        amount: 5.0,
        date: 'Tue Jul 04 2023 13:04:35 GMT-0500 (Central Daylight Time)',
        type: 'withdrawal',
      },
      {
        amount: 15.45,
        date: 'Tue May 14 2019 09:21:35 GMT-0500 (Central Daylight Time)',
        type: 'withdraw',
      },
    ],
  },
];

app.get('/', (req, res) => {
  res.send({ msg: 'Hello World!' });
});

app.post('/accounts', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (sessionAccount) {
    res.status(200).send({ message: 'Session Initiated!' });
    return;
  }

  res.status(400).send({ message: 'Account not found!' });
  return;
});

app.post('/accounts/deposit', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (!sessionAccount) {
    res.status(400).send({ message: 'Account not found!' });
    return;
  }

  sessionAccount.accountBalance += reqBody.amount;

  res.status(200).send({
    message: `Deposited $${reqBody.amount}!`,
    accountBalance: sessionAccount.accountBalance,
  });
  return;
});

app.post('/accounts/withdraw', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (!sessionAccount) {
    res.status(400).send({ message: 'Account not found!' });
    return;
  }

  // TODO - need to check daily withdraw limit
  sessionAccount.accountBalance -= reqBody.amount;

  // TODO - if exceeds daily, res.status error

  res.status(200).send({
    message: `Withdrew $${reqBody.amount}!`,
    accountBalance: sessionAccount.accountBalance,
  });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
