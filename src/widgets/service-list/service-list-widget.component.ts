import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
    style, trigger, animate, transition
} from '@angular/animations';

import {RuntimeService} from '../../services/runtime.service';
import {serviceList} from './service-list';
import {WidgetInstanceService} from '../../grid/grid.service';
import {WidgetPropertyService} from '../_common/widget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {WidgetBase} from '../_common/widget-base';


@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './service-list-widget.component.html',
    styleUrls: ['../_common/styles-widget.css'],
    animations: [
        trigger(
            'showHideAnimation',
            [
                transition(':enter', [   // :enter is alias to 'void => *'
                    style({opacity: 0}),
                    animate(1000, style({opacity: 1}))
                ]),
                transition(':leave', [   // :leave is alias to '* => void'
                    animate(1000, style({opacity: 0}))

                ])
            ])]
})
export class ServiceListWidgetComponent extends WidgetBase implements OnDestroy {

    // todo just realy on json
    serviceList: {
        active: boolean,
        applicationName: string,
        description: string,
        icon: string,
        pseudoName: string,
        processId: string }[] = [];

    constructor(protected _procMonRuntimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                private _changeDetectionRef: ChangeDetectorRef) {
        super(_procMonRuntimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

       this.run();

    }

    public preRun(): void {
    }

    public run() {
        this.errorExists = false;
        this.actionInitiated = false;
        this.inRun = true;
        Object.assign(this, {serviceList});

    }

    public stop() {
        this.errorExists = false;
        this.inRun = false;
        this.actionInitiated = false;
    }

    public updateData(data: any[]) {

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

        this.title = updatedPropsObject.title;

        this.setEndPoint(updatedPropsObject.endpoint);

        this.showOperationControls = true;

    }

}
