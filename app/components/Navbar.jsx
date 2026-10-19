"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HoverLink from "./HoverLink";

function MobileNavLink({ href, preset, label, isActive }) {
  return (
    <HoverLink
      preset={preset}
      href={href}
      className={`text-lg nav-link-hover dark:text-white dark:hover:text-gray-300 ${
        isActive ? "font-medium" : ""
      }`}
    >
      <span className="inline-flex flex-col items-center justify-center">
        <span className={isActive ? "font-medium" : "font-normal"}>
          {label}
        </span>
        <span
          className="font-medium h-0 overflow-hidden invisible select-none"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </HoverLink>
  );
}

function DesktopNavLink({ href, preset, label, isActive }) {
  return (
    <HoverLink
      preset={preset}
      href={href}
      className={`mb-2 nav-link-hover dark:text-white dark:hover:text-gray-300 ${
        isActive ? "font-medium" : ""
      }`}
    >
      <span className="inline-flex flex-col items-end">
        <span className={isActive ? "font-medium" : "font-normal"}>
          {label}
        </span>
        <span
          className="font-medium h-0 overflow-hidden invisible select-none"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </HoverLink>
  );
}

export function Navbar() {
  const pathname = usePathname();

  // Hide default nav in terminal mode
  if (pathname === "/dev" || pathname.startsWith("/dev/")) {
    return null;
  }

  const isWorkActive = pathname === "/" || pathname.startsWith("/case-study");
  const isTimelineActive = pathname === "/timeline" || pathname.startsWith("/timeline");
  const isAboutActive = pathname === "/about" || pathname.startsWith("/about");
  const isNotesActive = pathname === "/notes" || pathname.startsWith("/notes");
  const isInteractionsActive =
    pathname === "/interaction-archive" || pathname.startsWith("/interaction-archive");

  return (
    <>
      {/* Mobile Top Navigation - Persistent across page navigations */}
      <header className="md:hidden flex flex-row items-center px-7 pt-4 pb-2 mb-6 w-full">
        <nav className="flex flex-row gap-5" aria-label="Main Navigation">
          <MobileNavLink
            href="/"
            preset="work"
            label="Work"
            isActive={isWorkActive}
          />
          <MobileNavLink
            href="/timeline"
            preset="hero"
            label="Timeline"
            isActive={isTimelineActive}
          />
          <MobileNavLink
            href="/about"
            preset="about"
            label="About"
            isActive={isAboutActive}
          />
          <MobileNavLink
            href="/notes"
            preset="notes"
            label="Notes"
            isActive={isNotesActive}
          />
          <MobileNavLink
            href="/interaction-archive"
            preset="interactions_nav"
            label="Interactions"
            isActive={isInteractionsActive}
          />
        </nav>
      </header>

      {/* Desktop Fixed Right Navigation - Persistent across page navigations */}
      <aside
        className="hidden md:block md:fixed md:right-8 md:top-4 z-20 pt-4 pb-20 transition-opacity"
        aria-label="Desktop Navigation"
      >
        <div className="flex flex-col items-end text-right md:mt-0 mt-6">
          <DesktopNavLink
            href="/"
            preset="work"
            label="Work"
            isActive={isWorkActive}
          />
          <DesktopNavLink
            href="/timeline"
            preset="hero"
            label="Timeline"
            isActive={isTimelineActive}
          />
          <DesktopNavLink
            href="/about"
            preset="about"
            label="About"
            isActive={isAboutActive}
          />
          <DesktopNavLink
            href="/notes"
            preset="notes"
            label="Notes"
            isActive={isNotesActive}
          />
          <DesktopNavLink
            href="/interaction-archive"
            preset="interactions_nav"
            label="Interactions"
            isActive={isInteractionsActive}
          />
          <HoverLink
            preset="terminal"
            className="mb-8 nav-link-hover dark:text-white dark:hover:text-gray-300"
            href="/dev"
          >
            Terminal mode
          </HoverLink>
          <HoverLink
            preset="linkedin"
            className="mb-2 nav-link-hover dark:text-white dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
          >
            LinkedIn
          </HoverLink>
          <HoverLink
            preset="github"
            className="mb-2 nav-link-hover dark:text-white dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/git-emran"
          >
            GitHub
          </HoverLink>
          <HoverLink
            preset="instagram"
            className="mb-2 nav-link-hover dark:text-white dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/designwithemran/"
          >
            Instagram
          </HoverLink>
          <HoverLink
            preset="blog"
            className="mb-2 nav-link-hover dark:text-white dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://my-blog-omega-ashy.vercel.app/"
          >
            Blog
          </HoverLink>
        </div>
      </aside>
    </>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide in terminal mode
  if (pathname === "/dev" || pathname.startsWith("/dev/")) {
    return null;
  }

  return (
    <footer className="md:hidden flex flex-row flex-wrap px-7 py-2 pb-10 w-full mt-auto">
      <HoverLink
        preset="linkedin"
        className="text-left nav-link-hover text-lg dark:text-white inline-block transition"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
      >
        LinkedIn
      </HoverLink>
      <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
      <HoverLink
        preset="github"
        className="text-left nav-link-hover text-lg dark:text-white inline-block transition"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/git-emran"
      >
        GitHub
      </HoverLink>
      <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
      <HoverLink
        preset="instagram"
        className="text-left nav-link-hover text-lg dark:text-white inline-block transition"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/designwithemran/"
      >
        Instagram
      </HoverLink>
      <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
      <HoverLink
        preset="blog"
        className="text-left nav-link-hover text-lg dark:text-white inline-block transition"
        target="_blank"
        rel="noopener noreferrer"
        href="https://my-blog-omega-ashy.vercel.app/"
      >
        Blog
      </HoverLink>
    </footer>
  );
}

export default Navbar;
