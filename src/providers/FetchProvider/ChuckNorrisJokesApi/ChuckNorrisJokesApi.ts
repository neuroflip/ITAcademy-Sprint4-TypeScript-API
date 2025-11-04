import FetchDataProvider from '../../FetchDataProvider';
import type { ApiHeader, jsonConfigurationType } from '../../jsonConfiguration';
import type ChuckNorrisJokesApiInterface from './ChuckNorrisJokesApi.d';
import jsonConfiguration from './ChuckNorrisJokesApi.config.json';
import type { ResponseData } from './ChuckNorrisJokesApi.d';

class ChuckNorrisJokesApi extends FetchDataProvider implements ChuckNorrisJokesApiInterface {
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

export default ChuckNorrisJokesApi;