import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import { ReactThreeFiber, Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import {
  BoxGeometry,
  Mesh,
  Vector2,
  LineSegments,
  DoubleSide,
  Shape,
  AxesHelper,
  Color,
  BufferGeometry,
} from 'three';
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
  // TODO: https://codesandbox.io/s/three-fiber-zoom-to-object-camera-controls-solution-final-sbgx0?file=/src/App.js
  // camera.lookAt(new Vector3(6, 0, 0));
  return <orbitControls ref={ref} args={[camera, gl.domElement]} />;
}

// 直方体(六面体):https://threejs.org/docs/?q=Geometry#api/en/geometries/BoxGeometry
function Box({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 円形：https://threejs.org/docs/#api/en/geometries/CircleGeometry
function Circle({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  // Materilaにおいて、side={DoubleSide}を指定することによって、回転して裏側になってもちゃんと表示されるようになる
  return (
    <mesh {...props} ref={mesh}>
      <circleGeometry args={[0.5, 32]} />
      <meshStandardMaterial color='red' side={DoubleSide} wireframe />
    </mesh>
  );
}

// 円錐：https://threejs.org/docs/?q=Geometry#api/en/geometries/ConeGeometry
function Cone({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  // Materilaにおいて、side={DoubleSide}を指定することによって、回転して裏側になってもちゃんと表示されるようになる
  return (
    <mesh {...props} ref={mesh}>
      <coneGeometry args={[0.5, 1, 32]} />
      <meshStandardMaterial color='red' side={DoubleSide} wireframe />
    </mesh>
  );
}

// 円柱：https://threejs.org/docs/?q=Geometry#api/en/geometries/CylinderGeometry
function Cylinder({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  // Materilaにおいて、side={DoubleSide}を指定することによって、回転して裏側になってもちゃんと表示されるようになる
  return (
    <mesh {...props} ref={mesh}>
      <cylinderGeometry args={[0.5, 0.3, 1, 32]} />
      <meshStandardMaterial color='red' side={DoubleSide} wireframe />
    </mesh>
  );
}

//　正十二面体: https://threejs.org/docs/?q=Geometry#api/en/geometries/DodecahedronGeometry
function Dodecahedron({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <dodecahedronGeometry args={[0.6]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

//　なんかギザギザしてる: https://threejs.org/docs/?q=Geometry#api/en/geometries/DodecahedronGeometry
function Edges({ ...props }) {
  const mesh = useRef({} as LineSegments);
  const boxGeometry: BufferGeometry = new BoxGeometry(1, 1, 1);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={mesh}>
      <edgesGeometry args={[boxGeometry]} />
      <lineBasicMaterial color='red' />
    </mesh>
  );
}

function Extrude({ ...props }) {
  const mesh = useRef({} as Mesh);
  const length = 1.2;
  const width = 0.8;
  const shape = new Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 2,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  };

  useFrame(() => (mesh.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={mesh}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshBasicMaterial color='red' wireframe />
    </mesh>
  );
}

//　正二十面体: https://threejs.org/docs/?q=Geometry#api/en/geometries/IcosahedronGeometry
function Icosahedron({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <icosahedronGeometry args={[0.6]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 器っぽい形のやつ：https://threejs.org/docs/?q=geometry#api/en/geometries/LatheGeometry
function Lathe({ ...props }) {
  const mesh = useRef({} as Mesh);
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new Vector2(Math.sin(i * 0.2), (i - 0.5) * 0.2-0.7));
  }

  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <latheGeometry args={[points]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 正八面体: https://threejs.org/docs/?q=Geometry#api/en/geometries/OctahedronGeometry
function Octahedron({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <octahedronGeometry args={[0.6]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 平面：https://threejs.org/docs/?q=geometry#api/en/geometries/PlaneGeometry
function Plane({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 多面体生成用のgeometry：https://threejs.org/docs/?q=geometry#api/en/geometries/PolyhedronGeometry
// サンプルは６面体
function Polyhedron({ ...props }) {
  const mesh = useRef({} as Mesh);
  const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
  ];

  const indicesOfFaces = [
    2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5,
    6, 6, 7, 4,
  ];
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <polyhedronGeometry args={[verticesOfCube, indicesOfFaces]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 平面の輪っか：https://threejs.org/docs/?q=geometry#api/en/geometries/PlaneGeometry
function Ring({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <ringGeometry args={[0.8, 1.2, 32]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 好きな形を描ける：https://threejs.org/docs/?q=geometry#api/en/geometries/PlaneGeometry
function HeartShape({ ...props }) {
  const mesh = useRef({} as Mesh);
  const x = 0,
    y = -1;

  const heartShape: any = new Shape();

  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
  heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <shapeGeometry args={[heartShape]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 球体：https://threejs.org/docs/?q=geometry#api/en/geometries/SphereGeometry
function Sphere({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 正四面体：https://threejs.org/docs/?q=geometry#api/en/geometries/TetrahedronGeometry
function Tetrahedron({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <tetrahedronGeometry args={[0.5]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

// 立体的な輪っか：https://threejs.org/docs/?q=geometry#api/en/geometries/TorusGeometry
function Torus({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <torusGeometry args={[0.5, 0.25, 16, 64]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}


// ぐにゃぐにゃの輪っか：https://threejs.org/docs/?q=geometry#api/en/geometries/TorusGeometry
function TorusKnot({ ...props }) {
  const mesh = useRef({} as Mesh);
  useFrame(() => (mesh.current.rotation.x += 0.01));
  return (
    <mesh {...props} ref={mesh}>
      <torusKnotGeometry args={[0.5, 0.25, 32, 16]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
}

const BoxPage: NextPage = () => {
  return (
    <Canvas
      camera={{
        position: [0, 7, 10],
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-5, 0, 0]} />
      <Circle position={[-2.5, 0, 0]} />
      <Cone position={[0, 0, 0]} />
      <Cylinder position={[2.5, 0, 0]} />
      <Dodecahedron position={[5, 0, 0]} />
      <Edges position={[7.5, 0, 0]} />
      <Extrude position={[-5, -3, 0]} />
      <Icosahedron position={[0, -3, 0]} />
      <Lathe position={[2.5, -3, 0]} />
      <Octahedron position={[5.0, -3, 0]} />
      <Plane position={[7.5, -3, 0]} />
      <Polyhedron position={[-5, 3, 0]} />
      <Ring position={[-2.5, 3, 0]} />
      <HeartShape position={[0, 3, 0]} />
      <Sphere position={[2.5, 3, 0]} />
      <Tetrahedron position={[4.0, 3, 0]} />
      <Torus position={[6, 3, 0]} />
      <TorusKnot position={[-5.0, 6, 0]} />

      <Controls />
    </Canvas>
  );
};

export default BoxPage;
