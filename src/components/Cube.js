import React, { useRef, memo } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Cube = () => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={mesh} castShadow>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial
          attach="material"
          color={0xffff00}
          shadowSide={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default memo(Cube);
