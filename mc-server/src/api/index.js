export const Api = {
  call(url, method, body = {}) {
    console.log('call')
    const data = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Methods': 'GET, POST, DELETE',
        // 'Access-Control-Allow-Headers': 'Content-Type'
      },
    };
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then(response => {
      return response.json();
    });
  },

  get(url) {
    return this.call(url, 'get');
  },

  post(url, body = {}) {
    return this.call(url, 'post', body);
  },

  delete(url) {
    return this.call(url, 'delete');
  },
};
