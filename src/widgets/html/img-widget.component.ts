import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { WidgetContext } from '../_common/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../_common/widget.functions';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService, Template } from '@angulardynamic/databroker';

import { HTMLElementComponent } from './html-element.component';

@Component({
    selector: 'g-img',
    template: '<img [src]="content" [attr.class]="cssClass" [style]="style" />'
})
export class ImgWidgetComponent extends HTMLElementComponent {
    height: number = 100;
    width: number = 100;
    style: string = ''; // max-width: 50px;

    constructor(
        protected dataBroker: DataBrokerService,
        protected context: WidgetContext,
        protected widgetEventService: WidgetEventService,
        protected template: Template
    ) {
        super(dataBroker, context, widgetEventService, template);
    }
}
