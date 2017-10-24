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
import { CPUMWidgetComponent } from '../widgets/cpum/cpum-widget.component';
import { EdgeServiceListWidgetComponent } from '../widgets/edge-service-list/edge-service-list-widget.component';
import { EdgeService } from '../widgets/edge-service-list/service';
import { JobAnalysisWidgetComponent } from '../widgets/job-analysis/job-analysis-widget.component';
import { JobAnalysisService } from '../widgets/job-analysis/service';
import { StatisticWidgetComponent } from '../widgets/statistic/statistic-widget.component';
import { DiskWidgetComponent } from '../widgets/disk/disk-widget.component';
import { PropertyListWidgetComponent } from '../widgets/property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from '../widgets/service-list/service-list-widget.component';
import { CPUWidgetComponent } from '../widgets/cpu/cpu-widget.component';
import { CPUService } from '../widgets/cpu/service';
import { MemoryWidgetComponent } from '../widgets/memory/memory-widget.component';
import { NewsWidgetComponent } from '../widgets/news/news-widget.component';
import { NewsService } from '../widgets/news/service';
import { TrendWidgetComponent } from '../widgets/trend/trend-widget.component';
import { TrendService } from '../widgets/trend/service';
import { TrendLineWidgetComponent } from '../widgets/trend-line/trend-line-widget.component';
import { TrendLineService } from '../widgets/trend-line/service';

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
        TrendLineService,
        TrendService,
        EdgeService,
        CPUService
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
