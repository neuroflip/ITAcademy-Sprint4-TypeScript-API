import type { ApiHeader, QueryParams } from "./fetchConfiguration";

interface FetchDataProviderInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch<T>(url: string, headers: ApiHeader, params?:QueryParams): Promise<ResponseData>
}

type ResponseData = {
    [key: string]: string | number | ResponseData
}

export { FetchDataProviderInterface, ResponseData };