const axios = require('axios');

class CollabApiClient {
  constructor(base_url, bearer_token="", api_version = 1, num_retries = 30) {
    this.base_url = 'https://wiki.ebrains.eu';
    this.api_version = `v${api_version}`;
    this._bearer_token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfNkZVSHFaSDNIRmVhS0pEZDhXcUx6LWFlZ3kzYXFodVNJZ1RXaTA1U2k0In0.eyJleHAiOjE2ODk5NjkwMzYsImlhdCI6MTY4OTM2NDIzNSwiYXV0aF90aW1lIjoxNjg5MjM4NzUxLCJqdGkiOiIxNWU5MzYyZi1iOTJiLTQzZmItODJiZC03MTBjOTE2YjY2NTgiLCJpc3MiOiJodHRwczovL2lhbS5lYnJhaW5zLmV1L2F1dGgvcmVhbG1zL2hicCIsImF1ZCI6WyJpbWdfc3ZjIiwidHV0b3JpYWxPaWRjQXBpIiwieHdpa2kiLCJqdXB5dGVyaHViLWpzYyIsInRlYW0iLCJwbHVzIiwiZ3JvdXAiXSwic3ViIjoiODAwZjUzZTItMzc2Yi00MTA3LWE3OWMtNGFlNzgxMDkzZmI5IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoianVweXRlcmh1YiIsInNlc3Npb25fc3RhdGUiOiI5YTI2NjgyMC1hYzFjLTRmNGMtYTZhZS1jZjMzNTYzNzNhNDUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vanVweXRlcmh1Yi5hcHBzLmpzYy5oYnAuZXUvIiwiaHR0cHM6Ly9sYWIuZWJyYWlucy5ldS8iLCJodHRwczovL2xhYi5qc2MuZWJyYWlucy5ldS8iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIl19LCJzY29wZSI6ImNvbGxhYi5kcml2ZSBwcm9maWxlIG9mZmxpbmVfYWNjZXNzIGNsYi53aWtpLndyaXRlIGdyb3VwIGNsYi53aWtpLnJlYWQgdGVhbSBxdW90YSBlbWFpbCByb2xlcyBvcGVuaWQiLCJzaWQiOiI5YTI2NjgyMC1hYzFjLTRmNGMtYTZhZS1jZjMzNTYzNzNhNDUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkVpdmluZCBIZW5uZXN0YWQiLCJtaXRyZWlkLXN1YiI6IjU5OTUyOTcxNDM5NTQxNDMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlaXZpbmQiLCJnaXZlbl9uYW1lIjoiRWl2aW5kIiwiZmFtaWx5X25hbWUiOiJIZW5uZXN0YWQiLCJlbWFpbCI6ImVpdmluZC5oZW5uZXN0YWRAbWVkaXNpbi51aW8ubm8ifQ.GsRnZu7eBgVAKk8ZW51ko5NikmVHggZydbfQYrv48XGNJftqqjUAmxFJmgQHdNukbT048ac9SwODGMTyy4XtSCaFajgh-_J_A8AacpcZrewkYJhP5pbSRiRaTB9bLtFfpRhPX8bQ06roYVUau03Tf0JdBPKZvU-3a_sYaPXwg8EaPDveGWndkfekmHHkPhRAaem-oWVYA1Lr-dmPnL1lAxELteMuHqkR1a99chQwoi_jolNmAaTP9sh0EhtAUWEEHGWRBP4W08xwuCEd7dzWiuOA-4UvaKTkQ_wlR7P9Ooba_MbsqyUzCpJzEYRz4KVqUqB2wjhoA5vuR2wc0FFKaw";
    this._num_retries = num_retries;

    this.__initSession();
  }

  __del__() {
    this.__closeSession();
  }

  __initSession() {
    this._session = axios.create({
      baseURL: this.base_url,
      headers: {
        'User-Agent': 'Collab API Javascript Client',
        Authorization: `Bearer ${this._bearer_token}`,
        'Content-Type': 'application/json',
      },
    });

    this._session.interceptors.response.use(null, (error) => {
      if (error.response.status === 401) {
        console.log('Failed to authenticate, retrying...');
        return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
          this._session.request(error.config)
        );
      } else {
        return Promise.reject(error);
      }
      // if (error.response.status === 404) {
      //   console.log('Nothing was found, retrying...');
      //   return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
      //     this._session.request(error.config)
      //   );
      // }
      //throw error;
    });
  }

  __closeSession() {
    this._session = null;
  }

  async get(api_endpoint_url, params = {}, headers = {}, ignore_error_codes = [401]) {
    const response = await this._session.get(api_endpoint_url, { headers });
    return response;
    //const response = await this._retryRequestIfAuthError('GET', api_endpoint_url, headers, ignore_error_codes);
    //return response;
  }

  async _retryRequestIfAuthError(method, api_url, headers, json = {}, data = {}, ignore_error_codes = [401]) {
    for (let i = 0; i < this._num_retries; i++) {
      try {
        if (method === 'GET') {
          const response = await this._session.get(api_url, { headers });
          return response;
        } else if (method === 'POST') {
          const response = await this._session.post(api_url, json, { headers, data });
          return response;
        } else if (method === 'PUT') {
          const response = await this._session.put(api_url, json, { headers, data });
          return response;
        }
      } catch (error) {
        if (!ignore_error_codes.includes(error.response.status)) {
          throw error;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a short pause before trying again
    }
    throw new Error(`Aborted: Authentication failed ${this._num_retries} times successively!`);
  }

  _raiseOrReturnJson(response) {
    if (response.status >= 400) {
      throw new Error(response.data);
    }

    try {
      return response.data;
    } catch (error) {
      return response.content;
    }
  }

  _buildUrl(endpoint_path) {
    return `${this.base_url}/rest/${this.api_version}/${endpoint_path}`;
  }

  async checkCollabExists(collab_id) {
    try {
      const api_url = this._buildUrl(`collabs/${collab_id}`);
      const response = await this.get(api_url);
      return true;
    } catch (error) {
      if (error.response.status === 404) {
        return false;
      } else {
        throw new Error(`Failed to check if collab exists with error code: ${error.response.status}`);
      }
    }

    // console.log(response.status)

    // if ([200, 403].includes(response.status)) {
    //   return true;
    // } else if (response.status === 404) {
    //   return false;
    // } else {
    //   //throw new Error(`Failed to check if collab exists with error code: ${response.status}`);
    // }
  }
}

module.exports = CollabApiClient;

