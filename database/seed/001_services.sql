INSERT INTO services (id, slug, name, description, category, version)
VALUES
  (gen_random_uuid(), 'income_certificate', 'Income Certificate', 'Certificate confirming income-related eligibility for local service access.', 'citizen-service', 'v1'),
  (gen_random_uuid(), 'caste_certificate', 'Caste Certificate', 'Certificate evidencing caste status for eligibility and support programs.', 'citizen-service', 'v1'),
  (gen_random_uuid(), 'residence_certificate', 'Residence Certificate', 'Certificate confirming residence and domicile details.', 'citizen-service', 'v1'),
  (gen_random_uuid(), 'birth_certificate', 'Birth Certificate', 'Certificate certifying birth details for legal identity and civil records.', 'citizen-service', 'v1');
