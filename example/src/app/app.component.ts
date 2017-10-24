import { Component } from '@angular/core';

import {boardLayouts} from './layouts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  layouts = boardLayouts;
}
