export interface EventMeta {
    Type: string;
    VariableName: string;
}
  
export interface Action {
    EventType: string;
}

export interface PublishAction extends Action {
    publish: Publish;
}

export interface Publish {
    channel: string;
}

export interface NavigateAction extends Action {
    navigate: Navigate;
}

export interface Navigate {
    target: string;
    parameters: NavigateParameter[];
}

export interface NavigateParameter {
    name: string;
    value: string
}