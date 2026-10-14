// Parâmetros ajustáveis da abertura + interação do logo.
// Tudo que rege timing, distância e intensidade fica centralizado aqui.

// A marca completa (símbolo + tipografia) é uma única peça fragmentável.
// Desktop usa o lockup horizontal (logo.svg); mobile usa o lockup empilhado
// (logo-mob.svg) — cada um com sua própria grade, proporcional à sua forma.
export const ARTWORK = {
  desktop: { viewBox: '0 0 1626 571.64', aspect: 1626 / 571.64, grid: { cols: 5, rows: 2 } }, // 10 células x 2 = 20 fragmentos
  mobile: { viewBox: '0 0 875.59 1549.98', aspect: 875.59 / 1549.98, grid: { cols: 2, rows: 4 } }, // 8 células x 2 = 16 fragmentos
};

// Pulso espontâneo: a cada tanto, mesmo sem interação, a marca se rompe e
// remonta sozinha — reaproveita a mesma ruptura/reconstrução do hover.
export const IDLE = {
  minDelay: 9,          // segundos até o próximo pulso espontâneo (mínimo)
  maxDelay: 17,          // segundos até o próximo pulso espontâneo (máximo)
  holdDuration: 0.4,    // segundos que os fragmentos ficam rompidos antes de remontar sozinhos
};

export const INTRO = {
  fullDuration: 2.7,          // duração alvo da abertura completa (s)
  shortDuration: 0.9,         // duração da reentrada curta (s)
  ambientFragmentCount: 7,    // fragmentos atmosféricos nas bordas
  ambientMinDelay: 0,
  ambientMaxDelay: 0.9,
  buildStagger: 0.032,        // intervalo entre a chegada de cada peça, na ordem da varredura
  buildDuration: 0.9,         // duração do movimento de cada peça até o encaixe
  buildEase: 'power3.out',
  entryDistance: 620,         // px que cada fragmento percorre até o encaixe (desktop)
  entryDistanceMobile: 350,
  entryAngleJitter: 100,      // graus de dispersão angular aleatória na trajetória de chegada
  settlePulseDuration: 0.35,
  impactPunchScale: 1.045,    // "soco" de escala no conjunto inteiro no instante do encaixe final
  impactPunchDuration: 0.16,
  settleWobbleScale: 1.05,    // pequeno wobble elástico por fragmento logo após encaixar
  settleWobbleDuration: 0.3,
};

export const INTERACTION = {
  influenceRadius: 425,        // px além do logo onde a "tensão estrutural" já reage
  coreExtra: 18,                // margem extra (px) além da caixa do logo p/ considerar "dentro"
  approachIntensity: 0.28,     // fração da força aplicada antes do cursor "entrar" no logo (tensão estrutural)
  tiltMax: 10,                  // graus de inclinação máxima na zona de aproximação (antes da ruptura)
  ruptureDuration: 0.38,       // 300-450ms
  ruptureStagger: 0.018,
  ruptureDistance: 138,        // px de afastamento no rompimento inicial
  repelStrength: 0.9,          // força de repulsão base
  repelBaseline: 0.4,          // fração de força aplicada mesmo com o cursor parado dentro do raio
  repelSpeedBoost: 1.6,        // quanto a velocidade normalizada amplifica a repulsão
  speedNormDivisor: 900,       // px/s usados para normalizar a velocidade do cursor em 0..1
  velocitySmoothing: 0.35,     // peso da amostra mais recente na média móvel de velocidade
  velocityDecay: 0.85,         // decaimento por frame da velocidade quando o cursor para
  vortexStrength: 0.22,        // componente tangencial (sensação de vórtice)
  vortexRotationFactor: 0.6,   // quanto o componente de vórtice influencia a rotação do fragmento
  tiltRotationFactor: 6,       // quanto a posição do fragmento inclina sua rotação na aproximação
  scaleInfluence: 0.12,        // variação máxima de escala por proximidade do cursor
  maxRotation: 22,             // graus, teto de rotação por fragmento dentro do logo
  maxTranslate: 188,           // px, teto de deslocamento por fragmento
  reconstructDuration: 0.62,
  reconstructElasticPeriod: 0.55, // menor = encaixe mais firme/com mais overshoot
  reconstructStagger: 0.012,
};

export const RESPONSIVE = {
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  tabletScale: 0.6,            // reduz distâncias/quantidade em tablets
  touchDuration: 0.6,          // duração total do toque no mobile
};

export const WORD_ZONES = ['DESIGN', 'CODE'];
