import { gql } from '@apollo/client'

const timetableFragment = gql`
  fragment Timetable_periods on Timetable {
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
      edges {
        node {
          ...Timetable_periods
        }
      }
    }
  }
  ${timetableFragment}
`

export const createTimetableMutation = gql`
  mutation createTimetable($periods: [PeriodInput!]!) {
    createTimetable(periods: $periods) {
      ...Timetable_periods
    }
  }
  ${timetableFragment}
`
