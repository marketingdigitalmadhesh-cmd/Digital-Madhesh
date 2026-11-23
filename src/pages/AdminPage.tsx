import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  Briefcase,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  Layers,
  Loader2,
  LogOut,
  Menu,
  Settings,
  ShieldAlert,
  X,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType, PRIMARY_ADMIN_EMAIL } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteDataContext';
import { BlogPost, Inquiry, PortfolioProject } from '../types';
import { SeoHead } from '../components/SeoHead';
import { AdminOverview } from '../components/admin/AdminOverview';
import { LeadsManager } from '../components/admin/LeadsManager';
import { BlogManager } from '../components/admin/BlogManager';
import { PortfolioManager } from '../components/admin/PortfolioManager';
import { ServicesManager } from '../components/admin/ServicesManager';
import { SiteSettingsManager } from '../components/admin/SiteSettingsManager';

type AdminTab = 'overview' | 'leads' | 'blogs' | 'portfolio' | 'services' | 'settings';

const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads & Inquiries', icon: Inbox },
  { id: 'blogs', label: 'Blog CMS', icon: FileText },
  { id: 'portfolio', label: 'Portfolio CMS', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'settings', label: 'Website & SEO', icon: Settings },
];

export function AdminPage() {
  const { user, loading: authLoading, isAdmin, authError, signInWithGoogle, signOut } = useAuth();
  const { services, isServicesFromDb } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      setInquiries([]);
      setBlogs([]);
      setProjects([]);
      return;
    }

    setDataLoading(true);
    let loadedInq = false;
    let loadedBlogs = false;
    let loadedProj = false;

    const markReady = () => {
      if (loadedInq && loadedBlogs && loadedProj) {
        setDataLoading(false);
      }
    };

    const unsubInquiries = onSnapshot(
      collection(db, 'inquiries'),
      (snap) => {
        const list = snap.docs
          .map((d) => ({ ...(d.data() as Omit<Inquiry, 'id'>), id: d.id }))
          .sort((a, b) => b.id.localeCompare(a.id));
        setInquiries(list);
        loadedInq = true;
        markReady();
      },
      (error) => {
        setDataLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'inquiries');
      },
    );

    const unsubBlogs = onSnapshot(
      collection(db, 'blogs'),
      (snap) => {
        const list = snap.docs.map((d) => ({
          ...(d.data() as Omit<BlogPost, 'id'>),
          id: d.id,
        }));
        setBlogs(list);
        loadedBlogs = true;
        markReady();
      },
      (error) => {
        setDataLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'blogs');
      },
    );

    const unsubProjects = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        const list = snap.docs.map((d) => ({
          ...(d.data() as Omit<PortfolioProject, 'id'>),
          id: d.id,
        }));
        setProjects(list);
        loadedProj = true;
        markReady();
      },
      (error) => {
        setDataLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'projects');
      },
    );

    return () => {
      unsubInquiries();
      unsubBlogs();
      unsubProjects();
    };
  }, [isAdmin]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <SeoHead title="Admin Portal | Digital Madhesh" description="Digital Madhesh Admin" noIndex />
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <Loader2 className="w-5 h-5 animate-spin text-[#780033]" />
          Verifying administrator session...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
        <SeoHead title="Admin Sign In | Digital Madhesh" description="Admin Login" noIndex />
        <div className="max-w-md w-full rounded-2xl border border-neutral-200 bg-white p-8 space-y-6 shadow-card">
          <div>
            <img
              src="/assets/aistudio/Logo_PNG_social_poster_use_95e15f02.png"
              alt="Digital Madhesh"
              className="h-9 w-auto object-contain mb-6"
            />
            <p className="text-xs font-semibold tracking-wider text-[#780033] mb-1">
              Protected Workspace
            </p>
            <h1 className="font-display text-2xl font-bold text-[#171717]">
              Admin Dashboard Sign In
            </h1>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Sign in with your authorized administrator Google account (
              <span className="font-mono text-xs text-[#171717]">{PRIMARY_ADMIN_EMAIL}</span>) to
              manage leads, blogs, portfolio projects, and website content.
            </p>
          </div>

          {authError && (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs text-red-900">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#5B0027] transition-colors cursor-pointer"
          >
            Sign in with Google
          </button>

          <div className="pt-4 border-t border-neutral-100 text-center">
            <Link to="/" className="text-xs font-medium text-neutral-500 hover:text-[#780033]">
              Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
        <SeoHead title="Access Restricted | Digital Madhesh" description="Admin Access Restricted" noIndex />
        <div className="max-w-md w-full rounded-2xl border border-neutral-200 bg-white p-8 space-y-5 shadow-card">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#780033] shrink-0 mt-0.5" />
            <div>
              <h1 className="font-display text-xl font-bold text-[#171717]">
                Administrator access required
              </h1>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                You are signed in as{' '}
                <span className="font-mono text-xs text-[#171717]">{user.email}</span>, which is
                not authorized to access private inquiries or CMS records.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={signOut}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#171717] text-white hover:bg-[#780033] transition-colors cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl text-sm font-medium border border-neutral-300 text-[#171717]"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeNavLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label || 'Overview';

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <SeoHead title={`${activeNavLabel} | Admin | Digital Madhesh`} description="Admin" noIndex />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#171717] text-neutral-300 flex-col justify-between border-r border-neutral-800">
        <div>
          <div className="h-16 px-6 flex items-center gap-3 border-b border-neutral-800">
            <img
              src="/assets/aistudio/Icon_Based_Logo_828d99ce.png"
              alt="Digital Madhesh"
              className="w-8 h-8 object-contain"
            />
            <span className="font-display text-sm font-bold text-white tracking-tight">
              Digital Madhesh
            </span>
          </div>
          <nav className="p-4 space-y-1" aria-label="Admin Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#780033] text-white'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-800 space-y-3">
          <div className="px-2">
            <p className="text-[11px] text-neutral-400">Signed in as</p>
            <p className="text-xs font-mono text-white truncate">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-neutral-700 text-neutral-200 hover:border-[#DDB34D] hover:text-white cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-64 bg-[#171717] text-white flex flex-col justify-between p-4">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                <span className="font-display text-sm font-bold">Admin Menu</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium ${
                        isActive ? 'bg-[#780033] text-white' : 'text-neutral-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold border border-neutral-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-neutral-200 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 border border-neutral-200 text-[#171717]"
              aria-label="Open admin navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <p className="text-xs sm:text-sm text-neutral-500">
              Admin <span className="mx-1.5">/</span>{' '}
              <span className="font-semibold text-[#171717]">{activeNavLabel}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-neutral-300 text-[#171717] hover:border-[#780033] whitespace-nowrap"
            >
              View Website
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full">
          {activeTab === 'overview' && (
            <AdminOverview
              inquiries={inquiries}
              blogs={blogs}
              projects={projects}
              loading={dataLoading}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}
          {activeTab === 'leads' && <LeadsManager inquiries={inquiries} loading={dataLoading} />}
          {activeTab === 'blogs' && <BlogManager blogs={blogs} loading={dataLoading} />}
          {activeTab === 'portfolio' && (
            <PortfolioManager projects={projects} loading={dataLoading} />
          )}
          {activeTab === 'services' && (
            <ServicesManager services={services} isFromDb={isServicesFromDb} />
          )}
          {activeTab === 'settings' && (
            <SiteSettingsManager blogs={blogs} projects={projects} />
          )}
        </main>
      </div>
    </div>
  );
}
