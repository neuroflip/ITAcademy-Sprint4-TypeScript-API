import type { FetchDataProviderInterface } from './FetchDataProvider.d'
import type { ApiHeader } from './jsonConfiguration';

class FetchDataProvider implements FetchDataProviderInterface {
     normalizeData(value: string) {
      return {
        joke: value,
        score: 0,
        date: new Date()
      };
    }

    fetch<ResponseData>(url: string, headers?: ApiHeader): Promise<ResponseData> {
      headers = { ...headers, "User-Agent": navigator.userAgent };

      return fetch(url, {
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