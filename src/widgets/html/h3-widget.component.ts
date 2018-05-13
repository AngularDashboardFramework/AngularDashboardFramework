import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { WidgetContext } from '../_common/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../_common/widget.functions';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService, Template } from '@angulardynamic/databroker';

import { HTMLElementComponent } from './html-element.component';

@Component({
    selector: 'g-h3',
    template: '<h3 [attr.class]="cssClass">{{ content }}</h3>'
})
export class H3WidgetComponent extends HTMLElementComponent {
    constructor(
        protected dataBroker: DataBrokerService,
        protected context: WidgetContext,
        protected widgetEventService: WidgetEventService,
        protected template: Template
    ) {
        super(dataBroker, context, widgetEventService, template);
    }
}
