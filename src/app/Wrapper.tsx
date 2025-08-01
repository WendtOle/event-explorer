"use client"
import { QueryClient } from '@tanstack/react-query'
import EventExplorer from './EventExplorer'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister'


const queryClient = new QueryClient()

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
})

export default function Wrapper() {
   return (
     <PersistQueryClientProvider client={queryClient}
           persistOptions={{ persister }}
>
       <EventExplorer />
     </PersistQueryClientProvider>
   )
}