"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import HoverLink from "../../components/HoverLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "../../constants";

/**
 * Builds an ordered list of story beats from the project data.
 * Every single image listed in index.js is guaranteed to have a corresponding story beat.
 */
function buildStoryBeats(project) {
  if (!project) return [];
  const cs = project.caseStudy || {};
  const beats = [];

  // Beat 0: Overview / Hero
  beats.push({
    id: "beat-overview",
    chapter: 0,
    tag: "00 · Overview",
    title: project.name?.split(" - ")?.[0] || "Overview",
    subtitle: "Production Surface",
    image: project.image,
  });

  // Beat 1: The Challenge
  if (cs.problemTitle || cs.problemImages?.length > 0) {
    const problemImg =
      cs.problemImages?.[0] ||
      cs.solutionImages?.find((img) => img.includes("before")) ||
      project.image;

    beats.push({
      id: "beat-problem",
      chapter: 1,
      tag: "01 · The Challenge",
      title: cs.problemTitle || "Friction & Fragmentation",
      subtitle: "Problem Space",
      image: problemImg,
    });
  }

  // Beat 2: Research & Discovery phases
  if (cs.researchPhases?.length > 0) {
    cs.researchPhases.forEach((phase, idx) => {
      beats.push({
        id: `beat-research-${idx}`,
        chapter: 2,
        phaseIndex: idx,
        tag: `02 · Research // Phase 0${idx + 1}`,
        title: phase.title,
        subtitle: "Discovery & Workflow",
        image: phase.image || project.image,
      });
    });
  }

  // Beat 3: Solution Architecture & Features
  const solImages = cs.solutionImages || [];
  const features = cs.features || [];
  const solCount = Math.max(solImages.length, features.length, 1);

  for (let i = 0; i < solCount; i++) {
    const featRaw = features[i] || "";
    const featTitle = featRaw.includes(":") ? featRaw.split(":")[0] : featRaw || `System Capability 0${i + 1}`;
    const img = solImages[i] || solImages[0] || project.image;

    beats.push({
      id: `beat-solution-${i}`,
      chapter: 3,
      solutionIndex: i,
      tag: `03 · Solution // 0${i + 1}`,
      title: featTitle,
      subtitle: "Core Architecture",
      image: img,
    });
  }

  // Beat 4: System Refinements (improvementSections)
  if (cs.improvementSections?.length > 0) {
    cs.improvementSections.forEach((sec, idx) => {
      beats.push({
        id: `beat-improvement-${idx}`,
        chapter: 4,
        improvementIndex: idx,
        tag: `04 · Refinement 0${idx + 1}`,
        title: sec.title,
        subtitle: "System Evolution",
        image: sec.image || project.image,
      });
    });
  }

  // Beat 5: Impact, Results & Production Validation
  if (cs.resultsImages?.length > 0) {
    cs.resultsImages.forEach((resImg, idx) => {
      beats.push({
        id: `beat-results-${idx}`,
        chapter: 5,
        resultIndex: idx,
        tag: `05 · Production Validation 0${idx + 1}`,
        title: cs.resultsTitle || "Measured Outcomes",
        subtitle: "Production Validation",
        image: resImg,
      });
    });
  } else if (cs.resultsTitle) {
    beats.push({
      id: "beat-results-0",
      chapter: 5,
      resultIndex: 0,
      tag: "05 · Impact & Results",
      title: cs.resultsTitle,
      subtitle: "Production Outcomes",
      image: cs.solutionImages?.[cs.solutionImages.length - 1] || project.image,
    });
  }

  return beats;
}

export default function CaseStudyClient({ project }) {
  const storyBeats = useMemo(() => buildStoryBeats(project), [project]);

  // All unique images for gallery navigation
  const uniqueImages = useMemo(() => {
    const seen = new Set();
    const list = [];
    storyBeats.forEach((b) => {
      if (b.image && !seen.has(b.image)) {
        seen.add(b.image);
        list.push({
          src: b.image,
          title: b.title,
          tag: b.tag,
          beatId: b.id,
        });
      }
    });
    return list;
  }, [storyBeats]);

  const [activeBeatId, setActiveBeatId] = useState(storyBeats[0]?.id || "beat-overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showWipeSlider, setShowWipeSlider] = useState(false);
  const [wipeSliderPos, setWipeSliderPos] = useState(50);
  const [isDraggingWipe, setIsDraggingWipe] = useState(false);

  const wipeContainerRef = useRef(null);

  // Derive active beat object
  const activeBeat = useMemo(() => {
    return storyBeats.find((b) => b.id === activeBeatId) || storyBeats[0];
  }, [storyBeats, activeBeatId]);

  const activeImage = activeBeat?.image || project?.image;

  // Derive before/after images for optional comparison
  const cs = project?.caseStudy || {};
  const beforeImage =
    cs.problemImages?.[0] ||
    cs.solutionImages?.find((img) => img.includes("before")) ||
    null;
  const afterImage =
    cs.solutionImages?.find((img) => img.includes("after")) ||
    cs.solutionImages?.[0] ||
    null;
  const hasBeforeAfter = Boolean(beforeImage && afterImage && beforeImage !== afterImage);

  // Esc and Arrow key listener for modal lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") {
          setLightboxIndex(null);
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev + 1) % uniqueImages.length);
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, uniqueImages.length]);

  // Scroll sync engine with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const elements = document.querySelectorAll("[data-beat-id]");
          if (elements.length === 0) {
            ticking = false;
            return;
          }

          const readingLine = window.innerHeight * 0.42;
          let currentEl = elements[0];

          elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= readingLine) {
              currentEl = el;
            }
          });

          if (currentEl) {
            const beatId = currentEl.getAttribute("data-beat-id");
            if (beatId) {
              setActiveBeatId(beatId);
            }
          }

          // Calculate total scroll progress
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
            setScrollProgress(progress);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [storyBeats]);

  // Wipe slider drag handlers
  const handleWipeMove = useCallback((clientX) => {
    if (!wipeContainerRef.current) return;
    const rect = wipeContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setWipeSliderPos(percentage);
  }, []);

  const handlePointerDown = (e) => {
    setIsDraggingWipe(true);
    handleWipeMove(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDraggingWipe) {
        handleWipeMove(e.clientX);
      }
    };
    const handlePointerUp = () => {
      setIsDraggingWipe(false);
    };

    if (isDraggingWipe) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDraggingWipe, handleWipeMove]);

  // Jump to beat by ID
  const jumpToBeat = (beatId) => {
    setActiveBeatId(beatId);
    const el = document.getElementById(beatId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };



  if (!project) {
    return (
      <main className="min-h-screen bg-transparent text-black dark:text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl mb-4 font-bold">Project Not Found</h1>
          <HoverLink href="/" preset="work" className="hover:underline text-lg">
            ← Back to Work
          </HoverLink>
        </div>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="relative min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 antialiased">
      {/* 
        Container with right padding on desktop so the right sticky stage 
        sits comfortably to the left of the fixed desktop navigation.
      */}
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-36 xl:pr-40 pt-4 pb-28">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          
          {/* =========================================================================
              LEFT COLUMN: Editorial Narrative, Metadata, and Interactive Story Beats
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-4">
            
            {/* Back link */}
            <div className="mb-8">
              <HoverLink
                href="/"
                preset="work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                ← Back to Work
              </HoverLink>
            </div>

            {/* Case Study Header */}
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
                Case Study · {project.frameworks?.[0]?.name || "Product Design"}
              </p>
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-neutral-950 dark:text-white mb-6">
                {project.name.split(" - ")[0]}
              </h1>
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.description}
              </p>
            </div>

            {/* Metadata Facts Table */}
            <div className="border-t border-b border-neutral-200 dark:border-neutral-800 py-4 mb-14 divide-y divide-neutral-100 dark:divide-neutral-800/60 font-sans text-sm">
              {cs.role && (
                <div className="py-2.5 grid grid-cols-12 items-baseline">
                  <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Role
                  </span>
                  <span className="col-span-8 font-medium text-neutral-900 dark:text-neutral-100">
                    {cs.role}
                  </span>
                </div>
              )}
              {cs.team && (
                <div className="py-2.5 grid grid-cols-12 items-baseline">
                  <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Team
                  </span>
                  <span className="col-span-8 font-medium text-neutral-900 dark:text-neutral-100">
                    {cs.team}
                  </span>
                </div>
              )}
              {cs.techStack && (
                <div className="py-2.5 grid grid-cols-12 items-baseline">
                  <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Stack
                  </span>
                  <span className="col-span-8 font-medium text-neutral-900 dark:text-neutral-100">
                    {cs.techStack}
                  </span>
                </div>
              )}
              {project.visitUrl && (
                <div className="py-2.5 grid grid-cols-12 items-baseline">
                  <span className="col-span-4 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Link
                  </span>
                  <span className="col-span-8">
                    <HoverLink
                      href={project.visitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      preset="writer"
                      className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      Visit Live Product ↗
                    </HoverLink>
                  </span>
                </div>
              )}
            </div>

            {/* =====================================================================
                STORY BEATS (Sequenced in numbered chapters with active indicators)
                ===================================================================== */}
            <div className="space-y-24">

              {/* CHAPTER 0: Overview */}
              <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                <div
                  id="beat-overview"
                  data-beat-id="beat-overview"
                  className={`case-sbeat relative pl-6 transition-colors duration-300 ${
                    activeBeatId === "beat-overview" ? "is-active text-neutral-950 dark:text-white" : ""
                  }`}
                >
                  <div className="case-sbeat-tick absolute left-0 top-1 bottom-1 w-[2.5px] rounded-full bg-blue-600 dark:bg-blue-400" />
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                    00 · Overview
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                    The intention, the context, and the brief.
                  </h2>
                  <p className="text-lg leading-relaxed mb-6 font-normal">
                    {cs.overview || project.description}
                  </p>

                  {/* Inline preview for mobile */}
                  <div className="lg:hidden my-6 rounded-none overflow-hidden border border-neutral-300/80 dark:border-neutral-800 shadow-md">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                      onClick={() => setLightboxIndex(0)}
                    />
                  </div>

                  <ul className="space-y-3.5 my-6 border-y border-neutral-200/80 dark:border-neutral-800/80 py-5 text-sm sm:text-base">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                      <span>
                        <strong className="font-semibold text-neutral-900 dark:text-white">Role:</strong>{" "}
                        {cs.role} leading user experience and interface engineering.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                      <span>
                        <strong className="font-semibold text-neutral-900 dark:text-white">Collaboration:</strong>{" "}
                        Partnered closely with {cs.team || "cross-functional teams"} to validate real user constraints.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                      <span>
                        <strong className="font-semibold text-neutral-900 dark:text-white">Foundation:</strong>{" "}
                        Engineered with {cs.techStack} prioritizing responsiveness and predictable state.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* CHAPTER 1: The Challenge */}
              {cs.problemTitle && (
                <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                  <div
                    id="beat-problem"
                    data-beat-id="beat-problem"
                    className={`case-sbeat relative pl-6 transition-colors duration-300 ${
                      activeBeatId === "beat-problem" ? "is-active text-neutral-950 dark:text-white" : ""
                    }`}
                  >
                    <div className="case-sbeat-tick absolute left-0 top-1 bottom-1 w-[2.5px] rounded-full bg-blue-600 dark:bg-blue-400" />
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                      01 · The Challenge
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                      {cs.problemTitle}
                    </h2>
                    <p className="text-lg leading-relaxed mb-6 font-normal">
                      {cs.problemContent}
                    </p>

                    {/* Inline preview for mobile */}
                    {(cs.problemImages?.[0] || beforeImage) && (
                      <div className="lg:hidden my-6 rounded-none overflow-hidden border border-neutral-300/80 dark:border-neutral-800 shadow-md">
                        <img
                          src={cs.problemImages?.[0] || beforeImage}
                          alt="Problem Challenge"
                          className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                          onClick={() => {
                            const img = cs.problemImages?.[0] || beforeImage;
                            const idx = uniqueImages.findIndex((u) => u.src === img);
                            setLightboxIndex(idx >= 0 ? idx : 0);
                          }}
                        />
                      </div>
                    )}

                    <div className="my-6 p-4 rounded-none border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 text-sm">
                      <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">
                        <Icon icon="lucide:sparkles" className="size-3.5" />
                        Key Usability Insight
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 italic text-sm">
                        "Density without intentional hierarchy creates cognitive noise. Users shouldn't have to decipher the tool before doing their work."
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* CHAPTER 2: Research & Discovery */}
              {cs.researchPhases?.length > 0 && (
                <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                  <div className="relative pl-6 mb-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                      02 · Research & Discovery
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                      {cs.researchTitle || "Mapping Workflow Breakdowns"}
                    </h2>
                    <p className="text-lg leading-relaxed font-normal">
                      We observed users directly inside their production routines to identify where expectations diverged from interface behavior.
                    </p>
                  </div>

                  <div className="space-y-6 mt-6">
                    {cs.researchPhases.map((phase, idx) => {
                      const beatId = `beat-research-${idx}`;
                      const isActive = activeBeatId === beatId;

                      return (
                        <div
                          key={idx}
                          id={beatId}
                          data-beat-id={beatId}
                          onClick={() => jumpToBeat(beatId)}
                          className={`p-5 rounded-none border transition-all cursor-pointer ${
                            isActive
                              ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 shadow-md ring-1 ring-blue-500/20"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/40 dark:bg-neutral-900/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              Phase 0{idx + 1}
                            </span>
                            {isActive && (
                              <span className="font-mono text-[10px] uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Active on Stage
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1.5">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {phase.content}
                          </p>

                          {/* Inline preview for mobile */}
                          {phase.image && (
                            <div className="lg:hidden mt-4 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800">
                              <img
                                src={phase.image}
                                alt={phase.title}
                                className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const uIdx = uniqueImages.findIndex((u) => u.src === phase.image);
                                  setLightboxIndex(uIdx >= 0 ? uIdx : 0);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CHAPTER 3: The Solution */}
              {(cs.solutionTitle || cs.solutionImages?.length > 0 || cs.features?.length > 0) && (
                <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                  <div className="relative pl-6 mb-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                      03 · The Solution
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                      {cs.solutionTitle || "A Focused Solution System"}
                    </h2>
                    <p className="text-lg leading-relaxed font-normal">
                      {cs.solutionContent || "Designing cohesive architecture that brings workflows into one place."}
                    </p>
                  </div>

                  {/* Core capabilities & solution images sequence */}
                  <div className="space-y-6 mt-6">
                    {(() => {
                      const solImages = cs.solutionImages || [];
                      const features = cs.features || [];
                      const count = Math.max(solImages.length, features.length, 1);

                      return Array.from({ length: count }).map((_, idx) => {
                        const beatId = `beat-solution-${idx}`;
                        const isActive = activeBeatId === beatId;
                        const featRaw = features[idx] || "";
                        const [headline, ...rest] = featRaw.split(":");
                        const title = headline || `Capability 0${idx + 1}`;
                        const description = rest.join(":").trim() || "Interface architecture and interaction pattern.";
                        const img = solImages[idx] || solImages[0] || project.image;

                        return (
                          <div
                            key={idx}
                            id={beatId}
                            data-beat-id={beatId}
                            onClick={() => jumpToBeat(beatId)}
                            className={`p-5 rounded-none border transition-all cursor-pointer ${
                              isActive
                                ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-md ring-1 ring-emerald-500/20"
                                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/40 dark:bg-neutral-900/40"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                Solution Capability 0{idx + 1}
                              </span>
                              {isActive && (
                                <span className="font-mono text-[10px] uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  Active on Stage
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1.5">
                              {title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {description}
                            </p>

                            {/* Inline preview for mobile */}
                            {img && (
                              <div className="lg:hidden mt-4 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800">
                                <img
                                  src={img}
                                  alt={title}
                                  className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const uIdx = uniqueImages.findIndex((u) => u.src === img);
                                    setLightboxIndex(uIdx >= 0 ? uIdx : 0);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </section>
              )}

              {/* CHAPTER 4: System Refinements */}
              {cs.improvementSections?.length > 0 && (
                <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                  <div className="relative pl-6 mb-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                      04 · System Refinements
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                      Refining the Grammar & Edge States
                    </h2>
                    <p className="text-lg leading-relaxed font-normal">
                      High visual polish matters only when backed by reliable error boundaries and consistent design tokens.
                    </p>
                  </div>

                  <div className="space-y-6 mt-6">
                    {cs.improvementSections.map((sec, idx) => {
                      const beatId = `beat-improvement-${idx}`;
                      const isActive = activeBeatId === beatId;

                      return (
                        <div
                          key={idx}
                          id={beatId}
                          data-beat-id={beatId}
                          onClick={() => jumpToBeat(beatId)}
                          className={`p-5 rounded-none border transition-all cursor-pointer ${
                            isActive
                              ? "border-purple-500 bg-purple-50/40 dark:bg-purple-950/20 shadow-md ring-1 ring-purple-500/20"
                              : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/40 dark:bg-neutral-900/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                              Refinement 0{idx + 1}
                            </span>
                            {isActive && (
                              <span className="font-mono text-[10px] uppercase bg-purple-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Active on Stage
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1.5">
                            {sec.title}
                          </h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {sec.content}
                          </p>

                          {/* Inline preview for mobile */}
                          {sec.image && (
                            <div className="lg:hidden mt-4 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800">
                              <img
                                src={sec.image}
                                alt={sec.title}
                                className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const uIdx = uniqueImages.findIndex((u) => u.src === sec.image);
                                  setLightboxIndex(uIdx >= 0 ? uIdx : 0);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CHAPTER 5: Impact & Results */}
              {(cs.resultsTitle || cs.resultsImages?.length > 0) && (
                <section className="sch border-t border-neutral-200 dark:border-neutral-800 pt-8">
                  <div className="relative pl-6 mb-6">
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                      05 · Impact & Results
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                      {cs.resultsTitle || "Production Validation"}
                    </h2>

                    {cs.resultsMetric && (
                      <div className="my-6 p-6 rounded-none border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/60 dark:to-neutral-950/60 shadow-sm">
                        <div className="font-serif font-black text-6xl sm:text-7xl tracking-tighter text-blue-600 dark:text-blue-400 mb-2">
                          {cs.resultsMetric}
                        </div>
                        <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                          Production Metric Reported
                        </div>
                      </div>
                    )}

                    <p className="text-lg leading-relaxed font-normal">
                      {cs.resultsContent}
                    </p>
                  </div>

                  {/* Results images beats */}
                  {cs.resultsImages?.length > 0 && (
                    <div className="space-y-6 mt-6">
                      {cs.resultsImages.map((resImg, idx) => {
                        const beatId = `beat-results-${idx}`;
                        const isActive = activeBeatId === beatId;

                        return (
                          <div
                            key={idx}
                            id={beatId}
                            data-beat-id={beatId}
                            onClick={() => jumpToBeat(beatId)}
                            className={`p-5 rounded-none border transition-all cursor-pointer ${
                              isActive
                                ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 shadow-md ring-1 ring-blue-500/20"
                                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/40 dark:bg-neutral-900/40"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Production Outcome 0{idx + 1}
                              </span>
                              {isActive && (
                                <span className="font-mono text-[10px] uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  Active on Stage
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1.5">
                              Production Interface Validation
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              Live deployment screen verifying system performance and usability under real production load.
                            </p>

                            {/* Inline preview for mobile */}
                            <div className="lg:hidden mt-4 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800">
                              <img
                                src={resImg}
                                alt={`Result outcome ${idx + 1}`}
                                className="w-full aspect-[16/10] object-cover cursor-zoom-in"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const uIdx = uniqueImages.findIndex((u) => u.src === resImg);
                                  setLightboxIndex(uIdx >= 0 ? uIdx : 0);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              )}

            </div>

            {/* Next / Previous Project Navigation */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-10 mt-20 flex flex-col sm:flex-row justify-between gap-6">
              <div>
                {prevProject ? (
                  <HoverLink
                    href={prevProject.href}
                    preset="work"
                    className="no-underline group hover:underline text-left block text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      ← Previous Project
                    </div>
                    <div className="text-base font-semibold group-hover:underline">
                      {prevProject.name.split(" - ")[0]}
                    </div>
                  </HoverLink>
                ) : (
                  <HoverLink
                    href="/"
                    preset="work"
                    className="font-mono text-xs uppercase tracking-wider text-neutral-400 hover:underline block"
                  >
                    ← All Projects
                  </HoverLink>
                )}
              </div>

              <div>
                {nextProject && (
                  <HoverLink
                    href={nextProject.href}
                    preset="work"
                    className="no-underline group hover:underline text-right block text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Next Project →
                    </div>
                    <div className="text-base font-semibold group-hover:underline">
                      {nextProject.name.split(" - ")[0]}
                    </div>
                  </HoverLink>
                )}
              </div>
            </div>
          </div>


          {/* =========================================================================
              RIGHT COLUMN: Truly Sticky Interactive Artboard Stage (7 Columns)
              ========================================================================= */}
          <div className="lg:col-span-7 relative h-full">
            {/* 
              This sticky wrapper stays pinned across the ENTIRE height of the story!
              `top-16 lg:top-20` ensures it has perfect vertical headroom.
            */}
            <div className="sticky top-16 lg:top-20 w-full h-[620px] lg:h-[calc(100vh-6rem)] max-h-[820px] min-h-[500px]">
              
              {/* THE BOARD */}
              <div className="relative w-full h-full rounded-none border border-neutral-300/80 dark:border-neutral-800 bg-[#f4f4f1] dark:bg-[#0e0f12] overflow-hidden shadow-2xl flex flex-col justify-between select-none">
                
                {/* 1. Progress Bar across top */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-neutral-200/60 dark:bg-neutral-800 z-30 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150 ease-out"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>

                {/* 2. Ambient Glow Aura */}
                <div
                  className="case-aura absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full pointer-events-none opacity-80 z-0"
                  aria-hidden="true"
                />

                {/* 3. Top Bar (Inspect trigger & optional Before/After comparison toggle) */}
                <div className="relative z-20 px-5 pt-3.5 pb-2 flex items-center justify-end">
                  <div className="flex items-center gap-2">
                    {hasBeforeAfter && (
                      <button
                        type="button"
                        onClick={() => setShowWipeSlider((prev) => !prev)}
                        className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                          showWipeSlider
                            ? "bg-blue-600 text-white"
                            : "bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300"
                        }`}
                        title="Toggle interactive before & after wipe slider"
                      >
                        <Icon icon="lucide:split" className="size-3" />
                        {showWipeSlider ? "Standard View" : "Compare Wipe"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        const idx = uniqueImages.findIndex((u) => u.src === activeImage);
                        setLightboxIndex(idx >= 0 ? idx : 0);
                      }}
                      className="px-2.5 py-1 rounded bg-white/90 dark:bg-neutral-900/90 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-800 font-mono text-[11px] text-neutral-600 dark:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="Click to view full image in lightbox"
                    >
                      <Icon icon="lucide:maximize-2" className="size-3" />
                      Inspect
                    </button>
                  </div>
                </div>

                {/* ===================================================================
                    4. THE STAGE WINDOW CANVAS (macOS browser frame)
                    =================================================================== */}
                <div className="relative flex-1 w-full px-5 pt-2 pb-5 flex items-center justify-center overflow-hidden z-10">

                  {showWipeSlider && hasBeforeAfter ? (
                    /* Interactive Wipe View */
                    <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                      <div
                        ref={wipeContainerRef}
                        onPointerDown={handlePointerDown}
                        className="relative w-full max-h-[88%] aspect-[16/10] rounded-none overflow-hidden bg-neutral-950 border border-black/10 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] select-none cursor-ew-resize touch-none flex flex-col"
                      >
                        {/* Chrome header */}
                        <div className="h-8 px-3.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between shrink-0 z-20">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="font-mono text-[10px] text-neutral-400 px-3 py-0.5 rounded bg-black/40 border border-white/10">
                            interactive-wipe · {Math.round(wipeSliderPos)}%
                          </div>
                          <div className="w-8" />
                        </div>

                        {/* Wipe canvas */}
                        <div className="relative flex-1 w-full overflow-hidden">
                          <img
                            src={beforeImage}
                            alt="Before"
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          />
                          <div className="absolute top-3 left-3 z-10 font-mono text-[10px] bg-black/75 backdrop-blur text-neutral-200 px-2.5 py-0.5 rounded border border-white/10 pointer-events-none">
                            Before / Legacy
                          </div>

                          <div
                            className="absolute inset-0 overflow-hidden pointer-events-none"
                            style={{ clipPath: `inset(0 0 0 ${wipeSliderPos}%)` }}
                          >
                            <img
                              src={afterImage}
                              alt="After"
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            />
                            <div className="absolute top-3 right-3 font-mono text-[10px] bg-blue-600/90 backdrop-blur text-white px-2.5 py-0.5 rounded border border-white/10 pointer-events-none">
                              After / Redesign
                            </div>
                          </div>

                          <div
                            className="absolute top-0 bottom-0 w-[2.5px] bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] z-20 pointer-events-none"
                            style={{ left: `${wipeSliderPos}%` }}
                          >
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-500 flex items-center justify-center shadow-lg text-blue-600 dark:text-blue-400">
                              <Icon icon="lucide:chevrons-left-right" className="size-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Wipe jump buttons */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <button
                          type="button"
                          onClick={() => setWipeSliderPos(100)}
                          className={`px-3 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                            wipeSliderPos >= 90
                              ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold"
                              : "bg-white/70 dark:bg-neutral-900/70 border border-neutral-300/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          View Before
                        </button>
                        <button
                          type="button"
                          onClick={() => setWipeSliderPos(50)}
                          className={`px-3 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                            wipeSliderPos > 30 && wipeSliderPos < 70
                              ? "bg-blue-600 text-white font-semibold"
                              : "bg-white/70 dark:bg-neutral-900/70 border border-neutral-300/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          Split (50%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWipeSliderPos(0)}
                          className={`px-3 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                            wipeSliderPos <= 10
                              ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold"
                              : "bg-white/70 dark:bg-neutral-900/70 border border-neutral-300/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          View After
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Standard Screen Showcase */
                    <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                      <div
                        className="relative w-full max-h-[92%] aspect-[16/10] rounded-none overflow-hidden bg-white dark:bg-[#18181b] border border-black/10 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] cursor-zoom-in group flex flex-col"
                        onClick={() => {
                          const idx = uniqueImages.findIndex((u) => u.src === activeImage);
                          setLightboxIndex(idx >= 0 ? idx : 0);
                        }}
                      >
                        {/* Chrome header */}
                        <div className="h-8 px-3.5 bg-neutral-100 dark:bg-neutral-900/90 border-b border-black/5 dark:border-white/5 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 px-3 py-0.5 rounded bg-white/70 dark:bg-black/30 border border-black/5 dark:border-white/5 truncate max-w-[220px]">
                            {activeBeat?.title || "interface-surface"}
                          </div>
                          <div className="w-8" />
                        </div>

                        {/* Image canvas with smooth crossfade */}
                        <div className="relative flex-1 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">
                          {activeImage && (
                            <img
                              key={activeImage}
                              src={activeImage}
                              alt={activeBeat?.title || "Case study visual"}
                              className="w-full h-full object-cover transition-all duration-500 ease-out animate-in fade-in zoom-in-95 group-hover:scale-105"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>



              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Lightbox with Gallery Carousel */}
      {lightboxIndex !== null && uniqueImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
          >
            <Icon icon="lucide:x" className="size-6" />
          </button>

          {/* Left Arrow */}
          {uniqueImages.length > 1 && (
            <button
              type="button"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
              }}
              title="Previous Image (Left Arrow)"
            >
              <Icon icon="lucide:chevron-left" className="size-7" />
            </button>
          )}

          {/* Right Arrow */}
          {uniqueImages.length > 1 && (
            <button
              type="button"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % uniqueImages.length);
              }}
              title="Next Image (Right Arrow)"
            >
              <Icon icon="lucide:chevron-right" className="size-7" />
            </button>
          )}

          {/* Center Image Container */}
          <div
            className="relative flex flex-col items-center justify-center max-h-[92vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={uniqueImages[lightboxIndex].src}
              alt={uniqueImages[lightboxIndex].title}
              className="max-h-[82vh] max-w-[90vw] object-contain rounded-none shadow-2xl"
            />
            <div className="mt-3 text-center">
              <span className="font-mono text-xs text-neutral-300 font-medium block">
                {uniqueImages[lightboxIndex].tag} · {uniqueImages[lightboxIndex].title}
              </span>
              <span className="font-mono text-[11px] text-neutral-500 block mt-0.5">
                {lightboxIndex + 1} of {uniqueImages.length} · Use arrow keys to navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
