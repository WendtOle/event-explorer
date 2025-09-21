import { Fragment, ReactElement } from 'react';
import { Event as EventType } from '../types';
import { isAfter, parse, format } from 'date-fns';
import { isEqual } from 'date-fns/fp';
import { TopicTags } from './TopicTags';
import escapeStringRegexp from 'escape-string-regexp';

interface EventProps {
  id: string;
  event: EventType;
  selected: boolean;
  onClick: () => void;
}

export const Event = ({ id, selected, event, onClick }: EventProps) => {
  const dateString = (date: string[]) => {
    if (date.length === 1) {
      return date[0];
    }
    if (selected) {
      return date.join(', ');
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const firstComing = date
      .map(date => parse(date, 'dd.MM.yyyy', new Date()))
      .filter(date => {
        return isAfter(date, now) || isEqual(date, now);
      })
      .sort((left: Date, right: Date) => left.getTime() - right.getTime());
    const dateToDisplay = firstComing[0]
      ? format(firstComing[0], 'dd.MM.yyyy')
      : date[0];
    return `${dateToDisplay} und ${date.length - 1} weitere`;
  };
  const shorten = (value: string, limit: number) => {
    if (value.length > limit && !selected) {
      return value.slice(0, limit) + ' ...';
    }
    return value;
  };
  const shortLocationString =
    event.way_points.length > 1
      ? `${event.way_points.length} Wegpunkte`
      : event.way_points[0].text;

  const regex = new RegExp(
    `(${event.way_points.map(({ text }) => escapeStringRegexp(text)).join('|')})`,
    'gi'
  );
  const neuMatch = event.location.match(/neu:/i);
  const splitIndex = !neuMatch ? 0 : neuMatch.index! + neuMatch[0].length;
  const keepPart = event.location.slice(0, splitIndex);
  const markPart = event.location.slice(splitIndex);
  const parts = markPart.split(regex).filter(item => item !== undefined);

  const withHighlighting = parts.reduce(
    (acc, part, i) => {
      const index = acc.toMark.indexOf(part.toLowerCase());
      if (index === -1) {
        return {
          list: [...acc.list, <Fragment key={i}>{part}</Fragment>],
          toMark: acc.toMark,
        };
      }

      const newEntry = (
        <span key={i} className="font-semibold bg-yellow-50">
          {part} (#{index + 1})
        </span>
      );
      const alteredToMark = [...acc.toMark];
      alteredToMark[index] = '_';
      return { list: [...acc.list, newEntry], toMark: alteredToMark };
    },
    {
      list: [],
      toMark: event.way_points.map(({ text }) => text.toLowerCase()),
    } as { list: ReactElement[]; toMark: string[] }
  );

  const expandedLocation =
    event.way_points.length === 1 ? (
      <p>{event.location}</p>
    ) : (
      <>
        <p>{event.way_points.length} Wegpunkte erkannt: </p>
        <p>
          {keepPart}
          {withHighlighting.list}
        </p>
      </>
    );

  return (
    <button
      id={id}
      onClick={onClick}
      className={`w-full border grid gap-2 text-left rounded p-2 hover:shadow transition cursor-pointer ${selected ? 'bg-blue-50' : ''}`}
    >
      <div className="font-semibold">
        {shorten(event.thema, 80) || 'Kein Thema'}
      </div>
      <div className="text-sm text-gray-600">
        {dateString(event.date)} {selected ? '' : event.time}
      </div>
      {selected && <div className="text-sm text-gray-600">{event.time}</div>}
      {!selected && <div className="text-sm">{shortLocationString}</div>}
      {selected && expandedLocation}
      <TopicTags topics={event.topics} limit={selected ? undefined : 3} />
    </button>
  );
};
