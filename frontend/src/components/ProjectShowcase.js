import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.overlay};
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.medium};
  border: 2px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}66);
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.strong};
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProjectName = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  font-weight: 700;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectLink = styled.a`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.color};
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all ${props => props.theme.animations.normal} ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px ${props => props.color}44;
  }
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.background.glass};
  border: 1px solid ${props => props.color}44;
  color: ${props => props.theme.colors.text.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const Highlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Highlight = styled.li`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 500;
  
  &::before {
    content: '⭐';
    position: absolute;
    left: 0;
    color: ${props => props.color};
  }
`;

export default function ProjectShowcase() {
  return (
    <ProjectGrid>
      {resumeData.projects.map((project, index) => (
        <ProjectCard
          key={project.name}
          color={project.color}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10 }}
        >
          <ProjectHeader>
            <ProjectName>{project.name}</ProjectName>
            <ProjectLinks>
              <ProjectLink 
                href={`https://${project.link}`} 
                target="_blank" 
                rel="noopener noreferrer"
                color={project.color}
              >
                Live
              </ProjectLink>
              <ProjectLink 
                href={`https://${project.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                color="#333"
              >
                Code
              </ProjectLink>
            </ProjectLinks>
          </ProjectHeader>
          
          <ProjectDescription>{project.description}</ProjectDescription>
          
          <TechStack>
            {project.tech.map((tech, i) => (
              <TechTag key={i} color={project.color}>
                {tech}
              </TechTag>
            ))}
          </TechStack>
          
          <Highlights>
            {project.highlights.map((highlight, i) => (
              <Highlight key={i} color={project.color}>
                {highlight}
              </Highlight>
            ))}
          </Highlights>
        </ProjectCard>
      ))}
    </ProjectGrid>
  );
}
