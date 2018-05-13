import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { GridModule } from 'ng-adf/grid/grid.module';

import { WidgetsModule } from 'ng-adf/widgets/widgets.module';

import { AddWidgetModule } from 'ng-adf/add-widget/add-widget.module';
import { AddWidgetService } from 'ng-adf/add-widget/service';
import { ConfigurationModule } from 'ng-adf/configuration/configuration.module';
import { LayoutModule } from 'ng-adf/layout/layout.module';
import { NotificationModule } from 'ng-adf/notification/notification.module';

import { WidgetPropertyService } from 'ng-adf/widgets/_common/widget-property.service';

import { ConfigurationService } from 'ng-adf/services/configuration.service';
import { RuntimeService } from 'ng-adf/services/runtime.service';
import { EndPointService } from 'ng-adf/configuration/tab-endpoint/endpoint.service';

import { BoardComponent } from './board.component';

import { ObservableWebSocketService } from 'ng-adf/services/websocket.service';

import { AreaChartWidgetComponent } from 'ng-adf/widgets/charts/area/area-chart-widget.component';
import { BarHorizontalChartWidgetComponent } from 'ng-adf/widgets/charts/bar-horizontal/bar-horizontal-chart-widget.component';
import { BarVerticalChartWidgetComponent } from 'ng-adf/widgets/charts/bar-vertical/bar-vertical-chart-widget.component';
import { LinearGaugeChartWidgetComponent } from 'ng-adf/widgets/charts/linear-gauge/linear-gauge-chart-widget.component';
import { LineChartWidgetComponent } from 'ng-adf/widgets/charts/line/line-chart-widget.component';
import { PieChartWidgetComponent } from 'ng-adf/widgets/charts/pie/pie-chart-widget.component';

import { EdgeServiceListWidgetComponent } from 'ng-adf/widgets/edge-service-list/edge-service-list-widget.component';

import { JobAnalysisWidgetComponent } from 'ng-adf/widgets/job-analysis/job-analysis-widget.component';
import { NewsWidgetComponent } from 'ng-adf/widgets/news/news-widget.component';
import { StatisticWidgetComponent } from 'ng-adf/widgets/statistic/statistic-widget.component';
import { PropertyListWidgetComponent } from 'ng-adf/widgets/property-list/property-list-widget.component';
import { ServiceListWidgetComponent } from 'ng-adf/widgets/service-list/service-list-widget.component';


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
