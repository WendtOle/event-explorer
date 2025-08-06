"use client"

import { Event as EventComponent } from "./Event";
import { Event as EventType } from "./useEvents";
import { EventSkeleton } from "./EventSkeleton";
import { JSX } from "react";

interface EventListProps {
  events: EventType[];
  selectedEvent: EventType | undefined;
  onEventToggle: (event: EventType) => () => void;
  isLoading: boolean;
  selectedDate: string;
}

export const EventList = ({ events, selectedEvent, onEventToggle, isLoading, selectedDate }: EventListProps): JSX.Element => {
  const dateDisplay = <div className="text-right">{selectedDate}</div>;

  if (isLoading) {
      return (<>
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            {dateDisplay}
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <EventSkeleton key={index} />
            ))}
          </div>
        </>)
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <span>{events.length} Events</span>
        {dateDisplay}
      </div>
      {events.length === 0 ? (
        <p className="text-gray-500">Keine Events gefunden.</p>
      ) : (
        <div className={`${events.length < 3 ? '' : 'flex-1'} grid gap-2 overflow-auto`}>
          {events.map((e) => (
            <EventComponent
              key={e.id}
              id={e.id + ""}
              onClick={onEventToggle(e)}
              event={e}
              selected={e.id === selectedEvent?.id} />
          ))}
        </div>
      )}
    </>
  )
};