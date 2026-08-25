'use client';
import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  Users, TrendingUp, FileQuestion, CheckCircle2, XCircle,
  Download, Search, ChevronDown, ChevronUp, ChevronsUpDown,
  LogOut, X, Filter, Eye
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { MOCK_ENTRIES, MOCK_STATS } from '@/lib/mockData';
import { WaitlistEntry } from '@/lib/types';

const DailySignupsChart = dynamic(() => import('./components/DailySignupsChart'), { ssr: false });
const CategoryChart = dynamic(() => import('./components/CategoryChart'), { ssr: false });
const ProblemsChart = dynamic(() => import('./components/ProblemsChart'), { ssr: false });

type SortKey = keyof WaitlistEntry;
type SortDir = 'asc' | 'desc';

const CATEGORIES = [
  'All', 'YouTube / Content Creator', 'Streamer / Gamer', 'Podcaster',
  'Coach / Consultant', 'Educator / Course Creator', 'Community Owner',
  'Freelancer / Service Provider', 'Digital Product Seller', 'Small Business', 'Other',
];

const Q_STATUS = ['All', 'Completed', 'Skipped', 'Abandoned', 'Not started'];
const SOURCES = ['All', 'Instagram', 'Facebook', 'LinkedIn', 'Direct'];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterQStatus, setFilterQStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [perPage] = useState(8);
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = MOCK_STATS;

  const filtered = useMemo(() => {
    let data = [...MOCK_ENTRIES];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((e) =>
        e.email?.toLowerCase().includes(q) ||
        e.phone?.includes(q) ||
        e.firstName?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q) ||
        e.openEndedResponse?.toLowerCase().includes(q)
      );
    }

    if (filterCategory !== 'All') {
      data = data.filter((e) => e.category === filterCategory);
    }

    if (filterQStatus !== 'All') {
      data = data.filter((e) => {
        if (filterQStatus === 'Completed') return e.questionnaireCompleted;
        if (filterQStatus === 'Skipped') return e.questionnaireSkipped;
        if (filterQStatus === 'Abandoned') return e.questionnaireStarted && !e.questionnaireCompleted && !e.questionnaireSkipped;
        if (filterQStatus === 'Not started') return !e.questionnaireStarted && !e.questionnaireSkipped;
        return true;
      });
    }

    if (filterSource !== 'All') {
      data = data.filter((e) => e.source === filterSource);
    }

    data.sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return data;
  }, [search, filterCategory, filterQStatus, filterSource, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = useCallback((key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }, [sortKey]);

  const handleExportCSV = useCallback(() => {
    // Backend integration point: GET /api/admin/export/csv
    const headers = [
      'ID', 'Date', 'Email', 'Phone', 'First Name', 'Category',
      'Audience Size', 'Monetization', 'Payment Methods', 'Problems',
      'Intended Use', 'Membership Experience', 'Membership Platform',
      'Open Response', 'Q Started', 'Q Completed', 'Q Skipped',
      'Source', 'UTM Source', 'UTM Medium', 'UTM Campaign',
    ];
    const rows = filtered.map((e) => [
      e.id, formatDate(e.createdAt), e.email ?? '', e.phone ?? '',
      e.firstName ?? '', e.category ?? '', e.audienceSize ?? '',
      e.monetizationMethods.join('; '), e.paymentMethods.join('; '),
      e.recurringPaymentProblems.join('; '), e.intendedUse ?? '',
      e.creatorMembershipExperience ?? '', e.creatorMembershipPlatform ?? '',
      `"${(e.openEndedResponse ?? '').replace(/"/g, '""')}"`,
      e.questionnaireStarted ? 'Yes' : 'No',
      e.questionnaireCompleted ? 'Yes' : 'No',
      e.questionnaireSkipped ? 'Yes' : 'No',
      e.source ?? '', e.utmSource ?? '', e.utmMedium ?? '', e.utmCampaign ?? '',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mobde-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  const qStatusBadge = (e: WaitlistEntry) => {
    if (e.questionnaireCompleted) return <StatusBadge label="Completed" color="green" />;
    if (e.questionnaireSkipped) return <StatusBadge label="Skipped" color="amber" />;
    if (e.questionnaireStarted) return <StatusBadge label="Abandoned" color="red" />;
    return <StatusBadge label="Not started" color="gray" />;
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={12} className="text-muted-foreground/50" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top nav */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppLogo src="/assets/images/Mobde-1787628974719.png" size={30} />
            <span className="text-xs font-600 text-muted-foreground uppercase tracking-widest border-l border-border pl-3">
              Admin
            </span>
          </div>
          <button
            onClick={() => router.push('/admin-login')}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-5 sm:px-8 py-8">
        {/* Page title */}
        <div className="mb-7">
          <h1 className="text-xl font-700 text-foreground">Waitlist overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: 25 Aug 2026, 03:41
          </p>
        </div>

        {/* ─── KPI CARDS ─── */}
        {/* 6 cards → grid-cols-2 md:grid-cols-3 xl:grid-cols-6 */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
          <KPICard
            label="Total signups"
            value={String(stats.totalSignups)}
            sub="all time"
            icon={<Users size={16} />}
          />
          <KPICard
            label="Today"
            value={String(stats.newSignupsToday)}
            sub="new signups"
            icon={<TrendingUp size={16} />}
            highlight
          />
          <KPICard
            label="Creators"
            value={String(stats.creatorSignups)}
            sub={`${Math.round((stats.creatorSignups / stats.totalSignups) * 100)}% of total`}
            icon={<Users size={16} />}
          />
          <KPICard
            label="Q completion"
            value={`${stats.completionRate}%`}
            sub={`${stats.questionnaireCompletions} of ${stats.questionnaireStarts}`}
            icon={<CheckCircle2 size={16} />}
          />
          <KPICard
            label="Q skipped"
            value={String(stats.questionnaireSkips)}
            sub="skipped questionnaire"
            icon={<FileQuestion size={16} />}
          />
          <KPICard
            label="Abandoned"
            value={String(stats.questionnaireAbandonment)}
            sub="started but didn't finish"
            icon={<XCircle size={16} />}
            warning
          />
        </div>

        {/* ─── CHARTS ROW ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-1 bg-white border border-border rounded-xl p-5">
            <div className="mb-4">
              <div className="text-sm font-600 text-foreground">Daily signups</div>
              <div className="text-xs text-muted-foreground mt-0.5">Last 7 days</div>
            </div>
            <DailySignupsChart data={stats.dailySignups} />
          </div>

          <div className="lg:col-span-1 bg-white border border-border rounded-xl p-5">
            <div className="mb-4">
              <div className="text-sm font-600 text-foreground">Signups by category</div>
              <div className="text-xs text-muted-foreground mt-0.5">All time</div>
            </div>
            <CategoryChart data={stats.categoryBreakdown} />
          </div>

          <div className="lg:col-span-1 bg-white border border-border rounded-xl p-5">
            <div className="mb-4">
              <div className="text-sm font-600 text-foreground">Top reported problems</div>
              <div className="text-xs text-muted-foreground mt-0.5">From questionnaire responses</div>
            </div>
            <ProblemsChart data={stats.topProblems} />
          </div>
        </div>

        {/* ─── SUBMISSIONS TABLE ─── */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-600 text-foreground">Submissions</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
                {filtered.length !== MOCK_ENTRIES.length && ` (filtered from ${MOCK_ENTRIES.length})`}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-border rounded-md bg-white text-foreground placeholder:text-muted-foreground input-focus-gold"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(''); setPage(1); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters((s) => !s)}
                className={`flex items-center gap-1.5 text-xs font-500 px-3 py-2 rounded-md border transition-colors
                  ${showFilters ? 'border-primary text-primary bg-primary/6' : 'border-border text-muted-foreground hover:text-foreground'}`}
              >
                <Filter size={13} />
                Filters
              </button>

              {/* Export */}
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 text-xs font-600 px-3 py-2 rounded-md border border-border hover:border-foreground/30 text-foreground transition-colors"
              >
                <Download size={13} />
                CSV
              </button>
            </div>
          </div>

          {/* Filter bar */}
          {showFilters && (
            <div className="px-5 py-3.5 border-b border-border bg-secondary/30 flex flex-wrap gap-3 items-center">
              <FilterSelect
                label="Category"
                value={filterCategory}
                options={CATEGORIES}
                onChange={(v) => { setFilterCategory(v); setPage(1); }}
              />
              <FilterSelect
                label="Q Status"
                value={filterQStatus}
                options={Q_STATUS}
                onChange={(v) => { setFilterQStatus(v); setPage(1); }}
              />
              <FilterSelect
                label="Source"
                value={filterSource}
                options={SOURCES}
                onChange={(v) => { setFilterSource(v); setPage(1); }}
              />
              {(filterCategory !== 'All' || filterQStatus !== 'All' || filterSource !== 'All') && (
                <button
                  onClick={() => {
                    setFilterCategory('All');
                    setFilterQStatus('All');
                    setFilterSource('All');
                    setPage(1);
                  }}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                >
                  <X size={11} /> Clear filters
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-secondary/20">
                  {[
                    { key: 'createdAt' as SortKey, label: 'Date' },
                    { key: 'firstName' as SortKey, label: 'Name' },
                    { key: 'email' as SortKey, label: 'Contact' },
                    { key: 'category' as SortKey, label: 'Category' },
                    { key: 'source' as SortKey, label: 'Source' },
                    { key: 'intendedUse' as SortKey, label: 'Intended use' },
                    { key: 'questionnaireCompleted' as SortKey, label: 'Q Status' },
                  ].map(({ key, label }) => (
                    <th
                      key={`th-${key}`}
                      className="text-left px-4 py-3 text-xs font-600 text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center gap-1.5">
                        {label}
                        <SortIcon col={key} />
                      </div>
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-600 text-muted-foreground w-12" />
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No entries match your current filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                        {formatDate(entry.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm font-500 text-foreground">
                        {entry.firstName ?? <span className="text-muted-foreground/50">—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-foreground">
                        <div className="flex flex-col gap-0.5">
                          {entry.email && (
                            <span className="text-foreground/80">{entry.email}</span>
                          )}
                          {entry.phone && (
                            <span className="text-muted-foreground font-mono text-xs">{entry.phone}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {entry.category ? (
                          <span className="text-xs font-500 text-foreground bg-secondary px-2.5 py-1 rounded-full whitespace-nowrap">
                            {entry.category}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground">{entry.source ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground">{entry.intendedUse ?? '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        {qStatusBadge(entry)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={(ev) => { ev.stopPropagation(); setSelectedEntry(entry); }}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          aria-label="View details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3.5 border-t border-border flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground tabular-nums">
                {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2.5 py-1.5 text-xs border border-border rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={`page-${n}`}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 text-xs rounded-md transition-colors
                      ${page === n
                        ? 'bg-foreground text-white font-600'
                        : 'text-muted-foreground hover:text-foreground border border-border'
                      }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2.5 py-1.5 text-xs border border-border rounded-md text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ─── DETAIL MODAL ─── */}
      {selectedEntry && (
        <EntryDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
}

// ─── Sub-components ───

function KPICard({
  label, value, sub, icon, highlight, warning,
}: {
  label: string; value: string; sub: string;
  icon: React.ReactNode; highlight?: boolean; warning?: boolean;
}) {
  return (
    <div className={`bg-white border rounded-xl p-4 flex flex-col gap-2
      ${warning ? 'border-destructive/20 bg-destructive/3' : highlight ? 'border-primary/20 bg-primary/3' : 'border-border'}`}>
      <div className={`flex items-center gap-1.5 text-xs font-600 uppercase tracking-wide
        ${warning ? 'text-destructive/70' : highlight ? 'text-primary/80' : 'text-muted-foreground'}`}>
        {icon}
        {label}
      </div>
      <div className={`text-2xl font-800 tabular-nums
        ${warning ? 'text-destructive' : 'text-foreground'}`}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function StatusBadge({ label, color }: { label: string; color: 'green\' | \'amber\' | \'red\' | \'gray' }) {
  const cls = {
    green: 'bg-success/10 text-success border-success/20',
    amber: 'bg-warning/10 text-warning border-warning/20',
    red: 'bg-destructive/10 text-destructive border-destructive/20',
    gray: 'bg-secondary text-muted-foreground border-border',
  }[color];
  return (
    <span className={`inline-block text-xs font-500 px-2 py-0.5 rounded-full border whitespace-nowrap ${cls}`}>
      {label}
    </span>
  );
}

function FilterSelect({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground font-500">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs border border-border rounded-md px-2 py-1.5 bg-white text-foreground input-focus-gold"
      >
        {options.map((o) => (
          <option key={`filter-opt-${o}`} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function EntryDetailModal({ entry, onClose }: { entry: WaitlistEntry; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Entry details"
    >
      <div
        className="bg-white w-full sm:max-w-xl sm:rounded-xl rounded-t-xl overflow-hidden product-preview-shadow max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white border-b border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-700 text-foreground">
              {entry.firstName ?? 'Anonymous'} — {formatDate(entry.createdAt)}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 font-mono">{entry.id}</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-5 space-y-5">
          {/* Contact */}
          <DetailSection title="Contact">
            <DetailRow label="Email" value={entry.email} />
            <DetailRow label="Phone" value={entry.phone} mono />
          </DetailSection>

          {/* Profile */}
          <DetailSection title="Profile">
            <DetailRow label="Category" value={entry.category} />
            <DetailRow label="Audience size" value={entry.audienceSize} />
          </DetailSection>

          {/* Questionnaire */}
          <DetailSection title="Questionnaire">
            <DetailRow
              label="Status"
              value={
                entry.questionnaireCompleted ? 'Completed' :
                entry.questionnaireSkipped ? 'Skipped': entry.questionnaireStarted ?'Abandoned' : 'Not started'
              }
            />
            <DetailRow label="Monetization" value={entry.monetizationMethods.join(', ') || null} />
            <DetailRow label="Payment methods" value={entry.paymentMethods.join(', ') || null} />
            <DetailRow label="Problems" value={entry.recurringPaymentProblems.join(', ') || null} />
            <DetailRow label="Intended use" value={entry.intendedUse} />
            <DetailRow label="Membership experience" value={entry.creatorMembershipExperience} />
            <DetailRow label="Membership platform" value={entry.creatorMembershipPlatform} />
          </DetailSection>

          {/* Open response */}
          {entry.openEndedResponse && (
            <DetailSection title="Open response">
              <p className="text-sm text-foreground leading-relaxed bg-secondary/40 rounded-lg px-3.5 py-3">
                {entry.openEndedResponse}
              </p>
            </DetailSection>
          )}

          {/* Attribution */}
          <DetailSection title="Attribution">
            <DetailRow label="Source" value={entry.source} />
            <DetailRow label="Referrer" value={entry.referrer} />
            <DetailRow label="UTM source" value={entry.utmSource} />
            <DetailRow label="UTM medium" value={entry.utmMedium} />
            <DetailRow label="UTM campaign" value={entry.utmCampaign} />
            <DetailRow label="UTM content" value={entry.utmContent} />
          </DetailSection>
        </div>
      </div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-600 text-muted-foreground uppercase tracking-wide mb-2.5">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-muted-foreground w-36 flex-shrink-0 text-xs pt-0.5">{label}</span>
      <span className={`text-foreground flex-1 min-w-0 break-words ${mono ? 'font-mono text-xs' : ''}`}>
        {value}
      </span>
    </div>
  );
}