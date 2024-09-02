"use client";
import React from "react";
import {
  StickyScroll,
  type StickyScrollContent,
} from "@/components/ui/sticky-reveal";

export function ElderScroll(props: { content: StickyScrollContent[] }) {
  return (
    <div className="text-gray-800">
      <StickyScroll content={props.content} />
    </div>
  );
}
