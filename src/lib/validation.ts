export const EGYPTIAN_PHONE_REGEX = /^(\+?20|0)(10|11|12|15)\d{8}$/;

export function validateEgyptianPhone(value: string): boolean {
  const cleaned = value.replace(/\s|-/g, '');
  return EGYPTIAN_PHONE_REGEX.test(cleaned);
}

export function normalizeEgyptianPhone(value: string): string {
  const cleaned = value.replace(/\s|-/g, '');
  if (cleaned.startsWith('+20')) {
    return cleaned;
  }
  if (cleaned.startsWith('20')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('0')) {
    return `+2${cleaned}`;
  }
  return cleaned;
}

export function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function detectContactType(value: string): 'email' | 'phone' | 'unknown' {
  const trimmed = value.trim();
  if (validateEmail(trimmed)) return 'email';
  if (validateEgyptianPhone(trimmed)) return 'phone';
  return 'unknown';
}

export function validateContact(value: string): {
  valid: boolean;
  type: 'email' | 'phone' | 'unknown';
  normalized: string;
} {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, type: 'unknown', normalized: '' };

  if (validateEmail(trimmed)) {
    return { valid: true, type: 'email', normalized: trimmed.toLowerCase() };
  }

  if (validateEgyptianPhone(trimmed)) {
    return { valid: true, type: 'phone', normalized: normalizeEgyptianPhone(trimmed) };
  }

  return { valid: false, type: 'unknown', normalized: trimmed };
}