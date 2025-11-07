interface ICanHazDadJokeApiInterface {
    data: jsonConfigurationInterface,
    async getData(): Promise<ResponseData>
}

type NormalizedData = {
    joke: string,
    score: number,
    date: Date
}

export { ICanHazDadJokeApiInterface, NormalizedData };
