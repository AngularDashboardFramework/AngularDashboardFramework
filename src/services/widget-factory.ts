
import { AreaChartWidgetComponent } from '../widgets/charts/area/area-chart-widget.component';

import { BarHorizontalChartWidgetComponent } from '../widgets/charts/bar-horizontal/bar-horizontal-chart-widget.component';
import { BarVerticalChartWidgetComponent } from '../widgets/charts/bar-vertical/bar-vertical-chart-widget.component';

import { LinearGaugeChartWidgetComponent } from '../widgets/charts/linear-gauge/linear-gauge-chart-widget.component';
import { LineChartWidgetComponent } from '../widgets/charts/line/line-chart-widget.component';

import { PieChartWidgetComponent } from '../widgets/charts/pie/pie-chart-widget.component';

import { PropertyListWidgetComponent } from '../widgets/property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from '../widgets/service-list/service-list-widget.component';
import { StatisticWidgetComponent } from '../widgets/statistic/statistic-widget.component';
import { NewsWidgetComponent } from '../widgets/news/news-widget.component';
import { JobAnalysisWidgetComponent } from '../widgets/job-analysis/job-analysis-widget.component';
import { EdgeServiceListWidgetComponent } from '../widgets/edge-service-list/edge-service-list-widget.component';

/**
 * Created by jayhamilton on 6/30/17.
 */
export class WidgetFactory {
    /**
     * todo - return new instances instead of the same instance. This requires the creation of new configuration options.
     * @param widgetType
     * @returns {any}
     */
    static getComponentType(widgetType: string): any {
        switch (widgetType) {
            case 'AreaChartWidgetComponent':
                return AreaChartWidgetComponent;
            case 'BarHorizontalChartWidgetComponent':
                return BarHorizontalChartWidgetComponent;
            case 'BarVerticalChartWidgetComponent':
                return BarVerticalChartWidgetComponent;
            case 'LinearGaugeChartWidgetComponent':
                return LinearGaugeChartWidgetComponent;
            case 'LineChartWidgetComponent':
                return LineChartWidgetComponent;
            case 'PropertyListWidgetComponent':
                return PropertyListWidgetComponent;
            case 'PieChartWidgetComponent':
                return PieChartWidgetComponent;
            case 'ServiceListWidgetComponent':
                return ServiceListWidgetComponent;
            case 'StatisticWidgetComponent':
                return StatisticWidgetComponent;
            case 'NewsWidgetComponent':
                return NewsWidgetComponent;
            case 'JobAnalysisWidgetComponent':
                return JobAnalysisWidgetComponent;
            case 'EdgeServiceListWidgetComponent':
                return EdgeServiceListWidgetComponent;
            default:
                return null;
        }
    }

}
