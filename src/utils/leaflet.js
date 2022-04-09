import L from "leaflet";
import * as DomEvent from "leaflet/src/dom/DomEvent";
import { Path } from "leaflet/src/layer/vector/Path";

const AppIcon = L.Icon.extend({
  options: {
    iconSrc: "MarkGroupMate.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [1, -8],
    tooltipAnchor: [16, -28],
  },
  createShadow: function () {},
  _getIconUrl: function (name) {
    const image = this.options[name + "Src"];
    return `/resources/markers/${image}`;
  },
});

export const appIcon = (options) => new AppIcon(options);

const AppMarker = L.Marker.extend({
  options: {
    selectHandler: () => {},
  },
  _openPopup: function (e) {
    var layer = e.layer || e.target;

    if (!this._popup) {
      return;
    }

    if (!this._map) {
      return;
    }

    if (this.options.selectHandler) {
      this.options.selectHandler();
    }

    // prevent map click
    DomEvent.stop(e);

    // if this inherits from Path its a vector and we can just
    // open the popup at the new location
    if (layer instanceof Path) {
      this.openPopup(e.layer || e.target, e.latlng);
      return;
    }

    // otherwise treat it like a marker and figure out
    // if we should toggle it open/closed
    if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
      this.closePopup();
    } else {
      this.openPopup(layer, e.latlng);
    }
  },
});

export const appMarker = (latLng, options) => new AppMarker(latLng, options);
