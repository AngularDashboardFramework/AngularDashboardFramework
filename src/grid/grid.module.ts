import { NgModule, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DndModule } from 'ng2-dnd';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';

import { GridComponent } from './grid.component';
import { CellComponent } from './cell.component';

import { WidgetInstanceService } from './grid.service';
import { ConfigurationService } from '../services/configuration.service';

import { WidgetPropertyService } from '../widgets/_common/widget-property.service';

import { AreaChartWidgetComponent } from '../widgets/charts/area/area-chart-widget.component';
import { AreaChartWidgetService } from '../widgets/charts/area/area-chart-widget.service';

import { BarHorizontalChartWidgetComponent } from '../widgets/charts/bar-horizontal/bar-horizontal-chart-widget.component';
import { BarHorizontalChartWidgetService } from '../widgets/charts/bar-horizontal/bar-horizontal-chart-widget.service';

import { BarVerticalChartWidgetComponent } from '../widgets/charts/bar-vertical/bar-vertical-chart-widget.component';

import { LineChartWidgetComponent } from '../widgets/charts/line/line-chart-widget.component';
import { LineChartWidgetService } from '../widgets/charts/line/line-chart-widget.service';

import { LinearGaugeChartWidgetComponent } from '../widgets/charts/linear-gauge/linear-gauge-chart-widget.component';

import { PieChartWidgetComponent } from '../widgets/charts/pie/pie-chart-widget.component';

import { EdgeServiceListWidgetComponent } from '../widgets/edge-service-list/edge-service-list-widget.component';
import { EdgeService } from '../widgets/edge-service-list/service';

import { JobAnalysisWidgetComponent } from '../widgets/job-analysis/job-analysis-widget.component';
import { JobAnalysisService } from '../widgets/job-analysis/service';

import { StatisticWidgetComponent } from '../widgets/statistic/statistic-widget.component';

import { PropertyListWidgetComponent } from '../widgets/property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from '../widgets/service-list/service-list-widget.component';

import { NewsWidgetComponent } from '../widgets/news/news-widget.component';
import { NewsService } from '../widgets/news/service';

@NgModule({
    declarations: [
        GridComponent,
        CellComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        DynamicFormModule
    ],
    exports: [
        DndModule,
        GridComponent
    ],
    providers: [
        WidgetInstanceService,
        ConfigurationService,
        NewsService,
        JobAnalysisService,
        LineChartWidgetService,
        AreaChartWidgetService,
        EdgeService,
        BarHorizontalChartWidgetService
    ]
})
export class GridModule {
    static withComponents(components: any[]) {
        return {
            ngModule: GridModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        };
    }
}
