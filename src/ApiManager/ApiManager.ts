import type { ApiManagerInterface, Providers } from './ApiManager.d';
import type { ResponseData } from '../providers/FetchDataProvider.d';

import FetchDataProviderInterface from '../providers/FetchDataProvider';
import { getRandomInt } from '../helpers/utils';


class ApiManager<T extends FetchDataProviderInterface & { getData(): Promise<ResponseData> }> implements ApiManagerInterface<T>
{
    providers: Providers;

    constructor() {
        this.providers = {
            jokeProviders: [],
            weatherProviders: []
        };
    }

    addJokesProviders(providers: Array<T>) {
        this.providers.jokeProviders = providers;
    }

    addWeatherProviders(providers: Array<T>) {
        this.providers.weatherProviders = providers;
    }

    async getRandomJoke(): Promise<ResponseData> {
        if (this.providers.jokeProviders.length === 0) {
            throw new Error('No joke providers added to the ApiManager');
        }
        const providerIndex = getRandomInt(0, this.providers.jokeProviders.length - 1);

        return await this.providers.jokeProviders[providerIndex].getData();
    }

    async getCurrentWeather():  Promise<ResponseData> {
        if (this.providers.weatherProviders.length === 0) throw new Error('No weather providers added to the ApiManager');
        const providerIndex = getRandomInt(0, this.providers.weatherProviders.length - 1);

        return await this.providers.weatherProviders[providerIndex].getData();
    }
}

export default ApiManager;