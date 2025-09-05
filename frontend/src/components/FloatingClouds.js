import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const CloudCard = styled(motion.a)`
  display: block;
  background: rgba(240, 248, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 60px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  text-decoration: none;
  color: ${props => props.theme.colors.text.primary};
  box-shadow: ${props => props.theme.shadows.medium};
  border: 2px solid rgba(255,255,255,0.4);
  transition: all ${props => props.theme.animations.normal} ease;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.4),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: ${props => props.theme.shadows.strong};
    background: rgba(255, 255, 255, 0.98);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border-radius: 40px;
    min-width: 100px;
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ContactValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.accent.primary};
`;

const ContactInfo = styled(motion.div)`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.9);
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: 15px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(0,0,0,0.9);
  }
`;

const CloudWrapper = styled(motion.div)`
  position: relative;
  
  &:hover ${ContactInfo} {
    opacity: 1;
    bottom: -70px;
    transition: all ${props => props.theme.animations.normal} ease;
  }
`;

const contacts = [
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Connect',
    href: `https://${resumeData.personal.linkedin}`,
    info: 'Professional Network',
    color: '#0077B5'
  },
  {
    icon: '💻', 
    label: 'GitHub',
    value: 'Code',
    href: `https://${resumeData.personal.github}`,
    info: 'Project Repository',
    color: '#333'
  },
  {
    icon: '📧',
    label: 'Email', 
    value: 'Contact',
    href: `mailto:${resumeData.personal.email}`,
    info: resumeData.personal.email,
    color: '#EA4335'
  }
];

export default function FloatingClouds() {
  return (
    <>
      {contacts.map((contact, index) => (
        <CloudWrapper
          key={contact.label}
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: [0, -12, 0],
            scale: 1,
            transition: {
              opacity: { duration: 1, delay: index * 0.4 },
              scale: { duration: 0.8, delay: index * 0.4 },
              y: { 
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4
              }
            }
          }}
        >
          <CloudCard
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactIcon>{contact.icon}</ContactIcon>
            <ContactLabel>{contact.label}</ContactLabel>
            <ContactValue>{contact.value}</ContactValue>
            
            <ContactInfo>
              {contact.info}
            </ContactInfo>
          </CloudCard>
        </CloudWrapper>
      ))}
    </>
  );
}
