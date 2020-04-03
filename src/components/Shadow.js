import { memo } from "react";
import { useThree } from "react-three-fiber";
import * as THREE from "three";

const Shadow = () => {
  const { gl } = useThree();
  gl.shadowMap.type = THREE.PCFSoftShadowMap;
  gl.shadowMap.enabled = true;

  return null;
};

export default memo(Shadow);
