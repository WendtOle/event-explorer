import { Event as EventComponent } from "./Event";
import { Event as EventType } from "../types";
import { EventSkeleton } from "./EventSkeleton";
import { JSX, useEffect, useRef } from "react";

interface EventListProps {
  events: EventType[];
  selectedEvent: EventType | undefined;
  onEventToggle: (event: EventType) => () => void;
  isLoading: boolean;
  selectedDate: string;
}

export const EventList = ({ events, selectedEvent, onEventToggle, isLoading, selectedDate }: EventListProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dateDisplay = <div className="text-right">{selectedDate}</div>;

  useEffect(() => {
    if (!selectedEvent || !containerRef.current) {
      return;
    }
    
    const selectedElement = containerRef.current.querySelector(`#event-${selectedEvent.id}`);
    if (!selectedElement) {
      return;
    }
    
    selectedElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }, [selectedEvent]);

  if (isLoading) {
      return (<>
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
            {dateDisplay}
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 2 }).map((_, index) => (
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
        <div ref={containerRef} className={`${events.length < 3 ? '' : 'flex-1'} grid gap-2 overflow-auto`}>
          {events.map((e) => (
            <EventComponent
              key={e.id}
              id={`event-${e.id}`}
              onClick={onEventToggle(e)}
              event={e}
              selected={e.id === selectedEvent?.id} />
          ))}
        </div>
      )}
    </>
  )
};