import React, {PureComponent, createRef} from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  componentDidMount() {
    const {
      location: {cityCoordinates},
      offers,
    } = this.props;

    if (this._mapRef.current) {
      const icon = leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      });

      const zoom = 12;

      this.map = leaflet.map(this._mapRef.current, {
        center: cityCoordinates,
        zoom,
        zoomControl: false,
        marker: true,
      });
      this.map.setView(cityCoordinates, zoom);

      leaflet
        .tileLayer(
            `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
            {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
            }
        )
        .addTo(this.map);

      offers.forEach((offer) => {
        leaflet.marker(offer.coordinates, {icon}).addTo(this.map);
      });
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return <section className="cities__map map" ref={this._mapRef} />;
  }
}

Map.propTypes = {
  location: PropTypes.shape({
    cityCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      }).isRequired
  ).isRequired,
};

export default Map;
