import React from "react";
import "./App.css";
import ARViewer from "./ARViewer";

function App() {
  const modelUrl =
    "https://trenova.nyc3.cdn.digitaloceanspaces.com/1app/diorama.glb"; // Replace with your 3D model URL

  return (
    <div className="App">
      <h1>Property AR Walkthrough</h1>
      <p>Explore this property in Augmented Reality!</p>
      <ARViewer modelUrl={modelUrl} />
    </div>
  );
}

export default App;
