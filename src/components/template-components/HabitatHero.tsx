"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useMode } from "@/providers/ModeProvider";

// =============================================================================
// Parallax Context - for page-wide parallax
// =============================================================================

interface ParallaxContextValue {
  scrollProgress: number;
  scrollY: number;
}

const ParallaxContext = createContext<ParallaxContextValue>({ scrollProgress: 0, scrollY: 0 });

export function useParallax() {
  return useContext(ParallaxContext);
}

// =============================================================================
// Types
// =============================================================================

interface Agent {
  id: string;
  name: string;
  role: string;
  shirt: string;
  pants: string;
  skin: string;
  home: [number, number, number];
  work?: Record<number, [number, number, number]>;
  active: number[];
  task: string;
  body: string;
  input: string;
  output: string;
  access: string;
  limits: string;
  ch: number;
  human?: boolean;
  carry?: boolean;
}

interface Station {
  id: string;
  num: string;
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  ch: number;
  label: string;
  aria: string;
  dashed?: boolean;
  dark?: boolean;
}

interface Chapter {
  n: string;
  name: string;
  tag: string;
  who: string;
  state: string;
  title: string | ((p: Proposal) => string);
  body: (p: Proposal) => string;
  feed: (p: Proposal) => string[];
}

interface Proposal {
  outcome: string;
  path: string;
  cap: string;
  ctx: string[];
  artifact: string;
}

interface SelItem {
  kicker: string;
  title: string;
  body: string;
  input: string;
  output: string;
  access: string;
  limits: string;
  status: string;
  statusColor: string;
  hasChapter: boolean;
  ch?: number;
}

// =============================================================================
// Constants
// =============================================================================

const SAMPLE = "Reduce delays in customer onboarding";

const KINDS = [
  { keys: ["onboard"], path: "Customer onboarding workflow intelligence", cap: "workflow-intelligence", ctx: ["CRM records", "Ticketing queue", "Email threads"] },
  { keys: ["invoice", "finance", "payable", "accounting", "expense", "month-end", "close"], path: "Finance operations intelligence", cap: "workflow-intelligence", ctx: ["ERP invoices", "Approval emails", "Vendor master"] },
  { keys: ["support", "ticket", "helpdesk", "help desk", "service"], path: "Support resolution intelligence", cap: "workflow-intelligence", ctx: ["Help desk", "Knowledge base", "Chat transcripts"] },
  { keys: ["software", "release", "deploy", "code", "engineering", "ship", "delivery", "bug"], path: "AI-native software delivery", cap: "ai-native-software-delivery", ctx: ["Repositories", "CI runs", "Issue tracker"] },
  { keys: ["lead", "growth", "marketing", "sales", "pipeline", "campaign", "discover"], path: "Growth and discovery systems", cap: "growth-and-discovery-systems", ctx: ["CRM pipeline", "Web analytics", "Campaign data"] },
  { keys: ["hiring", "recruit", "employee", "people", "hr"], path: "People operations intelligence", cap: "workflow-intelligence", ctx: ["ATS records", "HRIS exports", "Calendar data"] },
];

const CH: Chapter[] = [
  { n: "01", name: "Discover", tag: "parallel", who: "Evidence intake · Interview capture", state: "Assessing · reading 3 sources in parallel", title: "The agents gather evidence", body: (p) => `Evidence intake reads ${p.ctx.join(", ")} at the same time and records evidence for "${p.outcome}". Interview capture attaches notes alongside.`, feed: (p) => [`Evidence request received: "${p.outcome}"`, `${p.ctx.length} context sources read in parallel`, "Interview notes attached"] },
  { n: "02", name: "Design", tag: "sequence", who: "Path ranking", state: "Prioritizing · ranking the path", title: "The agents propose the assessment path", body: (p) => `Through Station, path ranking scores value, feasibility, access and risk. Proposed: ${p.path}. Required access: read-only.`, feed: (p) => [`Path proposed: ${p.path}`, "Required access: read-only"] },
  { n: "03", name: "Configure", tag: "parallel", who: "Assembly · Test run · Privacy check · Access audit", state: "Configuring · building while 3 checks run", title: "Assembly builds, three checks run in parallel", body: () => "Assembly combines the modules, skills, tools and policy in Station. Test run checks functionality, privacy check reviews data handling and access audit checks permissions at the same time. Nothing runs yet.", feed: () => ["Assembly built 4 modules: agents, skills, tools, policy", "Parallel checks started: tests · privacy · security"] },
  { n: "04", name: "Approve", tag: "gate", who: "Ari · human", state: "Waiting for human approval · Ari", title: "Checks pass. Ari holds the gate", body: () => "All three checks fan back into the gate. A person reviews scope, affected systems and rollback before the system touches anything. Approve to continue.", feed: () => ["Checks 3/3 passed: tests · privacy · security", "Waiting for Ari · approval required before system access"] },
  { n: "05", name: "Operate", tag: "parallel", who: "Runtime monitor · Metrics tracking · Release check", state: "Operating · monitoring runs alongside metrics and release checks", title: "The agents keep it useful", body: () => "Runtime monitor watches quality, cost, failures and permissions. Metrics tracking records the baseline and release check runs the publish step in parallel.", feed: () => ["Monitoring: quality, cost, permissions", "Metrics tracked · release check passed"] },
  { n: "06", name: "Artifact", tag: "output", who: "Station", state: "Complete · artifact ready", title: (p) => `${p.artifact} is ready`, body: () => "Download the proposal as Markdown or JSON. Sample data. No systems connected.", feed: (p) => [`Artifact ready: ${p.artifact}`] },
];

const AGENTS: Agent[] = [
  { id: "scout", name: "Evidence intake", role: "research", shirt: "#2447E8", pants: "#152238", skin: "#D9A277", home: [229, 202, 28], carry: true, active: [0], task: "gathering evidence", body: "Traces the workflow, sources and baseline. Records evidence instead of inventing an answer.", input: "Outcome, context sources", output: "Evidence cards, draft opportunity map", access: "read-only", limits: "No writes. Stops when sources conflict.", ch: 0 },
  { id: "mica", name: "Path ranking", role: "coordination", shirt: "#2447E8", pants: "#28334A", skin: "#B97952", home: [600, 90, 28], active: [1], task: "ranking paths", body: "Ranks value, feasibility, access and risk. Proposes one bounded path.", input: "Evidence, constraints, policy", output: "Ranked path, access request", access: "none", limits: "Cannot grant access or approve its own plan.", ch: 1 },
  { id: "forge", name: "Assembly", role: "build", shirt: "#152238", pants: "#0A1220", skin: "#E2B38C", home: [832, 188, 28], active: [2], task: "assembling modules", body: "Assembles agents, skills, tools and policy in Station around the selected workflow.", input: "Selected path, policy", output: "Configured capability", access: "Station configuration only", limits: "Nothing runs before human approval.", ch: 2 },
  { id: "ari", name: "Ari", role: "human approver", human: true, shirt: "#FF6848", pants: "#553025", skin: "#C88964", home: [219, 524, 22], work: { 3: [905, 565, 0] }, active: [3], task: "reviewing scope", body: "A person. Owns intent, policy and consequential approval. Walks to the gate when a run needs a decision.", input: "Scope, affected systems, rollback plan", output: "Approval or rejection, logged", access: "full authority", limits: "Never automated.", ch: 3 },
  { id: "orbit", name: "Runtime monitor", role: "operations", shirt: "#2447E8", pants: "#25384F", skin: "#8E5739", home: [640, 728, 28], active: [4], task: "monitoring", body: "Watches quality, cost, failures and permissions after deployment.", input: "Deployed system, run logs", output: "Quality, cost and permission reports", access: "read-only telemetry", limits: "Escalates to a person on failure.", ch: 4 },
  { id: "nell", name: "Interview capture", role: "analyst", shirt: "#7A4DB3", pants: "#28334A", skin: "#E4B896", home: [165, 346, 0], work: { 0: [125, 296, 0] }, active: [0], task: "interview notes", body: "Collects interview notes from the people who do the work today. Runs alongside evidence intake.", input: "Team interviews", output: "Interview notes, tagged", access: "none", limits: "Notes are evidence, not conclusions.", ch: 0 },
  { id: "theo", name: "Metrics tracking", role: "data", shirt: "#3E6A9E", pants: "#25384F", skin: "#D9A277", home: [470, 600, 0], work: { 4: [585, 690, 0] }, active: [4], task: "baseline metrics", body: "Tracks the baseline metrics the outcome is measured against. Runs alongside the runtime monitor.", input: "System exports", output: "Baseline and trend metrics", access: "read-only", limits: "Reports numbers, does not act on them.", ch: 4 },
  { id: "sol", name: "Test run", role: "qa", shirt: "#1E9E6A", pants: "#163D31", skin: "#E2B38C", home: [930, 120, 0], work: { 2: [760, 262, 0], 3: [760, 262, 0] }, active: [2], task: "run tests", body: "Runs the test suite against the configured capability. One of three parallel checks.", input: "Configured capability", output: "Test results", access: "sandbox", limits: "A failing test blocks the gate.", ch: 2 },
  { id: "vera", name: "Privacy check", role: "privacy", shirt: "#C05B2D", pants: "#553025", skin: "#8E5739", home: [990, 230, 0], work: { 2: [905, 264, 0], 3: [905, 264, 0] }, active: [2], task: "data review", body: "Reviews what data the capability touches and how it is handled. One of three parallel checks.", input: "Data map, policy", output: "Privacy review", access: "metadata only", limits: "Flags, does not approve.", ch: 2 },
  { id: "juno", name: "Access audit", role: "security", shirt: "#D98E14", pants: "#4A3A16", skin: "#C88964", home: [940, 330, 0], work: { 2: [835, 112, 0], 3: [835, 112, 0] }, active: [2], task: "access audit", body: "Audits requested permissions against policy. One of three parallel checks.", input: "Access request, policy", output: "Access audit", access: "policy read", limits: "Cannot widen scope.", ch: 2 },
  { id: "kit", name: "Release check", role: "release", shirt: "#152238", pants: "#25384F", skin: "#B97952", home: [860, 660, 0], work: { 4: [905, 585, 0] }, active: [4], task: "publish check", body: "Runs the release checklist once a run is approved. Never before.", input: "Approved run", output: "Release record", access: "release tooling", limits: "Blocked until the gate opens.", ch: 4 },
];

const STATIONS: Station[] = [
  { id: "scout", num: "01", x: 181, y: 154, w: 96, d: 96, h: 28, ch: 0, label: "Discover", aria: "Inspect Discover station" },
  { id: "mica", num: "02", x: 552, y: 42, w: 96, d: 96, h: 28, ch: 1, label: "Design", aria: "Inspect Design station" },
  { id: "forge", num: "03", x: 784, y: 140, w: 96, d: 96, h: 28, ch: 2, label: "Configure", aria: "Inspect Configure station" },
  { id: "gate", num: "04", x: 810, y: 469, w: 96, d: 96, h: 28, ch: 3, label: "Approve", aria: "Inspect approval gate" },
  { id: "orbit", num: "05", x: 592, y: 680, w: 96, d: 96, h: 28, ch: 4, label: "Operate", aria: "Inspect Operate station" },
  { id: "dock", num: "06", x: 319, y: 660, w: 90, d: 90, h: 20, ch: 5, label: "Artifact", dashed: true, aria: "Inspect artifact dock" },
  { id: "human", num: "human control", x: 154, y: 484, w: 130, d: 80, h: 22, ch: 3, label: "Human Control", dark: true, aria: "Inspect human control station" },
];

const CTX_POS = [{ x: 50, y: 215 }, { x: 73, y: 239 }, { x: 96, y: 263 }];
const EV_POS = [{ x: 262, y: 118 }, { x: 282, y: 138 }, { x: 302, y: 158 }];

// Items for hub/station/context inspector
const ITEMS: Record<string, { kicker: string; title: string; body: string | ((p: Proposal) => string); input: string; output: string; access: string; limits: string; ch?: number }> = {
  hub: { kicker: "station:splice", title: "Splice Station", body: "Controls what each function can do, what it can access, and when a person must approve. Every handoff passes through Station.", input: "Policy, permissions, run requests", output: "Governed runs, logs, approvals", access: "scoped per capability", limits: "Cannot approve consequential actions itself." },
  gate: { kicker: "gate:approval", title: "Approval gate", body: "Where the three parallel checks fan back in and a person decides. Nothing past this point runs without approval.", input: "Checks: tests, privacy, security", output: "Approved or blocked run", access: "none", limits: "Opens only for a named human.", ch: 3 },
  dock: { kicker: "artifact:output", title: "Artifact dock", body: "Where finished artifacts land. Each is available as Markdown and JSON.", input: "Evidence, decisions, run record", output: "Opportunity and readiness map", access: "none", limits: "Labeled sample until a real run.", ch: 5 },
  human: { kicker: "station:human_control", title: "Human control station", body: "Ari works here. Approvals, escalations and stop signals originate from this desk, outside the automated loop.", input: "Approval requests, escalations", output: "Decisions, logged", access: "full authority", limits: "Never automated.", ch: 3 },
  ctx: { kicker: "context:*", title: "Context sources", body: (p: Proposal) => `Named sources for "${p.outcome}": ${p.ctx.join(", ")}. Read in parallel by evidence intake during Discover.`, input: "Your systems and documents", output: "Evidence cards", access: "read-only, after approval", limits: "Named during intake, opened only after approval.", ch: 0 },
};

// =============================================================================
// Utilities
// =============================================================================

function derive(text: string): Proposal {
  const t = " " + text.toLowerCase() + " ";
  const k = KINDS.find((k) => k.keys.some((w) => t.includes(w))) || { path: "Workflow intelligence", cap: "workflow-intelligence", ctx: ["Process documents", "System exports", "Team interviews"] };
  return { outcome: text, path: k.path, cap: k.cap, ctx: k.ctx, artifact: "Opportunity and readiness map" };
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

// =============================================================================
// Component
// =============================================================================

interface HabitatHeroProps {
  autoplay?: boolean;
  chapterSeconds?: number;
}

export function HabitatHero({ autoplay = true, chapterSeconds = 4 }: HabitatHeroProps) {
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useMode();
  const isAgent = mode === "agent";
  const isDark = theme === "ink";

  // State
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const [outcome, setOutcome] = useState("");
  const [applied, setApplied] = useState<Proposal | null>(null);
  const [feed, setFeed] = useState<string[]>([]);
  const [approved, setApproved] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const [evidence, setEvidence] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showMd, setShowMd] = useState(false);
  const [note, setNote] = useState("");

  // Refs
  const worldRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Parallax scroll state
  const [scrollY, setScrollY] = useState(0);
  const [rawScrollY, setRawScrollY] = useState(0);
  const [baseScale, setBaseScale] = useState(1);

  // Drag-to-rotate state
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, z: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotZ: 0 });

  // Derived
  const proposal = applied || derive(SAMPLE);
  const ch = CH[chapter];
  const waiting = chapter === 3 && !approved;
  const done = chapter === 5;

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // Responsive scale calculation
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width <= 900) setBaseScale(0.55);
      else if (width <= 1200) setBaseScale(0.7);
      else if (width <= 1400) setBaseScale(0.85);
      else setBaseScale(1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (reduced) return;
    const handleScroll = () => {
      setRawScrollY(window.scrollY);
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
        setScrollY(scrollProgress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduced]);

  // Drag-to-rotate handlers
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (reduced) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      rotX: dragRotation.x,
      rotZ: dragRotation.z,
    };
  }, [reduced, dragRotation]);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || reduced) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    // Clamp rotation within reasonable bounds
    const newRotZ = Math.max(-20, Math.min(20, dragStartRef.current.rotZ + deltaX * 0.08));
    const newRotX = Math.max(-15, Math.min(15, dragStartRef.current.rotX - deltaY * 0.06));
    setDragRotation({ x: newRotX, z: newRotZ });
  }, [isDragging, reduced]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse up listener for drag
  useEffect(() => {
    if (isDragging) {
      const handleMouseUp = () => setIsDragging(false);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Go to chapter
  const goTo = useCallback((ch: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const p = applied || derive(SAMPLE);
    setChapter(ch);
    setFeed((prev) => (ch === 0 ? [] : prev).concat(CH[ch].feed(p)).slice(-6));
    setEvidence(ch === 0 ? 1 : 3);
    setApproved(ch >= 4);
  }, [applied]);

  // Zoom controls
  const zoomIn = useCallback(() => setZoom((z) => Math.min(1.6, z + 0.15)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(0.7, z - 0.15)), []);
  const resetView = useCallback(() => {
    setDragRotation({ x: 0, z: 0 });
    setZoom(1);
  }, []);

  // Flash notification
  const flash = useCallback((msg: string) => {
    setNote(msg);
    setTimeout(() => setNote(""), 2400);
  }, []);

  // Generate markdown
  const markdown = useCallback((p: Proposal) => {
    return [
      `# Assessment proposal: ${p.outcome}`,
      "",
      "Source: Splice Works · spliceworks.ai · Status: sample, no systems connected",
      "",
      "## Capability",
      `- ai-native-assessment → ${p.cap}`,
      "",
      "## Context sources",
      ...p.ctx.map((c) => `- ${c}`),
      "",
      "## Process",
      "1. Discover (parallel): Scout reads sources; Nell collects interviews",
      `2. Design: Mica proposes ${p.path}`,
      "3. Configure (parallel): Forge assembles; Sol, Vera, Juno run tests, privacy and security checks",
      "4. Approve (gate): checks fan in; Ari decides",
      "5. Operate (parallel): Orbit monitors; Theo tracks metrics; Kit runs release checks",
      `6. Artifact: ${p.artifact}`,
      "",
      "## Access",
      "- Intake: none",
      "- Assessment: read-only (proposed)",
      "- Approval required before any system access",
      "",
      "## Human authority",
      "- A named reviewer approves consequential actions.",
      "",
    ].join("\n");
  }, []);

  // Download file
  const downloadFile = useCallback((name: string, text: string, type: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    flash(`Downloaded ${name}`);
  }, [flash]);

  // Schedule next chapter
  useEffect(() => {
    if (!playing || sel) return;
    const ms = chapter === 3 ? 4500 : chapterSeconds * 1000;
    timerRef.current = setTimeout(() => {
      if (chapter === 3 && !approved) {
        setApproved(true);
        setFeed((prev) => [...prev, "Ari approved the run (sample, automatic)"].slice(-6));
        setTimeout(() => goTo(4), 800);
      } else {
        goTo((chapter + 1) % 6);
      }
    }, ms);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, chapter, approved, sel, chapterSeconds, goTo]);

  // Manual approve
  const approve = useCallback(() => {
    if (chapter !== 3 || approved) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setApproved(true);
    setFeed((prev) => [...prev, "Ari approved the run"].slice(-6));
    setTimeout(() => goTo(4), 800);
  }, [chapter, approved, goTo]);

  // Select item
  const select = useCallback((id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSel((prev) => (prev === id ? null : id));
  }, []);

  // Submit new outcome
  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const t = outcome.trim();
    if (!t) return;
    setApplied(derive(t));
    setPlaying(true);
    setSel(null);
    goTo(0);
  }, [outcome, goTo]);

  // Get selected item details
  const getSelItem = useCallback((): SelItem | null => {
    if (!sel) return null;
    const ag = AGENTS.find((a) => a.id === sel);
    if (ag) {
      const busy = ag.active.includes(chapter);
      return {
        kicker: ag.human ? `human:${ag.id}` : `harness:${slug(ag.name)} · ${ag.role}`,
        title: `${ag.name} · ${ag.role}`,
        body: ag.body,
        input: ag.input,
        output: ag.output,
        access: ag.access,
        limits: ag.limits,
        status: busy ? `working · ${ag.task}` : chapter > Math.max(...ag.active) ? `done · ${ag.task}` : "idle · waiting for handoff",
        statusColor: busy ? "#2447E8" : "#4A515C",
        hasChapter: true,
        ch: ag.ch,
      };
    }
    // Check ITEMS (hub, gate, dock, human, ctx)
    const it = ITEMS[sel];
    if (it) {
      const p = proposal;
      const bodyText = typeof it.body === "function" ? it.body(p) : it.body;
      let status = "";
      let statusColor = "#2447E8";
      if (sel === "gate") {
        status = waiting ? "waiting for Ari · checks 3/3" : approved || chapter > 3 ? "open · approved" : chapter === 2 ? "checks running 0/3" : "closed";
        statusColor = waiting ? "#FF6848" : "#2447E8";
      } else if (sel === "dock") {
        status = done ? `ready · ${p.artifact}` : "empty";
      } else if (sel === "hub") {
        status = `run:sample-001 · ${ch.name.toLowerCase()}`;
      } else if (sel === "human") {
        status = waiting ? "approval requested" : "monitoring";
      } else if (sel === "ctx") {
        status = `${p.ctx.length} sources named`;
      }
      return {
        kicker: it.kicker,
        title: it.title,
        body: bodyText,
        input: it.input,
        output: it.output,
        access: it.access,
        limits: it.limits,
        status,
        statusColor,
        hasChapter: it.ch !== undefined,
        ch: it.ch,
      };
    }
    // Station selection
    const st = STATIONS.find((s) => s.id === sel);
    if (st) {
      return {
        kicker: `station:${st.id}`,
        title: st.label,
        body: `Station ${st.num}: ${st.label}`,
        input: "Policy, permissions",
        output: "Governed execution",
        access: "scoped",
        limits: "Cannot approve itself",
        status: chapter === st.ch ? "active" : "waiting",
        statusColor: chapter === st.ch ? "#2447E8" : "#4A515C",
        hasChapter: true,
        ch: st.ch,
      };
    }
    return null;
  }, [sel, chapter, ch, proposal, waiting, approved, done]);

  const selItem = getSelItem();

  // Theme colors - high contrast hero design
  const themeColors = useMemo(() => {
    return isDark
      ? {
          stage: "#080E1A",      // deeper dark for contrast
          plane: "#0F1A30",      // dark surface
          planeLine: "#2447E8", // primary blue glow lines
          grid: "#1a2744",      // subtle grid
          text: "#FFFFFF",      // pure white text
          muted: "#AEB8CC",     // muted
          accent: "#2447E8",    // primary blue
          card: "#152238",      // card bg
          line: "#2E3F66"       // line
        }
      : {
          stage: "#0F1A30",      // dark stage even in light mode for drama
          plane: "#FFFFFF",      // bright white plane for contrast
          planeLine: "#2447E8", // primary blue lines
          grid: "#E8EDFF",      // light blue-tinted grid
          text: "#152238",      // dark text
          muted: "#52607A",     // muted
          accent: "#2447E8",    // primary blue
          card: "#FFFFFF",      // white cards
          line: "#D9D9CF"       // line
        };
  }, [isDark]);

  // Parallax context value for children
  const parallaxValue = useMemo(() => ({
    scrollProgress: scrollY,
    scrollY: rawScrollY,
  }), [scrollY, rawScrollY]);

  return (
    <ParallaxContext.Provider value={parallaxValue}>
      <div className="habitat-hero" data-theme={isDark ? "ink" : "paper"}>
        {/* Hero Section with 3D World */}
        <section ref={heroRef} className="hero-section">
          <div className="stage" style={{ background: themeColors.stage }}>
          {/* Background gradient + dots */}
          <div
            className="stage-bg"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${isDark ? "rgba(36,71,232,0.15)" : "rgba(36,71,232,0.08)"} 0%, transparent 60%)`,
            }}
          />
          <div
            className="stage-dots"
            style={{
              position: "absolute",
              inset: "-40px",
              backgroundImage: `radial-gradient(${isDark ? "rgba(127,164,255,0.4)" : "rgba(36,71,232,0.2)"} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              opacity: 0.6,
            }}
          />

          {/* 3D World with drag rotation and zoom */}
          <div
            ref={worldRef}
            className="world"
            style={{
              transform: `translate(-50%, -50%) rotateX(${58 + dragRotation.x}deg) rotateZ(${-42 + dragRotation.z}deg) scale(${baseScale * zoom})`,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {/* Isometric plane */}
            <div
              className="plane"
              style={{
                background: themeColors.plane,
                border: `1px solid ${themeColors.planeLine}`,
                backgroundImage: `linear-gradient(${themeColors.grid} 1px, transparent 1px), linear-gradient(90deg, ${themeColors.grid} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Plane sides */}
            <div className="plane-side-bottom" style={{ background: isDark ? "#0A1220" : "#BECDFF" }} />
            <div className="plane-side-left" style={{ background: isDark ? "#070D18" : "#7FA4FF" }} />

            {/* Work Desks with Cubicle Partitions - positioned near agent stations */}
            {[
              // Evidence intake desk
              { x: 280, y: 150, active: chapter === 0, partition: "back" },
              // Path ranking desk
              { x: 540, y: 140, active: chapter === 1, partition: "left" },
              // Assembly desk
              { x: 780, y: 240, active: chapter === 2, partition: "corner" },
              // Test run desk
              { x: 880, y: 170, active: chapter === 2, partition: "back" },
              // Privacy check desk
              { x: 940, y: 280, active: chapter === 2, partition: "left" },
              // Access audit desk
              { x: 890, y: 360, active: chapter === 2, partition: "corner" },
              // Runtime monitor desk
              { x: 580, y: 680, active: chapter === 4, partition: "back" },
              // Metrics tracking desk
              { x: 420, y: 620, active: chapter === 4, partition: "left" },
              // Release check desk
              { x: 820, y: 640, active: chapter === 4, partition: "corner" },
              // Interview capture desk
              { x: 120, y: 320, active: chapter === 0, partition: "corner" },
            ].map((desk, i) => (
              <div
                key={`desk-${i}`}
                aria-hidden="true"
                className="desk"
                style={{
                  left: desk.x,
                  top: desk.y,
                }}
              >
                {/* Cubicle partition walls - standing upright */}
                {(desk.partition === "back" || desk.partition === "corner") && (
                  <span className="partition-back" style={{
                    background: isDark ? "rgba(46, 63, 102, 0.7)" : "rgba(220, 228, 255, 0.85)",
                    borderBottom: `2px solid ${isDark ? "#2447E8" : "#7FA4FF"}`,
                  }} />
                )}
                {(desk.partition === "left" || desk.partition === "corner") && (
                  <span className="partition-left" style={{
                    background: isDark ? "rgba(36, 71, 232, 0.5)" : "rgba(190, 205, 255, 0.85)",
                    borderBottom: `2px solid ${isDark ? "#2447E8" : "#7FA4FF"}`,
                  }} />
                )}
                {/* Desk surface */}
                <span className="desk-top" style={{
                  background: isDark ? "#1F2A3F" : "#FFFFFF",
                  border: `1px solid ${isDark ? "#2E3F66" : "#BEB7A9"}`,
                  boxShadow: `inset 0 -5px ${isDark ? "#152238" : "#E8E1D5"}`,
                }}>
                  {/* Monitor - standing upright */}
                  <span className="desk-monitor" style={{
                    borderTop: `2px solid ${isDark ? "#2447E8" : "#152238"}`,
                    borderLeft: `2px solid ${isDark ? "#2447E8" : "#152238"}`,
                    borderRight: `2px solid ${isDark ? "#2447E8" : "#152238"}`,
                    borderBottom: `4px solid ${isDark ? "#2447E8" : "#152238"}`,
                    background: desk.active ? (isDark ? "#2447E8" : "#DCE4FF") : (isDark ? "#0F1A30" : "#F5F4EE"),
                    boxShadow: desk.active ? `0 0 8px ${isDark ? "#2447E8" : "#7FA4FF"}` : "none",
                  }} />
                </span>
                {/* Desk sides */}
                <span className="desk-side-front" style={{ background: isDark ? "#152238" : "#E3DED3" }} />
                <span className="desk-side-left" style={{ background: isDark ? "#0F1A30" : "#D3CDBF" }} />
                {/* Chair */}
                <span className="desk-chair" style={{
                  background: desk.active ? "#DCE4FF" : "#E8E1D5",
                  border: `1px solid ${desk.active ? "#2447E8" : "#BEB7A9"}`,
                }} />
              </div>
            ))}

            {/* Radial lines from hub to stations (original style) */}
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 386, transform: "translateZ(1px) rotate(-149.1deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 313, transform: "translateZ(1px) rotate(-82.6deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 345, transform: "translateZ(1px) rotate(-37.9deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 320, transform: "translateZ(1px) rotate(21.4deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 338, transform: "translateZ(1px) rotate(76.3deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 363, transform: "translateZ(1px) rotate(122.7deg)", borderColor: isDark ? "#2E3F66" : "#CFC9BD" }} />
            {/* Human control line (orange) */}
            <div aria-hidden="true" className="radial-line" style={{ left: 560, top: 400, width: 363, transform: "translateZ(1px) rotate(160deg)", borderColor: "#FF6848", opacity: 0.35 }} />

            {/* Dashed sequence lines showing workflow */}
            <div aria-hidden="true" className="seq-line" style={{ left: 50, top: 215, width: 180, transform: "translateZ(1px) rotate(-4.2deg)", borderColor: chapter === 0 ? "#2447E8" : chapter > 0 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 73, top: 239, width: 160, transform: "translateZ(1px) rotate(-13.3deg)", borderColor: chapter === 0 ? "#2447E8" : chapter > 0 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 96, top: 263, width: 146, transform: "translateZ(1px) rotate(-24.6deg)", borderColor: chapter === 0 ? "#2447E8" : chapter > 0 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 229, top: 202, width: 388, transform: "translateZ(1px) rotate(-16.8deg)", borderColor: chapter === 1 ? "#2447E8" : chapter > 1 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 600, top: 90, width: 252, transform: "translateZ(1px) rotate(22.9deg)", borderColor: chapter === 2 ? "#2447E8" : chapter > 2 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 832, top: 188, width: 330, transform: "translateZ(1px) rotate(85.5deg)", borderColor: chapter === 3 ? "#2447E8" : chapter > 3 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 858, top: 517, width: 303, transform: "translateZ(1px) rotate(135.9deg)", borderColor: chapter === 4 ? "#2447E8" : chapter > 4 ? "#BECDFF" : "#CFC9BD" }} />
            <div aria-hidden="true" className="seq-line" style={{ left: 640, top: 728, width: 277, transform: "translateZ(1px) rotate(-175.2deg)", borderColor: chapter === 5 ? "#2447E8" : "#CFC9BD" }} />

            {/* Context source buttons */}
            {proposal.ctx.map((ctxName, i) => (
              <button
                key={`ctx-${i}`}
                type="button"
                onClick={() => select("ctx")}
                className="ctx-button"
                style={{
                  left: CTX_POS[i].x,
                  top: CTX_POS[i].y,
                  transform: "translateZ(0px) rotateZ(42deg) rotateX(-58deg)",
                }}
              >
                <span className="ctx-bar" />
                <span className="ctx-bar-2" />
                <span className="ctx-name">{isAgent ? slug(ctxName) : ctxName}</span>
              </button>
            ))}

            {/* Evidence cards */}
            {EV_POS.slice(0, evidence).map((pos, i) => (
              <div
                key={`ev-${i}`}
                className="evidence-card"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translateZ(28px) rotateZ(42deg) rotateX(-58deg)",
                }}
              >
                EV-0{i + 1}
                <span className="evidence-bar" />
              </div>
            ))}

            {/* Station Hub */}
            <button
              type="button"
              onClick={() => select("hub")}
              onMouseEnter={() => setHover("hub")}
              onMouseLeave={() => setHover(null)}
              aria-label="Inspect Splice Station"
              className="hub"
            >
              <span className="hub-top">
                <span className="hub-ring-outer">
                  <span className="hub-ring-inner" />
                </span>
              </span>
              <span className="hub-side-bottom" />
              <span className="hub-side-left" />
            </button>

            {/* Station label */}
            <div className="hub-label" style={{ transform: "translateZ(42px) rotateZ(42deg) rotateX(-58deg)" }}>
              <span className="hub-label-title">
                {isAgent ? "station:splice" : "Splice Station"}
              </span>
              <span className="hub-label-sub" style={{ background: themeColors.card, border: `1px solid ${themeColors.line}` }}>
                {isAgent ? `run:sample-001 · ${slug(ch.name)}` : `policy · permissions · runs · ${ch.name.toLowerCase()}`}
              </span>
            </div>

            {/* Stations */}
            {STATIONS.map((s) => {
              const active = chapter === s.ch;
              const w = s.id === "gate" && waiting;
              const hot = hover === s.id || sel === s.id;
              const isDone = s.id === "dock" && done;
              const bg = s.dark ? "#152238" : w ? "#FFF1ED" : isDone ? "#D9F2E6" : active ? "#DCE4FF" : "#FFFFFF";
              const line = s.dark ? "#FF6848" : w ? "#FF6848" : isDone ? "#1E9E6A" : active || hot ? "#2447E8" : s.dashed ? "#B3B3AE" : "#D3D2CB";
              const glow = w ? "0 0 0 6px rgba(255,104,72,.18)" : hot ? "0 0 0 6px rgba(36,71,232,.22)" : active ? "0 0 0 6px rgba(36,71,232,.14)" : "none";

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => select(s.id)}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  aria-label={s.aria}
                  className="station"
                  style={{
                    left: s.x,
                    top: s.y,
                    width: s.w,
                    height: s.d,
                  }}
                >
                  <span
                    className="station-top"
                    style={{
                      transform: `translateZ(${s.h}px)`,
                      background: bg,
                      border: `1px ${s.dashed ? "dashed" : "solid"} ${line}`,
                      boxShadow: glow,
                    }}
                  />
                  <span
                    className="station-side-bottom"
                    style={{
                      width: s.w,
                      height: s.h,
                      background: s.dark ? "#0D1626" : "#E3DED3",
                    }}
                  />
                  <span
                    className="station-side-left"
                    style={{
                      width: s.h,
                      height: s.d,
                      background: s.dark ? "#0A1220" : "#D3CDBF",
                    }}
                  />
                  <span
                    className="station-num"
                    style={{
                      transform: `translateZ(${s.h}px) rotateZ(42deg) rotateX(-58deg)`,
                      background: s.dark ? "#FF6848" : active ? "#2447E8" : "#FFFFFF",
                      color: s.dark || active ? "#FFFFFF" : "#4A515C",
                    }}
                  >
                    {s.num}
                  </span>
                </button>
              );
            })}

            {/* Agents */}
            {AGENTS.map((a) => {
              const pos = a.work && a.work[chapter] ? a.work[chapter] : a.home;
              const busy = a.active.includes(chapter) && !(a.id === "ari" && approved && chapter === 3);
              const hot = hover === a.id || sel === a.id;
              const human = !!a.human;

              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => select(a.id)}
                  onMouseEnter={() => setHover(a.id)}
                  onMouseLeave={() => setHover(null)}
                  aria-label={`${a.name}, ${a.role}. Inspect`}
                  className="agent"
                  style={{
                    left: pos[0],
                    top: pos[1],
                    transform: `translateZ(${pos[2]}px) rotateZ(42deg) rotateX(-58deg)`,
                    animation: busy && !reduced ? "work .7s ease-in-out infinite alternate" : "none",
                  }}
                >
                  <span
                    className="agent-chip"
                    style={{
                      background: hot ? (human ? "#FFF1ED" : "#DCE4FF") : "#FFFFFF",
                      border: `1px solid ${human ? "#FF6848" : busy || hot ? "#2447E8" : "#D3D2CB"}`,
                      color: human ? "#B83A1F" : "#152238",
                    }}
                  >
                    {isAgent ? (human ? `human:${a.id}` : `harness:${slug(a.name)}`) : `${a.name} · ${a.role}`}
                  </span>
                  {busy && (
                    <span
                      className="agent-task"
                      style={{
                        background: human ? "#FF6848" : "#2447E8",
                        color: "#FFFFFF",
                      }}
                    >
                      {isAgent ? slug(a.task) : a.task}
                    </span>
                  )}
                  <span className="agent-figure">
                    <span className="agent-hat" style={{ background: a.shirt }} />
                    <span className="agent-hair" />
                    <span className="agent-face" style={{ background: a.skin }} />
                    <span className="agent-body" style={{ background: a.shirt, boxShadow: `inset 0 -5px ${a.pants}` }} />
                    <span className="agent-arm-left" style={{ background: a.skin }} />
                    <span className="agent-arm-right" style={{ background: a.skin }} />
                    <span className="agent-leg-left" style={{ background: a.pants }} />
                    <span className="agent-leg-right" style={{ background: a.pants }} />
                    <span className="agent-shoe-left" />
                    <span className="agent-shoe-right" />
                    {a.carry && busy && <span className="agent-carry" />}
                  </span>
                </button>
              );
            })}

            {/* Gate visual */}
            <div className="gate-visual" style={{ transform: "translateZ(28px) rotateZ(42deg) rotateX(-58deg)" }}>
              <span
                className="gate-label"
                style={{
                  border: `1px solid ${waiting ? "#FF6848" : chapter >= 4 || approved ? "#1E9E6A" : "#8B93A1"}`,
                  color: waiting ? "#FF6848" : chapter >= 4 || approved ? "#1E9E6A" : "#8B93A1",
                }}
              >
                {isAgent
                  ? waiting
                    ? "gate:approval · checks 3/3 · waiting"
                    : chapter >= 4 || approved
                    ? "gate:approval · open"
                    : "gate:approval"
                  : waiting
                  ? "Checks 3/3 · waiting for Ari"
                  : chapter >= 4 || approved
                  ? "Approved · gate open"
                  : "Approval gate"}
              </span>
              <span className="gate-frame" style={{ animation: waiting && !reduced ? "gatepulse 1s ease-in-out infinite" : "none" }}>
                <span className="gate-post-left" style={{ background: waiting ? "#FF6848" : chapter >= 4 || approved ? "#1E9E6A" : "#8B93A1" }} />
                <span className="gate-post-right" style={{ background: waiting ? "#FF6848" : chapter >= 4 || approved ? "#1E9E6A" : "#8B93A1" }} />
                <span className="gate-top" style={{ background: waiting ? "#FF6848" : chapter >= 4 || approved ? "#1E9E6A" : "#8B93A1" }} />
                <span className="gate-fill" style={{ background: waiting ? "#FFF1ED" : chapter >= 4 || approved ? "#D9F2E6" : "#F5F4EE" }} />
              </span>
            </div>

            {/* Human control station with approve button */}
            <div className="human-control" style={{ transform: "translateZ(22px) rotateZ(42deg) rotateX(-58deg)" }}>
              <span className="human-label" style={{ border: "1px solid #FF6848", color: "#B83A1F" }}>
                {isAgent ? "station:human_control" : "Human control · Ari"}
              </span>
              <button
                type="button"
                onClick={approve}
                disabled={!waiting}
                className="approve-btn"
                style={{
                  background: waiting ? "#FF6848" : approved || chapter >= 4 ? "#D9F2E6" : "#F5F4EE",
                  color: waiting ? "#FFFFFF" : approved || chapter >= 4 ? "#12684A" : "#4A515C",
                  border: `1.5px solid ${waiting ? "#FF6848" : approved || chapter >= 4 ? "#1E9E6A" : "#D3D2CB"}`,
                  cursor: waiting ? "pointer" : "default",
                }}
              >
                {waiting ? "Approve the run" : approved || chapter >= 4 ? "Approved" : "No approval pending"}
              </button>
            </div>

            {/* Artifact card */}
            <div
              className="artifact"
              style={{
                transform: `translateZ(${done ? 64 : 20}px) rotateZ(42deg) rotateX(-58deg)`,
                opacity: done ? 1 : 0,
              }}
            >
              <span className="artifact-kicker">{isAgent ? "artifact:output" : "Artifact"}</span>
              <span className="artifact-title">{proposal.artifact}</span>
              <span className="artifact-meta">markdown · json</span>
            </div>

            {/* Signal animations - animated dots showing workflow */}
            {!reduced && (
              <div className="signals" key={`${chapter}-${approved}`}>
                {chapter === 0 && (
                  <>
                    <span className="signal signal-0a" />
                    <span className="signal signal-0b" />
                    <span className="signal signal-0c" />
                  </>
                )}
                {chapter === 1 && (
                  <>
                    <span className="signal signal-1" />
                    <span className="signal signal-1" style={{ animationDelay: "0.5s" }} />
                    <span className="signal signal-1" style={{ animationDelay: "1s" }} />
                  </>
                )}
                {chapter === 2 && (
                  <>
                    <span className="signal signal-2" />
                    <span className="signal signal-2" style={{ animationDelay: "0.5s" }} />
                    <span className="signal signal-2" style={{ animationDelay: "1s" }} />
                    <span className="signal signal-2a" style={{ animationDelay: "1.3s" }} />
                    <span className="signal signal-2b" style={{ animationDelay: "1.3s" }} />
                    <span className="signal signal-2c" style={{ animationDelay: "1.3s" }} />
                  </>
                )}
                {chapter === 3 && !approved && (
                  <>
                    <span className="signal signal-3" />
                    <span className="signal signal-3" style={{ animationDelay: "0.5s" }} />
                    <span className="signal signal-3" style={{ animationDelay: "1s" }} />
                    <span className="signal signal-3a" style={{ animationDelay: "1.4s" }} />
                    <span className="signal signal-3b" style={{ animationDelay: "1.6s" }} />
                    <span className="signal signal-3c" style={{ animationDelay: "1.8s" }} />
                  </>
                )}
                {chapter === 3 && approved && (
                  <span className="signal signal-approve" />
                )}
                {chapter === 4 && (
                  <>
                    <span className="signal signal-4" />
                    <span className="signal signal-4" style={{ animationDelay: "0.5s" }} />
                    <span className="signal signal-4" style={{ animationDelay: "1s" }} />
                  </>
                )}
                {chapter === 5 && (
                  <>
                    <span className="signal signal-5" />
                    <span className="signal signal-5" style={{ animationDelay: "0.5s" }} />
                    <span className="signal signal-5" style={{ animationDelay: "1s" }} />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Veil overlay for scroll fade */}
          <div
            className="veil"
            style={{
              position: "absolute",
              inset: 0,
              background: themeColors.stage,
              opacity: scrollY * 0.9,
              pointerEvents: "none",
              transition: "opacity 0.1s ease-out",
            }}
          />

          {/* Zoom controls */}
          <div className="zoom-controls">
            <button type="button" onClick={zoomIn} className="zoom-btn" aria-label="Zoom in">+</button>
            <button type="button" onClick={zoomOut} className="zoom-btn" aria-label="Zoom out">−</button>
            <button type="button" onClick={resetView} className="zoom-btn" aria-label="Reset view">↻</button>
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint" style={{ opacity: 1 - scrollY * 2 }}>
            <span>Scroll</span>
            <span className="scroll-cue" />
          </div>

          {/* Legend */}
          <div className="legend" style={{ background: "rgba(15,26,48,.85)", color: "#F6F4E9" }}>
            <span><span className="legend-dot" style={{ background: "#D98E14" }} />Sample run</span>
            <span><span className="legend-dot" style={{ background: "#2447E8" }} />Agent work</span>
            <span><span className="legend-dot" style={{ background: "#FF6848" }} />Human authority</span>
            <span><span className="legend-dot" style={{ background: "#1E9E6A" }} />Artifact</span>
            <span style={{ color: themeColors.muted }}>Drag to rotate · click anything to inspect</span>
          </div>

          {/* Inspector panel */}
          {selItem && (
            <aside className="inspector" style={{ background: themeColors.card, border: `1px solid ${themeColors.line}` }}>
              <div className="inspector-header">
                <span className="inspector-kicker" style={{ color: themeColors.accent }}>{selItem.kicker}</span>
                <button type="button" onClick={() => setSel(null)} className="inspector-close" aria-label="Close inspector">
                  ✕
                </button>
              </div>
              <h3 className="inspector-title" style={{ color: themeColors.text }}>{selItem.title}</h3>
              <p className="inspector-body" style={{ color: themeColors.muted }}>{selItem.body}</p>
              <dl className="inspector-meta">
                <dt style={{ color: themeColors.muted }}>status</dt>
                <dd style={{ color: selItem.statusColor }}>{selItem.status}</dd>
                <dt style={{ color: themeColors.muted }}>input</dt>
                <dd style={{ color: themeColors.text }}>{selItem.input}</dd>
                <dt style={{ color: themeColors.muted }}>output</dt>
                <dd style={{ color: themeColors.text }}>{selItem.output}</dd>
                <dt style={{ color: themeColors.muted }}>access</dt>
                <dd style={{ color: themeColors.text }}>{selItem.access}</dd>
                <dt style={{ color: themeColors.muted }}>limits</dt>
                <dd style={{ color: themeColors.text }}>{selItem.limits}</dd>
              </dl>
              {selItem.hasChapter && selItem.ch !== undefined && (
                <button
                  type="button"
                  onClick={() => {
                    goTo(selItem.ch!);
                    setSel(null);
                  }}
                  className="inspector-go"
                  style={{ color: themeColors.text, border: `1px solid ${themeColors.text}` }}
                >
                  Go to {CH[selItem.ch].name} →
                </button>
              )}
            </aside>
          )}

          {/* Chapter strip */}
          <div className="chapters">
            {CH.map((c, i) => (
              <button
                key={c.n}
                type="button"
                onClick={() => goTo(i)}
                className="chapter"
                style={{
                  borderTop: `3px solid ${i === chapter ? (i === 3 ? "#FF6848" : "#2447E8") : "transparent"}`,
                  background: i === chapter ? (isDark ? "#1F2A3F" : "#F5F4EE") : "transparent",
                }}
              >
                <span className="chapter-num" style={{ color: i === chapter ? themeColors.accent : themeColors.muted }}>
                  <span>{c.n}</span>
                  <span
                    className="chapter-tag"
                    style={{
                      background: c.tag === "parallel" ? "#DCE4FF" : c.tag === "gate" ? "#FFF1ED" : c.tag === "output" ? "#D9F2E6" : "#F5F4EE",
                      color: c.tag === "parallel" ? "#2447E8" : c.tag === "gate" ? "#B83A1F" : c.tag === "output" ? "#12684A" : "#4A515C",
                    }}
                  >
                    {c.tag}
                  </span>
                </span>
                <span className="chapter-name" style={{ color: themeColors.text }}>{c.name}</span>
                <span className="chapter-who" style={{ color: themeColors.muted }}>{c.who}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="editorial" style={{ background: themeColors.card }}>
        <div className="editorial-content">
          <div className="editorial-intro">
            <p className="kicker" style={{ color: themeColors.accent }}>One governed system</p>
            <h1 style={{ color: themeColors.text }}>Turn business intent into governed execution.</h1>
            <p className="lead" style={{ color: themeColors.muted }}>
              The agents discover, build and operate the work. Station governs every handoff. A person holds the gate.
            </p>
            <div className="cta-row">
              <a href="/contact" className="btn-accent">Start an assessment →</a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setPlaying(false);
                  setSel("hub");
                  heroRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ color: themeColors.text, borderColor: themeColors.text }}
              >
                Explore the system
              </button>
            </div>
          </div>

          <div className="editorial-grid">
            <div className="editorial-main">
              <p className="kicker" style={{ color: themeColors.accent }}>What you just watched</p>
              <h2 style={{ color: themeColors.text }}>One outcome. One system. One gate a person holds.</h2>
              {isAgent ? (
                <div className="code-block">
                  <div><span className="code-key">capability</span><span>ai-native-assessment</span></div>
                  <div><span className="code-key">outcome</span><span>&quot;{proposal.outcome}&quot;</span></div>
                  <div><span className="code-key">context</span><span>{proposal.ctx.map(slug).join(", ")}</span></div>
                  <div><span className="code-key">process</span><span>discover ∥ → design → configure ∥ → approve ⊣ → operate ∥ → artifact</span></div>
                  <div><span className="code-key">access</span><span>none_during_intake → read_only</span></div>
                  <div><span className="code-key">approval</span><span>required_before_system_access</span></div>
                </div>
              ) : (
                <p className="body" style={{ color: themeColors.muted }}>
                  Splice Works deploys governed agents that discover, build and operate work across your business. Every handoff passes through Station, which controls what each function can do, what it can access, and when a person must approve. Checks run in parallel; nothing consequential runs without a named human.
                </p>
              )}
              <div className="md-actions" style={{ borderTopColor: themeColors.line }}>
                <button type="button" onClick={() => setShowMd(!showMd)} className="link-btn" style={{ color: themeColors.accent }}>View as Markdown</button>
                <button type="button" onClick={() => downloadFile("assessment-proposal.md", markdown(proposal), "text/markdown")} className="link-btn" style={{ color: themeColors.accent }}>Download .md</button>
                <button type="button" onClick={() => {
                  const text = `Evaluate Splice Works for: "${proposal.outcome}". Report capability, context, process, access, approval gate, and artifact.`;
                  if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => flash("Prompt copied"));
                }} className="link-btn" style={{ color: themeColors.accent }}>Copy LLM prompt</button>
                {note && <span className="flash-note" style={{ color: "#1E9E6A" }}>{note}</span>}
              </div>
              {showMd && (
                <pre className="md-preview" style={{ background: themeColors.card, borderColor: themeColors.line, color: themeColors.text }}>
                  {markdown(proposal)}
                </pre>
              )}
            </div>

            <div className="editorial-sidebar" style={{ background: themeColors.card, borderColor: themeColors.line }}>
              <form className="outcome-form" onSubmit={submit}>
                <label htmlFor="outcome-input" style={{ color: themeColors.text }}>What should work better?</label>
                <div className="outcome-row">
                  <input
                    id="outcome-input"
                    type="text"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    placeholder="Reduce delays in customer onboarding"
                    autoComplete="off"
                    style={{ background: themeColors.card, borderColor: themeColors.line, color: themeColors.text }}
                  />
                  <button type="submit" className="btn-primary">Rebuild</button>
                </div>
                <p className="outcome-hint" style={{ color: themeColors.muted }}>
                  The habitat above rebuilds around your outcome. Sample data, nothing connected.
                </p>
              </form>

              <div className="chapter-detail" style={{ borderTopColor: themeColors.line }}>
                <span className="kicker" style={{ color: themeColors.accent }}>{ch.n} · {ch.name}</span>
                <h3 style={{ color: themeColors.text }}>{typeof ch.title === "function" ? ch.title(proposal) : ch.title}</h3>
                <p style={{ color: themeColors.muted }}>{ch.body(proposal)}</p>
                <div className="chapter-controls">
                  <button type="button" onClick={() => goTo((chapter + 5) % 6)} style={{ borderColor: themeColors.line, color: themeColors.text }}>←</button>
                  <button type="button" onClick={() => setPlaying(!playing)} style={{ borderColor: themeColors.line, color: themeColors.text }}>{playing ? "Pause" : "Play"}</button>
                  <button type="button" onClick={() => goTo((chapter + 1) % 6)} style={{ borderColor: themeColors.line, color: themeColors.text }}>→</button>
                  <button type="button" onClick={() => goTo(0)} style={{ borderColor: themeColors.line, color: themeColors.text }}>Replay</button>
                  <span style={{ fontSize: "11px", color: themeColors.muted, marginLeft: "6px" }}>
                    {sel ? "Paused while inspecting" : playing ? "Click anything to inspect" : "Paused"}
                  </span>
                </div>
              </div>

              <div className="activity" style={{ borderTopColor: themeColors.line }}>
                <span className="activity-label" style={{ color: themeColors.muted }}>Activity</span>
                <ul>
                  {feed.slice().reverse().map((f, i) => (
                    <li key={i} style={{ color: themeColors.text }}><span style={{ color: "#B3B3AE" }}>›</span>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="features" style={{ borderTopColor: themeColors.line }}>
            <div className="feature">
              <span className="kicker" style={{ color: themeColors.accent }}>Station</span>
              <h3 style={{ color: themeColors.text }}>Where agent sprawl stops</h3>
              <p style={{ color: themeColors.muted }}>Every new agent, model or tool becomes another silo — until it plugs into Station. No vendor lock-in: bring your own agents or use ours. Permissions and governance live in Station, and every cross-agent message rides one shared bus, scoped, logged and reversible.</p>
            </div>
            <div className="feature">
              <span className="kicker" style={{ color: themeColors.accent }}>Parallel checks</span>
              <h3 style={{ color: themeColors.text }}>Tests, privacy, security at once</h3>
              <p style={{ color: themeColors.muted }}>Sol, Vera and Juno run side by side while Forge assembles. Any one failing check blocks the gate.</p>
            </div>
            <div className="feature">
              <span className="kicker" style={{ color: "#B83A1F" }}>Human authority</span>
              <h3 style={{ color: themeColors.text }}>Nothing runs past Ari</h3>
              <p style={{ color: themeColors.muted }}>A named person reviews scope, affected systems and rollback before the system touches anything. Never automated.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .habitat-hero {
          font-family: var(--font-body);
          color: var(--text-body);
          background: var(--bg);
        }

        /* Hero section */
        .hero-section {
          position: relative;
          height: calc(100vh - 56px);
          height: calc(100dvh - 56px);
          min-height: 550px;
          overflow: hidden;
        }

        @media (max-width: 1200px) {
          .hero-section {
            height: calc(100vh - 56px);
            height: calc(100dvh - 56px);
          }
        }

        .stage {
          position: relative;
          height: 100%;
          overflow: hidden;
          perspective: 3200px;
          perspective-origin: 50% 50%;
        }

        .stage-bg {
          position: absolute;
          inset: -40px;
          opacity: 0.7;
        }

        /* 3D World */
        .world {
          position: absolute;
          left: 50%;
          top: 42%;
          width: 1120px;
          height: 800px;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) rotateX(58deg) rotateZ(-42deg);
          transition: transform 0.15s ease-out;
        }

        .plane {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          box-shadow:
            0 0 80px rgba(36, 71, 232, 0.15),
            0 0 160px rgba(36, 71, 232, 0.08);
        }

        .plane-side-bottom {
          position: absolute;
          left: 0;
          top: 100%;
          width: 1120px;
          height: 14px;
          transform-origin: top;
          transform: rotateX(-90deg);
        }

        .plane-side-left {
          position: absolute;
          top: 0;
          right: 100%;
          width: 14px;
          height: 800px;
          transform-origin: right;
          transform: rotateY(-90deg);
        }

        /* Hub */
        .hub {
          position: absolute;
          left: 475px;
          top: 315px;
          width: 170px;
          height: 170px;
          padding: 0;
          border: 0;
          background: transparent;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .hub-top {
          position: absolute;
          inset: 0;
          transform: translateZ(40px);
          background: #152238;
          border: 2px solid #2447E8;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 30px rgba(36, 71, 232, 0.4),
            0 0 60px rgba(36, 71, 232, 0.2),
            inset 0 0 20px rgba(36, 71, 232, 0.1);
        }

        .hub-ring-outer {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 2px solid #2447E8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hub-ring-inner {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px dashed #7FA4FF;
        }

        .hub-side-bottom {
          position: absolute;
          left: 0;
          top: 100%;
          width: 170px;
          height: 40px;
          transform-origin: top;
          transform: rotateX(90deg);
          background: #0D1626;
        }

        .hub-side-left {
          position: absolute;
          top: 0;
          right: 100%;
          width: 40px;
          height: 170px;
          transform-origin: right;
          transform: rotateY(90deg);
          background: #0A1220;
        }

        .hub-label {
          position: absolute;
          left: 560px;
          top: 400px;
          width: 220px;
          height: 70px;
          margin: -70px 0 0 -110px;
          transform-origin: 50% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          pointer-events: none;
          text-align: center;
        }

        .hub-label-title {
          font-size: 13px;
          font-weight: 600;
          color: #FFFFFF;
          background: #152238;
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid #2447E8;
          white-space: nowrap;
        }

        .hub-label-sub {
          font-family: var(--font-label);
          font-size: 9.5px;
          color: #152238;
          padding: 2px 7px;
          border-radius: 999px;
          white-space: nowrap;
        }

        /* Stations */
        .station {
          position: absolute;
          padding: 0;
          border: 0;
          background: transparent;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .station-top {
          position: absolute;
          inset: 0;
          border-radius: 6px;
          transition: background 300ms, border-color 300ms, box-shadow 300ms;
        }

        .station-side-bottom {
          position: absolute;
          left: 0;
          top: 100%;
          transform-origin: top;
          transform: rotateX(90deg);
        }

        .station-side-left {
          position: absolute;
          top: 0;
          right: 100%;
          transform-origin: right;
          transform: rotateY(90deg);
        }

        .station-num {
          position: absolute;
          left: 6px;
          top: 6px;
          height: 18px;
          transform-origin: 0 100%;
          font-family: var(--font-label);
          font-size: 9.5px;
          font-weight: 500;
          padding: 0 6px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          white-space: nowrap;
          transition: background 300ms;
        }

        /* Agents */
        .agent {
          position: absolute;
          width: 130px;
          height: 84px;
          margin: -84px 0 0 -65px;
          padding: 0;
          border: 0;
          background: transparent;
          transform-origin: 50% 100%;
          transition: left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          cursor: pointer;
        }

        .agent-chip {
          font-family: var(--font-label);
          font-size: 9px;
          line-height: 1.3;
          padding: 2px 7px;
          border-radius: 999px;
          white-space: nowrap;
          transition: background 300ms, border-color 300ms;
        }

        .agent-task {
          font-family: var(--font-label);
          font-size: 9px;
          font-weight: 500;
          line-height: 1.3;
          padding: 3px 8px;
          border-radius: 3px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(36, 71, 232, 0.25);
          animation: taskpulse 1.5s ease-in-out infinite;
        }

        @keyframes taskpulse {
          0%, 100% {
            box-shadow: 0 2px 8px rgba(36, 71, 232, 0.25);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 16px rgba(36, 71, 232, 0.4);
            transform: scale(1.02);
          }
        }

        .agent-figure {
          position: relative;
          width: 24px;
          height: 38px;
          display: block;
          filter: drop-shadow(0 3px 2px rgba(21, 34, 56, 0.18));
        }

        .agent-hat {
          position: absolute;
          left: 4px;
          top: 0;
          width: 16px;
          height: 6px;
          border-radius: 5px 5px 1px 1px;
        }

        .agent-hair {
          position: absolute;
          left: 4px;
          top: 5px;
          width: 16px;
          height: 6px;
          background: #513A2B;
          border-radius: 3px 3px 1px 1px;
        }

        .agent-face {
          position: absolute;
          left: 5px;
          top: 7px;
          width: 14px;
          height: 11px;
          border-radius: 4px;
          border: 1px solid rgba(21, 34, 56, 0.25);
        }

        .agent-body {
          position: absolute;
          left: 4px;
          top: 18px;
          width: 16px;
          height: 12px;
          border-radius: 3px;
        }

        .agent-arm-left {
          position: absolute;
          left: 0;
          top: 19px;
          width: 4px;
          height: 11px;
          border-radius: 3px;
          transform: rotate(12deg);
        }

        .agent-arm-right {
          position: absolute;
          right: 0;
          top: 19px;
          width: 4px;
          height: 11px;
          border-radius: 3px;
          transform: rotate(-12deg);
        }

        .agent-leg-left {
          position: absolute;
          left: 5px;
          top: 29px;
          width: 6px;
          height: 8px;
          border-radius: 1px;
        }

        .agent-leg-right {
          position: absolute;
          right: 5px;
          top: 29px;
          width: 6px;
          height: 8px;
          border-radius: 1px;
        }

        .agent-shoe-left {
          position: absolute;
          left: 3px;
          top: 35px;
          width: 8px;
          height: 3px;
          background: #152238;
          border-radius: 2px;
        }

        .agent-shoe-right {
          position: absolute;
          right: 3px;
          top: 35px;
          width: 8px;
          height: 3px;
          background: #152238;
          border-radius: 2px;
        }

        .agent-carry {
          position: absolute;
          right: -8px;
          top: 18px;
          width: 9px;
          height: 11px;
          background: #FFFFFF;
          border: 1px solid #2447E8;
          border-radius: 1px;
        }

        /* Gate visual */
        .gate-visual {
          position: absolute;
          left: 858px;
          top: 517px;
          width: 120px;
          height: 96px;
          margin: -96px 0 0 -60px;
          transform-origin: 50% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          pointer-events: none;
        }

        .gate-label {
          font-family: var(--font-label);
          font-size: 9.5px;
          padding: 2px 7px;
          border-radius: 999px;
          background: #FFFFFF;
          white-space: nowrap;
        }

        .gate-frame {
          position: relative;
          width: 64px;
          height: 46px;
          border-radius: 4px;
        }

        .gate-post-left {
          position: absolute;
          left: 4px;
          bottom: 0;
          width: 7px;
          height: 46px;
          border-radius: 2px;
          transition: background 300ms;
        }

        .gate-post-right {
          position: absolute;
          right: 4px;
          bottom: 0;
          width: 7px;
          height: 46px;
          border-radius: 2px;
          transition: background 300ms;
        }

        .gate-top {
          position: absolute;
          left: 4px;
          top: 0;
          width: 56px;
          height: 7px;
          border-radius: 2px;
          transition: background 300ms;
        }

        .gate-fill {
          position: absolute;
          left: 14px;
          top: 14px;
          width: 36px;
          height: 24px;
          border-radius: 3px;
          transition: background 300ms;
        }

        /* Human control */
        .human-control {
          position: absolute;
          left: 219px;
          top: 524px;
          width: 170px;
          height: 60px;
          margin: -60px 0 0 -85px;
          transform-origin: 50% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .human-label {
          font-family: var(--font-label);
          font-size: 9.5px;
          padding: 2px 7px;
          border-radius: 999px;
          background: #FFFFFF;
          white-space: nowrap;
        }

        .approve-btn {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: -0.015em;
          padding: 8px 12px;
          border-radius: 3px;
          white-space: nowrap;
          transition: background 300ms;
        }

        /* Artifact */
        .artifact {
          position: absolute;
          left: 364px;
          top: 705px;
          width: 92px;
          height: 62px;
          margin: -62px 0 0 -46px;
          transform-origin: 50% 100%;
          transition: transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 500ms;
          background: #FFFFFF;
          border: 1px solid #1E9E6A;
          border-radius: 5px;
          box-shadow: 0 8px 24px rgba(21, 34, 56, 0.14);
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          pointer-events: none;
        }

        .artifact-kicker {
          font-family: var(--font-label);
          font-size: 7.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1E9E6A;
        }

        .artifact-title {
          font-size: 9.5px;
          font-weight: 600;
          line-height: 1.2;
          color: #152238;
        }

        .artifact-meta {
          font-family: var(--font-label);
          font-size: 7.5px;
          color: #4A515C;
          margin-top: auto;
        }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          left: 50%;
          bottom: 86px;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-label);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .scroll-cue {
          display: inline-block;
          width: 1px;
          height: 18px;
          background: #4A515C;
          animation: cue 1.6s ease-in-out infinite;
        }

        /* Legend */
        .legend {
          position: absolute;
          left: 14px;
          bottom: 78px;
          z-index: 3;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          white-space: nowrap;
          font-family: var(--font-label);
          font-size: 11px;
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 6px;
        }

        .legend span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        /* Inspector */
        .inspector {
          position: absolute;
          right: 14px;
          bottom: 80px;
          z-index: 5;
          width: min(320px, calc(100% - 28px));
          border-radius: 6px;
          box-shadow: 0 16px 40px rgba(21, 34, 56, 0.14);
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inspector-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .inspector-kicker {
          font-family: var(--font-label);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .inspector-close {
          border: 0;
          background: none;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 14px;
          margin: -6px -8px 0 0;
        }

        .inspector-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.3;
        }

        .inspector-body {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
        }

        .inspector-meta {
          margin: 2px 0 0;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 3px 12px;
          font-family: var(--font-label);
          font-size: 11.5px;
          line-height: 1.45;
        }

        .inspector-meta dt {
          margin: 0;
        }

        .inspector-meta dd {
          margin: 0;
        }

        .inspector-go {
          align-self: flex-start;
          padding: 6px 12px;
          border-radius: 4px;
          background: transparent;
          font-size: 13px;
          cursor: pointer;
          margin-top: 4px;
        }

        /* Chapters */
        .chapters {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 4;
          display: flex;
          border-top: 1px solid rgba(46, 63, 102, 0.6);
          background: rgba(246, 244, 233, 0.98);
          overflow-x: auto;
        }

        .chapter {
          flex: 1 1 150px;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: flex-start;
          padding: 10px 16px 12px;
          border: 0;
          border-right: 1px solid var(--border);
          cursor: pointer;
          text-align: left;
          transition: background 300ms, border-color 300ms;
        }

        .chapter-num {
          display: flex;
          gap: 8px;
          align-items: center;
          font-family: var(--font-label);
          font-size: 11px;
        }

        .chapter-tag {
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 1px 5px;
          border-radius: 2px;
        }

        .chapter-name {
          font-size: 13px;
          font-weight: 600;
        }

        .chapter-who {
          font-family: var(--font-label);
          font-size: 10.5px;
          white-space: nowrap;
        }

        /* Editorial section */
        .editorial {
          position: relative;
          z-index: 2;
          max-width: var(--workspace);
          margin: 0 auto;
          padding: 72px clamp(var(--space-6), 5vw, var(--space-20)) 96px;
        }

        .editorial-content {
          display: flex;
          flex-direction: column;
          gap: 56px;
        }

        .editorial-intro {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 820px;
        }

        .editorial-intro h1 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(44px, 5.6vw, 84px);
          line-height: 0.94;
          letter-spacing: -0.03em;
          max-width: 14ch;
        }

        .kicker {
          margin: 0;
          font-family: var(--font-label);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .lead {
          margin: 0;
          font-size: 17px;
          line-height: 1.5;
          color: var(--text-secondary);
          max-width: 44ch;
        }

        .cta-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn-accent {
          display: inline-flex;
          align-items: center;
          height: 48px;
          padding: 0 22px;
          background: var(--accent);
          color: var(--text-on-accent);
          border: 1px solid var(--accent);
          border-radius: var(--radius-ctrl);
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(21, 34, 56, 0.1);
          transition:
            background-color 0.2s ease-out,
            border-color 0.2s ease-out,
            box-shadow 0.25s ease-out,
            transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .btn-accent:hover {
          background: var(--accent-hover);
          border-color: var(--accent-hover);
          box-shadow: 0 8px 24px rgba(59, 92, 233, 0.35);
          transform: translateY(-3px);
        }

        .btn-accent:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 92, 233, 0.25);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          appearance: none;
          font: inherit;
          height: 48px;
          padding: 0 22px;
          background: transparent;
          color: var(--text-body);
          border: 1px solid var(--text-body);
          border-radius: var(--radius-ctrl);
          font-weight: 500;
          cursor: pointer;
          transition:
            background-color 0.2s ease-out,
            border-color 0.2s ease-out,
            transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .btn-secondary:hover {
          background: rgba(21, 34, 56, 0.06);
          transform: translateY(-2px);
        }

        .btn-secondary:active {
          transform: translateY(0);
        }

        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
          gap: 40px 64px;
          align-items: start;
          border-top: 1px solid var(--border);
          padding-top: 48px;
        }

        .editorial-main {
          display: flex;
          flex-direction: column;
          gap: 18px;
          min-width: 0;
        }

        .editorial-main h2 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(32px, 3.4vw, 46px);
          line-height: 1.1;
          letter-spacing: -0.015em;
          max-width: 18ch;
        }

        .body {
          margin: 0;
          font-size: 17px;
          line-height: 1.55;
          color: var(--text-secondary);
          max-width: 52ch;
        }

        .code-block {
          font-family: var(--font-label);
          font-size: 12.5px;
          line-height: 1.6;
          background: var(--sw-ink);
          color: var(--sw-paper);
          border-radius: 4px;
          padding: 14px 16px;
          display: grid;
          gap: 2px;
          max-width: 560px;
        }

        .code-block > div {
          display: flex;
          gap: 10px;
          min-width: 0;
        }

        .code-key {
          color: #7FA4FF;
          flex: 0 0 130px;
        }

        .editorial-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 24px;
        }

        .outcome-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .outcome-form label {
          font-size: 15px;
          font-weight: 600;
        }

        .outcome-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .outcome-form input {
          flex: 1 1 220px;
          min-width: 0;
          height: 48px;
          box-sizing: border-box;
          font: inherit;
          font-size: 15px;
          padding: 0 14px;
          border: 1px solid var(--border);
          border-radius: 3px;
          background: var(--surface-card);
          color: var(--text-body);
          outline: none;
        }

        .outcome-form input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(36, 71, 232, 0.25);
        }

        .btn-primary {
          height: 48px;
          padding: 0 20px;
          background: var(--sw-ink);
          color: var(--sw-paper);
          border: 1px solid var(--sw-ink);
          border-radius: 3px;
          font-weight: var(--weight-medium);
          cursor: pointer;
        }

        .outcome-hint {
          margin: 0;
          font-family: var(--font-label);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
        }

        .chapter-detail {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border);
          padding-top: 18px;
        }

        .chapter-detail h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: -0.015em;
        }

        .chapter-detail p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .chapter-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .chapter-controls button {
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          font-size: 12px;
        }

        .activity {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px solid var(--border);
          padding-top: 18px;
        }

        .activity-label {
          font-family: var(--font-label);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .activity ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-family: var(--font-label);
          font-size: 12px;
          line-height: 1.45;
          color: var(--text-body);
        }

        .activity li {
          display: flex;
          gap: 8px;
          min-width: 0;
        }

        .md-actions {
          display: flex;
          gap: 6px 16px;
          flex-wrap: wrap;
          align-items: center;
          font-family: var(--font-label);
          font-size: 12px;
          padding-top: 10px;
          border-top: 1px solid;
        }

        .link-btn {
          border: 0;
          background: none;
          padding: 6px 0;
          cursor: pointer;
          font: inherit;
        }

        .flash-note {
          font-weight: 500;
        }

        .md-preview {
          margin: 0;
          font-family: var(--font-label);
          font-size: 12px;
          line-height: 1.55;
          white-space: pre-wrap;
          border: 1px solid;
          border-radius: 4px;
          padding: 14px 16px;
          max-height: 280px;
          overflow: auto;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 24px 32px;
          border-top: 1px solid var(--border);
          padding-top: 40px;
        }

        .feature {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feature h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.3;
        }

        .feature p {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Animations */
        @keyframes work {
          from { transform: translateY(0); }
          to { transform: translateY(-4px); }
        }

        @keyframes gatepulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 104, 72, 0); }
          50% { box-shadow: 0 0 0 12px rgba(255, 104, 72, 0.22); }
        }

        @keyframes cue {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }

        /* Radial lines from hub to stations */
        .radial-line {
          position: absolute;
          height: 0;
          border-top: 1px solid;
          transform-origin: 0 0;
          pointer-events: none;
        }

        /* Dashed sequence lines */
        .seq-line {
          position: absolute;
          height: 0;
          border-top: 2px dashed;
          transform-origin: 0 0;
          pointer-events: none;
          transition: border-color 0.3s ease;
        }

        /* Context source buttons */
        .ctx-button {
          position: absolute;
          width: 56px;
          height: 46px;
          margin: -46px 0 0 -28px;
          padding: 5px 6px;
          transform-origin: 50% 100%;
          background: #FFFFFF;
          border: 1px solid #D3D2CB;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(21, 34, 56, 0.08);
          display: flex;
          flex-direction: column;
          gap: 3px;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s ease;
        }

        .ctx-button:hover {
          border-color: #2447E8;
        }

        .ctx-bar {
          display: block;
          height: 2px;
          width: 70%;
          background: #2447E8;
        }

        .ctx-bar-2 {
          display: block;
          height: 2px;
          width: 50%;
          background: #D3D2CB;
        }

        .ctx-name {
          font-family: var(--font-label);
          font-size: 7.5px;
          line-height: 1.2;
          color: #152238;
          margin-top: auto;
        }

        /* Evidence cards */
        .evidence-card {
          position: absolute;
          width: 40px;
          height: 30px;
          margin: -30px 0 0 -20px;
          transform-origin: 50% 100%;
          background: #FFFFFF;
          border: 1px solid #2447E8;
          border-radius: 3px;
          padding: 3px 4px;
          font-family: var(--font-label);
          font-size: 7px;
          line-height: 1.3;
          color: #2447E8;
          box-shadow: 0 1px 2px rgba(21, 34, 56, 0.08);
          pointer-events: none;
          animation: evidenceIn 0.3s ease;
        }

        @keyframes evidenceIn {
          from {
            opacity: 0;
            transform: translateZ(28px) rotateZ(42deg) rotateX(-58deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateZ(28px) rotateZ(42deg) rotateX(-58deg) scale(1);
          }
        }

        .evidence-bar {
          display: block;
          height: 2px;
          width: 60%;
          background: #DCE4FF;
          margin-top: 3px;
        }

        /* Zoom controls */
        .zoom-controls {
          position: absolute;
          right: 14px;
          top: 84px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .zoom-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(15, 26, 48, 0.8);
          color: #FFFFFF;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .zoom-btn:hover {
          background: rgba(36, 71, 232, 0.8);
          border-color: rgba(36, 71, 232, 0.5);
        }

        /* Signal animations */
        .signals {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .signal {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          left: -5px;
          top: -5px;
        }

        .signal-0a {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig0a 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-0b {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig0b 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s infinite;
        }
        .signal-0c {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig0c 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s infinite;
        }
        .signal-1 {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig1 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-2 {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig2 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-2a {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig2a 1s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-2b {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig2b 1s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-2c {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig2c 1s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-3 {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig3 2.6s cubic-bezier(0.2, 0.8, 0.2, 1) 1 forwards;
        }
        .signal-3a {
          background: #1E9E6A;
          box-shadow: 0 0 0 4px rgba(45, 134, 85, 0.2);
          animation: sig3a 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1 forwards;
        }
        .signal-3b {
          background: #1E9E6A;
          box-shadow: 0 0 0 4px rgba(45, 134, 85, 0.2);
          animation: sig3b 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1 forwards;
        }
        .signal-3c {
          background: #1E9E6A;
          box-shadow: 0 0 0 4px rgba(45, 134, 85, 0.2);
          animation: sig3c 1s cubic-bezier(0.2, 0.8, 0.2, 1) 1 forwards;
        }
        .signal-approve {
          background: #FF6848;
          box-shadow: 0 0 0 4px rgba(255, 104, 72, 0.2);
          animation: sig6 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 1 forwards;
        }
        .signal-4 {
          background: #2447E8;
          box-shadow: 0 0 0 4px rgba(36, 71, 232, 0.18);
          animation: sig4 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
        .signal-5 {
          background: #1E9E6A;
          box-shadow: 0 0 0 4px rgba(45, 134, 85, 0.2);
          animation: sig5 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        @keyframes sig0a {
          from { transform: translate3d(45px, 210px, 30px); }
          to { transform: translate3d(224px, 197px, 30px); }
        }
        @keyframes sig0b {
          from { transform: translate3d(68px, 234px, 30px); }
          to { transform: translate3d(224px, 197px, 30px); }
        }
        @keyframes sig0c {
          from { transform: translate3d(91px, 258px, 30px); }
          to { transform: translate3d(224px, 197px, 30px); }
        }
        @keyframes sig1 {
          0% { transform: translate3d(224px, 197px, 30px); }
          50% { transform: translate3d(555px, 395px, 44px); }
          100% { transform: translate3d(595px, 85px, 30px); }
        }
        @keyframes sig2 {
          0% { transform: translate3d(595px, 85px, 30px); }
          50% { transform: translate3d(555px, 395px, 44px); }
          100% { transform: translate3d(827px, 183px, 30px); }
        }
        @keyframes sig2a {
          from { transform: translate3d(555px, 395px, 44px); }
          to { transform: translate3d(755px, 255px, 12px); }
        }
        @keyframes sig2b {
          from { transform: translate3d(555px, 395px, 44px); }
          to { transform: translate3d(900px, 257px, 12px); }
        }
        @keyframes sig2c {
          from { transform: translate3d(555px, 395px, 44px); }
          to { transform: translate3d(830px, 105px, 12px); }
        }
        @keyframes sig3 {
          0% { transform: translate3d(827px, 183px, 30px); }
          50% { transform: translate3d(555px, 395px, 44px); }
          100% { transform: translate3d(853px, 512px, 30px); }
        }
        @keyframes sig3a {
          from { transform: translate3d(755px, 255px, 12px); }
          to { transform: translate3d(853px, 512px, 30px); }
        }
        @keyframes sig3b {
          from { transform: translate3d(900px, 257px, 12px); }
          to { transform: translate3d(853px, 512px, 30px); }
        }
        @keyframes sig3c {
          from { transform: translate3d(830px, 105px, 12px); }
          to { transform: translate3d(853px, 512px, 30px); }
        }
        @keyframes sig6 {
          from { transform: translate3d(214px, 519px, 24px); }
          to { transform: translate3d(853px, 512px, 30px); }
        }
        @keyframes sig4 {
          0% { transform: translate3d(853px, 512px, 30px); }
          50% { transform: translate3d(555px, 395px, 44px); }
          100% { transform: translate3d(635px, 723px, 30px); }
        }
        @keyframes sig5 {
          0% { transform: translate3d(635px, 723px, 30px); }
          50% { transform: translate3d(555px, 395px, 44px); }
          100% { transform: translate3d(359px, 700px, 22px); }
        }

        /* Work Desks */
        .desk {
          position: absolute;
          width: 84px;
          height: 42px;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        /* Partition walls - standing upright */
        .partition-back {
          position: absolute;
          left: -8px;
          top: -8px;
          width: 100px;
          height: 45px;
          transform-origin: 0 100%;
          transform: translateZ(0) rotateX(-90deg);
          border-radius: 2px 2px 0 0;
          backdrop-filter: blur(2px);
        }

        .partition-left {
          position: absolute;
          left: -8px;
          top: -8px;
          width: 45px;
          height: 58px;
          transform-origin: 0 0;
          transform: translateZ(0) rotateX(-90deg) rotateY(-90deg);
          border-radius: 2px 2px 0 0;
          backdrop-filter: blur(2px);
        }

        .desk-top {
          position: absolute;
          inset: 0;
          transform: translateZ(10px);
          border-radius: 3px;
          display: block;
        }

        .desk-monitor {
          position: absolute;
          left: 12px;
          top: 4px;
          width: 28px;
          height: 22px;
          border-radius: 2px;
          display: block;
          transform-origin: bottom center;
          transform: rotateX(-90deg);
        }

        .desk-side-front {
          position: absolute;
          left: 0;
          top: 100%;
          width: 84px;
          height: 10px;
          transform-origin: top;
          transform: rotateX(90deg);
          display: block;
        }

        .desk-side-left {
          position: absolute;
          top: 0;
          right: 100%;
          width: 10px;
          height: 42px;
          transform-origin: right;
          transform: rotateY(90deg);
          display: block;
        }

        .desk-chair {
          position: absolute;
          left: 28px;
          top: 52px;
          width: 28px;
          height: 26px;
          border-radius: 9px 9px 12px 12px;
          transform: translateZ(5px);
          display: block;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 1024px) {
          .stage-nav {
            display: none;
          }

          .legend {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .chapters {
            display: none;
          }
        }
      `}</style>
      </div>
    </ParallaxContext.Provider>
  );
}

