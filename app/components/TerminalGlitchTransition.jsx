"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./TerminalGlitchTransition.css";

export default function TerminalGlitchTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [transitionState, setTransitionState] = useState({
    active: false,
    direction: "to-terminal", // 'to-terminal' | 'to-gui'
    phase: "idle", // 'entering' | 'settling' | 'idle'
    targetUrl: "/dev",
  });

  const timerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  // Play synthetic audio for GUI -> Terminal transition
  const playGlitchSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
      setTimeout(() => ctx.close().catch(() => {}), 300);
    } catch {}
  }, []);

  // Play synthetic audio for Terminal -> GUI transition (CRT collapse & modern compositor wake chime)
  const playGuiExitSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. CRT coil discharge / degauss pitch drop
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(380, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.2);

      gain1.gain.setValueAtTime(0.05, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.21);

      // 2. High-frequency digital de-sync blip
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(840, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(200, now + 0.16);
      gain2.gain.setValueAtTime(0.025, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.17);

      // 3. Crisp luminous harmonic chime (compositor startup)
      const oscChime = ctx.createOscillator();
      const gainChime = ctx.createGain();
      oscChime.type = "sine";
      oscChime.frequency.setValueAtTime(587.33, now + 0.22); // D5
      oscChime.frequency.setValueAtTime(880, now + 0.32); // A5
      gainChime.gain.setValueAtTime(0.001, now + 0.22);
      gainChime.gain.linearRampToValueAtTime(0.04, now + 0.25);
      gainChime.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
      oscChime.connect(gainChime);
      gainChime.connect(ctx.destination);
      oscChime.start(now + 0.22);
      oscChime.stop(now + 0.59);

      setTimeout(() => ctx.close().catch(() => {}), 700);
    } catch {}
  }, []);

  // Trigger GUI -> Terminal transition
  const startTerminalTransition = useCallback(
    (targetUrl = "/dev") => {
      playGlitchSound();
      setTransitionState({
        active: true,
        direction: "to-terminal",
        phase: "entering",
        targetUrl,
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        router.push(targetUrl);
      }, 420);

      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setTransitionState((prev) => (prev.active ? { ...prev, active: false, phase: "idle" } : prev));
      }, 2500);
    },
    [playGlitchSound, router]
  );

  // Trigger Terminal -> GUI transition
  const startGuiTransition = useCallback(
    (targetUrl = "/") => {
      playGuiExitSound();
      setTransitionState({
        active: true,
        direction: "to-gui",
        phase: "entering",
        targetUrl,
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        router.push(targetUrl);
      }, 380);

      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setTransitionState((prev) => (prev.active ? { ...prev, active: false, phase: "idle" } : prev));
      }, 2500);
    },
    [playGuiExitSound, router]
  );

  // Expose global trigger for terminal commands (:q, exit, etc.)
  useEffect(() => {
    window.__triggerGuiTransition = (url = "/") => {
      startGuiTransition(url);
    };

    const handleCustomEvent = (e) => {
      const url = e.detail?.targetUrl || "/";
      startGuiTransition(url);
    };

    window.addEventListener("trigger-gui-transition", handleCustomEvent);
    return () => {
      delete window.__triggerGuiTransition;
      window.removeEventListener("trigger-gui-transition", handleCustomEvent);
    };
  }, [startGuiTransition]);

  // Intercept click on links
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      if (anchor.target === "_blank") return;
      if (anchor.origin && anchor.origin !== window.location.origin) return;

      const isTerminalRoute = pathname === "/dev" || pathname.startsWith("/dev/");
      const isTargetTerminal =
        href === "/dev" ||
        href.startsWith("/dev?") ||
        href.startsWith("/dev#") ||
        href.startsWith("/dev/") ||
        (anchor.pathname && anchor.pathname === "/dev");

      // Case A: From GUI -> Terminal
      if (!isTerminalRoute && isTargetTerminal) {
        e.preventDefault();
        e.stopPropagation();
        startTerminalTransition(href || "/dev");
        return;
      }

      // Case B: From Terminal -> GUI
      if (isTerminalRoute && !isTargetTerminal) {
        e.preventDefault();
        e.stopPropagation();
        startGuiTransition(href || "/");
        return;
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [pathname, startTerminalTransition, startGuiTransition]);

  // Handle settling phase when route changes
  useEffect(() => {
    if (!transitionState.active) return;

    if (transitionState.direction === "to-terminal") {
      if (pathname === "/dev" && transitionState.phase === "entering") {
        setTransitionState((prev) => ({ ...prev, phase: "settling" }));
        const settleTimer = setTimeout(() => {
          setTransitionState({
            active: false,
            direction: "to-terminal",
            phase: "idle",
            targetUrl: "/dev",
          });
        }, 260);
        return () => clearTimeout(settleTimer);
      }
    } else if (transitionState.direction === "to-gui") {
      const isDevRoute = pathname === "/dev" || pathname.startsWith("/dev/");
      if (!isDevRoute && transitionState.phase === "entering") {
        setTransitionState((prev) => ({ ...prev, phase: "settling" }));
        const settleTimer = setTimeout(() => {
          setTransitionState({
            active: false,
            direction: "to-gui",
            phase: "idle",
            targetUrl: "/",
          });
        }, 360);
        return () => clearTimeout(settleTimer);
      }
    }
  }, [pathname, transitionState.active, transitionState.phase, transitionState.direction]);

  if (!transitionState.active) return null;

  // DIRECTION 1: GUI -> Terminal (Glitch / TTY Init)
  if (transitionState.direction === "to-terminal") {
    return (
      <div
        className={`glitch-transition-root ${transitionState.phase === "settling" ? "is-settling" : ""}`}
        aria-hidden="true"
      >
        <div className="glitch-scanlines" />
        <div className="glitch-vignette" />
        <div className="glitch-raster-bar" />
        <div className="glitch-layer-cyan" />
        <div className="glitch-layer-magenta" />

        <div className="glitch-hud">
          <div className="glitch-hud-title">
            <span>SYSTEM // TTY_INIT</span>
            <span className="glitch-blink" />
          </div>
          <div className="glitch-hud-status">
            SWITCHING SUBSYSTEM: GUI → TERMINAL
            <br />
            ALLOCATING RAW BUFFER [0x050505]
          </div>
          <div className="glitch-hud-code">STTY -RAW -ECHO // EXEC NVIM</div>
        </div>
      </div>
    );
  }

  // DIRECTION 2: Terminal -> GUI (CRT Beam Collapse & Compositor Restore)
  return (
    <div
      className={`gui-transition-root ${transitionState.phase === "settling" ? "is-settling" : "is-entering"}`}
      aria-hidden="true"
    >
      {/* Background CRT and raster collapse */}
      <div className="gui-crt-container">
        <div className="gui-crt-screen">
          <div className="gui-crt-scanlines" />
          <div className="gui-crt-vignette" />
          <div className="gui-crt-grid" />
        </div>
        <div className="gui-crt-beam" />
        <div className="gui-phosphor-singularity" />
      </div>

      {/* Modern GUI Compositor Aperture & Light Wave */}
      <div className="gui-compositor-aperture">
        <div className="gui-aperture-glow" />
        <div className="gui-aperture-ring" />
        <div className="gui-aperture-iris" />
        <div className="gui-aperture-particles" />
      </div>

      {/* Retro-futuristic Telemetry HUD */}
      <div className="gui-hud-card">
        <div className="gui-hud-header">
          <span className="gui-hud-indicator">
            <span className="gui-hud-dot" />
            <span className="gui-hud-pulse" />
          </span>
          <span className="gui-hud-title">SUBSYSTEM_MIGRATION // RESTORE_GUI</span>
          <span className="gui-hud-badge">EXIT_0</span>
        </div>

        <div className="gui-hud-flow">
          <div className="gui-hud-node gui-hud-node-from">
            <span className="gui-hud-node-tag">SOURCE</span>
            <span className="gui-hud-node-val">RAW_TTY [NVIM]</span>
          </div>
          <div className="gui-hud-arrow">
            <span className="gui-hud-arrow-line" />
            <span className="gui-hud-arrow-head">▶</span>
          </div>
          <div className="gui-hud-node gui-hud-node-to">
            <span className="gui-hud-node-tag">TARGET</span>
            <span className="gui-hud-node-val">GUI_COMPOSITOR</span>
          </div>
        </div>

        <div className="gui-hud-terminal-log">
          <div className="gui-log-line">
            <span className="gui-log-prompt">›</span>
            <span>DEALLOCATING TTY FRAMEBUFFER [0x050505] ... OK</span>
          </div>
          <div className="gui-log-line">
            <span className="gui-log-prompt">›</span>
            <span>RESTORING DISPLAY DRIVER // EXIT CODE 0</span>
          </div>
          <div className="gui-log-line gui-log-highlight">
            <span className="gui-log-prompt">›</span>
            <span>BOOTING DESKTOP COMPOSITOR & DOM CANVAS</span>
          </div>
        </div>

        <div className="gui-hud-progress-wrap">
          <div className="gui-hud-progress-track">
            <div className="gui-hud-progress-fill" />
          </div>
          <div className="gui-hud-progress-labels">
            <span>RESUMING INTERACTIVE SHELL</span>
            <span className="gui-hud-percent">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
