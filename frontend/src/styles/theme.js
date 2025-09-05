export const theme = {
  colors: {
    // Studio Ghibli inspired palette
    sky: {
      light: '#E6F3FF',
      main: '#87CEEB',
      dark: '#4682B4'
    },
    nature: {
      grass: '#9ACD32',
      forest: '#228B22', 
      mountain: '#8B7355',
      earth: '#D2691E'
    },
    magic: {
      cloud: '#F0F8FF',
      sunset: '#FFB6C1',
      gold: '#FFD700',
      crystal: '#E0E6F8'
    },
    
    // Checkpoint colors
    checkpoints: {
      basecamp: '#8FBC8F',
      alpha: '#87CEEB', 
      beta: '#DDA0DD',
      summit: '#FFD700'
    },
    
    // UI colors
    text: {
      primary: '#2F4F4F',
      secondary: '#556B2F',
      light: '#708090'
    },
    accent: {
      primary: '#FF6347',
      secondary: '#32CD32',
      tertiary: '#FF69B4'
    },
    background: {
      overlay: 'rgba(255, 255, 255, 0.9)',
      glass: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(0, 0, 0, 0.1)'
    }
  },
  
  fonts: {
    primary: "'Nunito Sans', 'Segoe UI', sans-serif",
    secondary: "'Crimson Text', 'Georgia', serif",
    mono: "'JetBrains Mono', 'Consolas', monospace"
  },

  spacing: {
    xs: '0.5rem',
    sm: '1rem', 
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
    wide: '1920px'
  },

  shadows: {
    soft: '0 4px 20px rgba(0,0,0,0.08)',
    medium: '0 8px 30px rgba(0,0,0,0.12)',
    strong: '0 15px 40px rgba(0,0,0,0.16)',
    glow: '0 0 20px rgba(255,255,255,0.3)'
  },

  animations: {
    fast: '0.2s',
    normal: '0.3s', 
    slow: '0.5s',
    verySlow: '1s'
  }
};
