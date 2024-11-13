import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JackScene from '../assets/images/jack.glb';

gsap.registerPlugin(ScrollTrigger);

const BottleJack = ({ sectionId, ...props }) => {
  const bottleRef = useRef();
  const { nodes, materials } = useGLTF(JackScene);
  const rotationSpeed = useRef(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${sectionId}`,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            rotationSpeed.current = 0.3;
          } else if (progress < 0.66) {
            rotationSpeed.current = 0.6;
          } else {
            rotationSpeed.current = 0.3;
          }
        },
      },
    });

    // Configuración de las animaciones de escala y rotación con GSAP
    tl.fromTo(
      bottleRef.current.scale,
      { x: 1, y: 1, z: 1 },
      { x: 2, y: 2, z: 2, duration: 1.5, ease: 'power2.inOut' }
    )
      .to(bottleRef.current.rotation, { y: Math.PI * 2, duration: 2.5, ease: 'power2.inOut' })
      .to(bottleRef.current.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 2, ease: 'power2.inOut' }, '-=1')
      .to(bottleRef.current.rotation, { y: Math.PI * 4, duration: 2.5, ease: 'power2.inOut' })
      .to(bottleRef.current.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 2, ease: 'power2.inOut' }, '-=1');

    // Limpiar el timeline y el trigger al desmontar
    return () => {
      tl.kill();
      ScrollTrigger.getById(`trigger-${sectionId}`)?.kill();
    };
  }, [sectionId]);

  useFrame((_, delta) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y += delta * rotationSpeed.current;
    }
  });

  return (
    <group ref={bottleRef} {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[-0.111, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1669.032}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['botella-jd_glass_0'].geometry}
            material={materials.glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['etiqueta-tapa-jd_etiqueta_0'].geometry}
            material={materials.etiqueta}
            position={[0, 0, 0.094]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['etiqueta-botella-jd_etiqueta_0'].geometry}
            material={materials.etiqueta}
            position={[0, 0, 0.094]}
          />
        </group>
      </group>
    </group>
  );
};

// Preload the GLTF model to optimize initial loading
useGLTF.preload(JackScene);

export default BottleJack;
