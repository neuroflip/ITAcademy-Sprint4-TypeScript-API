import { ResponseData } from '../providers/FetchDataProvider.d';
import { jsonConfigurationType } from "../providers/fetchConfiguration.d";

interface OpenMeteoComApiInterface {
    data: jsonConfigurationType,
    getWheatherData(): Promise<ResponseData>
}

type NormalizedData = {
    joke: string,
    score: number,
    date: Date
}

export { OpenMeteoComApiInterface, NormalizedData };
