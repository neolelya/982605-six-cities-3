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
    } = this.props;

    if (this._mapRef.current) {
      this.zoom = cityCoordinates.zoom;

      this.map = leaflet.map(this._mapRef.current, {
        center: [cityCoordinates.latitude, cityCoordinates.longitude],
        zoom: this.zoom,
        zoomControl: false,
        marker: true,
      });
      this.map.setView(
          [cityCoordinates.latitude, cityCoordinates.longitude],
          this.zoom
      );

      leaflet
        .tileLayer(
            `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
            {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
            }
        )
        .addTo(this.map);

      this._getMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.offersCoordinates !== prevProps.offersCoordinates ||
      this.props.location.cityCoordinates !== prevProps.location.cityCoordinates
    ) {
      this.map.setView(
          [
            this.props.location.cityCoordinates.latitude,
            this.props.location.cityCoordinates.longitude,
          ],
          this.zoom
      );
      this._getMap();
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return <div style={{height: `100%`}} ref={this._mapRef} />;
  }

  _getIcon(isActive) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 30],
    });
  }

  _getMap() {
    if (this.markersGroup) {
      this.markersGroup.removeLayer(this._mapRef.current);
    }

    this.markersGroup = leaflet.layerGroup().addTo(this.map);

    this.props.offersCoordinates.forEach((coordinates) => {
      leaflet
        .marker(coordinates, {
          icon: this._getIcon(
              (coordinates[0] === this.props.activeCoordinates[0] &&
              coordinates[1] === this.props.activeCoordinates[1]) ||
              (coordinates[0] === this.props.activeCardCoordinates[0] &&
                coordinates[1] === this.props.activeCardCoordinates[1])
          ),
        })
        .addTo(this.markersGroup);
    });
  }
}

Map.defaultProps = {
  activeCoordinates: [],
};

Map.propTypes = {
  location: PropTypes.shape({
    cityCoordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  offersCoordinates: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
  activeCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
};

export default Map;
