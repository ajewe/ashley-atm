import { ActionType } from './types';

const baseUrl = 'http://localhost:3000/accounts';

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
  return await postRequest(baseUrl, { pin });
};

export const fetchAccountBalance = async (pin: string): Promise<any> => {
  return await postRequest(`${baseUrl}/balance`, {
    pin,
  });
};

export const updateBalance = async (
  amount: number,
  pin: string,
  updateType: ActionType.DEPOSIT | ActionType.WITHDRAW
): Promise<any> => {
  return await postRequest(`${baseUrl}/${updateType}`, {
    pin,
    amount,
  });
};
