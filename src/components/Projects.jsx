import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "3D with Elm",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projects/1.png",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "Landing Pages",
    url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
    image: "projects/1.png",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "Functional Apps",
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    image: "projects/1.png",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },
  {
    title: "Blogs",
    url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
    image: "projects/1.png",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Open-Source Contributions",
    url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
    image: "projects/1.png",
    description: "Create a loading screen for your r3f projects",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.7);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props} position-x={-3} position-y={-5.5}>
      <mesh
        position-z={-0.004}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[4, 7]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={2}
      />
      <Text
        maxWidth={3}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.5}
        position={[-1.5, 1, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={3}
        anchorX="left"
        anchorY="top"
        fontSize={0.3}
        position={[-1.5, 0.2, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 2}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 10, -3]}
          animate={{
            x: (index - currentProject) * 4.5 - 2,
            y: currentProject === index ? 3 : -7,
            z: currentProject === index ? 1 : -8,
            rotateX: currentProject === index ? 0 : -Math.PI / 2,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
