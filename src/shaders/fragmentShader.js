export const fragmentShader = `
  uniform sampler2D tAudioData;
  uniform vec3 barColor;
  varying vec3 vUv;

  void main() {
    vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );

    float f = texture2D( tAudioData, vec2( vUv.x + 0.5, 0.0 ) ).r;

    float i = step( vUv.y + 0.5, f ) * step( 0.0, vUv.y + 0.5 );

    gl_FragColor = vec4( mix( backgroundColor, barColor, i ), 1.0 );
  }
`;
