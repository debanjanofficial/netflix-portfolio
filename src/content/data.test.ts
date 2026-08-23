import {
  bannerSummary,
  educationEntries,
  experiences,
  projectEntries,
  publications,
  researchInterests,
  skillGroups,
  personalDetails,
} from './data';

const supportedLanguages = ['en', 'de', 'no', 'fi', 'sv', 'da', 'it', 'nl', 'fr', 'es', 'pl', 'cs', 'pt'] as const;

test('uses the current LinkedIn profile', () => {
  expect(personalDetails.linkedinUrl).toBe('https://www.linkedin.com/in/debanjan-chakraborty-dc/');
});

test.each(supportedLanguages)('provides complete résumé content in %s', (language) => {
  expect(bannerSummary[language]).toHaveLength(2);
  expect(researchInterests[language]?.length).toBeGreaterThan(0);

  skillGroups.forEach((group) => {
    expect(group.label[language]).toBeTruthy();
    expect(group.items[language]?.length).toBeGreaterThan(0);
  });

  experiences.forEach((entry) => {
    expect(entry.content[language]?.role).toBeTruthy();
    expect(entry.content[language]?.bullets.length).toBeGreaterThan(0);
  });

  educationEntries.forEach((entry) => {
    expect(entry.content[language]?.degree).toBeTruthy();
    expect(entry.content[language]?.thesisTitle).toBeTruthy();
    expect(entry.content[language]?.bullets.length).toBeGreaterThan(0);
  });

  projectEntries.forEach((entry) => {
    expect(entry.content[language]?.title).toBeTruthy();
    expect(entry.content[language]?.bullets.length).toBeGreaterThan(0);
  });

  publications.forEach((entry) => {
    expect(entry.content[language]?.status).toBeTruthy();
  });
});
