import type { NormalizedData } from '../providers/FetchDataProvider.d';
import type { FetchDataProviderInterface } from '../providers/FetchDataProvider.d';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiManagerInterface<T extends FetchDataProviderInterface & { getData(): Promise<ResponseData> }> {
    getRandomJoke(): Promise<NormalizedData>;
}

export default ApiManagerInterface;