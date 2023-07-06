import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleStore } from './components/schedule/schedule.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, ScheduleComponent],
  providers: [ScheduleStore],
})
export class AppComponent {
  title = 'ng-today';
}
