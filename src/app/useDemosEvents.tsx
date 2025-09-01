import { searchByAddressInfiniteOptions } from '@/client/@tanstack/react-query.gen';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { groupEvents } from './groupEvents';
import { processEvent } from './processEvent';

interface UseEventsProps {
  start: string;
  end: string;
}

export const useEvents = ({ start, end }: UseEventsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      ...searchByAddressInfiniteOptions({
        body: {
          country: 'Deutschland',
          city: 'Berlin',
          zip_code: '',
          end_time_start: start,
          start_time_end: end,
        },
        query: {
          address_language: 'de',
        },
      }),
      staleTime: 1000 * 60 * 60,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage && lastPage.length === 50) {
          return pages.length * 50;
        }
        return undefined;
      },
      initialPageParam: 0,
    });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const events = useMemo(() => {
    const flattend =
      data !== undefined
        ? data.pages.reduce((acc, item) => [...acc, ...item], [])
        : [];
    const processed = flattend
      .map(processEvent)
      .filter(item => item !== undefined);
    return groupEvents(processed);
  }, [data]);

  return { events: events, isLoading };
};
