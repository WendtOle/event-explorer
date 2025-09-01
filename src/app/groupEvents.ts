import Fuse from 'fuse.js';
import { Event } from '../types';

const FUZZY_THRESHOLD = 0.2

const options = {
  keys: ['thema'],
  threshold: FUZZY_THRESHOLD, // 0.0 = exact match, 1.0 = match anything
  includeScore: true
}

export const groupEvents = (events: Event[]) => {
  return events.reduce((grouped, event) => {
    const fuse = new Fuse(grouped, options)
    const result = fuse.search(event.thema)
    if (result.length > 0 && result[0].score !== undefined && result[0].score < FUZZY_THRESHOLD) {
        const existingDates = grouped[result[0].refIndex].date
        if (existingDates.find(date => date === event.date[0])) {
            return grouped
        }
        grouped[result[0].refIndex].date = [...existingDates, ...event.date]
        return grouped
    }
    return [...grouped, event]
  }, [] as Event[]);
};