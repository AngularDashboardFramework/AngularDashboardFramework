import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { GridModule } from '../grid/grid.module';

import { WidgetsModule } from '../widgets/widgets.module';

import { AddWidgetModule } from '../add-widget/add-widget.module';
import { AddWidgetService } from '../add-widget/service';
import { ConfigurationModule } from '../configuration/configuration.module';
import { LayoutModule } from '../layout/layout.module';
import { NotificationModule } from '../notification/notification.module';

import { WidgetPropertyService } from '../widgets/_common/widget-property.service';

import { ConfigurationService } from '../services/configuration.service';
import { RuntimeService } from '../services/runtime.service';
import { EndPointService } from '../configuration/tab-endpoint/endpoint.service';

import { BoardComponent } from './board.component';

import { ObservableWebSocketService } from '../services/websocket.service';

import { AreaChartWidgetComponent } from '../widgets/charts/area/area-chart-widget.component';
import { BarHorizontalChartWidgetComponent } from '../widgets/charts/bar-horizontal/bar-horizontal-chart-widget.component';
import { BarVerticalChartWidgetComponent } from '../widgets/charts/bar-vertical/bar-vertical-chart-widget.component';
import { LinearGaugeChartWidgetComponent } from '../widgets/charts/linear-gauge/linear-gauge-chart-widget.component';
import { LineChartWidgetComponent } from '../widgets/charts/line/line-chart-widget.component';
import { PieChartWidgetComponent } from '../widgets/charts/pie/pie-chart-widget.component';

import { EdgeServiceListWidgetComponent } from '../widgets/edge-service-list/edge-service-list-widget.component';

import { JobAnalysisWidgetComponent } from '../widgets/job-analysis/job-analysis-widget.component';
import { NewsWidgetComponent } from '../widgets/news/news-widget.component';
import { StatisticWidgetComponent } from '../widgets/statistic/statistic-widget.component';
import { PropertyListWidgetComponent } from '../widgets/property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from '../widgets/service-list/service-list-widget.component';


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
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        WidgetsModule,
        NotificationModule,
        AddWidgetModule,
        LayoutModule,
        ConfigurationModule,
        GridModule.withComponents([
            LinearGaugeChartWidgetComponent,
            BarHorizontalChartWidgetComponent,
            BarVerticalChartWidgetComponent,
            ServiceListWidgetComponent,
            PropertyListWidgetComponent,
            PieChartWidgetComponent,
            StatisticWidgetComponent,
            AreaChartWidgetComponent,
            NewsWidgetComponent,
            JobAnalysisWidgetComponent,
            LineChartWidgetComponent,
            EdgeServiceListWidgetComponent
        ])
    ],
    exports: [
        BoardComponent
    ],
    providers: [
        HttpClient,
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
