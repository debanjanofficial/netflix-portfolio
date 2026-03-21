# Netflix-Style Portfolio

A personal portfolio web app inspired by the Netflix browsing experience, built with React + TypeScript.

Live website: [debanjanchakraborty.dev](https://debanjanchakraborty.dev)

## Overview

This project presents a profile in an interactive, streaming-platform style UI with:

- Role-based views (Recruiter and Stalker modes)
- Sign-in flow with social providers (Auth0: Google, LinkedIn, Facebook)
- Anonymous guest access
- Bilingual UI support (English and German)
- Search across skills, experience, education, and projects
- Portfolio sections powered by centralized data files

## Tech Stack

- React 19
- TypeScript
- React Scripts (Create React App)
- React Router DOM
- Bootstrap 5
- Auth0 React SDK
- EmailJS (optional welcome emails)

## Project Structure

```text
src/
	App.tsx                    # Main state + navigation logic
	components/                # UI sections (header, dashboards, showcases, auth UI)
	content/data.ts            # Portfolio content (skills, experience, education, projects)
	context/AuthProvider.tsx   # Auth0 provider wrapper + app auth context
	context/LanguageContext.tsx# Language state and translation resolver
	i18n/translations.ts       # EN/DE translation dictionaries
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root.

#### Required for social sign-in (Auth0)

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

#### Optional for welcome emails (EmailJS)

```env
REACT_APP_EMAILJS_SERVICE_ID=your-emailjs-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

If Auth0 variables are not set, social sign-in is disabled and the app can still be used in guest/anonymous mode.

### 3. Run the app

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Available Scripts

- `npm start`: Start development server
- `npm run build`: Build production bundle
- `npm test`: Run test suite
- `npm run eject`: Eject CRA configuration (irreversible)

## Customizing Content

Most profile content is maintained in `src/content/data.ts`.

You can update:

- Skill groups
- Work experience entries
- Education details
- Project portfolio cards

Translations and labels are managed in `src/i18n/translations.ts`.

## Notes

- Auth/session and view preferences are persisted via `localStorage`.
- Search index is generated from your structured content data.
- Static assets (such as CV PDF) can be served from `public/`.

## Author

Debanjan Chakraborty  
Website: [debanjanchakraborty.dev](https://debanjanchakraborty.dev)
