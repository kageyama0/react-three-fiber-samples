import { NextPage } from 'next';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stats } from '@react-three/drei';

const Torus = ({ ...props }) => {
  const groupRef = useRef({} as THREE.Group);

  useFrame(() => {
    groupRef.current.rotation.x += 0.01;
    groupRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh {...props}>
        <torusGeometry args={[1, 0.2, 12, 36]} />
        <meshStandardMaterial color={'red'} />
        <Html>
          <div className='label'>Torus</div>
        </Html>
      </mesh>
    </group>
  );
};

const HtmlLabels: NextPage = () => {
  return (
    <Canvas>
      <pointLight position={[5, 5, 5]} />
      <Torus position={[2, 0, 0]} />
      <Stats />
    </Canvas>
  );
};

export default HtmlLabels;
