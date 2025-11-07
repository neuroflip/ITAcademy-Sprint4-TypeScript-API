import type { FetchDataProviderInterface } from './FetchDataProvider.d'
import type { ApiHeader, QueryParams } from './fetchConfiguration';

class FetchDataProvider implements FetchDataProviderInterface {
    fetch<ResponseData>(url: string, 
      headers?: ApiHeader,
      params?: QueryParams): Promise<ResponseData> {
      headers = { ...headers, "User-Agent": navigator.userAgent };

      const urlWithParams = `${url}?${params ? new URLSearchParams(params).toString() : ""}`

      return fetch(urlWithParams, {
          method: "GET",
          headers: headers
      }).then((response) => {
        if (response.ok) {
          return response.json() as Promise<ResponseData>;
        }
        throw new Error(`FetchDataProvider: error fetching ${url}`);
      })
      .then((responseJson: ResponseData) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(`FetchDataProvider: ${error.message}`);
        throw error;
      });
    }
}

export default FetchDataProvider;