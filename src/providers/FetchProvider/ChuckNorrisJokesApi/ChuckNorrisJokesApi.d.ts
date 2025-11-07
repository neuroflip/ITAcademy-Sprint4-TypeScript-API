interface ChuckNorrisJokesApiInterface {
    data: jsonConfigurationInterface
    getData(): Promise<ResponseData>
}

type NormalizedData = {
    joke: string,
    score: number,
    date: Date
}

export {ChuckNorrisJokesApiInterface, NormalizedData };

