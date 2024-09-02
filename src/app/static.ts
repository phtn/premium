import type { Action, HeroProps } from "@/components/app/hero";
import { type StickyScrollContent } from "@/components/ui/sticky-reveal";
import { type TabItem } from "@/components/ui/tabs";
import type { Extras, TopbarLink } from "@/components/ui/topbar";

export const links: TopbarLink[] = [
  // {
  //   label: "services",
  //   href: "#",
  // },
];

export const extras: Extras[] = [
  {
    label: "Sign in",
    href: "/signin",
  },
  // {
  //   href: "#",
  //   type: "icon",
  //   icon: ShoppingBagIcon,
  // },
];

export const actions: Action[] = [
  { type: "primary", label: "Get full access", href: "/shop" },
  { type: "default", label: "Learn more", href: "/shop/electronics" },
];

export const heroProps: HeroProps = {
  foreground: "text-white_",
  heading: ["Get Full Access", "to Australian Education."],
  subheading: "You can start your journey today!",
  actions,
};

export const serviceContents: StickyScrollContent[] = [
  {
    title: "Ready to Transform Your Future?",
    description:
      "Embark on an unforgettable journey with full access to top Australian universities and schools. Our platform empowers exchange students like you to explore diverse educational opportunities, gain global perspectives, and immerse yourself in the vibrant Australian culture—all in one place.",

    media: "Transform Your Future",
    mediaTitle: "Transform Your Future",
  },
  {
    title: "Why Choose us?",
    description:
      "Our mission is to provide you with all the essential information and ensure you maximise your adventure in Australia.",
    media: "",
  },
  {
    title: "Start your journey today!",
    description:
      "Discover how easy it is to turn your dreams into reality. Explore our platform and unlock a world of educational possibilities in Australia.",
    media: "",
  },
];

export const tabItems: TabItem[] = [
  { id: 0, value: "intro", label: "Intro", content: serviceContents },
  { id: 5, value: "services", label: "Services", content: serviceContents },
  { id: 1, value: "community", label: "Community", content: serviceContents },
  { id: 2, value: "guides", label: "Guides", content: serviceContents },
  { id: 3, value: "about", label: "About Us", content: serviceContents },
];

/* media with image
(
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/svg/heart_v1.svg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    )
*/
