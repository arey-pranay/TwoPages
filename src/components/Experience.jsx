import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const { viewport } = useThree();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });
  console.log(section);
  return (
    <>
      <ambientLight intensity={1} />
      <motion.group
        position={[2.8, -12, 4.8]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 3}
        animate={{
          y: section === 0 ? 0.35 : -1,
        }}
      >
        <Office section={section} />
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        scale={[0.9, 0.9, 0.9]}
        animate={{
          z: section === 1 ? 20 : 5.5,
          y: section === 1 ? -viewport.height / 2.7 : 0.6,
          x: section === 1 ? 2.8 : 3.6,
        }}
        // rotation-x={section === 1 ? 2 : 0}
        // rotation-z={section === 1 ? 2 : 0}
        // rotation-y={section === 1 ? 8 : 0}

        //Burpees
        // rotation-x={section === 1 ? 2 : Math.PI / 50}
        // rotation-z={section === 1 ? 2 : -Math.PI / 2.2}
        // rotation-y={section === 1 ? 8 : -Math.PI / 1.1}
        rotation-x={section === 1 ? 2.5 : Math.PI / 50}
        rotation-z={section === 1 ? 2 : -Math.PI / 2.2}
        rotation-y={section === 1 ? 8.1 : -Math.PI / 1.1}
      >
        {/* <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 2 : 6,
          y: section === 1 ? -viewport.height / 4 : 2,
          x: section === 1 ? 0 : 3,
        }}
      > */}
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[-1.2, -4, -4]} scale={[2, 2, 2]}>
            {section === 0 && <sphereGeometry />}
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={8.5}
              color={"blue"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[2, 2, 2]} position={[-2, -2, -5]}>
            {section === 1 && <boxGeometry />}
            <MeshWobbleMaterial
              opacity={0.2}
              transparent
              factor={2}
              speed={2}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 4, 2]} position={[0.2, 10, -0.5]}>
            {section === 1 && <sphereGeometry />}
            <MeshDistortMaterial
              opacity={0.5}
              transparent
              distort={1}
              speed={2}
              color="white"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[2, 2, 2]} position={[-3, -1, 7]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"red"}
            />
          </mesh>
        </Float>
        <group scale={[2, 2, 2]}>
          <Avatar animation={section === 0 ? "Typing" : "Standing"} />
        </group>
      </motion.group>
    </>
  );
};
