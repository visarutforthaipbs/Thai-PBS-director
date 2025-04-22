import { extendTheme } from "@chakra-ui/react";
// Remove Sarabun imports
// import "@fontsource/sarabun/400.css";
// import "@fontsource/sarabun/700.css";

// Add custom font-face for DB Helvethaica X
const fonts = `
@font-face {
  font-family: 'DB Helvethaica X';
  src: url('./dbhelvethaicaxmed-webfont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

// Inject the font-face declaration
// Create a style element and append to head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = fonts;
  document.head.appendChild(style);
}

const theme = extendTheme({
  colors: {
    brand: {
      orange: "#F15A22", // Thai PBS primary orange
      darkOrange: "#E04712", // Darker orange for hover states (instead of red)
      secondaryOrange: "#FF7F41", // Secondary orange (instead of red)
      beige: "#F9F6F2",
      gray: "#666666",
      lightGray: "#f1f1f1",
      darkGray: "#333333",
    },
  },
  fonts: {
    heading: `'DB Helvethaica X', sans-serif`,
    body: `'DB Helvethaica X', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "brand.darkGray",
      },
      a: {
        color: "brand.orange",
        _hover: {
          textDecoration: "none",
          color: "brand.darkOrange",
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "brand.orange",
          color: "white",
          _hover: {
            bg: "brand.darkOrange",
          },
        },
        outline: {
          borderColor: "brand.orange",
          color: "brand.orange",
          _hover: {
            bg: "brand.orange",
            color: "white",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.orange",
      },
    },
  },
});

export default theme;
 