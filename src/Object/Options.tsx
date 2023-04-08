export const optJenis = [
  { value: "OPC", label: "OPC" },
  { value: "PPC", label: "PPC" },
];

export const optGrade = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "R", label: "R" },
  { value: "J", label: "J" },
];

export const optTebal = [
  { value: 0.00155, label: "1.55" , pcs: 650 },
  { value: 0.0018, label: "1.8" , pcs: 560 },
  { value: 0.0025, label: "2.5" , pcs: 400 },
  { value: 0.0027, label: "2.7" , pcs: 380 },
  { value: 0.0034, label: "3.4" , pcs: 300 },
];

export const optUkuran = [
  { value: 0.61 * 1.22, label: "2x4" },
  { value: 1.22 * 1.22, label: "4x4" },
  { value: 1.22 * 2.44, label: "4x8" },
];

export const optGrup = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];

export const optKrat = [
  { ukuran: "2x4", tebal: "1.55", pcs: 650},
  { ukuran: "2x4", label: "1.8" , pcs: 560 },
  { ukuran: "2x4", label: "2.5" , pcs: 400 },
  { ukuran: "2x4", label: "2.7" , pcs: 380 },
  { ukuran: "2x4", label: "3.4" , pcs: 300 },
  
  { ukuran: "4x4", tebal: "1.55", pcs: 650},
  { ukuran: "4x4", label: "1.8" , pcs: 560 },
  { ukuran: "4x4", label: "2.5" , pcs: 400 },
  { ukuran: "4x4", label: "2.7" , pcs: 380 },
  { ukuran: "4x4", label: "3.4" , pcs: 300 },

  { ukuran: "4x8", label: "2.7" , pcs: 250 },
]