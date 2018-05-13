import { Component } from '@angular/core';

import { WidgetContext } from '../_common/widget.context';
import { FormWidgetConfiguration } from './form.configuration';

@Component({
  templateUrl: 'form-edit-widget.component.html',
  styleUrls: ['form-edit-widget.component.css']
})
export class FormEditWidgetComponent {

  configuration: FormWidgetConfiguration;

  constructor(
    private context: WidgetContext
  ) {
    this.configuration = context.getConfig();
  }

  save() {
    this.context.configChanged(this.configuration);
  }

  cancel() {
    this.context.cancelEditMode();
  }

}
