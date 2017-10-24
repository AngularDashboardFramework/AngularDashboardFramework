import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from 'ng2-dnd';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DynamicFormModule } from '../dynamic-form/dynamic-form-module';
import { GadgetSharedModule } from './_common/gadget-shared.module';
import { ErrorHandlerModule } from '../error/error.module';

import { CPUGadgetComponent } from './cpu/cpu-gadget.component';
import { CPUMGadgetComponent } from './cpum/cpum-gadget.component';
import { DiskGadgetComponent } from './disk/disk-gadget.component';
import { MemoryGadgetComponent } from './memory/memory-gadget.component';
import { EdgeServiceListGadgetComponent } from './edge-service-list/edge-service-list-gadget.component';
import { StatisticGadgetComponent } from './statistic/statistic-gadget.component';
import { TrendGadgetComponent } from './trend/trend-gadget.component';
import { TrendLineGadgetComponent } from './trend-line/trend-line-gadget.component';
import { NewsGadgetComponent } from './news/news-gadget.component';
import { JobAnalysisGadgetComponent } from './job-analysis/job-analysis-gadget.component';
import { CPUService } from './cpu/service';
import { EdgeService } from './edge-service-list/service';
import { StatisticService } from './statistic/service';
import { DiskService } from './disk/service';
import { TrendService } from './trend/service';
import { PropertyListGadgetComponent } from './property-list/property-list-gadget.component';
import { ServiceListGadgetComponent } from './service-list/service-list-gadget.component';

@NgModule({
    declarations: [
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent
    ],
    imports: [
        CommonModule,
        DndModule.forRoot(),
        GadgetSharedModule,
        DynamicFormModule,
        ErrorHandlerModule,
        NgxChartsModule
    ],
    exports: [
        CPUGadgetComponent,
        CPUMGadgetComponent,
        DiskGadgetComponent,
        MemoryGadgetComponent,
        EdgeServiceListGadgetComponent,
        StatisticGadgetComponent,
        TrendGadgetComponent,
        TrendLineGadgetComponent,
        NewsGadgetComponent,
        JobAnalysisGadgetComponent,
        StatisticGadgetComponent,
        PropertyListGadgetComponent,
        ServiceListGadgetComponent
    ],
    providers: [
        TrendService,
        DiskService,
        StatisticService,
        EdgeService,
        CPUService
    ]
})
export class GadgetModule {
}

