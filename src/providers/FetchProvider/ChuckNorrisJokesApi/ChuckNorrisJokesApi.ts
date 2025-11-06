import FetchDataProvider from '../../FetchDataProvider';
import type { jsonConfigurationType } from '../../jsonConfiguration';
import type ChuckNorrisJokesApiInterface from './ChuckNorrisJokesApi.d';
import jsonConfiguration from './ChuckNorrisJokesApi.config.json';
import type { ResponseData } from '../../FetchDataProvider.d';

class ChuckNorrisJokesApi extends FetchDataProvider implements ChuckNorrisJokesApiInterface {
    data: jsonConfigurationType;

    constructor () {
        super()
        this.data = jsonConfiguration;
    }

    async getRandomData() {
        const jokeData = await this.fetch<ResponseData>(jsonConfiguration.endpoint);

        return super.normalizeData(jokeData.value);
    }

    fetch<ResponseData> (endpoint: string) {
        return super.fetch<ResponseData>(endpoint);
    }
}

export default ChuckNorrisJokesApi;