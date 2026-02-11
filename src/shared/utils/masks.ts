export function maskPhone(value: string): string {
  if (!value) return '';

  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 2) return `(${cleaned}`;

  if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }

  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, '');
}

export function maskCPF(value: string): string {
  if (!value) return '';

  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 3) return cleaned;

  if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  }

  if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  }

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
}

export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, '');
}

export function maskPlate(value: string): string {
  if (!value) return '';

  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (cleaned.length <= 3) return cleaned;

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}`;
}

export function unmaskPlate(value: string): string {
  return value.replace(/[^A-Z0-9]/g, '').toUpperCase();
}
