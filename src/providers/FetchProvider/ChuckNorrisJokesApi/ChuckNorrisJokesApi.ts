import type { jsonConfigurationType } from '../../fetchConfiguration';
import type { ChuckNorrisJokesApiInterface } from './ChuckNorrisJokesApi.d';
import type { ResponseData } from '../../FetchDataProvider.d';

import FetchDataProvider from '../../FetchDataProvider';
import jsonConfiguration from './ChuckNorrisJokesApi.config.json';


class ChuckNorrisJokesApi extends FetchDataProvider implements ChuckNorrisJokesApiInterface {
    data: jsonConfigurationType;

    constructor () {
        super()
        this.data = jsonConfiguration;
    }

    private normalizeData(value: string | number | ResponseData) {
      return {
        joke: value,
        score: 0,
        date: new Date().toISOString()
      };
    }

    async getData() {
        const jokeData = await this.fetch<ResponseData>(jsonConfiguration.endpoint);

        return this.normalizeData(jokeData.value);
    }

    fetch<ResponseData> (endpoint: string) {
        return super.fetch<ResponseData>(endpoint);
    }
}

export default ChuckNorrisJokesApi;