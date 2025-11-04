import type { ResponseData } from "../../FetchDataProvider";

interface ICanHazDadJokeApiInterface {
    data: jsonConfigurationInterface
    async getRandomJoke(): Promise<ResponseData>
}

export { ICanHazDadJokeApiInterface, ResponseData };