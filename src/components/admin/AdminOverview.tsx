import { ArrowRight } from 'lucide-react';
import { BlogPost, Inquiry, PortfolioProject } from '../../types';

interface AdminOverviewProps {
  inquiries: Inquiry[];
  blogs: BlogPost[];
  projects: PortfolioProject[];
  loading: boolean;
  onNavigateTab: (tab: 'leads' | 'blogs' | 'portfolio' | 'services' | 'settings') => void;
}

export function AdminOverview({
  inquiries,
  blogs,
  projects,
  loading,
  onNavigateTab,
}: AdminOverviewProps) {
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;
  const contactedLeads = inquiries.filter((i) => i.status === 'Contacted').length;
  const followUpLeads = inquiries.filter((i) => i.status === 'Follow-up').length;
  const publishedBlogs = blogs.filter((b) => b.status === 'published').length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;

  const stats = [
    { label: 'Total Inquiries', value: totalInquiries, tab: 'leads' as const },
    { label: 'New Inquiries', value: newInquiries, tab: 'leads' as const },
    { label: 'Contacted Leads', value: contactedLeads, tab: 'leads' as const },
    { label: 'Follow-up Leads', value: followUpLeads, tab: 'leads' as const },
    { label: 'Published Blog Posts', value: publishedBlogs, tab: 'blogs' as const },
    { label: 'Published Portfolio Projects', value: publishedProjects, tab: 'portfolio' as const },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-[#171717]">Agency Overview</h2>
        <p className="text-sm text-neutral-600">
          Live metrics computed directly from Cloud Firestore records.
        </p>
      </div>

      {/* Real KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => onNavigateTab(stat.tab)}
            className="text-left border border-neutral-200 bg-white p-5 hover:border-[#780033] transition-colors cursor-pointer"
          >
            <p className="text-xs font-medium text-neutral-500 mb-2">{stat.label}</p>
            {loading ? (
              <div className="h-8 w-16 bg-neutral-100 animate-pulse" />
            ) : (
              <p className="font-mono tabular-nums text-3xl font-bold text-[#171717]">
                {stat.value}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="border border-neutral-200 bg-white">
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-[#171717]">Recent Inquiries</h3>
          <button
            type="button"
            onClick={() => onNavigateTab('leads')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#780033] hover:underline cursor-pointer"
          >
            Manage All Leads <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-9 bg-neutral-100 animate-pulse" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-600">
            No inquiries received yet. Submissions from the Contact page appear here immediately.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAFAFA] text-xs text-neutral-500">
                  <th className="py-2.5 px-4 font-medium">Ref ID</th>
                  <th className="py-2.5 px-4 font-medium">Name</th>
                  <th className="py-2.5 px-4 font-medium">Phone</th>
                  <th className="py-2.5 px-4 font-medium">Service</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {inquiries.slice(0, 8).map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => onNavigateTab('leads')}
                    className="hover:bg-neutral-50 cursor-pointer h-10"
                  >
                    <td className="py-2 px-4 font-mono tabular-nums text-xs text-neutral-600">
                      {inq.referenceCode}
                    </td>
                    <td className="py-2 px-4 font-medium text-[#171717]">{inq.fullName}</td>
                    <td className="py-2 px-4 font-mono tabular-nums text-xs text-neutral-700">
                      {inq.phoneNumber}
                    </td>
                    <td className="py-2 px-4 text-xs text-neutral-600">{inq.interestedService}</td>
                    <td className="py-2 px-4 text-xs font-semibold text-[#780033]">{inq.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
