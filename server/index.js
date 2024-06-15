const { isToday } = require('date-fns');
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
      },
      {
        amount: 15.45,
        date: 'Tue May 14 2019 09:21:35 GMT-0500 (Central Daylight Time)',
      },
    ],
  },
  {
    accountBalance: 10000.0,
    id: '2345',
    withdrawHistory: [
      {
        amount: 5.0,
        date: 'Wed Jun 12 2024 09:30:21 GMT-0500 (Central Daylight Time)',
      },
    ],
  },
];

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

app.post('/accounts/balance', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (sessionAccount) {
    res.status(200).send({
      message: 'Balance fetched!',
      accountBalance: sessionAccount.accountBalance,
    });
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

  sessionAccount.accountBalance += Number(reqBody.amount);

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

  const dailyWithdrawalAmount = sessionAccount.withdrawHistory.reduce(
    (amountSum, currentValue) => {
      const currentDate = new Date(currentValue.date);

      if (isToday(currentDate)) {
        return (amountSum += currentValue.amount);
      }

      return amountSum;
    },
    0
  );

  if (dailyWithdrawalAmount + Number(reqBody.amount) > 3000) {
    res.status(400).send({ message: 'Amount exceeds daily limit!' });
    return;
  }

  if (sessionAccount.accountBalance < Number(reqBody.amount)) {
    res.status(400).send({ message: 'Amount exceeds your balance!' });
    return;
  }

  // TODO number here hope to be temp
  sessionAccount.accountBalance -= Number(reqBody.amount);
  sessionAccount.withdrawHistory.unshift({
    amount: Number(reqBody.amount),
    date: new Date().toString(),
  });

  res.status(200).send({
    message: `Withdrew $${reqBody.amount}!`,
    accountBalance: sessionAccount.accountBalance,
  });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
