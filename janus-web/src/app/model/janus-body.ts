export type JanusBodyRequest = "create"

export interface JanusBody {
    request?: JanusBodyRequest;
    is_private?: boolean;
    record?: boolean;
    publishers?: number;
}