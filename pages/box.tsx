import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh, AxesHelper, Color } from 'three';

function Box({ ...props }) {
  const mesh = useRef({} as Mesh);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  console.log(mesh);
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Axes({ ...props }) {
  const { scene } = useThree();
  const axesHelper = new AxesHelper(props.size || 5);
  // const red = new Color(0xff0000);
  // const green = new Color(0x00ff00);
  // const blue = new Color(0x0000ff);
  // axesHelper.setColors(red, green, blue);
  scene.add(axesHelper);
  return (
    <>
      <axesHelper />
    </>
  );
}

const BoxPage: NextPage = () => {
  return (
    <Canvas camera={{ position: [1, 3, 5] }}>
      <ambientLight />
      <Axes />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default BoxPage;
