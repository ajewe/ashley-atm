const postRequest = async (
  url: string,
  reqBody: Record<any, any>
): Promise<any> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  const resBody = await response.json();

  if (!response.ok) {
    throw new Error(resBody.message);
  }

  return resBody;
};

export const validateSession = async (pin: string): Promise<any> => {
  return await postRequest('http://localhost:3000/accounts', { pin });
};

export const sendDeposit = async (
  pin: string,
  amount: number
): Promise<any> => {
  return await postRequest('http://localhost:3000/accounts/deposit', {
    pin,
    amount,
  });
};

export const sendWithdrawal = async (
  pin: string,
  amount: number
): Promise<any> => {
  return await postRequest('http://localhost:3000/accounts/withdraw', {
    pin,
    amount,
  });
};
