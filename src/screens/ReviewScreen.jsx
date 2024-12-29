import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { EditControl } from "react-leaflet-draw";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet-draw/dist/leaflet.draw-src.js"; // add this
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditableMap = ({ coordinates, clearCoordinates, handleSetCord }) => {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());
  useEffect(() => {
    // Initialize drawnItemsRef and add it to the map
    map.addLayer(drawnItemsRef.current);

    return () => {
      map.removeLayer(drawnItemsRef.current);
    };
  }, [map]);

  useEffect(() => {
    // Clear existing layers if clearCoordinates is true
    if (clearCoordinates) {
      drawnItemsRef.current.clearLayers();
    }
  }, [clearCoordinates]);
  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // if (coordinates) {
    //   coordinates.forEach((coordinateSet) => {
    //     if (coordinateSet.type === "circle") {
    //       const { center, radius } = coordinateSet;
    //       const circle = L.circle(center, { radius, color: "blue" }).addTo(
    //         drawnItems
    //       );
    //       map.fitBounds(circle.getBounds());
    //     } else if (coordinateSet.type === "polygon") {
    //       const points = coordinateSet.points.map((point) => [
    //         point.lat,
    //         point.lng,
    //       ]);
    //       const polyline = L.polyline(points, { color: "red" }).addTo(
    //         drawnItems
    //       );
    //       map.fitBounds(polyline.getBounds());
    //     }
    //   });
    // }
    if (coordinates && !clearCoordinates) {
      coordinates.forEach((coordinateSet) => {
        if (coordinateSet.type === "circle") {
          const { center, radius } = coordinateSet;
          const circle = L.circle(center, { radius, color: "blue" }).addTo(
            drawnItemsRef.current
          );
          map.fitBounds(circle.getBounds());
        } else if (coordinateSet.type === "polygon") {
          const points = coordinateSet.points.map((point) => [
            point.lat,
            point.lng,
          ]);
          const polyline = L.polyline(points, { color: "red" }).addTo(
            drawnItemsRef.current
          );
          map.fitBounds(polyline.getBounds());
        }
      });
    }
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        circle: true,
        rectangle: false,
        circlemarker: true,
        polyline: true,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      const type = event.layerType;

      if (type === "polygon") {
        const coordinatesa = layer.getLatLngs();
        // console.log("Polygon coordinatesa:", coordinatesa[0]);
        handleSetCord([
          {
            type: "polygon",
            points: coordinatesa[0],
          },
        ]);
      } else if (type === "circle") {
        const center = layer.getLatLng();
        const radius = layer.getRadius();
        // console.log("Circle center:", [
        //   {
        //     type: "circle",
        //     center: {
        //       ...center,
        //     },
        //     radius,
        //   },
        // ]);
        handleSetCord([
          {
            type: "circle",
            center: {
              ...center,
            },
            radius,
          },
        ]);
      }
    });

    return () => {
      map.removeLayer(drawnItems);
      map.removeControl(drawControl);
    };
  }, [coordinates, clearCoordinates, map]);

  return null;
};

const Review = () => {
  const [loadedCoordinates, setLoadedCoordinates] = useState(null);
  const [coordinatesLoaded, setCoordinatesLoaded] = useState(false);
  const [clearCoordinates, setClearCoordinates] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState(null);
  const [circleData, setCircleData] = useState(null);
  let { id } = useParams();
  // console.log("id", id);
  useEffect(() => {
    // Fetch circle details when component mounts
    const fetchCircleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/circles/${id}`
        );
        setCircleData(response.data);
        setLoadedCoordinates(response.data.coordinate);
        if (response.data.coordinate.length >= 1) {
          setCoordinatesLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching circle data:", error);
      }
    };
    fetchCircleData();
  }, [id]);
  // const data = {
  //   name: "victor",
  //   cycle: "Nextbewe Area",
  //   role: "state",
  //   coordinate: [
  //     {
  //       type: "circle",
  //       center: {
  //         lat: 51.52105816243107,
  //         lng: -0.16064907895859015,
  //       },
  //       radius: 1249.114383003045,
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoadedCoordinates(data.coordinate);
  //     if (data.coordinate.length >= 1) {
  //       setCoordinatesLoaded(true);
  //     }
  //   }, 1000);
  // }, []);

  const handleSetCord = useCallback((coordinates) => {
    console.log(coordinates, "called");
    setMapCoordinates(coordinates);
  }, []);
  const handleCreate = async () => {
    if (window.confirm("Are you sure you want to create this circle?")) {
      try {
        await axios.put(`http://localhost:3000/api/v1/circles/${id}`, {
          coordinate: mapCoordinates,
        });
        toast.success("created sucessfully");
      } catch (error) {
        console.error("Error creating circle:", error);
      }
    }
  };

  const handleAccept = async () => {
    if (window.confirm("Are you sure you want to accept this circle?")) {
      try {
        await axios.put(`http://localhost:3000/api/v1/circles/${id}`, {
          approvalStatus: "accepted",
        });
        toast.success("accepted");
      } catch (error) {
        console.error("Error accepting circle:", error);
      }
    }
  };

  const handleEdit = async () => {
    if (window.confirm("Are you sure you want to edit this circle?")) {
      try {
        await axios.put(`http://localhost:3000/api/v1/circles/${id}`, {
          coordinate: mapCoordinates,
        });
        toast.success("updated sucessfully");
      } catch (error) {
        console.error("Error editing circle:", error);
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm("Are you sure you want to reject this circle?")) {
      try {
        await axios.put(`http://localhost:3000/api/v1/circles/${id}`, {
          approvalStatus: "rejected",
        });
        toast.success("rejected");
      } catch (error) {
        console.error("Error rejecting circle:", error);
      }
    }
  };

  const handleClear = () => {
    setClearCoordinates(true);
    setLoadedCoordinates(null);
    setCoordinatesLoaded(false);
    // Reset the clear flag after the map updates
    setTimeout(() => setClearCoordinates(false), 100);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-3 d-flex flex-column align-items-center p-3 mt-5">
          <p className="me-2 w-100 border p-2 rounded h6 font-bold border-info border-4">
            {circleData?.name}
          </p>

          <p className="me-2 w-100 border p-2 h6 rounded font-bold border-4">
            {circleData?.cycle}
          </p>
          <p className="me-2 w-100 border p-2 h6 rounded font-bold border-4">
            {circleData?.role}
          </p>
          <div className="d-flex mt-4">
            {!coordinatesLoaded && (
              <Button className="me-2" variant="primary" onClick={handleCreate}>
                Create
              </Button>
            )}
            <Button className="me-2" variant="success" onClick={handleAccept}>
              Accept
            </Button>
            <Button className="me-2" variant="warning" onClick={handleEdit}>
              Edit
            </Button>
            <Button className="me-2" variant="danger" onClick={handleReject}>
              Reject
            </Button>
            {coordinatesLoaded && (
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className="col-9 p-0">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FeatureGroup>
              <EditableMap
                coordinates={loadedCoordinates}
                clearCoordinates={clearCoordinates}
                handleSetCord={handleSetCord}
              />
              <EditControl position="topright" />
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Review;
