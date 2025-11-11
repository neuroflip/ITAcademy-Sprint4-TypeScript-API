
import type { ICanHazDadJokesApiInterface } from './ICanHazDadJokeApi.d';
import type { ResponseData } from '../../FetchDataProvider.d';
import type { jsonConfigurationType } from '../../fetchConfiguration';
import jsonConfiguration from './ICanHazDadJokesApi.config.json';
import FetchDataProvider from '../../FetchDataProvider';
import type { ApiHeader } from '../../fetchConfiguration';

class ICanHazDadJokesApi extends FetchDataProvider implements ICanHazDadJokesApiInterface {
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
      try {
        const jokeData = await this.fetch<ResponseData>(jsonConfiguration.endpoint, jsonConfiguration.headers)

        return this.normalizeData(jokeData.joke);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch(error) {
        throw new Error('ICanHazDadJokesApi cannot be accessed.')
      }
    }

    fetch<ResponseData> (endpoint: string, headers: ApiHeader) {
        return super.fetch<ResponseData>(endpoint, headers);
    }
}

export default ICanHazDadJokesApi;