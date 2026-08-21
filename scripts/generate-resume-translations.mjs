import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = resolve(projectRoot, 'src/content/data.ts');
const outputPath = resolve(projectRoot, 'src/content/resumeTranslations.generated.ts');
const targets = ['no', 'fi', 'sv', 'da', 'it', 'nl', 'fr', 'es', 'pl', 'cs', 'pt'];
const delimiter = '[[[PORTFOLIO_SPLIT_9F3A]]]';

// The translation service occasionally interprets short CV phrases without
// enough context (for example, "Remote" as a television remote). Keep the
// prominent introduction and remote-work label editorially reviewed.
const editorialOverrides = {
  no: {
    banner: [
      'Master i datavitenskap og forsker innen anvendt KI, med utvikling av intelligente systemer for multivariat tidsserieanalyse, anomalideteksjon, gjenfinningsforsterket generering og datasyn.',
      'Jeg kombinerer grundig forskning innen maskinlæring med produksjonsrettet utvikling og omsetter nye ideer til skalerbare, forklarbare løsninger på reelle vitenskapelige og industrielle utfordringer.',
    ],
    remote: 'Fjernarbeid',
  },
  fi: {
    banner: [
      'Data Science -maisteri ja soveltavan tekoälyn tutkija, joka kehittää älykkäitä järjestelmiä monimuuttujaiseen aikasarja-analyysiin, poikkeamien tunnistukseen, RAG-ratkaisuihin ja konenäköön.',
      'Yhdistän perusteellisen koneoppimistutkimuksen tuotantotason ohjelmistokehitykseen ja muunnan uudet ideat skaalautuviksi, selitettäviksi ratkaisuiksi todellisiin tieteellisiin ja teollisiin haasteisiin.',
    ],
    remote: 'Etätyö',
  },
  sv: {
    banner: [
      'Masterutbildad inom datavetenskap och forskare inom tillämpad AI, med fokus på intelligenta system för multivariat tidsserieanalys, anomalidetektering, RAG och datorseende.',
      'Jag förenar gedigen forskning inom maskininlärning med produktionsnära utveckling och omsätter nya idéer i skalbara, förklarbara lösningar på verkliga vetenskapliga och industriella utmaningar.',
    ],
    remote: 'Distansarbete',
  },
  da: {
    banner: [
      'Kandidat med en master i Data Science og forsker i anvendt AI med fokus på intelligente systemer til multivariat tidsserieanalyse, anomalidetektion, RAG og computersyn.',
      'Jeg kombinerer grundig forskning i maskinlæring med produktionsorienteret udvikling og omsætter nye idéer til skalerbare, forklarlige løsninger på virkelige videnskabelige og industrielle udfordringer.',
    ],
    remote: 'Fjernarbejde',
  },
  it: {
    banner: [
      'Laureato magistrale in Data Science e ricercatore nell’intelligenza artificiale applicata, sviluppo sistemi intelligenti per l’analisi di serie temporali multivariate, il rilevamento di anomalie, la RAG e la visione artificiale.',
      'Unisco una rigorosa ricerca nel machine learning all’ingegneria orientata alla produzione, trasformando idee innovative in soluzioni scalabili e spiegabili per sfide scientifiche e industriali reali.',
    ],
    remote: 'Da remoto',
  },
  nl: {
    banner: [
      'Afgestudeerd master in Data Science en onderzoeker in toegepaste AI, gericht op intelligente systemen voor multivariate tijdreeksanalyse, anomaliedetectie, RAG en computer vision.',
      'Ik combineer grondig onderzoek naar machine learning met productiegerichte engineering en vertaal nieuwe ideeën naar schaalbare, uitlegbare oplossingen voor wetenschappelijke en industriële uitdagingen uit de praktijk.',
    ],
    remote: 'Op afstand',
  },
  fr: {
    banner: [
      'Diplômé d’un master en Data Science et chercheur en IA appliquée, je développe des systèmes intelligents pour l’analyse de séries temporelles multivariées, la détection d’anomalies, la RAG et la vision par ordinateur.',
      'J’allie une recherche rigoureuse en apprentissage automatique à une ingénierie orientée production afin de transformer des idées nouvelles en solutions évolutives et explicables pour des défis scientifiques et industriels concrets.',
    ],
    remote: 'À distance',
  },
  es: {
    banner: [
      'Graduado con un máster en Ciencia de Datos e investigador en IA aplicada, desarrollo sistemas inteligentes para el análisis de series temporales multivariantes, la detección de anomalías, RAG y visión por computador.',
      'Combino una investigación rigurosa en aprendizaje automático con ingeniería orientada a producción, transformando ideas innovadoras en soluciones escalables y explicables para retos científicos e industriales reales.',
    ],
    remote: 'En remoto',
  },
  pl: {
    banner: [
      'Absolwent studiów magisterskich z Data Science i badacz stosowanej sztucznej inteligencji, rozwijający inteligentne systemy do analizy wielowymiarowych szeregów czasowych, wykrywania anomalii, RAG i widzenia komputerowego.',
      'Łączę rzetelne badania nad uczeniem maszynowym z inżynierią produkcyjną, przekształcając nowe idee w skalowalne i wyjaśnialne rozwiązania rzeczywistych wyzwań naukowych i przemysłowych.',
    ],
    remote: 'Zdalnie',
  },
  cs: {
    banner: [
      'Absolvent magisterského studia Data Science a výzkumník aplikované umělé inteligence, který vyvíjí inteligentní systémy pro analýzu vícerozměrných časových řad, detekci anomálií, RAG a počítačové vidění.',
      'Propojuji důkladný výzkum strojového učení s produkčním vývojem a převádím nové myšlenky do škálovatelných a vysvětlitelných řešení skutečných vědeckých a průmyslových výzev.',
    ],
    remote: 'Na dálku',
  },
  pt: {
    banner: [
      'Mestre em Ciência de Dados e investigador em IA aplicada, desenvolvo sistemas inteligentes para análise de séries temporais multivariadas, deteção de anomalias, RAG e visão computacional.',
      'Combino investigação rigorosa em aprendizagem automática com engenharia orientada para produção, transformando novas ideias em soluções escaláveis e explicáveis para desafios científicos e industriais reais.',
    ],
    remote: 'Remoto',
  },
};

const sourceText = await readFile(dataPath, 'utf8');
const compiled = ts.transpileModule(sourceText, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const moduleRecord = { exports: {} };
const loadLocalModule = (id) => {
  if (id.includes('resumeTranslations.generated')) return { generatedResumeTranslations: {} };
  return {};
};
new Function('exports', 'module', 'require', compiled)(moduleRecord.exports, moduleRecord, loadLocalModule);

const {
  bannerSummary,
  researchInterests,
  skillGroups,
  experiences,
  educationEntries,
  projectEntries,
  publications,
} = moduleRecord.exports;

const source = {
  banner: bannerSummary.en,
  researchInterests: researchInterests.en,
  skillLabels: skillGroups.map((group) => group.label.en),
  spokenLanguages: skillGroups.find((group) => group.id === 'spoken-languages').items.en,
  experiences: experiences.map(({ content }) => ({
    role: content.en.role,
    location: content.en.location,
    duration: content.en.duration,
    bullets: content.en.bullets,
  })),
  education: educationEntries.map(({ content }) => ({
    degree: content.en.degree,
    location: content.en.location,
    duration: content.en.duration,
    thesisTitle: content.en.thesisTitle,
    bullets: content.en.bullets,
  })),
  projects: projectEntries.map(({ content }) => ({
    title: content.en.title,
    context: content.en.context,
    bullets: content.en.bullets,
  })),
  publicationStatuses: publications.map(({ content }) => content.en.status),
};

const collectStrings = (value, output = []) => {
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, output));
  else Object.values(value).forEach((item) => collectStrings(item, output));
  return output;
};

const rebuildWithTranslations = (value, translated, cursor) => {
  if (typeof value === 'string') return translated[cursor.index++];
  if (Array.isArray(value)) return value.map((item) => rebuildWithTranslations(item, translated, cursor));
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, rebuildWithTranslations(item, translated, cursor)]),
  );
};

const translateBatch = async (strings, target) => {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', target);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', strings.join(`\n${delimiter}\n`));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation request failed for ${target}: ${response.status}`);
  const payload = await response.json();
  const text = payload[0].map((segment) => segment[0]).join('');
  const parts = text.split(delimiter).map((part) => part.trim());
  if (parts.length !== strings.length || parts.some((part) => !part)) {
    throw new Error(`Unexpected translation shape for ${target}: expected ${strings.length}, received ${parts.length}`);
  }
  return parts;
};

const sourceStrings = collectStrings(source);
const generated = {};
for (const target of targets) {
  const batches = [];
  for (let index = 0; index < sourceStrings.length; index += 14) {
    batches.push(sourceStrings.slice(index, index + 14));
  }
  const translatedBatches = await Promise.all(batches.map((batch) => translateBatch(batch, target)));
  const translated = translatedBatches.flat();
  generated[target] = rebuildWithTranslations(source, translated, { index: 0 });
  generated[target].banner = editorialOverrides[target].banner;
  generated[target].experiences[2].location = editorialOverrides[target].remote;
  process.stdout.write(`Translated ${sourceStrings.length} fields to ${target}\n`);
}

const output = `// Generated by scripts/generate-resume-translations.mjs.\n// Proper names, official publication titles, URLs, and technology names remain in the source data.\n\nexport const generatedResumeTranslations = ${JSON.stringify(generated, null, 2)} as const;\n`;
await writeFile(outputPath, output, 'utf8');
process.stdout.write(`Wrote ${outputPath}\n`);
