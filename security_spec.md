# Digital Madhesh — Firestore Security Specification (Phase 0 TDD)

## 1. Data Invariants

1. **Inquiry Privacy**: Visitors may submit new inquiries (`status == 'New'`, server-stamped `createdAt == request.time` and `updatedAt == request.time`), but public visitors and non-admin authenticated users can NEVER `get`, `list`, `update`, or `delete` any inquiry.
2. **Draft Isolation (Blogs & Portfolio)**: Public visitors may only `get` or `list` documents in `/blogs` and `/projects` where `resource.data.status == 'published'`. Unpublished drafts are accessible only to verified administrators.
3. **Service & Settings Integrity**: Only verified administrators can create, update, or delete `/services`, `/site_settings`, `/blogs`, `/projects`, or `/admins`.
4. **Verified Email Admin Gate**: Admin privileges require `request.auth != null && request.auth.token.email_verified == true` AND either the primary verified admin email (`marketing.digitalmadhesh@gmail.com`) or a document in `/admins/{uid}`.
5. **Immutable Audit Fields**: `createdAt` and `referenceCode` on inquiries, and `createdAt` on blogs and projects, cannot be altered after creation.
6. **Strict Schema & Bounds**: Every write validates required/allowed keys (`hasAll` + `hasOnly`), string `.size()` limits, bounded arrays, and valid document IDs (`^[a-zA-Z0-9_\-]+$`).

## 2. Adversarial "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)

1. **Unauthenticated Inquiry Read**: `getDoc(doc(db, 'inquiries', 'inq-1'))` or `getDocs(collection(db, 'inquiries'))` as anonymous user -> DENIED.
2. **Non-Admin Inquiry List**: Authenticated non-admin user calls `getDocs(collection(db, 'inquiries'))` -> DENIED.
3. **Inquiry Status Spoofing on Create**: Visitor submits inquiry with `status: 'Converted'` -> DENIED (`status == 'New'` required).
4. **Inquiry Timestamp Forgery**: Visitor submits inquiry with backdated client `createdAt` instead of `serverTimestamp()` -> DENIED (`createdAt == request.time`).
5. **Inquiry Shadow Field Injection**: Visitor submits inquiry with extra field `isAdminApproved: true` -> DENIED (`keys().hasOnly(...)`).
6. **Oversized Message / ID Poisoning**: Visitor writes `/inquiries/<200-char-id>` or 10,000-character message -> DENIED (`isValidId` + `.size()` limit).
7. **Unauthenticated Draft Blog Read**: Visitor calls `getDoc(doc(db, 'blogs', 'draft-post'))` where `status == 'draft'` -> DENIED.
8. **Client Unfiltered Blog List Scraping**: Visitor queries `collection(db, 'blogs')` without `where('status', '==', 'published')` -> DENIED (rule evaluates `resource.data.status == 'published'`).
9. **Privilege Escalation via `/admins`**: Non-admin authenticated user attempts `setDoc(doc(db, 'admins', auth.uid), { role: 'super_admin' })` -> DENIED.
10. **Unverified Admin Email Spoof**: User with `email_verified: false` attempts admin write -> DENIED (`email_verified == true` mandated).
11. **Project Metrics / Settings Tampering**: Non-admin user attempts `updateDoc(doc(db, 'site_settings', 'main'), { heroHeadline: 'Hacked' })` -> DENIED.
12. **Immutable Field Mutation on Inquiry Update**: Admin update attempts to alter `createdAt` or `referenceCode` -> DENIED (`affectedKeys().hasOnly(...)` + equality invariant).
