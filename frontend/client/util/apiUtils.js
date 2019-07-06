/**
 * creates headers object, with authorization
 * @returns {object} header
 */
function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0IiwibmFtZSI6Ik1haGRpIiwidXNlcl90eXBlIjoidXNlciJ9.4__s_wv81LyO-Qq61ExHXUZIu8-OOlW0l6AObtMnsEs'
  };
}

/**
 * @param {string} method - http method to use
 * @param {object} headers - headers to send with the reuqests
 * @param {string} host - endpoint host
 * @param {string} url - endpoint path
 * @param {object} data - request body to send with the request
 * @return {Promise}
 */
function callApi(method, headers, host, url, data) {
  const args = { method, headers };

  if (data) {
    args.body = JSON.stringify(data);
  }

  return fetch(host + url, args)
    .then((response) => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => ({ content: json, response }));
      }

      return { content: response.statusText, response };
    })
    .then(({ content, response }) => {
      if (!response.ok) {
        return Promise.reject(content);
      }

      return content;
    });
}

/**
 * makes an http request with authorization header
 * @param {string} host - endpoint host
 * @return {Promise}
 */
export const secure = (host) => (method, url, data) => {
  const headers = getHeaders();

  return callApi(method, headers, host, url, data);
};

