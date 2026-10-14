// Divide a caixa da arte (símbolo + tipografia, juntos) em uma grade de
// triângulos via clip-path. Em repouso (translate 0, rotate 0, scale 1) os
// fragmentos se encaixam sem emenda porque cada um mostra a mesma imagem,
// apenas recortada em regiões complementares — a geometria original do SVG
// nunca é alterada.

// Cada polígono é levemente expandido a partir do próprio centróide antes de
// virar clip-path. Sem isso, o antialiasing independente de cada clip-path
// deixa uma linha de 1px entre fragmentos vizinhos, mesmo com a mesma imagem
// por trás — a expansão faz as bordas se sobreporem por uma fração de pixel
// (imperceptível, já que o conteúdo é idêntico) e some com a linha.
const SEAM_OVERLAP = 1.008;

export function buildFragmentGrid(cols, rows) {
  const cw = 100 / cols;
  const rh = 100 / rows;
  const fragments = [];
  let id = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x0 = col * cw;
      const x1 = (col + 1) * cw;
      const y0 = row * rh;
      const y1 = (row + 1) * rh;
      const diagonal = (col + row) % 2 === 0 ? 'tl-br' : 'tr-bl';

      const pair =
        diagonal === 'tl-br'
          ? [
              [[x0, y0], [x1, y0], [x1, y1]],
              [[x0, y0], [x0, y1], [x1, y1]],
            ]
          : [
              [[x0, y0], [x1, y0], [x0, y1]],
              [[x1, y0], [x1, y1], [x0, y1]],
            ];

      pair.forEach((points) => {
        const cx = points.reduce((sum, p) => sum + p[0], 0) / points.length;
        const cy = points.reduce((sum, p) => sum + p[1], 0) / points.length;
        const dx = cx - 50;
        const dy = cy - 50;
        const dist = Math.hypot(dx, dy) || 1;
        const expanded = points.map(([x, y]) => [
          cx + (x - cx) * SEAM_OVERLAP,
          cy + (y - cy) * SEAM_OVERLAP,
        ]);

        fragments.push({
          id: id++,
          clipPath: `polygon(${expanded.map(([x, y]) => `${x}% ${y}%`).join(', ')})`,
          cx,
          cy,
          outward: { x: dx / dist, y: dy / dist },
          radial: dist / 70.7, // ~0..1, distância normalizada do centro (canto = ~70.7)
        });
      });
    }
  }

  return fragments;
}
