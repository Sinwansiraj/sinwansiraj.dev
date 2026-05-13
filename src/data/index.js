// ─── Projects Data ───────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Hotel Domain ML Platform',
    tagline: '10-problem unified AI platform for hospitality',
    description:
      'An end-to-end ML platform that solves 10 interconnected hotel industry problems through a unified data layer — from demand uncertainty and static pricing to staff misallocation and fragmented decision-making.',
    problem:
      'Hotel operations are fragmented: revenue, guest experience, and operations teams each work in silos. Static pricing, manual forecasting, and scattered data cost hotels millions in lost revenue and efficiency. This platform unifies all 10 critical problem domains into one intelligence layer.',
    features: [
      'Data sources: PMS, POS, CRM, OTA APIs, HR/ERP, weather & event signals — all unified via ETL into a central data warehouse + Feature Store',
      'FastAPI gateway with typed REST endpoints: /api/v1/demand/forecast, /api/v1/pricing/recommend, and 8 more',
      '10 ML models: LSTM/XGBoost demand forecasting, RL-based dynamic pricing, Random Forest churn prediction, BERT sentiment analysis, constraint-programming workforce optimisation',
      'React frontend with 8 operational dashboards — Revenue Intelligence, Guest Intelligence, Operations Intelligence, ML Platform monitoring',
      'Real-time model health tracking: accuracy, latency, and feature drift per model — on a single pane of glass',
      'Live on Vercel — auto-deploys on every GitHub push',
    ],
    tech: ['Python', 'FastAPI', 'React', 'LSTM', 'XGBoost', 'BERT', 'Reinforcement Learning', 'Recharts', 'Vercel'],
    image: '/assets/Hotel_dashboard_thumbnail.png',
    github: 'https://github.com/Sinwansiraj',
    demo: 'https://hotel-problems-fbevoueo5-mohammed-sinwan-s-projects.vercel.app/',
    category: 'ML Platform / Full-Stack',
    color: '#ec4899',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Lead Quality Scoring System',
    tagline: 'ML-powered B2B lead prioritisation engine',
    description:
      'An intelligent lead scoring platform that ranks inbound B2B leads by conversion probability using ML, enabling sales teams to focus on the highest-value prospects and dramatically improve pipeline efficiency.',
    problem:
      'Sales teams waste 70% of their time chasing unqualified leads. Manual lead scoring is inconsistent and subjective. This system brings data-driven prioritisation to every lead — automatically.',
    features: [
      'Multi-feature lead scoring using gradient boosting on firmographic, behavioural, and engagement signals',
      'Real-time scoring API built with FastAPI — integrates into any CRM via webhook',
      'Explainable AI layer: SHAP values surface the top drivers behind each lead score',
      'Interactive Streamlit dashboard with lead funnel analytics, score distributions, and conversion tracking',
      'Automated retraining pipeline triggered by data drift detection',
    ],
    tech: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Streamlit', 'Pandas', 'Scikit-learn'],
    image: '/assets/Lead_scoring_thumbnail.png',
    github: 'https://github.com/Sinwansiraj/ai-lead-scoring-system',
    demo: null,
    category: 'ML / Sales Intelligence',
    color: '#00d4ff',
    featured: true,
  },
  {
    id: 3,
    title: 'Mini Zia — Business Insight Generator',
    tagline: 'Automated KPI analyst inspired by Zoho Zia',
    description:
      'An automated, rule-based business insight generator that converts raw KPI data into clear, explainable insights — detecting anomalies, comparing time periods, identifying root causes, and producing executive-ready summaries.',
    problem:
      'Analysts spend hours manually reviewing dashboards to write narrative summaries. Mini Zia automates the entire insight-generation loop — from raw metrics to boardroom-ready language.',
    features: [
      'Anomaly detection on KPI streams — flags outliers and sudden changes automatically',
      'Time-period comparison engine: week-over-week, month-over-month, and custom range analysis',
      'Root-cause identification using rule chains — traces the "why" behind every metric move',
      'Executive-ready natural language summaries generated from structured insight logic',
      'Modular architecture: plug in any KPI source via CSV or API',
    ],
    tech: ['Python', 'Pandas', 'Rule Engine', 'NLP', 'Streamlit', 'Data Analytics'],
    image: '/assets/Mini_zia_thumbnail.png',
    github: 'https://github.com/Sinwansiraj/mini_zia',
    demo: null,
    category: 'AI Analytics / Automation',
    color: '#7c3aed',
    featured: true,
  },
  {
    id: 4,
    title: 'News Article Categorization on AWS',
    tagline: 'Serverless NLP pipeline — cloud-native & production-grade',
    description:
      'A fully serverless, event-driven news classification system deployed on AWS. Enter a headline or short description and the model instantly classifies it into one of Antonio Gulli\'s news categories — with zero servers to manage.',
    problem:
      'Manual news curation cannot scale. Publishers and aggregators need to classify hundreds of articles per hour with high accuracy and zero latency. A serverless-first architecture on AWS makes this both scalable and cost-efficient.',
    features: [
      'AWS Comprehend for NLP: entity extraction, key-phrase detection, and sentiment analysis on every article',
      'Lambda-triggered classification pipeline — S3 upload fires the entire pipeline automatically',
      'Multi-class topic classifier across Antonio Gulli\'s News categories achieving 94% accuracy',
      'S3 data lake with Hive-style partitioning (year/month/day/category) for downstream analytics',
      'CloudWatch dashboards: throughput, confidence distribution, and error rates',
      'SNS alerts for low-confidence predictions routed to a human review queue',
      'IAM least-privilege policies and VPC config — production security best practices throughout',
    ],
    tech: ['AWS Lambda', 'S3', 'Comprehend', 'CloudWatch', 'SNS', 'IAM', 'Python', 'Boto3'],
    image: '/assets/News_categoirazation_thumbnail.png',
    github: 'https://github.com/Sinwansiraj/DEPLOYMENT_OF_NEWS_ARTICLE',
    demo: null,
    category: 'NLP / Cloud / AWS',
    color: '#f59e0b',
    featured: true,
  },
  {
    id: 5,
    title: 'Swiggy Restaurant Recommendation System',
    tagline: 'AI-powered food discovery engine',
    description:
      'A hybrid recommendation system that suggests personalised restaurants based on user preferences, cuisine type, and location data scraped live from Swiggy.',
    problem:
      'Users struggle to discover relevant restaurants from thousands of options. This system reduces decision fatigue with intelligent, context-aware recommendations.',
    features: [
      'Content-based filtering using NLP on restaurant descriptions and menus',
      'Collaborative filtering with user preference modelling',
      'Location-aware ranking with geospatial scoring',
      'Interactive Streamlit dashboard with real-time filters',
    ],
    tech: ['Python', 'Scikit-learn', 'NLP', 'Pandas', 'Streamlit', 'Selenium'],
    image: '/assets/Restaurant_recommendation_thumbnail.png',
    github: 'https://github.com/Sinwansiraj',
    demo: null,
    category: 'ML / Recommendation',
    color: '#f97316',
    featured: false,
  },
  {
    id: 7,
    title: 'Stock Market Analysis Dashboard',
    tagline: 'Real-time financial intelligence platform',
    description:
      'A comprehensive stock analysis platform with real-time data, technical indicators, NLP-based sentiment analysis, and ML price trend predictions.',
    problem:
      'Retail investors lack access to institutional-grade analytics. This platform democratises financial intelligence through an intuitive AI-augmented interface.',
    features: [
      'Live stock data with candlestick charts & technical indicators (RSI, MACD, Bollinger Bands)',
      'Sentiment analysis on financial news using NLP',
      'ML price trend prediction with confidence scoring',
      'Portfolio tracker with risk analysis metrics',
    ],
    tech: ['Python', 'Streamlit', 'yFinance', 'NLP', 'Plotly', 'Scikit-learn'],
    image: '/assets/Stockanalysis_thumbnail.png',
    github: 'https://github.com/Sinwansiraj',
    demo: null,
    category: 'Data Science / FinTech',
    color: '#33a9ff',
    featured: false,
  },
  {
    id: 8,
    title: 'RedBus Data Scraping Pipeline',
    tagline: 'Large-scale web intelligence & data engineering',
    description:
      'A scalable web scraping pipeline using Selenium to extract bus route data from RedBus, storing structured data in MySQL for route analysis and travel analytics.',
    problem:
      'No public API exists for RedBus route data. This pipeline collects comprehensive route, pricing, and availability data for downstream travel analytics.',
    features: [
      'Selenium-based dynamic scraping with anti-bot handling and session management',
      'Automated data pipeline with cron scheduling and retry logic',
      'MySQL data warehouse with optimised schema and indexing',
      'Streamlit dashboard for route exploration & filtering',
    ],
    tech: ['Python', 'Selenium', 'MySQL', 'Pandas', 'Streamlit', 'SQLAlchemy'],
    image: '/assets/Redbus_LinkedIn_Thumbnail.png',
    github: 'https://github.com/Sinwansiraj',
    demo: null,
    category: 'Data Engineering / Scraping',
    color: '#ef4444',
    featured: false,
  },
  {
    id: 9,
    title: 'Multiclass Fish Image Classification',
    tagline: 'CNN + 5 pretrained models — best accuracy 98.84% (VGG16)',
    description:
      'End-to-end deep learning system that classifies fish species from images by training a custom CNN from scratch and fine-tuning 5 state-of-the-art pretrained models (VGG16, ResNet50, MobileNet, InceptionV3, EfficientNetB0) — deployed as a live Streamlit app for real-time predictions.',
    problem:
      'Manual fish species identification from images is slow, inconsistent, and unscalable. This system automates classification with production-level accuracy, enabling real-time deployment for fisheries, marine research, and aquaculture industries.',
    features: [
      'CNN trained from scratch (92.34% accuracy) vs 5 pretrained models — VGG16 tops at 98.84% F1-score',
      'Transfer learning with fine-tuning: VGG16 · ResNet50 · MobileNet · InceptionV3 · EfficientNetB0',
      'Full preprocessing pipeline: rescale [0,1], rotation, zoom, flip augmentation via ImageDataGenerator',
      'Comprehensive evaluation: Accuracy, Precision, Recall, F1-score, confusion matrix & training history plots',
      'Streamlit web app: upload any fish image → instant species prediction with per-class confidence scores',
      'Best models saved in .h5 / .pkl format — deployment-ready with modular, documented code',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'VGG16', 'ResNet50', 'MobileNet', 'EfficientNetB0', 'Streamlit', 'Transfer Learning'],
    image: '/assets/Fish_AI_LinkedIn_Thumbnail.png',
    github: 'https://github.com/Sinwansiraj/Multiclass_Fish_Classification',
    demo: null,
    category: 'Deep Learning / Computer Vision',
    color: '#06b6d4',
    featured: false,
    metrics: [
      { model: 'VGG16', accuracy: '98.84%', f1: '98.84%' },
      { model: 'EfficientNetB0', accuracy: '98.05%', f1: '97.85%' },
      { model: 'MobileNet', accuracy: '96.89%', f1: '96.70%' },
      { model: 'InceptionV3', accuracy: '96.08%', f1: '95.88%' },
      { model: 'ResNet50', accuracy: '94.16%', f1: '93.96%' },
      { model: 'CNN (scratch)', accuracy: '92.34%', f1: '92.09%' },
    ],
  },
]

// ─── Skills Data ──────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    label: 'Core Languages',
    icon: '⚡',
    color: '#00d4ff',
    skills: ['Python', 'SQL', 'Bash', 'JavaScript'],
  },
  {
    label: 'Machine Learning',
    icon: '🧠',
    color: '#7c3aed',
    skills: ['Scikit-learn', 'XGBoost', 'LightGBM', 'Feature Engineering'],
  },
  {
    label: 'Deep Learning',
    icon: '🔮',
    color: '#ec4899',
    skills: ['TensorFlow', 'Keras', 'LSTM', 'Neural Networks'],
  },
  {
    label: 'NLP & AI',
    icon: '🤖',
    color: '#f59e0b',
    skills: ['NLTK', 'SpaCy', 'Hugging Face', 'BERT'],
  },
  {
    label: 'Web & APIs',
    icon: '🚀',
    color: '#10b981',
    skills: ['FastAPI', 'Streamlit', 'REST APIs', 'React'],
  },
  {
    label: 'Data & BI',
    icon: '📊',
    color: '#33a9ff',
    skills: ['Pandas', 'NumPy', 'Power BI', 'Plotly'],
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: '#f97316',
    skills: ['AWS', 'Lambda', 'S3', 'Vercel'],
  },
  {
    label: 'Tools & Workflow',
    icon: '🛠',
    color: '#a78bfa',
    skills: ['Git & GitHub', 'Selenium', 'Jupyter', 'Docker'],
  },
]

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  {
    id: 1,
    title: 'Master Data Science Program',
    issuer: 'GUVI / HCL · IIT Pravartak',
    date: 'Sep 2024 – Feb 2025',
    description: 'Comprehensive 6-month programme in partnership with IIT Pravartak, CLIJE, and Google for Education — covering Python, ML, Deep Learning, NLP, SQL, and cloud technologies with real-world project work.',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'SQL', 'Cloud'],
    image: '/assets/IITM_Data_science_certificate.png',
    color: '#10b981',
    badge: '🎓',
    issuerLogo: 'GUVI · HCL',
  },
  {
    id: 2,
    title: 'AWS Solutions Architecture Job Simulation',
    issuer: 'Amazon Web Services · Forage',
    date: 'June 2025',
    description: 'Completed hands-on tasks in designing simple, scalable, and resilient hosting architectures on AWS — mirroring real Solutions Architect workflows.',
    skills: ['AWS', 'Cloud Architecture', 'Scalability', 'Infrastructure Design'],
    image: '/assets/AWS.png',
    color: '#f59e0b',
    badge: '☁️',
    issuerLogo: 'AWS · Forage',
  },
  {
    id: 3,
    title: 'Data Science Job Simulation',
    issuer: 'British Airways · Forage',
    date: 'June 2025',
    description: 'Completed real-world data science tasks for British Airways — modelling lounge eligibility at Heathrow Terminal 3 and predicting customer buying behaviour using classification models.',
    skills: ['Classification', 'Customer Analytics', 'Predictive Modelling', 'Python'],
    image: '/assets/British_airways.png',
    color: '#1d4ed8',
    badge: '✈️',
    issuerLogo: 'British Airways · Forage',
  },
  {
    id: 4,
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Tata Group · Forage',
    date: 'July 2025',
    description: 'Completed Tata\'s data visualisation simulation — framing business scenarios, selecting the right visuals, creating effective charts, and communicating data-driven insights to executive stakeholders.',
    skills: ['Data Visualisation', 'Business Storytelling', 'Power BI', 'Insight Communication'],
    image: '/assets/TATA_visuals.png',
    color: '#0ea5e9',
    badge: '📊',
    issuerLogo: 'Tata · Forage',
  },
]

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '8+', label: 'AI/ML Projects', icon: '🏗️' },
  { value: '94%', label: 'Best Model Accuracy', icon: '🎯' },
  { value: '4', label: 'Certifications', icon: '🏅' },
  { value: '3+', label: 'Cloud Deployments', icon: '☁️' },
]

// ─── Experience / Timeline ────────────────────────────────────────────────────
export const timeline = [
  {
    year: '2024 – Present',
    title: 'AI/ML Engineer & Product Builder',
    subtitle: 'Independent Projects',
    description:
      'Transitioned into AI/ML full-time — designing and shipping end-to-end intelligent products. Completed Data Science training at GUVI / IIT Madras Pravartak, then built the Hotel ML Platform (10 models, live on Vercel), AI Lead Scoring System, Mini Zia analytics engine, and a serverless NLP pipeline on AWS.',
    tags: ['Python', 'FastAPI', 'React', 'AWS', 'ML Platform'],
    icon: '🤖',
  },
  {
    year: 'Jan 2019 – Aug 2024',
    title: 'Entrepreneur & Head of Operations',
    subtitle: 'Restaurant Business · 40-Pax Capacity',
    description:
      'Founded and operated a 40-pax restaurant, managing end-to-end operations as Head of Operations with a team of 8. Oversaw day-to-day service, vendor relations, staffing, and customer experience — 5 years of running a real business that shaped a data-driven approach to operations.',
    tags: ['Operations', 'Business Management', 'Team Leadership', 'Hospitality'],
    icon: '🍽️',
  },
  {
    year: 'Jun 2016 – Dec 2018',
    title: 'Front Office Assistant',
    subtitle: 'Black Thunder Resorts',
    description:
      'Began career in hospitality at one of India\'s premier resorts — handling guest check-ins, reservations, and front-desk operations. Built the foundation in customer experience and hotel systems that later informed data-driven thinking.',
    tags: ['Front Office', 'Guest Relations', 'Hotel Systems', 'Hospitality'],
    icon: '🛎️',
  },
]
