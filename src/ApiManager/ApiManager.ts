import type ApiManagerInterface from './ApiManager.d';
import FetchDataProvider from '../providers/FetchDataProvider';
import type { ResponseData } from '../providers/FetchDataProvider.d';

class ApiManager<T extends FetchDataProvider & { getData(): Promise<ResponseData> }> implements ApiManagerInterface<T>
{
    private fetchProviders: Array<T>;

    constructor(fetchProviders: Array<T>) {
        this.fetchProviders = fetchProviders;
    }

    async getRandomJoke(): Promise<ResponseData> {
        const providerIndex = Math.round(Math.random());

        return await this.fetchProviders[providerIndex].getData();
    }

    async getCurrentWeather():  Promise<ResponseData> {
        return await this.fetchProviders[0].getData();        
    }
}

export default ApiManager;