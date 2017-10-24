import { NgModule, InjectionToken, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DndModule } from 'ng2-dnd';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';

import { GridComponent } from './grid.component';
import { CellComponent } from './cell.component';
import { GadgetInstanceService } from './grid.service';
import { ConfigurationService } from '../services/configuration.service';

import { GadgetPropertyService } from '../gadgets/_common/gadget-property.service';
import { CPUMGadgetComponent } from '../gadgets/cpum/cpum-gadget.component';
import { EdgeServiceListGadgetComponent } from '../gadgets/edge-service-list/edge-service-list-gadget.component';
import { EdgeService } from '../gadgets/edge-service-list/service';
import { JobAnalysisGadgetComponent } from '../gadgets/job-analysis/job-analysis-gadget.component';
import { JobAnalysisService } from '../gadgets/job-analysis/service';
import { StatisticGadgetComponent } from '../gadgets/statistic/statistic-gadget.component';
import { DiskGadgetComponent } from '../gadgets/disk/disk-gadget.component';
import { PropertyListGadgetComponent } from '../gadgets/property-list/property-list-gadget.component';
import { ServiceListGadgetComponent } from '../gadgets/service-list/service-list-gadget.component';
import { CPUGadgetComponent } from '../gadgets/cpu/cpu-gadget.component';
import { CPUService } from '../gadgets/cpu/service';
import { MemoryGadgetComponent } from '../gadgets/memory/memory-gadget.component';
import { NewsGadgetComponent } from '../gadgets/news/news-gadget.component';
import { NewsService } from '../gadgets/news/service';
import { TrendGadgetComponent } from '../gadgets/trend/trend-gadget.component';
import { TrendService } from '../gadgets/trend/service';
import { TrendLineGadgetComponent } from '../gadgets/trend-line/trend-line-gadget.component';
import { TrendLineService } from '../gadgets/trend-line/service';

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
        GadgetInstanceService,
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
