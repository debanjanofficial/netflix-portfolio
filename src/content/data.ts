import { LanguageCode } from '../context/LanguageContext';
import { generatedResumeTranslations } from './resumeTranslations.generated';

type Localized<T> = { en: T; de: T } & Partial<Record<Exclude<LanguageCode, 'en' | 'de'>, T>>;

export interface SkillGroup {
  id: string;
  label: Localized<string>;
  items: Localized<string[]>;
}

export interface ExperienceEntry {
  id: string;
  content: Localized<{
    role: string; company: string; location: string; duration: string; bullets: string[];
  }>;
}

export interface EducationEntry {
  id: string;
  content: Localized<{
    degree: string; institution: string; institutionUrl: string; location: string;
    duration: string; thesisTitle: string; supervisors: string; bullets: string[];
  }>;
}

export interface ProjectEntry {
  id: string;
  content: Localized<{
    title: string; url?: string; context: string; tech: string[]; bullets: string[];
  }>;
}

export interface PublicationEntry {
  id: string;
  content: Localized<{
    citation: string; title: string; venue: string; status: string;
  }>;
}

export const personalDetails = {
  name: 'Debanjan Chakraborty',
  location: 'Weisendorf, Bavaria, Germany',
  phone: '+49 15292606217',
  phoneUrl: 'tel:+4915292606217',
  email: 'dbjn.ckbrty99@gmail.com',
  emailUrl: 'mailto:dbjn.ckbrty99@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/debanjan-chakraborty',
  githubUrl: 'https://github.com/debanjanofficial',
};

export const researchInterests: Localized<string[]> = {
  en: ['Machine Learning', 'Explainable AI', 'Unsupervised Anomaly Detection', 'Retrieval-Augmented Generation (RAG)', 'Applied Computer Vision', 'Edge Inference'],
  de: ['Machine Learning', 'Erklärbare KI', 'Unüberwachte Anomalieerkennung', 'Retrieval-Augmented Generation (RAG)', 'Angewandte Computer Vision', 'Edge-Inferenz'],
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'deep-learning-ai',
    label: { en: 'Deep Learning & AI', de: 'Deep Learning & KI' },
    items: {
      en: ['PyTorch', 'Transformers', 'LLMs (Ollama)', 'RAG', 'OpenCV', 'Scikit-Learn'],
      de: ['PyTorch', 'Transformers', 'LLMs (Ollama)', 'RAG', 'OpenCV', 'Scikit-Learn'],
    },
  },
  {
    id: 'languages-backend',
    label: { en: 'Languages & Backend', de: 'Sprachen & Backend' },
    items: {
      en: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'FastAPI', 'Django', 'Vue 3'],
      de: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'FastAPI', 'Django', 'Vue 3'],
    },
  },
  {
    id: 'infrastructure-cloud',
    label: { en: 'Infrastructure & Cloud', de: 'Infrastruktur & Cloud' },
    items: {
      en: ['Docker', 'Git', 'CI/CD', 'GitHub Actions', 'Azure', 'Snowflake', 'SQLite'],
      de: ['Docker', 'Git', 'CI/CD', 'GitHub Actions', 'Azure', 'Snowflake', 'SQLite'],
    },
  },
  {
    id: 'visualization-tools',
    label: { en: 'Data Visualization & Tools', de: 'Datenvisualisierung & Tools' },
    items: {
      en: ['Tableau', 'Power BI', 'Alteryx', 'Jupyter', 'LaTeX', 'Matplotlib', 'Seaborn'],
      de: ['Tableau', 'Power BI', 'Alteryx', 'Jupyter', 'LaTeX', 'Matplotlib', 'Seaborn'],
    },
  },
  {
    id: 'spoken-languages',
    label: { en: 'Spoken Languages', de: 'Gesprochene Sprachen' },
    items: {
      en: ['English — C1 / Fluent', 'German — B1/B2 / Intermediate', 'Bengali — Native', 'Norwegian — Basic'],
      de: ['Englisch — C1 / fließend', 'Deutsch — B1/B2 / Mittelstufe', 'Bengalisch — Muttersprache', 'Norwegisch — Grundkenntnisse'],
    },
  },
];

export const experiences: ExperienceEntry[] = [
  {
    id: 'data-scientist',
    content: {
      en: {
        role: 'Data Scientist (Working Student)', company: 'Siemens Energy', location: 'Erlangen, Germany', duration: 'Oct. 2025 – Mar. 2026',
        bullets: [
          'Developed an end-to-end Python microservice to retrieve events from an external API and publish them to Azure Event Hub as part of a proof of concept.',
          'Enabled Multi-Agent System integration with the EcoMAIN platform, collaborating with Alexander Thamm on advanced anomaly detection.',
          'Maintained and debugged Vue.js frontend applications, optimizing backend API calls and aligning UI components with complex technical requirements.',
        ],
      },
      de: {
        role: 'Data Scientist (Werkstudent)', company: 'Siemens Energy', location: 'Erlangen, Deutschland', duration: 'Okt. 2025 – März 2026',
        bullets: [
          'Entwickelte für einen Proof of Concept einen durchgängigen Python-Microservice, der Ereignisse aus einer externen API abruft und an Azure Event Hub übermittelt.',
          'Ermöglichte die Integration eines Multi-Agenten-Systems in die EcoMAIN-Plattform und arbeitete mit Alexander Thamm an fortgeschrittener Anomalieerkennung.',
          'Wartete und debugte Vue.js-Frontends, optimierte Backend-API-Aufrufe und stimmte UI-Komponenten auf komplexe technische Anforderungen ab.',
        ],
      },
    },
  },
  {
    id: 'data-analyst-siemens',
    content: {
      en: {
        role: 'Data Analyst (Working Student)', company: 'Siemens Energy', location: 'Erlangen, Germany', duration: 'Dec. 2024 – Sep. 2025',
        bullets: [
          'Managed complex relational databases (MS SQL, MySQL) in the operational R&D division, writing optimized queries for extensive data migrations.',
          'Designed and implemented automated ETL/ELT data flows, synchronizing data from SharePoint and Excel to SQL using Power Automate and Alteryx.',
          'Architected a new collaborative backend database for portfolio and development data to support digital use cases.',
        ],
      },
      de: {
        role: 'Data Analyst (Werkstudent)', company: 'Siemens Energy', location: 'Erlangen, Deutschland', duration: 'Dez. 2024 – Sep. 2025',
        bullets: [
          'Verwaltete komplexe relationale Datenbanken (MS SQL, MySQL) im operativen F&E-Bereich und schrieb optimierte Abfragen für umfangreiche Datenmigrationen.',
          'Konzipierte und implementierte automatisierte ETL/ELT-Datenflüsse zur Synchronisierung von SharePoint- und Excel-Daten nach SQL mit Power Automate und Alteryx.',
          'Entwarf eine neue kollaborative Backend-Datenbank für Portfolio- und Entwicklungsdaten zur Unterstützung digitaler Use Cases.',
        ],
      },
    },
  },
  {
    id: 'data-analyst-it-grow',
    content: {
      en: {
        role: 'Data Analyst', company: 'IT Grow Division Limited', location: 'Remote', duration: 'Oct. 2021 – Mar. 2023',
        bullets: [
          'Executed complex ETL processes by connecting Snowflake, MySQL, and Excel to extract and transform large-scale datasets using Power Query.',
          'Built interactive analytical dashboards to provide actionable, data-driven insights to executive stakeholders.',
          'Used agile methodologies (Kanban, Scrum) to map stakeholder requirements and streamline project delivery.',
        ],
      },
      de: {
        role: 'Data Analyst', company: 'IT Grow Division Limited', location: 'Remote', duration: 'Okt. 2021 – März 2023',
        bullets: [
          'Führte komplexe ETL-Prozesse durch und verband Snowflake, MySQL und Excel, um große Datensätze mit Power Query zu extrahieren und zu transformieren.',
          'Erstellte interaktive Analyse-Dashboards mit umsetzbaren, datenbasierten Erkenntnissen für Führungskräfte.',
          'Nutzte agile Methoden (Kanban, Scrum), um Stakeholder-Anforderungen abzubilden und die Projektabwicklung zu optimieren.',
        ],
      },
    },
  },
];

export const educationEntries: EducationEntry[] = [
  {
    id: 'masters',
    content: {
      en: {
        degree: 'Master of Science in Data Science', institution: 'Friedrich-Alexander-Universität Erlangen-Nürnberg', institutionUrl: 'https://www.fau.eu', location: 'Erlangen, Germany', duration: 'Oct. 2022 – Jun. 2026',
        thesisTitle: 'Anomaly detection Agent for timeseries data (Process Industry) that can be integrated in an Multi Agent System',
        supervisors: 'Prof. Dr. Marie Düker · Prof. Dr. Frauke Liers',
        bullets: [
          'Architected an unsupervised machine learning pipeline to detect anomalies in complex, multivariate time series data for the process industry.',
          'Designed the system as an independent, scalable agent for seamless integration into a larger industrial Multi-Agent System ecosystem, completed in collaboration with Siemens Energy.',
        ],
      },
      de: {
        degree: 'Master of Science in Data Science', institution: 'Friedrich-Alexander-Universität Erlangen-Nürnberg', institutionUrl: 'https://www.fau.de', location: 'Erlangen, Deutschland', duration: 'Okt. 2022 – Juni 2026',
        thesisTitle: 'Anomalieerkennungs-Agent für Zeitreihendaten der Prozessindustrie zur Integration in ein Multi-Agenten-System',
        supervisors: 'Prof. Dr. Marie Düker · Prof. Dr. Frauke Liers',
        bullets: [
          'Konzipierte eine unüberwachte Machine-Learning-Pipeline zur Erkennung von Anomalien in komplexen, multivariaten Zeitreihendaten der Prozessindustrie.',
          'Entwickelte das System als unabhängigen, skalierbaren Agenten zur nahtlosen Integration in ein größeres industrielles Multi-Agenten-Ökosystem, in Zusammenarbeit mit Siemens Energy.',
        ],
      },
    },
  },
  {
    id: 'bachelors',
    content: {
      en: {
        degree: 'Bachelor of Technology in Computer Science and Engineering', institution: 'Budge Budge Institute of Technology (MAKAUT)', institutionUrl: 'https://www.bbit.edu.in', location: 'Kolkata, India', duration: 'Jul. 2017 – May 2021',
        thesisTitle: 'Design and Evaluation of a Lightweight Real-Time Facial Expression Recognition System', supervisors: 'Prof. Dr. Bimal Dutta',
        bullets: [
          'Engineered a custom, highly efficient Mini-Xception CNN (56,951 parameters) from scratch using PyTorch to classify seven basic emotions.',
          'Mitigated severe class imbalance in the FERPlus dataset using an optimized square-root inverse-frequency loss weighting strategy, achieving 75.40% test accuracy.',
          'Deployed the model for real-time edge inference using MediaPipe BlazeFace, sustaining 30 FPS with ultra-low latency (3.42 ms) on CPU hardware.',
        ],
      },
      de: {
        degree: 'Bachelor of Technology in Computer Science and Engineering', institution: 'Budge Budge Institute of Technology (MAKAUT)', institutionUrl: 'https://www.bbit.edu.in', location: 'Kolkata, Indien', duration: 'Juli 2017 – Mai 2021',
        thesisTitle: 'Entwurf und Evaluierung eines leichtgewichtigen Echtzeit-Systems zur Gesichtsausdruckserkennung', supervisors: 'Prof. Dr. Bimal Dutta',
        bullets: [
          'Entwickelte mit PyTorch ein eigenes, hocheffizientes Mini-Xception-CNN (56.951 Parameter) zur Klassifikation von sieben Basisemotionen.',
          'Reduzierte die starke Klassenunwucht im FERPlus-Datensatz durch eine optimierte Gewichtung der Verlustfunktion und erreichte 75,40 % Testgenauigkeit.',
          'Implementierte das Modell mit MediaPipe BlazeFace für Echtzeit-Edge-Inferenz und erreichte auf CPU-Hardware 30 FPS bei 3,42 ms Latenz.',
        ],
      },
    },
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    id: 'sensation',
    content: {
      en: {
        title: 'SENSATION: Navigation System for Visually Impaired', url: 'https://github.com/debanjanofficial/Project-Route-Planning-for-the-Visually-Impaired', context: 'Master Seminar', tech: ['PyTorch', 'ONNX', 'OpenCV'],
        bullets: [
          'Designed an assistive navigation system fusing DeepLabv3+ ResNet50 semantic segmentation with Valhalla GPS routing for real-time sidewalk guidance.',
          'Fine-tuned the model on the Mapillary dataset and exported it to ONNX via TorchScript for efficient CPU/GPU inference on live camera streams.',
          'Engineered a spatial analysis algorithm to issue directional commands based on dominant sidewalk pixel distribution.',
        ],
      },
      de: {
        title: 'SENSATION: Navigationssystem für Sehbehinderte', url: 'https://github.com/debanjanofficial/Project-Route-Planning-for-the-Visually-Impaired', context: 'Masterseminar', tech: ['PyTorch', 'ONNX', 'OpenCV'],
        bullets: [
          'Entwarf ein assistives Navigationssystem, das semantische Segmentierung mit DeepLabv3+ ResNet50 und Valhalla-GPS-Routing für eine Echtzeit-Gehwegführung kombiniert.',
          'Optimierte das Modell auf dem Mapillary-Datensatz und exportierte es über TorchScript nach ONNX für effiziente CPU/GPU-Inferenz auf Live-Kamerastreams.',
          'Entwickelte einen räumlichen Analysealgorithmus, der anhand der dominanten Verteilung von Gehwegpixeln Richtungsanweisungen ausgibt.',
        ],
      },
    },
  },
  {
    id: 'drivers-freund',
    content: {
      en: {
        title: "Driver's Freund: AI Multilingual Chatbot", url: 'https://www.driversfreund.com', context: '2025 – Present', tech: ['FastAPI', 'LangChain', 'React', 'Docker'],
        bullets: [
          'Architected a full-stack German driving law chatbot using a Retrieval-Augmented Generation pipeline (MiniLM + Chroma + Perplexity).',
          'Implemented a bilingual NLP pipeline (EN/DE) using spaCy for classification and generation, deployed on a VPS with Docker and CI/CD automation.',
        ],
      },
      de: {
        title: "Driver's Freund: Mehrsprachiger KI-Chatbot", url: 'https://www.driversfreund.com', context: '2025 – heute', tech: ['FastAPI', 'LangChain', 'React', 'Docker'],
        bullets: [
          'Konzipierte einen Full-Stack-Chatbot zum deutschen Verkehrsrecht mit einer Retrieval-Augmented-Generation-Pipeline (MiniLM + Chroma + Perplexity).',
          'Implementierte mit spaCy eine zweisprachige NLP-Pipeline (EN/DE) für Klassifikation und Generierung und stellte sie per Docker und CI/CD auf einem VPS bereit.',
        ],
      },
    },
  },
  {
    id: 'chicago-crime',
    content: {
      en: {
        title: 'Chicago Crime Data Analysis', url: 'https://github.com/debanjanofficial/made-template', context: '2024 – 2025', tech: ['Python', 'SQLite', 'GitHub Actions'],
        bullets: [
          'Built an end-to-end ETL pipeline correlating Chicago crime incidents with meteorological data from the Chicago Police Department and weather APIs.',
          'Deployed automated testing and CI/CD pipelines via GitHub Actions to ensure full reproducibility of the data engineering lifecycle.',
        ],
      },
      de: {
        title: 'Analyse der Kriminalitätsdaten von Chicago', url: 'https://github.com/debanjanofficial/made-template', context: '2024 – 2025', tech: ['Python', 'SQLite', 'GitHub Actions'],
        bullets: [
          'Entwickelte eine durchgängige ETL-Pipeline, die Kriminalitätsfälle in Chicago mit Wetterdaten der Chicago Police Department und von Wetter-APIs korreliert.',
          'Implementierte automatisierte Tests und CI/CD-Pipelines mit GitHub Actions, um die vollständige Reproduzierbarkeit des Data-Engineering-Lebenszyklus sicherzustellen.',
        ],
      },
    },
  },
];

export const publications: PublicationEntry[] = [
  {
    id: 'dual-pipeline',
    content: {
      en: { citation: 'Chakraborty, D. (2026)', title: 'A Dual-Pipeline Multi-Agent Architecture for Unsupervised Anomaly Detection in Multivariate Time Series', venue: 'Pattern Recognition', status: 'Submitted · Under Review' },
      de: { citation: 'Chakraborty, D. (2026)', title: 'A Dual-Pipeline Multi-Agent Architecture for Unsupervised Anomaly Detection in Multivariate Time Series', venue: 'Pattern Recognition', status: 'Eingereicht · In Begutachtung' },
    },
  },
  {
    id: 'facial-expression',
    content: {
      en: { citation: 'Chakraborty, D. (2026)', title: 'Design and Evaluation of a Lightweight Real-Time Facial Expression Recognition System: A PyTorch Mini-Xception Implementation Trained on FERPlus', venue: 'SN Computer Science', status: 'Submitted · Preprint pending on Research Square' },
      de: { citation: 'Chakraborty, D. (2026)', title: 'Design and Evaluation of a Lightweight Real-Time Facial Expression Recognition System: A PyTorch Mini-Xception Implementation Trained on FERPlus', venue: 'SN Computer Science', status: 'Eingereicht · Preprint auf Research Square ausstehend' },
    },
  },
];

export const bannerSummary: Localized<string[]> = {
  en: [
    'Data Science M.Sc. graduate and applied AI researcher developing intelligent systems for multivariate time-series analysis, anomaly detection, retrieval-augmented generation, and computer vision.',
    'I bridge rigorous machine learning research with production engineering—translating novel ideas into scalable, explainable solutions for real-world scientific and industrial challenges.',
  ],
  de: [
    'Data-Science-M.Sc.-Absolvent und angewandter KI-Forscher mit Fokus auf intelligente Systeme für multivariate Zeitreihenanalyse, Anomalieerkennung, Retrieval-Augmented Generation und Computer Vision.',
    'Ich verbinde fundierte Machine-Learning-Forschung mit Production Engineering und überführe neue Ansätze in skalierbare, erklärbare Lösungen für reale wissenschaftliche und industrielle Herausforderungen.',
  ],
};

type GeneratedLanguageCode = keyof typeof generatedResumeTranslations;
type GeneratedLocale = (typeof generatedResumeTranslations)[GeneratedLanguageCode];

(Object.entries(generatedResumeTranslations) as Array<[GeneratedLanguageCode, GeneratedLocale]>).forEach(
  ([code, locale]) => {
    const language = code as LanguageCode;
    bannerSummary[language] = [...locale.banner];
    researchInterests[language] = [...locale.researchInterests];

    skillGroups.forEach((group, index) => {
      group.label[language] = locale.skillLabels[index];
      group.items[language] = group.id === 'spoken-languages'
        ? [...locale.spokenLanguages]
        : [...group.items.en];
    });

    experiences.forEach((entry, index) => {
      const translated = locale.experiences[index];
      entry.content[language] = {
        ...entry.content.en,
        ...translated,
        bullets: [...translated.bullets],
      };
    });

    educationEntries.forEach((entry, index) => {
      const translated = locale.education[index];
      entry.content[language] = {
        ...entry.content.en,
        ...translated,
        bullets: [...translated.bullets],
      };
    });

    projectEntries.forEach((entry, index) => {
      const translated = locale.projects[index];
      entry.content[language] = {
        ...entry.content.en,
        ...translated,
        tech: [...entry.content.en.tech],
        bullets: [...translated.bullets],
      };
    });

    publications.forEach((entry, index) => {
      entry.content[language] = {
        ...entry.content.en,
        status: locale.publicationStatuses[index],
      };
    });
  },
);
