import type { ApiHeader } from "./jsonConfiguration";

interface FetchDataProviderInterface {
    fetch<T>(url: string, headers: array<ApiHeader>): Promise<ResponseData>;
}

type ResponseData = {
    [key: string]: string | number
}

export { FetchDataProviderInterface, ResponseData };