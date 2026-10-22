"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHoverBackground } from "./HoverBackgroundProvider";
import { useNavbarContext } from "./NavbarContext";

export default function HoverLink({
  href,
  preset = "default",
  tint,
  distortion,
  swirl,
  speed,
  grainMixer,
  grainOverlay,
  className = "",
  children,
  target,
  rel,
  onClick,
  ...props
}) {
  const { triggerHover, clearHover } = useHoverBackground();
  const inNavbarFromContext = useNavbarContext();
  const pathname = usePathname();
  const [isLocalHovered, setIsLocalHovered] = useState(false);

  const handleMouseEnter = (e) => {
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
      return;
    }

    const isNavbar =
      inNavbarFromContext ||
      props["data-navbar"] === "true" ||
      props["data-navbar"] === true ||
      !!(
        e?.currentTarget &&
        e.currentTarget.closest(
          "[data-navbar='true'], header > nav, aside[aria-label='Desktop Navigation'], footer"
        )
      );

    const isWorksPage = pathname === "/" || pathname === "";

    // Except for links on the works page and navbar, other links should not trigger the hover animation
    if (!isWorksPage && !isNavbar) {
      return;
    }

    setIsLocalHovered(true);
    let rects = [];
    let shouldBlur = false;

    if (e && e.currentTarget) {
      const article = e.currentTarget.closest("article");
      if (article && typeof article.getBoundingClientRect === "function") {
        const r = article.getBoundingClientRect();
        rects = [
          {
            x: r.left,
            y: r.top,
            width: r.width,
            height: r.height,
          },
        ];
        shouldBlur = true;
      }
    }

    triggerHover({
      rects,
      shouldBlur,
      isNavbar,
      ...(preset ? { preset } : {}),
      ...(tint ? { tint } : {}),
      ...(distortion !== undefined ? { distortion } : {}),
      ...(swirl !== undefined ? { swirl } : {}),
      ...(speed !== undefined ? { speed } : {}),
      ...(grainMixer !== undefined ? { grainMixer } : {}),
      ...(grainOverlay !== undefined ? { grainOverlay } : {}),
    });
  };

  const handleMouseLeave = () => {
    setIsLocalHovered(false);
    clearHover();
  };

  const handleClick = (e) => {
    setIsLocalHovered(false);
    clearHover(true);
    if (onClick) onClick(e);
  };

  const combinedStyle = {
    ...props.style,
    ...(isLocalHovered ? { position: "relative" } : {}),
  };

  const isExternal =
    target === "_blank" ||
    (typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")));

  if (isExternal) {
    return (
      <a
        {...props}
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={className}
        style={combinedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      {...props}
      href={href}
      className={className}
      style={combinedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
