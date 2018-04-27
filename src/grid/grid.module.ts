import { NgModule, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DndModule } from 'ng2-dnd';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';

import { GridComponent } from './grid.component';
import { CellComponent } from './widget.component';

import { WidgetService } from '../services/widget.service';
import { WidgetInstanceService } from './grid.service';
import { ConfigurationService } from '../services/configuration.service';
import { WidgetPropertyService } from '../widgets/_common/widget-property.service';
import { AreaChartWidgetService } from '../widgets/charts/area/area-chart-widget.service';
import { BarHorizontalChartWidgetService } from '../widgets/charts/bar-horizontal/bar-horizontal-chart-widget.service';
import { LineChartWidgetService } from '../widgets/charts/line/line-chart-widget.service';
import { EdgeService } from '../widgets/edge-service-list/service';
import { JobAnalysisService } from '../widgets/job-analysis/service';
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
        HttpClientModule,
        DndModule.forRoot(),
        DynamicFormModule
    ],
    exports: [
        DndModule,
        GridComponent
    ],
    providers: [
        WidgetService,
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
