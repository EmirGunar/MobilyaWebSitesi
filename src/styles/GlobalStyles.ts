import { createGlobalStyle } from 'styled-components';

// Açık kahve/krem rengi paleti
export const colors = {
  primary: '#D2B48C', // Tan - Açık kahve
  primaryDark: '#BC9A6A', // Darker Tan
  primaryLight: '#E6D3B7', // Very Light Tan
  secondary: '#DEB887', // Burlywood - Krem kahve
  accent: '#CD853F', // Peru - Vurgu rengi
  background: '#FAF7F0', // Çok açık krem
  surface: '#FFFFFF',
  text: '#5D4E37', // Dark Olive Brown - Okunabilir kahve
  textLight: '#8B7355', // Medium Brown
  textMuted: '#A0956B', // Light Brown
  success: '#8FBC8F', // Dark Sea Green
  warning: '#DAA520', // Goldenrod
  error: '#CD5C5C', // Indian Red
  border: '#F5F5DC' // Beige
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: ${colors.text};
    background-color: ${colors.background};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }
`;

export default GlobalStyles;
