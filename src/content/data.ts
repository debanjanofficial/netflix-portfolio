import { LanguageCode } from '../context/LanguageContext';

export interface LocalisedValue<T> {
  id: string;
  label: Record<LanguageCode, T>;
}

export interface SkillGroup {
  id: string;
  label: Record<LanguageCode, string>;
  items: Record<LanguageCode, string[]>;
}

export interface ExperienceEntry {
  id: string;
  content: Record<LanguageCode, {
    role: string;
    company: string;
    duration: string;
    bullets: string[];
  }>;
}

export interface EducationEntry {
  id: string;
  content: Record<LanguageCode, {
    degree: string;
    institution: string;
    institutionUrl: string;
    major: string;
    courses: string[];
    thesisTitle: string;
    thesisDescription: string;
  }>;
}

export interface ProjectEntry {
  id: string;
  content: Record<LanguageCode, {
    title: string;
    url: string;
    summary: string;
    tech: string[];
  }>;
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    label: {
      en: 'Programming',
      de: 'Programmierung',
    },
    items: {
      en: ['Python', 'SQL', 'Alteryx'],
      de: ['Python', 'SQL', 'Alteryx'],
    },
  },
  {
    id: 'power-platform',
    label: {
      en: 'Microsoft Power Platform',
      de: 'Microsoft Power Platform',
    },
    items: {
      en: ['Power BI', 'Power Automate', 'Power Apps'],
      de: ['Power BI', 'Power Automate', 'Power Apps'],
    },
  },
  {
    id: 'ml-dl',
    label: {
      en: 'Machine Learning & Deep Learning',
      de: 'Machine Learning & Deep Learning',
    },
    items: {
      en: ['Scikit-Learn', 'PyTorch', 'OpenCV', 'LLMs', 'Transformers', 'NumPy', 'Pandas'],
      de: ['Scikit-Learn', 'PyTorch', 'OpenCV', 'LLMs', 'Transformer', 'NumPy', 'Pandas'],
    },
  },
  {
    id: 'office-365',
    label: {
      en: 'Office 365',
      de: 'Office 365',
    },
    items: {
      en: ['Excel', 'SharePoint', 'PowerPoint', 'Azure ML'],
      de: ['Excel', 'SharePoint', 'PowerPoint', 'Azure ML'],
    },
  },
  {
    id: 'devops',
    label: {
      en: 'GitHub & Docker',
      de: 'GitHub & Docker',
    },
    items: {
      en: ['GitHub', 'Docker'],
      de: ['GitHub', 'Docker'],
    },
  },
  {
    id: 'visualization',
    label: {
      en: 'Visualization',
      de: 'Visualisierung',
    },
    items: {
      en: ['Matplotlib', 'Seaborn', 'Tableau'],
      de: ['Matplotlib', 'Seaborn', 'Tableau'],
    },
  },
];

export const experiences: ExperienceEntry[] = [
  {
    id: 'data-scientist',
    content: {
      en: {
        role: 'Data Scientist',
        company: 'Siemens Energy',
        duration: '10.2025 – Present',
        bullets: [
          'Driving data-driven decision making across energy initiatives with advanced analytics and AI.',
          'Experimenting with LLMs and predictive models to optimize operational efficiency.',
          'Partnering with product stakeholders to align solutions with business goals.',
        ],
      },
      de: {
        role: 'Data Scientist',
        company: 'Siemens Energy',
        duration: '10.2025 – Heute',
        bullets: [
          'Steuere datengetriebene Entscheidungen in Energieprojekten mithilfe von Advanced Analytics und KI.',
          'Erprobe LLMs und Vorhersagemodelle, um die operative Effizienz zu optimieren.',
          'Arbeite eng mit Produkt-Stakeholdern zusammen, um Lösungen auf Geschäftsziele auszurichten.',
        ],
      },
    },
  },
  {
    id: 'db-management',
    content: {
      en: {
        role: 'Database Management & Data Analysis',
        company: 'Siemens Energy',
        duration: '12.2024 – 09.2025',
        bullets: [
          'Managed MS SQL databases, synchronizing SharePoint and Excel sources via Power Automate.',
          'Leveraged Alteryx for data manipulation, analysis, and preprocessing across R&D portfolios.',
          'Built Tableau dashboards and reports to surface processed insights for leadership.',
          'Collaborated with users and stakeholders to refine requirements and validate solutions.',
          'Created and maintained collaborative databases to support digital use cases.',
        ],
      },
      de: {
        role: 'Datenbankverwaltung & Datenanalyse',
        company: 'Siemens Energy',
        duration: '12.2024 – 09.2025',
        bullets: [
          'Verwaltete MS SQL-Datenbanken und synchronisierte SharePoint- sowie Excel-Datenquellen über Power Automate.',
          'Setzte Alteryx für Datenaufbereitung, Analyse und Vorverarbeitung in F&E-Portfolios ein.',
          'Erstellte Tableau-Dashboards und Reports, um Erkenntnisse für das Management sichtbar zu machen.',
          'Stimmte Anforderungen mit Anwendern und Stakeholdern ab und validierte Lösungen.',
          'Entwickelte und pflegte kollaborative Datenbanken zur Unterstützung digitaler Use Cases.',
        ],
      },
    },
  },
  {
    id: 'intern-analyst',
    content: {
      en: {
        role: 'Data Analyst',
        company: 'IT Grow Division Limited',
        duration: '10.2021 – 03.2023',
        bullets: [
          'Integrated MySQL and Excel data into Power BI with Power Query transformations.',
          'Delivered finance, sales, marketing, supply chain, and executive dashboards to improve gross margin.',
          'Adopted project chartering, stakeholder mapping, and Kanban practices to streamline delivery.',
        ],
      },
      de: {
        role: 'Datenanalyst',
        company: 'IT Grow Division Limited',
        duration: '10.2021 – 03.2023',
        bullets: [
          'Integrierte MySQL- und Excel-Daten in Power BI und führte Transformationen mit Power Query durch.',
          'Lieferte Dashboards für Finanzen, Vertrieb, Marketing, Supply Chain und Management zur Verbesserung der Marge.',
          'Setzte Projektcharta, Stakeholder-Mapping und Kanban zur effizienten Umsetzung ein.',
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
        degree: 'Masters in Data Science',
        institution: 'Friedrich Alexander University',
        institutionUrl: 'https://www.fau.de',
        major: 'Machine Learning / Artificial Intelligence',
        courses: [
          'Pattern Recognition',
          'Deep Learning',
          'ML in Signal Processing',
          'ML in Time Series',
          'ML in Finance',
        ],
        thesisTitle: "Master's Thesis",
        thesisDescription:
          'Designed an anomaly detection agent for process-industry time series that integrates with a multi-agent system using deep learning, ML, and statistical models with JSON-based logging and Matplotlib visualization (Siemens Energy).',
      },
      de: {
        degree: 'Master in Data Science',
        institution: 'Friedrich-Alexander-Universität',
        institutionUrl: 'https://www.fau.de',
        major: 'Machine Learning / Künstliche Intelligenz',
        courses: [
          'Pattern Recognition',
          'Deep Learning',
          'ML in Signalverarbeitung',
          'ML in Zeitreihen',
          'ML in Finanzen',
        ],
        thesisTitle: 'Masterarbeit',
        thesisDescription:
          'Entwickelte einen Anomalieerkennungs-Agenten für Zeitreihen der Prozessindustrie, integrierbar in ein Multi-Agenten-System mit Deep Learning, ML und statistischen Modellen inkl. JSON-Logging und Matplotlib-Visualisierung (Siemens Energy).',
      },
    },
  },
  {
    id: 'bachelors',
    content: {
      en: {
        degree: 'Bachelors in Computer Science and Engineering',
        institution: 'Maulana Abul Kalam Azad University of Technology',
        institutionUrl: 'https://makautwb.ac.in',
        major: 'Grade: 1.9 (180 ECTS)',
        courses: [
          'DBMS',
          'Data Structure Engineering',
          'OOP',
          'Artificial Intelligence',
          'Internet Technology',
          'Python for Machine Learning',
        ],
        thesisTitle: "Bachelor's Thesis",
        thesisDescription:
          'Built a real-time emotion detection system for seven basic expressions using a VGG16 deep learning model.',
      },
      de: {
        degree: 'Bachelor in Informatik und Ingenieurwissenschaften',
        institution: 'Maulana Abul Kalam Azad University of Technology',
        institutionUrl: 'https://makautwb.ac.in',
        major: 'Note: 1,9 (180 ECTS)',
        courses: [
          'DBMS',
          'Datenstrukturen',
          'OOP',
          'Künstliche Intelligenz',
          'Internet-Technologie',
          'Python für Machine Learning',
        ],
        thesisTitle: 'Bachelorarbeit',
        thesisDescription:
          'Entwickelte eine Echtzeit-Gesichtsemotions-Erkennung (sieben Basisemotionen) auf Basis des VGG16-Deep-Learning-Modells.',
      },
    },
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    id: 'route-planning',
    content: {
      en: {
        title: 'Project-Route-Planning-for-the-Visually-Impaired',
        url: 'https://github.com/debanjanofficial/Project-Route-Planning-for-the-Visually-Impaired',
        summary:
          'Developed an AI-powered navigation assistance system combining semantic segmentation and real-time GPS routing to guide visually impaired individuals along safe sidewalks.',
        tech: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'GPS/GIS APIs', 'Deep Learning', 'Computer Vision', 'Semantic Segmentation'],
      },
      de: {
        title: 'Project-Route-Planning-for-the-Visually-Impaired',
        url: 'https://github.com/debanjanofficial/Project-Route-Planning-for-the-Visually-Impaired',
        summary:
          'Entwickelte ein KI-gestütztes Navigationssystem, das semantische Segmentierung und GPS-Routing kombiniert, um Sehbehinderten sichere Gehwege aufzuzeigen.',
        tech: ['Python', 'PyTorch', 'OpenCV', 'ONNX', 'GPS/GIS APIs', 'Deep Learning', 'Computer Vision', 'Semantische Segmentierung'],
      },
    },
  },
  {
    id: 'drivers-friend',
    content: {
      en: {
        title: "Driver's Friend - AI-Powered Multilingual Chatbot (Ongoing)",
        url: 'https://www.driversfreund.com',
        summary:
          'Created a bilingual chatbot for German driving regulations with conversation memory, intelligent scraping, and real-time chat built on React, FastAPI.',
        tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'MongoDB', 'NLP', 'spaCy', 'Multilingual Support', 'Real-time Chat'],
      },
      de: {
        title: "Driver's Friend - KI-gestützter mehrsprachiger Chatbot (laufend)",
        url: 'https://www.driversfreund.com',
        summary:
          'Entwickelte einen zweisprachigen Chatbot für deutsche Verkehrsregeln mit Gesprächsspeicher, intelligentem Scraping und Echtzeit-Chat auf Basis von React, FastAPI.',
        tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'MongoDB', 'NLP', 'spaCy', 'Mehrsprachige KI', 'Echtzeit-Chat'],
      },
    },
  },
  {
    id: 'crime-analysis',
    content: {
      en: {
        title: 'Crime Data Analysis in Chicago post Covid',
        url: 'https://github.com/debanjanofficial/made-template',
        summary:
          'Engineered an automated ETL pipeline correlating weather and crime patterns in Chicago with rigorous analysis, visualization, and CI/CD automation for urban insights.',
        tech: ['Python', 'ETL Pipelines', 'Data Analysis', 'Jupyter Notebooks', 'GitHub Actions', 'SQLite', 'Data Visualization'],
      },
      de: {
        title: 'Crime Data Analysis in Chicago post Covid',
        url: 'https://github.com/debanjanofficial/made-template',
        summary:
          'Implementierte eine automatisierte ETL-Pipeline zur Analyse von Wetter- und Kriminalitätsmustern in Chicago inklusive Visualisierung und CI/CD-Workflows für urbane Erkenntnisse.',
        tech: ['Python', 'ETL-Pipelines', 'Datenanalyse', 'Jupyter Notebooks', 'GitHub Actions', 'SQLite', 'Datenvisualisierung'],
      },
    },
  },
];

export const bannerSummary: Record<LanguageCode, string[]> = {
  en: [
    'Data Science MSc graduate focused on extracting actionable insights to drive strategic decision-making. Experienced with analytics, machine learning, and visualization to tackle business challenges.',
    'Eager to apply analytical skills to support business growth and innovation in dynamic corporate environments.',
  ],
  de: [
    'Data-Science-MSc-Absolvent mit Fokus auf verwertbare Insights zur Unterstützung strategischer Entscheidungen. Erfahren in Analytics, Machine Learning und Visualisierung zur Lösung von Business-Herausforderungen.',
    'Motiviert, analytische Fähigkeiten einzusetzen, um Unternehmenswachstum und Innovation in dynamischen Umgebungen voranzutreiben.',
  ],
};
