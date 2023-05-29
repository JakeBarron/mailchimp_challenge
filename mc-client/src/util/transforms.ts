import { DAYS_OF_THE_WEEK } from '../constants'

export function formatDate(dateString: string): string {
    const created = new Date(dateString)
    const day = created.getDay()
    const hours = created.getHours()
    const time = hours % 12 || 12
    const meridian = hours >= 12 ? 'PM' : 'AM'
    return `${DAYS_OF_THE_WEEK[day]} at ${time}${meridian}`
}
