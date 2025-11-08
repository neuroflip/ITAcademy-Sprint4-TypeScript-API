
import type { ICanHazDadJokeApiInterface } from './ICanHazDadJokeApi.d';
import type { ResponseData } from '../../FetchDataProvider.d';
import type { jsonConfigurationType } from '../../fetchConfiguration';
import jsonConfiguration from './ICanHazDadJokeApi.config.json';
import FetchDataProvider from '../../FetchDataProvider';
import type { ApiHeader } from '../../fetchConfiguration';

class ICanHazDadJokeApi extends FetchDataProvider implements ICanHazDadJokeApiInterface {
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
        const jokeData = await this.fetch<ResponseData>(jsonConfiguration.endpoint, jsonConfiguration.headers)

        return this.normalizeData(jokeData.joke);
    }

    fetch<ResponseData> (endpoint: string, headers: ApiHeader) {
        return super.fetch<ResponseData>(endpoint, headers);
    }
}

export default ICanHazDadJokeApi;