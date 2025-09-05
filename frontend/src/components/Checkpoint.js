import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CheckpointCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.overlay};
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: ${props => props.theme.spacing.lg};
  max-width: 380px;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 2px solid rgba(255,255,255,0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      ${props => props.color},
      rgba(255,255,255,0.5),
      ${props => props.color}
    );
    border-radius: 25px;
    z-index: -1;
    opacity: 0.3;
  }

  &::after {
    content: '${props => props.icon}';
    position: absolute;
    top: -15px;
    right: 20px;
    font-size: 3rem;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
  }
`;

const LevelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Level = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  color: ${props => props.color};
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  font-weight: 700;
`;

const Elevation = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color}dd);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  letter-spacing: 0.5px;
`;

const Year = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '📅';
    font-size: 1.2rem;
  }
`;

const Title = styled.h4`
  font-size: 1.4rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
  font-weight: 600;
  line-height: 1.3;
`;

const Achievement = styled(motion.li)`
  margin: ${props => props.theme.spacing.sm} 0;
  font-size: 0.95rem;
  line-height: 1.5;
  list-style: none;
  position: relative;
  padding-left: 2rem;
  color: ${props => props.theme.colors.text.secondary};
  
  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 0.6rem;
    width: 8px;
    height: 8px;
    background: ${props => props.color};
    border-radius: 50%;
    box-shadow: 0 0 10px ${props => props.color}66;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text.primary};
    transform: translateX(5px);
    transition: all ${props => props.theme.animations.normal} ease;
  }
`;

const AchievementList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ProgressLine = styled.div`
  position: absolute;
  left: -20px;
  top: 50%;
  width: 4px;
  height: 100px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${props => props.color}66,
    transparent
  );
  transform: translateY(-50%);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

export default function Checkpoint({ checkpoint, index }) {
  const side = index % 2 === 0 ? 'right' : 'left';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'right' ? 100 : -100, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
    >
      <CheckpointCard
        color={checkpoint.color}
        icon={checkpoint.icon}
        whileHover={{ 
          scale: 1.05, 
          y: -10,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
      >
        <ProgressLine color={checkpoint.color} />
        
        <LevelHeader>
          <Level color={checkpoint.color}>
            {checkpoint.level}
          </Level>
          <Elevation color={checkpoint.color}>
            {checkpoint.elevation}
          </Elevation>
        </LevelHeader>
        
        <Year>{checkpoint.year}</Year>
        <Title>{checkpoint.title}</Title>
        
        <AchievementList>
          {checkpoint.achievements.map((achievement, i) => (
            <Achievement
              key={i}
              color={checkpoint.color}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: (index * 0.15) + (i * 0.08)
              }}
            >
              {achievement}
            </Achievement>
          ))}
        </AchievementList>
      </CheckpointCard>
    </motion.div>
  );
}
