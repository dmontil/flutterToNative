"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ReactNode } from "react";

type TrackedCtaLinkProps = {
  href: string;
  eventName: string;
  eventParams?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

export function TrackedCtaLink({ href, eventName, eventParams, className, children }: TrackedCtaLinkProps) {
  return (
    <Button className={className} asChild>
      <a
        href={href}
        onClick={() => {
          trackEvent(eventName, eventParams);
        }}
      >
        {children}
      </a>
    </Button>
  );
}
