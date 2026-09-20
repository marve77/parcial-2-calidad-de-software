import { evaluateRisk } from '../src/transaction';

describe('Módulo de Evaluación de Riesgo de Transacciones', () => {
  // Caso 1: Monto Alto (> 1000), Cliente Nuevo, IP Nacional
  it('Debe clasificar como alto riesgo y requerir revisión manual (Monto Alto, Nuevo, Nacional)', () => {
    const result = evaluateRisk(1500, 'NUEVO', 'NACIONAL');
    expect(result).toEqual({ requiresReview: true, riskLevel: 'HIGH' });
  });

  // Caso 2: Monto Alto (> 1000), Cliente Frecuente, IP Internacional
  it('Debe clasificar como alto riesgo y requerir revisión manual (Monto Alto, Frecuente, Internacional)', () => {
    const result = evaluateRisk(2500, 'FRECUENTE', 'INTERNACIONAL');
    expect(result).toEqual({ requiresReview: true, riskLevel: 'HIGH' });
  });

  // Caso 3: Monto Bajo (<= 1000), Cliente Nuevo, IP Internacional
  it('Debe clasificar como alto riesgo y requerir revisión manual (Monto Bajo, Nuevo, Internacional)', () => {
    const result = evaluateRisk(500, 'NUEVO', 'INTERNACIONAL');
    expect(result).toEqual({ requiresReview: true, riskLevel: 'HIGH' });
  });

  // Caso 4: Monto Bajo (<= 1000), Cliente Frecuente, IP Nacional
  it('Debe clasificar como bajo riesgo y no requerir revisión manual (Monto Bajo, Frecuente, Nacional)', () => {
    const result = evaluateRisk(800, 'FRECUENTE', 'NACIONAL');
    expect(result).toEqual({ requiresReview: false, riskLevel: 'LOW' });
  });
});
