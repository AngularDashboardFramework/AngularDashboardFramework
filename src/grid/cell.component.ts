import { Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { WidgetInstanceService } from './grid.service';
import { WidgetFactory } from '../add-widget/widget-factory';

/*
 this class handles the dynamic creation of components
 */

@Component({
    selector: 'adf-grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input() widgetType: string;
    @Input() widgetConfig: any;
    @Input() widgetInstanceId: number;


    constructor(private viewContainerRef: ViewContainerRef,
                private cfr: ComponentFactoryResolver, private widgetInstanceService: WidgetInstanceService) {
    }

    ngOnInit() {
        /*
         create component instance dynamically
         */
        const component: any = WidgetFactory.getComponentType(this.widgetType);
        let compFactory: any = {};
        let widgetRef: any = {};

        if (component) {
            compFactory = this.cfr.resolveComponentFactory(component);
            widgetRef = this.viewContainerRef.createComponent(compFactory);

            /*
             we need to pass the input parameters (instance id and config) back into the newly created component.
             */
            widgetRef.instance.configureWidget(this.widgetInstanceId, this.widgetConfig);

            /*
             add concrete component to service for tracking
             */
            this.widgetInstanceService.addInstance(widgetRef);
        }

    }

}

