"use client"
import { useState, useEffect } from "react";
import MapComponent from "./Map";
import { EventList } from "./EventList";
import { useEvents } from "./useDemosEvents";
import {Event as EventType} from "./useEvents";
import NavigationButton from "./NavigationButton";
import { useDateNavigation } from "./useDateNavigation";


export default function EventExplorer() {
	const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
	const { goToPreviousDay, goToNextDay, goToToday, isToday, dateRange, formattedSelectedDate, previousDayLabel, nextDayLabel } = useDateNavigation();

	const {events, isLoading} = useEvents(dateRange)

	useEffect(() => {
		if (!selectedEvent || !events.length) {
			return;
		}
		
		const eventExists = events.some(event => event.id === selectedEvent.id);
		if (!eventExists) {
			setSelectedEvent(undefined);
		}
	}, [selectedEvent, events]);

	const toggleEvent = (event: EventType) => () => setSelectedEvent(state => {
		if (state === undefined) {
			return event
		}
		if (state.id !== event.id) {
			return event
		}
		return undefined
	})

	return (
		<div className="p-4 max-w-3xl mx-auto flex flex-col h-dvh gap-2">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-lg md:text-xl font-bold">Event Explorer</h1>
			</div>
			<MapComponent
				event={selectedEvent}
				events={events}
				onEventClick={(event) => setSelectedEvent(event)}
			/>
			<div className="flex justify-between items-center py-2">
				<NavigationButton 
					label={previousDayLabel}
					onClick={goToPreviousDay}
					direction="left"
				/>
				<NavigationButton 
					label="Heute"
					onClick={goToToday}
					selected={isToday()}
				/>
				<NavigationButton 
					label={nextDayLabel}
					onClick={goToNextDay}
					direction="right"
				/>
			</div>
			<EventList 
				events={events}
				selectedEvent={selectedEvent}
				onEventToggle={toggleEvent}
				selectedDate={formattedSelectedDate}
				isLoading={isLoading}
			/>
		</div>
	);
}
