
import type ICanHazDadJokeApiInterface from './ICanHazDadJokeApi.d';
import type { ResponseData } from '../../FetchDataProvider.d';
import type { jsonConfigurationType } from '../../jsonConfiguration.d';
import jsonConfiguration from './ICanHazDadJokeApi.config.json';
import FetchDataProvider from '../../FetchDataProvider';
import type { ApiHeader } from '../../jsonConfiguration.d';

class ICanHazDadJokeApi extends FetchDataProvider implements ICanHazDadJokeApiInterface {
    data: jsonConfigurationType;

    constructor () {
        super()
        this.data = jsonConfiguration;
    }

    async getRandomData() {
        const jokeData = await this.fetch<ResponseData>(jsonConfiguration.endpoint, jsonConfiguration.headers)

        return super.normalizeData(jokeData.joke);

    }

    fetch<ResponseData> (endpoint: string, headers: ApiHeader) {
        return super.fetch<ResponseData>(endpoint, headers);
    }
}

export default ICanHazDadJokeApi;