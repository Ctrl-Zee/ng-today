import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  ngOnInit(): void {
    this.scheduleStore.updateSchedule(); // kick off the schedule update
  }

  toggleZoom(zoom: number) {
    this.scheduleStore.updateZoom(zoom === 1 ? 2 : 1);
  }
}
