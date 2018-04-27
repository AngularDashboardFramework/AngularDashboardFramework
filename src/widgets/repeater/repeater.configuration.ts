import { Layout } from '../../layout';
import { Model } from '../../models/model';

export interface RepeaterConfiguration {
    dataSource: string;
    dataSelector: string;
    model: Model;
}
