import type { Location } from "./types";

/**
 * Three service-area pages, matching the areas named in Supernova's own FAQ:
 * "We cover all of the greater Spokane area, Spokane Valley, and Liberty Lake."
 *
 * These are deliberately NOT templated. Each page describes the housing stock,
 * terrain, soil and seasonal conditions that actually differ between the three
 * — which is what makes a location page worth indexing. Do not add more areas
 * until there is enough genuine local detail to write them the same way.
 */
export const locations: Location[] = [
  {
    slug: "spokane-wa",
    city: "Spokane",
    cityState: "Spokane, WA",
    order: 1,
    h1: "Landscaping & Lawn Care in Spokane, WA",
    title: "Landscaping & Lawn Care in Spokane, WA",
    description:
      "Weekly mowing, irrigation repair, landscape installation, clean-ups and snow removal across Spokane, from the South Hill to Five Mile. Free estimates.",
    intro: [
      "Spokane is where most of our work is. It is also the part of the service area with the widest range of property types — century-old homes on the South Hill with mature trees and original irrigation, mid-century blocks on the North Side, and newer builds out toward Indian Trail and Five Mile with young landscapes still establishing.",
      "Those are genuinely different jobs. A Browne's Addition lot with three mature maples and a narrow alley has almost nothing in common with a new build on Moran Prairie that needs its first real planting plan.",
    ],
    localNotes: [
      {
        heading: "Mature trees mean serious leaf volume",
        body: [
          "The older Spokane neighbourhoods — Perry District, Garland, Audubon-Downriver, Manito, Comstock — were planted with maples, locusts and pines that are now full size. The shade is the reason people love those streets. The leaf drop is the reason fall clean-up here is a bigger job than most homeowners plan for.",
          "Left on the lawn under snow, a matted layer of wet leaves blocks light and holds moisture against the crowns all winter. What surfaces in April is dead, flattened turf that then needs repair. Heavily treed lots on the South Hill often want two passes rather than one.",
        ],
      },
      {
        heading: "Slope, basalt and thin soil",
        body: [
          "The South Hill is called that for a reason, and the grade shows up in the work. Sloping lots shed water fast, erode where they are not held, and need retaining rock or terracing before planting is worth doing.",
          "Much of the city also sits over basalt with a shallow soil layer on top. It affects how deep you can realistically plant, how well beds drain, and how much soil prep a new lawn needs before sod is worth laying.",
        ],
      },
      {
        heading: "Older irrigation systems",
        body: [
          "A lot of Spokane's established neighbourhoods are running systems that were installed decades ago and modified since — often by several different people. Zones that no longer match the beds they were built for, heads buried below grade after years of top-dressing, controllers nobody has reprogrammed since the last power outage.",
          "That is normal, and it is usually repairable. What it is not is a reason to replace the whole system, which is what tends to get quoted.",
        ],
      },
      {
        heading: "Snow and the alley problem",
        body: [
          "Spokane averages around 45 inches of snow a season. In the older grid neighbourhoods, alley access and on-street parking complicate where cleared snow can actually go, and city plows leave a compacted berm across driveway aprons — frequently after the driveway has already been cleared.",
          "Where snow gets pushed matters as much as whether it gets cleared. Stack it uphill of the driveway and the afternoon melt runs straight back across the surface you cleared that morning.",
        ],
      },
    ],
    serviceSlugs: [
      "lawn-maintenance",
      "seasonal-cleanups",
      "irrigation",
      "landscape-design-installation",
      "aeration-overseeding",
      "residential-snow-removal",
    ],
    faqs: [
      {
        q: "Which parts of Spokane do you cover?",
        a: "The greater Spokane area. If you are unsure whether your address is on a route, call (509) 808-3130 — it is a quick answer either way.",
      },
      {
        q: "Do you work on the South Hill?",
        a: "Yes, regularly. Sloped lots and mature trees are two of the things we deal with most in Spokane, and both are concentrated up there.",
      },
      {
        q: "Do you take on both residential and commercial properties in Spokane?",
        a: "Both. Residential maintenance and installation is the bulk of what we do, and we handle commercial snow removal for businesses and property managers through the winter.",
      },
    ],
    image: {
      src: "/images/projects/front-entry-beds.jpg",
      alt: "A Spokane front entry with fresh bark mulch, stone edging and new plantings installed by Supernova Landscape",
      width: 960,
      height: 720,
    },
  },

  {
    slug: "spokane-valley-wa",
    city: "Spokane Valley",
    cityState: "Spokane Valley, WA",
    order: 2,
    h1: "Landscaping & Lawn Care in Spokane Valley, WA",
    title: "Landscaping & Lawn Care in Spokane Valley, WA",
    description:
      "Weekly mowing, irrigation repair, sod, clean-ups and commercial snow removal across Spokane Valley: Opportunity, Veradale, Greenacres and Ponderosa.",
    intro: [
      "Spokane Valley properties tend to be flatter, newer and larger than their Spokane counterparts, and that changes what the work looks like. More irrigated turf per lot, more system to maintain, and a lot more of the seasonal cost tied up in water.",
      "It is also where a large share of the area's commercial property sits — the Sprague and Pines corridors, the business parks, the retail and service buildings that need parking lots open before customers arrive in January.",
    ],
    localNotes: [
      {
        heading: "Bigger lawns, and the water that goes with them",
        body: [
          "Subdivisions through Opportunity, Veradale, Greenacres and Ponderosa were laid out with more yard than the older city grid, and most of it is irrigated cool-season turf. Through a dry Spokane July, that is a meaningful monthly bill.",
          "It also makes irrigation efficiency worth more here than it is on a small city lot. Heads throwing water onto a driveway, a zone running eight minutes longer than it needs to, or coverage overlapping twice on the same strip — on a large Valley lawn those add up over a summer in a way they simply do not on a quarter-acre.",
        ],
      },
      {
        heading: "You are watering over the aquifer",
        body: [
          "Spokane Valley sits on the Spokane Valley–Rathdrum Prairie Aquifer, the region's drinking water source and an EPA-designated sole source aquifer. The gravelly soil that makes the Valley drain so well is exactly what makes the aquifer easy to reach.",
          "Practically, that is an argument for irrigation that is actually dialled in. Over-watering fast-draining Valley soil does not help the lawn — the water is past the root zone before the grass can use it. Correct run times and correct coverage do more for the turf than more water does.",
        ],
      },
      {
        heading: "Commercial properties and winter access",
        body: [
          "The Valley's commercial corridors mean a lot of parking lots, and a lot of businesses whose customers cannot reach them if the lot is not open. Snow contracts here are as much about timing as clearing — being done before opening rather than at some point during the day.",
          "For property managers running multiple Valley sites, being geographically clustered helps: routes are built around proximity, and a group of sites in the same area is easier to service early in a storm.",
        ],
      },
      {
        heading: "Newer landscapes reaching their awkward age",
        body: [
          "A lot of Valley subdivisions were planted at build-out with shrubs spaced for the day they went in rather than for what they would become. Fifteen years on, foundation plantings are into the siding, beds have lost their edges, and the original bark is long gone.",
          "That is a rebuild rather than a maintenance job — re-cutting the beds, taking out what has outgrown the space, and replanting at spacing that works for the next decade.",
        ],
      },
    ],
    serviceSlugs: [
      "lawn-maintenance",
      "irrigation",
      "commercial-snow-removal",
      "sod-installation",
      "seasonal-cleanups",
      "aeration-overseeding",
    ],
    faqs: [
      {
        q: "Do you serve all of Spokane Valley?",
        a: "Spokane Valley is a named part of our service area. Call (509) 808-3130 with your address and we will confirm it is on a route.",
      },
      {
        q: "Do you handle commercial snow removal in Spokane Valley?",
        a: "Yes — parking lots, sidewalks, entrances and access areas for Valley businesses and property managers, on a seasonal contract or per event.",
      },
      {
        q: "Can you help lower a high summer water bill?",
        a: "Often, yes. On large Valley lawns most of the waste is coverage and run times rather than anything dramatic. Fixing heads, correcting arcs and setting realistic schedules is usually where the savings are.",
      },
    ],
    image: {
      src: "/images/projects/front-yard-rock-beds.jpg",
      alt: "A Spokane Valley front yard with new rock and mulch beds, a defined lawn edge and fresh plantings",
      width: 500,
      height: 667,
    },
  },

  {
    slug: "liberty-lake-wa",
    city: "Liberty Lake",
    cityState: "Liberty Lake, WA",
    order: 3,
    h1: "Landscaping & Lawn Care in Liberty Lake, WA",
    title: "Landscaping & Lawn Care in Liberty Lake, WA",
    description:
      "Weekly mowing, irrigation, clean-ups and snow removal for Liberty Lake homes, HOA neighbourhoods and business park properties. Free estimates.",
    intro: [
      "Liberty Lake is the most consistently maintained part of our service area, and the standard is visible from the street. A lot of the housing is in planned neighbourhoods with HOA expectations about frontage, edges and how the yard looks from the road.",
      "That raises the bar on the details rather than the scope. On a Liberty Lake route, the edging and the blow-off matter as much as the cut, because an inconsistent edge is what somebody notices.",
    ],
    localNotes: [
      {
        heading: "HOA neighbourhoods and consistency",
        body: [
          "Planned neighbourhoods around Legacy Ridge, Rocky Hill, the River District and out toward MeadowWood come with frontage standards and, in a lot of cases, a neighbour on each side whose yard is the comparison.",
          "What that asks for is consistency more than anything — the same crew, the same day, the same finish every week. A missed week shows on a Liberty Lake street in a way it does not on a large rural lot.",
        ],
      },
      {
        heading: "Younger landscapes, newer irrigation",
        body: [
          "Most Liberty Lake irrigation is far newer than what we see in central Spokane, which changes the type of call. Less failed-valve and buried-head work, more coverage adjustment, controller programming and adding zones as owners extend beds or put in new planting areas.",
          "Younger plantings also mean the pruning and spacing decisions are still in front of you rather than behind you — which is the good time to make them.",
        ],
      },
      {
        heading: "Commercial and business park property",
        body: [
          "Liberty Lake has a substantial employment base for a city its size, and the office and business park properties there have the same winter problem as anywhere else: staff and visitors arriving inside a narrow window in the morning, and a lot that has to be open before they do.",
          "It is a straightforward site type to service — generally newer, well laid out and with reasonable places to stack snow, which makes early-morning clearing realistic.",
        ],
      },
      {
        heading: "East end of the valley, first to feel winter",
        body: [
          "Liberty Lake sits at the east end of the valley against the Idaho state line and higher ground, and conditions out there are not always identical to downtown Spokane on the same morning. It is worth factoring into when snow service starts for the season rather than assuming the city's timing applies.",
        ],
      },
    ],
    serviceSlugs: [
      "lawn-maintenance",
      "irrigation",
      "seasonal-cleanups",
      "residential-snow-removal",
      "commercial-snow-removal",
      "landscape-design-installation",
    ],
    faqs: [
      {
        q: "Do you service Liberty Lake?",
        a: "Yes. Liberty Lake is one of the three areas named in our service area, alongside greater Spokane and Spokane Valley.",
      },
      {
        q: "Can you meet HOA maintenance standards?",
        a: "That is what weekly service is built for — a consistent cut, clean edges every visit, and hard surfaces blown off before we leave. If your HOA has written frontage requirements, tell us and we will work to them.",
      },
      {
        q: "Do you handle snow removal in Liberty Lake?",
        a: "Yes, residential and commercial. Given Liberty Lake's position at the east end of the valley, it is worth arranging winter service early rather than waiting on the first storm.",
      },
    ],
    image: {
      src: "/images/projects/stone-wall-bed.jpg",
      alt: "A stacked stone retaining edge with a mulched planting bed and trimmed lawn on a Liberty Lake area property",
      width: 500,
      height: 667,
    },
  },
];

export const locationBySlug = new Map(locations.map((l) => [l.slug, l]));

export function getLocation(slug: string): Location | undefined {
  return locationBySlug.get(slug);
}
