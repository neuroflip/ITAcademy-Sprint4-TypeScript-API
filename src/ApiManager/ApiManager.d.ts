import type FetchDataProvider from '../providers/FetchDataProvider';
import type { ResponseData } from '../providers/FetchDataProvider.d';

interface ApiManagerInterface<T extends FetchDataProvider> {
    getRandomJoke(): Promise<ResponseData>;
}

export default ApiManagerInterface;