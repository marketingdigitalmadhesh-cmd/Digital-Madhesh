import React, { useEffect, useState } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useSiteData } from '../context/SiteDataContext';

interface ContactFormProps {
  defaultService?: string;
}

const BUDGET_OPTIONS = [
  'Under NPR 15,000',
  'NPR 15,000 – 35,000',
  'NPR 35,000 – 75,000',
  'NPR 75,000 – 1,50,000',
  'NPR 1,50,000+',
  'Need Quote First',
];

function generateReferenceCode(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DM-${year}-${suffix}`;
}

export function ContactForm({ defaultService = '' }: ContactFormProps) {
  const { services, settings } = useSiteData();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [interestedService, setInterestedService] = useState(
    defaultService || 'Facebook and Instagram Ads',
  );
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mountTime] = useState(() => Date.now());

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (defaultService) {
      setInterestedService(defaultService);
    }
  }, [defaultService]);

  const validate = (): string | null => {
    if (honeypot.trim().length > 0) {
      return 'Submission could not be verified.';
    }
    if (Date.now() - mountTime < 1500) {
      return 'Please take a moment to review your details before submitting.';
    }
    const cleanName = fullName.trim();
    if (cleanName.length < 2 || cleanName.length > 120) {
      return 'Please enter your full name (2 to 120 characters).';
    }
    const cleanPhone = phoneNumber.trim();
    const digitsOnly = cleanPhone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 7 || cleanPhone.length > 30) {
      return 'Please enter a valid phone or WhatsApp number.';
    }
    const cleanEmail = email.trim();
    if (cleanEmail && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 160)) {
      return 'Please enter a valid email address or leave it blank.';
    }
    if (businessName.trim().length > 160) {
      return 'Business name must be 160 characters or fewer.';
    }
    if (interestedService.trim().length < 2) {
      return 'Please select an interested service.';
    }
    const cleanMessage = message.trim();
    if (cleanMessage.length < 5 || cleanMessage.length > 3000) {
      return 'Please share a brief description of your requirement (5 to 3000 characters).';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    const referenceCode = generateReferenceCode();
    const inquiryId = `${referenceCode}_${Date.now()}`;
    const docPath = `inquiries/${inquiryId}`;

    try {
      const payload: Record<string, unknown> = {
        referenceCode,
        fullName: fullName.trim().slice(0, 120),
        phoneNumber: phoneNumber.trim().slice(0, 30),
        interestedService: interestedService.trim().slice(0, 160),
        message: message.trim().slice(0, 3000),
        status: 'New',
        notes: '',
        history: [`[${new Date().toISOString().slice(0, 10)}] Inquiry received via website.`],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (email.trim()) {
        payload.email = email.trim().slice(0, 160);
      }
      if (businessName.trim()) {
        payload.businessName = businessName.trim().slice(0, 160);
      }
      if (budget.trim()) {
        payload.budget = budget.trim().slice(0, 80);
      }

      await setDoc(doc(db, 'inquiries', inquiryId), payload);
      setSubmittedRef(referenceCode);
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setBusinessName('');
      setBudget('');
      setMessage('');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.CREATE, docPath);
      } catch (wrappedErr) {
        setErrorMsg(
          wrappedErr instanceof Error
            ? 'Unable to save your inquiry right now. Please try again or reach us directly on WhatsApp.'
            : 'Unable to submit inquiry.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDigits = settings.whatsappNumber.replace(/[^0-9]/g, '') || '9779865529001';

  if (submittedRef) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-[#FAF8F6] p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#780033] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-[#780033] mb-1">Inquiry Received</p>
            <h3 className="text-xl font-bold text-[#171717]">
              Thank you. Your consultation request is logged.
            </h3>
          </div>
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Our team in Harion, Sarlahi has received your inquiry and will contact you on your
          provided phone number during business hours. Keep your reference code below for quick
          follow-up:
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 flex items-center justify-between gap-4">
          <span className="text-xs text-neutral-500">Reference ID</span>
          <span className="font-mono tabular-nums text-sm font-bold text-[#171717]">
            {submittedRef}
          </span>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
              `Hello Digital Madhesh, I just submitted an inquiry (Reference: ${submittedRef}).`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#DDB34D]" />
            <span>Follow up on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmittedRef(null)}
            className="px-5 py-3 rounded-xl text-sm font-medium border border-neutral-300 text-[#171717] hover:border-[#171717] transition-colors cursor-pointer"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url_check">Leave empty</label>
        <input
          id="website_url_check"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-[#171717] mb-1.5">
            Full Name <span className="text-[#780033]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            maxLength={120}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g., Ramesh Kumar Sah"
            className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold text-[#171717] mb-1.5"
          >
            Phone / WhatsApp Number <span className="text-[#780033]">*</span>
          </label>
          <input
            id="phoneNumber"
            type="tel"
            required
            maxLength={30}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., +977 98XXXXXXXX"
            className="w-full px-4 py-3 text-sm font-mono tabular-nums rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#171717] mb-1.5">
            Email Address <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            id="email"
            type="email"
            maxLength={160}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@organization.com"
            className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          />
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-semibold text-[#171717] mb-1.5"
          >
            Business or Organization{' '}
            <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            id="businessName"
            type="text"
            maxLength={160}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Company, school, clinic, or store"
            className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="interestedService"
            className="block text-sm font-semibold text-[#171717] mb-1.5"
          >
            Interested Service <span className="text-[#780033]">*</span>
          </label>
          <select
            id="interestedService"
            required
            value={interestedService}
            onChange={(e) => setInterestedService(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          >
            <optgroup label="General Categories">
              <option value="Digital Marketing Package">Digital Marketing Package</option>
              <option value="Creative & Video Production">Creative &amp; Video Production</option>
              <option value="Website & Conversion Tracking">Website &amp; Conversion Tracking</option>
              <option value="Commercial Printing Order">Commercial Printing Order</option>
            </optgroup>
            <optgroup label="Specific Services">
              {services.map((svc) => (
                <option key={svc.slug} value={svc.title}>
                  {svc.title} ({svc.category})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-[#171717] mb-1.5">
            Estimated Budget <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
          >
            <option value="">Select budget range (optional)</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#171717] mb-1.5">
          Project Details &amp; Location <span className="text-[#780033]">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          maxLength={3000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your business goals, target district(s), or printing quantities and sizes..."
          className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 bg-white text-[#171717] focus:outline-none focus:border-[#780033]"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#780033] text-white hover:bg-[#580025] shadow-[0_12px_26px_-10px_rgba(120,0,51,0.5)] disabled:opacity-60 transition-all cursor-pointer"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitting ? 'Submitting Inquiry...' : 'Submit Consultation Request'}
        </button>
        <p className="text-xs text-neutral-500">
          Your contact details stay private and are used only to respond to your request.
        </p>
      </div>
    </form>
  );
}
