import React from "react";
import { Canvas } from "react-three-fiber";
import Cube from "../../components/Cube";
import Light from "../../components/Light";
import Plane from "../../components/Plane";
import Controls from "../../components/Controls";
import Shadow from "../../components/Shadow";
import AudioVisualizer from "../../components/AudioVisualizer";

const MainScene = () => {
  return (
    <Canvas
      style={{
        backgroundColor: "black",
      }}
    >
      <AudioVisualizer />
      {/* <axesHelper args={999} /> */}
      <Light />
      {/* <Shadow /> */}
      {/* <Cube /> */}
      <Plane />
      <Controls />
    </Canvas>
  );
};

export default MainScene;
