 
const getDayFromToday = (days: number) => {
    const day = new Date();
    day.setDate(day.getDate() + days); 
    day.setHours(0, 0, 0, 0); 
    return day.toISOString();
}

const getSpecificDay = (date: Date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return day.toISOString();
}

export const getDateRange = (date: Date) => ({
    start: getSpecificDay(date),
    end: getSpecificDay(new Date(date.getTime() + 24 * 60 * 60 * 1000))
})
    
export const today = () => ({
    start: getDayFromToday(0),
    end: getDayFromToday(1)
})

export const tomorrow = () => ({
    start: getDayFromToday(1),
    end: getDayFromToday(2)
})

export const thisWeek = () => ({
    start: getDayFromToday(0),
    end: getDayFromToday(7)
})

export const nextWeek = () => ({
    start: getDayFromToday(7),
    end: getDayFromToday(14)
})