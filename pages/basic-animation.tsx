import { NextPage } from 'next';
import { useRef } from 'react';
import { Canvas, useThree, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { Mesh, AxesHelper, GridHelper, SpotLight, SpotLightHelper, Color } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

export function Controls() {
  const ref = useRef({} as OrbitControls);
  const { camera, gl } = useThree();
  return <orbitControls ref={ref} args={[camera, gl.domElement]} />;
}

type BoxProps = {
  position: [number, number, number];
  scale: number;
};
function Box({ scale, position }: BoxProps) {
  const mesh = useRef({} as Mesh);
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[scale, scale, scale]} />
      <meshStandardMaterial color='green' />
    </mesh>
  );
}

type SphereProps = {
  position: [number, number, number];
  scale: number;
  isRotating: boolean;
  isBouncing: boolean;
};
function Sphere({ scale, position, isRotating, isBouncing }: SphereProps) {
  const mesh = useRef({} as Mesh);
  const X = position[0];
  const Z = position[2];
  let color: string;
  if (isRotating) {
    if (isBouncing) {
      color = 'purple';
    } else {
      color = 'red';
    }
  } else {
    if (isBouncing) {
      color = 'blue';
    } else {
      color = 'gray';
    }
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (isRotating) {
      const radius = (X ** 2 + Z ** 2) ** 0.5;

      const initTheta = Math.atan(X / Z);

      mesh.current.position.x = radius * Math.cos(initTheta + time);
      mesh.current.position.z = radius * Math.sin(initTheta + time);
    }
    if (isBouncing) {
      mesh.current.position.y = 0.5 + Math.abs(Math.sin(time));
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <sphereGeometry args={[scale, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/**
 * X軸を赤、Y軸を青、Z軸を緑として表示する。
 */
function Axes({ ...props }) {
  const { scene } = useThree();
  const axesHelper = new AxesHelper(props.size || 10);
  const red = new Color(0xff0000);
  const green = new Color(0x00ff00);
  const blue = new Color(0x0000ff);
  axesHelper.setColors(red, green, blue);
  scene.add(axesHelper);
  return (
    <>
      <axesHelper />
    </>
  );
}

function Grid() {
  const { scene } = useThree();
  const gridHelper = new GridHelper(10, 10);
  scene.add(gridHelper);
  return (
    <>
      <gridHelper />
    </>
  );
}

function Lights() {
  const light = useRef();
  useHelper(light, SpotLightHelper, 'cyan');
  return (
    <spotLight
      ref={light}
      intensity={0.2}
      position={[10, 10, 5]}
      shadow-mapSize-width={64}
      shadow-mapSize-height={64}
      castShadow
      shadow-bias={-0.001}
    />
  );
}

type PlaneProps = {
  width: number;
  height: number;
  position: [number, number, number];
};
function Plane({ width, height, position }: PlaneProps) {
  const mesh = useRef({} as Mesh);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} ref={mesh}>
      <planeGeometry args={[width, height]} />
      <meshLambertMaterial color='0xffffff' />
    </mesh>
  );
}

const Home: NextPage = () => {
  return (
    <Canvas camera={{ position: [2, 4, 7] }}>
      <Box position={[4, 0.5, 3]} scale={1} />
      <Sphere position={[-1, 0.5, 0]} scale={0.5} isRotating={true} isBouncing={false} />
      <Sphere position={[1, 0.5, 0]} scale={0.5} isRotating={true} isBouncing={false} />
      <Sphere position={[2, 0.5, 0]} scale={0.5} isRotating={false} isBouncing={true} />
      <Sphere position={[-3, 0.5, 0]} scale={0.5} isRotating={true} isBouncing={true} />
      <Sphere position={[4, 0.5, -4]} scale={0.5} isRotating={false} isBouncing={false} />

      <Plane width={10} height={10} position={[0, 0, 0]} />
      <Axes />
      {/* <Grid /> */}
      {/* <Lights /> */}
      <spotLight intensity={0.2} position={[10, 10, 5]} castShadow />
      <directionalLight position={[0, 3, 5]} intensity={0.5} />
      <Controls />
    </Canvas>
  );
};

export default Home;
