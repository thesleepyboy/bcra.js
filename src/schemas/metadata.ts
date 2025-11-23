interface Resultset {
    count: number;
    offset: number;
    limit: number;
}

export interface Metadata {
    resultset: Resultset;
}