"use client"
import { useState } from "react";
import MapComponent from "./Map";
import { Event as EventComponent } from "./Event";
import { FilterButton } from "./FilterButton";
import { EventInDb } from "@/client";
import { useEvents } from "./useDemosEvents";
import { thisWeek, today, tomorrow } from "./timeUtils";
import {Event as EventType} from "./useEvents";

enum Filter {
		TODAY= "today",
		TOMORROW = "tomorrow",
		THIS_WEEK = "thisWeek",
	}
		const filterEntries: Record<Filter, {label: string, getTimeRange: () => {start: string, end: string}}> = {[Filter.TODAY]:{
		label: "Heute",
		getTimeRange: today
	}, [Filter.TOMORROW]:{label: "Morgen", getTimeRange: tomorrow},
[Filter.THIS_WEEK]: {label: "Aktuelle Woche", getTimeRange: thisWeek}
}

export default function EventExplorer() {
	const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();

	const [selectedTimeFilter, setSelectedTimeFilter] = useState<Filter>(Filter.TODAY)
	const {events} = useEvents(filterEntries[selectedTimeFilter].getTimeRange())

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
				<h1 className="text-xl font-bold">Event Explorer</h1>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<div className="flex gap-2">
						{Object.entries(filterEntries).map(([key, value]) => {
							return <FilterButton key={key} onClick={() => setSelectedTimeFilter(key as Filter)} enabled={selectedTimeFilter === key}>
							{value.label}
						</FilterButton>
						})}
					</div>
				</div>
			</div>
			<MapComponent
				event={selectedEvent}
				events={events}
				onEventClick={(event) => setSelectedEvent(event)}
			/>
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
