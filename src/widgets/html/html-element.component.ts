import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { WidgetContext } from '../_common/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../_common/widget.functions';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService, Template } from '@angulardynamic/databroker';

// @Component ({
//     selector: 'g-h3',
//     template: '<h3>{{ content }}</h3>'
// })
export class HTMLElementComponent implements OnInit, OnChanges {
    @Input()
    content: string = '';

    cssClass: string = '';

    data: any = {};

    configuration: any;
    datasource: any[];

    constructor(
        protected dataBroker: DataBrokerService,
        protected widgetContext: WidgetContext,
        protected widgetEventService: WidgetEventService,
        protected template: Template
    ) {
    }

    ngOnInit() {
        // console.log("HTMLElementComponent.ngOnInit()");
        // console.log("WidgetContext", this.widgetContext);

        this.configuration = this.widgetContext.getWidget().config || {};

        if (this.widgetContext.hasOwnProperty('data')) {
            this.data.data = this.widgetContext.data;
        }

        this.setupDataSources();
        this.render();
    }

    ngOnChanges($changes: SimpleChanges) {
        // console.log("HTMLElementComponent.ngOnChanges()");
        // console.log("   this.data:", this.data);

        this.render();
    }

    setupDataSources() {
        if (this.configuration.hasOwnProperty('dataSources')) {
            const dataSources = this.configuration.dataSources;
            // console.log("Data Sources", dataSources);

            dataSources.forEach((dataSource) => {
                this.dataBroker.getData(dataSource)
                    .subscribe(
                        (d) => {
                            // console.log("HTMLElementComponent/subscribe/data:", d);
                            this.data[dataSource] = d;
                            this.render();
                        }
                    );
            });
        }
    }

    render() {
        // console.log("HTMLElementComponent.render()");
        // console.log("   this.configuration.content:", this.configuration.content);
        // console.log("   this.data:", this.data);
        if (this.configuration.content) {
            this.content = this.template.parseTpl(this.configuration.content, this.data);
            // console.log("HTMLElementComponent Content", this.content);
        }

        if (this.configuration.cssClass) {
            this.cssClass = this.template.parseTpl(this.configuration.cssClass, this.data);
        }
        // else
        // {
        //     this.content = "";
        // }
    }
}
