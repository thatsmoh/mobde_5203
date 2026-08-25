import React from 'react';

export default function ProductPreview() {
  return (
    <div className="w-full max-w-lg mx-auto product-preview-shadow rounded-xl overflow-hidden border border-border bg-white">
      {/* Creator profile header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-primary/30" />
          </div>
          <div>
            <div className="text-sm font-600 text-foreground">Ahmed Hassan</div>
            <div className="text-xs text-muted-foreground">YouTube Creator · 45K subscribers</div>
          </div>
          <div className="ml-auto">
            <div className="text-xs font-500 text-primary bg-primary/8 px-2.5 py-1 rounded-full border border-primary/20">
              Creator
            </div>
          </div>
        </div>
      </div>

      {/* Membership tiers */}
      <div className="px-5 py-4 space-y-3">
        <div className="text-xs font-600 text-muted-foreground uppercase tracking-wide mb-3">
          Membership Tiers
        </div>

        {/* Tier 1 */}
        <div className="border border-border rounded-lg p-3.5 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-600 text-foreground">Supporter</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Early access to videos · Monthly Q&amp;A
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-700 text-foreground tabular-nums">25 EGP</div>
              <div className="text-xs text-muted-foreground">/ month</div>
            </div>
          </div>
        </div>

        {/* Tier 2 — featured */}
        <div className="border border-primary/40 rounded-lg p-3.5 bg-primary/4 relative">
          <div className="absolute -top-2.5 left-3.5">
            <span className="text-xs font-600 text-primary bg-white border border-primary/30 px-2 py-0.5 rounded-full">
              Most popular
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-600 text-foreground">Community</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Everything in Supporter · Private Discord · Exclusive content
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-700 text-foreground tabular-nums">60 EGP</div>
              <div className="text-xs text-muted-foreground">/ month</div>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="border border-border rounded-lg p-3.5 hover:border-primary/30 transition-colors cursor-pointer">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-600 text-foreground">Patron</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Everything · Monthly call · Name in credits
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-700 text-foreground tabular-nums">150 EGP</div>
              <div className="text-xs text-muted-foreground">/ month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriber stats */}
      <div className="px-5 py-3.5 border-t border-border bg-secondary/30">
        <div className="flex items-center gap-5">
          <div>
            <div className="text-base font-700 text-foreground tabular-nums">247</div>
            <div className="text-xs text-muted-foreground">Active members</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-base font-700 text-foreground tabular-nums">8,320 EGP</div>
            <div className="text-xs text-muted-foreground">Monthly revenue</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-base font-700 text-foreground tabular-nums">94%</div>
            <div className="text-xs text-muted-foreground">Renewal rate</div>
          </div>
        </div>
      </div>

      {/* Concept label */}
      <div className="px-5 py-2.5 border-t border-border">
        <p className="text-xs text-muted-foreground/60 text-center">
          Conceptual product preview — not representative of final design
        </p>
      </div>
    </div>
  );
}