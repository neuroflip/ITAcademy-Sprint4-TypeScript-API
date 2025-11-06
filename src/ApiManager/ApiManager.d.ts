import type FetchDataProvider from '../providers/FetchDataProvider';
import type { NormalizedData } from '../providers/FetchDataProvider.d';

interface ApiManagerInterface<T> {
    getRandomJoke(): Promise<NormalizedData>;
}

export default ApiManagerInterface;