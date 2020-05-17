import React, { useEffect, useMemo, useState } from "react";
import { vertexShader } from "../shaders/vertexShader";
import { fragmentShader } from "../shaders/fragmentShader";
import * as THREE from "three";
import { sampleAudio2 } from "../sounds";
import { useFrame } from "react-three-fiber";
import * as dat from "dat.gui";

const AudioVisualizer = () => {
  const [userInit, setUserInit] = useState(false);
  const [listener, setListener] = useState(null);
  const [audio, setAudio] = useState(null);
  const [analyser, setAnalyzer] = useState(null);
  const [settings, setSettings] = useState({
    isPlaying: false,
    barColor: 0xffff00,
    fftSize: 64,
  });

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
      if (!userInit && !listener && !audio) {
        setUserInit(true);
      } else {
        sampleAudio2.play();
        console.log("Play Music");
      }
    } else {
      sampleAudio2.pause();
      console.log("Pause Music");
    }
  }, [settings.isPlaying, userInit, listener, audio]);

  useEffect(() => {
    if (userInit) {
      const _listener = new THREE.AudioListener();
      const _audio = new THREE.Audio(_listener);
      _audio.setMediaElementSource(sampleAudio2);
      setListener(_listener);
      setAudio(_audio);
    }
  }, [userInit]);

  // Audio Analyser
  // We will re-init it when the fftSize change
  useEffect(() => {
    if (audio) {
      setAnalyzer(new THREE.AudioAnalyser(audio, settings.fftSize));
    }
  }, [settings.fftSize, audio]);

  // Uniforms to pass into the shader
  const uniforms = useMemo(() => {
    if (analyser) {
      return {
        tAudioData: {
          value: new THREE.DataTexture(
            analyser.data,
            settings.fftSize / 2,
            1,
            THREE.LuminanceFormat
          ),
        },
        barColor: { type: "vec3", value: new THREE.Color(settings.barColor) },
      };
    }
  }, [settings, analyser]);

  useFrame(() => {
    analyser && analyser.getFrequencyData();
    if (uniforms) {
      uniforms.tAudioData.value.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={[6, 3, 3]}>
      <mesh position={[0, 0, -0.101]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 0.2]} />
        <meshBasicMaterial attach="material" color={0x121212} />
      </mesh>
      {uniforms && (
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
      )}
    </group>
  );
};

export default AudioVisualizer;
