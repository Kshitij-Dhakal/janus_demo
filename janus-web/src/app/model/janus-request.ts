import { JanusBody } from "./janus-body";

export type JanusPlugins = "janus.plugin.videoroom"
export type JanusRequestJanus = "create" | "attach" | "message"

export interface JanusRequest {
    transaction: string;
    apisecret?: string;
    janus: JanusRequestJanus;
    plugin?: JanusPlugins
    body?: JanusBody
}