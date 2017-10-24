import {ChangeDetectorRef, Component} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {WidgetInstanceService} from '../../grid/grid.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {WidgetPropertyService} from '../_common/widget-property.service';
import {WidgetBase} from '../_common/widget-base';
import {StatisticService} from './service';

@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './statistic-widget.component.html',
    styleUrls: ['../_common/styles-widget.css']
})
export class StatisticWidgetComponent extends WidgetBase {

    widgetHasOperationControls = false;

    // runtime document subscription
    data: any;
    resource: string;

    constructor(protected _statisticService: StatisticService,
                protected _procMonRuntimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef) {
        super(_procMonRuntimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

        this.run();
    }

    public preRun(): void {
        this.resource = this.getPropFromPropertyPages('resource');
        this.updateData(null);
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

        this._statisticService.get(this.resource).subscribe(data => {
                this.data = data;
            },
            error => this.handleError(error));
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

        this.resource = updatedPropsObject.resource;
        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);
        this.updateData(null);

    }

}
