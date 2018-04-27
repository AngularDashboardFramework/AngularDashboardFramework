import { Widget } from '../widgets/_common/widget';
import { Layout } from '../layout/layout';
import { DataSource } from '@angulardynamic/databroker';

export interface Model {
    $ref?: string;

    name: string;

    // id of dashboard layout or actual layout object
    layout: Layout|string;

    timestamp?: string;

    // title of the dashboard
    title?: string;

    context?: Context;

    // widgets
    widgets: Widget[];

    dataSources?: DataSource[];

    showHeadings?: boolean;
}

export interface Context {
    name: string;

    type: string;

    dataSource: string;

    parameters: ContextParameter[];
}

export interface ContextParameter {
    name: string;
    type: string;
}