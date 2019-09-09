import React, { PureComponent } from "react";
import { connect } from "react-redux";
import mapboxgl from "mapbox-gl";
import OrderPage from "components/OrderPage";

import styles from "./MapBox.module.css";
import { getCoords, getIsOrderMade } from "modules/Coords";

class MapBox extends PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidnZla3NsZXIiLCJhIjoiY2swNDIyY3k5MjBodzNjcHJwYXdiYnA1OSJ9.f_ikZnTIAUm1k_WEuudyCg";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [34.78, 32.07],
      zoom: 15
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { isOrderMade, orderCoords } = this.props;

      if (!isOrderMade && this.map.getLayer("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
      }

      if (isOrderMade && orderCoords && orderCoords.length > 0) {
        if (prevProps.orderCoords !== orderCoords) this.renderRoute();
      }
    }
  }

  renderRoute = () => {
    const { orderCoords } = this.props;

    this.map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            color: "#F7455D"
          },
          geometry: {
            type: "LineString",
            coordinates: orderCoords
          }
        }
      },
      paint: {
        "line-width": 8,
        "line-color": ["get", "color"]
      }
    });

    this.map.flyTo({
      center: orderCoords[0]
    });
  };

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className={styles.container} ref={this.mapContainer}>
        <OrderPage />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderCoords: getCoords(state),
  isOrderMade: getIsOrderMade(state)
});

export default connect(
  mapStateToProps,
  null
)(MapBox);
