import { fontFamily } from "tailwindcss/defaultTheme";
import svgToDataUri from "mini-svg-data-uri";
import tailwindcssAnimate from "tailwindcss-animate";
import { type Config } from "tailwindcss/types/config";
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
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
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
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      animation: {
        shimmer: "shimmer 5s linear infinite",
      },
      keyframes: {
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
    tailwindcssAnimate,
    // twa,
    plugin(() => addVariablesForColors),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {},

        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    }),
  ],
} satisfies Config;
