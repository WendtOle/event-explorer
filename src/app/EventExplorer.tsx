"use client"
import { useState } from "react";
import MapComponent from "./Map";
import { Event as EventComponent } from "./Event";
import { useEvents } from "./useDemosEvents";
import { getDateRange } from "./timeUtils";
import {Event as EventType} from "./useEvents";


export default function EventExplorer() {
	const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	const {events} = useEvents(getDateRange(selectedDate))

	const toggleEvent = (event: EventType) => () => setSelectedEvent(state => {
		if (state === undefined) {
			return event
		}
		if (state.id !== event.id) {
			return event
		}
		return undefined
	})

	const goToPreviousDay = () => {
		const previousDay = new Date(selectedDate);
		previousDay.setDate(previousDay.getDate() - 1);
		setSelectedDate(previousDay);
	}

	const goToNextDay = () => {
		const nextDay = new Date(selectedDate);
		nextDay.setDate(nextDay.getDate() + 1);
		setSelectedDate(nextDay);
	}

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
				<h1 className="text-xl font-bold">Event Explorer</h1>
			</div>
			<h2 className="text-lg font-semibold text-center">
				{formatDate(selectedDate)}
			</h2>
			<MapComponent
				event={selectedEvent}
				events={events}
				onEventClick={(event) => setSelectedEvent(event)}
			/>
			<div className="flex justify-between items-center py-2">
				<button 
					onClick={goToPreviousDay}
					className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors flex items-center gap-1 shadow-sm"
				>
					<span>←</span> <span>Vorheriger Tag</span>
				</button>
				<button 
					onClick={goToNextDay}
					className="px-4 py-2 text-sm bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors flex items-center gap-1 shadow-sm"
				>
					<span>Nächster Tag</span> <span>→</span>
				</button>
			</div>
			{events.length} Events
			{events.length === 0 ? (
				<p className="text-gray-500">Keine Events gefunden.</p>
			) : (
				<div className={`${events.length < 3 ? '' : 'flex-1'} grid gap-2 overflow-auto`} >
					{events.map((e) => (
						<EventComponent key={e.id} id={e.id + ""} onClick={toggleEvent(e)} event={e} selected={e.id === selectedEvent?.id} />
					))}
				</div>
			)}
		</div>
	);
}
