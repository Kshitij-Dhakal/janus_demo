import { JanusBody } from "./janus-body";

export type JanusPlugins = "janus.plugin.videoroom"
export type JanusRequestJanus = "create" | "attach" | "message"

export interface JanusSyncRequest {
    transaction: string;
    apisecret?: string;
    janus: JanusRequestJanus;
    plugin?: JanusPlugins
    body?: JanusBody
}

export type JanusAsyncRequestRequest = "join"
export type JansuAsyncRequestPtype = "publisher"

export interface JanusAsyncRequest {
    request: JanusAsyncRequestRequest,
    ptype: JansuAsyncRequestPtype,
    room: number,
    id?: number,
    display?: string,
    token?: string
}