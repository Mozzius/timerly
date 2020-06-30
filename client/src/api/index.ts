export type RequestData = {
  success: boolean;
  data?: any;
};

export const get = async (url: string, method: 'GET' | 'POST', body?: any) => {
  try {
    const res = await fetch(`/api/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let success = true;
    // discard statuses of 4xx and 5xx
    if (['4', '5'].includes(res.status.toString().slice(0, 1))) success = false;
    const data = await res.json();
    return { success, data };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};
