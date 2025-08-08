export function validateEmail(email: string) {
  // validate email, works with backend
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function required(value?: string | null) {
  return value && value.trim().length > 0;
}
