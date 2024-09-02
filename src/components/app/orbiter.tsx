import tw from "tailwind-styled-components";
import { Logo } from "./logo";
export const Orbiter = () => (
  <Planet>
    <Surface>
      <Logo />
    </Surface>
  </Planet>
);
// <div className="h-[20px] w-[20px] bg-[url('/svg/logo_light.svg')] bg-contain bg-no-repeat" />
const Planet = tw.div`
  object-fit rounded-full bg-[url('/svg/melancholy.svg')] bg-left transition-all duration-5000 ease-in hover:bg-center`;

const Surface = tw.div`
  flex items-center justify-center rounded-full
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-gray-300/10 via-blue-400/10 to-orange-50
  group/card relative h-auto w-auto h-[8rem] w-[8rem]
`;
