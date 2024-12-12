import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CrossModel(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[0.2, 2, 0.2]} />
      <meshStandardMaterial color="#1a1a1a" />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </mesh>
  );
}

export default CrossModel;
