export type JanusPlugins = "janus.plugin.videoroom"

export interface JanusRequest {
    transaction?: string;
    apisecret?: string;
    janus: string;
    plugin?: JanusPlugins
}
