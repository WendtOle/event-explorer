import { useState } from "react";
import { getDateRange } from "./timeUtils";

export const useDateNavigation = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = (): boolean => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  };

  const padNumber = (num: number): string => num.toString().padStart(2, '0');
  
  const getFormattedDay = (date: Date): string => padNumber(date.getDate());
  
  const getFormattedMonth = (date: Date): string => padNumber(date.getMonth() + 1);

  const formatShortDate = (date: Date): string => {
    const weekday = date.toLocaleDateString('de-DE', { weekday: 'long' });
    const day = getFormattedDay(date);
    const month = getFormattedMonth(date);
    return `${weekday}, ${day}.${month}`;
  };

  const formatNavigationDate = (date: Date): string => {
    const day = getFormattedDay(date);
    const month = getFormattedMonth(date);
    return `${day}.${month}`;
  };

  const getPreviousDay = (): Date => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    return previousDay;
  };

  const getNextDay = (): Date => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  const dateRange = getDateRange(selectedDate);
  const formattedSelectedDate = formatShortDate(selectedDate);
  const previousDayLabel = isToday() ? "Gestern" : formatNavigationDate(getPreviousDay());
  const nextDayLabel = isToday() ? "Morgen" : formatNavigationDate(getNextDay());

  return {
    goToPreviousDay,
    goToNextDay,
    goToToday,
    isToday,
    dateRange,
    formattedSelectedDate,
    previousDayLabel,
    nextDayLabel
  };
};