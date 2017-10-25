/**
 * Created by jayhamilton on 5/16/17.
 */
import {Component} from '@angular/core';
import {Notification} from './notification.model';

@Component({
    selector: 'adf-notification-detail',
    moduleId: module.id,
    templateUrl: './notificationDetail.html'

})
export class NotificationDetailComponent {
    notifications: Notification[];

    constructor() {
        this.notifications = [];

        let notification = new Notification('CPU Widget', 'this is a cpu widget error.');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);

        notification = new Notification ('Area Widget', 'this is an area widget error.');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);

        notification = new Notification ('Disk Widget', 'Disk 1 alert');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);

        notification = new Notification ('Disk Widget', 'Disk 2 alert');
        notification.setWhen((new Date()).toString());
        this.notifications.push(notification);
    }
}
