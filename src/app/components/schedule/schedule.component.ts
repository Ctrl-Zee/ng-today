import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourBlock } from 'src/app/models/hour-block';
import { ScheduleStore } from './schedule.store';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ScheduleStore],
})
export class ScheduleComponent {
  calendarConfig$ = this.scheduleStore.calendarConfig$;

  constructor(private scheduleStore: ScheduleStore) {}

  toggleZoom(zoom: number) {
    this.scheduleStore.updateZoom(zoom === 1 ? 2 : 1);
  }
}
