import type { ResponseData } from "../../FetchDataProvider.d";
import { jsonConfigurationType } from "../../fetchConfiguration";

interface OpenMeteoComApiInterface {
    data: jsonConfigurationType,
    getData(): Promise<ResponseData>
}

export default OpenMeteoComApiInterface;
