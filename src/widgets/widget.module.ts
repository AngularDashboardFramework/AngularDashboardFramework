import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from 'ng2-dnd';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';
import { WidgetSharedModule } from './_common/widget-shared.module';
import { ErrorHandlerModule } from '../error/error.module';

import { AreaChartWidgetComponent } from './charts/area/area-chart-widget.component';
import { AreaChartWidgetService } from './charts/area/area-chart-widget.service';

import { BarHorizontalChartWidgetComponent } from './charts/bar-horizontal/bar-horizontal-chart-widget.component';
import { BarHorizontalChartWidgetService } from './charts/bar-horizontal/bar-horizontal-chart-widget.service';

import { BarVerticalChartWidgetComponent } from './charts/bar-vertical/bar-vertical-chart-widget.component';

import { LinearGaugeChartWidgetComponent } from './charts/linear-gauge/linear-gauge-chart-widget.component';

import { LineChartWidgetComponent } from './charts/line/line-chart-widget.component';

import { PieChartWidgetComponent } from './charts/pie/pie-chart-widget.component';
import { PieChartWidgetService } from './charts/pie/pie-chart-widget.service';

import { EdgeServiceListWidgetComponent } from './edge-service-list/edge-service-list-widget.component';
import { StatisticWidgetComponent } from './statistic/statistic-widget.component';

import { NewsWidgetComponent } from './news/news-widget.component';
import { JobAnalysisWidgetComponent } from './job-analysis/job-analysis-widget.component';
import { EdgeService } from './edge-service-list/service';
import { StatisticService } from './statistic/service';
import { PropertyListWidgetComponent } from './property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from './service-list/service-list-widget.component';

@NgModule({
    declarations: [
        AreaChartWidgetComponent,
        BarHorizontalChartWidgetComponent,
        BarVerticalChartWidgetComponent,
        LineChartWidgetComponent,
        PieChartWidgetComponent,
        LinearGaugeChartWidgetComponent,
        EdgeServiceListWidgetComponent,
        StatisticWidgetComponent,
        NewsWidgetComponent,
        JobAnalysisWidgetComponent,
        PropertyListWidgetComponent,
        ServiceListWidgetComponent
    ],
    imports: [
        CommonModule,
        DndModule.forRoot(),
        NgxChartsModule,
        WidgetSharedModule,
        DynamicFormModule,
        ErrorHandlerModule
    ],
    exports: [
        DndModule,
        NgxChartsModule,
        AreaChartWidgetComponent,
        BarHorizontalChartWidgetComponent,
        BarVerticalChartWidgetComponent,
        LineChartWidgetComponent,
        PieChartWidgetComponent,
        LinearGaugeChartWidgetComponent,
        EdgeServiceListWidgetComponent,
        StatisticWidgetComponent,
        StatisticWidgetComponent,
        NewsWidgetComponent,
        JobAnalysisWidgetComponent,
        PropertyListWidgetComponent,
        ServiceListWidgetComponent
    ],
    providers: [
        AreaChartWidgetService,
        BarHorizontalChartWidgetService,
        PieChartWidgetService,
        StatisticService,
        EdgeService
    ]
})
export class WidgetModule {
}

