import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from 'ng2-dnd';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';
import { WidgetSharedModule } from './_common/widget-shared.module';
import { ErrorHandlerModule } from '../error/error.module';

import { CPUWidgetComponent } from './cpu/cpu-widget.component';
import { CPUMWidgetComponent } from './cpum/cpum-widget.component';
import { DiskWidgetComponent } from './disk/disk-widget.component';
import { MemoryWidgetComponent } from './memory/memory-widget.component';
import { EdgeServiceListWidgetComponent } from './edge-service-list/edge-service-list-widget.component';
import { StatisticWidgetComponent } from './statistic/statistic-widget.component';
import { TrendWidgetComponent } from './trend/trend-widget.component';
import { TrendLineWidgetComponent } from './trend-line/trend-line-widget.component';
import { NewsWidgetComponent } from './news/news-widget.component';
import { JobAnalysisWidgetComponent } from './job-analysis/job-analysis-widget.component';
import { CPUService } from './cpu/service';
import { EdgeService } from './edge-service-list/service';
import { StatisticService } from './statistic/service';
import { DiskService } from './disk/service';
import { TrendService } from './trend/service';
import { PropertyListWidgetComponent } from './property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from './service-list/service-list-widget.component';

@NgModule({
    declarations: [
        CPUWidgetComponent,
        CPUMWidgetComponent,
        DiskWidgetComponent,
        MemoryWidgetComponent,
        EdgeServiceListWidgetComponent,
        StatisticWidgetComponent,
        TrendWidgetComponent,
        TrendLineWidgetComponent,
        NewsWidgetComponent,
        JobAnalysisWidgetComponent,
        StatisticWidgetComponent,
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
        CPUWidgetComponent,
        CPUMWidgetComponent,
        DiskWidgetComponent,
        MemoryWidgetComponent,
        EdgeServiceListWidgetComponent,
        StatisticWidgetComponent,
        TrendWidgetComponent,
        TrendLineWidgetComponent,
        NewsWidgetComponent,
        JobAnalysisWidgetComponent,
        StatisticWidgetComponent,
        PropertyListWidgetComponent,
        ServiceListWidgetComponent
    ],
    providers: [
        TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService
    ]
})
export class WidgetModule {
}

