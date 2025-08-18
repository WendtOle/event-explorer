"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EventExplorer from './EventExplorer'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister'


const queryClient = new QueryClient()

const persister = typeof window !== 'undefined' 
  ? createAsyncStoragePersister({
      storage: window.localStorage,
    })
  : undefined

export default function Wrapper() {
   if (!persister) {
     return (
       <QueryClientProvider client={queryClient}>
         <EventExplorer />
       </QueryClientProvider>
     )
   }

   return (
     <PersistQueryClientProvider client={queryClient}
           persistOptions={{ persister }}
>
       <EventExplorer />
     </PersistQueryClientProvider>
   )
}