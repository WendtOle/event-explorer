"use client"
import { useState } from "react";
import MapComponent from "./Map";
import { EventList } from "./EventList";
import { useEvents } from "./useDemosEvents";
import {Event as EventType} from "./useEvents";
import NavigationButton from "./NavigationButton";
import { useDateNavigation } from "./useDateNavigation";


export default function EventExplorer() {
	const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
	const { goToPreviousDay, goToNextDay, dateRange, selectedDate } = useDateNavigation();

	const {events, isLoading} = useEvents(dateRange)

	const toggleEvent = (event: EventType) => () => setSelectedEvent(state => {
		if (state === undefined) {
			return event
		}
		if (state.id !== event.id) {
			return event
		}
		return undefined
	})

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('de-DE', { 
			weekday: 'long', 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' 
		});
	}

	return (
		<div className="p-4 max-w-3xl mx-auto flex flex-col h-dvh gap-2">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-lg md:text-xl font-bold">Event Explorer</h1>
				<h2 className="text-sm md:text-lg font-semibold">
					{formatDate(selectedDate)}
				</h2>
			</div>
			<MapComponent
				event={selectedEvent}
				events={events}
				onEventClick={(event) => setSelectedEvent(event)}
			/>
			<div className="flex justify-between items-center py-2">
				<NavigationButton 
					label="Vorheriger Tag"
					onClick={goToPreviousDay}
					direction="left"
				/>
				<NavigationButton 
					label="Nächster Tag"
					onClick={goToNextDay}
					direction="right"
				/>
			</div>
			<EventList 
				events={events}
				selectedEvent={selectedEvent}
				onEventToggle={toggleEvent}
				isLoading={isLoading}
			/>
		</div>
	);
}
