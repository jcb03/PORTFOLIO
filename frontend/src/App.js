import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { 
  GlobalStyles, 
  Container, 
  Header, 
  HeaderContent,
  CheckpointContainer, 
  CloudContainer,
  ScrollIndicator,
  ProjectsSection,
  SectionTitle
} from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { resumeData } from './data/resumeData';

import Mountain3D from './components/Mountain3D';
import Checkpoint from './components/Checkpoint';
import FloatingClouds from './components/FloatingClouds';
import ParticleSystem from './components/ParticleSystem';
import ProjectShowcase from './components/ProjectShowcase';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // GSAP Scroll animations
    gsap.fromTo(".header-content", 
      { opacity: 0, y: -100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power3.out" 
      }
    );

    // Parallax effect for mountain
    gsap.to(".mountain-container", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".mountain-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Projects section animation
    gsap.fromTo(".projects-section", 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const checkpointPositions = [15, 35, 60, 85]; // Percentage positions on screen

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <ParticleSystem />
        
        <div className="mountain-container">
          <Mountain3D />
        </div>

        <Header>
          <HeaderContent className="header-content">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {resumeData.personal.name}
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {resumeData.personal.subtitle}
            </motion.p>
            <motion.p 
              className="title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {resumeData.personal.title}
            </motion.p>
          </HeaderContent>
        </Header>

        {/* Checkpoint System */}
        {resumeData.checkpoints.map((checkpoint, index) => (
          <CheckpointContainer 
            key={checkpoint.id}
            top={checkpointPositions[index]}
            side={index % 2 === 0 ? 'right' : 'left'}
          >
            <Checkpoint checkpoint={checkpoint} index={index} />
          </CheckpointContainer>
        ))}

        {/* Contact Clouds */}
        <CloudContainer>
          <FloatingClouds />
        </CloudContainer>

        {/* Scroll indicator */}
        <ScrollIndicator>
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⛰️
          </motion.div>
        </ScrollIndicator>

        {/* Projects Section */}
        <ProjectsSection className="projects-section">
          <SectionTitle>Featured Projects</SectionTitle>
          <ProjectShowcase />
        </ProjectsSection>
      </Container>
    </ThemeProvider>
  );
}

export default App;
