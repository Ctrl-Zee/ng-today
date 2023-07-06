import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HourBlock } from 'src/app/models/hour-block';
import { HourLabel } from 'src/app/models/hour-label';
import { HourLine } from 'src/app/models/hour-line';

interface ScheduleState {
  zoom: number;
  hourLine: HourLine;
  hourLabel: HourLabel;
  hourBlocks: HourBlock[];
}

@Injectable()
export class ScheduleStore extends ComponentStore<ScheduleState> {
  calendarConfig$ = this.select((state) => state);

  constructor() {
    super({
      zoom: 1,
      hourLine: { x1: '50', x2: '100%', y1: '5', y2: '5' },
      hourLabel: { x: '0', y: '10' },
      hourBlocks: [
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
      ],
    });
  }

  updateZoom(zoom: number) {
    this.patchState((state) => ({
      zoom: zoom,
      hourBlocks: state.hourBlocks.map((hourBlock) => ({
        ...hourBlock,
        y: this.calculateZoom(hourBlock.y, zoom),
      })),
    }));
  }

  /**
   * Calculates the zoomed value based on the input value and zoom factor.
   * If the zoom factor is 1, the input value is halved. Otherwise, the input value is doubled.
   *
   * @param {string} value - The input value to be zoomed. Expected to be a string representation of a number.
   * @param {number} zoom - The zoom factor. If it is 1, the input value is halved, otherwise, it is doubled.
   *
   * @returns {string} The zoomed value represented as a string.
   */
  calculateZoom(value: string, zoom: number): string {
    return zoom === 1 ? `${parseInt(value) / 2}` : `${parseInt(value) * 2}`;
  }
}
