import React, { useEffect, useMemo, useState } from "react";
import { vertexShader } from "../shaders/vertexShader";
import { fragmentShader } from "../shaders/fragmentShader";
import * as THREE from "three";
import { sampleAudio2 } from "../sounds";
import { useFrame } from "react-three-fiber";
import * as dat from "dat.gui";

// Init a static Audio Object for the sample audio
const listener = new THREE.AudioListener();
const audio = new THREE.Audio(listener);
audio.setMediaElementSource(sampleAudio2);

const AudioVisualizer = () => {
  const [settings, setSettings] = useState({
    isPlaying: false,
    barColor: 0xffff00,
    fftSize: 64,
  });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Dat GUI
    const gui = new dat.GUI();

    // Dat GUI controllers to update uniforms
    const colorController = gui.addColor(settings, "barColor").name("Color");
    colorController.onChange(barColor => {
      setSettings({ ...settings, barColor });
    });

    const fftSizeController = gui
      .add(settings, "fftSize", [32, 64, 128, 256, 512, 1024])
      .name("FFT Size");
    fftSizeController.onChange(fftSize =>
      setSettings({ ...settings, fftSize })
    );

    const isPlayingController = gui.add(settings, "isPlaying");
    isPlayingController
      .onChange(isPlaying => setSettings({ ...settings, isPlaying }))
      .name("Play Music");
  }, []);

  useEffect(() => {
    if (settings.isPlaying) {
      sampleAudio2.play();
    } else {
      sampleAudio2.pause();
    }
  }, [settings.isPlaying]);

  // Audio Analyser
  // We will re-init it when the fftSize change
  const analyser = useMemo(
    () => new THREE.AudioAnalyser(audio, settings.fftSize),
    [settings.fftSize]
  );

  // Uniforms to pass into the shader
  const uniforms = useMemo(
    () => ({
      tAudioData: {
        value: new THREE.DataTexture(
          analyser.data,
          settings.fftSize / 2,
          1,
          THREE.LuminanceFormat
        ),
      },
      barColor: { type: "vec3", value: new THREE.Color(settings.barColor) },
    }),
    [settings, analyser]
  );

  useFrame(() => {
    analyser.getFrequencyData();
    uniforms.tAudioData.value.needsUpdate = true;

    if (counter < 10) {
      console.log("==========");
      console.log(uniforms.tAudioData.value);
      console.log(analyser.data);
      setCounter(counter + 1);
    }
  });

  return (
    <group position={[0, 0, 0]} scale={[6, 3, 3]}>
      <mesh position={[0, 0, -0.101]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 0.2]} />
        <meshBasicMaterial attach="material" color={0x121212} />
      </mesh>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[1, 1]} />
        <shaderMaterial
          attach="material"
          args={[
            {
              uniforms,
              vertexShader,
              fragmentShader,
            },
          ]}
        />
      </mesh>
    </group>
  );
};

export default AudioVisualizer;
