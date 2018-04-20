import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { WidgetInstanceService } from '../../../grid/grid.service';
import { RuntimeService } from '../../../services/runtime.service';
import { WidgetPropertyService } from '../../_common/widget-property.service';
import { EndPointService } from '../../../configuration/tab-endpoint/endpoint.service';

import { WidgetBase } from '../../_common/widget-base';
import { ChartBarHorizontalConfig } from './bar-horizontal-chart-widget.config';
import { BarHorizontalChartWidgetService } from './bar-horizontal-chart-widget.service';

@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './bar-horizontal-chart-widget.component.html',
    styleUrls: ['../../_common/styles-widget.css']
})

export class BarHorizontalChartWidgetComponent extends WidgetBase implements OnDestroy, OnInit {
    // chart options
    config: ChartBarHorizontalConfig;

    gradient: boolean = true;
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    showYAxisLabel: boolean = true;
    yAxisLabel: string = 'Available CPUs';
    xAxisLabel: string = 'Percent Utilization';

    view: any[];
    data: any[] = [];

    colorScheme: any = {
        domain: ['#0d5481', '#0AFF16']
    };

    constructor(
        protected _runtimeService: RuntimeService,
        protected _widgetInstanceService: WidgetInstanceService,
        protected _propertyService: WidgetPropertyService,
        protected _endPointService: EndPointService,
        protected _service: BarHorizontalChartWidgetService,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        super(_runtimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);
    }

    public preRun(): void {
        this.run();
    }

    public run() {
        this.data = [];
        this.errorExists = false;
        this.actionInitiated = true;
        this.actionInitiated = false;
        this.inRun = true;

        this.updateData(null);
    }

    public stop() {
        this.errorExists = false;
        this.actionInitiated = true;
        this.actionInitiated = false;
        this.inRun = false;
    }

    public updateData(data: any[]) {
        this._service.getMockData().subscribe(data => {
                Object.assign(this, {data});
            },
            error => this.handleError(error)
        );
    }

    public updateProperties(updatedProperties: any) {
        /**
         * todo
         *  A similar operation exists on the procmman-config-service
         *  whenever the property page form is saved, the in memory board model
         *  is updated as well as the widget instance properties
         *  which is what the code below does. This can be eliminated with code added to the
         *  config service or the property page service.
         *
         * **/
        const updatedPropsObject = JSON.parse(updatedProperties);

        this.propertyPages.forEach(function (propertyPage) {
            for (let x = 0; x < propertyPage.properties.length; x++) {
                for (const prop in updatedPropsObject) {
                    if (updatedPropsObject.hasOwnProperty(prop)) {
                        if (prop === propertyPage.properties[x].key) {
                            propertyPage.properties[x].value = updatedPropsObject[prop];
                        }
                    }
                }
            }
        });

        //this.config = updatedPropsObject.chart_properties;
        this.title = updatedPropsObject.title;
        this.showXAxis = updatedPropsObject.chart_properties;
        this.showYAxis = updatedPropsObject.chart_properties;
        this.gradient = updatedPropsObject.chart_properties;
        this.showLegend = updatedPropsObject.chart_properties;
        this.showXAxisLabel = updatedPropsObject.chart_properties;
        this.showYAxisLabel = updatedPropsObject.chart_properties;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;
    }
}
