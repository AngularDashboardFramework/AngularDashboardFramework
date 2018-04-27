export interface Widget {
    id?: string;
    title?: string;
    showTitle?: boolean;
    type: string;
    position: Position;
    containerClass?: string;
    config?: object;
}

export interface Position {
    column: string;
    order: number;
}