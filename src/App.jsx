import { useState } from "react";

// ─── WCAG 2.2 DESIGN SYSTEM ──────────────────────────────────
// Typography scale — minimum 14px body, 12px labels (WCAG 1.4.4)
// Line-height ≥ 1.5× font-size (WCAG 1.4.12)
// Touch targets ≥ 44×44px (WCAG 2.5.5)
const FS = {
  micro:   12,   // was 8–9  — labels, tags
  sm:      14,   // was 10   — captions, metadata
  body:    16,   // was 11   — primary body text
  bodyLg:  17,   // was 12   — emphasized body
  title:   20,   // was 13–14 — card/section titles
  head:    24,   // was 16–18 — sub-headings
  display: 36,   // was 26–28 — phase titles
  hero:    48,   // was 34–38 — display / stat numbers
};
const LH = { tight: 1.3, base: 1.6, loose: 1.75 };

const C = {
  bg:    "#07070E",
  surf:  "#0D0D1B",
  surf2: "#111120",
  bdr:   "#1D1D35",
  text:  "#DDDDF2",
  muted: "#7070AA",
  acc:   "#F59E0B",
};

const LAST_UPDATED = "14 Apr 2026";
const VERSION      = "V6";

// ─── DATA ─────────────────────────────────────────────────────
const TEAM = [
  { short:"TL+PM", note:"Bridge to BO · 3 hats · PM2 shields bandwidth", color:"#F59E0B", risk:true },
  { short:"PM2",   note:"Artefact owner · Scope guardian · Facilitates sessions", color:"#10B981" },
  { short:"UXR",   note:"Hawker field interviews · Synthesis · Personas", color:"#38BDF8" },
  { short:"DEV1",  note:"Lead build · Claude Code · Architecture", color:"#A78BFA" },
  { short:"DEV2",  note:"UI · Figma Make · Vibe coding · Booth device", color:"#F472B6" },
];

const CRITERIA = [
  { id:"A", label:"Problem-Solution Fit",  color:"#38BDF8", phases:"1–3" },
  { id:"B", label:"Business Owner Buy-in", color:"#10B981", phases:"0–1" },
  { id:"C", label:"Prototype Quality",     color:"#F59E0B", phases:"4–6" },
];

const STRAT = {
  vision: "To become Singapore's essential procurement infrastructure for hawker operators — empowering 13,000+ stalls to access Tier-1 bulk pricing through collective demand, sustaining the affordability and cultural viability of UNESCO-recognised hawker culture for future generations.",
  mission: "HawkerGB eliminates the procurement cost disadvantage of small-scale hawker operators by aggregating fragmented individual demand into unified market power, enabling suppliers to compete transparently for collective orders — without removing hawker autonomy or quality control.",
  positioning: "HawkerGB is a policy-technology complement: the market-based execution of a centralised procurement model that Singapore's Parliament has debated for years but could not implement through policy alone.",
  evidence: [
    { stat:"56%",    label:"of hawker operating costs are raw materials",        src:"NEA survey, cited in Parliament Jul 2024 & Nov 2024",        color:"#EF4444" },
    { stat:"20%",    label:"of operating costs are manpower",                    src:"NEA survey 2022 — second largest cost driver",               color:"#F97316" },
    { stat:"6.1%",   label:"hawker food inflation in 2023",                      src:"Highest since 2008 — Parliament, Jul 2024",                  color:"#F59E0B" },
    { stat:"8.7%",   label:"food import price rise in 2022",                     src:"COVID-19 + Russia-Ukraine war supply chain disruptions",     color:"#A78BFA" },
    { stat:"$3–4K",  label:"average hawker net monthly income",                  src:"NEA data — direct impact of every ingredient cost spike",    color:"#38BDF8" },
    { stat:"15–20%", label:"estimated collective procurement saving potential",  src:"Tier-1 bulk vs individual spot market pricing differential", color:"#10B981" },
    { stat:"Dec 2020", label:"UNESCO Intangible Cultural Heritage inscription",  src:"Singapore hawker culture — first SG UNESCO listing",         color:"#F59E0B" },
    { stat:"123",    label:"NEA-managed hawker centres",                         src:"13,000+ stalls across Singapore",                           color:"#38BDF8" },
  ],
  problemDeepDive: {
    user:         "13,000+ hawker stall operators across 123 hawker centres and markets in Singapore",
    coreJob:      "Procure fresh, high-quality ingredients daily or weekly at prices that allow them to sell meals affordably while sustaining their livelihoods",
    painPoint:    "As fragmented, independent micro-SMEs, hawkers purchase small volumes from various wholesalers and wet markets at volatile spot market prices — lacking the purchasing power to access Tier-1 bulk discounts that large F&B operators command",
    consequence:  "Raw materials at 56% of operating costs, combined with rigid social expectation of $3.00–$5.50 meals, creates an unsustainable margin squeeze. Hawkers cannot raise prices without immediate customer backlash and loss of footfall.",
    rootCause:    "The structural problem is fragmentation. Each hawker acts as an isolated price-taker. The 15–20% collective savings potential exists in aggregate but cannot be unlocked without coordination infrastructure.",
    culturalStake:"Hawker culture's UNESCO inscription (Dec 2020) reflects its role as Singapore's community dining room. Financial unviability drives stall closures, deters succession, and erodes a living cultural institution that the Singapore government must report to UNESCO on every 6 years.",
  },
  policyGaps: [
    { policy:"Hawkers' Productivity Grant (HPG)",        focus:"Kitchen automation — tray return, queue systems, digital solutions",              gap:"80% co-funding addresses manpower (20% of costs) — does NOT touch raw material procurement (56% of costs)", color:"#F59E0B" },
    { policy:"Productive Hawker Centres (PHC) Programme",focus:"Centre-level productivity — centralised dishwashing, automated tray return",     gap:"70% subsidy for shared services — operational efficiency, not ingredient procurement cost",             color:"#F59E0B" },
    { policy:"Rent Moderation (no reserve rents)",        focus:"Fixed cost reduction via stall tender policy",                                   gap:"Rent is ~5–10% of operating costs. Addresses a small fixed cost, not the 56% raw material variable",     color:"#F59E0B" },
    { policy:"SEHC Value Meal Commitment",                focus:"Affordable meal availability at socially-conscious hawker centres",              gap:"Mandates low prices without reducing costs — increases margin pressure, doesn't relieve it",              color:"#EF4444" },
    { policy:"SEHC Operator Bulk Purchasing (informal)",  focus:"Some SEHC operators offer bulk purchasing via industry networks",               gap:"Uptake not widespread (Parliament, Nov 2024). Barriers: hawkers distrust new suppliers, protective of quality differentiation. No transparent competitive mechanism.", color:"#EF4444" },
    { policy:"Centralised Procurement Proposals (Parliament)", focus:"PSP NCMP Hazel Poa (Nov 2024) proposed government-agency-led centralised procurement, citing ALPS Pte Ltd pharma model", gap:"Government declined: hawkers want supplier relationship autonomy and quality control. HawkerGB solves this — opt-in, competitive, quality-rated. Market mechanism, not government mandate.", color:"#10B981" },
  ],
  whyHawkerGBWins: [
    { barrier:"Hawkers distrust new suppliers",           design:"Verified supplier onboarding with quality ratings. Hawkers rate every delivery. History visible before committing." },
    { barrier:"Hawkers protective of quality differentiation", design:"HawkerGB is opt-in per ingredient per cycle. Hawkers keep own suppliers for specialty items. No forced substitution." },
    { barrier:"Government mandate reduces hawker autonomy", design:"Market mechanism: suppliers compete on price. No government mandated rates. Hawker chooses to join each pool or not." },
    { barrier:"SEHC bulk buying had limited transparency", design:"Reverse auction is fully transparent — all bids visible, lowest price wins, hawker sees the saving vs market rate." },
  ],
  users: [
    { segment:"Primary — Established Hawkers (3+ years)", color:"#F59E0B", priority:"HIGH — core adopters for pool viability",
      profile:"Stable menus, predictable weekly procurement patterns, high ingredient familiarity, moderate-high volume. Most directly impacted by ingredient cost volatility.",
      techProfile:"Varied. Many use WhatsApp and e-payments. Some resistant to new platforms — adoption pathway must be simple and WhatsApp-familiar." },
    { segment:"Secondary — New Entrant Hawkers (HDP/ISP graduates)", color:"#10B981", priority:"MED — early adopters, trust builders",
      profile:"Post-programme hawkers within first 3 years. Lower procurement volume but higher digital comfort. Already guided toward NEA digital tools during onboarding.",
      techProfile:"Higher digital comfort. Familiar with NEA systems. More open to new procurement workflows." },
    { segment:"Tertiary — Suppliers & Wholesalers", color:"#38BDF8", priority:"MED — supply-side without which platform fails",
      profile:"F&B distributors, wholesalers, importers seeking guaranteed bulk order volume. Motivated by volume certainty and reduced individual sales overhead.",
      techProfile:"B2B digital adoption varies. Motivated by supply volume guarantee." },
    { segment:"Stakeholder — NEA HCG PPED", color:"#A78BFA", priority:"CRITICAL — endorsement, distribution, pilot facilitation",
      profile:"Policy owner and BO. Seeks a solution to raw material cost problem that supplements existing policies without requiring government subsidies or overriding hawker autonomy.",
      techProfile:"Government digital — familiar with enterprise platforms (HCMS, ServiceNow)." },
  ],
  valueProps: [
    { audience:"For Hawkers", color:"#F59E0B", headline:"Access Tier-1 bulk pricing without needing to be large",
      points:["Join a demand pool with fellow hawkers — no minimum commitment, fully opt-in per ingredient per cycle","Let suppliers compete for your collective order — lowest bid wins, you see the saving vs market rate","Delivery coordinated to your stall — no logistics management required","You keep full control: use HawkerGB for staples and your own suppliers for specialty items"] },
    { audience:"For Suppliers", color:"#10B981", headline:"Guaranteed bulk order volumes from Singapore's 13,000+ hawker operators",
      points:["Access a consolidated procurement channel replacing fragmented individual hawker outreach","Compete transparently on price — win based on competitive bidding, not relationship gatekeeping","Volume certainty enables better supply chain planning and reduced logistics cost per kg","Build a verifiable quality rating across Singapore's hawker ecosystem"] },
    { audience:"For NEA / Government", color:"#38BDF8", headline:"Technology execution of the centralised procurement policy gap",
      points:["Market-based solution — does not require government subsidies or override hawker autonomy","Addresses the 56% raw material cost driver that existing policies do not reach","Hawker opt-in design resolves the barrier Dr Koh cited in Nov 2024 Parliament (supplier autonomy)","Generates real-time procurement cost intelligence — a data layer for evidence-based hawker policy","Supports Singapore's UNESCO reporting obligation: demonstrable safeguarding of hawker livelihoods"] },
  ],
  northStar: {
    metric:"Average % ingredient cost saving per hawker per procurement cycle vs equivalent solo procurement",
    rationale:"If hawkers do not experience measurable savings, adoption will not sustain. This directly validates the core value proposition and is simple enough for hawkers to understand and trust.",
    target:"≥ 12% average saving within 6 months of pilot launch",
    proxy:"For the hackathon POC: % of tested hawkers who say 'I would use this'",
  },
  okrs: [
    { phase:"Hackathon (Apr–May 2026)", color:"#F59E0B",
      objective:"Demonstrate HawkerGB's concept validity and secure stakeholder confidence for post-hackathon pilot",
      krs:["KR1: BO (NEA HCG PPED) written endorsement secured ✅ — received 14 Apr 2026","KR2: ≥ 6 hawkers interviewed with primary research validating the core pain and group-buy receptivity","KR3: Working POC demonstrated at Feedback Bazaar (15 May) and Finale Day (25 May)","KR4: ≥ 70% of test hawkers express willingness to use HawkerGB if available"] },
    { phase:"Phase 1 Pilot (Jun–Dec 2026)", color:"#10B981",
      objective:"Run real procurement cycles at 2–3 NEA hawker centres and prove measurable savings",
      krs:["KR1: 2–3 pilot hawker centres onboarded, ≥ 30 active stalls per centre","KR2: ≥ 4 live pool cycles completed with real hawker demand and supplier bids","KR3: Average ingredient cost saving of ≥ 12% vs comparable solo market price per cycle","KR4: ≥ 80% of pilot hawkers rate willingness to continue using HawkerGB at 4/5 or above","KR5: ≥ 3 verified suppliers onboard, actively bidding across ≥ 3 ingredient categories"] },
    { phase:"Phase 2 Expansion (2027 H1)", color:"#38BDF8",
      objective:"Achieve network effects and demonstrate the platform's self-sustaining growth mechanism",
      krs:["KR1: Scale to 10–15 hawker centres across ≥ 3 planning regions","KR2: Pool fill rate improves: ≥ 80% of opened pools reach minimum viable volume within 24 hrs","KR3: Average saving increases to ≥ 15% vs solo procurement as network density improves","KR4: ≥ 8 verified suppliers, competitive bidding in ≥ 6 categories"] },
    { phase:"Phase 3 National Platform (2027 H2–2028)", color:"#A78BFA",
      objective:"HawkerGB becomes the default procurement infrastructure for Singapore's hawker ecosystem",
      krs:["KR1: All 123 NEA hawker centres addressed, ≥ 50% of stalls active on platform","KR2: Integration pathway defined with NEA HawkerX HCMS modernisation programme","KR3: HawkerGB Procurement Cost Index published — real-time ingredient pricing data for NEA policy","KR4: New entrant hawkers cite lower costs as a factor in their decision to join the trade"] },
  ],
  roadmap: [
    { phase:"Phase 0 — POC", period:"Apr–May 2026", color:"#F59E0B", status:"IN PROGRESS",
      goal:"Validate concept. Win BO endorsement. Demonstrate the 5-screen platform at Feedback Bazaar and Finale Day.",
      deliverables:["HawkerGB prototype: hawker demand pooling + supplier reverse auction + savings dashboard","BO written endorsement from NEA HCG PPED ✅ secured 14 Apr","User research: 6–8 hawker interviews (22–24 Apr) validating pain and concept receptivity","Feedback Bazaar booth demo (15 May) — GovTech audience dry run","Finale Day pitch (25 May) — judges panel, all three criteria"],
      successCriteria:"Judges score positively on Criteria A, B, C. Verbal commitment from BO for pilot co-design." },
    { phase:"Phase 1 — Controlled Pilot", period:"Jun–Dec 2026", color:"#10B981", status:"PLANNED",
      goal:"Run real procurement cycles at 2–3 PPED-recommended hawker centres. Prove measurable savings with live transactions.",
      deliverables:["Pilot centres: 2–3 NEA hawker centres co-selected with NEA HCG","Supplier onboarding: 3–5 verified distributors across poultry, cooking oil, rice, fresh produce","4–6 live pool cycles: real demand aggregation, supplier bidding, fulfilment, savings recorded","Savings dashboard populated with real transaction data — core trust signal for scale","PDPA-compliant data handling framework (anonymised demand aggregation)","Post-pilot review with NEA HCG: findings, savings data, scale recommendation"],
      successCriteria:"≥ 12% avg saving. ≥ 80% hawker NPS. BO endorses Phase 2 expansion." },
    { phase:"Phase 2 — Cluster Expansion", period:"2027 H1", color:"#38BDF8", status:"PLANNED",
      goal:"Expand to 10–15 centres. Build network effects. Develop the self-sustaining growth mechanism.",
      deliverables:["Scale to 10–15 hawker centres across ≥ 3 planning regions","Hawker mobile app (iOS + Android) — reduce dependency on web interface","Supplier self-service onboarding — reduce manual onboarding overhead","Pool matching algorithm refined with Phase 1 cycle data","Ingredient catalogue expanded: 8–10 categories, ≥ 5 active suppliers per category","Hawker Association partnerships for trust propagation and community onboarding"],
      successCriteria:"Network effect signal: pools fill faster as more hawkers join. Savings increase with density." },
    { phase:"Phase 3 — National Platform", period:"2027 H2–2028", color:"#A78BFA", status:"VISION",
      goal:"HawkerGB becomes the default procurement infrastructure for Singapore's hawker ecosystem.",
      deliverables:["All 123 hawker centres addressable — 13,000+ stalls on platform","Integration pathway with NEA HawkerX HCMS modernisation programme","HawkerGB Procurement Cost Index — real-time ingredient pricing data for NEA policy","20+ verified suppliers with competitive bidding across all major categories","Succession impact tracking: new entrant hawker adoption rate as cost-reduction signal"],
      successCriteria:"National savings impact quantified. NEA formally adopts HawkerGB as endorsed procurement channel." },
  ],
  moats: [
    { title:"Demand-side Network Effects",    icon:"📈", desc:"Every additional hawker joining a pool increases the discount available to all. Savings compound with scale — a structural moat that competitors cannot replicate without an equivalent hawker base." },
    { title:"NEA Institutional Relationship", icon:"🏛️", desc:"BO endorsement and co-design with NEA HCG creates a trust signal no private competitor can replicate without years of relationship-building. Distribution access to 123 centres is effectively gated by this relationship." },
    { title:"Procurement Data Asset",         icon:"📊", desc:"HawkerGB accumulates real-time ingredient demand and price data across 13,000 stalls — a unique dataset that becomes a policy intelligence layer for NEA and a competitive intelligence layer for suppliers." },
    { title:"Opt-In Quality Architecture",    icon:"✅", desc:"The specific design decision addressing the parliamentary barrier: hawkers choose what to pool and retain their own suppliers for specialty items. Architecturally distinct from mandated centralised procurement." },
  ],
};

const BO_Q = [
  { section:"Problem Scope & Severity", color:"#10B981", qs:["From your research, which top 3–5 ingredients cause the sharpest pricing pressure — and why?","How has the procurement cost burden changed over the last 3–5 years — is it accelerating?","Are specific hawker centre clusters, stall types or cuisine categories more severely affected?","What % of hawkers do you estimate are at genuine financial risk due to rising ingredient costs?","What does a typical hawker's monthly cost breakdown look like — ingredients vs rent vs utilities vs labour?"] },
  { section:"Prior Research & Evidence", color:"#38BDF8", qs:["What primary research has HCG PPED conducted on hawker procurement — interviews, surveys, observational studies?","What were the most significant findings from your hawker interviews on cost pain points?","Do you have data on typical hawker procurement spend per month, broken down by ingredient category?","What are the most common procurement channels hawkers use today?","Have you observed any informal group-buying behaviour among hawkers already?"] },
  { section:"Policies & Solutions Tried", color:"#A78BFA", qs:["What specific policies has HCG PPED implemented to help hawkers reduce procurement costs?","For each initiative — intended outcomes, actual results, and why it didn't fully resolve the problem?","Centralised procurement has been raised in Parliament — why hasn't it been implemented? What were the barriers?","Some SEHC operators have tried bulk purchasing — what happened? Why was uptake low?","What was the single biggest barrier to hawker participation in previous schemes?"] },
  { section:"Supplier Landscape", color:"#F97316", qs:["Who are the dominant wholesalers supplying hawker centres, and how is that market structured?","At what volume threshold do Tier-1 bulk wholesale prices typically apply?","Are there any existing co-operative procurement bodies or group purchasing organisations in the hawker space?","Are there NEA-preferred or government-contracted suppliers that could seed a HawkerGB supplier pool?","What is the typical credit and payment arrangement between hawkers and their suppliers?"] },
  { section:"Constraints & Path Forward", color:"#EF4444", qs:["Are there regulatory or governance constraints a technology-enabled group-buying platform must respect?","Would a reverse auction model raise NEA concerns around price manipulation or supplier fairness?","What would define success for HawkerGB from NEA's perspective — what's needed for formal post-hackathon adoption?","Which 2–3 hawker centres would you recommend as Phase 1 pilot sites, and why?","What internal data, research or documentation can you share with the SaveHawkerz team?"] },
];

const HAWKER_Q = [
  { section:"Warm-Up & Background",          color:"#F59E0B", intent:"Build rapport before probing pain.", qs:["How long have you been running this stall? What made you start?","Walk me through a typical day — what time do you start, what does your morning look like before you open?","Do you run the stall alone or do you have help?"] },
  { section:"Procurement Routine",            color:"#10B981", intent:"Map the current-state journey in full — frequency, sources, time, effort.", qs:["How often do you buy your ingredients — every day, every few days, weekly?","Where do you currently buy your main ingredients — wet market, wholesaler, supermarket, online?","How long does it take each time to source your ingredients, including travel?","How do you decide how much to buy? Do you plan ahead or is it day-by-day?","Which ingredients do you buy from which sources — is it different for different items?"] },
  { section:"Cost & Pricing Pressure",        color:"#EF4444", intent:"Validate the core pain. Understand magnitude and emotional response to the cost squeeze.", qs:["Which ingredients cost you the most each month?","Have your ingredient costs gone up recently? Which ones have increased the most?","When costs go up, what do you do — absorb it, reduce portion sizes, or raise prices?","Have you ever raised your prices? How did your customers react?","Do you feel you're getting a fair price right now, or do you feel you're paying more than you should?","Have you ever tried to negotiate a lower price with a supplier? What happened?","How do you feel when costs spike and you can't pass it on?"] },
  { section:"Supplier Relationships & Trust", color:"#A78BFA", intent:"Understand trust dynamics — this is the key barrier the Nov 2024 Parliament debate revealed.", qs:["How did you find your current suppliers? How long have you been buying from them?","What do you value most — price, quality, reliability, or the relationship itself?","Do your suppliers give you credit — can you pay later?","Have you ever switched suppliers? What made you switch, and how did it go?","If a new supplier offered 20% lower price but you'd never dealt with them — would you try? What would you need to know first?"] },
  { section:"Group Buying & Collective Behaviour", color:"#38BDF8", intent:"Test the HawkerGB hypothesis. Probe existing informal pooling.", qs:["Do you ever talk about ingredient costs or suppliers with other hawkers here?","Have you ever bought ingredients together with another hawker — even informally?","If 100–200 hawkers pooled their cooking oil orders and got a much lower price — would you join? What makes you hesitate?","Who would you trust to organise something like that — another hawker, a hawker association, the government, or a private company?","If you joined a group order, what would you need to be sure of before committing — quality, delivery, locked price?"] },
  { section:"Technology & Digital Comfort",   color:"#F97316", intent:"Assess adoption pathway. Do not assume smartphone comfort.", qs:["Do you use your smartphone for your business? What do you mainly use it for?","Do you use WhatsApp to communicate with suppliers or customers?","Have you ever ordered anything online — for the stall or personally?","How comfortable would you feel placing an ingredient order through an app — on a scale of 1 to 10?","What would need to be true about an app for you to trust it enough to use it for your business?"] },
  { section:"Concept Testing — HawkerGB",     color:"#C084FC", intent:"Show wireframe. Observe first, then ask. Never lead the hawker.", qs:["[Show Screen 1 — Hawker Home] What do you think this is trying to do? Tell me in your own words.","[Show Screen 3 — Pool Status] What does this screen mean to you? Does anything confuse you?","If suppliers competed to give you the lowest price for your chilli — would you trust the quality? What would worry you?","If you saved 15% on your chicken and oil every week — would that change anything meaningful for your stall?","What's the one thing that would stop you from using something like this regularly?"] },
  { section:"Closing — Open Reflection",      color:"#10B981", intent:"Surface latent needs the team hasn't thought to ask about.", qs:["Is there anything about buying ingredients that you wish was just easier?","If you could change one thing about how you run this stall, what would it be?","What do you wish the government or NEA understood better about running a hawker stall?","Is there anything you think I should have asked but didn't?"] },
];

const PHASES = [
  { id:0, label:"SESSION 1", title:"Team Inception", dates:"14 Apr", color:"#10B981", icon:"✅", duration:"COMPLETE", crits:["B"], done:true,
    goal:"Team aligned. BO endorsement received same day. Operating model for TL's triple role established. All 5 members confirmed and present.",
    completedOutputs:["✅ Team charter — ground rules, decision protocol, ways of working","✅ Assumption log v1 ranked by risk","✅ HawkerGB product vision statement","✅ RACI — PM2 owns docs, TL reviews","✅ BO written endorsement received 14 Apr — Criterion B de-risked","✅ Sprint 1–2 task board populated"],
    keyDecisions:["Prepare BO/PPED clarifying questions before meeting on Mon 20 Apr","Hawker interviews scheduled Wed 22 – Fri 24 Apr after PPED insights session","Vibe coding stack confirmed: Figma Make + Claude Code","PM2 owns all artefact production — TL reviews and decides only"] },
  { id:1, label:"PHASE 1", title:"Problem Discovery", dates:"15–21 Apr", color:"#F59E0B", icon:"🔍", duration:"1 week", crits:["A","B"],
    goal:"BO endorsement secured — now absorb everything PPED knows before field research. Arrive at Mon 20 Apr with sharp, evidence-grounded questions. Complete secondary research in parallel.",
    streams:[
      { name:"✅ BO Written Endorsement", owner:"TL", done:true, tasks:["✅ Written endorsement received 14 Apr — Criterion B evidence secured","✅ Email screenshot saved as judge-facing artefact","Next: invite BO to Feedback Bazaar (15 May) and Finale Day (25 May)","Next: agree how BO quote will be physically displayed at the booth"] },
      { name:"🔴 PRIORITY: BO & PPED Insights Session — Mon 20 Apr", owner:"TL + UXR + PM2", critical:true, tasks:["Prepare the BO/PPED question bank in advance (Research Guides panel) — circulate to team by Sat 18 Apr","TL leads the session; UXR takes verbatim notes; PM2 captures artefact list to request","Key focus: prior research findings, policies tried and why they failed, supplier landscape","Request: hawker interview transcripts, cost data, supplier mapping, failed policy docs","Ask: 'Which hawker centres do you recommend for field visits — where is pain most acute?'","Ask: 'What one thing do you wish a technology solution could fix that policy couldn't?'","Debrief immediately after: what confirmed assumptions? What surprised us? Update assumption log."] },
      { name:"Secondary Research", owner:"PM2", tasks:["Scan analogous group-buy models: Pinduoduo, GovBuy, NTUC bulk purchasing, agri co-operatives","Note: PSP NCMP Hazel Poa proposed centralised procurement in Parliament Nov 2024 citing ALPS Pte Ltd pharma model — HawkerGB is the technology execution of this unmet policy gap","Review NEA/STB hawker reports; identify publicly available procurement cost data","Benchmark: SG/regional apps addressing hawker or F&B procurement — why did they fail?"] },
      { name:"Interview Guide Finalisation & Recruitment", owner:"UXR", tasks:["Review hawker interview question bank against PPED session findings — adapt language","Confirm: 6–8 hawkers recruited across stall types — cooked food, drinks, fresh produce","Finalise interview protocol: consent, recording approach, FigJam capture board","Confirm schedule: Wed 22 – Fri 24 Apr at PPED-recommended centres"] },
      { name:"Dev Setup", owner:"DEV1 + DEV2", tasks:["Finalise tech stack: Next.js 14 + Supabase + Tailwind vs Figma Make first approach","Set up shared repo, README, design token scaffold, component library seed","Explore NEA open data APIs or hawker centre datasets","Prepare 2–3 architecture options for team alignment before build sprint"] },
    ],
    warnings:["PPED session on Mon 20 Apr is the most valuable 2 hours of Phase 1 — arrive with prepared questions","Do not let TL answer the questions himself — he is the bridge, not the subject matter expert in the room","Secondary research (esp. the Nov 2024 Parliament centralised procurement debate) is essential framing before field interviews"],
    outputs:["✅ BO endorsement received + screenshot","PPED insights synthesis (2-pager) — completed post-20 Apr","Assumption log updated post-PPED session","Competitive / analogous landscape map","Hawker interview guide finalised (refined post-PPED)","Dev environment ready + stack decision locked"] },
  { id:2, label:"PHASE 2", title:"User Research", dates:"22–27 Apr", color:"#38BDF8", icon:"🗣️", duration:"6 days", crits:["A"],
    goal:"Get inside the hawker's world Wed 22 – Fri 24 Apr. Validate the pain. Surface latent needs. Stress-test the HawkerGB group-buy hypothesis directly with the people it's built for. Lock the problem statement by 27 Apr.",
    streams:[
      { name:"Hawker Field Interviews (Wed 22 – Fri 24 Apr)", owner:"UXR lead + TL domain anchor", tasks:["Target: 6–8 semi-structured interviews at PPED-recommended hawker centres","Distribution: 2–3 interviews per day — morning sessions preferred (pre-lunch rush)","Stall spread: cooked food (2–3), drinks (1–2), fresh produce (1–2)","UXR leads ALL interviews — TL is domain anchor only; does not direct questions","Follow question bank order: warm-up first, concept testing last","CRITICAL TEST: 'If 200 hawkers pooled orders — would you join?' Listen hard for the why","CRITICAL TEST: Show HawkerGB wireframe on phone — observe reaction before asking opinion","Capture verbatim hawker quotes — these are Criterion A evidence and booth pull-quote gold"] },
      { name:"BO Joint Field Visit (if available)", owner:"TL", tasks:["Invite PPED officer to join one interview day — deepens their investment in outcome","Their presence signals government legitimacy to hawkers; strengthens Criterion B narrative","Post-visit debrief with BO: 'What surprised you vs confirmed your knowledge?'"] },
      { name:"Synthesis Workshop (26–27 Apr)", owner:"UXR facilitates · Full Team", tasks:["Affinity mapping on FigJam: cluster notes into themes — pain, behaviour, workaround, delight, resistance","Build 2 validated hawker personas: archetype, procurement pattern, tech comfort, trust profile","Validate or revise the problem statement — are we solving the right thing?","Generate top 3 HMW statements ranked by field evidence strength","Critical decision: does the reverse auction model survive what we heard? Confirm or trigger pivot","Pivot protocol if needed: revert to co-op fixed-price catalogue if blind reverse auction trust is too low"] },
      { name:"Dev Sprint 0 (parallel)", owner:"DEV1 + DEV2", tasks:["Build HawkerGB skeleton: auth, routing, design system scaffold","First lo-fi screen: ingredient selection — establish UX pattern early","Experiment with Claude Code for component generation — document velocity wins vs corrections"] },
    ],
    warnings:["Riskiest assumption: will hawkers trust HawkerGB over longstanding wet-market supplier relationships?","TL must NOT dominate synthesis — domain familiarity anchors team to existing assumptions","Problem statement must be locked by 27 Apr — ideation cannot begin on a moving target"],
    outputs:["Interview transcripts + FigJam affinity map (6–8 interviews)","2 validated hawker personas","Locked problem statement (27 Apr deadline)","Top 3 HMW statements — evidence-backed","HawkerGB hypothesis: confirmed, modified, or pivoted","Dev skeleton app running locally"] },
  { id:3, label:"PHASE 3", title:"Ideation & Solution Design", dates:"28 Apr – 4 May", color:"#A78BFA", icon:"💡", duration:"1 week", crits:["A","C"],
    goal:"Go wide before going narrow. Confirm HawkerGB's reverse auction model against alternatives. Scope the MVP ruthlessly. Produce wireframes dev can build from immediately.",
    streams:[
      { name:"Ideation Sprint", owner:"Full Team", tasks:["Crazy 8s: 8 rough ideas per person in 8 min — quantity over quality, no judgement","Gallery walk + dot vote: highest user impact × feasibility in remaining build time","Top 3 concepts: 90-second pitch per person, evaluate against Criteria A and C","TL makes the final call — informed by research evidence, not team preference"] },
      { name:"HawkerGB MVP Scoping", owner:"TL + PM2", tasks:["Confirm or adjust: Aggregated Demand + Reverse Auction is the HawkerGB direction","Define the POC critical demo path: the 3-minute journey that wins the booth","MoSCoW v2 post-research: what must the Feedback Bazaar POC demonstrate?","Formal hypothesis: 'We believe HawkerGB will [outcome] for [user] because [research evidence]'","BO scope validation: does HawkerGB directly address the gap their policies couldn't close?"] },
      { name:"5-Screen Wireframes", owner:"DEV2 (Figma) + PM2", tasks:["Screen 1 — Hawker Home Dashboard: active pools, my orders, savings summary","Screen 2 — Ingredient Selection + Pool Entry: item, qty, preferred delivery date","Screen 3 — Live Pool Status: aggregated demand counter, real-time feel","Screen 4 — Bid Results: 3 supplier bids, lowest highlighted, award decision","Screen 5 — Order Confirmed + Savings Dashboard: '$XX saved vs market rate this cycle'","Supplier Admin View: open lots, submit unit price bid, bid status (both sides of marketplace)","UXR validates all screens against personas before hi-fi work begins"] },
      { name:"Technical Architecture Lock", owner:"DEV1", tasks:["Present final stack to team — explicit alignment before build sprint begins","Define Claude Code usage: API routes, Supabase schema, component acceleration","Demo data strategy: realistic centre names, ingredient categories, competitive bid amounts","Figma hi-fi designated as Feedback Bazaar fallback — build in parallel from this point"] },
    ],
    warnings:["5-screen demo path is the nucleus — lock scope here, no additions without TL sign-off","Both sides of HawkerGB must appear in the POC: hawker view AND supplier bidding view","The savings dashboard is the emotional payoff — the number judges will quote in their feedback"],
    outputs:["Solution direction confirmed and locked","MVP feature list — MoSCoW v2","Lo-fi wireframes — 5 hawker screens + supplier admin view","Formal solution hypothesis statement","Tech stack locked + architecture documented"] },
  { id:4, label:"PHASE 4", title:"Build & Test", dates:"5–14 May", color:"#EF4444", icon:"🛠️", duration:"10 days", crits:["C"],
    goal:"Build fast. Test with real hawkers. Iterate on findings. Both POC and booth must be ready by EOD 14 May — Feedback Bazaar is the next morning with zero buffer.",
    streams:[
      { name:"Build Sprint 1 — Core Flow (5–9 May)", owner:"DEV1 + DEV2", tasks:["Ship 5-screen hawker journey end-to-end: select → pool → bid → confirm → savings","Claude Code: API scaffolding, Supabase schema, component generation","Figma Make: hi-fi UI on screens where code velocity is slower","PM2 runs daily 15-min standup; shields devs from scope creep; TL unblocks domain questions only","Day 4 (Wed 8 May): mid-sprint team demo — cut anything not on the critical 5-screen path"] },
      { name:"User Testing Round 1 (8–9 May)", owner:"UXR", tasks:["Test mid-fi prototype with 3 hawkers — task: 'Add your weekly chilli order to a pool'","Key usability question: can they complete core flow in under 3 minutes without guidance?","Capture: confusion moments, delight triggers, vocabulary mismatches","Output: top 3 fixes only — scope discipline is non-negotiable at this stage"] },
      { name:"Build Sprint 2 — Polish + Supplier View (10–13 May)", owner:"DEV1 + DEV2", tasks:["Implement top 3 user testing fixes","Build supplier bidding view: open lots, submit unit price, bid status","Build savings dashboard with seeded data: '47 hawkers saved avg $312 this cycle'","Seed realistic demo data: Bedok 85, Maxwell Food Centre, Chinatown Complex","QA full demo path 5× — every tap, every number, every transition must be solid"] },
      { name:"BO Show-and-Tell (w/c 12 May)", owner:"TL", tasks:["Demo working HawkerGB to PPED before the Feedback Bazaar","Ask: 'Does this address the gap your policies couldn't close?'","Capture BO endorsement quote for booth — 1–2 sentences, attributable, printable","Confirm BO attendance at Feedback Bazaar (15 May) and/or Finale Day (25 May)"] },
      { name:"Booth Build (13–14 May)", owner:"PM2 + DEV2", critical:true, tasks:["Print: HawkerGB banner, product one-pager, QR code to live demo","Print large-format BO endorsement quote card — eye-level, physically visible","Print hawker verbatim quotes from field research as pull-quote cards","Print the impact number large: 'Est. 15–20% savings × 13,000 hawkers'","Dedicate one device for booth demo; load Figma hi-fi as hot-swap fallback; backup charger","Assign booth roles: demo operator, pitch narrator, Q&A handler, feedback recorder","Full demo path test in booth setup before packing up on 14 May"] },
    ],
    warnings:["EOD 14 May is the absolute hard deadline — Feedback Bazaar is the next morning","Booth materials are Criteria B and C made physically visible — not optional decoration","BO endorsement quote must be printed on the booth, not just spoken aloud"],
    outputs:["Working HawkerGB POC — 5-screen flow + supplier view + savings dashboard","User testing findings + iteration log","BO validation quote captured and attributed","Demo data seeded (realistic, not placeholder)","Booth fully built, printed, and device-tested"] },
  { id:5, label:"BAZAAR", title:"Feedback Bazaar", dates:"15 May", color:"#F97316", icon:"🏪", duration:"1 day · DRY RUN", crits:["A","B","C"],
    goal:"Run at 100%. The judges evaluating your booth today are likely the same judges on Finale Day. Every interaction is the real thing. PM2's feedback capture is more valuable than an extra pitcher.",
    streams:[
      { name:"Morning Setup (Pre-Event)", owner:"Full Team", tasks:["Arrive early — set up booth, test demo device, verify all printed materials displayed","BO endorsement quote: confirm visible, prominent, at eye level","Hawker verbatim quotes: physical pull-quote cards on backdrop","One full run-through before first visitor arrives","Assign day roles: TL narrates, DEV1 operates device, PM2 captures feedback, UXR + DEV2 engage"] },
      { name:"Booth Pitch Loop", owner:"TL + DEV1", tasks:["For every visitor: 2-minute booth pitch — hook → problem → solution → demo → impact","Always show the live demo — never describe without demonstrating","Verbally cite BO endorsement AND gesture to the physical quote on the booth","Note judge names, feedback verbatim, and demo reaction for each judge visit","If BO/PPED officer is present: introduce them to judges — Criterion B made live"] },
      { name:"Feedback Capture — PM2 DEDICATED ROLE", owner:"PM2 only", critical:true, tasks:["PM2 is NOT pitching today — sole job is capturing every comment, every reaction","After each judge interaction: 'What resonated? What confused you? What's missing?'","Tag every piece of feedback: Criterion A, B, or C","Count frequency — what appears 2+ times is a mandatory fix","End of day: raw feedback sorted in FigJam, ready for debrief"] },
      { name:"Post-Bazaar Debrief (same evening)", owner:"Full Team", critical:true, tasks:["1-hr debrief: what appeared 2+ times → mandatory fix; once → backlog","What most surprised the team? What most validated the hypothesis?","Stack-rank all fixes by impact on Criteria A, B, C — not team preference","TL locks the final iteration list: maximum 3 changes to HawkerGB before Finale","Rewrite pitch opening hook based on what triggered strongest judge reactions"] },
    ],
    warnings:["PM2 must NOT pitch at the Bazaar — feedback capture is more valuable than an extra pitcher","3-fix maximum post-Bazaar is absolute — more changes risk a broken demo on Finale Day","If BO can attend the Bazaar, coordinate now — their physical presence at your booth is Criterion B made real"],
    outputs:["Feedback log tagged by judging criterion","Top 3 mandatory fixes — stack-ranked, TL-locked","Updated pitch narrative (what landed vs what confused)","Judge reactions and informal recognition documented"] },
  { id:6, label:"FINALE", title:"Iteration + Finale Day", dates:"16–25 May", color:"#C084FC", icon:"🏆", duration:"10 days", crits:["A","B","C"],
    goal:"Apply 3 Bazaar fixes with surgical precision. Rehearse until the team runs the booth pitch in their sleep. Finale is booth format — judges come to SaveHawkerz. Every interaction must score on all three criteria.",
    streams:[
      { name:"Post-Bazaar Iteration (16–18 May)", owner:"DEV1 + DEV2", tasks:["Implement the 3 Bazaar-locked fixes — nothing else, no scope additions","PM2 gatekeeps: any new suggestion goes to the post-hackathon backlog","Final QA: 5× end-to-end demo path on the booth device","Update savings figures if judges indicated numbers weren't compelling enough"] },
      { name:"Pitch Refinement (16–20 May)", owner:"TL + PM2", tasks:["Rewrite opening hook based on strongest judge reaction at the Bazaar","Criterion A: sharpen 'We interviewed 8 hawkers — here's what they told us' with best verbatim quotes","Criterion B: BO endorsement visible on-booth AND spoken aloud — both, not either","Criterion C: demo narration tightened to 90 seconds — judges have many booths to visit","Add path-forward beat: 'Pilot across 3 centres, co-designed with NEA HCG'","Close: '13,000 hawkers × avg 15% savings = $X returned to hawker livelihoods monthly'"] },
      { name:"Rehearsal Schedule", owner:"Full Team", tasks:["Day 18–19: Full booth pitch ×2 — record on phone, watch back, identify weak moments","Day 20–21: External audience rehearsal — colleague unfamiliar with HawkerGB","Day 22–23: Final polish — tighten hook, sharpen demo, remove anything that doesn't score","Day 24: One calm full run-through — no changes after this point, no exceptions","Day 25 (Finale): Arrive 30 min early. Set up. One quiet run. Deliver."] },
      { name:"Judge Q&A — Pre-Assigned Owners", owner:"Full Team", tasks:["'Will hawkers actually adopt a digital platform?' → TL — field research evidence from 8 interviews","'How do you ensure quality without physical inspection?' → DEV1 — verified onboarding + ratings design","'What's the monetisation model?' → PM2 — transaction commission or SaaS subscription","'How does this interact with NEA's existing systems (HCMS)?' → TL — NEA HCG insider","'Does this touch GeBIZ or government procurement?' → TL — supplier marketplace, not gov procurement","'How do you handle PDPA for hawker data?' → DEV1 — anonymised demand aggregation","'What happens after the hackathon?' → TL — 3-centre pilot, co-designed with NEA HCG","'What did you learn at the Feedback Bazaar?' → PM2 — demonstrates iteration culture"] },
      { name:"Finale Day (25 May)", owner:"Full Team", critical:true, tasks:["Booth format: judges circulate — pitch to each group as they arrive","Roles: TL narrates, DEV1 operates device, PM2 handles follow-up Q&A, UXR + DEV2 engage","For every judge group: 2-min pitch + 90-sec demo + open Q&A","If PPED Director attends: introduce to judges directly — maximum Criterion B impact","Post-Finale: capture all judge comments regardless of result — this is product research"] },
    ],
    warnings:["3-fix rule from Bazaar is absolute — additions now guarantee a broken demo on Finale Day","Criterion B is only fully scored if BO endorsement is VISIBLE on booth, not just spoken","TL's triple role is a Finale asset: simultaneously domain expert, PM, and storyteller"],
    outputs:["HawkerGB POC — Bazaar fixes applied, fully QA'd on booth device","Final pitch narrative — Bazaar-refined, GovTech-calibrated","BO endorsement booth asset — printed + spoken","Q&A prep sheet — 8 questions, pre-assigned owners","🏆 Finale Day — SaveHawkerz delivers HawkerGB"] },
];

// ─── COMPONENT ────────────────────────────────────────────────
export default function Playbook() {
  const [tab,   setTab]   = useState(98);
  const [sub,   setSub]   = useState("overview");
  const [pSub,  setPSub]  = useState("plan");
  const [panel, setPanel] = useState(null);
  const [qTab,  setQTab]  = useState("bo");
  const [open,  setOpen]  = useState({});

  const phase  = PHASES.find(p => p.id === tab);
  const toggle = k => setOpen(p => ({ ...p, [k]: !p[k] }));

  // ── ACCESSIBLE PRIMITIVES ──────────────────────────────────

  // White arrows, large enough to read easily
  const Arr = () => (
    <span style={{ color:"#FFFFFF", fontSize:18, flexShrink:0, lineHeight:1.2, paddingTop:1, fontWeight:700 }}>→</span>
  );
  const Bang = () => (
    <span style={{ color:"#EF4444", fontSize:16, flexShrink:0, lineHeight:1.2, paddingTop:1, fontWeight:700 }}>!</span>
  );
  const Check = () => (
    <span style={{ color:"#10B981", fontSize:16, flexShrink:0, lineHeight:1.2, paddingTop:1 }}>✓</span>
  );

  // Row with hover, accessible padding
  const Row = ({ children }) => (
    <div style={{ display:"flex", gap:12, padding:"8px 10px", borderRadius:4, marginBottom:4,
      transition:"background .1s" }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.035)"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      {children}
    </div>
  );

  // Chip / badge
  const Chip = ({ label, col }) => (
    <span style={{ fontSize:FS.micro, padding:"4px 10px", background:`${col}16`,
      border:`1px solid ${col}35`, color:col, borderRadius:3, letterSpacing:".07em",
      fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
      {label}
    </span>
  );

  // Sub-tab button — WCAG min 44px touch target
  const SubBtn = ({ label, active, col, onClick }) => (
    <button onClick={onClick} style={{
      padding:"11px 18px", minHeight:44, fontSize:FS.micro, letterSpacing:".1em",
      fontFamily:"'DM Mono',monospace", textTransform:"uppercase",
      background: active ? `${col}18` : "transparent",
      border:`1px solid ${active ? col+"55" : C.bdr}`,
      color: active ? col : "#555566", borderRadius:4, cursor:"pointer",
      transition:"all .15s ease",
    }}>{label}</button>
  );

  // Phase tab button
  const TabBtn = ({ label, sub2, col, active, onClick }) => (
    <button onClick={onClick} style={{
      padding:"14px 14px", minHeight:52, background:"none", border:"none",
      borderBottom:`2px solid ${active ? col : "transparent"}`,
      color: active ? col : "#3A3A58",
      fontSize:FS.micro, letterSpacing:".09em", fontFamily:"'DM Mono',monospace",
      whiteSpace:"nowrap", cursor:"pointer", transition:"color .15s",
    }}>
      <div style={{ fontWeight:600 }}>{label}</div>
      {sub2 && <div style={{ fontSize:11, marginTop:2, color:active?"#666":"#252540" }}>{sub2}</div>}
    </button>
  );

  // Section card container — larger padding throughout
  const Card = ({ title, col, children, style={} }) => (
    <div style={{ background:C.surf, border:`1px solid ${C.bdr}`, borderLeft:`4px solid ${col}`,
      borderRadius:6, padding:"22px 24px", marginBottom:14, ...style }}>
      {title && <div style={{ fontSize:FS.micro, color:col, letterSpacing:".18em",
        fontFamily:"'DM Mono',monospace", marginBottom:14 }}>{title}</div>}
      {children}
    </div>
  );

  // Info banner
  const Banner = ({ col, label, children }) => (
    <div style={{ padding:"16px 20px", background:`${col}07`,
      border:`1px solid ${col}20`, borderRadius:5, marginBottom:20 }}>
      {label && <div style={{ fontSize:FS.micro, color:col, letterSpacing:".16em",
        fontFamily:"'DM Mono',monospace", marginBottom:8 }}>{label}</div>}
      <div style={{ fontSize:FS.body, color:"#8888B8", fontFamily:"'Outfit'", lineHeight:LH.loose }}>{children}</div>
    </div>
  );

  // ── STRATEGY RENDER ────────────────────────────────────────
  const renderStrategy = () => {
    const sTabs = [
      { id:"overview",  label:"OVERVIEW" },
      { id:"evidence",  label:"EVIDENCE" },
      { id:"policy",    label:"POLICY GAP" },
      { id:"users",     label:"USERS" },
      { id:"valueprop", label:"VALUE PROP" },
      { id:"okrs",      label:"OKRs" },
      { id:"roadmap",   label:"ROADMAP" },
      { id:"moats",     label:"MOATS" },
    ];
    return (
      <div>
        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
            <span style={{ fontSize:28 }}>📐</span>
            <div>
              <div style={{ fontSize:FS.micro, color:C.acc, letterSpacing:".2em",
                fontFamily:"'DM Mono',monospace", marginBottom:4 }}>
                PRODUCT STRATEGY · LIVING DOCUMENT · LAST UPDATED {LAST_UPDATED}
              </div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:"#FFF", lineHeight:1.1 }}>
                HawkerGB Product Strategy
              </div>
            </div>
          </div>
          <div style={{ fontSize:FS.body, color:"#666688", lineHeight:LH.loose, fontFamily:"'Outfit'",
            padding:"16px 20px", background:`${C.acc}06`, borderLeft:`3px solid ${C.acc}30`,
            borderRadius:"0 5px 5px 0", maxWidth:800 }}>
            This strategy is grounded in parliamentary evidence, NEA survey data, and primary user research. It will be updated as SaveHawkerz gathers insights from the PPED session, hawker interviews, Feedback Bazaar, and Finale Day. Every section reflects the latest understanding.
          </div>
        </div>

        {/* Strategy sub-tabs */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
          {sTabs.map(t => (
            <SubBtn key={t.id} label={t.label} active={sub===t.id} col={C.acc} onClick={()=>setSub(t.id)} />
          ))}
        </div>

        {/* OVERVIEW */}
        {sub==="overview" && (
          <div className="fade">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:14 }}>
              <Card title="VISION" col="#F59E0B">
                <p style={{ fontSize:FS.body, color:C.text, fontFamily:"'Outfit'", lineHeight:LH.loose, margin:0 }}>{STRAT.vision}</p>
              </Card>
              <Card title="MISSION" col="#10B981">
                <p style={{ fontSize:FS.body, color:C.text, fontFamily:"'Outfit'", lineHeight:LH.loose, margin:0 }}>{STRAT.mission}</p>
              </Card>
            </div>
            <Card title="STRATEGIC POSITIONING" col="#38BDF8">
              <p style={{ fontSize:FS.bodyLg, color:"#DDDDF2", fontFamily:"'Outfit'", lineHeight:LH.loose, fontStyle:"italic", margin:0 }}>
                "{STRAT.positioning}"
              </p>
            </Card>
            <Card title="PROBLEM FRAMING" col="#A78BFA">
              {[
                { label:"TARGET USER",    val:STRAT.problemDeepDive.user },
                { label:"CORE JOB",       val:STRAT.problemDeepDive.coreJob },
                { label:"PAIN POINT",     val:STRAT.problemDeepDive.painPoint },
                { label:"CONSEQUENCE",    val:STRAT.problemDeepDive.consequence },
                { label:"ROOT CAUSE",     val:STRAT.problemDeepDive.rootCause },
                { label:"CULTURAL STAKE", val:STRAT.problemDeepDive.culturalStake },
              ].map((f,i) => (
                <div key={i} style={{ display:"flex", gap:16, padding:"12px 0",
                  borderBottom:`1px solid ${C.bdr}` }}>
                  <div style={{ width:130, fontSize:FS.micro, color:"#A78BFA",
                    letterSpacing:".12em", fontFamily:"'DM Mono',monospace", flexShrink:0, paddingTop:3 }}>{f.label}</div>
                  <div style={{ fontSize:FS.body, color:"#AAAACC", fontFamily:"'Outfit'", lineHeight:LH.base }}>{f.val}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* EVIDENCE */}
        {sub==="evidence" && (
          <div className="fade">
            <Banner col="#38BDF8" label="DATA SOURCES">
              Primary: NEA surveys (2022–2023), cited in Parliament Jul 2024 and Nov 2024 Hawker Culture Motion. Secondary: Parliamentary debates, STB/NEA hawker reports, UNESCO inscription records. All evidence pre-dates and validates the HawkerGB hypothesis.
            </Banner>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
              {STRAT.evidence.map((e,i) => (
                <div key={i} style={{ background:C.surf, border:`1px solid ${e.color}25`,
                  borderRadius:6, padding:"22px 24px" }}>
                  <div style={{ fontFamily:"'Bebas Neue'", fontSize:FS.hero, color:e.color,
                    lineHeight:1, marginBottom:8 }}>{e.stat}</div>
                  <div style={{ fontSize:FS.bodyLg, color:C.text, fontFamily:"'Outfit'",
                    fontWeight:600, marginBottom:8, lineHeight:LH.base }}>{e.label}</div>
                  <div style={{ fontSize:FS.sm, color:"#55557A",
                    fontFamily:"'DM Mono',monospace", lineHeight:LH.base }}>{e.src}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* POLICY GAP */}
        {sub==="policy" && (
          <div className="fade">
            <Banner col={C.acc} label="WHY EXISTING POLICY HAS NOT RESOLVED THE PROBLEM">
              In November 2024, PSP NCMP Hazel Poa formally proposed centralised procurement in Parliament. The government acknowledged the idea but cited two specific barriers: hawkers want to{" "}
              <strong style={{color:C.acc}}>maintain existing supplier relationships</strong> and are{" "}
              <strong style={{color:C.acc}}>protective of ingredient quality as a competitive differentiator</strong>.
              HawkerGB is architecturally designed to resolve both barriers.
            </Banner>
            {STRAT.policyGaps.map((p,i) => (
              <div key={i} style={{ background:C.surf, border:`1px solid ${p.color}25`,
                borderLeft:`4px solid ${p.color}`, borderRadius:6, padding:"18px 22px", marginBottom:12 }}>
                <div style={{ fontSize:FS.title, color:C.text, fontFamily:"'Outfit'",
                  fontWeight:700, marginBottom:10 }}>{p.policy}</div>
                <div style={{ display:"flex", gap:14, marginBottom:8, alignItems:"flex-start" }}>
                  <span style={{ fontSize:FS.micro, color:"#666688", letterSpacing:".1em",
                    fontFamily:"'DM Mono',monospace", flexShrink:0, paddingTop:2 }}>FOCUS</span>
                  <span style={{ fontSize:FS.body, color:"#8888A8", fontFamily:"'Outfit'",
                    lineHeight:LH.base }}>{p.focus}</span>
                </div>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <span style={{ fontSize:FS.micro, color:p.color, letterSpacing:".1em",
                    fontFamily:"'DM Mono',monospace", flexShrink:0, paddingTop:2 }}>GAP</span>
                  <span style={{ fontSize:FS.body, color:p.color==="#10B981"?"#66BB99":"#AAAACC",
                    fontFamily:"'Outfit'", lineHeight:LH.base }}>{p.gap}</span>
                </div>
              </div>
            ))}
            <Card title="HOW HAWKERGB ADDRESSES THE SPECIFIC BARRIERS" col="#10B981">
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:0 }}>
                {STRAT.whyHawkerGBWins.map((w,i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16,
                    padding:"14px 0", borderBottom:`1px solid ${C.bdr}` }}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <Bang/>
                      <span style={{ fontSize:FS.body, color:"#CC8888", fontFamily:"'Outfit'", lineHeight:LH.base }}>{w.barrier}</span>
                    </div>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <Check/>
                      <span style={{ fontSize:FS.body, color:"#88CC99", fontFamily:"'Outfit'", lineHeight:LH.base }}>{w.design}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* USERS */}
        {sub==="users" && (
          <div className="fade">
            {STRAT.users.map((u,i) => (
              <div key={i} style={{ background:C.surf, border:`1px solid ${u.color}25`,
                borderLeft:`4px solid ${u.color}`, borderRadius:6, padding:"22px 24px", marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div style={{ fontSize:FS.title, color:u.color, fontFamily:"'Outfit'", fontWeight:700 }}>{u.segment}</div>
                  <Chip label={u.priority} col={u.priority.includes("HIGH")||u.priority.includes("CRITICAL")?"#EF4444":"#F59E0B"} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                  <div>
                    <div style={{ fontSize:FS.micro, color:"#555577", letterSpacing:".12em",
                      fontFamily:"'DM Mono',monospace", marginBottom:8 }}>PROFILE</div>
                    <div style={{ fontSize:FS.body, color:"#9090B8", fontFamily:"'Outfit'", lineHeight:LH.base }}>{u.profile}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:FS.micro, color:"#555577", letterSpacing:".12em",
                      fontFamily:"'DM Mono',monospace", marginBottom:8 }}>TECHNOLOGY PROFILE</div>
                    <div style={{ fontSize:FS.body, color:"#9090B8", fontFamily:"'Outfit'", lineHeight:LH.base }}>{u.techProfile}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VALUE PROP */}
        {sub==="valueprop" && (
          <div className="fade">
            <Banner col={C.acc} label="3-SIDED MARKETPLACE">
              HawkerGB is a 3-sided marketplace. Hawker-side demand must exist for suppliers to bid; supplier competition must exist for hawkers to save; and NEA's institutional support must exist for both to trust the platform. All three value propositions must be designed and communicated in parallel.
            </Banner>
            {STRAT.valueProps.map((v,i) => (
              <Card key={i} title={`FOR ${v.audience.toUpperCase()}`} col={v.color}>
                <div style={{ fontSize:FS.title, color:v.color, fontFamily:"'Outfit'",
                  fontWeight:700, marginBottom:14, lineHeight:LH.base }}>"{v.headline}"</div>
                {v.points.map((p,j) => (
                  <Row key={j}>
                    <Arr/>
                    <span style={{ fontSize:FS.body, color:"#9090B8", fontFamily:"'Outfit'", lineHeight:LH.base }}>{p}</span>
                  </Row>
                ))}
              </Card>
            ))}
          </div>
        )}

        {/* OKRs */}
        {sub==="okrs" && (
          <div className="fade">
            <Card title="NORTH STAR METRIC" col={C.acc}>
              <div style={{ fontFamily:"'Outfit'", fontSize:FS.head, color:C.acc,
                fontWeight:700, marginBottom:16, lineHeight:LH.base }}>{STRAT.northStar.metric}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
                {[
                  { label:"TARGET",          val:STRAT.northStar.target },
                  { label:"RATIONALE",       val:STRAT.northStar.rationale },
                  { label:"HACKATHON PROXY", val:STRAT.northStar.proxy },
                ].map((f,i) => (
                  <div key={i} style={{ padding:"14px 16px", background:C.bg,
                    border:`1px solid ${C.bdr}`, borderRadius:4 }}>
                    <div style={{ fontSize:FS.micro, color:C.acc, letterSpacing:".14em",
                      fontFamily:"'DM Mono',monospace", marginBottom:8 }}>{f.label}</div>
                    <div style={{ fontSize:FS.body, color:"#AAAACC", fontFamily:"'Outfit'", lineHeight:LH.base }}>{f.val}</div>
                  </div>
                ))}
              </div>
            </Card>
            {STRAT.okrs.map((o,i) => (
              <div key={i} style={{ background:C.surf, border:`1px solid ${o.color}25`,
                borderLeft:`4px solid ${o.color}`, borderRadius:6, padding:"22px 24px", marginBottom:14 }}>
                <div style={{ fontSize:FS.micro, color:o.color, letterSpacing:".14em",
                  fontFamily:"'DM Mono',monospace", marginBottom:8 }}>{o.phase}</div>
                <div style={{ fontSize:FS.title, color:C.text, fontFamily:"'Outfit'",
                  fontWeight:700, marginBottom:16, lineHeight:LH.base }}>{o.objective}</div>
                {o.krs.map((kr,j) => (
                  <Row key={j}>
                    {kr.includes("✅") ? <Check/> : <Arr/>}
                    <span style={{ fontSize:FS.body,
                      color:kr.includes("✅")?"#44886677":"#9090B8",
                      fontFamily:"'Outfit'", lineHeight:LH.base }}>{kr}</span>
                  </Row>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ROADMAP */}
        {sub==="roadmap" && (
          <div className="fade">
            <Banner col={C.acc} label="4-PHASE DELIVERY ROADMAP">
              Phase 0 (Hackathon POC) is the foundation. Each subsequent phase gates on the previous — Phase 1 requires BO pilot endorsement from Phase 0; Phase 2 requires savings evidence from Phase 1; Phase 3 requires network effects from Phase 2. Do not skip phases.
            </Banner>
            {STRAT.roadmap.map((r,i) => (
              <div key={i} style={{ background:C.surf, border:`1px solid ${r.color}22`,
                borderRadius:6, overflow:"hidden", marginBottom:14 }}>
                <div style={{ padding:"16px 22px", background:C.bg,
                  borderBottom:`1px solid ${C.bdr}`, display:"flex",
                  justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:FS.micro, color:r.color, letterSpacing:".16em",
                      fontFamily:"'DM Mono',monospace", marginBottom:4 }}>{r.period}</div>
                    <div style={{ fontSize:FS.title, color:C.text, fontFamily:"'Outfit'",
                      fontWeight:700 }}>{r.phase}</div>
                  </div>
                  <Chip label={r.status} col={r.status==="IN PROGRESS"?"#10B981":r.status==="VISION"?"#A78BFA":C.acc} />
                </div>
                <div style={{ padding:"18px 22px" }}>
                  <div style={{ fontSize:FS.body, color:"#777799", fontFamily:"'Outfit'",
                    lineHeight:LH.base, marginBottom:16, paddingLeft:14,
                    borderLeft:`3px solid ${r.color}33` }}>{r.goal}</div>
                  {r.deliverables.map((d,j) => (
                    <Row key={j}>
                      {d.includes("✅") ? <Check/> : <Arr/>}
                      <span style={{ fontSize:FS.body, color:d.includes("✅")?"#44886677":"#9090B8",
                        fontFamily:"'Outfit'", lineHeight:LH.base }}>{d}</span>
                    </Row>
                  ))}
                  <div style={{ marginTop:16, padding:"12px 16px", background:`${r.color}08`,
                    border:`1px solid ${r.color}25`, borderRadius:4 }}>
                    <span style={{ fontSize:FS.micro, color:r.color, letterSpacing:".12em",
                      fontFamily:"'DM Mono',monospace" }}>SUCCESS CRITERIA — </span>
                    <span style={{ fontSize:FS.body, color:"#8888A8", fontFamily:"'Outfit'" }}>{r.successCriteria}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MOATS */}
        {sub==="moats" && (
          <div className="fade">
            <Banner col={C.acc} label="STRATEGIC DIFFERENTIATION">
              These are the structural advantages that make HawkerGB difficult to replicate once established. They compound over time and should be protected in every product and partnership decision.
            </Banner>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:14 }}>
              {STRAT.moats.map((m,i) => (
                <div key={i} style={{ background:C.surf, border:`1px solid ${C.bdr}`,
                  borderRadius:6, padding:"24px 22px" }}>
                  <div style={{ fontSize:30, marginBottom:12 }}>{m.icon}</div>
                  <div style={{ fontSize:FS.title, color:C.text, fontFamily:"'Outfit'",
                    fontWeight:700, marginBottom:10 }}>{m.title}</div>
                  <div style={{ fontSize:FS.body, color:"#777799", fontFamily:"'Outfit'",
                    lineHeight:LH.loose }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── RESEARCH GUIDES ────────────────────────────────────────
  const renderGuides = () => (
    <div className="fade" style={{ background:C.surf,
      border:"1px solid rgba(56,189,248,.22)", borderRadius:6, padding:"28px 28px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <div>
          <div style={{ fontSize:FS.micro, color:"#38BDF8", letterSpacing:".2em",
            fontFamily:"'DM Mono',monospace", marginBottom:6 }}>RESEARCH GUIDES</div>
          <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:"#FFF" }}>Interview Question Banks</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {[{ id:"bo", label:"BO & PPED · 20 Apr", col:"#10B981" },
            { id:"hawker", label:"Hawker Interviews · 22–24 Apr", col:"#38BDF8" }].map(t => (
            <SubBtn key={t.id} label={t.label} active={qTab===t.id} col={t.col} onClick={()=>setQTab(t.id)} />
          ))}
        </div>
      </div>

      {qTab==="bo" && (
        <div>
          <Banner col="#10B981" label="PURPOSE · MON 20 APR">
            Absorb everything PPED already knows before field research begins. Circulate to the team by <strong style={{color:"#10B981"}}>Sat 18 Apr</strong>.
          </Banner>
          {BO_Q.map((sec,si) => (
            <div key={si} style={{ marginBottom:10, borderRadius:6,
              overflow:"hidden", border:`1px solid ${C.bdr}` }}>
              <button onClick={()=>toggle("bo"+si)} style={{
                width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"16px 20px", minHeight:52, background:C.bg, border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:sec.color, flexShrink:0 }} />
                  <span style={{ fontSize:FS.bodyLg, fontFamily:"'Outfit'", fontWeight:700, color:sec.color }}>{sec.section}</span>
                  <span style={{ fontSize:FS.sm, color:"#333355", fontFamily:"'DM Mono',monospace" }}>{sec.qs.length} questions</span>
                </div>
                <span style={{ fontSize:20, color:"#444",
                  transform:open["bo"+si]?"rotate(90deg)":"rotate(0deg)", transition:"transform .15s" }}>›</span>
              </button>
              {open["bo"+si] && (
                <div style={{ padding:"14px 20px 18px", borderTop:`1px solid ${C.bdr}` }}>
                  {sec.qs.map((q,qi) => (
                    <div key={qi} style={{ display:"flex", gap:14, padding:"10px 10px",
                      borderRadius:5, marginBottom:4 }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.025)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{ fontFamily:"'Bebas Neue'", fontSize:18, color:`${sec.color}55`,
                        width:22, flexShrink:0 }}>{qi+1}</span>
                      <span style={{ fontSize:FS.body, color:"#9999BB", fontFamily:"'Outfit'", lineHeight:LH.loose }}>{q}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {qTab==="hawker" && (
        <div>
          <Banner col="#38BDF8" label="PURPOSE · WED 22 – FRI 24 APR · 6–8 HAWKERS">
            <strong style={{color:"#38BDF8"}}>Warm-up first. Concept testing last.</strong> UXR leads all interviews. TL attends as domain anchor only. Earn the right to show HawkerGB by understanding the hawker's world first.
          </Banner>
          {HAWKER_Q.map((sec,si) => (
            <div key={si} style={{ marginBottom:10, borderRadius:6,
              overflow:"hidden", border:`1px solid ${C.bdr}` }}>
              <button onClick={()=>toggle("h"+si)} style={{
                width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"16px 20px", minHeight:52, background:C.bg, border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:sec.color, flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:FS.bodyLg, fontFamily:"'Outfit'", fontWeight:700, color:sec.color }}>
                      Section {si+1} — {sec.section}
                    </div>
                    <div style={{ fontSize:FS.sm, color:"#444466", marginTop:3, fontFamily:"'Outfit'" }}>{sec.intent}</div>
                  </div>
                </div>
                <span style={{ fontSize:20, color:"#444", flexShrink:0, marginLeft:12,
                  transform:open["h"+si]?"rotate(90deg)":"rotate(0deg)", transition:"transform .15s" }}>›</span>
              </button>
              {open["h"+si] && (
                <div style={{ padding:"14px 20px 18px", borderTop:`1px solid ${C.bdr}` }}>
                  {sec.qs.map((q,qi) => (
                    <div key={qi} style={{ display:"flex", gap:14, padding:"10px 10px",
                      borderRadius:5, marginBottom:4 }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.025)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{ fontFamily:"'Bebas Neue'", fontSize:18, color:`${sec.color}55`,
                        width:22, flexShrink:0 }}>{qi+1}</span>
                      <span style={{ fontSize:FS.body, color:"#9999BB", fontFamily:"'Outfit'",
                        lineHeight:LH.loose, fontStyle:q.startsWith("[")?"italic":"normal" }}>{q}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── PITCH GUIDE ────────────────────────────────────────────
  const renderPitch = () => (
    <div className="fade" style={{ background:C.surf,
      border:"1px solid rgba(249,115,22,.22)", borderRadius:6, padding:"28px 28px" }}>
      <div style={{ fontSize:FS.micro, color:"#F97316", letterSpacing:".2em",
        fontFamily:"'DM Mono',monospace", marginBottom:6 }}>BOOTH PITCH GUIDE · INTERNAL GOVTECH AUDIENCE</div>
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:30, color:"#FFF", marginBottom:24 }}>
        Feedback Bazaar (15 May) + Finale Day (25 May)
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
        <div>
          <div style={{ fontSize:FS.micro, color:"#F97316", letterSpacing:".14em",
            fontFamily:"'DM Mono',monospace", marginBottom:14 }}>PITCH STRUCTURE (≈ 4 MIN TOTAL)</div>
          {[
            { beat:"Hook (10s)",            desc:"Real hawker quote — visceral before numerical" },
            { beat:"Problem (30s)",         desc:"13,000 hawkers · 56% costs = raw materials · 15–20% lost monthly · UNESCO culture at risk" },
            { beat:"Why Policy Failed (15s)",desc:"'NEA couldn't crack it through policy alone — we built the technology layer.'" },
            { beat:"Solution (30s)",        desc:"HawkerGB: hawkers pool demand, suppliers compete on price, lowest bid wins." },
            { beat:"Live Demo (90s) ★",     desc:"Run the 5-screen critical path. Show it. Never just describe it." },
            { beat:"Validation (20s)",      desc:"'8 hawker interviews. NEA HCG PPED endorses this direction.' Brief evidence." },
            { beat:"Impact (15s)",          desc:"'13,000 × avg 15% savings = $X returned to hawker livelihoods monthly.'" },
            { beat:"Path Forward (20s)",    desc:"'Pilot: 3 centres, co-designed with NEA HCG, existing procurement frameworks.'" },
          ].map((b,i) => (
            <div key={i} style={{ display:"flex", gap:14, marginBottom:8, padding:"12px 14px",
              background:b.beat.includes("★")?`rgba(249,115,22,.08)`:C.bg,
              border:`1px solid ${b.beat.includes("★")?"rgba(249,115,22,.25)":C.bdr}`, borderRadius:5 }}>
              <div style={{ width:90, fontSize:FS.sm, color:b.beat.includes("★")?"#F97316":"#444466",
                flexShrink:0, lineHeight:LH.base, fontFamily:"'DM Mono',monospace" }}>{b.beat}</div>
              <div style={{ fontSize:FS.body, color:"#8888AA", fontFamily:"'Outfit'", lineHeight:LH.base }}>{b.desc}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:FS.micro, color:"#F97316", letterSpacing:".14em",
            fontFamily:"'DM Mono',monospace", marginBottom:14 }}>GOVTECH AUDIENCE CALIBRATIONS</div>
          {["Use 'policy-tech complement' framing — HawkerGB augments NEA's work, not replaces it",
            "Reference the Nov 2024 Parliament debate: PSP proposed this; government said uptake was low. HawkerGB solves the identified barriers.",
            "Acronyms (NEA, HCG, PPED, PDPA, HCMS) are fine after first mention",
            "Name real centres: Bedok 85, Maxwell Food Centre, Chinatown Complex",
            "Add the 'path forward' beat — GovTech officers always ask 'what happens after?'",
            "A working live demo beats polished slides every time with builders and product people",
          ].map((c,i) => (
            <Row key={i}>
              <Arr/>
              <span style={{ fontSize:FS.body, color:"#8888AA", fontFamily:"'Outfit'", lineHeight:LH.base }}>{c}</span>
            </Row>
          ))}
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:FS.micro, color:"#F97316", letterSpacing:".14em",
              fontFamily:"'DM Mono',monospace", marginBottom:12 }}>Q&A PRE-ASSIGNED OWNERS</div>
            {[
              { q:"Will hawkers actually adopt a digital platform?",             o:"TL" },
              { q:"How do you ensure supplier quality without inspection?",       o:"DEV1" },
              { q:"What's the monetisation model?",                              o:"PM2" },
              { q:"How does this interact with NEA's systems (HCMS)?",           o:"TL" },
              { q:"Does this touch GeBIZ or government procurement?",            o:"TL" },
              { q:"How do you handle PDPA for hawker data?",                     o:"DEV1" },
              { q:"What happens after the hackathon?",                           o:"TL" },
              { q:"What did you learn at the Feedback Bazaar?",                  o:"PM2" },
            ].map((q,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", padding:"10px 14px", background:C.bg,
                border:`1px solid ${C.bdr}`, borderRadius:4, marginBottom:6, gap:12 }}>
                <span style={{ fontSize:FS.body, color:"#9090B8", fontFamily:"'Outfit'",
                  lineHeight:LH.base, flex:1 }}>"{q.q}"</span>
                <Chip label={q.o} col="#F97316" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── RISK REGISTER ─────────────────────────────────────────
  const renderRisk = () => (
    <div className="fade" style={{ background:C.surf,
      border:`1px solid rgba(245,158,11,.2)`, borderRadius:6, padding:"28px 28px" }}>
      <div style={{ fontSize:FS.micro, color:C.acc, letterSpacing:".2em",
        fontFamily:"'DM Mono',monospace", marginBottom:20 }}>
        RISK REGISTER · SAVEHAWERZ · {VERSION} · {LAST_UPDATED}
      </div>
      {[
        { risk:"TL bandwidth collapse",                    sev:"MED", col:"#F59E0B", mit:"PM2 owns ALL artefact production. TL reviews and decides — never creates. Enforce at every standup.", owner:"PM2" },
        { risk:"BO endorsement delay",                     sev:"—",   col:"#10B981", mit:"✅ RESOLVED — written endorsement received 14 Apr. Criterion B de-risked.", owner:"—" },
        { risk:"POC not demo-ready for Feedback Bazaar",   sev:"HIGH",col:"#EF4444", mit:"Hard deadline EOD 14 May. Figma hi-fi maintained as complete fallback from Day 1 of build.", owner:"DEV1" },
        { risk:"Hawker trust assumption invalidated",       sev:"MED", col:"#F59E0B", mit:"Pivot protocol: revert to co-op fixed-price catalogue if reverse auction trust is too low.", owner:"Full Team" },
        { risk:"Scope creep during build sprints",          sev:"MED", col:"#F59E0B", mit:"PM2 is scope guardian. Post-Bazaar: strict 3-fix maximum. New ideas go to post-hackathon backlog.", owner:"PM2" },
        { risk:"Criterion B under-evidenced at Finale",     sev:"MED", col:"#F59E0B", mit:"BO quote physically printed on booth. BO invited to Bazaar and Finale. Email screenshot on slide.", owner:"TL" },
        { risk:"GovTech Q&A on systems/governance/PDPA",   sev:"LOW", col:"#10B981", mit:"TL answers HCMS, GeBIZ, PDPA as NEA insider. All 8 Q&A owners pre-assigned before Bazaar.", owner:"TL" },
      ].map((r,i) => (
        <div key={i} style={{ display:"grid", gridTemplateColumns:"72px 1fr 2fr 90px",
          gap:14, alignItems:"start", padding:"14px 14px",
          borderRadius:5, marginBottom:8, border:`1px solid ${C.bdr}` }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.025)"}
          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <span style={{ fontSize:FS.sm, padding:"5px 8px",
            background:`${r.col}14`, border:`1px solid ${r.col}30`,
            color:r.col, borderRadius:3, textAlign:"center",
            fontFamily:"'DM Mono',monospace" }}>{r.sev}</span>
          <div style={{ fontSize:FS.body, color:"#CCCCEE", fontFamily:"'Outfit'", fontWeight:700, lineHeight:LH.base }}>{r.risk}</div>
          <div style={{ fontSize:FS.body, color:"#6666AA", fontFamily:"'Outfit'", lineHeight:LH.base }}>{r.mit}</div>
          <div style={{ fontSize:FS.sm, color:"#444466", textAlign:"right",
            fontFamily:"'DM Mono',monospace" }}>{r.owner}</div>
        </div>
      ))}
    </div>
  );

  // ── TIMELINE ───────────────────────────────────────────────
  const renderTimeline = () => (
    <div className="fade">
      <div style={{ fontFamily:"'Bebas Neue'", fontSize:36, color:"#FFF", marginBottom:6 }}>
        PROGRAMME TIMELINE · 14 APR – 25 MAY 2026
      </div>
      <div style={{ fontSize:FS.body, color:"#444466", fontFamily:"'DM Mono',monospace", marginBottom:28 }}>
        43 DAYS · BOOTH FORMAT ON BOTH KEY EVENTS · JUDGES CIRCULATE
      </div>
      {PHASES.map(p => {
        const s=[0,1,8,15,22,32,33]; const d=[1,6,6,7,10,1,10];
        const pct=(s[p.id]/43)*100; const w=Math.max((d[p.id]/43)*100,2);
        return (
          <div key={p.id} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
            <div style={{ width:100, fontSize:FS.sm, color:"#444466",
              textAlign:"right", flexShrink:0, fontFamily:"'DM Mono',monospace" }}>{p.label}</div>
            <div style={{ flex:1, height:p.id===5?46:36, background:C.surf,
              borderRadius:4, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:`${pct}%`, width:`${w}%`, height:"100%",
                background:`${p.color}${p.done?"30":p.id===5?"22":"12"}`,
                border:`1px solid ${p.color}${p.done?"55":p.id===5?"44":"22"}`,
                borderRadius:3, display:"flex", alignItems:"center", paddingLeft:12 }}>
                <span style={{ fontSize:FS.sm, color:p.color, whiteSpace:"nowrap",
                  fontFamily:"'Outfit'", fontWeight:600 }}>
                  {p.icon} {p.title}{p.done?" ✓":""}
                </span>
              </div>
            </div>
            <div style={{ width:72, fontSize:FS.sm, color:"#333355", flexShrink:0,
              fontFamily:"'DM Mono',monospace" }}>{p.dates}</div>
          </div>
        );
      })}
      <div style={{ marginTop:28, fontSize:FS.micro, color:C.acc, letterSpacing:".18em",
        fontFamily:"'DM Mono',monospace", marginBottom:16 }}>CRITICAL MILESTONES</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:8 }}>
        {[
          { d:"14 Apr", e:"✅ Session 1 Complete · All 5 members",            c:"#10B981" },
          { d:"14 Apr", e:"✅ BO Written Endorsement Received",               c:"#10B981" },
          { d:"18 Apr", e:"Team reviews BO/PPED question list",               c:C.acc },
          { d:"20 Apr", e:"🔑 BO & PPED Insights Session",                    c:C.acc },
          { d:"22 Apr", e:"🗣 Hawker Field Interviews Begin",                  c:"#38BDF8" },
          { d:"24 Apr", e:"🗣 Hawker Field Interviews End",                    c:"#38BDF8" },
          { d:"27 Apr", e:"Synthesis Workshop · Problem Statement Locked",    c:"#A78BFA" },
          { d:"2 May",  e:"Solution Direction Locked",                        c:"#A78BFA" },
          { d:"5 May",  e:"Build Sprint 1 Begins",                            c:"#EF4444" },
          { d:"8 May",  e:"User Testing Round 1",                             c:"#38BDF8" },
          { d:"12 May", e:"BO Show-and-Tell (Criterion B in product)",        c:"#10B981" },
          { d:"14 May", e:"🔴 POC + Booth Ready — Hard Deadline",             c:"#EF4444" },
          { d:"15 May", e:"🏪 FEEDBACK BAZAAR — Dress Rehearsal",             c:"#F97316" },
          { d:"16 May", e:"Post-Bazaar Iteration (3 fixes max)",              c:"#C084FC" },
          { d:"24 May", e:"Final run-through · No changes after this",        c:"#C084FC" },
          { d:"25 May", e:"🏆 FINALE DAY — SaveHawkerz delivers HawkerGB",   c:C.acc    },
        ].map((m,i) => (
          <div key={i} style={{ display:"flex", gap:12, padding:"12px 14px", background:C.surf,
            border:`1px solid ${m.e.includes("FINALE")||m.e.includes("BAZAAR")||m.e.includes("🔴")?m.c+"33":C.bdr}`,
            borderRadius:5 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:m.c,
              flexShrink:0, marginTop:5,
              ...(m.e.includes("FINALE")||m.e.includes("BAZAAR")?{boxShadow:`0 0 8px ${m.c}`}:{}) }} />
            <div>
              <div style={{ fontSize:FS.sm, color:"#333355", marginBottom:3,
                fontFamily:"'DM Mono',monospace" }}>{m.d}</div>
              <div style={{ fontSize:FS.body,
                color:m.e.startsWith("✅")?"#10B981":m.e.includes("FINALE")||m.e.includes("🔴")||m.e.includes("BAZAAR")?m.c:"#AAAACC",
                fontFamily:"'Outfit'", lineHeight:LH.base, fontWeight: m.e.includes("FINALE")||m.e.includes("BAZAAR")?600:400 }}>{m.e}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PHASE DETAIL ───────────────────────────────────────────
  const renderPhase = () => {
    if (!phase) return null;
    return (
      <div className="fade">
        {/* Phase header */}
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"flex-start", marginBottom:24, flexWrap:"wrap", gap:14 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
              <span style={{ fontSize:26 }}>{phase.icon}</span>
              <div>
                <div style={{ fontSize:FS.micro, color:phase.color, letterSpacing:".18em",
                  fontFamily:"'DM Mono',monospace", marginBottom:4 }}>
                  {phase.label} · {phase.dates} · {phase.duration}
                </div>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:FS.display,
                  color:"#FFF", lineHeight:1.1 }}>{phase.title}</div>
              </div>
              <div style={{ display:"flex", gap:6, marginLeft:4 }}>
                {(phase.crits||[]).map(cr => {
                  const j=CRITERIA.find(x=>x.id===cr);
                  return <Chip key={cr} label={`CRIT ${cr}`} col={j.color} />;
                })}
              </div>
            </div>
            <div style={{ maxWidth:640, fontSize:FS.body, color:"#666688",
              lineHeight:LH.loose, fontFamily:"'Outfit'", padding:"14px 18px",
              background:`${phase.color}05`, borderLeft:`3px solid ${phase.color}25`,
              borderRadius:"0 5px 5px 0" }}>{phase.goal}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {(phase.done ? ["summary"] : (phase.id===0 ? ["plan","outputs"] : ["plan","outputs"])
            ).map(t => (
              <SubBtn key={t} label={t} active={pSub===t} col={phase.color} onClick={()=>setPSub(t)} />
            ))}
          </div>
        </div>

        {/* Session 1 done summary */}
        {phase.done && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Card title="COMPLETED OUTPUTS" col="#10B981">
              {phase.completedOutputs.map((o,i) => (
                <Row key={i}><Check/><span style={{ fontSize:FS.body, color:"#66AACC",
                  fontFamily:"'Outfit'", lineHeight:LH.base }}>{o}</span></Row>
              ))}
            </Card>
            <Card title="KEY DECISIONS FROM SESSION 1" col={C.acc}>
              {phase.keyDecisions.map((d,i) => (
                <Row key={i}><Arr/><span style={{ fontSize:FS.body, color:"#9090B8",
                  fontFamily:"'Outfit'", lineHeight:LH.base }}>{d}</span></Row>
              ))}
            </Card>
          </div>
        )}

        {/* Plan tab */}
        {!phase.done && pSub==="plan" && (
          <div>
            {(phase.streams||[]).map((s,i) => (
              <div key={i} style={{ background:C.surf,
                border:`1px solid ${s.critical?"rgba(245,158,11,.35)":s.done?"rgba(16,185,129,.25)":C.bdr}`,
                borderLeft:`4px solid ${s.done?"#10B981":s.critical?C.acc:phase.color+"40"}`,
                borderRadius:6, overflow:"hidden", marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"14px 18px", borderBottom:`1px solid ${C.bdr}`, background:C.bg }}>
                  <div style={{ fontSize:FS.title, color:s.done?"#10B981":s.critical?C.acc:C.text,
                    fontFamily:"'Outfit'", fontWeight:700 }}>{s.name}</div>
                  <Chip label={s.owner} col={phase.color} />
                </div>
                <div style={{ padding:"14px 18px 16px" }}>
                  {s.tasks.map((t,j) => (
                    <Row key={j}>
                      {t.startsWith("✅") ? <Check/> : <Arr/>}
                      <span style={{ fontSize:FS.body,
                        color:t.startsWith("✅")?"#44886677":"#8080A8",
                        lineHeight:LH.base, fontFamily:"'Outfit'" }}>{t}</span>
                    </Row>
                  ))}
                </div>
              </div>
            ))}
            {phase.warnings && (
              <div style={{ padding:"16px 18px", background:"rgba(239,68,68,.04)",
                border:"1px solid rgba(239,68,68,.15)", borderRadius:6 }}>
                <div style={{ fontSize:FS.micro, color:"#EF4444", letterSpacing:".16em",
                  fontFamily:"'DM Mono',monospace", marginBottom:12 }}>CRITICAL PATH</div>
                {phase.warnings.map((w,i) => (
                  <Row key={i}><Bang/><span style={{ fontSize:FS.body, color:"#AA7777",
                    fontFamily:"'Outfit'", lineHeight:LH.base }}>{w}</span></Row>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Outputs tab */}
        {!phase.done && pSub==="outputs" && (
          <div>
            <div style={{ fontSize:FS.micro, color:phase.color, letterSpacing:".18em",
              fontFamily:"'DM Mono',monospace", marginBottom:16 }}>PHASE DELIVERABLES · EXIT CRITERIA</div>
            {(phase.outputs||[]).map((o,i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"14px 18px",
                background:C.surf, border:`1px solid ${C.bdr}`, borderRadius:5, marginBottom:8 }}>
                <span style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:`${phase.color}44`,
                  width:26, textAlign:"center", flexShrink:0, lineHeight:1.2 }}>{i+1}</span>
                <span style={{ fontSize:FS.body,
                  color:o.startsWith("✅")||o.includes("🏆")||o.includes("🏪")?phase.color:"#AAAACC",
                  fontFamily:"'Outfit'", lineHeight:LH.base }}>{o}</span>
              </div>
            ))}
            <div style={{ marginTop:18, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1, height:4, background:C.bdr, borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${((phase.id+1)/7)*100}%`,
                  background:`linear-gradient(90deg,${phase.color}55,${phase.color})`, borderRadius:2 }} />
              </div>
              <span style={{ fontSize:FS.sm, color:"#333355",
                fontFamily:"'DM Mono',monospace" }}>PHASE {phase.id+1} / 7</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── MAIN RENDER ────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'DM Mono','Courier New',monospace",
      background:C.bg, minHeight:"100vh", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#1E1E38;border-radius:2px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp .22s ease forwards;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .pulse{animation:pulse 2.2s ease infinite;}
        button{cursor:pointer;transition:all .15s ease;}
      `}</style>

      {/* ── HEADER ─────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(180deg,#0C0C1C 0%,#07070E 100%)",
        borderBottom:`1px solid ${C.bdr}`, padding:"24px 32px 20px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"flex-start", flexWrap:"wrap", gap:16, marginBottom:16 }}>
            <div>
              <div style={{ fontSize:FS.sm, letterSpacing:".3em", color:C.acc,
                fontFamily:"'DM Mono',monospace", marginBottom:6 }}>
                GOVTECH {"{BUILD}"} 2026 · LIVING DOCUMENT · {VERSION} · {LAST_UPDATED}
              </div>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:48, letterSpacing:".06em",
                color:"#FFF", lineHeight:1 }}>SaveHawkerz</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginTop:4 }}>
                <span style={{ fontFamily:"'Bebas Neue'", fontSize:28, letterSpacing:".1em",
                  color:C.acc }}>HawkerGB</span>
                <span style={{ fontSize:FS.sm, color:"#333355", letterSpacing:".08em",
                  fontFamily:"'DM Mono',monospace" }}>GROUP-BUY PROCUREMENT FOR SINGAPORE HAWKERS</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[
                { id:"guides", icon:"📋", label:"RESEARCH GUIDES", col:"#38BDF8" },
                { id:"pitch",  icon:"🏪", label:"BOOTH PITCH",     col:"#F97316" },
                { id:"risk",   icon:"⚠",  label:"RISK REGISTER",   col:C.acc },
              ].map(b => (
                <button key={b.id} onClick={()=>setPanel(panel===b.id?null:b.id)} style={{
                  padding:"10px 16px", minHeight:44, fontSize:FS.sm, letterSpacing:".1em",
                  fontFamily:"'DM Mono',monospace",
                  background: panel===b.id ? `${b.col}18` : "transparent",
                  border:`1px solid ${panel===b.id ? b.col+"55" : C.bdr}`,
                  color: panel===b.id ? b.col : "#555566", borderRadius:4,
                }}>{b.icon} {b.label}</button>
              ))}
            </div>
          </div>

          {/* Problem banner */}
          <div style={{ padding:"14px 18px", background:"rgba(245,158,11,.06)",
            border:"1px solid rgba(245,158,11,.15)", borderLeft:`4px solid ${C.acc}`,
            borderRadius:4, marginBottom:14 }}>
            <span style={{ fontSize:FS.sm, color:C.acc, letterSpacing:".16em",
              fontFamily:"'DM Mono',monospace" }}>PROBLEM — </span>
            <span style={{ fontSize:FS.body, color:"#8080A8", fontFamily:"'Outfit'", lineHeight:LH.base }}>
              13,000+ hawkers lose{" "}
              <strong style={{color:C.acc}}>15–20% in bulk savings</strong> by procuring individually —
              threatening the financial viability of Singapore's UNESCO-recognised hawker culture.
              Raw materials = <strong style={{color:C.acc}}>56% of total operating costs</strong>.
              Hawkers are isolated price-takers with no negotiating leverage.
            </span>
          </div>

          {/* Status strip */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
            {[
              { label:"SESSION 1",         status:"✅ COMPLETE · 14 APR",     col:"#10B981" },
              { label:"BO ENDORSEMENT",    status:"✅ RECEIVED · 14 APR",     col:"#10B981" },
              { label:"PPED MEETING",      status:"⏳ MON 20 APR",            col:C.acc },
              { label:"HAWKER INTERVIEWS", status:"⏳ WED 22 – FRI 24 APR",  col:"#38BDF8" },
              { label:"FEEDBACK BAZAAR",   status:"📅 15 MAY",                col:"#F97316" },
              { label:"FINALE DAY",        status:"🏆 25 MAY",                col:"#C084FC" },
            ].map(s => (
              <div key={s.label} style={{ padding:"8px 14px", background:`${s.col}09`,
                border:`1px solid ${s.col}25`, borderRadius:4 }}>
                <div style={{ fontSize:FS.micro, color:"#333355", letterSpacing:".1em",
                  fontFamily:"'DM Mono',monospace", marginBottom:3 }}>{s.label}</div>
                <div style={{ fontSize:FS.sm, color:s.col,
                  fontFamily:"'Outfit'", fontWeight:600 }}>{s.status}</div>
              </div>
            ))}
          </div>

          {/* Team */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {TEAM.map(m => (
              <div key={m.short} style={{ padding:"8px 14px",
                background:m.risk?"rgba(245,158,11,.06)":C.surf,
                border:`1px solid ${m.risk?"rgba(245,158,11,.2)":C.bdr}`, borderRadius:4 }}>
                <div style={{ fontSize:FS.sm, color:m.color,
                  fontFamily:"'DM Mono',monospace", fontWeight:600 }}>
                  {m.short}
                  {m.risk && <span className="pulse" style={{color:C.acc,marginLeft:6,fontSize:FS.micro}}> ⚡3 HATS</span>}
                </div>
                <div style={{ fontSize:FS.sm, color:"#444466",
                  fontFamily:"'Outfit'", marginTop:3 }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── JUDGING BAR ───────────────────────────────── */}
      <div style={{ background:"#0A0A1A", borderBottom:`1px solid ${C.bdr}`, padding:"12px 32px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:10,
          flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontSize:FS.micro, color:"#222240", letterSpacing:".18em",
            fontFamily:"'DM Mono',monospace" }}>JUDGING CRITERIA →</span>
          {CRITERIA.map(j => (
            <div key={j.id} style={{ display:"flex", gap:10, padding:"8px 14px",
              background:`${j.color}0C`, border:`1px solid ${j.color}25`, borderRadius:4 }}>
              <span style={{ fontFamily:"'Bebas Neue'", fontSize:22, color:j.color, lineHeight:1 }}>{j.id}</span>
              <div>
                <div style={{ fontSize:FS.sm, color:j.color, letterSpacing:".07em",
                  fontFamily:"'Outfit'", fontWeight:600 }}>{j.label}</div>
                <div style={{ fontSize:FS.micro, color:"#222240",
                  fontFamily:"'DM Mono',monospace" }}>Primary phases {j.phases}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PANELS ────────────────────────────────────── */}
      {panel && (
        <div style={{ maxWidth:1200, margin:"20px auto 0", padding:"0 32px" }}>
          {panel==="guides" && renderGuides()}
          {panel==="pitch"  && renderPitch()}
          {panel==="risk"   && renderRisk()}
        </div>
      )}

      {/* ── PHASE TABS ────────────────────────────────── */}
      <div style={{ background:"#0A0A1A", borderBottom:`1px solid ${C.bdr}`, overflowX:"auto" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", display:"flex" }}>
          <TabBtn label="STRATEGY" sub2="Product" col={C.acc} active={tab===98}
            onClick={()=>{setTab(98);setSub("overview");setPanel(null);}} />
          <div style={{ width:1, background:C.bdr, margin:"10px 6px" }} />
          {PHASES.map((p,i) => (
            <TabBtn key={p.id} label={p.label} sub2={p.dates} col={p.color} active={tab===p.id}
              onClick={()=>{setTab(p.id);setPSub(p.done?"summary":"plan");setPanel(null);}} />
          ))}
          <div style={{ width:1, background:C.bdr, margin:"10px 6px" }} />
          <TabBtn label="TIMELINE" sub2="Full Arc" col={C.acc} active={tab===99}
            onClick={()=>{setTab(99);setPanel(null);}} />
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 32px 64px" }}>
        {tab===98  && renderStrategy()}
        {tab===99  && renderTimeline()}
        {phase     && renderPhase()}
      </div>

      {/* ── FOOTER ────────────────────────────────────── */}
      <div style={{ padding:"16px 32px", borderTop:`1px solid ${C.bdr}`,
        display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:FS.sm, color:"#1A1A30", letterSpacing:".12em",
          fontFamily:"'DM Mono',monospace" }}>
          SAVEHAWERZ · HAWKERGB · NEA HCG × GOVTECH {"{BUILD}"} 2026 · LIVING DOCUMENT · {VERSION} · {LAST_UPDATED}
        </div>
        <div style={{ display:"flex", gap:18 }}>
          {[{l:"TEAM",v:"SaveHawkerz"},{l:"PRODUCT",v:"HawkerGB"},
            {l:"STRATEGY",v:VERSION},{l:"BAZAAR",v:"15 MAY"},{l:"FINALE",v:"25 MAY"}].map(s => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Bebas Neue'", fontSize:16, color:C.acc }}>{s.v}</div>
              <div style={{ fontSize:FS.micro, color:"#222236",
                fontFamily:"'DM Mono',monospace" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
