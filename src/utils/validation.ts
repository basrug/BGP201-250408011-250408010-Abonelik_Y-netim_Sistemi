export interface SubscriptionFormValues {
  name: string;
  amount: string;
  paymentDay: string;
  currency?: string;
  billingCycle?: string;
  category?: string;
}

/**
 * Validates the subscription creation form inputs.
 *
 * Rules:
 * - Service name cannot be empty and must be at least 2 characters.
 * - Amount cannot be empty, must be a valid number, and must be greater than 0.
 * - Payment day must be an integer between 1 and 31.
 *
 * @param values Current form field values
 * @returns An object containing error messages keyed by field name (Record<string, string>)
 */
export const validateSubscriptionForm = (
  values: SubscriptionFormValues
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // 1. Service Name Validation
  const trimmedName = values.name ? values.name.trim() : '';
  if (!trimmedName) {
    errors.name = 'Servis adı boş bırakılamaz.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Servis adı en az 2 karakter olmalıdır.';
  }

  // 2. Amount Validation
  const trimmedAmount = values.amount ? values.amount.trim() : '';
  if (!trimmedAmount) {
    errors.amount = 'Tutar boş bırakılamaz.';
  } else {
    // Support both comma and dot as decimal separators
    const normalizedAmount = trimmedAmount.replace(',', '.');
    const parsedAmount = Number(normalizedAmount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      errors.amount = 'Tutar 0\'dan büyük geçerli bir sayı olmalıdır.';
    }
  }

  // 3. Payment Day Validation (1-31 integer)
  const trimmedDay = values.paymentDay ? values.paymentDay.trim() : '';
  if (!trimmedDay) {
    errors.paymentDay = 'Ödeme günü boş bırakılamaz.';
  } else {
    const parsedDay = Number(trimmedDay);
    if (!Number.isInteger(parsedDay) || parsedDay < 1 || parsedDay > 31) {
      errors.paymentDay = 'Ödeme günü 1 ile 31 arasında tam sayı olmalıdır.';
    }
  }

  return errors;
};
