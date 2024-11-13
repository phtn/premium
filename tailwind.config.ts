// import svgToDataUri from "mini-svg-data-uri";
import tailwindcssAnimate from "tailwindcss-animate";
import { nextui } from "@nextui-org/theme";
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// import twa from "tailwindcss-animated";

export type ColorValue = string | Record<string, string> | undefined;

/**
 * @name flattenColorPalette
 * @description Flattens a color palette (custom)
 */
export function flattenColorPalette(
  colors: Record<string, ColorValue>,
): Record<string, string> {
  const flattenColors: Record<string, string> = {};

  function flatten(colorName: string, colorValue: ColorValue) {
    if (typeof colorValue === "string") {
      flattenColors[colorName] = colorValue;
    } else {
      for (const key in colorValue) {
        flatten(`${colorName}-${key}`, colorValue[key]);
      }
    }
  }

  for (const colorName in colors) {
    flatten(colorName, colors[colorName]);
  }

  return flattenColors;
}

interface AddVars {
  addBase: (styles: Record<string, Record<string, string>>) => void;
  theme: (path: ColorValue) => Record<string, ColorValue>;
}

function addVariablesForColors({ addBase, theme }: AddVars) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        inter: ["var(--font-inter"],
        mono: ["var(--font-geist-mono)"],
        sarabun: ["var(--font-sarabun)"],
        ibm: ["var(--font-ibm)"],
        arc: ["var(--font-arc)"],
      },
      colors: {
        paper: "#F8F8F8",
        prime: "#3b82f6",
        ash: "#D7D7D7",
        opus: "#929292",
        zap: "#FDFDFD",
        clay: "#6A6A6A",
        coal: "#3A3A3A",
        fast: "#172554",
        void: "#0F172A",
        heli: "#6A7384",
        copper: "#F6F9FC",
        copperx: "F1F5F9",
        ghost: "#F7FAFD",
        dyan: "#083344",
        hermes: "#F37021",
        default: "#e6ebef",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },

      animation: {
        enter: "enter 0.275s ease-out normal both",
        back: "back 0.25s ease-out normal both",
        shimmer: "shimmer 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        back: {
          "0%": {
            opacity: "0",
            transform: "translateZ(0) scale(1.05)",
          },
          "60%": {
            opacity: "0.75",
            transform: "translateZ(0) scale(1.025)",
            backfaceVisibility: "hidden",
            webkitFontSmoothing: "antialiased",
          },
          "100%": {
            opacity: "1",
            transform: "translateZ(0) scale(1)",
          },
        },
        enter: {
          "0%": {
            opacity: "0",
            transform: "translateZ(0) scale(0.95)",
          },
          "60%": {
            opacity: "0.75",
            transform: "translateZ(0) scale(1.02)",
            backfaceVisibility: "hidden",
            webkitFontSmoothing: "antialiased",
          },
          "100%": {
            opacity: "1",
            transform: "translateZ(0) scale(1)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        skate: {
          from: {
            transform: "translateX(-2rem)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
      },
      boxShadow: {
        "i-tl-lg": "inset 15px 30px 60px -25px rgba(125, 125, 125, 0.15)",
        "i-br-lg": "inset -10px -30px 60px -10px rgba(125, 125, 125, 0.15)",
        // Case light
        "i-br-li": "inset -15px -30px 40px -30px rgba(125, 125, 125, 0.20)",
        "i-tl-li-hv": "inset 20px 20px 60px -30px rgba(125, 125, 125, 0.15)",
        // Case dark
        "i-br-dk": "inset -15px -30px 40px -30px rgba(255, 255, 255, 0.50)",
        "i-tl-dk-hv": "inset 25px 15px 60px -30px rgba(225, 225, 225, 0.8)",
        // Light
        "i-tl-li": "inset 20px 20px 40px -30px rgba(125, 125, 125, 0.15)",
        "i-br-li-hv": "inset -20px -20px 40px -30px rgba(125, 125, 125, 0.20)",
        // Dark
        "i-tl-dk": "inset 20px 20px 40px -30px rgba(255, 255, 255, 0.85)",
        "i-br-dk-hv": "inset -20px -20px 40px -30px rgba(255, 255, 255, 0.70)",
        // Meter
        "i-br-md-m": "inset -15px -30px 40px -20px rgba(175, 175, 175, 0.8)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate, // twa,plugin(() => addVariablesForColors),plugin(function ({ matchUtilities,theme }) {
    nextui({
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#1B1F22",
              foreground: "#FAFAFA",
              50: "#fafafa",
              100: "#e1e2e2",
              200: "#c8c9ca",
              300: "#b0b1b2",
              400: "#97999a",
              500: "#7e8082",
              600: "#65686a",
              700: "#4d5052",
              800: "#34373a",
              900: "#1b1f22",
            },
            secondary: {
              DEFAULT: "#FAFAFA",
              foreground: "#1B1F22",
            },
            warning: {
              DEFAULT: "#d97706",
              foreground: "#FAFAFA",
            },
            success: {
              DEFAULT: "#0EA5E9",
              foreground: "#FAFAFA",
            },
            default: { DEFAULT: "#FAFAFA", foreground: "#1B1F22" },
            foreground: "#1B1F22",
            background: "#FAFAFA",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FAFAFA",
              foreground: "#1B1F22",
              50: "#1b1f22",
              100: "#34373a",
              200: "#4d5052",
              300: "#65686a",
              400: "#7e8082",
              500: "#97999a",
              600: "#b0b1b2",
              700: "#c8c9ca",
              800: "#e1e2e2",
              900: "#fafafa",
            },
            foreground: "#FAFAFA",
            background: "#1B1F22",
          },
        },
      },
    }),
    plugin(() => addVariablesForColors),
    plugin((api) =>
      api.matchUtilities(
        {},
        {
          values: flattenColorPalette(api.theme("backgroundColor")),
          type: "color",
        },
      ),
    ),
  ],
} satisfies Config;
