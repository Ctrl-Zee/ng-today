import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { Observable, of } from 'rxjs';
import { calculateHeightValue, calculateTopValue } from '../utilities/schedule-helper';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private meetingList: Meeting[] = [
    {
      title: 'Morning Stand-up',
      start: new Date('2023-07-07T08:00:00'),
      end: new Date('2023-07-07T08:15:00'),
    },
    {
      title: 'Project Review with Client',
      start: new Date('2023-07-07T10:00:00'),
      end: new Date('2023-07-07T11:00:00'),
    },
    {
      title: 'Design Team Sync',
      start: new Date('2023-07-07T12:30:00'),
      end: new Date('2023-07-07T13:30:00'),
    },
    {
      title: 'Budget Planning Session',
      start: new Date('2023-07-07T14:00:00'),
      end: new Date('2023-07-07T15:30:00'),
    },
    {
      title: 'Wrap-up and Next Steps Discussion',
      start: new Date('2023-07-07T16:00:00'),
      end: new Date('2023-07-07T17:00:00'),
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
