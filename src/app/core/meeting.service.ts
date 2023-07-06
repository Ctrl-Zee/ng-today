import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private meetingList: Meeting[] = [
    {
      title: 'Morning Stand-up',
      start: new Date('2023-07-06T08:00:00'),
      end: new Date('2023-07-06T08:30:00'),
    },
    {
      title: 'Project Review with Client',
      start: new Date('2023-07-06T10:00:00'),
      end: new Date('2023-07-06T11:00:00'),
    },
    {
      title: 'Design Team Sync',
      start: new Date('2023-07-06T12:30:00'),
      end: new Date('2023-07-06T13:30:00'),
    },
    {
      title: 'Budget Planning Session',
      start: new Date('2023-07-06T14:00:00'),
      end: new Date('2023-07-06T15:30:00'),
    },
    {
      title: 'Wrap-up and Next Steps Discussion',
      start: new Date('2023-07-06T16:00:00'),
      end: new Date('2023-07-06T17:00:00'),
    },
  ];

  constructor() {}

  getMeetingList(): Observable<Meeting[]> {
    return of(this.meetingList);
  }
}
