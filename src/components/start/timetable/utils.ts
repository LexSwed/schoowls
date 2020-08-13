import { lightFormat, startOfDay, addMinutes } from 'date-fns'

const BREAK_MINS = 10
const START_OF_THE_DAY = startOfDay(new Date())
const START_TIME = '08:30'
export const DURATION = 45
export const initialPeriods: Period[] = Array(5)
  .fill(null)
  .reduce<Period[]>((res, _n, i) => {
    if (i === 0) {
      res.push({
        startTime: START_TIME,
        duration: DURATION,
      })
    } else {
      res.push({
        startTime: nextStartTime(res[i - 1]),
        duration: DURATION,
      })
    }

    return res
  }, [])

export function formatTime(minutes: number): string {
  return lightFormat(addMinutes(START_OF_THE_DAY, minutes), 'HH:mm')
}

export function timeToMinutes(str: string): number {
  const [hour, minute] = str.split(':')

  if (minute) {
    return parseInt(hour, 10) * 60 + parseInt(minute, 10)
  }

  return parseInt(hour, 10)
}

export type Period = {
  startTime: string
  duration: number
}

export function shiftPeriods(newPeriod: Period, newPeriodIndex: number, periods: Period[]): Period[] {
  const newPeriodStartTimeDelta = timeToMinutes(newPeriod.startTime) - timeToMinutes(periods[newPeriodIndex].startTime)

  return [
    ...periods.slice(0, newPeriodIndex),
    newPeriod,
    ...periods.slice(newPeriodIndex + 1).map((p, i) => ({
      startTime: formatTime(timeToMinutes(p.startTime) + newPeriodStartTimeDelta),
      duration: p.duration,
    })),
  ]
}

export function nextStartTime(period: Period): string {
  return formatTime(timeToMinutes(period.startTime) + period.duration + BREAK_MINS)
}
