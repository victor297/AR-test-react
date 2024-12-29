import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { XRButton } from "three/examples/jsm/webxr/XRButton";

const ARViewer = ({ modelUrl }) => {
  const containerRef = useRef(null);
  console.log(modelUrl);
  useEffect(() => {
    // Create the scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    // Append the renderer to the container
    containerRef.current.appendChild(renderer.domElement);

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1); // Adjust the model scale if needed
    });

    // Set up the AR button (for WebXR support)
    document.body.appendChild(XRButton.createButton(renderer));

    // Set up the rendering loop
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up on component unmount
      window.removeEventListener("resize", handleResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <div ref={containerRef} />;
};

export default ARViewer;
