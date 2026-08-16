import type { Service } from "./types";

/**
 * The nine sellable services. Scope lists marked "@verified" reproduce the
 * factual substance already published on supernovalandscape.com/our-services —
 * that writing was good, it was just trapped on one page.
 *
 * Spokane climate notes are drawn from published regional sources (NOAA
 * 1991–2020 snowfall normals; the late-September-to-early-November blowout
 * window and the late-August-to-mid-October aeration window used across the
 * Inland Northwest). They are not claims about Supernova.
 */
export const services: Service[] = [
  {
    slug: "lawn-maintenance",
    name: "Lawn Maintenance",
    quoteFormLabel: "Weekly Mowing",
    category: "lawn",
    order: 1,
    featured: true,
    h1: "Weekly Lawn Maintenance in Spokane",
    title: "Weekly Lawn Mowing & Maintenance | Spokane, WA",
    description:
      "Weekly mowing, edging, trimming and clean-up for Spokane, Spokane Valley and Liberty Lake homes. Same crew, same day each week. Free estimate: (509) 808-3130.",
    summary:
      "Weekly mowing, edging, trimming, blow-off and clippings haul-off — one crew, one visit, nothing left behind.",
    intro: [
      "Supernova runs weekly mowing routes across Spokane, Spokane Valley and Liberty Lake. Every visit is the full job: cut, trim, edge, blow off the hard surfaces and haul the clippings away. You should not be able to tell we were there except that the yard looks sharp.",
      "We do not offer bi-weekly mowing, and that is deliberate. Two weeks of Spokane growth in May means removing more than a third of the blade in one pass, which stresses the turf, leaves clumps that smother what is underneath, and dulls equipment. Weekly service keeps the cut height consistent and the lawn healthier through the summer.",
    ],
    whoFor: [
      "Homeowners who want the yard handled on a schedule instead of on a weekend",
      "Rental and second properties that need to look maintained without the owner on site",
      "Anyone who has been cancelled on mid-season and wants a crew that actually shows up",
      "Properties where the mowing has fallen behind and needs a reset before regular service starts",
    ],
    scope: [
      {
        label: "Mowing",
        detail:
          "Even, consistent cuts at a height suited to the grass and the time of year. Direction is varied to avoid ruts and grain.",
      },
      {
        label: "Weed eating",
        detail:
          "String trimming around fences, flowerbeds, foundations, posts and the spots a mower cannot reach.",
      },
      {
        label: "Edging",
        detail:
          "Clean, defined borders along sidewalks, driveways and walkways so the lawn stops where it should.",
      },
      {
        label: "Clippings haul-off",
        detail:
          "Grass clippings are removed and taken with us. No bags left at the curb.",
      },
      {
        label: "Blow-off",
        detail:
          "Patios, driveways, walkways and steps are blown clear before we leave.",
      },
    ],
    localContext: {
      heading: "What a Spokane mowing season actually looks like",
      body: [
        "Spokane lawns are almost entirely cool-season grass — Kentucky bluegrass, perennial ryegrass and tall fescue, usually in a mix. That means two hard growth pushes: a heavy one from April into June, and a second one in September and October once the nights cool off and the rain returns.",
        "Between those, July and August turn hot and dry. Growth slows, and the risk shifts from overgrowth to scalping and heat stress. We raise the cut height through the dry months so the crowns stay shaded and the root zone holds moisture longer, then bring it back down in the fall.",
        "If your yard is on an irrigation system, mowing and watering have to work together. We flag heads we clip or notice running dry so problems get caught before you are looking at a brown patch in August.",
      ],
    },
    image: {
      src: "/images/projects/striped-lawn-barn.jpg",
      alt: "A large, freshly striped lawn maintained by Supernova Landscape, with a red barn and mature pines behind it",
      width: 2000,
      height: 1500,
    },
    faqs: [
      {
        q: "Do you offer bi-weekly mowing?",
        a: "No. We only run weekly routes. Bi-weekly service means removing too much of the grass blade at once, which stresses the lawn and leaves clumps behind. Weekly visits keep the cut consistent and our schedule and equipment reliable for everyone on the route.",
      },
      {
        q: "What is included in a weekly visit?",
        a: "Mowing, string trimming, edging along hard surfaces, blowing off patios and driveways, and hauling away the clippings. It is one price for the whole visit — there is no separate charge for trimming or clean-up.",
      },
      {
        q: "Will it be the same crew every week?",
        a: "We run set routes so your property lands on the same day each week with a crew that knows it. If the schedule shifts for weather or a holiday, we let you know.",
      },
      {
        q: "What if my yard is badly overgrown?",
        a: "That is common when someone has gone a season without service. We usually quote an initial clean-up to get it back to a normal height, then start weekly maintenance from there. Ask about it when you request your estimate.",
      },
      {
        q: "Do you mow year-round?",
        a: "Mowing runs through the growing season. Once growth stops in late fall we move into seasonal clean-ups, and in winter our snow removal crews take over.",
      },
    ],
    relatedSlugs: [
      "aeration-overseeding",
      "seasonal-cleanups",
      "irrigation",
      "dethatching",
    ],
  },

  {
    slug: "irrigation",
    name: "Irrigation & Sprinkler Repair",
    quoteFormLabel: "Irrigation Repairs",
    category: "irrigation",
    order: 2,
    featured: true,
    h1: "Sprinkler Repair & Irrigation Service in Spokane",
    title: "Sprinkler Repair & Irrigation | Spokane, WA",
    description:
      "Broken heads, dead zones, valve and controller repairs, blow-outs and new system installs across Spokane, Spokane Valley and Liberty Lake. Free estimates.",
    summary:
      "Broken heads, dead zones, valve and controller failures, coverage problems, blowouts and full system installs.",
    intro: [
      "A Spokane summer will find every weakness in an irrigation system. Two weeks of ninety-degree afternoons and a head that is spraying the fence instead of the lawn turns into a brown stripe you will be looking at until September.",
      "Supernova repairs and installs irrigation across the Spokane area. Most calls we take are not a failed system — they are one broken head, a stuck valve, a controller that lost its program after a power blip, or coverage that was never quite right when the system went in. We find the actual cause instead of replacing parts until something works.",
    ],
    whoFor: [
      "Homeowners with a dry patch, a soggy patch, or a zone that stopped running",
      "Anyone who just bought a house and inherited a system nobody explained",
      "Properties adding lawn, beds or planting areas that the current system does not reach",
      "Owners who want the system winterized properly before the first hard freeze",
    ],
    scope: [
      {
        label: "Repairing broken sprinkler heads",
        detail:
          "Fixing or replacing damaged, sunken or mis-aimed heads to restore proper flow and spray pattern.",
      },
      {
        label: "Coverage adjustments",
        detail:
          "Correcting arcs, nozzles and spacing so the whole lawn gets water instead of the driveway and the fence.",
      },
      {
        label: "Valve replacements",
        detail:
          "Diagnosing and replacing valves that stick open, fail to open, or leak between cycles.",
      },
      {
        label: "Controller replacements",
        detail:
          "Swapping out failed or dated controllers, including upgrades that are easier to program and schedule.",
      },
      {
        label: "Adding zones to existing systems",
        detail:
          "Extending an existing system to cover new lawn, new beds or an area the original install skipped.",
      },
      {
        label: "New system installation",
        detail:
          "Designing and installing a complete system laid out around your property, not a generic grid.",
      },
      {
        label: "Sprinkler turn-on and blow-out",
        detail:
          "Spring start-up with a full zone-by-zone check, and compressed-air winterization in the fall.",
      },
    ],
    localContext: {
      heading: "Blowouts, freeze damage, and why timing matters here",
      body: [
        "Spokane sits in a climate where water left in a line will freeze and split it. Across the Inland Northwest, blowout season runs from roughly late September into early November — early enough to beat a hard freeze, late enough that you are not shutting down while the lawn still needs water.",
        "The failure mode is expensive and predictable. Water expands as it freezes, cracks a fitting or a backflow assembly, and you find out the following April when a zone floods the yard. A blowout uses compressed air to clear the lines before that can happen.",
        "Waiting has a second cost: every irrigation company in the county is booked solid through October. The homeowners who get a convenient date are the ones who called in September.",
      ],
    },
    sections: [
      {
        heading: "How we diagnose a problem zone",
        body: [
          "We run the system zone by zone and watch it work. Most of the time the cause is visible within a couple of minutes — a head buried below grade, a cracked riser, a nozzle throwing the wrong arc, or a valve that will not fully close.",
          "If the zone will not come on at all, the fault is usually electrical rather than mechanical: a solenoid, a wire splice that corroded underground, or a controller output that has failed. We test rather than guess, because replacing a valve that was never the problem is how a small repair turns into a large invoice.",
        ],
      },
    ],
    image: {
      src: "/images/services/irrigation.jpg",
      alt: "A sprinkler head running in a planting bed during an irrigation service call",
      width: 748,
      height: 1000,
    },
    faqs: [
      {
        q: "When should I schedule a sprinkler blowout in Spokane?",
        a: "Across the Inland Northwest the blowout window runs from about late September into early November — before the first hard freeze. Schedules fill quickly through October, so calling in September usually gets you a better date.",
      },
      {
        q: "One zone stopped working. Is that a big repair?",
        a: "Usually not. A dead zone is most often a valve, a solenoid or a wiring fault rather than a problem with the pipe. We test the zone before quoting anything so you are not paying to replace parts that were fine.",
      },
      {
        q: "Can you add sprinklers to a system that is already installed?",
        a: "Yes. Adding zones to existing systems is routine work for us — usually when someone has put in new beds, extended the lawn, or discovered the original install never covered a corner of the property.",
      },
      {
        q: "Do you install complete new irrigation systems?",
        a: "We do. New systems are designed around the actual property — how the lawn and beds are laid out, where the water pressure is, and what will be easy to service later.",
      },
      {
        q: "My controller lost its schedule. Do I need a new one?",
        a: "Not necessarily. Controllers commonly lose a program after a power outage if the backup battery is dead. We will reprogram it and replace the battery first, and only recommend a new controller if the unit itself has failed.",
      },
    ],
    relatedSlugs: [
      "lawn-maintenance",
      "sod-installation",
      "landscape-design-installation",
      "seasonal-cleanups",
    ],
  },

  {
    slug: "landscape-design-installation",
    name: "Landscape Design & Installation",
    quoteFormLabel: "Landscape Install",
    category: "landscape",
    order: 3,
    featured: true,
    h1: "Landscape Design & Installation in Spokane",
    title: "Landscape Design & Installation | Spokane, WA",
    description:
      "Planting beds, rock and boulder work, retaining walls, mulch and full yard rebuilds across Spokane, Spokane Valley and Liberty Lake. Free estimates.",
    summary:
      "Bed rebuilds, rock and boulder work, retaining walls, plantings, mulch and gravel — designed and installed by one crew.",
    intro: [
      "This is the work Supernova is known for locally: taking a yard that has gone to weeds, thistle and volunteer growth and rebuilding it into something with structure — defined beds, retaining rock, plantings that suit the site, and clean edges that hold their shape.",
      "The before-and-after photographs on this site are all real Supernova jobs in the Spokane area. They are worth a look before you read any further, because they show the standard better than a paragraph can.",
    ],
    whoFor: [
      "Homeowners who have inherited an overgrown yard and want a plan, not just a clean-up",
      "Properties with slopes, grade changes or erosion that need retaining rock",
      "Anyone tired of re-mulching beds that were never edged or defined properly",
      "Owners looking to improve curb appeal before selling or after moving in",
    ],
    scope: [
      {
        label: "Design and layout",
        detail:
          "Walking the property with you, working out what the space needs to do, and laying out beds, borders and planting areas before anything is dug.",
      },
      {
        label: "Bed construction and edging",
        detail:
          "Cutting and shaping beds with borders that hold — concrete curbing, stone edging or clean spade edges depending on the job.",
      },
      {
        label: "Rock and boulder work",
        detail:
          "Placing boulders and stacked rock for retaining, terracing and visual structure on graded or sloping ground.",
      },
      {
        label: "Planting",
        detail:
          "Installing shrubs, trees and perennials chosen for Spokane's dry summers and cold winters, spaced for what they will become.",
      },
      {
        label: "Mulch and gravel",
        detail:
          "Bark, mulch and decorative rock installed at the right depth to actually suppress weeds and hold soil moisture.",
      },
      {
        label: "Hard-surface features",
        detail:
          "Flagstone and paved areas where the design calls for a usable surface rather than more planting.",
      },
    ],
    localContext: {
      heading: "Designing for a dry Spokane summer",
      body: [
        "Spokane gets hot and genuinely dry from July into September. A planting plan that ignores that becomes a watering obligation the homeowner quietly abandons by the second summer.",
        "So the plants get chosen for the site: how much afternoon sun the bed takes, whether it is against a south-facing wall radiating heat, whether the irrigation reaches it. Mulch depth matters more here than it does in a wetter climate — it is the difference between watering twice a week and watering every day.",
        "Grade and drainage matter too. Spokane's winters put down snow that melts and refreezes, and a bed that holds water against a foundation causes problems that have nothing to do with landscaping.",
      ],
    },
    image: {
      src: "/images/projects/boulder-slope-planting.jpg",
      alt: "A graded slope rebuilt by Supernova Landscape with placed boulders, fresh bark mulch and new shrub plantings",
      width: 1600,
      height: 2139,
    },
    faqs: [
      {
        q: "Do you charge for a design or an estimate?",
        a: "Estimates and consultations are free. We would rather walk the property with you and understand what you are after than quote off a description over the phone.",
      },
      {
        q: "Can you work with a yard that is completely overgrown?",
        a: "Yes — that is a lot of what we do. Several of the before-and-after projects on this site started as yards that had not been touched in years. Clearing is usually the first phase of the job.",
      },
      {
        q: "Do you handle retaining walls and boulder work?",
        a: "We place boulders and stacked rock for retaining and terracing, which you can see in the project gallery. Talk to us about the site and we will tell you honestly whether it is within our scope or whether it needs an engineered wall.",
      },
      {
        q: "Will the new beds need irrigation?",
        a: "Usually yes, at least for the first couple of seasons while plants establish. We install irrigation as well, so new zones can be run to the beds as part of the same project rather than as a separate job later.",
      },
      {
        q: "How long does a project take?",
        a: "It depends entirely on the size and what is being removed first. We will give you a realistic timeline with your estimate rather than a number that sounds good.",
      },
    ],
    relatedSlugs: [
      "sod-installation",
      "irrigation",
      "seasonal-cleanups",
      "lawn-maintenance",
    ],
  },

  {
    slug: "sod-installation",
    name: "Sod Installation",
    quoteFormLabel: "Sod Install",
    category: "landscape",
    order: 4,
    h1: "Sod Installation in Spokane",
    title: "Sod Installation & New Lawns | Spokane, WA",
    description:
      "New sod lawns for Spokane, Spokane Valley and Liberty Lake — grading, prep, irrigation coordination and installation. Free estimate: (509) 808-3130.",
    summary:
      "New sod lawns installed over properly prepped and graded ground, with irrigation coordinated before the first roll goes down.",
    intro: [
      "Sod is the fastest way to get from bare dirt to a usable lawn, and the part that decides whether it takes is everything that happens before the first roll is unrolled.",
      "Supernova handles the whole sequence: clearing and grading, soil prep, making sure the irrigation actually covers the area, and then the install. Sod laid on compacted, unprepped ground will look excellent for three weeks and then start dying in patches, which is the most common reason people call us to redo somebody else's work.",
    ],
    whoFor: [
      "New construction where the yard is still dirt",
      "Homeowners replacing a lawn that has thinned out past the point of overseeding",
      "Properties where a project has torn up an existing lawn and it needs to come back",
      "Anyone who wants a lawn this season rather than waiting on seed to establish",
    ],
    scope: [
      {
        label: "Site clearing and grading",
        detail:
          "Removing what is there, then grading so water runs away from the house and there are no low spots to hold puddles.",
      },
      {
        label: "Soil preparation",
        detail:
          "Breaking up compaction and preparing a seedbed the roots can actually knit into.",
      },
      {
        label: "Irrigation coordination",
        detail:
          "Confirming coverage before the sod goes down — or installing and adjusting zones — because new sod needs consistent water immediately.",
      },
      {
        label: "Sod installation",
        detail:
          "Laying and seaming the rolls, cutting to edges and beds, and rolling the surface for soil contact.",
      },
      {
        label: "Aftercare instructions",
        detail:
          "A straightforward watering and first-mow schedule for the establishment period, specific to the time of year you had it installed.",
      },
    ],
    localContext: {
      heading: "Timing a sod install around Spokane's summer",
      body: [
        "Cool-season sod establishes best when the air is mild and the soil is still warm — spring, and again from late summer into early fall. Those windows give the roots time to knit in before either the July heat or the first hard freeze.",
        "Mid-summer installs are possible, but they are unforgiving. New sod in a Spokane August needs water every day, sometimes more than once, and a system that cannot deliver that will cost you the lawn. If your irrigation is not sorted, we will tell you to fix that first rather than sell you sod that is going to fail.",
      ],
    },
    image: {
      src: "/images/projects/sod-lawn.jpg",
      alt: "An established green lawn behind a Spokane-area home with a garden shed and mature trees",
      width: 1600,
      height: 1200,
    },
    faqs: [
      {
        q: "How soon can I walk on new sod?",
        a: "Keep traffic off it while it roots in. We give you a schedule with the install — it depends on the season and how quickly the roots take, and rushing it undoes the seaming.",
      },
      {
        q: "Do I need irrigation before you install sod?",
        a: "You need a reliable way to water it daily during establishment. In practice that means an irrigation system for anything larger than a small area. We install and adjust irrigation, so it can be handled as part of the same project.",
      },
      {
        q: "Is sod better than seed?",
        a: "It is faster and it holds a slope better. Seed is cheaper and gives you more grass-type options, but you are looking at a full season before it is a lawn. For a bare yard you want to use this year, sod is usually the answer.",
      },
      {
        q: "Can you remove the old lawn first?",
        a: "Yes. Removing the existing turf, grading and prepping the ground is part of the job, and it is the part that determines whether the new lawn lasts.",
      },
    ],
    relatedSlugs: [
      "irrigation",
      "landscape-design-installation",
      "lawn-maintenance",
      "aeration-overseeding",
    ],
  },

  {
    slug: "aeration-overseeding",
    name: "Aeration & Overseeding",
    quoteFormLabel: "Aeration and Overseeding",
    category: "lawn",
    order: 5,
    h1: "Lawn Aeration & Overseeding in Spokane",
    title: "Lawn Aeration & Overseeding | Spokane, WA",
    description:
      "Core aeration and overseeding for compacted, thinning Spokane lawns. Best results from late August through mid-October. Free estimate: (509) 808-3130.",
    summary:
      "Relieves compaction and thickens thin turf — the single highest-return thing you can do for an established Spokane lawn.",
    intro: [
      "If your lawn has gone thin, hard underfoot, or patchy in the same places every year, compaction is usually the reason. Soil packs down under foot traffic, mowing and its own weight until water runs off instead of soaking in and roots cannot push through it.",
      "Aeration pulls plugs of soil out of the ground so air, water and fertiliser reach the root zone. Overseeding immediately afterwards drops new seed into those open holes, where it has real soil contact instead of sitting on the surface. Done together, in the right season, they do more for an established lawn than anything else on this list.",
    ],
    whoFor: [
      "Lawns that feel hard underfoot or shed water instead of absorbing it",
      "Thin turf that has been losing ground to weeds and moss",
      "Heavily used yards — kids, dogs, parking on the grass",
      "Anyone who has been fertilising a lawn that never seems to respond",
    ],
    scope: [
      {
        label: "Core aeration",
        detail:
          "Pulling soil plugs across the lawn to open the root zone. Plugs are left to break down naturally, which returns the soil.",
      },
      {
        label: "Overseeding",
        detail:
          "Applying seed suited to your lawn straight after aeration, while the holes are open and seed-to-soil contact is at its best.",
      },
      {
        label: "Coverage of problem areas",
        detail:
          "Extra attention to thin, bare and high-traffic patches rather than a uniform pass that ignores them.",
      },
      {
        label: "Watering guidance",
        detail:
          "A clear schedule for the germination window, because overseeding that dries out is money on the ground.",
      },
    ],
    localContext: {
      heading: "The Spokane window: late August to mid-October",
      body: [
        "Spokane lawns are cool-season grasses, and they do their best root growth in the fall. Aerating and overseeding from roughly late August through mid-October puts new seed into warm soil with cooling air, falling weed pressure and returning rain — the four conditions that decide whether seed becomes turf.",
        "Spring aeration has its place, particularly on badly compacted ground, but spring overseeding competes with crabgrass and everything else waking up at the same time, and young grass then has to survive its first July. Fall avoids both problems.",
        "The practical consequence: a lawn aerated and overseeded in September comes out of winter noticeably thicker the following April. One that gets it done in June usually does not.",
      ],
    },
    image: {
      src: "/images/projects/striped-lawn-acreage.jpg",
      alt: "A thick, evenly striped lawn on a Spokane-area property maintained by Supernova Landscape",
      width: 1600,
      height: 1200,
    },
    faqs: [
      {
        q: "When is the best time to aerate a lawn in Spokane?",
        a: "Late August through mid-October. Soil is still warm enough for roots to grow, the air has cooled, weed pressure has dropped and the rain is coming back — which is exactly what new seed needs.",
      },
      {
        q: "Should I aerate and overseed at the same time?",
        a: "Yes, if the lawn is thin. Seed dropped into open aeration holes gets real soil contact. Seed broadcast onto compacted ground mostly sits there and feeds birds.",
      },
      {
        q: "Do I need to do anything to prepare?",
        a: "Mark any shallow irrigation lines, invisible dog-fence wire or low-voltage lighting cable so the aerator does not hit them. It also helps if the lawn is watered a day or two before — plugs pull much better from soil that is not bone dry.",
      },
      {
        q: "Should I pick up the plugs?",
        a: "No. Leave them. They break down in a couple of weeks and return soil and organic matter to the surface, which is part of the benefit.",
      },
      {
        q: "How often should this be done?",
        a: "Most Spokane lawns benefit from it annually. Heavy clay soil or a lawn that gets hard use may want it every year without question; a lighter, less-used lawn can often go every other year.",
      },
    ],
    relatedSlugs: [
      "dethatching",
      "lawn-maintenance",
      "sod-installation",
      "seasonal-cleanups",
    ],
  },

  {
    slug: "dethatching",
    name: "Dethatching",
    quoteFormLabel: "Dethatching",
    category: "lawn",
    order: 6,
    h1: "Lawn Dethatching in Spokane",
    title: "Lawn Dethatching & Power Raking | Spokane, WA",
    description:
      "Power raking and dethatching for spongy, patchy Spokane lawns choked by built-up thatch. Free estimate: (509) 808-3130.",
    summary:
      "Pulls out the dead layer strangling the lawn so water, air and nutrients reach the soil again.",
    intro: [
      "Thatch is the mat of dead grass, stems and roots that builds up between the green blades and the soil. A thin layer is normal and useful. Once it gets past about half an inch it starts working against the lawn — shedding water before it soaks in, holding moisture against the crowns, and giving pests and disease somewhere to sit.",
      "The symptoms are recognisable. The lawn feels spongy underfoot, like walking on carpet. Water beads and runs off instead of soaking in. The grass looks thin and pale even though you are watering and feeding it. Dethatching pulls that layer out mechanically so the lawn is growing in soil again.",
    ],
    whoFor: [
      "Lawns that feel spongy or springy to walk on",
      "Turf that stays pale and thin despite regular watering and fertiliser",
      "Yards where water runs off rather than soaking in",
      "Older lawns that have never been dethatched",
    ],
    scope: [
      {
        label: "Assessment first",
        detail:
          "Checking the actual thatch depth before doing anything. Not every thin lawn has a thatch problem, and dethatching one that does not is hard on the turf.",
      },
      {
        label: "Power raking",
        detail:
          "Mechanically lifting the dead layer out without tearing up healthy turf.",
      },
      {
        label: "Debris removal",
        detail:
          "The pulled thatch is raked up and hauled away — it is a surprising volume, and leaving it on the lawn defeats the purpose.",
      },
      {
        label: "Recovery plan",
        detail:
          "Dethatching opens the lawn up. We will tell you whether it should be paired with overseeding and what watering it needs afterwards.",
      },
    ],
    localContext: {
      heading: "Why Spokane lawns build thatch",
      body: [
        "Kentucky bluegrass, which is in most Spokane lawns, spreads by rhizomes and produces more thatch than bunch-forming grasses do. Add a dry climate that slows the microbial breakdown of organic matter, and the layer accumulates faster than it decomposes.",
        "Dethatching is hard on a lawn, so it wants to be done when the grass has the strength to recover — early spring as growth starts, or early fall. Pulling the thatch out of a heat-stressed lawn in mid-July leaves it exposed with no ability to fill back in.",
        "One thing worth being clear about: dethatching and aeration are not the same job. Dethatching removes the layer above the soil. Aeration relieves compaction below it. Plenty of lawns need one and not the other, and we will tell you which.",
      ],
    },
    image: {
      src: "/images/services/dethatching.jpg",
      alt: "A power rake on a lawn mid-dethatch, with the pulled thatch layer visible on the turf",
      width: 748,
      height: 1000,
    },
    faqs: [
      {
        q: "How do I know if my lawn needs dethatching?",
        a: "Push your fingers down through the grass to the soil. If there is more than about half an inch of spongy brown material between the green blades and the dirt, it is worth doing. If the lawn feels firm underfoot and water soaks in normally, it probably is not.",
      },
      {
        q: "Is dethatching the same as aeration?",
        a: "No. Dethatching pulls the dead layer off the top of the soil. Aeration removes plugs of soil to relieve compaction underneath. Some lawns need both, many need only one — we check before recommending either.",
      },
      {
        q: "When should it be done in Spokane?",
        a: "Early spring as the lawn starts actively growing, or early fall. The grass needs to be strong enough to recover and fill back in, which rules out the middle of summer.",
      },
      {
        q: "Will my lawn look bad afterwards?",
        a: "It looks rough for a couple of weeks — that is expected. It has just had a layer of material pulled out of it. Overseeding at the same time speeds up the fill-in considerably.",
      },
    ],
    relatedSlugs: [
      "aeration-overseeding",
      "lawn-maintenance",
      "seasonal-cleanups",
      "irrigation",
    ],
  },

  {
    slug: "seasonal-cleanups",
    name: "Seasonal Clean-Ups",
    quoteFormLabel: "Full service clean-up",
    category: "lawn",
    order: 7,
    featured: true,
    h1: "Spring & Fall Yard Clean-Ups in Spokane",
    title: "Spring & Fall Yard Clean-Ups | Spokane, WA",
    description:
      "Full-service seasonal clean-ups for Spokane, Spokane Valley and Liberty Lake — leaves, beds, debris and haul-away. Free estimate: (509) 808-3130.",
    summary:
      "Full-property reset in spring and fall — leaves, beds, debris and everything hauled away.",
    intro: [
      "A clean-up is a full-property reset, not a leaf blow. Beds get cleared and edged, debris comes out from behind and under everything, the lawn gets cut back to a proper height, and all of it leaves with us.",
      "Most Spokane properties want this twice: once in spring to clear out what winter left behind and open the beds up before growth starts, and once in fall to get leaves and dead material off the lawn before snow sits on it.",
    ],
    whoFor: [
      "Homeowners who want the yard reset before the growing season starts",
      "Properties with mature trees dropping more leaves than a weekend can handle",
      "Rentals and listings that need to look maintained quickly",
      "Yards that have gone a season or more without attention",
    ],
    scope: [
      {
        label: "Leaf and debris removal",
        detail:
          "Lawn, beds, rock areas, along fence lines and out of the corners where it collects and mats down.",
      },
      {
        label: "Bed clean-out",
        detail:
          "Cutting back dead perennial growth, pulling weeds and re-defining bed edges.",
      },
      {
        label: "Hard-surface clearing",
        detail:
          "Driveways, walkways, patios and steps blown clear of needles and debris.",
      },
      {
        label: "Haul-away",
        detail:
          "Everything we remove goes with us. No pile at the curb and no bags for you to deal with.",
      },
      {
        label: "Optional add-ons",
        detail:
          "Fresh mulch, aeration and overseeding, or a sprinkler blow-out can be scheduled alongside the same visit.",
      },
    ],
    localContext: {
      heading: "Spokane's two clean-up seasons",
      body: [
        "Fall is the one that matters most here. Spokane's mature pines, maples and locusts drop heavily, and a mat of wet leaves left on the lawn under snow blocks light and traps moisture against the crowns all winter. What you find in April is a patch of dead, matted turf that then has to be repaired.",
        "There is a sequencing question too. Clearing too early means doing it twice; waiting too long means racing the first snow. Late October into November is usually the sweet spot, and it lines up conveniently with sprinkler blow-out season.",
        "Spring clean-up is about getting sand, gravel and winter debris off the lawn and opening the beds up before the first growth push in April. Doing it before things leaf out is much faster — and cheaper — than doing it after.",
      ],
    },
    /* Was mulch-island-bed.jpg, which is only 500x375 — visibly soft in the
       homepage ribbon, where a panel can open to roughly 45vw, and shot on a
       grey day over a dormant lawn. side-yard-after.jpg is the same job done
       well at 1600x1200: cleared bed, fresh mulch, cut edge, in sunlight. */
    image: {
      src: "/images/projects/side-yard-after.jpg",
      alt: "A Spokane side yard after a seasonal clean-up by Supernova Landscape — the bed cleared, freshly mulched and edged against a cut lawn",
      width: 1600,
      height: 1200,
    },
    faqs: [
      {
        q: "When should I book a fall clean-up in Spokane?",
        a: "Late October into November for most properties — after the bulk of the leaves are down but before snow settles on them. Heavily treed lots sometimes want two passes.",
      },
      {
        q: "Do you take the debris away?",
        a: "Yes. Everything we clear leaves with us. There is no pile at the curb and nothing for you to arrange disposal for.",
      },
      {
        q: "Can I get a clean-up without signing up for weekly mowing?",
        a: "Absolutely. Plenty of people book clean-ups as one-off jobs in spring and fall and handle mowing themselves.",
      },
      {
        q: "Can you combine this with a sprinkler blow-out?",
        a: "Yes, and it makes sense to. Both jobs land in the same part of the fall, and doing them on one visit saves scheduling twice.",
      },
    ],
    relatedSlugs: [
      "lawn-maintenance",
      "irrigation",
      "aeration-overseeding",
      "residential-snow-removal",
    ],
  },

  {
    slug: "residential-snow-removal",
    name: "Residential Snow Removal",
    quoteFormLabel: "Residential Snow Removal",
    category: "snow",
    order: 8,
    h1: "Residential Snow Removal in Spokane",
    title: "Residential Snow Removal | Spokane, WA",
    description:
      "Driveway, sidewalk and entryway snow clearing plus de-icing for Spokane, Spokane Valley and Liberty Lake homes. Seasonal or on-demand. Free estimates.",
    summary:
      "Driveways, sidewalks and entryways cleared, with de-icing — on a seasonal agreement or call by call.",
    intro: [
      "Spokane averages around 45 inches of snow a year. Some winters it arrives politely across a dozen small storms; some winters it drops eight inches overnight in December and you are standing in the driveway at 6am deciding whether you are getting to work.",
      "Supernova clears residential driveways, sidewalks and entryways, and handles de-icing on the surfaces where refreeze is a real risk. You can set up a seasonal agreement so it is simply handled, or call us when you need it.",
    ],
    whoFor: [
      "Homeowners who would rather not own or maintain a snow blower",
      "Anyone who cannot safely shovel a driveway — or should not be",
      "Households leaving before dawn who need the driveway clear early",
      "Owners of second homes and rentals who need the walks kept legal and safe while away",
    ],
    scope: [
      {
        label: "Driveway clearing",
        detail:
          "Cleared to the surface and pushed to a spot that will not block the drive when it melts and refreezes.",
      },
      {
        label: "Sidewalks and walkways",
        detail:
          "Public sidewalk frontage and the path from the drive to your door.",
      },
      {
        label: "Entryways and steps",
        detail:
          "Porches, steps and landings — the surfaces where a fall actually happens.",
      },
      {
        label: "Ice control",
        detail:
          "De-icing applied to walkways and problem surfaces prone to refreeze.",
      },
      {
        label: "Seasonal or on-demand",
        detail:
          "A seasonal agreement for the whole winter, or call-by-call service when you want it.",
      },
    ],
    localContext: {
      heading: "The part of a Spokane winter people underestimate",
      body: [
        "It is rarely the snowfall itself that causes the problem. It is the melt-and-refreeze cycle that follows — a sunny afternoon takes the top layer to water, it runs to the low point of the driveway or the bottom of the steps, and overnight that becomes a sheet of ice exactly where you walk.",
        "That is why where snow gets pushed matters as much as whether it gets cleared. Piling it uphill of the driveway apron means meltwater crosses the surface you just cleared. It is a small decision that determines whether you are dealing with ice for the rest of the week.",
        "The other thing worth knowing: berms. City plows clear the street and leave a compacted ridge across the end of every driveway, often after your driveway has already been cleared. It is dense, heavy snow and it is the part most homeowners are least equipped for.",
      ],
    },
    image: {
      src: "/images/services/snow-sidewalk.jpg",
      alt: "A sidewalk being cleared with a walk-behind snow blower after a Spokane snowfall",
      width: 1920,
      height: 800,
    },
    faqs: [
      {
        q: "Do you offer seasonal snow agreements or one-off service?",
        a: "Both. A seasonal agreement means it is handled all winter without you calling. On-demand works if you only want help with the bigger storms.",
      },
      {
        q: "Do you clear the berm the city plow leaves?",
        a: "Yes — that compacted ridge across the driveway apron is part of clearing a driveway properly. Talk to us about it when you set up service so expectations are clear.",
      },
      {
        q: "Do you apply salt or de-icer?",
        a: "We provide ice control on walkways and surfaces prone to refreeze. Which product and how much depends on the surface and the temperature.",
      },
      {
        q: "When should I set up snow service?",
        a: "Before it snows. Once the first real storm hits, everyone is calling at once. Late summer and early fall is when we start setting up the winter schedule.",
      },
      {
        q: "Do you do commercial properties as well?",
        a: "We do — parking lots, business entrances and access areas. See our commercial snow removal page for how that works.",
      },
    ],
    relatedSlugs: [
      "commercial-snow-removal",
      "seasonal-cleanups",
      "irrigation",
      "lawn-maintenance",
    ],
  },

  {
    slug: "commercial-snow-removal",
    name: "Commercial Snow Removal",
    quoteFormLabel: "Commercial Snow Removal",
    category: "snow",
    order: 9,
    featured: true,
    h1: "Commercial Snow Removal in Spokane & Spokane Valley",
    title: "Commercial Snow Removal & Ice Control | Spokane",
    description:
      "Parking lot plowing, sidewalk clearing and de-icing for Spokane and Spokane Valley businesses, property managers and HOAs. Seasonal contracts or per-event.",
    summary:
      "Parking lots, sidewalks, entrances and access areas cleared and de-iced for Spokane businesses and property managers.",
    intro: [
      "For a commercial property, snow is a liability question before it is a maintenance question. An unplowed lot means customers cannot reach you and staff cannot park. An uncleared walkway or a refrozen entrance is where slip-and-fall claims come from.",
      "Supernova handles commercial snow removal across Spokane and Spokane Valley — parking lots, sidewalks, business entrances and access areas — for businesses of all sizes, on a seasonal contract or per-event.",
    ],
    whoFor: [
      "Retail and restaurant properties that need the lot open before customers arrive",
      "Offices and medical buildings with staff and patient access to keep clear",
      "Property managers and HOAs responsible for multiple sites or shared drives",
      "Industrial and warehouse sites with loading access and yard space to keep usable",
      "Churches, schools and community buildings with concentrated arrival times",
    ],
    scope: [
      {
        label: "Parking lot plowing",
        detail:
          "Lots cleared and snow relocated to stacking areas that do not consume the spaces you need or drain across your traffic lanes.",
      },
      {
        label: "Sidewalks and walkways",
        detail:
          "Pedestrian routes, frontage and connecting paths cleared — the surfaces that carry the most liability.",
      },
      {
        label: "Entrances and access areas",
        detail:
          "Building entries, ADA access routes, loading areas and approaches kept usable.",
      },
      {
        label: "Ice control",
        detail:
          "De-icing across lots, walkways and entries where refreeze creates a hazard.",
      },
      {
        label: "Seasonal contracts or per-event",
        detail:
          "A contract for the season, or service called per storm — whichever suits how your property is budgeted.",
      },
    ],
    sections: [
      {
        heading: "What we need to know to quote your property",
        body: [
          "Commercial snow pricing is site-specific, so a real number needs a look at the site rather than a square-footage guess. The things that drive it are:",
        ],
        // rendered as a list by the page template
      },
      {
        heading: "Why properties switch providers",
        body: [
          "In our experience the reason is almost never price. It is that the previous contractor stopped answering the phone during the storm that mattered, or serviced the property on their own schedule rather than around when the business actually opened.",
          "So the useful questions to ask any snow contractor — including us — are simple ones. Who answers the phone at 4am? What order do properties get serviced in, and where is mine in it? Where is the snow being stacked, and how many parking spaces does that cost me? What triggers a de-icing application?",
          "Get those answered in writing before you sign anything, with whoever you hire.",
        ],
      },
    ],
    localContext: {
      heading: "Planning a Spokane commercial snow season",
      body: [
        "Spokane averages roughly 45 inches of snow a season, but the distribution is what affects a commercial property. A season can deliver most of its total in two or three large events, or spread it across many small ones, and those two patterns produce very different service and de-icing needs.",
        "The practical consequence is that a snow plan built only around large storms leaves you exposed. Two inches overnight, followed by a partial melt and a refreeze at dawn, creates a more dangerous surface than eight inches of cold, dry snow — and it is far more common.",
        "Contracts and routes are typically set well before the first snow. August and September is when Spokane property managers get their winter arrangements settled; by the time the first storm lands, most contractors' routes are already full.",
      ],
    },
    image: {
      src: "/images/services/snow-plow-truck.jpg",
      alt: "A plow truck clearing accumulated snow from a paved surface during a winter storm",
      width: 1920,
      height: 1280,
    },
    heroImage: {
      src: "/images/heroes/commercial-snow.jpg",
      alt: "A plow truck clearing accumulated snow from a paved surface during a winter storm",
      width: 2400,
      height: 1000,
    },
    faqs: [
      {
        q: "Do you offer seasonal contracts or per-event pricing?",
        a: "Both. Seasonal contracts give you a fixed, budgetable cost for the winter. Per-event billing charges by the service. Which one is better depends on your property and how your budget is structured, and we are happy to talk through both.",
      },
      {
        q: "When should a Spokane business arrange snow service?",
        a: "Before the season starts — August and September for most properties. Routes are built around geography and timing, and once they are set they fill up.",
      },
      {
        q: "Can you handle sidewalks as well as the parking lot?",
        a: "Yes. Sidewalks, entrances and access routes are part of commercial service, and they matter more than the lot from a liability standpoint.",
      },
      {
        q: "Do you provide de-icing?",
        a: "We do, across lots, walkways and entries. Application depends on surface, temperature and conditions rather than a fixed schedule.",
      },
      {
        q: "How do I get a quote for my property?",
        a: "Call (509) 808-3130 or send a request through the quote form and select Commercial Snow Removal. Commercial estimates are site-specific, so we will want to look at the property and understand how your business runs before quoting.",
      },
    ],
    relatedSlugs: [
      "residential-snow-removal",
      "seasonal-cleanups",
      "lawn-maintenance",
      "irrigation",
    ],
  },
];

/** Factors that drive a commercial snow quote — rendered on that page. */
export const commercialSnowQuoteFactors = [
  "Total area of lot, sidewalks and access routes",
  "Where snow can be stacked without losing parking or draining across traffic lanes",
  "Your operating hours, and how early the property has to be open",
  "Obstacles on site — islands, curbing, bollards, drive-through lanes, loading docks",
  "Surface type, and how much of the property is pedestrian rather than vehicle",
  "Whether you want seasonal contract pricing or per-event billing",
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug);
}

export const servicesByCategory: Record<
  Service["category"],
  { label: string; blurb: string; services: Service[] }
> = {
  lawn: {
    label: "Lawn Care & Maintenance",
    blurb: "Keeping an established lawn healthy through a Spokane season.",
    services: services.filter((s) => s.category === "lawn"),
  },
  landscape: {
    label: "Landscape Design & Installation",
    blurb: "Rebuilding a yard — beds, rock, plantings and new lawn.",
    services: services.filter((s) => s.category === "landscape"),
  },
  irrigation: {
    label: "Irrigation",
    blurb: "Repairs, upgrades, new systems, start-ups and blow-outs.",
    services: services.filter((s) => s.category === "irrigation"),
  },
  snow: {
    label: "Snow & Ice",
    blurb: "Residential and commercial clearing through the winter.",
    services: services.filter((s) => s.category === "snow"),
  },
};

/**
 * The canonical service list for BOTH quote forms and the contact form.
 * The old site had two forms offering different services; this is the fix.
 */
export const quoteServiceOptions: { value: string; label: string }[] = [
  ...services
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ value: s.slug, label: s.quoteFormLabel })),
  // Offered on the current site's contact form but without a dedicated page.
  { value: "sprinkler-blowout", label: "Sprinkler Turn-On / Blow-Out" },
  { value: "other", label: "Something else" },
];
