import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import type { School } from '../types/school';

interface SchoolMapProps {
  schools: School[];
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading map...</div>;
    case Status.FAILURE:
      return <div>Error loading map</div>;
    case Status.SUCCESS:
      return <div>Map loaded successfully</div>;
  }
};

const MapComponent: React.FC<{ schools: School[] }> = ({ schools }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  React.useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center: { lat: 22.3193, lng: 114.1694 }, // Hong Kong center
        zoom: 11,
      });
      setMap(newMap);
    }
  }, [map]);

  React.useEffect(() => {
    if (map && schools.length > 0) {
      // Clear existing markers
      schools.forEach(school => {
        if (school.LATITUDE && school.LONGITUDE) {
          const marker = new google.maps.Marker({
            position: { lat: school.LATITUDE, lng: school.LONGITUDE },
            map: map,
            title: school['ENGLISH NAME'],
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <h3>${school['ENGLISH NAME']}</h3>
                <p><strong>Level:</strong> ${school['SCHOOL LEVEL']}</p>
                <p><strong>Finance Type:</strong> ${school['FINANCE TYPE']}</p>
                <p><strong>District:</strong> ${school.DISTRICT}</p>
                <p><strong>Session:</strong> ${school.SESSION}</p>
                <p><strong>Students Gender:</strong> ${school['STUDENTS GENDER']}</p>
                <p><strong>Address:</strong> ${school['ENGLISH ADDRESS']}</p>
                <p><strong>Phone:</strong> ${school.TELEPHONE}</p>
                ${school.WEBSITE ? `<p><a href="${school.WEBSITE}" target="_blank">Visit Website</a></p>` : ''}
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        }
      });
    }
  }, [map, schools]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

const SchoolMap: React.FC<SchoolMapProps> = ({ schools }) => {
  const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="map-error">
        <p>Google Maps API key is required. Please set REACT_APP_GOOGLE_MAPS_API_KEY in your environment variables.</p>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent schools={schools} />
    </Wrapper>
  );
};

export default SchoolMap;