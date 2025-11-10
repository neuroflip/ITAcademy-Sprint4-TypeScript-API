import type { ApiManagerInterface, Providers } from './ApiManager.d';
import FetchDataProviderInterface from '../providers/FetchDataProvider';
import type { ResponseData } from '../providers/FetchDataProvider.d';

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

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ApiManager;