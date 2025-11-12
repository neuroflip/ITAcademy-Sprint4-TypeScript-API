import type { NormalizedData } from '../providers/FetchDataProvider.d';
import type { FetchDataProviderInterface } from '../providers/FetchDataProvider.d';

type Providers = {
    jokeProviders: Array<T>,
    weatherProviders: Array<T>
}

interface ApiManagerInterface<T extends FetchDataProviderInterface & { getData(): Promise<ResponseData> }> {
    providers: Providers,
    addJokesProviders(providers: Array<T>),
    addWeatherProviders(providers: Array<T>),
    getRandomJoke(): Promise<ResponseData>,
    getCurrentWeather():  Promise<ResponseData>
}

export { ApiManagerInterface, Providers };