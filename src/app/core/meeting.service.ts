import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { Observable, of } from 'rxjs';
import { calculateHeightValue, calculateTopValue } from '../utilities/schedule-helper';
import { getYear, getMonth, getDate } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  now = new Date();
  private meetingList: Meeting[] = [
    {
      title: 'Morning Stand-up',
      start: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 8, 0, 0),
      end: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 8, 15, 0),
    },
    {
      title: 'Project Review with Client',
      start: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 10, 0, 0),
      end: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 11, 0, 0),
    },
    {
      title: 'Design Team Sync',
      start: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 12, 30, 0),
      end: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 13, 30, 0),
    },
    {
      title: 'Budget Planning Session',
      start: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 14, 0, 0),
      end: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 15, 30, 0),
    },
    {
      title: 'Wrap-up and Next Steps Discussion',
      start: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 16, 0, 0),
      end: new Date(getYear(this.now), getMonth(this.now), getDate(this.now), 17, 0, 0),
    },
  ];

  constructor() {}

  getMeetingList(): Observable<Meeting[]> {
    return of(this.meetingList.map((meeting) => this.calculateCalendarPosition(meeting, 1)));
  }

  calculateCalendarPosition(meeting: Meeting, zoom: number): Meeting {
    const topPx = calculateTopValue(meeting.start, zoom);
    const heightPx = calculateHeightValue(meeting.start, meeting.end, zoom);
    return { ...meeting, topPx, heightPx };
  }
}
