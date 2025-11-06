import type ApiManagerInterface from './ApiManager.d';
import FetchDataProvider from '../providers/FetchDataProvider';
import type { NormalizedData } from '../providers/FetchDataProvider.d';

class ApiManager<T extends FetchDataProvider & { getRandomData(): Promise<NormalizedData> }> implements ApiManagerInterface<T>
{
    private fetchProviders: Array<T>;

    constructor(fetchProviders: Array<T>) {
        this.fetchProviders = fetchProviders;
    }

    async getRandomJoke(): Promise<NormalizedData> {
        const providerIndex = Math.round(Math.random());

        return await this.fetchProviders[providerIndex].getRandomData();
    }
}

export default ApiManager;