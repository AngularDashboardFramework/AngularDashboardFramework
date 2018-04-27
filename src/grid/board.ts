
export interface Column
{
    class: string,
    widgets: any[]
}

export interface Row
{
    colums: Column[];
}

export interface Board
{
    title: string;
    structure: string;
    id: number;
    rows: Row[];
}