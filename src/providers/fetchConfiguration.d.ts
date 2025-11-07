type ApiHeader = {
    Accept?: string,
    "User-Agent"?: string,
    "Accept-Encoding"?: string,
    "Connection"?: string
}

type QueryParams = {
    [key: string]: string
}

type jsonConfigurationType = {
    endpoint: string,
    headers?: ApiHeader,
    params?: QueryParams
}

export  { jsonConfigurationType, ApiHeader, QueryParams };