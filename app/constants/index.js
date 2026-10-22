// index.js

export const projects = [
{
  id: 1,
  name: "GetGenie - AI Content Manager",
  slug: "get-genie",
  description:
    "An AI writing assistant that helps WordPress users create content and improve SEO without leaving the editor.",
  href: "/case-study/get-genie",
  image: "/assets/projects/get_genie1.webp",
  bgImage: "/assets/backgrounds/blanket.jpg",
  frameworks: [
    { id: 1, name: "Web-app" },
    { id: 2, name: "Next.js" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "MongoDB" },
    { id: 5, name: "Tailwind CSS" },
  ],
  visitUrl: "https://getgenie.ai",

  caseStudy: {
    role: "Senior Designer & Frontend Developer",
    team: "Engineering Lead, CTO, CEO, Senior Designer",
    techStack: "React, JavaScript, Ant Design",

    overview:
      "GetGenie helps people write and optimize content with AI. I worked on making that experience feel natural inside WordPress, so writers could research keywords, draft articles, and improve SEO without constantly switching tools.",

    problemTitle: "Writing Content Meant Juggling Too Many Tools",
    problemContent:
      "Writers had to jump between AI tools, keyword research, SEO checks, and the WordPress editor just to finish one article. I wanted to bring these steps together in one place without making the writing experience more complicated.",

    problemImages: [
      "/assets/projects/genie_wireframe.webp"
    ],

    researchTitle: "Finding Where the Workflow Broke Down",
    researchPhases: [
      {
        title: "Too Much Switching",
        content:
          "Writers were moving between several tools to research, write, and optimize an article. The opportunity was clear: bring the essentials into the WordPress editor.",
        image: "/assets/projects/genie-1.webp"
      },
      {
        title: "Keeping WordPress in Sync",
        content:
          "AI-generated content didn't always play nicely with WordPress blocks. State mismatches could break saved content, so the experience needed a safer way to handle edits and updates.",
        image: "/assets/projects/genie_2.webp"
      },
      {
        title: "Making AI Failures Less Painful",
        content:
          "AI requests could take time or fail altogether. Writers needed clear feedback and a way to recover their work instead of losing progress or facing a broken editor.",
        image: "/assets/projects/genie-4.webp"
      }
    ],

    solutionTitle: "A Writing Workspace Inside WordPress",
    solutionContent:
      "I helped shape an experience that brought AI writing, keyword research, and SEO insights into one workflow. Features like the Blog Wizard and AI Image Magic let writers move from an idea to a more complete article without leaving the editor.",

    solutionImages: [
      "/assets/projects/get_genie1.webp",
      "/assets/projects/genie_gif.webp"
    ],

    features: [
      "Blog Wizard: Turn a keyword or topic into an article draft.",
      "AI Image Magic: Create visuals to complement written content.",
      "SERP Analysis: Compare competing pages to spot SEO opportunities."
    ],

    improvementSections: [
      {
        title: "Keeping Content Safe",
        content:
          "I worked on separating temporary AI settings from saved WordPress content. This helped prevent editing conflicts and made it safer to move generated text into the editor.",
        image: "/assets/projects/genie-4.webp"
      },
      {
        title: "Making Complex Screens Easier to Use",
        content:
          "SEO analysis could make the interface feel heavy. I optimized rendering and reduced unnecessary updates to keep the experience responsive, even when displaying more data.",
        image: "/assets/projects/genie-trust.webp"
      },
      {
        title: "Handling Failed Requests Gracefully",
        content:
          "Instead of leaving writers stuck when an AI request failed, I improved error handling and recovery states so they could understand what went wrong and continue working.",
        image: "/assets/projects/genie-1.webp"
      },
      {
        title: "Working Across Different WordPress Setups",
        content:
          "WordPress sites vary in configuration and security restrictions. I worked on handling connection issues more gracefully so the plugin could behave more reliably across different environments.",
        image: "/assets/projects/genie_2.webp"
      }
    ],

    resultsTitle: "Less Friction, Faster Writing",
    resultsMetric: "10×",
    resultsContent:
      "The goal was to help writers spend less time switching tools and more time creating. The project reported up to 10× faster content production, alongside performance improvements and fewer WordPress block issues."
  }
},

{
  id: 2,
  name: "FujiFilm Diosynth - Laboratory Dashboard",
  slug: "fujifilm-dashboard",
  description:
    "A multi-role laboratory dashboard redesigned to make complex data and workflows easier to navigate.",
  href: "/case-study/fujifilm-dashboard",
  image: "/assets/projects/project1.webp",
  bgImage: "/assets/backgrounds/curtains.jpg",
  frameworks: [
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Tailwind CSS" },
    { id: 3, name: "MongoDB" },
    { id: 4, name: "OAuth, JWT" },
  ],
  visitUrl: "https://fujifilmbiotechnologies.fujifilm.com/",

  caseStudy: {
    role: "Product Lead — Design & Frontend",
    team: "CTO, Engineering Lead, Lab Operations Team",
    techStack: "React, GSAP, Atomic Design, PWA Features",

    problemTitle: "Too Much Data, No Clear Path",
    problemContent:
      "The dashboard connected a lot of information, but it wasn't always clear how everything fit together. Scientists and lab administrators had to navigate nested tasks and disconnected workflows just to figure out what to do next. I led the redesign to make the experience more structured, predictable, and easier to use.",

    problemImages: [
      "/assets/projects/before-fuji.webp"
    ],

    solutionTitle: "One System, Built for Different Lab Roles",
    solutionContent:
      "I worked with engineering and lab operations to rethink how information and tasks were organized. We built a reusable design system that could support different roles without creating a separate experience for each one. Since lab work doesn't always happen at a desk, we also prioritized responsive layouts, saved sessions, and cached data for more reliable access on the go.",

    solutionImages: [
      "/assets/projects/before-fuji.webp",
      "/assets/projects/after-fuji.webp",
      "/assets/projects/fuji-4.webp",
      "/assets/projects/fuji-5.webp",
      "/assets/projects/fuji-6.webp"
    ],

    features: [
      "Role-Based Dashboards: Relevant views and actions for admins, scientists, QC teams, and other users.",
      "Reusable Design System: Shared components that kept complex workflows consistent and easier to extend.",
      "Clearer Task Hierarchy: Better-organized information made nested tasks easier to understand and navigate.",
      "Mobile-Ready Workflows: Responsive screens, saved sessions, and cached data supported work beyond the desktop."
    ],

    resultsTitle: "A Clearer Way to Work",
    resultsMetric: "70%",
    resultsContent:
      "The redesigned dashboard made complex workflows easier to follow and helped new users get up to speed faster. Onboarding time was reduced by 70%, turning a fragmented experience into a more consistent system for day-to-day lab work.",
    resultsImages: [
      "/assets/projects/after-fuji.webp"
    ]
  }
},
{
  id: 3,
  name: "InsideMaps Capture - Image Capture & Processing App",
  slug: "insidemaps-capture",
  description:
    "Helping real estate professionals turn property scans into interactive 3D tours.",
  href: "/case-study/insidemaps-capture",
  image: "/assets/projects/Hero-Image-1.webp",
  bgImage: "/assets/backgrounds/map.jpg",
  frameworks: [
    { id: 1, name: "SwiftUI" },
    { id: 2, name: "iOS App" },
    { id: 3, name: "ARKit" },
    { id: 4, name: "Core ML" },
  ],
  visitUrl: "https://apps.apple.com/us/app/insidemaps-capture/id1077854108",

  caseStudy: {
    role: "Product Designer & Frontend Developer",
    team: "iOS Team, AR Specialist",
    techStack: "SwiftUI, ARKit",

    overview:
      "A great 3D tour starts long before the tour itself. InsideMaps Capture helps real estate professionals scan properties and turn them into immersive experiences. But when capturing a space felt difficult, the value of the finished product was harder to reach. I worked on making that first step simpler.",

    problemTitle: "The Hardest Part Was Getting Started",
    problemContent:
      "Users came to capture a property, not figure out the interface. Friction in the scanning flow and concerns about image quality made the experience harder than it needed to be. I focused on understanding where users struggled and what would help them complete a capture with confidence.",

    researchTitle: "Understanding the Friction",
    researchPhases: [
      {
        title: "Listen to Users",
        content:
          "I interviewed 20 users to understand their frustrations, expectations, and difficulties during property capture.",
        image: "/assets/projects/Hero-Image-1.webp"
      },
      {
        title: "Follow the Workflow",
        content:
          "I examined usage patterns and the capture journey to identify where users encountered friction and where the interface needed clearer guidance.",
        image: "/assets/projects/im-1.webp"
      },
      {
        title: "Prioritize What Matters",
        content:
          "I brought the findings together to focus on three areas: a smoother scanning flow, more reliable image capture, and clearer interactions.",
        image: "/assets/projects/im-3.webp"
      }
    ],

    solutionTitle: "Make Capture Feel Natural",
    solutionContent:
      "Rather than adding more features, I focused on removing friction from the ones users already depended on. I refined the capture experience, improved interface consistency, and worked with the iOS team on a smoother path from scanning a property to producing usable imagery.",

    solutionImages: [
      "/assets/projects/im-2.webp"
    ],

    improvementSections: [
      {
        title: "Guide the Capture",
        content:
          "I refined the scanning experience to make interactions clearer and help users move through the process with less uncertainty.",
        image: "/assets/projects/im-4.webp"
      },
      {
        title: "Get the Image Right",
        content:
          "I focused on the image capture experience, working toward clearer, more reliable imagery for the final 3D tour.",
        image: "/assets/projects/im-5.webp"
      },
      {
        title: "Create a Consistent Experience",
        content:
          "I redesigned reusable UI components to make interactions more predictable and the overall interface easier to navigate.",
        image: "/assets/projects/im-6.webp"
      }
    ],

    resultsTitle: "A Better First Step to Every 3D Tour",
    resultsMetric: "91%",
    resultsContent:
      "The project reported a 91% user satisfaction result, alongside reduced session abandonment. The focus was simple: help users spend less effort figuring out the capture process and more effort getting the property captured.",
    resultsImages: [
      "/assets/projects/im-7.webp",
      "/assets/projects/im-8.webp"
    ]
  }
},
{
  id: 4,
  name: "MatchTrack - Team Management App",
  slug: "match-track",
  description:
    "A mobile app that helps tennis coaches manage players, equipment, and team operations.",
  href: "/case-study/match-track",
  image: "/assets/projects/project3.webp",
  bgImage: "/assets/backgrounds/poster.jpg",
  frameworks: [
    { id: 1, name: "Mobile App" },
    { id: 2, name: "Tailwind CSS" },
    { id: 3, name: "Firebase" },
    { id: 4, name: "SQLite" },
  ],
  visitUrl: "https://apps.apple.com/sg/app/matchtrack-tennis-score-keeper/id977481057",

  caseStudy: {
    role: "Lead Mobile Developer",
    team: "Mobile Designer, Backend Developer",
    techStack: "React Native, Firebase",

    overview:
      "MatchTrack started with a simple idea: give tennis coaches one place to manage the moving parts of their teams. I led mobile development, helping turn an early concept into an app built around the tasks coaches needed to get done.",

    problemTitle: "From Spreadsheets to a Real Workflow",
    problemContent:
      "Managing players, equipment, and performance meant keeping track of too many moving parts. The challenge wasn't simply putting everything into an app. It was figuring out which tasks mattered most and making them easy to complete on the go.",

    researchTitle: "Start With What Coaches Actually Need",
    researchPhases: [
      {
        title: "From Spreadsheet to Product",
        content:
          "We started with an Excel sheet and a broad product idea. I helped move the conversation toward real coaching tasks instead of building features just because we could.",
        image: "/assets/projects/mt-1.webp"
      },
      {
        title: "Prioritize the Essentials",
        content:
          "Through user interviews, we identified the most important use cases and used them to guide what we built first. The goal was to solve high-priority problems before adding more complexity.",
        image: "/assets/projects/mt-2.webp"
      }
    ],

    solutionTitle: "Make Everyday Tasks Easier",
    solutionContent:
      "I took the lead on mobile development, using prototypes and early feedback to refine navigation and simplify key workflows. We focused on helping coaches reach the right task quickly, without having to work through unnecessary steps.",

    solutionImages: [
      "/assets/projects/mt-3.webp"
    ],

    improvementSections: [
      {
        title: "Navigation That Makes Sense",
        content:
          "I iterated on the navigation twice to make key sections easier to find and move between, keeping the experience straightforward as features grew.",
        image: "/assets/projects/mt-4.webp"
      },
      {
        title: "Fewer Steps, Less Friction",
        content:
          "I streamlined important user flows, including in-app shopping, to keep common tasks short and easy to complete.",
        image: "/assets/projects/mt-5.webp"
      },
      {
        title: "Reports Coaches Can Use",
        content:
          "We included reporting features to help coaches review relevant information and manage their teams with a clearer picture of activity.",
        image: "/assets/projects/mt-6.webp"
      }
    ],

    resultsTitle: "A Stronger Foundation to Build On",
    resultsContent:
      "Following launch, we received positive market feedback and continued refining the product. The experience gave us a clearer foundation for future improvements as MatchTrack evolved.",
    resultsImages: [
      "/assets/projects/mt-7.webp"
    ]
  }
},
{
  id: 5,
  name: "The Office Outlet - E-Commerce",
  slug: "office-outlet",
  description:
    "An interactive shopping experience that lets customers design their workstation and buy it online.",
  href: "/case-study/office-outlet",
  image: "/assets/projects/office1.webp",
  bgImage: "/assets/backgrounds/table.jpg",
  frameworks: [
    { id: 1, name: "Web App" },
    { id: 2, name: "Firebase" },
    { id: 3, name: "GraphQL" },
    { id: 4, name: "Material UI" },
  ],
  visitUrl: "https://thetotaloffice.com/",

  caseStudy: {
    role: "Senior Designer, Researcher & Frontend Engineer",
    team: "Engineering Lead, CEO",
    techStack: "Next.js, GraphQL, Firebase",

    overview:
      "Buying office furniture often means imagining how individual pieces will look together and hoping they work in your space. I led the design and frontend development of an experience that let customers build their workstation virtually and purchase the setup they created.",

    problemTitle: "You Shouldn't Have to Guess Before You Buy",
    problemContent:
      "Customers had limited ways to experiment with workstation layouts before committing to a purchase. We saw an opportunity to make furniture shopping more visual and interactive, helping people explore combinations and make decisions with greater confidence.",

    researchTitle: "Ask Better Questions, Build the Right Thing",
    researchPhases: [
      {
        title: "Find the Real Friction",
        content:
          "Before designing screens, I broke the shopping journey into smaller questions: Where do customers hesitate? What do they need to see before buying? Which interactions would make choosing a workstation easier?",
        image: "/assets/projects/office-1.webp"
      }
    ],

    solutionTitle: "From Browsing to Building",
    solutionContent:
      "I used rapid wireframes and prototypes to test ideas while the product was taking shape. This iterative approach helped us refine the layout, navigation, and core interactions without waiting for each design phase to finish before moving to the next.",

    solutionImages: [
      "/assets/projects/office-2.webp"
    ],

    improvementSections: [
      {
        title: "Build From the Basics",
        content:
          "I developed a reusable component system, building from simple elements into larger interface patterns. This kept the experience consistent while giving us room to evolve the product.",
        image: "/assets/projects/office-3.webp"
      },
      {
        title: "Make Shopping Feel Intuitive",
        content:
          "I refined visual hierarchy, typography, interactive states, and usability details to make the experience approachable for customers with no design or technical background.",
        image: "/assets/projects/office-4.webp"
      }
    ],

    resultsTitle: "From Concept to Launch in Five Months",
    resultsMetric: "5 Months",
    resultsContent:
      "The project launched in Dubai within five months, ahead of the original six-month timeline. Early results were encouraging, with a reported 60% conversion rate in Q1. The initial launch gave the business a foundation to expand its reach across the UAE.",
    resultsImages: [
      "/assets/projects/office-5.webp"
    ]
  }
},
{
  id: 6,
  name: "InsideMaps Website - UX Redesign",
  slug: "insidemaps-redesign",
  description:
    "A UX redesign that made a legacy website easier to navigate and the product easier to discover.",
  href: "/case-study/insidemaps-redesign",
  image: "/assets/projects/redesign1.webp",
  bgImage: "/assets/backgrounds/curtains.jpg",
  frameworks: [
    { id: 1, name: "Website" },
    { id: 2, name: "Node.js" },
    { id: 3, name: "MongoDB" },
    { id: 4, name: "Chakra UI" },
  ],
  visitUrl: "https://www.insidemaps.com/",

  caseStudy: {
    role: "Lead Product Designer",
    team: "CTO, Engineering Lead, Product Owner, 3 Junior Designers",
    techStack: "React, Chakra UI, Node.js",

    overview:
      "InsideMaps had a product worth discovering, but its website made that harder than it should have been. I led the redesign to help visitors understand what the product offered, find the right information, and move naturally toward signing up.",

    problemTitle: "The Website Was Getting in the Way",
    problemContent:
      "Internal usability tests exposed a recurring problem: visitors struggled to navigate the site. Important information felt disconnected, and unclear paths made it difficult for newcomers to know where to go next. I saw an opportunity to fix the experience at its foundation, starting with the sitemap.",

    researchTitle: "Fix the Structure Before the Screens",
    researchPhases: [
      {
        title: "Find the Friction",
        content:
          "I led an initial round of internal usability testing to identify confusing navigation patterns and gaps in the existing information architecture.",
        image: "/assets/projects/im-web-1.webp"
      },
      {
        title: "Rethink the Sitemap",
        content:
          "I reorganized the site's structure around what visitors needed to find, making product information, resources, and pricing easier to discover.",
        image: "/assets/projects/im-web-2.webp"
      }
    ],

    solutionTitle: "The First Design Wasn't the Final One",
    solutionContent:
      "Our initial layout wasn't working well enough. Rather than polishing the wrong direction, I returned to wireframes, built clickable prototypes, and used user testing to validate a second approach before moving into development.",

    solutionImages: [
      "/assets/projects/im-web-3.webp"
    ],

    improvementSections: [
      {
        title: "Test the Journey, Not Just the UI",
        content:
          "I tested the revised navigation with clickable wireframes, using feedback to refine how visitors moved between key pages and toward signup.",
        image: "/assets/projects/im-web-4.webp"
      },
      {
        title: "Make the Experience Work for More People",
        content:
          "I considered keyboard navigation, accessible labels, color contrast, and touch targets to make the redesigned site easier to use across devices and abilities.",
        image: "/assets/projects/im-web-5.webp"
      },
      {
        title: "Build a System, Not Just Pages",
        content:
          "I established a reusable design system using atomic design principles, helping the team build consistent interfaces and extend the experience more efficiently.",
        image: "/assets/projects/im-web-6.webp"
      }
    ],

    resultsTitle: "A Clearer Path From Visit to Signup",
    resultsMetric: "80%",
    resultsContent:
      "The project reported an 80% increase in user conversion and app downloads. The redesign aimed to connect the website and app into a more cohesive journey, helping visitors move from discovering InsideMaps to trying the product.",
    resultsImages: [
      "/assets/projects/im-web-7.webp",
      "/assets/projects/im-web-8.webp",
      "/assets/projects/im-web-9.webp"
    ]
  }
},
{
  id: 7,
  name: "Writer - Markdown Editor with Vim Motions",
  slug: "writer-app",
  description:
    "A developer-focused Markdown editor combining Vim motions, language intelligence, and lightweight productivity tools.",
  href: "/case-study/writer-app",
  image: "/assets/projects/emran_project_writer.webp",
  bgImage: "/assets/backgrounds/blanket.jpg",
  frameworks: [
    { id: 1, name: "React" },
    { id: 2, name: "Desktop App" },
    { id: 3, name: "Electron" },
    { id: 4, name: "CodeMirror 6" },
    { id: 5, name: "TypeScript" },
  ],
  visitUrl: "https://github.com/git-emran/simple-notes",

  caseStudy: {
    role: "Solo Developer",
    team: "Designed and built independently",
    techStack: "Electron, React, CodeMirror 6, TypeScript, OpenAI API, Mermaid.js",

    overview:
      "I wanted a writing environment that felt as natural as Vim but offered more than a plain text editor. So I built Writer: a desktop Markdown editor that brings together focused writing, code intelligence, diagrams, and lightweight task management.",

    problemTitle: "I Wanted to Write Without Breaking My Flow",
    problemContent:
      "My workflow often jumped between notes, code editors, terminals, and planning tools. Existing Markdown editors didn't give me the Vim-driven editing and developer features I wanted in one focused space. Instead of accepting the trade-offs, I decided to build my own.",

    researchTitle: "Start Small, Follow the Workflow",
    researchPhases: [
      {
        title: "Get the Writing Experience Right",
        content:
          "I started with the essentials: Vim motions, fast editing, syntax highlighting, and a clean interface for notes, coding practice, and everyday thinking.",
        image: "/assets/projects/writer-4.webp"
      },
      {
        title: "Grow Beyond Notes",
        content:
          "As the project evolved, I explored what else belonged in the same workflow. A terminal, task boards, daily notes, and visual diagrams gradually turned Writer into a broader developer workspace.",
        image: "/assets/projects/terminal.webp"
      }
    ],

    solutionTitle: "One Workspace, Fewer Context Switches",
    solutionContent:
      "I built Writer as a desktop app with Electron, React, and CodeMirror 6. Rather than adding features for their own sake, I focused on bringing common developer workflows closer to where the writing happens.",

    solutionImages: [
      "/assets/projects/emran_project_writer.webp"
    ],

    improvementSections: [
      {
        title: "Think Visually",
        content:
          "I integrated interactive diagrams and flowcharts with Mermaid.js, making it easier to map ideas and include visuals in technical documentation.",
        image: "https://github.com/user-attachments/assets/0fa0e1c1-89e4-4da1-8f6e-9150e95c5f55"
      },
      {
        title: "Keep Work Organized",
        content:
          "I added Kanban boards, daily notes, and task progress indicators so ideas could move from quick notes to organized work without leaving the app.",
        image: "/assets/projects/writer-5.gif"
      },
      {
        title: "Bring Coding Tools Into Writing",
        content:
          "I integrated language-server features for code intelligence across multiple languages and added AI-assisted writing to help with drafting and editing in context.",
        image: "/assets/projects/writer-ai.gif"
      }
    ],

    resultsTitle: "A Personal Tool That Kept Growing",
    resultsMetric: "v2.02",
    resultsContent:
      "Writer evolved from a simple Markdown editor into a multi-purpose workspace for writing, coding, and planning. Building it solo meant owning the entire process, from interface design and editor integration to performance and application state.",
    resultsImages: [
      "/assets/projects/writer-final.webp"
    ]
  }
},
];

export const testimonials = [
  {
    quote:
      "He had a knack for making our platform look great and work even better. Emran could take tricky concepts and turn them into designs that just clicked. He was super easy to work with and always ready to tackle problems. His mix of creativity and know-how really made a difference. We were lucky to have Emran on the team!",
    name: "Anders Tidemand",
    designation: "CEO, Tiblo Digital (Digital Mind)",
    src: "/images/anders.jpeg",
  },
  {
    quote:
      "MarketTime is a fast-paced company with ever-changing priorities, and Emran did an excellent job of juggling the demands provided to him by multiple Agile teams. His ability to adapt quickly while maintaining a high standard of work is truly impressive. Emran's leadership skills shine through in the way he inspires his team, always ready to step in and support wherever needed.",
    name: "Todd Litzman",
    designation: "CEO, MarketTime",
    src: "/images/todd.jpeg",
  },
  {
    quote:
      "Working with Emran was truly a pleasure. Emran displayed the ability to ask questions that not many others could. Solving customers pain points and making the best experience for them is truly Emrans passion and you can see that in his work output and in discussions with customers. He is truly an exceptional Design thinker and a Developer.",
    name: "Richard Wohnsiedler",
    designation: "Product Owner, ISN",
    src: "/images/rich.jpeg",
  },
  {
    quote:
      "He's an expert in blending killer design with serious coding chops. He didn’t just make our platform look good, he built functionality that ran like a dream. Emran could dive into the code, fix bugs, and optimize systems like a pro. He was awesome to work with, always ready to troubleshoot or tweak things on the fly. He has a creative edge.",
    name: "Anders Blomqvist",
    designation: "CTO, Tiblo Digital (Digital Mind)",
    src: "/images/anders2.jpeg",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTION DESIGNS
// ─────────────────────────────────────────────────────────────────────────────
// To add a new interaction:
//   1. Find the category you want (or add a new one).
//   2. Append a { title, image } object to that category's array.
//   3. Tabs and gallery update automatically — no code changes needed elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

const interactionDesignsByCategory = {
  "Restaurant": [
    { title: "Profile Section",    image: "/assets/projects/restaurant1.webp" },
    { title: "Review Address",    image: "/assets/projects/restaurant2.webp" },
    { title: "Confirm Order",    image: "/assets/projects/restaurant3.webp" },
    // { title: "Food Order Flow", image: "/assets/projects/your-new.webp" },
  ],

  "Books": [
    { title: "Search Animation",  image: "/assets/projects/book2.webp" },
    { title: "Library App",       image: "/assets/projects/book1.webp" },
    { title: "Highlight text",       image: "/assets/projects/book3.webp" },
  ],

  "Calendar": [
    { title: "Date selection",    image: "/assets/projects/calendar1.webp" },
    { title: "Weather Card Information",    image: "/assets/projects/calendar2.webp" },
    { title: "Custom FAB Interaction",    image: "/assets/projects/calendar3.webp" },
  ],

  "Health & Fitness": [
    { title: "Item Selection",       image: "/assets/projects/fitness1.webp" },
    { title: "Splash Screen",       image: "/assets/projects/fitness2.webp" },
    { title: "Track Your Run",       image: "/assets/projects/fitness3.webp" },
  ],


  "Maps": [
    { title: "Prototype Animation",       image: "/assets/projects/maps1.webp" },
    { title: "Finding Location",       image: "/assets/projects/maps2.webp" },
    { title: "Location Finder",       image: "/assets/projects/maps3.webp" },
  ],

  "Website": [
    { title: "Hover Interaction",       image: "/assets/projects/website1.webp" },
  ],

  "Vision-OS": [
    { title: "Custom Gestures",       image: "/assets/projects/visionos1.webp" },
  ],


  "iPad-OS": [
    { title: "Custom Gestures",       image: "/assets/projects/ipados1.webp" },
    { title: "Custom Dock Animation",       image: "/assets/projects/ipados2.webp" },
  ],

  "Branding & Illustrations": [
    { title: "Brand Identity", image: "/assets/projects/branding1.webp" },
    { title: "Creative Ad marketing",    image: "/assets/projects/branding2.webp" },
    { title: "illustration",    image: "/assets/projects/illus1.webp" },
    { title: "illustration",    image: "/assets/projects/illu2.webp" },
    { title: "illustration",    image: "/assets/projects/illu3.webp" },
  ],

};

// Helper to resolve high-performance video & poster paths for smooth 60fps rendering
const resolveMedia = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") {
    return { video: null, poster: imagePath, image: imagePath };
  }
  const isGif = imagePath.endsWith(".gif");
  const basePath = isGif ? imagePath.replace(/\.gif$/, "") : imagePath;
  return {
    image: imagePath,
    video: isGif ? `${basePath}.mp4` : null,
    poster: isGif ? `${basePath}_poster.webp` : imagePath,
  };
};

// Auto-flatten — do not edit below this line
export const interactionDesigns = Object.entries(interactionDesignsByCategory).flatMap(
  ([category, items]) =>
    items.map((item, i) => {
      const media = resolveMedia(item.image);
      return {
        id: `${category}-${i}`,
        category,
        title: item.title,
        image: item.image,
        video: item.video || media.video,
        poster: item.poster || media.poster,
      };
    })
);
