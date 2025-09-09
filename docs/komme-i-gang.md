# Komme i Gang med MysteryCharmer

Dette dokumentet vil guide deg gjennom prosessen med å sette opp og kjøre MysteryCharmer prosjektet lokalt.

## Forutsetninger

Før du begynner, sørg for at du har følgende installert på maskinen din:

- Node.js (versjon 16.x eller nyere)
- npm (følger med Node.js)
- Git

## Installasjon

1. Klon prosjektet:
```bash
git clone https://github.com/Marcus-Kodehode/mysterycharmer.git
cd mysterycharmer
```

2. Installer avhengigheter:
```bash
npm install
```

## Utvikling

For å starte utviklingsserveren:

```bash
npm run dev
```

Dette vil starte applikasjonen i utviklingsmodus. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren din for å se resultatet.

## Tilgjengelige Scripts

- `npm run dev` - Starter utviklingsserveren med Turbopack
- `npm run build` - Bygger applikasjonen for produksjon
- `npm run start` - Starter produksjonsserveren
- `npm run lint` - Kjører ESLint for kodesjekk
- `npm run normalize` - Kjører normalisering av komplimenter
- `npm run make:en` - Genererer engelske oversettelser
- `npm run make:es` - Genererer spanske oversettelser
- `npm run make:sw` - Genererer svenske oversettelser

## Miljøvariabler

For øyeblikket krever ikke prosjektet noen miljøvariabler for å kjøre lokalt.

## Nyttige Tips

- Applikasjonen bruker Turbopack for raskere bygging og utvikling
- Endringer i koden vil automatisk oppdatere nettleseren
- Sjekk console i nettleseren for eventuelle feilmeldinger under utvikling
