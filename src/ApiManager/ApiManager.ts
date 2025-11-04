import type ApiManagerInterface from './ApiManager.d';
import FetchDataProvider from '../providers/FetchDataProvider';
import type { ResponseData } from '../providers/FetchDataProvider.d';

class ApiManager <T extends FetchDataProvider & { getRandomJoke(): Promise<ResponseData> }> implements ApiManagerInterface<T>
{
    private fetchProviders: Array<T>;

    constructor(fetchProviders: Array<T>) {
        this.fetchProviders = fetchProviders;
    }

    async getRandomJoke(): Promise<ResponseData> {
        const providerIndex = Math.round(Math.random());

        return await this.fetchProviders[providerIndex].getRandomJoke();
    }
}

export default ApiManager;