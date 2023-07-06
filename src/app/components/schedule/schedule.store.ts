import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { getYear, getMonth, getDate, addMinutes, differenceInMinutes } from 'date-fns';
import { Observable, of, switchMap, timer } from 'rxjs';
import { HourBlock } from 'src/app/models/hour-block';

interface ScheduleState {
  zoom: number;
  hourBlocks: HourBlock[];
  nowLinePx: number;
}

@Injectable()
export class ScheduleStore extends ComponentStore<ScheduleState> {
  calendarConfig$ = this.select((state) => state);

  workDayStart!: Date;
  workdayLength = 600;
  workdayEnd!: Date;
  circleRadius = 5;

  constructor() {
    super({
      zoom: 1,
      hourBlocks: [
        { hourLabel: '8:00', militaryTime: 8, height: 60 },
        { hourLabel: '9:00', militaryTime: 9, height: 60 },
        { hourLabel: '10:00', militaryTime: 10, height: 60 },
        { hourLabel: '11:00', militaryTime: 11, height: 60 },
        { hourLabel: '12:00', militaryTime: 12, height: 60 },
        { hourLabel: '1:00', militaryTime: 13, height: 60 },
        { hourLabel: '2:00', militaryTime: 14, height: 60 },
        { hourLabel: '3:00', militaryTime: 15, height: 60 },
        { hourLabel: '4:00', militaryTime: 16, height: 60 },
        { hourLabel: '5:00', militaryTime: 17, height: 60 },
        { hourLabel: '6:00', militaryTime: 18, height: 60 },
      ],
      nowLinePx: -20,
    });

    const now = new Date();
    this.workDayStart = new Date(getYear(now), getMonth(now), getDate(now), 8, 0, 0);
    this.workdayEnd = addMinutes(this.workDayStart, this.workdayLength);
  }

  updateZoom(zoom: number) {
    this.patchState((state) => ({
      zoom: zoom,
      hourBlocks: state.hourBlocks.map((hourBlock) => ({
        ...hourBlock,
        height: this.calculateZoom(hourBlock.height, zoom),
      })),
      nowLinePx: this.calculateTopValue(new Date(), zoom),
    }));
  }

  /**
   * Calculates the zoom value based on the current zoom level.
   * @param value The value to calculate the zoom for.
   * @param zoom The current zoom level.
   * @returns The zoomed value.
   */
  calculateZoom(value: number, zoom: number): number {
    return zoom === 1 ? value / 2 : value * 2;
  }

  /**
   * Calculates the top value in pixels based on the current time.
   * @param date The date to calculate the top value for.
   * @returns The top value in pixels.
   */
  calculateTopValue(date: Date, zoom: number): number {
    return (differenceInMinutes(date, this.workDayStart) - this.circleRadius) * zoom;
  }

  /**
   * Runs every 60 seconds
   * @returns {Observable<number>} An observable that emits the current minute of the day every minute.
   */
  tick(): Observable<number> {
    return timer(0, 60000).pipe(
      switchMap(() => {
        return of(
          this.calculateTopValue(
            new Date(),
            this.get((state) => state.zoom),
          ),
        );
      }),
    );
  }

  /**
   * Updates the schedule state. This is the main function that is called to update the schedule every 60 seconds
   */
  readonly updateSchedule = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.tick().pipe(
          tapResponse(
            (response) => {
              this.patchState({ nowLinePx: response });
            },
            (err) => console.log(err),
          ),
        ),
      ),
    ),
  );
}
