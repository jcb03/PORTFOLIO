import styled, { createGlobalStyle, keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Crimson+Text:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.text.primary};
    overflow-x: hidden;
    background: linear-gradient(
      180deg,
      ${props => props.theme.colors.sky.light} 0%,
      ${props => props.theme.colors.sky.main} 25%,
      ${props => props.theme.colors.magic.sunset} 60%,
      ${props => props.theme.colors.nature.grass} 100%
    );
    min-height: 100vh;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  canvas {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent.secondary};
  }

  /* Animation classes */
  .animate-fade-in {
    animation: ${fadeInUp} 0.8s ease-out;
  }

  .animate-float {
    animation: ${float} 3s ease-in-out infinite;
  }

  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200px 100%;
    animation: ${shimmer} 2s infinite;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 10;
  min-height: 100vh;
  width: 100%;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${props => props.theme.colors.background.glass};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: ${props => props.theme.colors.text.primary};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    margin-bottom: ${props => props.theme.spacing.xs};
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    color: ${props => props.theme.colors.text.secondary};
    font-weight: 400;
    opacity: 0.9;
  }

  .title {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: ${props => props.theme.colors.accent.primary};
    font-weight: 600;
    margin-top: ${props => props.theme.spacing.xs};
  }
`;

export const CheckpointContainer = styled.div`
  position: absolute;
  right: ${props => props.side === 'right' ? '5%' : 'auto'};
  left: ${props => props.side === 'left' ? '5%' : 'auto'};
  top: ${props => props.top}%;
  transform: translateY(-50%);
  z-index: 50;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    right: ${props => props.side === 'right' ? '2%' : 'auto'};
    left: ${props => props.side === 'left' ? '2%' : 'auto'};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: relative;
    right: auto;
    left: auto;
    top: auto;
    transform: none;
    margin: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
`;

export const CloudContainer = styled.div`
  position: fixed;
  top: 10%;
  right: 5%;
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    top: 8%;
    right: 2%;
    gap: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: relative;
    top: auto;
    right: auto;
    flex-direction: row;
    justify-content: center;
    margin: ${props => props.theme.spacing.lg} 0;
  }
`;

export const ScrollIndicator = styled.div`
  position: fixed;
  bottom: ${props => props.theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: ${props => props.theme.colors.text.primary};
  font-size: 2rem;
  animation: ${float} 2s ease-in-out infinite;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: ${props => props.theme.spacing.md};
    font-size: 1.5rem;
  }
`;

export const ProjectsSection = styled.section`
  position: relative;
  z-index: 20;
  margin-top: 120vh;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.9) 0%,
    rgba(240,248,255,0.8) 100%
  );
  backdrop-filter: blur(20px);
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 80vh;
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.accent.primary},
      ${props => props.theme.colors.accent.secondary}
    );
    border-radius: 2px;
  }
`;
