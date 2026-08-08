import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { guides } from "@/content/guides";

export type NavLink = {
  href: string;
  label: string;
  /** Optional short description shown in the desktop dropdown. */
  hint?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
  /** A link to the hub itself, shown at the top of the dropdown. */
  overview?: NavLink;
};

const serviceChildren: NavLink[] = services
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((s) => ({ href: `/services/${s.slug}`, label: s.name, hint: s.summary }));

const locationChildren: NavLink[] = locations
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((l) => ({ href: `/service-areas/${l.slug}`, label: l.cityState }));

const guideChildren: NavLink[] = guides.map((g) => ({
  href: `/resources/${g.slug}`,
  label: g.title,
}));

export const primaryNav: NavItem[] = [
  {
    href: "/services",
    label: "Services",
    overview: { href: "/services", label: "All services" },
    children: serviceChildren,
  },
  { href: "/projects", label: "Projects" },
  {
    href: "/service-areas",
    label: "Service Areas",
    overview: { href: "/service-areas", label: "All service areas" },
    children: locationChildren,
  },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  {
    href: "/resources",
    label: "Resources",
    overview: { href: "/resources", label: "All guides" },
    children: guideChildren,
  },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      ...serviceChildren.map(({ href, label }) => ({ href, label })),
      { href: "/services", label: "All services" },
    ],
  },
  {
    heading: "Service areas",
    links: [
      ...locationChildren,
      { href: "/service-areas", label: "All service areas" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Supernova" },
      { href: "/projects", label: "Project gallery" },
      { href: "/reviews", label: "Reviews" },
      { href: "/resources", label: "Spokane yard guides" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
