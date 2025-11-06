import type { NormalizedData } from "../../FetchDataProvider.d";

interface ChuckNorrisJokesApiInterface {
    data: jsonConfigurationInterface
    getRandomData(): Promise<NormalizedData>
}

export default ChuckNorrisJokesApiInterface;
