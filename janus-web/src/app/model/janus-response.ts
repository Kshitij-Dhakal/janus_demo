import { JanusData } from "./janus-data";


export interface JanusResponse {
    janus?: string;
    session_id?: string;
    transaction?: string;
    data?: JanusData;
}

