type ApiHeader = {
    accept: string
}

interface jsonConfigurationType {
    endpoint: string,
    headers: ApiHeader,
    params: {

    }
}

export  { jsonConfigurationType, ApiHeader };