type ApiHeader = {
    Accept?: string,
    "User-Agent"?: string 
}

type QueryParams = {
    [key: string]: string
}

interface jsonConfigurationType {
    endpoint: string,
    headers?: ApiHeader,
    params?: QueryParams
}

export  { jsonConfigurationType, ApiHeader };