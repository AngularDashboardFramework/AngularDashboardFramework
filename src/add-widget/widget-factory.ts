import {CPUWidgetComponent} from '../widgets/cpu/cpu-widget.component';
import {MemoryWidgetComponent} from '../widgets/memory/memory-widget.component';
import {PropertyListWidgetComponent} from '../widgets/property-list/property-list-widget.component';
import {DiskWidgetComponent} from '../widgets/disk/disk-widget.component';
import {ServiceListWidgetComponent} from '../widgets/service-list/service-list-widget.component';
import {StatisticWidgetComponent} from '../widgets/statistic/statistic-widget.component';
import {TrendWidgetComponent} from '../widgets/trend/trend-widget.component';
import {NewsWidgetComponent} from '../widgets/news/news-widget.component';
import {JobAnalysisWidgetComponent} from '../widgets/job-analysis/job-analysis-widget.component';
import {TrendLineWidgetComponent} from '../widgets/trend-line/trend-line-widget.component';
import {EdgeServiceListWidgetComponent} from '../widgets/edge-service-list/edge-service-list-widget.component';
import {CPUMWidgetComponent} from '../widgets/cpum/cpum-widget.component';
/**
 * Created by jayhamilton on 6/30/17.
 */

export class WidgetFactory {


    /**
     * todo - return new instances  instead of the same instance. This requires the creation of new configuration options.
     * @param widgetType
     * @returns {any}
     */

    static getComponentType(widgetType): any {

        switch (widgetType) {

            case 'CPUWidgetComponent':
                return CPUWidgetComponent;
            case 'MemoryWidgetComponent':
                return MemoryWidgetComponent;
            case 'PropertyListWidgetComponent':
                return PropertyListWidgetComponent;
            case 'DiskWidgetComponent':
                return DiskWidgetComponent;
            case 'ServiceListWidgetComponent':
                return ServiceListWidgetComponent;
            case 'StatisticWidgetComponent':
                return StatisticWidgetComponent;
            case 'TrendWidgetComponent':
                return TrendWidgetComponent;
            case 'NewsWidgetComponent':
                return NewsWidgetComponent;
            case'JobAnalysisWidgetComponent':
                return JobAnalysisWidgetComponent;
            case'TrendLineWidgetComponent':
                return TrendLineWidgetComponent;
            case'EdgeServiceListWidgetComponent':
                return EdgeServiceListWidgetComponent;
            case 'CPUMWidgetComponent':
                return CPUMWidgetComponent;
            default:
                return null;

        }
    }
}
