import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import JackScene from '../assets/images/jack.glb';

const BottleJack = ({ sectionId, ...props }) => {
  const bottleRef = useRef();
  const { nodes, materials } = useGLTF(JackScene);
  const rotationSpeed = useRef(0);
  const currentState = useRef(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${sectionId}`,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Ajustamos la velocidad de rotación según la sección
          if (progress < 0.33) {
            rotationSpeed.current = 0.3;
            currentState.current = 1;
          } else if (progress < 0.66) {
            rotationSpeed.current = 0.6;
            currentState.current = 2;
          } else {
            rotationSpeed.current = 0.3;
            currentState.current = 3;
          }
        }
      }
    });

    // Animaciones más suaves y centradas
    tl.fromTo(bottleRef.current.scale,
      { x: 1, y: 1, z: 1 },
      { x: 2, y: 2, z: 2, duration: 1.5, ease: "power2.inOut" }
    )
    .to(bottleRef.current.rotation,
      { y: Math.PI * 2, duration: 2.5, ease: "power2.inOut" }
    )
    .to(bottleRef.current.scale,
      { x: 2.5, y: 2.5, z: 2.5, duration: 2, ease: "power2.inOut" },
      "-=1"
    )
    .to(bottleRef.current.rotation,
      { y: Math.PI * 4, duration: 2.5, ease: "power2.inOut" }
    )
    .to(bottleRef.current.scale,
      { x: 1.8, y: 1.8, z: 1.8, duration: 2, ease: "power2.inOut" },
      "-=1"
    );

    return () => {
      tl.kill();
    };
  }, [sectionId]);

  useFrame((state, delta) => {
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

useGLTF.preload(JackScene);
export default BottleJack;