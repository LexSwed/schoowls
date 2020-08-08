import { gql } from '@apollo/client'

const timetableFragment = gql`
  fragment TimetableFragment on Timetable {
    id
    periods {
      id
      duration
      startTime
    }
  }
`

export const readTimetables = gql`
  query timetables {
    timetables {
      ...TimetableFragment
    }
  }
  ${timetableFragment}
`

export const createTimetableMutation = gql`
  mutation createTimetable($periods: [PeriodInput!]!) {
    createTimetable(periods: $periods) {
      ...TimetableFragment
    }
  }
  ${timetableFragment}
`
