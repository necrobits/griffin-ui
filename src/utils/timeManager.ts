import { DateTime } from 'luxon';
import { DateTimeUnit } from 'luxon/src/datetime';
import { TIMEZONE } from '~/constants';

const currentTimezone = TIMEZONE;

export enum TimeType {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    QUARTER = 'quarter',
    YEAR = 'year'
}

type TimeProps = {
    unit: TimeType;
    value: number;
};

export class TimeManager {
    public static startOf(time: Date, unit: DateTimeUnit = 'day', opts?: TimeProps): Date {
        const formattedDate = this.extractLocalDateStr(time);
        const dateTime = DateTime.fromISO(`${formattedDate}T00:00:00`, { zone: currentTimezone }).startOf(unit);
        return this._handleOperation(dateTime, opts).toJSDate();
    }

    public static endOf(time: Date, unit: DateTimeUnit = 'day', opts?: TimeProps): Date {
        const formattedDate = this.extractLocalDateStr(time);
        const dateTime = DateTime.fromISO(`${formattedDate}T00:00:00`, { zone: currentTimezone }).endOf(unit);
        return this._handleOperation(dateTime, opts).toJSDate();
    }

    public static startOfDate(time: Date, opts?: TimeProps): Date {
        const formattedDate = this.extractLocalDateStr(time);
        const dateTime = DateTime.fromISO(`${formattedDate}T00:00:00`, { zone: currentTimezone });
        return this._handleOperation(dateTime, opts).toJSDate();
    }

    public static endOfDate(time: Date, opts?: TimeProps): Date {
        const formattedDate = this.extractLocalDateStr(time);
        const dateTime = DateTime.fromISO(`${formattedDate}T23:59:59`, { zone: currentTimezone });
        return this._handleOperation(dateTime, opts).toJSDate();
    }

    public static todayDateStr(): string {
        return DateTime.now().setZone(currentTimezone).toFormat('yyyy-MM-dd');
    }

    public static extractLocalDateStr(time: Date): string {
        return DateTime.fromJSDate(time).setZone(currentTimezone).toFormat('yyyy-MM-dd');
    }

    public static extractLocalDateStrFromStr(time: string): string {
        return DateTime.fromISO(time).setZone(currentTimezone).toFormat('yyyy-MM-dd');
    }

    public static startOfDateFromStr(date: string): Date {
        return DateTime.fromISO(`${date}T00:00:00`, { zone: currentTimezone }).toJSDate();
    }

    public static endOfDateFromStr(date: string): Date {
        return DateTime.fromISO(`${date}T23:59:59`, { zone: currentTimezone }).toJSDate();
    }

    public static formatFromDate(time: Date, format: string): string {
        return DateTime.fromJSDate(time).setZone(currentTimezone).toFormat(format);
    }

    public static formatFromISO(time: string, format: string): string {
        return DateTime.fromISO(time).setZone(currentTimezone).toFormat(format);
    }

    public static fromISOToDate(time: string): Date {
        return DateTime.fromISO(time).setZone(currentTimezone).toJSDate();
    }

    private static _handleOperation(dateTime: DateTime, opts?: TimeProps) {
        if (opts) {
            if (opts.value > 0) {
                return dateTime.plus({ [opts.unit]: opts.value });
            } else {
                return dateTime.minus({ [opts.unit]: opts.value });
            }
        }
        return dateTime;
    }
}
