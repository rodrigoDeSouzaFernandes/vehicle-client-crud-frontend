import { describe, it, expect } from 'vitest';

import { validateCPF } from './validateCpf';

const valids = ['589.017.390-11', '35413515006', '384.076.030-58', '90053205081'];

const invalids = [
  '12345678909',
  '1111111111',
  '654546654456',
  'texto-cpf',
  '999',
  '911.532.050-81',
];

describe('Validate CPF function', () => {
  it('should return true for valids CPFs', () => {
    valids.forEach((cpf) => {
      expect(validateCPF(cpf)).toBe(true);
    });
  });

  it('should return false for invalids CPFs', () => {
    invalids.forEach((cpf) => {
      expect(validateCPF(cpf)).toBe(false);
    });
  });
});
