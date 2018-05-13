import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { WidgetContext } from '../_common/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../_common/widget.functions';
import { Widget } from '../_common/widget';
import { WidgetEventService } from '../_common/widgetevent.service';

import { DataBrokerService } from '@angulardynamic/databroker';

import { FormWidgetConfiguration } from './form.configuration';

// import { WidgetRegistry } from 'angular2-schema-form';
import { WidgetLibraryService } from 'angular2-json-schema-form';
import { CodeEditorWidget } from './widgets/codeeditor/codeeditor.widget';

import { PublishAction } from '../../fsm/model';
import { isEmpty, isEqual, isArray } from 'lodash';

@Component({
    templateUrl: './form-widget.html',
})
export class FormWidgetComponent implements OnInit, WidgetFunctionProvider, OnChanges {
    error: string;

    widget: Widget;
    configuration: FormWidgetConfiguration;

    isSchemaForm: boolean = false;

    schema: any = {};

    layout: any = {};

    model: any = {};

    private validators = {};
    private actions = {};

    private hasEventSubscriptionOnChange = false;
    private hasEventSubscriptionOnSubmit = true;

    private lastEventOnChange = null;

    constructor(
        private dataBroker: DataBrokerService,
        private widgetContext: WidgetContext,
        private widgetEventService: WidgetEventService,
        formWidgetRegistry: WidgetLibraryService
    ) {
        formWidgetRegistry.registerWidget('codeeditor', CodeEditorWidget);
    }

    ngOnInit() {
        console.debug(`FormWidgetComponent.ngOnInit()`);
        this.widget = this.widgetContext.getWidget();
        console.debug(` widget.id:(${this.widget.id})`);
        this.configuration = <FormWidgetConfiguration>(this.widgetContext.getConfig() || {});

        this.hasEventSubscriptionOnChange = (this.configuration.hasOwnProperty('events') && this.configuration.events.hasOwnProperty('onChange'));
        this.hasEventSubscriptionOnSubmit = (this.configuration.hasOwnProperty('events') && this.configuration.events.hasOwnProperty('onSubmit'));

        this.initDataBroker();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(`   OnChanges`, changes);
    }

    initDataBroker() {
        console.log(`   initDataBroker():`, this.configuration.dataSource);

        this.initData();

        this.initSchema();

        this.initLayout();
    }

    initData() {
        if (this.configuration.dataSource != undefined && this.configuration.dataSource !== '') {
            console.log('   this.configuration.dataSource', this.configuration.dataSource);
            if (typeof this.configuration.dataSource === 'string') {
                console.log('   string');
                this.dataBroker.getData(this.configuration.dataSource)
                    .subscribe(
                        d => {
                            console.log(`Widget:Form(${this.widget.id})/dataSource/subscribe:`, d);
                            if (typeof (d) === 'string') {
                                console.log(`   typeof(d) === "string"`);
                                this.model = JSON.parse(d);
                            } else if (typeof (d) === 'object') {
                                console.log(`   typeof(d) === "object"`);
                                this.model = d;
                            } else {

                                console.log(`   typeof(d) something else`);
                            }
                        },
                        error => this.error = error
                    );
            } else if (typeof this.configuration.dataSource === 'object') {
                console.log('   object');
                this.model = this.configuration.dataSource;
            }
        } else {
            console.debug(' no DataSource');
        }
    }

    initSchema() {
        console.log('   this.configuration.schema', this.configuration.schema);
        if (typeof this.configuration.schema === 'string') {
            this.dataBroker.getData(this.configuration.schema)
                .subscribe(
                    d => {
                        console.log(`Widget:Form(${this.widget.id})/schema/subscribe:`, d, typeof (d));
                        if (typeof (d) === 'string') {
                            this.schema = JSON.parse(d);
                        } else if (typeof (d) === 'object') {
                            this.schema = d;
                        }

                        if (!isEmpty(this.schema)) {
                            console.log('!isEmpty(this.schema)', this.schema);
                            this.isSchemaForm = true;
                        } else {
                            console.log('isEmpty(this.schema)', this.schema);
                            this.isSchemaForm = false;
                        }
                    },
                    error => this.error = error
                );
        } else if (this.configuration.schema.hasOwnProperty('$ref')) { // TODO: Properly Resolve $Ref
            this.dataBroker.getData(this.configuration.schema.$ref)
                .subscribe(
                    d => {
                        console.log(`Widget:Form(${this.widget.id})/schema/subscribe:`, d);
                        this.schema = d;
                        this.isSchemaForm = true;
                    },
                    error => this.error = error
                );
        } else if (typeof this.configuration.schema === 'object') {
            this.schema = this.configuration.schema;
            this.isSchemaForm = true;
        } else {
            console.error('FormWidgetComponent.initDataBroker():invalid form schema');
        }
    }

    initLayout() {
        if (typeof this.configuration.layout === 'string') {
            this.dataBroker.getData(this.configuration.layout)
                .subscribe(
                    d => {
                        console.log(`Widget:Form(${this.widget.id})/layout/subscribe:`, d);
                        if (typeof (d) === 'string') {
                            this.layout = JSON.parse(d);
                        } else if (isArray(d)) {
                            this.layout = d;
                        }
                    },
                    error => this.error = error
                );
        } else if (isArray(this.configuration.layout)) {
            this.layout = this.configuration.layout
        } else {
            console.log('FormWidgetComponent.initDataBroker():invalid form layout');
            console.log('');
        }
    }

    onChanges($event: any) {
        if (this.hasEventSubscriptionOnChange && this.isValid($event)) {
            // console.debug("FormWidgetComponent.onChange(): ", $event, this.lastEventOnChange);
            if (!isEqual(this.lastEventOnChange, $event)) {
                this.lastEventOnChange = $event;

                console.log(' FormWidgetComponent.onChange():publishData', this.widgetContext.getWidget().id, $event);

                this.dataBroker.publishData(this.widgetContext.getWidget().id + '/OnChange', $event);

                // console.debug("\n\n");
            }
        }
    }

    onSubmit($event: any) {
        if (this.hasEventSubscriptionOnSubmit) {
            console.debug('FormWidgetComponent.onSubmit(): ', $event);
            if (this.configuration.events !== null && this.configuration.events.hasOwnProperty('OnSubmit')) {
                const onSubmit = this.configuration.events.OnSubmit;

                onSubmit.Actions.forEach(action => {
                    if (action.EventType === 'publish') {
                        const publishAction = <PublishAction>action;

                        this.dataBroker.publishData(publishAction.publish.channel, $event);
                    }
                });

            }
        }
    }

    isValid($event: any) {
        // console.debug("FormWidgetComponent.isValid(): ", $event, isValid);
        // let isValid = !isEmpty($event);
        // return isValid;
        return true;
    }

    validationErrors($event: any) {
        if ($event !== null) {
            console.debug('FormWidgetComponent.validationErrors(): ', $event);
        }
    }

    getFunctions(): WidgetFunction[] {
        return [
            // WidgetFunctions.refresh(this.fetchFeed, this.isRefreshAvailable)
        ];
    }

    configGetEvents(): any[] {
        return [
            {
                'onChange':
                    {
                        'name': 'Changed',
                        'description': 'Triggered when any field is changed (key pressed) within the form.'
                    },
                'onSubmit':
                    {
                        'name': 'Submit',
                        'description': 'Trigger on form submit.'
                    },
                'isValid':
                    {
                        'name': 'Valid',
                        'description': 'Triggered after form changes.'
                    },
                'validationErrors':
                    {
                        'name': 'Validation Errors',
                        'description': ''
                    }
            }
        ]
    }

    private isRefreshAvailable(): boolean {
        return !this.widgetContext.editMode
            && this.configuration.dataSource !== null
            && this.configuration.dataSource !== undefined;
    }
}
