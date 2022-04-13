import { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';

const Home: NextPage = () => {
  return (
    <Canvas camera={{ position: [1, 3, 5] }}>
      <mesh scale={3} position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={0x00ff00} />
      </mesh>
      <ambientLight args={[0xff0000]} intensity={0.1} />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
    </Canvas>
  );
};

export default Home;
