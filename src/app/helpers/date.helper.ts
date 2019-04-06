/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

export class DateHelper {

    defaultFormat: 'd.m.Y H:i';

    getDate(strDate: string): Date {
      const timestamp = Date.parse(strDate);
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      } else {
        console.error('Incorrect format of the data (please use system format from the API)', strDate);
      }
    }

    toEuropeFormat(strDate: string): string {
        let res = '';
        if (strDate) {
            const d = this.getDate(strDate);
            const parsed = this.parseDateAsFormattedString(d);
            res = `${parsed.day}.${parsed.month}.${parsed.year}`;
        }
        return res;
    }

    toEuropeFormatWithTime(strDate: string): string {
        let res = '';
        if (strDate) {
            res = this.toEuropeFormat(strDate);
            const d = this.getDate(strDate);
            const t = this.getTime(d);
            res = `${res} ${t}`;
        }
        return res;
    }

    getUnixDate(d: Date): string {
        let res = '';
        if (d) {
            const parsed = this.parseDate(d);
            res = `${parsed.year}-${parsed.month}-${parsed.day}`;
        }
        return res;
    }

    getTime(d: Date): string {
        let res = '';
        if (d) {
            let hour = d.getHours().toString();
            let minute = d.getMinutes().toString();
            let sec = d.getSeconds().toString();
            hour = hour.length <= 1 ? `0${hour}` : `${hour}`;
            minute = minute.length <= 1 ? `0${minute}` : `${minute}`;
            sec = sec.length <= 1 ? `0${sec}` : `${sec}`;
            res = `${hour}:${minute}:${sec}`;
        }
        return res;
    }

    getUnixDateWithTime(d: Date): string {
        let res = '';
        if (d) {
            res = this.getUnixDate(d);
            const time = this.getTime(d);
            res = `${res} ${time}`;
        }

      if (res.indexOf('NaN') !== -1) {
        res = '';
        console.error('Incorrect Date format, needs to be checked', d);
      }

        return res;
    }

    parseDateFromFormat(val: string, format: string = null): Date {
        if (!format || !format.length) {
            format = this.defaultFormat;
        }

        let dateString;
        let date = new Date();
        switch (format) {
            case this.defaultFormat:
                dateString = val.match(/^(\d{2})\.(\d{2})\.(\d{4})\s(\d{2}):(\d{2})/);
                date = dateString
                    ? new Date(+dateString[3], +dateString[2] - 1, +dateString[1], +dateString[4], +dateString[5])
                    : null;
                break;
            case 'd.m.Y':
                dateString = val.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
                date = dateString
                    ? new Date(+dateString[3], +dateString[2] - 1, +dateString[1])
                    : null;
                break;
        }

        return date;
    }

    private parseDate(d: Date): {day: number, month: number, year: number} {
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return { day, month, year };
    }

    private parseDateAsFormattedString(d: Date): {day: string, month: string, year: string} {
        const parsed = this.parseDate(d);
        return {
            day: parsed.day < 10 ? `0${parsed.day}` : `${parsed.day}`,
            month: parsed.month < 10 ? `0${parsed.month}` : `${parsed.month}`,
            year: `${parsed.year}`,
        };
    }

}
