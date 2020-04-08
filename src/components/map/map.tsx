import * as React from 'react';
import * as leaflet from 'leaflet';
import {Coordinates} from '../../type';

type coordinates = number[];

interface Props {
  location: { cityCoordinates: Coordinates };
  offersCoordinates: Array<coordinates>;
  activeCoordinates: coordinates | [];
  activeCardCoordinates: coordinates;
}

class Map extends React.PureComponent<Props, {}> {
  private mapRef: React.RefObject<HTMLDivElement>;
  map: null | leaflet.Map;
  markersGroup: number[];
  zoom: number;

  static defaultProps = {
    activeCoordinates: [],
  };

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const {
      location: {cityCoordinates},
    } = this.props;

    if (this.mapRef.current) {
      this.zoom = cityCoordinates.zoom;

      this.map = leaflet.map(this.mapRef.current, {
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

      this.addMarkers();
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
      this.addMarkers();
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  private addMarkers() {
    if (this.markersGroup) {
      this.map.removeLayer(this.markersGroup);
    }

    this.markersGroup = leaflet.layerGroup().addTo(this.map);

    this.props.offersCoordinates.forEach((coordinates) => {
      leaflet
        .marker(coordinates, {
          icon: Map.getIcon(
              (coordinates[0] === this.props.activeCoordinates[0] &&
              coordinates[1] === this.props.activeCoordinates[1]) ||
              (coordinates[0] === this.props.activeCardCoordinates[0] &&
                coordinates[1] === this.props.activeCardCoordinates[1])
          ),
        })
        .addTo(this.markersGroup);
    });
  }

  render() {
    return <div style={{height: `100%`}} ref={this.mapRef} />;
  }

  private static getIcon(isActive) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [27, 39],
    });
  }
}

export default Map;
