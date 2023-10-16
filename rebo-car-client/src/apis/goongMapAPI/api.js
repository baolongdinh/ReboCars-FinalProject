import goongjs from "@goongmaps/goong-js";
import goongAPIKey from "../../configs/apikey.config";

goongjs.accessToken = goongAPIKey.goongMapViewAPI;

const gongAPI = {
  loadMap: (lat, lng, container, zoom) => {
    var map = new goongjs.Map({
      container: container,
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [lat, lng],
      zoom: zoom,
    });

    new goongjs.Marker().setLngLat([lat, lng]).addTo(map);

    return map;
  },

  getPlaceDetailById: async (placeId) => {
    const data = await fetch(
      `https://rsapi.goong.io/Place/Detail?place_id=${placeId}&api_key=${goongAPIKey.goongMapAPI}`
    );
    return data.json();
  },
};

export default gongAPI;
