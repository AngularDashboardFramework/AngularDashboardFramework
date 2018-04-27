import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { WidgetContext } from '../../board/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../../board/widget.functions';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService, Template } from '@angulardynamic/databroker';

import { HTMLElementComponent } from './html-element.component';

@Component({
    selector: 'g-span',
    template: '<span [attr.class]="cssClass">{{ content }}</span>'
})
export class SpanWidgetComponent extends HTMLElementComponent {
    constructor(
        protected dataBroker: DataBrokerService,
        protected context: WidgetContext,
        protected widgetEventService: WidgetEventService,
        protected template: Template
    ) {
        super(dataBroker, context, widgetEventService, template);
    }
}
