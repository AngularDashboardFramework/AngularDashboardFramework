export class Column {

}

export class Row {
    columns: Column[];
}

export interface Layout {
    id: number;
    title: string;
    checked: boolean;
    structure: string;
    image: string;
    rows: Row[];
}