const { isToday } = require('date-fns');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const formatNumber = (number) => {
  return Number(Number(number).toFixed(2));
};

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
    setTimeout(
      () => res.status(200).send({ message: 'Session Initiated!' }),
      3000
    );
    return;
  }

  setTimeout(
    () => res.status(400).send({ message: 'Account not found!' }),
    3000
  );
  return;
});

app.post('/accounts/balance', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (sessionAccount) {
    setTimeout(() => {
      res.status(200).send({
        message: 'Balance fetched!',
        accountBalance: sessionAccount.accountBalance,
      });
    }, 3000);

    return;
  }

  setTimeout(
    () => res.status(400).send({ message: 'Account not found!' }),
    3000
  );
  return;
});

app.post('/accounts/deposit', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (!sessionAccount) {
    setTimeout(
      () => res.status(400).send({ message: 'Account not found!' }),
      3000
    );
    return;
  }

  sessionAccount.accountBalance += formatNumber(reqBody.amount);

  setTimeout(() => {
    res.status(200).send({
      message: `Deposited $${reqBody.amount}!`,
      accountBalance: sessionAccount.accountBalance,
    });
  }, 3000);

  return;
});

app.post('/accounts/withdraw', (req, res) => {
  const reqBody = req.body;
  const sessionAccount = accounts.find((account) => account.id === reqBody.pin);

  if (!sessionAccount) {
    setTimeout(() => {
      res.status(400).send({ message: 'Account not found!' });
    }, 3000);

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

  if (dailyWithdrawalAmount + reqBody.amount > 3000) {
    setTimeout(
      () => res.status(400).send({ message: 'Amount exceeds daily limit!' }),
      3000
    );
    return;
  }

  if (sessionAccount.accountBalance < reqBody.amount) {
    setTimeout(
      () => res.status(400).send({ message: 'Amount exceeds your balance!' }),
      3000
    );
    return;
  }

  sessionAccount.accountBalance -= formatNumber(reqBody.amount);
  sessionAccount.withdrawHistory.unshift({
    amount: reqBody.amount,
    date: new Date().toString(),
  });

  console.log(sessionAccount);

  setTimeout(
    () =>
      res.status(200).send({
        message: `Withdrew $${reqBody.amount}!`,
        accountBalance: sessionAccount.accountBalance,
      }),
    3000
  );
  return;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
