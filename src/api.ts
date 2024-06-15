import { ActionType } from './views';

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

export const fetchAccountBalance = async (pin: string): Promise<any> => {
  return await postRequest('http://localhost:3000/accounts/balance', {
    pin,
  });
};

export const updateBalance = async (
  amount: string, // TODO - make number add validator
  pin: string,
  updateType: ActionType.DEPOSIT | ActionType.WITHDRAW
): Promise<any> => {
  return await postRequest(`http://localhost:3000/accounts/${updateType}`, {
    pin,
    amount,
  });
};
