# Specification

## Summary
**Goal:** Update Clear Choice Solutions’ centralized contact details so the correct phone number and email display consistently across the marketing site.

**Planned changes:**
- Update `frontend/src/config/contact.ts` to set `CONTACT_CONFIG.phone.display` to `703 864 3078` and `CONTACT_CONFIG.phone.tel` to `+17038643078`.
- Update `frontend/src/config/contact.ts` to set `CONTACT_CONFIG.email.address` to `solutionsclearchoice@gmail.com`.
- Verify all UI locations that render `CONTACT_CONFIG` (header, footer, and Service Areas contact block) display the updated values with working `tel:` and `mailto:` links.

**User-visible outcome:** Visitors see the updated phone number and email everywhere the site shows contact info, and can click to call or email using the correct links.
