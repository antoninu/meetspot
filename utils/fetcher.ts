const fetcher = async (
  url: string,
  method: string,
  data?: any,
): Promise<Object> => {
  let body: any;

  if (data) {
    body = JSON.stringify(data);
  }

  let headers = {};

  headers['Content-Type'] = 'application/json';

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URI + url, {
    method,
    headers,
    body: body,
  });

  return await response.json();
};

export default fetcher;
