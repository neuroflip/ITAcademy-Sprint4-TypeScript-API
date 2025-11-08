
import type OpenMeteoComApiInterface from './OpenMeteoComApi.d';
import type { ResponseData } from '../../FetchDataProvider.d';
import type { jsonConfigurationType, QueryParams } from '../../fetchConfiguration';
import jsonConfiguration from './OpenMeteoComApi.config.json';
import FetchDataProvider from '../../FetchDataProvider';
import type { ApiHeader } from '../../fetchConfiguration';
import { getLocation } from './LocationResolver';
import type { Location } from './LocationResolver.d';

class OpenMeteoComApi extends FetchDataProvider implements OpenMeteoComApiInterface {
    data: jsonConfigurationType;

    constructor () {
        super()
        this.data = jsonConfiguration;
    }

    async getData() {
        return new Promise<ResponseData>((resolve, reject) => {
            getLocation(async (location: Location) => {
                jsonConfiguration.params.latitude = String(location.latitude);
                jsonConfiguration.params.longitude = String(location.longitude);

                const weatherData = await this.fetch<ResponseData>(jsonConfiguration.endpoint,
                    jsonConfiguration.headers,
                    jsonConfiguration.params);
                resolve(weatherData)
            }, (error: GeolocationPositionError) => {
                reject(error);
            });
        });
    }

    fetch<ResponseData> (endpoint: string, headers: ApiHeader, params: QueryParams) {
        return super.fetch<ResponseData>(endpoint, headers, params);
    }
}

export default OpenMeteoComApi;