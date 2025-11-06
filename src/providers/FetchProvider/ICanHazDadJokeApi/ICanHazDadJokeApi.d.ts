import type { NormalizedData } from "../../FetchDataProvider.d";

interface ICanHazDadJokeApiInterface {
    data: jsonConfigurationInterface,
    async getRandomData(): Promise<NormalizedData>
}

export default ICanHazDadJokeApiInterface;
