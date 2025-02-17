/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Saandy (https://sketchfab.com/Saandy)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/absolut-vodka-1l-bottle-e11913a2fcdb41d5badfa841d6448c90
Title: Absolut Vodka 1L Bottle
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {a} from '@react-spring/three'
import AbsolutScene from '../assets/images/absolut.glb';

const BottleAbsolut = (props) => {
  const { nodes, materials } = useGLTF(AbsolutScene)
  return (
    <a.group {...props} dispose={null}>
      <group scale={0.2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottle_Lp_m_bottle_0.geometry}
          material={materials.m_bottle}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.lid_Lp_m_cap_0.geometry}
          material={materials.m_cap}
        />
      </group>
    </a.group>
  )
}

useGLTF.preload('/absolut_vodka_1l_bottle.glb')

export default BottleAbsolut
