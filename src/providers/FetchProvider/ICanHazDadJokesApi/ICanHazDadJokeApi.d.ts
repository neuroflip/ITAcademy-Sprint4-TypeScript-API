import { jsonConfigurationType } from "../../fetchConfiguration"
import { ResponseData } from '../../FetchDataProvider.d'

interface ICanHazDadJokesApiInterface {
    data: jsonConfigurationType,
    getData(): Promise<ResponseData>
}

type NormalizedData = {
    joke: string,
    score: number,
    date: string
}

export { ICanHazDadJokesApiInterface, NormalizedData };
