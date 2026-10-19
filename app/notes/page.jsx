import HoverLink from "../components/HoverLink";

export const metadata = {
  title: "Emran Hossain — Notes",
  description: "Notes, reflections, and design engineering thoughts by Emran Hossain",
};

const notes = [
  {
    slug: "design-engineering-sweet-spot",
    date: "March 2025",
    title: "The sweet spot between Figma craft and production code",
    excerpt:
      "Why the highest leverage designers in product teams are the ones who can write the components they conceive, debug state hydration, and sweat the 16ms frame budget.",
    href: "https://my-blog-omega-ashy.vercel.app/",
    isExternal: true,
    preset: "writer",
  },
  {
    slug: "decoupling-state-in-complex-editors",
    date: "November 2024",
    title: "Decoupling React state in rich editor ecosystems",
    excerpt:
      "Lessons learned while building GetGenie for WordPress Gutenberg: how keeping the UI state isolated from the persistent document model eliminated validation crashes and kept typing lag at zero.",
    href: "/case-study/get-genie",
    isExternal: false,
    preset: "ai",
  },
  {
    slug: "thick-data-ux-for-specialized-tools",
    date: "July 2024",
    title: "Thick Data UX: designing for scientists and complex laboratories",
    excerpt:
      "When standard quantitative dashboards fail, qualitative deep-dives with lab scientists reveal that clarity comes from reducing task nesting rather than cramming more charts into view.",
    href: "/case-study/fujifilm-dashboard",
    isExternal: false,
    preset: "biotech",
  },
  {
    slug: "tactile-interactions-spatial-era",
    date: "February 2024",
    title: "Tactile micro-interactions for the spatial computing era",
    excerpt:
      "Notes on prototyping gesture physics, subtle magnetic snaps, and spatial depth cues across VisionOS and iPadOS.",
    href: "/interaction-archive",
    isExternal: false,
    preset: "spatial",
  },
];

export default function NotesPage() {
  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col">

      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-7 md:col-span-9 max-w-screen-lg pb-5 leading-relaxed">
            <h1 className="text-4xl font-serif mb-12 mt-4 tracking-tight">
              <HoverLink
                preset="hero"
                className="font-bold font-serif text-black hover:text-gray-800 hover:no-underline no-underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Emran Hossain
                <span className="font-serif font-semibold"> — Notes</span>
              </HoverLink>
            </h1>

            {notes.map((note) => (
              <div
                key={note.slug}
                className="mb-16 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose text-black dark:text-white"
              >
                <HoverLink
                  href={note.href}
                  preset={note.preset}
                  target={note.isExternal ? "_blank" : undefined}
                  rel={note.isExternal ? "noopener noreferrer" : undefined}
                  className="block group post-link no-underline"
                >
                  <div className="w-full">
                    <div className="text-neutral-500 mb-3 dark:text-neutral-400 font-mono text-sm">
                      {note.date}
                    </div>
                    <div className="font-medium text-black block mb-2 dark:text-white group-hover:underline">
                      <span className="post-title text-xl font-serif font-bold">{note.title}</span>
                    </div>
                    <p className="text-neutral-800 mb-4 mt-0 dark:text-neutral-200 leading-relaxed text-base md:text-lg">
                      {note.excerpt}
                    </p>
                  </div>
                </HoverLink>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
