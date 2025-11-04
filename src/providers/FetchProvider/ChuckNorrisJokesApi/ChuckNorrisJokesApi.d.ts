import type { ResponseData } from "../../FetchDataProvider";

interface ChuckNorrisJokesApi {
    data: jsonConfigurationInterface
    async getRandomJoke(): Promise<ResponseData>
}

export default ChuckNorrisJokesApi;

export { ICanHazDadJokeApiInterface, ResponseData };