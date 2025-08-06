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

  const dateRange = getDateRange(selectedDate);

  return {
    goToPreviousDay,
    goToNextDay,
    dateRange,
    selectedDate
  };
};