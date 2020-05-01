import React, { memo } from "react";

const Light = () => {
  return (
    <group>
      {/* Fake sphere */}
      {/* <mesh position={[1, 2, 0]}>
        <sphereBufferGeometry args={[0.2, 10, 10]} attach="geometry" />
        <meshBasicMaterial color={0xfff1ef} attach="material" />
      </mesh> */}
      <pointLight
        intensity={1}
        position={[1, 2, 0]}
        color={0xffffff}
        castShadow
      />
    </group>
  );
};

export default memo(Light);
