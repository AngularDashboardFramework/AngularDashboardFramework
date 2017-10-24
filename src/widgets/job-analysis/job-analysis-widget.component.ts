import {ChangeDetectorRef, Component} from '@angular/core';
import * as d3 from 'd3-shape';

import {WidgetInstanceService} from '../../grid/grid.service';
import {RuntimeService} from '../../services/runtime.service';
import {WidgetPropertyService} from '../_common/widget-property.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {WidgetBase} from '../_common/widget-base';
import {JobAnalysisService} from './service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

export type D3 = typeof d3;

@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['./ja.css']
})

export class JobAnalysisWidgetComponent extends WidgetBase {


    showOperationControls = false;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _jobAnalysisService: JobAnalysisService,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        super(_runtimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

        iconRegistry.addSvgIcon(
            'thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/ic_add_white_36px.svg'));

        this.run();
    }


    public preRun(): void {
    }

    public run() {

    }

    public stop() {

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
