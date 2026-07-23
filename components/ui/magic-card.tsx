"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "orb" | "gradient";
  glowFrom?: string;
  glowTo?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  children?: React.ReactNode;
  className?: string;
}

export function MagicCard({
  children,
  className,
  mode = "orb",
  glowFrom = "#6366F1",
  glowTo = "#A855F7",
  gradientSize = 250,
  gradientColor = "rgba(99, 102, 241, 0.15)",
  gradientOpacity = 0.8,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm overflow-hidden transition-all duration-300",
        className,
      )}
      {...props}
    >
      {/* Interactive Radial Magic Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? gradientOpacity : 0,
          background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            mode === "orb"
              ? `${glowFrom}, ${glowTo}`
              : gradientColor
          }, transparent 80%)`,
        }}
      />

      {/* Card Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
