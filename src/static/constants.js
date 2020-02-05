const initialOptions = [
  {
    value: 'HLAA_HUMAN',
    label: 'HLAA_HUMAN',
    description:
      'HLA class I histocompatibility antigen, A alpha chain (Human leukocyte antigen A) (HLA-A)',
    disulfideBonds: ['125 188', '227 283'],
    glycoslation: ['110'],
    length: 365
  },
  {
    value: 'ELNE_HUMAN',
    label: 'ELNE_HUMAN',
    description:
      'Neutrophil elastase (EC 3.4.21.37) (Bone marrow serine protease) (Elastase-2) (Human leukocyte elastase) (HLE) (Medullasin) (PMN elastase)',
    disulfideBonds: ['55 71', '151 208', '181 187', '198 223'],
    glycoslation: ['88', '124', '173'],
    length: 267
  },
  {
    value: 'GRAB_HUMAN',
    label: 'GRAB_HUMAN',
    description:
      'Granzyme B (EC 3.4.21.79) (C11) (CTLA-1) (Cathepsin G-like 1) (CTSGL1) (Cytotoxic T-lymphocyte proteinase 2) (Lymphocyte protease) (Fragmentin-2) (Granzyme-2) (Human lymphocyte protein) (HLP) (SECT) (T-cell serine protease 1-3E)',
    disulfideBonds: ['49 65', '142 209', '173 188'],
    glycoslation: ['71', '104'],
    length: 247
  }
];

const COLOR_PALLETE = [
  '#c76861',
  '#e6c11e',
  '#90de1b',
  '#1bde97',
  '#1bc7de',
  '#1b66de',
  '#421bde',
  '#901bde',
  '#d618d3',
  '#d6186a'
];

export default { initialOptions, COLOR_PALLETE };
