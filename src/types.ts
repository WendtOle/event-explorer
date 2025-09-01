import { LatLngBounds, LatLngTuple } from "leaflet";

export interface Event { id: string, time?: string; location: string; thema: string; date: string[]; way_points: WayPoint[], bounds?: LatLngBounds, topics: string[] }
export type WayPoint = { text: string, position: LatLngTuple }