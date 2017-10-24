import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatIconModule } from '@angular/material';

import {GridModule} from '../grid/grid.module';
import {WidgetModule} from '../widgets/widget.module';
import {AddWidgetService} from '../add-widget/service';

import {ConfigurationModule} from '../configuration/configuration.module';
import {LayoutModule} from '../layout/layout.module';
import {AddWidgetModule} from '../add-widget/add-widget.module';
import {NotificationModule} from '../notification/notification.module';

import {WidgetPropertyService} from '../widgets/_common/widget-property.service';

import {ConfigurationService} from '../services/configuration.service';
import {RuntimeService} from '../services/runtime.service';
import {EndPointService} from '../configuration/tab-endpoint/endpoint.service';
import {BoardComponent} from './board.component';

import {CPUMWidgetComponent} from '../widgets/cpum/cpum-widget.component';
import {EdgeServiceListWidgetComponent} from '../widgets/edge-service-list/edge-service-list-widget.component';
import {TrendLineWidgetComponent} from '../widgets/trend-line/trend-line-widget.component';
import {JobAnalysisWidgetComponent} from '../widgets/job-analysis/job-analysis-widget.component';
import {NewsWidgetComponent} from '../widgets/news/news-widget.component';
import {TrendWidgetComponent} from '../widgets/trend/trend-widget.component';
import {StatisticWidgetComponent} from '../widgets/statistic/statistic-widget.component';
import {DiskWidgetComponent} from '../widgets/disk/disk-widget.component';
import {PropertyListWidgetComponent} from '../widgets/property-list/property-list-widget.component';
import {ServiceListWidgetComponent} from '../widgets/service-list/service-list-widget.component';
import {CPUWidgetComponent} from '../widgets/cpu/cpu-widget.component';
import {MemoryWidgetComponent} from '../widgets/memory/memory-widget.component';

import { ObservableWebSocketService } from '../services/websocket-service';

@NgModule({
    declarations: [
        BoardComponent
    ],
    entryComponents: [
        BoardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatIconModule,
        WidgetModule,
        NotificationModule,
        AddWidgetModule,
        LayoutModule,
        ConfigurationModule,
        GridModule.withComponents([
            MemoryWidgetComponent,
            CPUWidgetComponent,
            ServiceListWidgetComponent,
            PropertyListWidgetComponent,
            DiskWidgetComponent,
            StatisticWidgetComponent,
            TrendWidgetComponent,
            NewsWidgetComponent,
            JobAnalysisWidgetComponent,
            TrendLineWidgetComponent,
            EdgeServiceListWidgetComponent,
            CPUMWidgetComponent
        ])
    ],
    exports: [
        BoardComponent
    ],
    providers: [
        EndPointService,
        RuntimeService,
        ConfigurationService,
        AddWidgetService,
        WidgetPropertyService,
        ObservableWebSocketService
    ]
})

export class BoardModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: BoardModule,
        providers: []
      };
    }
  }