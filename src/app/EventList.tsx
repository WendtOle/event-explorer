"use client"
import { Event as EventComponent } from "./Event";
import { Event as EventType } from "./useEvents";

interface EventListProps {
  events: EventType[];
  selectedEvent: EventType | undefined;
  onEventToggle: (event: EventType) => () => void;
}

export const EventList = ({ events, selectedEvent, onEventToggle }: EventListProps): JSX.Element => (
  <>
    {events.length} Events
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
            selected={e.id === selectedEvent?.id} 
          />
        ))}
      </div>
    )}
  </>
);