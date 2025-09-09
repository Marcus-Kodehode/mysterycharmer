# Prosjektstruktur for MysteryCharmer

Dette dokumentet beskriver organiseringen av MysteryCharmer prosjektet og forklarer hovedkomponentene.

## Mappestruktur

```
mysterycharmer/
├── app/                    # Hovedapplikasjonsmappen
│   ├── components/        # React-komponenter
│   ├── favorites/        # Favoritter-siden
│   ├── history/         # Historikk-siden
│   ├── globals.css      # Globale stildefinisjoner
│   ├── layout.tsx       # Hovedlayout for applikasjonen
│   └── page.tsx         # Hovedsiden
├── docs/                # Prosjektdokumentasjon
├── lib/                 # Hjelpefunksjoner og utilities
│   ├── compliments.ts   # Kompliment-håndtering
│   ├── storage.ts       # Lokal lagring
│   └── types.ts         # TypeScript-definisjoner
├── public/             # Statiske filer
│   ├── data/           # JSON-data for komplimenter
│   └── images/         # Bilder og ikoner
└── scripts/            # Utviklerscripts
```

## Hovedkomponenter

### App-mappe (`/app`)
- `components/` - Inneholder alle gjenbrukbare React-komponenter
  - `ActionsBar.tsx` - Handlingsknapper for komplimenter
  - `ComplimentCard.tsx` - Visning av individuelle komplimenter
  - `ComplimentMachine.tsx` - Hovedlogikk for komplimentgenerering
  - `Header.tsx` - Applikasjonens toppbar
  - `LanguageMenu.tsx` - Språkvalgmeny

### Lib-mappe (`/lib`)
- `compliments.ts` - Håndterer lasting og prosessering av komplimenter
- `storage.ts` - Håndterer lokal lagring av favoritter og historikk
- `types.ts` - TypeScript type-definisjoner for prosjektet

### Public-mappe (`/public`)
- `data/` - Inneholder JSON-filer med komplimenter på ulike språk
- `images/` - Inneholder bilder og ikoner for språkvalg

### Scripts-mappe (`/scripts`)
- `normalize-compliments.mjs` - Script for å normalisere komplimentformatet
- `make-translation.mjs` - Script for å generere nye språkoversettelser

## Teknologistakk

- **Frontend**: Next.js 15.5 med React 19.1
- **Styling**: Tailwind CSS
- **Bygging**: Turbopack
- **Kodeformatering**: ESLint og Prettier
- **Språk**: TypeScript
- **Analytics**: Vercel Analytics

## Viktige Filer

- `app/page.tsx` - Hovedsiden med komplimentgeneratoren
- `lib/compliments.ts` - Kjernelogikk for komplimenthåndtering
- `public/data/compliments.*.json` - Komplimenter på ulike språk
