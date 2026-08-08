import type { Guide } from "./types";

/**
 * Five starter guides, chosen because each one maps to a real Spokane seasonal
 * search with commercial intent behind it. Deliberately a small number written
 * properly rather than a large number written thinly.
 *
 * Regional timing claims (blow-out window, aeration window, snowfall normals,
 * cool-season grass types) reflect published Inland Northwest sources. Nothing
 * here claims anything about Supernova that is not on the rest of the site.
 */
export const guides: Guide[] = [
  {
    slug: "spokane-sprinkler-blowout-timing",
    title: "When to Blow Out Your Sprinklers in Spokane",
    metaTitle: "When to Blow Out Sprinklers in Spokane",
    description:
      "The Spokane sprinkler blow-out window runs from late September into early November. Why the timing matters and what happens if you skip it.",
    standfirst:
      "Every year a handful of Spokane homeowners find out in April that they skipped this. Here is the window, and why it is narrower than people think.",
    updated: "2026-08-08",
    readingMinutes: 5,
    sections: [
      {
        heading: "The short answer",
        body: [
          "Across the Inland Northwest, sprinkler blow-out season runs from roughly late September into early November. That is the window between the point your lawn stops needing regular irrigation and the point a hard freeze can reach water sitting in your lines.",
          "If you want a convenient date rather than whatever is left, call in September. Every irrigation company in Spokane County is booked solid through October, and the calls that come in after the first freeze warning are all competing for the same handful of slots.",
        ],
      },
      {
        heading: "Why it is not optional here",
        body: [
          "Water expands as it freezes. An irrigation system holds water in the lateral lines, in the heads, in the valves and in the backflow assembly — all of it either underground or against an exterior wall.",
          "When that water freezes it splits whatever is containing it. Polyethylene pipe cracks. Brass fittings fracture. Backflow assemblies, which sit above ground and are the most exposed component on the whole system, are also usually the most expensive single part to replace.",
          "The failure is silent. Nothing happens in December, because the system is off and the break is holding no pressure. You find out the following April when you turn the water on and a zone floods the yard, or the backflow starts pouring water down the side of the house.",
        ],
      },
      {
        heading: "What a blow-out actually involves",
        body: [
          "The water supply to the system is shut off and isolated. Compressed air is then introduced and each zone is run in turn, pushing the standing water out through the heads until the zone runs dry.",
          "The zone-by-zone part is the part that matters, and it is where a rushed job falls down. A system with eight zones needs all eight cleared; blowing three of them and calling it done leaves five full of water. Air also has to be delivered at adequate volume rather than just high pressure — a small consumer compressor can make a lot of noise without actually moving the water out of a lateral line.",
        ],
        list: [
          "Water supply shut off and isolated at the backflow",
          "Compressed air introduced into the system",
          "Each zone run in sequence until it blows dry",
          "Backflow assembly drained and valves left in the correct position",
          "Controller shut down or set to the off position for the season",
        ],
      },
      {
        heading: "How to tell if you have left it too late",
        body: [
          "The trigger is not the calendar, it is the forecast. A light overnight frost on the lawn is not a problem for buried pipe. A hard freeze — several hours well below freezing, especially repeated across consecutive nights — is what reaches the shallow parts of the system and the above-ground backflow.",
          "If a hard freeze has already passed and the system has not been blown out, it is still worth doing rather than writing the season off. The damage is cumulative: one freeze may have done nothing, and clearing the lines now prevents the next twelve from finishing the job.",
        ],
      },
      {
        heading: "Book it with your fall clean-up",
        body: [
          "The blow-out window and the fall clean-up window overlap almost exactly — late October into November is the practical middle of both. If you are scheduling one, it is worth asking about the other on the same visit rather than arranging two separate trips.",
        ],
      },
    ],
    relatedServiceSlugs: ["irrigation", "seasonal-cleanups", "lawn-maintenance"],
    faqs: [
      {
        q: "Can I blow out my own sprinklers with a shop compressor?",
        a: "Most shop compressors deliver pressure but not enough sustained volume to clear a lateral line properly, and over-pressurising a system will damage heads and fittings. It is doable with the right equipment; it is a common way to cause the damage you were trying to prevent without it.",
      },
      {
        q: "What if I just drain the system instead?",
        a: "Manual and automatic drains help but rarely clear everything, because lines are not always laid at a consistent fall and water sits in the low points. Compressed air is what actually empties them.",
      },
      {
        q: "Do I need to do anything before you arrive?",
        a: "Make sure the backflow and the controller are accessible, and let us know if any zones were already misbehaving during the season — a blow-out is a good opportunity to diagnose them while we are on site.",
      },
    ],
  },

  {
    slug: "lawn-aeration-overseeding-spokane",
    title: "Aeration and Overseeding Timing in Spokane",
    metaTitle: "When to Aerate & Overseed a Lawn in Spokane",
    description:
      "Late August to mid-October is the Spokane window for aeration and overseeding. Why fall beats spring, and how to tell if your lawn needs it.",
    standfirst:
      "Aerating and overseeding is the highest-return thing you can do to an established Spokane lawn — if you do it in the right eight weeks.",
    updated: "2026-08-08",
    readingMinutes: 6,
    sections: [
      {
        heading: "The window: late August to mid-October",
        body: [
          "Spokane lawns are cool-season grasses — Kentucky bluegrass, perennial ryegrass and tall fescue, usually mixed. Cool-season grass does its heaviest root growth in autumn, not spring, and that is what makes the fall window so much more productive than the spring one.",
          "From late August into mid-October, four things line up at once: the soil is still warm enough for seed to germinate, the air has cooled so young grass is not immediately heat-stressed, weed pressure has dropped away, and the rain is coming back. Miss that and you are asking seed to establish under conditions that are working against it.",
        ],
      },
      {
        heading: "Why spring is the weaker option",
        body: [
          "Spring aeration is genuinely useful on badly compacted ground, and if that is your situation it is worth doing. Spring overseeding is a different matter.",
          "Seed sown in April is germinating at the same moment as crabgrass and every broadleaf weed in the soil, and it loses that competition more often than not. Anything that does establish then has to survive its first July as a shallow-rooted seedling. Fall-sown grass goes into winter with roots down and comes out in April as established turf.",
        ],
      },
      {
        heading: "Does your lawn actually need it?",
        body: [
          "Two different problems get confused here, and they have different fixes.",
          "Compaction is a soil problem. The ground feels hard underfoot, water pools or runs off rather than soaking in, and the same areas thin out every year — usually paths people walk, where dogs run, or anywhere a vehicle has parked. That is what aeration addresses.",
          "Thatch is a surface problem: a spongy brown layer of dead material between the green blades and the soil. If it is more than about half an inch thick, dethatching is the answer, not aeration. Push your fingers down through the grass and you can feel which one you have.",
        ],
        list: [
          "Hard underfoot, water runs off — compaction, aerate",
          "Spongy and springy underfoot — thatch, dethatch",
          "Thin and patchy but soil feels normal — overseed, and check your irrigation coverage",
          "Thin under a mature tree — likely shade and root competition, not soil",
        ],
      },
      {
        heading: "Why the two jobs belong together",
        body: [
          "Aeration pulls plugs of soil out of the ground, leaving open holes across the lawn. Overseeding immediately afterwards drops seed straight into those holes, where it sits in contact with soil at the right depth, sheltered from wind and birds.",
          "Broadcasting the same seed onto un-aerated ground puts most of it on the surface, where germination rates are far lower. Same seed, same day, dramatically different result — which is why the two are almost always sold together.",
        ],
      },
      {
        heading: "The two weeks after matter most",
        body: [
          "Germination is the vulnerable period, and the most common way overseeding fails is that the seedbed dried out on day four.",
          "New seed needs the top layer of soil kept consistently damp — light, frequent watering rather than the deep, infrequent cycle an established lawn wants. Once the new grass is up and has been mown a couple of times, you can transition back to normal watering.",
          "Leave the soil plugs where they fall. They look untidy for a week or two, then break down and return soil and organic matter to the surface, which is part of the point.",
        ],
      },
    ],
    relatedServiceSlugs: [
      "aeration-overseeding",
      "dethatching",
      "lawn-maintenance",
      "irrigation",
    ],
    faqs: [
      {
        q: "How often should a Spokane lawn be aerated?",
        a: "Most benefit from it annually. A lawn on heavy soil or one that gets hard use from kids, dogs or parking should be done every year without much debate. A lighter, less-trafficked lawn can usually go every other year.",
      },
      {
        q: "Can I mow right after overseeding?",
        a: "Wait until the new grass has grown enough to be cut at your normal height, and make the first pass with a sharp blade. Mowing too early pulls seedlings out before their roots have taken.",
      },
      {
        q: "Should I fertilise at the same time?",
        a: "A fall application timed with overseeding supports establishment. What matters more is that the seedbed stays damp — fertiliser will not rescue seed that dried out.",
      },
    ],
  },

  {
    slug: "fall-yard-cleanup-spokane",
    title: "The Spokane Fall Yard Clean-Up, in Order",
    metaTitle: "Fall Yard Clean-Up Checklist for Spokane",
    description:
      "What to do before snow arrives in Spokane, and in what order — leaves, beds, the lawn, the irrigation system, and when to book each one.",
    standfirst:
      "Fall clean-up in Spokane has an order to it. Doing the right things in the wrong sequence means doing several of them twice.",
    updated: "2026-08-08",
    readingMinutes: 6,
    sections: [
      {
        heading: "Why fall matters more than spring here",
        body: [
          "Spokane's older neighbourhoods are full of mature maples, locusts and pines, and they drop a genuinely large volume of material. Left on the lawn when snow settles, wet leaves mat into a solid layer that blocks light and holds moisture against the grass crowns for months.",
          "What emerges in April is a flattened, dead patch shaped exactly like the pile that sat on it. That is a repair job — usually aeration, overseeding and a slow recovery through spring — that a couple of hours in November would have avoided.",
        ],
      },
      {
        heading: "Late August to mid-October: aeration and overseeding",
        body: [
          "This one comes first because its window closes earliest. If the lawn is thinning or compacted, aeration and overseeding needs to happen while the soil is still warm enough for seed to germinate.",
          "It is also the one job on this list that is genuinely time-critical. A clean-up done two weeks late is still a clean-up; overseeding done three weeks late is money spent on seed that will not come up.",
        ],
      },
      {
        heading: "Late September to early November: sprinkler blow-out",
        body: [
          "Get the irrigation system cleared before a hard freeze can reach the water sitting in it. This window overlaps with the clean-up window, which is convenient — both can often be handled on the same visit.",
          "Book it earlier in the range than you think you need to. Spokane irrigation schedules fill through October and the last two weeks are a scramble.",
        ],
      },
      {
        heading: "Late October to November: the clean-up itself",
        body: [
          "The timing question is how many passes you need. Clear too early and you will be doing it again in three weeks; wait for every last leaf and you are racing the first snow.",
          "For most properties, one pass in that late-October-to-November band catches the bulk of it. Heavily treed lots — anywhere on the South Hill with three or four mature trees — often want two.",
        ],
        list: [
          "Leaves off the lawn, beds, rock areas and fence lines",
          "Dead perennial growth cut back and beds cleared out",
          "Bed edges re-cut so they hold their shape through winter",
          "Needles and debris blown off driveways, walkways, patios and steps",
          "Gutters and downspout outlets checked while the ladder is out",
          "All of it hauled away rather than piled at the curb",
        ],
      },
      {
        heading: "The last mow of the season",
        body: [
          "Growth stops when soil temperatures fall, usually well into autumn in Spokane. The final cut of the year wants to be slightly shorter than your summer height — long grass mats under snow and is more prone to snow mould, while grass cut too short goes into winter with less to draw on.",
          "Do not scalp it. A modest drop for the last cut or two is the whole adjustment.",
        ],
      },
      {
        heading: "Before the first snow",
        body: [
          "Two things worth doing while the ground is still clear. First, note where the snow is going to be pushed or piled, and make sure that is not somewhere it will melt back across a driveway or walkway. Second, if you are arranging snow removal for the season, arrange it now — routes fill before the first storm, not after it.",
        ],
      },
    ],
    relatedServiceSlugs: [
      "seasonal-cleanups",
      "irrigation",
      "aeration-overseeding",
      "residential-snow-removal",
    ],
  },

  {
    slug: "commercial-snow-removal-planning-spokane",
    title: "Planning a Commercial Snow Season in Spokane",
    metaTitle: "Commercial Snow Removal Planning | Spokane",
    description:
      "What Spokane property managers should settle before winter: contract structure, snow stacking, service timing and de-icing triggers.",
    standfirst:
      "For a commercial property, snow is a liability question before it is a maintenance question. Most of the decisions that matter get made in August.",
    updated: "2026-08-08",
    readingMinutes: 7,
    sections: [
      {
        heading: "Start in August, not November",
        body: [
          "Snow routes are built around geography and timing. A contractor sequences properties so the ones that open earliest get serviced first, and clusters sites that are close together so a crew is not crossing the county mid-storm.",
          "Once that route is built it is full. A property that calls in December is asking to be inserted into a sequence that was designed without it, which means either a poor position in the order or a decline. Spokane property managers who get good service in January arranged it in August.",
        ],
      },
      {
        heading: "Seasonal contract or per-event?",
        body: [
          "Neither is universally better. They allocate risk differently.",
          "A seasonal contract is a fixed price for the winter regardless of how much it snows. You get a budget number you can plan against and you are insulated from a heavy season. In a light season you will have paid for snow that did not fall.",
          "Per-event billing charges for each service. You pay for what you get, which is efficient in a mild winter and uncomfortable in a heavy one — and a heavy winter is exactly when an unbudgeted line item is hardest to absorb.",
          "The deciding question is usually not which is cheaper on average. It is whether your organisation would rather have a predictable cost or a variable one.",
        ],
      },
      {
        heading: "Where does the snow go?",
        body: [
          "This is the most under-discussed part of a commercial snow plan and the one that causes the most friction in February.",
          "Cleared snow has to be stacked somewhere, and on a full lot that somewhere is parking spaces. By mid-season those piles can be substantial, and they do not disappear until spring. Agree in advance how many spaces you are prepared to lose and where.",
          "Drainage matters just as much. A pile placed uphill of a traffic lane or an entrance sends meltwater across that surface every sunny afternoon, and that water refreezes at dusk into exactly the sheet of ice you are paying to avoid.",
        ],
      },
      {
        heading: "Ice control is the liability question",
        body: [
          "Most slip-and-fall exposure on a commercial property is not on the lot. It is on the sidewalk, at the entrance, and on the accessible route — the pedestrian surfaces.",
          "It is also rarely caused by a big storm. Two inches overnight, a partial melt in the afternoon and a refreeze at dawn produces a far more dangerous surface than eight inches of cold, dry snow, and it happens many more times per season.",
          "So the question to settle with a contractor is not just whether de-icing is included, but what triggers an application. A plan that responds only to snowfall totals will miss the conditions that actually generate claims.",
        ],
      },
      {
        heading: "Questions worth asking any snow contractor",
        body: [
          "Ask these of whoever you are considering — including us — and get the answers in writing before you sign.",
        ],
        list: [
          "Who answers the phone at 4am during a storm, and how fast?",
          "What position is my property in your service sequence, and what determines that?",
          "Where will snow be stacked, and how many parking spaces does that cost me?",
          "What triggers a de-icing application — snowfall depth, temperature, or a site check?",
          "What is and is not included: sidewalks, entrances, ADA routes, loading areas?",
          "How is service documented, so I have a record if a claim is ever made?",
          "What happens in an unusually heavy season under this contract structure?",
        ],
      },
      {
        heading: "What Spokane's snowfall actually looks like",
        body: [
          "Spokane averages roughly 45 inches of snow a season. The average is much less useful than the distribution, because a season can deliver most of that in two or three large events or spread it across many small ones — and those produce very different service and de-icing loads.",
          "A plan built only around large storms leaves the more common scenario uncovered. Plan for the frequent small events and the refreeze cycles, and the large storms are already accounted for.",
        ],
      },
    ],
    relatedServiceSlugs: ["commercial-snow-removal", "residential-snow-removal"],
    faqs: [
      {
        q: "How do I get a commercial snow quote for my Spokane property?",
        a: "Call (509) 808-3130 or send a request through the quote form and select Commercial Snow Removal. Commercial pricing is site-specific, so we will want to look at the property, understand your operating hours and identify stacking areas before quoting.",
      },
      {
        q: "Can one contractor handle multiple sites?",
        a: "Yes, and clustering helps — sites close together are easier to service early in a storm because a crew is not crossing the county between them.",
      },
    ],
  },

  {
    slug: "preparing-your-spokane-lawn-for-winter",
    title: "Getting a Spokane Lawn Through Winter",
    metaTitle: "How to Prepare a Spokane Lawn for Winter",
    description:
      "What actually protects a Spokane lawn over winter — final mowing height, clearing leaves, snow mould, where you pile snow, and what to skip.",
    standfirst:
      "Most winter lawn damage in Spokane is not caused by cold. It is caused by things sitting on the grass for four months.",
    updated: "2026-08-08",
    readingMinutes: 5,
    sections: [
      {
        heading: "Cold is not the problem",
        body: [
          "Kentucky bluegrass, perennial ryegrass and tall fescue — the grasses in essentially every Spokane lawn — are built for this climate. They go dormant and come back. A cold winter, on its own, does not kill them.",
          "What does the damage is what sits on top of them. Matted leaves, compacted snow piles, and the wet, oxygen-starved conditions underneath both. Almost every bare patch found in April traces back to something that spent the winter lying on that spot.",
        ],
      },
      {
        heading: "Get the leaves off, properly",
        body: [
          "This is the single highest-value winter prep job and it is not close. A layer of wet leaves under snow blocks light, traps moisture against the crowns and creates ideal conditions for snow mould.",
          "It also has to be genuinely off, not just moved. Leaves raked into a pile at the edge of the lawn and left there will kill the grass under the pile, which tends to be a strip along a fence or a bed edge where it is very visible in spring.",
        ],
      },
      {
        heading: "The last cut of the year",
        body: [
          "Take the final cut or two slightly shorter than your summer height. Long grass folds over under snow and mats, which is what snow mould grows in.",
          "But do not scalp it. Grass going into dormancy is living on what it stored, and cutting it hard removes the leaf area it built that reserve with. A modest reduction is the entire adjustment — this is a small correction, not a big one.",
        ],
      },
      {
        heading: "Snow mould, and what to do about it in spring",
        body: [
          "Snow mould shows up as matted, straw-coloured or greyish circular patches as snow retreats. It thrives under prolonged snow cover on long grass and leaf litter, which is precisely what the two jobs above are preventing.",
          "If you find it in spring, the usual response is straightforward: rake the matted areas open so they dry out and get airflow, and in most cases the lawn recovers on its own as growth resumes. Badly affected patches may need overseeding.",
        ],
      },
      {
        heading: "Watch where the snow gets piled",
        body: [
          "A shovelled or plowed pile is dense, compacted and slow to melt, and grass under it sits in cold, saturated, airless conditions for weeks longer than the rest of the lawn.",
          "Put the piles in the same places each year if you can, and try to make those places gravel, beds or the least visible corner of the lawn rather than the middle of the front yard. If you have a contractor clearing your driveway, tell them where you want it stacked — it is a decision that is easy to make in November and impossible to undo in February.",
        ],
      },
      {
        heading: "What not to bother with",
        body: [
          "Two things people ask about most. Covering a lawn for winter is not necessary here and generally does more harm than good — a tarp creates exactly the airless, wet conditions you are trying to avoid.",
          "And there is no benefit to walking on frozen grass. Traffic on frost-covered turf breaks the blades, and the footprints are visible for weeks. Not a disaster, but if you can route around it, do.",
        ],
      },
    ],
    relatedServiceSlugs: [
      "seasonal-cleanups",
      "lawn-maintenance",
      "aeration-overseeding",
      "residential-snow-removal",
    ],
  },
];

export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));

export function getGuide(slug: string): Guide | undefined {
  return guideBySlug.get(slug);
}
