import {useState} from 'react';
import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import {useAppSelector} from '../../hooks';
import useMap from '../../hooks/useMap';
import {getCurrentCity} from '../../store/offer-process/selectors';
import {Offer, Offers} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers,
  selectedOffer: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [14, 39]
});

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer} = props;
  const currentCity = useAppSelector(getCurrentCity);
  const [mapCity, setMapCity] = useState(currentCity);
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);
  const city = offers[0].city;

  useEffect(() => {
    if (map) {
      if(mapCity !== currentCity) {
        map.eachLayer((layer) => {
          if (layer instanceof Marker) {
            map.removeLayer(layer);
            map.setView({
              lat: city.location.latitude,
              lng: city.location.longitude
            },
            city.location.zoom
            );
          }
        });
      }

      offers.forEach(({id, location}) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && id === selectedOffer.id ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(map);
      });

      setMapCity(currentCity);
    }
  }, [map, offers, selectedOffer, city, currentCity, mapCity]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
