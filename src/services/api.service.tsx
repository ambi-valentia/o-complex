/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiURL } from "../constants/api";

interface Headers {
  'content-type': string;
}

interface ApiServiceInterface {
  get<T>(route: string, headers?: Headers): Promise<T>;
  getNoAuth(route: string): Promise<any>;

  post<T>(
    route: string,
    data: any,
    headers?: Headers
  ): Promise<T>;
}

export interface ApiReject {
  error: string;
}

class ApiService implements ApiServiceInterface {
  get<T>(
    route: string,
    headers?: Headers
  ): Promise<T> {
    return fetch(apiURL.concat(route), {
      method: 'GET',
      headers: headers
        ? {
            ...headers,
          }
        : {
            'Content-Type': 'application/json',
          },
    })
      .then((response) => {
        if (response.status === 401) {
          console.log('auth error');
        }

        if (response.ok) {
          return response.json();
        }

        throw 'Response error';
      })
      .then((data) => data as T)
      .catch((err) => err);
  }

  post<T>(route: string, data: any): Promise<T> {
    const raw = JSON.stringify(data);
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('accept', '*/*');

    const requestOptions = {
      body: raw,
      method: 'POST',
      headers: headers,
      redirect: 'follow',
    };

    return fetch(apiURL.concat(route), requestOptions as any)
      .then((response) => response.json())
      .then((data) => data as T)
      .catch((err) => err);
  }
}

const api = new ApiService();

export default api;
