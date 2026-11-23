import { useMemo, useState } from 'react';
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Calendar, Loader2, MessageCircle, Search, Trash2, X } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { Inquiry, InquiryStatus } from '../../types';

const STATUSES: InquiryStatus[] = [
  'New',
  'Contacted',
  'Follow-up',
  'Qualified',
  'Converted',
  'Closed',
];

interface LeadsManagerProps {
  inquiries: Inquiry[];
  loading: boolean;
}

export function LeadsManager({ inquiries, loading }: LeadsManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | InquiryStatus>('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editStatus, setEditStatus] = useState<InquiryStatus>('New');
  const [editNotes, setEditNotes] = useState('');
  const [editFollowUp, setEditFollowUp] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const serviceOptions = useMemo(() => {
    const unique = Array.from(new Set(inquiries.map((i) => i.interestedService).filter(Boolean)));
    return ['All', ...unique];
  }, [inquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const statusOk = statusFilter === 'All' || inq.status === statusFilter;
      const serviceOk = serviceFilter === 'All' || inq.interestedService === serviceFilter;
      const q = searchQuery.trim().toLowerCase();
      const searchOk =
        !q ||
        inq.fullName.toLowerCase().includes(q) ||
        inq.phoneNumber.toLowerCase().includes(q) ||
        inq.referenceCode.toLowerCase().includes(q) ||
        (inq.businessName || '').toLowerCase().includes(q) ||
        (inq.email || '').toLowerCase().includes(q);
      return statusOk && serviceOk && searchOk;
    });
  }, [inquiries, statusFilter, serviceFilter, searchQuery]);

  const selectedInquiry = useMemo(
    () => inquiries.find((i) => i.id === selectedId) || null,
    [inquiries, selectedId],
  );

  const openInquiry = (inq: Inquiry) => {
    setSelectedId(inq.id);
    setEditStatus(inq.status);
    setEditNotes(inq.notes || '');
    setEditFollowUp(inq.followUpDate || '');
    setFeedback(null);
  };

  const handleSave = async () => {
    if (!selectedInquiry) return;
    setSaving(true);
    setFeedback(null);

    const existingHistory = Array.isArray(selectedInquiry.history)
      ? selectedInquiry.history
      : [];
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const changes: string[] = [];
    if (editStatus !== selectedInquiry.status) {
      changes.push(`Status: ${selectedInquiry.status} -> ${editStatus}`);
    }
    if (editFollowUp !== (selectedInquiry.followUpDate || '')) {
      changes.push(`Follow-up: ${editFollowUp || 'cleared'}`);
    }
    if (editNotes.trim() !== (selectedInquiry.notes || '').trim()) {
      changes.push('Notes updated');
    }

    const updatedHistory =
      changes.length > 0
        ? [`[${stamp}] ${changes.join('; ')}`, ...existingHistory].slice(0, 50)
        : existingHistory;

    const docPath = `inquiries/${selectedInquiry.id}`;
    try {
      await updateDoc(doc(db, 'inquiries', selectedInquiry.id), {
        status: editStatus,
        notes: editNotes.slice(0, 5000),
        followUpDate: editFollowUp.slice(0, 30),
        history: updatedHistory,
        updatedAt: serverTimestamp(),
      });
      setFeedback('Lead details saved.');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, docPath);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const docPath = `inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#171717]">Lead &amp; Inquiry CRM</h2>
          <p className="text-sm text-neutral-600">
            Search, filter, update pipeline status, schedule follow-ups, and record notes.
          </p>
        </div>
        <span className="font-mono tabular-nums text-xs text-neutral-500">
          Showing {filtered.length} of {inquiries.length} inquiries
        </span>
      </div>

      {/* Filters */}
      <div className="border border-neutral-200 bg-white p-4 flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, business, or reference ID..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'All' | InquiryStatus)}
          aria-label="Filter by status"
          className="px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
        >
          <option value="All">All Statuses</option>
          {STATUSES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          aria-label="Filter by service"
          className="px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033] max-w-xs"
        >
          {serviceOptions.map((svc) => (
            <option key={svc} value={svc}>
              {svc === 'All' ? 'All Services' : svc}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Table */}
        <div
          className={`border border-neutral-200 bg-white overflow-x-auto ${
            selectedInquiry ? 'xl:col-span-7' : 'xl:col-span-12'
          }`}
        >
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-10 bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-sm text-neutral-600">
              No inquiries match the selected filters.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAFAFA] text-xs text-neutral-500">
                  <th className="py-2.5 px-4 font-medium">Reference</th>
                  <th className="py-2.5 px-4 font-medium">Contact</th>
                  <th className="py-2.5 px-4 font-medium">Service</th>
                  <th className="py-2.5 px-4 font-medium">Follow-up</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((inq) => {
                  const isSelected = inq.id === selectedId;
                  return (
                    <tr
                      key={inq.id}
                      onClick={() => openInquiry(inq)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FDF5F8]' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono tabular-nums text-xs text-neutral-600 whitespace-nowrap">
                        {inq.referenceCode}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-[#171717]">{inq.fullName}</p>
                        <p className="font-mono tabular-nums text-xs text-neutral-500">
                          {inq.phoneNumber}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-xs text-neutral-700">
                        <p className="font-medium">{inq.interestedService}</p>
                        {inq.businessName && (
                          <p className="text-neutral-500">{inq.businessName}</p>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums text-xs text-neutral-600 whitespace-nowrap">
                        {inq.followUpDate || '—'}
                      </td>
                      <td className="py-3 px-4 text-xs font-semibold text-[#780033] whitespace-nowrap">
                        {inq.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Inspector */}
        {selectedInquiry && (
          <div className="xl:col-span-5 border border-neutral-200 bg-white p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <p className="font-mono tabular-nums text-xs text-[#780033] font-semibold">
                  {selectedInquiry.referenceCode}
                </p>
                <h3 className="font-display text-lg font-bold text-[#171717]">
                  {selectedInquiry.fullName}
                </h3>
                {selectedInquiry.businessName && (
                  <p className="text-xs text-neutral-600">{selectedInquiry.businessName}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close inquiry details"
                className="p-1.5 text-neutral-500 hover:text-[#171717] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Phone:</span>
                <a
                  href={`tel:${selectedInquiry.phoneNumber.replace(/\s+/g, '')}`}
                  className="font-mono tabular-nums font-semibold text-[#171717] hover:text-[#780033]"
                >
                  {selectedInquiry.phoneNumber}
                </a>
              </div>
              {selectedInquiry.email && (
                <div className="flex justify-between gap-3">
                  <span className="text-neutral-500">Email:</span>
                  <span className="break-all">{selectedInquiry.email}</span>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Interested Service:</span>
                <span className="font-medium text-right">{selectedInquiry.interestedService}</span>
              </div>
              {selectedInquiry.budget && (
                <div className="flex justify-between gap-3">
                  <span className="text-neutral-500">Budget:</span>
                  <span className="font-medium">{selectedInquiry.budget}</span>
                </div>
              )}
            </div>

            <div className="border border-neutral-200 bg-[#FAFAFA] p-4">
              <p className="text-xs font-semibold text-neutral-500 mb-1">Visitor Message</p>
              <p className="text-sm text-[#171717] whitespace-pre-line leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#171717] mb-1">
                    Lead Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as InquiryStatus)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#171717] mb-1">
                    Follow-up Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={editFollowUp}
                      onChange={(e) => setEditFollowUp(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm font-mono border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  maxLength={5000}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Call summary, quote sent, next steps..."
                  className="w-full px-3 py-2 text-sm border border-neutral-300 bg-white focus:outline-none focus:border-[#780033]"
                />
              </div>

              {feedback && (
                <p className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2">
                  {feedback}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#780033] text-white hover:bg-[#5B0027] disabled:opacity-60 cursor-pointer"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Save Update
                  </button>
                  <a
                    href={`https://wa.me/${selectedInquiry.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedInquiry.fullName}, thank you for contacting Digital Madhesh regarding ${selectedInquiry.interestedService} (Ref: ${selectedInquiry.referenceCode}).`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-neutral-300 text-[#171717] hover:border-[#780033]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#780033]" />
                    WhatsApp
                  </a>
                </div>

                <button
                  type="button"
                  disabled={deletingId === selectedInquiry.id}
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs text-red-700 border border-red-200 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>

            {selectedInquiry.history && selectedInquiry.history.length > 0 && (
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 mb-2">Inquiry History</p>
                <ul className="space-y-1.5 text-xs text-neutral-600 font-mono">
                  {selectedInquiry.history.map((entry, idx) => (
                    <li key={idx}>{entry}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
