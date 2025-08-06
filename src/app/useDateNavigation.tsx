"use client"
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

  const formatShortDate = (date: Date): string => {
    const weekday = date.toLocaleDateString('de-DE', { weekday: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${weekday}, ${day}.${month}`;
  };

  const dateRange = getDateRange(selectedDate);
  const formattedSelectedDate = formatShortDate(selectedDate);

  return {
    goToPreviousDay,
    goToNextDay,
    goToToday,
    isToday,
    dateRange,
    formattedSelectedDate
  };
};