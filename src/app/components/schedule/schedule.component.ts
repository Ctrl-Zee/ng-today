import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourBlock } from 'src/app/models/hour-block';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  hourBlocks: HourBlock[] = [];

  constructor() {
    this.hourBlocks = [
      { y: '0', hourLabel: '8:00', militaryTime: 8 },
      { y: '60', hourLabel: '9:00', militaryTime: 9 },
      { y: '120', hourLabel: '10:00', militaryTime: 10 },
      { y: '180', hourLabel: '11:00', militaryTime: 11 },
      { y: '240', hourLabel: '12:00', militaryTime: 12 },
      { y: '300', hourLabel: '1:00', militaryTime: 13 },
      { y: '360', hourLabel: '2:00', militaryTime: 14 },
      { y: '420', hourLabel: '3:00', militaryTime: 15 },
      { y: '480', hourLabel: '4:00', militaryTime: 16 },
      { y: '540', hourLabel: '5:00', militaryTime: 17 },
      { y: '600', hourLabel: '6:00', militaryTime: 18 },
    ];
    const now = new Date();
  }
}
