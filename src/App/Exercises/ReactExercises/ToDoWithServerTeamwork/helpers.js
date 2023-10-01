export const RequestHandler = async (selectedMethod, id, data) => {
  return new Promise(async (res, rej) => {
    const serverUrl = 'http://localhost:3333/api/todo';
    let endOfUrl = '';
    if (id) {
      endOfUrl = `/${id}`;
    }
    const response = await fetch(`${serverUrl}${endOfUrl}`, {
      method: selectedMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();

    if (response.status === 200) {
      res(jsonResponse);
    }
    if (response.status !== 200) {
      rej(jsonResponse);
    }
  });
};
