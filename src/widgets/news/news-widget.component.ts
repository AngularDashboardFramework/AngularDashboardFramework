import {ChangeDetectorRef, Component} from '@angular/core';
import {RuntimeService} from '../../services/runtime.service';
import {WidgetInstanceService} from '../../grid/grid.service';
import {EndPointService} from '../../configuration/tab-endpoint/endpoint.service';
import {WidgetPropertyService} from '../_common/widget-property.service';
import {WidgetBase} from '../_common/widget-base';
import {NewsService} from './service';

@Component({
    selector: 'adf-dynamic-component',
    moduleId: module.id,
    templateUrl: './view.html',
    styleUrls: ['../_common/styles-widget.css']
})
export class NewsWidgetComponent extends WidgetBase {

    // runtime document subscription
    news: any;
    resource: string;

    widgetHasOperationControls = false;

    constructor(protected _runtimeService: RuntimeService,
                protected _widgetInstanceService: WidgetInstanceService,
                protected _propertyService: WidgetPropertyService,
                protected _endPointService: EndPointService,
                protected _changeDetectionRef: ChangeDetectorRef,
                protected _newsService: NewsService) {
        super(_runtimeService,
            _widgetInstanceService,
            _propertyService,
            _endPointService,
            _changeDetectionRef);
        
    }

    public preRun(): void {
        this.updateData(null);

        this.run();
    }

    public run() {
        this.news = [];
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

        this._newsService.get().subscribe(news => {
                this.news = news;
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

        this.title = updatedPropsObject.title;
        this.setEndPoint(updatedPropsObject.endpoint);
        this.updateData(null);
    }

}
