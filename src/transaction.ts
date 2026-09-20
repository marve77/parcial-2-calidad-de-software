export type ClientType = 'NUEVO' | 'FRECUENTE';
export type IPLocation = 'NACIONAL' | 'INTERNACIONAL';

export interface RiskEvaluationResult {
  requiresReview: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function evaluateRisk(monto: number, tipoCliente: ClientType, ubicacionIP: IPLocation): RiskEvaluationResult {
  let riskScore = 0;

  if (monto > 1000) {
    riskScore += 2;
  }
  if (tipoCliente === 'NUEVO') {
    riskScore += 1;
  }
  if (ubicacionIP === 'INTERNACIONAL') {
    riskScore += 1;
  }
  
  if (riskScore >= 2) {
    return {
      requiresReview: true,
      riskLevel: 'HIGH'
    };
  }

  return {
    requiresReview: false,
    riskLevel: 'LOW'
  };
}
