import { describe, it, expect } from 'vitest'
import {
  maskPhone,
  unmaskPhone,
  maskCPF,
  unmaskCPF,
  maskPlate,
  unmaskPlate,
} from './masks'

describe('Masks', () => {
  describe('Phone mask', () => {
    it('should mask phone correctly', () => {
      expect(maskPhone('11987654321')).toBe('(11) 98765-4321')
      expect(maskPhone('1133334444')).toBe('(11) 3333-4444')
    })

    it('should mask phone partial', () => {
      expect(maskPhone('11')).toBe('(11')
      expect(maskPhone('119')).toBe('(11) 9')
      expect(maskPhone('11987')).toBe('(11) 987')
    })

    it('should unmask phone', () => {
      expect(unmaskPhone('(11) 98765-4321')).toBe('11987654321')
      expect(unmaskPhone('(21) 3333-4444')).toBe('2133334444')
    })

    it('should return empty for empty input', () => {
      expect(maskPhone('')).toBe('')
      expect(unmaskPhone('')).toBe('')
    })
  })

  describe('CPF mask', () => {
    it('should mask CPF correctly', () => {
      expect(maskCPF('12345678909')).toBe('123.456.789-09')
      expect(maskCPF('11144477735')).toBe('111.444.777-35')
    })

    it('should mask CPF partial', () => {
      expect(maskCPF('123')).toBe('123')
      expect(maskCPF('1234')).toBe('123.4')
      expect(maskCPF('123456')).toBe('123.456')
      expect(maskCPF('1234567')).toBe('123.456.7')
    })

    it('should unmask CPF', () => {
      expect(unmaskCPF('123.456.789-09')).toBe('12345678909')
      expect(unmaskCPF('111.444.777-35')).toBe('11144477735')
    })

    it('should return empty for empty input', () => {
      expect(maskCPF('')).toBe('')
      expect(unmaskCPF('')).toBe('')
    })
  })

  describe('Plate mask', () => {
    it('should mask plate correctly', () => {
      expect(maskPlate('abc1234')).toBe('ABC-1234')
      expect(maskPlate('xyz9999')).toBe('XYZ-9999')
    })

    it('should uppercase', () => {
      expect(maskPlate('abc1234')).toBe('ABC-1234')
      expect(maskPlate('AbC1234')).toBe('ABC-1234')
    })

    it('should mask plate partial', () => {
      expect(maskPlate('a')).toBe('A')
      expect(maskPlate('ab')).toBe('AB')
      expect(maskPlate('abc')).toBe('ABC')
      expect(maskPlate('abc1')).toBe('ABC-1')
    })

    it('should unmask plate', () => {
      expect(unmaskPlate('ABC-1234')).toBe('ABC1234')
      expect(unmaskPlate('XYZ-9999')).toBe('XYZ9999')
    })

    it('should remove special char', () => {
      expect(unmaskPlate('A-B-C-1-2-3-4')).toBe('ABC1234')
    })

    it('should return empty for empty input', () => {
      expect(maskPlate('')).toBe('')
      expect(unmaskPlate('')).toBe('')
    })
  })
})
