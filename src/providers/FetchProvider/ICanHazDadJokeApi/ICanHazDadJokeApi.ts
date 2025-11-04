
import type { ICanHazDadJokeApiInterface } from './ICanHazDadJokeApi.d';
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

    async getRandomJoke() {
        return this.fetch<ResponseData>(jsonConfiguration.endpoint, jsonConfiguration.headers)
    }

    fetch<ResponseData> (endpoint: string, headers: ApiHeader) {
        return super.fetch<ResponseData>(endpoint, headers);
    }
}

export default ICanHazDadJokeApi;