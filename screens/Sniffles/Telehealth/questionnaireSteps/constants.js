const RISK_FACTORS = [
  { displayName: 'Asthma/breathing problems', value: 'asthma_breathing_problems' },
  { displayName: 'Arthritis', value: 'arthritis' },
  { displayName: 'Bleeding/clotting disorder', value: 'bleeding_clotting_disorder' },
  { displayName: 'Blood pressure disorder', value: 'blood_pressure_disorder' },
  { displayName: 'Blood transfusion', value: 'blood_transfusion' },
  { displayName: 'Bowel/stomach problems', value: 'bowel_stomach_problems' },
  { displayName: 'Cancer', value: 'cancer' },
  { displayName: 'Cholesterol disorder', value: 'cholesterol_disorder' },
  { displayName: 'Diabetes', value: 'diabetes' },
  { displayName: 'Eye disorder (e.g. glaucoma, cataract)', value: 'eye_disorder' },
  { displayName: 'Gynecological issues', value: 'gynecological_issues' },
  { displayName: 'Heart disease/disorder', value: 'heart_disease_disorder' },
  { displayName: 'Lung disorder', value: 'lung_disorder' },
  { displayName: 'Liver disease', value: 'liver_disease' },
  {
    displayName: 'Neurological disorder/chronic headaches',
    value: 'neurological_disorder_chronic_headaches',
  },
  { displayName: 'Psychiatric disorder/illness', value: 'psychiatric_disorder_illness' },
  { displayName: 'Pulmonary embolus/DVT', value: 'pulmonary_embolus_dvt' },
  { displayName: 'Stroke', value: 'stroke' },
  { displayName: 'Seizure or epilepsy', value: 'seizure_or_epilepsy' },
  { displayName: 'Thyroid disorder', value: 'thyroid_disorder' },
  { displayName: 'Urinary/kidney disorder', value: 'urinary_kidney_disorder' },
  { displayName: 'Other', value: 'other' },
  { displayName: 'None of the above', value: 'none_of_the_above' },
];

const DIAGNOSIS = [
  { displayName: 'Influenza', value: 'influenza' },
  { displayName: 'Strep throat', value: 'strep_throat' },
  { displayName: 'RSV', value: 'rsv' },
  { displayName: 'COVID-19', value: 'covid_19' },
  { displayName: 'Not sure', value: 'unsure' },
  { displayName: 'None of the above', value: 'none_of_the_above' },
];

const HEALTH_PROBLEMS = [
  {
    displayName: 'Head, eyes, ears, nose, or throat',
    value: 'head_eyes_ears_nose_or_throat',
  },
  { displayName: 'Cardiovascular', value: 'cardiovascular' },
  { displayName: 'Respiratory', value: 'respiratory' },
  { displayName: 'Gastrointestinal', value: 'gastrointestinal' },
  { displayName: 'Neurological', value: 'neurological' },
  { displayName: 'Musculoskeletal', value: 'musculoskeletal' },
  { displayName: 'Urinary/Genital', value: 'urinary_genital' },
  { displayName: 'Skin', value: 'skin' },
  { displayName: 'Psychiatric', value: 'psychiatric' },
  { displayName: 'Blood/Lymphatic', value: 'blood_lymphatic' },
  { displayName: 'Endocrine', value: 'endocrine' },
  { displayName: 'None of the above', value: 'none_of_the_above' },
];

export { RISK_FACTORS, DIAGNOSIS, HEALTH_PROBLEMS };
