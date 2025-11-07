import type { NormalizedData, ResponseData } from "../../FetchDataProvider.d";
import { jsonConfigurationType } from "../../fetchConfiguration";

interface OpenMeteoComApiInterface {
    data: jsonConfigurationType,
    async getData(): Promise<ResponseData>
}

export default OpenMeteoComApiInterface;
