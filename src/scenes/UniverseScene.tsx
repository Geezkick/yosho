import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, SpotLight } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef<THREE.Points>(null)
  const count = 180
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 32
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4
    }
    return arr
  }, [])

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.0002
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#a855f7" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}





export function UniverseScene() {
  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <SpotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={3} castShadow />
          
          <Particles />
          


          <ContactShadows 
            position={[0, -5, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={6} 
          />

          <Environment preset="night" />
          
          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.9} luminanceSmoothing={0.025} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
