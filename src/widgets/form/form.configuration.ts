import { EventMeta, Action, PublishAction, Publish, NavigateAction, Navigate, NavigateParameter } from '../../fsm/model';
import { JsonSchema } from '../../models/JsonSchema';

export interface FormWidgetConfiguration {
    dataSource: string;
    data: object | string;
    schemaSource: any;
    schema: JsonSchema | string;
    layoutSource: any;
    layout: object[] | string;

    events: FormEvents;
}

export interface FormEvents {
    OnChange: FormEvent;
    OnSubmit: FormEvent;
    IsValid: FormEvent;
    ValidationErrors: FormEvent;
}

export interface FormEvent {
    EventMeta: EventMeta;
    Actions: Action[];
}

export interface OnChangeAction {

}

export interface OnSubmitAction {

}

export interface IsValidAction {

}

export interface ValidationErrorsAction {

}