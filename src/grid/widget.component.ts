import { Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';

import { WidgetInstanceService } from './grid.service';
import { WidgetFactory } from '../add-widget/widget-factory';
// import { IWidget } from '../widgets/_common/iwidget';
import { WidgetBase } from '../widgets/_common/widget-base';

/*
 this class handles the dynamic creation of components
 */

@Component({
    selector: 'adf-grid-cell',
    template: ''
})
export class CellComponent implements OnInit {
    @Input()
    widgetType: string;

    @Input()
    widgetConfig: any;

    @Input()
    widgetInstanceId: number;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private widgetInstanceService: WidgetInstanceService
    ) {
    }

    ngOnInit() {
        /*
         create component instance dynamically
         */
        const component: any = WidgetFactory.getComponentType(this.widgetType);

        if (component) {
            this.renderComponent(component);
        }
    }

    private renderComponent(component: Type<any>) {
        const factory: any = this.resolver.resolveComponentFactory(component);

        const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(factory);

        if (componentRef.instance instanceof WidgetBase)
        {
            /*
            we need to pass the input parameters (instance id and config) back into the newly created component.
            */
            const widget: WidgetBase = componentRef.instance;
            widget.configureWidget(this.widgetInstanceId, this.widgetConfig);

            /*
                add concrete component to service for tracking
                */
            this.widgetInstanceService.addInstance(componentRef);
        }
    }
}