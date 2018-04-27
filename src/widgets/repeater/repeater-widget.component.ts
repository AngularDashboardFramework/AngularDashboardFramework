import { Component, Input, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

// import { Column } from './column';
// import { Widget } from './widget';
// import { Model } from './model';

// import { NgaModule } from '../../../theme/nga.module';

import { WidgetContext } from '../../board/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../../board/widget.functions';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService, Template } from '@angulardynamic/databroker';

import { LayoutService } from '../../services/layout.service';
import { Layout } from '../../layout';

import { RepeaterConfiguration } from './repeater.configuration';

@Component({
    selector: 'repeater',
    templateUrl: './repeater-widget.component.html',
    // styleUrls: ['./repeater.scss']
})
export class RepeaterWidget implements OnInit {
    layout: Layout;
    data: Observable<any>;
    model: any = {};
    rows: any[] = [];

    dndEnabled: boolean = false;

    error: string;
    configuration: RepeaterConfiguration;

    // @ViewChild('myButton') myButton;
    // @ViewChildren('cmp') components;// :QueryList<CustomComponent>;

    constructor(
        private http: HttpClient,
        private renderer: Renderer2,
        protected dataBroker: DataBrokerService,
        private context: WidgetContext,
        // private widgetEventService: WidgetEventService,
        private layoutService: LayoutService,
        private template: Template
    ) {
    }

    ngOnInit() {
        // console.log("RepeaterWidget.ngOnInit()");
        this.configuration = <RepeaterConfiguration>(this.context.getWidget().config || {});
        // console.debug("RepeaterWidget:Configuration", this.configuration);

        if (this.configuration.model !== undefined) {
            this.getModel();
        } else {
            // console.error(" Layout model is empty");
        }

        this.fetchData();

        // let simple = this.renderer.listen(this.myButton.nativeElement, 'click', (evt) => {
        //     console.log('Clicking the button', evt);
        // });

        // this.components.forEach(component => {
        //     this.renderer.listen(component.nativeElement, 'click', (evt) => {
        //         console.log('Clicking the button', evt);
        //     });
        // });


        this.data
            .subscribe(d => {
                // console.log("RepeaterWidget.data received: d:", d);

                let data;

                if (this.configuration.dataSelector) {
                    if (d.hasOwnProperty('data')) {
                        if (d.data.hasOwnProperty('deals')) {
                            // d = this.template.parseTpl(this.configuration.dataSelector, d);
                            data = d.data.deals;
                            // data = d.data[this.configuration.dataSelector];
                            // console.log("  d:", d);
                        }
                    }
                } else {
                    data = d;
                }

                // console.log("RepeaterWidgetComponent", " data:", data);
                // console.log(" data:", data);

                this.rows = Array.isArray(data) ? data : [];
                // console.log(" this.rows.length:", this.rows.length);
            }
            );
    }

    onClick($event: any) {
        console.log('RepeaterWidgetComponent.onClick()', $event);
    }

    setError(error: string): void {
        this.error = error;
        console.error(error);
    }

    getModel() {
        // console.log("RepeaterWidgetComponent.getModel()");
        // console.log(" this.model:", this.model);

        if (this.configuration.model.hasOwnProperty('$ref')) {
            const ref = this.configuration.model.$ref;

            this.http.get(ref)
                // .catch(this.handleError)
                .subscribe((model) => {
                    // console.log("RepeaterWidgetComponent.getModel():subscribe(", model);
                    // console.log(" data:", data);
                    // this.model.layout
                    // Object.assign(this.model, data);
                    this.model = model;
                    // console.log(" this.model", this.model);

                    this.getLayout();
                });
        } else {
            this.model = this.configuration.model;
            this.getLayout();
        }
    }

    getLayout() {
        // console.log("RepeaterWidgetComponent.getLayout()");
        if (this.model.layout !== undefined) {
            this.layoutService.getLayout(this.model.layout)
                .subscribe(layout => {
                    // console.log("RepeaterWidgetComponent.getLayout():subscribe(", layout);
                    this.layout = layout;
                });
        } else {
            console.error('RepeaterWidgetComponent: model.layout is undefined');
        }
    }

    fetchData() {
        if (this.configuration.dataSource) {
            // console.log("RepeaterWidgetComponent:fetchData()", this.configuration.dataSource);

            this.data = this.dataBroker.getData(this.configuration.dataSource);

            // console.log(`RepeaterWidgetComponent:fetchData():subscribed: "${this.configuration.dataSource}"`, this.data);
        } else {
            console.log('RepeaterWidgetComponent:fetchData():no dataSource');
        }
    }
}
