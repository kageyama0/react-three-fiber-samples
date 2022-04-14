import { useState, useRef } from 'react';
import * as THREE from 'three';
import { NextPage } from 'next';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { easeElasticIn } from 'd3-ease';

function RotatingBox() {
  const mesh = useRef({} as THREE.Mesh);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  });


  return (
    <animated.mesh ref={mesh} scale={scale} onClick={() => setActive(!active)}>
      <boxBufferGeometry />
      <meshPhongMaterial color='royalblue' />
    </animated.mesh>
  );
}

const ReactSpringAnimation1: NextPage = () => {
  return (
    <Canvas camera={{position: [3,3,3]}}>
      <RotatingBox />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0,3,5]}/>
    </Canvas>
  );
};

export default ReactSpringAnimation1;
