import Image from "next/image";
import HoverLink from "./components/HoverLink";

export default function Home() {
  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col">

      {/* Main Content Grid */}
      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-11 lg:col-span-7 md:col-span-9 max-w-screen-lg pb-5 leading-relaxed">
            {/* Hero / Intro */}
            <div className="xl:mr-60 lg:mr-30 md:mr-20 max-w-prose">
              <h1 className="font-serif font-extrabold md:text-8xl text-7xl mt-0 mb-6 text-black dark:text-white tracking-tight -mr-[calc(100%/11)] md:mr-0">
                Emran Hossain
              </h1>
              <div className="leading-relaxed opacity-90">
                I <strong className="font-serif">Design </strong> and <strong className="font-serif">Build</strong> Softwares. Things I build, are different because it&apos;s made with care, shaped by experience, built to fit. You can feel the <strong className="font-serif">difference</strong>.</div>
            </div>

            {/* Project 1: GetGenie */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="ai"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/get-genie"
                >
                  <span className="font-medium">GetGenie AI</span>
                </HoverLink>
                {" — "}
                <span>
                  Desgined and Built WordPress Gutenberg-based AI writing assistant. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="GetGenie AI"
                    priority={true}
                    loading="eager"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/get_genie1.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 2: Writer */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="writer"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/writer-app"
                >
                  <span className="font-medium">Writer - Canvas & Markdown Workspace</span>
                </HoverLink>
                {" — "}
                <span>
                 Creator and Maintiner of a thinking environment designed for deep work. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="Writer Workspace"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/emran_project_writer.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 3: FujiFilm Diosynth */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="biotech"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/fujifilm-dashboard"
                >
                  <span className="font-medium">FujiFilm Diosynth Laboratory Dashboard</span>
                </HoverLink>
                {" — "}
                <span>
                  Redesigned a multi-tiered, data-intensive dashboard for biotech laboratories. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="FujiFilm Dashboard Before"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/before-fuji.webp"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="FujiFilm Dashboard After"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/after-fuji.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 4: InsideMaps Capture */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="spatial"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/insidemaps-capture"
                >
                  <span className="font-medium">InsideMaps Capture</span>
                </HoverLink>
                {" — "}
                <span>
                  Redesigned an iOS app transforming room photography into interactive 3D tours. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="InsideMaps Capture"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/im-2.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 5: MatchTrack */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="tennis"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/match-track"
                >
                  <span className="font-medium">MatchTrack</span>
                </HoverLink>
                {" — "}
                <span>
                  Built a React Native mobile SaaS for tennis academies in Denmark. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="MatchTrack Navigation"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/mt-7.webp"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="MatchTrack User Flows"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/mt-5.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 6: The Office Outlet */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="office"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/office-outlet"
                >
                  <span className="font-medium">The Office Outlet</span>
                </HoverLink>
                {" — "}
                <span>
                  Designed and Built an Interactive workstation space planning and e-commerce web application for the UAE market. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="The Office Outlet"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/office1.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 7: InsideMaps Website Redesign */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="redesign"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/insidemaps-redesign"
                >
                  <span className="font-medium">InsideMaps Platform Redesign</span>
                </HoverLink>
                {" — "}
                <span>
                  Re-architecting the web presence and user onboarding flow for a legacy 3D spatial platform. 
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="InsideMaps UX & Platform Redesign"
                    loading="lazy"
                    width={1200}
                    height={750}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/redesign1.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 8: Interaction Design Archive */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="interaction"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/interaction-archive"
                >
                  <span className="font-medium">Interaction Design & Branding & Illustration</span>
                </HoverLink>
                {" — "}
                <span>
                  A collection of micro-interactions, Illustration and Some branding work.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="VisionOS Gestures"
                    loading="lazy"
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/visionos1.webp"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="iPadOS Dock Animation"
                    loading="lazy"
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/ipados2.webp"
                  />
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>
    </main>
  );
}
