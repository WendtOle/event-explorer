import { EventInDb } from "@/client";
import { Event, simpleHash, WayPoint } from "./useEvents";

const getDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate();        
    const month = date.getMonth() + 1; 
    const year = date.getFullYear(); 

    return `${day}.${month}.${year}`;
}

const getTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();    
    const minutes = date.getMinutes(); 

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

const getTimeRange = (start: string, end: string) => {
    const startFormatted = getTime(start)
    const endFormatted = getTime(end)
    if (startFormatted === "0:0" && endFormatted === "23:59") {
        return 
    }
    return `${getTime(start)} bis ${getTime(end)}`;
}

const getWayPoints = (event: EventInDb): WayPoint[] => {
    const {geography, street} = event.locations[0]
    const [lon, lat] = geography.coordinates
    console.log({street, full: event.raw_location, parsed: event.locations[0]})
    return [{text: `${street}`, position: [lat, lon]}]
}

export const processEvent = (event: EventInDb): Event | undefined => {
    if (event.description === undefined || event.description === null) {
        return
    }
    console.log({event})
    const output = {
        thema: event.description,
        id: simpleHash(event.description),
        way_points: getWayPoints(event), 
        bounds: null as any,
        location: event.raw_location ?? "no_location",
        time: getTimeRange(event.start_time, event.end_time),
        date: [getDate(event.start_time)],
        topics: event.topics.map(({ name_de }) => name_de).filter(topic => topic !== "Crawled Event")
    }
    return output
}

