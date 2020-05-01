import React, { memo } from "react";
import * as THREE from "three";

const Plane = () => {
  return (
    <group position={[0, -1.5, 0]}>
      <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[50, 50]} />
        <meshStandardMaterial
          attach="material"
          color={0xffffff}
          side={THREE.DoubleSide}
        />
      </mesh>
      <gridHelper args={[50, 50, 0x000000, 0x000000]} position={[0, 0.01, 0]} />
    </group>
  );
};

export default memo(Plane);
