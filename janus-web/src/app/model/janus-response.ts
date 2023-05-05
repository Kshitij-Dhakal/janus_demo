import { JanusData } from "./janus-data";


export interface JanusResponse {
    janus?: string;
    transaction?: string;
    data?: JanusData;
}

