import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface SneakerProps {
  scrollProgress: number
}

export function Sneaker({ scrollProgress }: SneakerProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Animate parts based on scroll
  // scrollProgress is 0 to 1
  // We want to "explode" parts as we scroll
  
  return (
    <group ref={groupRef}>
      {/* 1. Carbonflow Plate (Bottom) */}
      <group position={[0, -0.6 * (1 - scrollProgress), 0]}>
        <RoundedBox args={[4, 0.1, 1.5]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial 
            color="#22d3ee" 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#22d3ee"
            emissiveIntensity={0.5}
          />
        </RoundedBox>
        {/* Decorative stats plane */}
        <mesh position={[2.5, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* 2. Hyperbounce Foam (Middle) */}
      <group position={[0, 0, 0]}>
         <RoundedBox args={[3.8, 0.4, 1.4]} radius={0.1} smoothness={4}>
          <MeshDistortMaterial 
            color="#a855f7" 
            speed={2} 
            distort={0.2} 
            transparent 
            opacity={0.8}
          />
        </RoundedBox>
      </group>

      {/* 3. Aerofit Upper (Top) */}
      <group position={[0, 0.8 * (1 - scrollProgress), 0]}>
        <RoundedBox args={[3.5, 0.6, 1.2]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial 
            color="#111" 
            metalness={0.4} 
            roughness={0.5} 
            wireframe={true}
          />
        </RoundedBox>
        {/* Inner core */}
        <RoundedBox args={[3.4, 0.5, 1.1]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
        </RoundedBox>
      </group>

      {/* Floating Particles for atmosphere */}
      <Particles count={100} />
    </group>
  )
}

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null)
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return temp
  }, [count])

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001
      mesh.current.rotation.x += 0.001
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#22d3ee" transparent opacity={0.6} />
    </points>
  )
}
