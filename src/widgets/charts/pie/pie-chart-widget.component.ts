import { ChangeDetectorRef, Component } from '@angular/core';

import { style, trigger, animate, transition, state } from '@angular/animations';

import { RuntimeService } from '../../../services/runtime.service';
import { WidgetInstanceService } from '../../../grid/grid.service';
import { EndPointService } from '../../../configuration/tab-endpoint/endpoint.service';
import { WidgetPropertyService } from '../../_common/widget-property.service';
import { WidgetBase } from '../../_common/widget-base';

import { PieChartWidgetService } from './pie-chart-widget.service';


@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './pie-chart-widget.component.html',
    styleUrls: ['../../_common/styles-widget.css'],
    animations: [

        trigger('accordion', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('700ms ease-in-out')),
            transition('out => in', animate('300ms ease-in-out'))
        ]),
        trigger('accordion2', [
            state('in', style({
                height: '*'
            })),
            state('out', style({
                opacity: '0',
                height: '0px'
            })),
            transition('in => out', animate('300ms ease-in-out')),
            transition('out => in', animate('800ms ease-in-out'))
        ])
    ]
})
export class PieChartWidgetComponent extends WidgetBase {

    topic: any;

    showOperationControls = false;

    data: any;

    threshold: string;

    badColorScheme = {
        domain: ['#a10910', '#DDDDDD']
    };
    goodColorScheme = {
        domain: ['#00c700', '#DDDDDD']
    };
    used;
    avail;

    detailMenuOpen: string;

    colorScheme = this.goodColorScheme;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _diskService: PieChartWidgetService) {
        super(_runtimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);

        this.run();
        this.setTopic();
    }


    public preRun(): void {

        this.threshold = this.getPropFromPropertyPages('threshold');
        this.detailMenuOpen = 'out';

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

        this._diskService.getMockData().subscribe(_data => {
                this.data = _data;

                const thresholdVal = Number(this.threshold);

                if (this.data[0].value < thresholdVal) {
                    this.colorScheme = this.goodColorScheme;
                } else {
                    this.colorScheme = this.badColorScheme;
                }

                this.used = this.data[0].value;
                this.avail = this.data[1].value;

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

        this.threshold = updatedPropsObject.threshold;
        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);

        this.run();


    }
    setTopic() {
        this._diskService.getHelpTopic().subscribe(data => {

            this.topic = data;

        });
    }
    toggleAcordion(): void {

        this.detailMenuOpen = this.detailMenuOpen === 'out' ? 'in' : 'out';

    }
}
