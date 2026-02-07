/**
 * Centralized contact configuration for Clear Choice Solutions.
 * Update these values to change contact information across the entire site.
 */

export const CONTACT_CONFIG = {
  phone: {
    display: '703 864 3078',
    tel: '+17038643078', // tel:-friendly E.164 format
  },
  email: {
    address: 'solutionsclearchoice@gmail.com',
  },
} as const;

/**
 * Helper to generate a tel: URL
 */
export function getTelHref(phone: string = CONTACT_CONFIG.phone.tel): string {
  return `tel:${phone}`;
}

/**
 * Helper to generate a mailto: URL
 */
export function getMailtoHref(email: string = CONTACT_CONFIG.email.address): string {
  return `mailto:${email}`;
}
