import type { ApiHeader } from "./jsonConfiguration";

interface FetchDataProviderInterface {
    normalizeData(id:string, value: string): NormalizedData,
    fetch<T>(url: string, headers: array<ApiHeader>): Promise<ResponseData>
}

type ResponseData = {
    [key: string]: string
}

type NormalizedData = {
    joke: string,
    score: number,
    date: Date
}

export { FetchDataProviderInterface, ResponseData, NormalizedData };