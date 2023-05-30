const SERVER_URL = process.env.REACT_APP_API_URL

export const DAYS_OF_THE_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
export const GET_COMMENTS_PATH = `${SERVER_URL}/getComments`
export const CREATE_COMMENT_PATH = `${SERVER_URL}/createComment`

export const POLLING_INTERVAL = 5000
