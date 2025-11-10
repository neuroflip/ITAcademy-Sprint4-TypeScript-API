import { jsonConfigurationType } from "../../fetchConfiguration"

interface ChuckNorrisJokesApiInterface {
    data: jsonConfigurationType
    getData(): Promise<ResponseData>
}

type NormalizedData = {
    joke: string,
    score: number,
    date: string
}

export { ChuckNorrisJokesApiInterface, NormalizedData };

