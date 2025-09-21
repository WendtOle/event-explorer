import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { type LatLngBounds, type LatLngTuple } from 'leaflet';
import 'leaflet.markercluster';
import { type Event, type WayPoint } from '../types';

interface MapComponentProps {
  event?: Event;
  events: Event[];
  onMapChange?: (bounds: LatLngBounds) => void;
  disableFlyTo?: boolean;
  onEventClick: (event: Event) => void;
}

const colors = ['blue', 'red', 'orange', 'yellow', 'green', 'purple'];
const MapComponent = ({
  event,
  events,
  onMapChange,
  disableFlyTo,
  onEventClick,
}: MapComponentProps) => {
  const [map, setMap] = useState<L.Map | undefined>();
  const [selectedMarkerLayer, setSelectedMarkerLayer] = useState<
    L.LayerGroup | undefined
  >();
  const [eventLayer, setEventLayer] = useState<L.LayerGroup | undefined>();

  const berlinCenter: LatLngTuple = [52.52, 13.405];

  useEffect(() => {
    eventLayer?.clearLayers();
    if (!eventLayer) {
      return;
    }

    const addMarker = (currEvent: Event) => {
      if (!!event && event.id === currEvent.id) {
        return;
      }
      const point = currEvent.way_points[0];
      if (!point) {
        return;
      }

      L.marker(point.position, {
        icon: L.divIcon({
          className: 'my-div-icon',
          html: '<span class="material-icons" style="color: #cc6600;">emoji_people</span>',
          iconSize: [32, 32],
          iconAnchor: [16, 22],
        }),
      })
        .bindTooltip(currEvent.thema.slice(0, 40) + ' ...')
        .addTo(eventLayer)
        .on('click', () => onEventClick(currEvent));
    };
    events.forEach(addMarker);
  }, [setEventLayer, events, event, map]);

  useEffect(() => {
    selectedMarkerLayer?.clearLayers();
    if (!event || !selectedMarkerLayer) {
      return;
    }
    const { way_points, bounds } = event;

    const addMarker = (
      point: WayPoint,
      markerIcon: 'flag' | 'sports_score'
    ) => {
      L.marker(point.position, {
        icon: L.divIcon({
          className: 'my-div-icon selected-event-marker',
          html: `<span class="material-icons" style="color: #b266ff;">${markerIcon}</span>`,
          iconSize: [32, 32],
          iconAnchor: [16, 22],
        }),
      })
        .bindTooltip(point.text)
        .addTo(selectedMarkerLayer);
    };

    if (way_points.length === 1) {
      addMarker(way_points[0], 'flag');
    } else {
      L.polyline(
        way_points.map(({ position }) => position),
        {
          color: colors[0],
        }
      ).addTo(selectedMarkerLayer);
      way_points.forEach((point, i, all) => {
        const isSameAsPrevious = i !== 0 && point.text === all[i - 1].text;
        if (isSameAsPrevious) {
          return;
        }
        const isSameAsFirst = i > 0 && point.text === all[0].text;
        if (isSameAsFirst) {
          return;
        }
        addMarker(point, i === 0 ? 'sports_score' : 'flag');
      });
    }
    if (disableFlyTo) {
      return;
    }
    if (way_points.length === 1) {
      map?.flyTo(way_points[0].position, 13);
    }
    if (way_points.length > 1 && bounds !== undefined) {
      map?.flyToBounds(bounds);
    }
  }, [event, map, selectedMarkerLayer]);

  useEffect(() => {
    const map = L.map('map').setView(berlinCenter, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });
    setEventLayer(clusterGroup.addTo(map));
    setSelectedMarkerLayer(L.layerGroup().addTo(map));
    setMap(map);
    onMapChange?.(map.getBounds());
    const onMoveEnd = () => onMapChange?.(map.getBounds());
    map.on('moveend', onMoveEnd);
    return () => {
      map.off('moveend', onMoveEnd);
      map.remove();
    };
  }, []);
  return (
    <div className="w-full h-44 sm:h-1/3">
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
