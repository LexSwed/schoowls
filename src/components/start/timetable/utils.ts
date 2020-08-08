// import { lightFormat } from 'date-fns'

const breakMins = 10
const START_TIME = timeToMinutes('08:30')
export const DURATION = 45
// export const initialPeriods = Array<Period[]>(5)
//   .fill(null)
// //   .reduce((res, _n, i, arr) => {
// //     if (i === 0) {
// //       res.push({
// //         startTime: initialTime,
// //         endTime: toNextTime(initialTime, defaultDuration),
// //       })
// //     } else {
// //       const startTime = toNextTime(res[i - 1].endTime, breakMins)
// //       res.push({
// //         startTime,
// //         endTime: toNextTime(startTime, defaultDuration),
// //       })
// //     }

// //     return res
// //   }, []).map((p) => ({
// //     startTime: formatTime(p.startMins),
// //     duration: defaultDuration,
// //   }))

// export function formatTime(minutes): string {
//   return lightFormat(minutes, 'HH:mm')
// }

export function minutesToTime(minutes: number): string {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    return hours > 0 ? `${hours}:${mins}` : `${mins}`
  }

  return `${minutes}`
}

export function timeToMinutes(str: string): number {
  const [hour, minute] = str.split(':')

  if (minute) {
    return parseInt(hour, 10) * 60 + parseInt(minute, 10)
  }

  return parseInt(hour, 10)
}
export function toDuration(minutes: number): string {
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    return hours > 0 ? `${hours}:${mins}` : `${mins}`
  }

  return `${minutes}`
}

export function shiftPeriods(periods: Period[]) {
    return periods.map((p, i) => {
        if (i === 0) {
          return p
        }
    
        const startTime = 
    
        return { startTime }
      })
}

export type Period = {
  startTime: string
  duration: number
}
