# Bidra til MysteryCharmer

Jeg setter stor pris på bidrag til MysteryCharmer! Her er retningslinjene for hvordan du kan bidra til prosjektet.

## Hvordan Bidra

### Rapportere Feil
1. Sjekk først om feilen allerede er rapportert i Issues
2. Hvis ikke, opprett en ny Issue med:
   - En klar og beskrivende tittel
   - Detaljert beskrivelse av feilen
   - Steg for å reprodusere feilen
   - Forventet og faktisk oppførsel
   - Screenshots hvis relevant

### Foreslå Forbedringer
1. Opprett en Issue med "Forbedring:" i tittelen
2. Beskriv forslaget ditt i detalj
3. Forklar hvorfor denne forbedringen vil være nyttig

### Sende Pull Requests
1. Fork prosjektet
2. Opprett en ny branch fra `master`:
   ```bash
   git checkout -b feature/din-nye-funksjon
   ```
3. Gjør endringene dine
4. Commit med beskrivende meldinger:
   ```bash
   git commit -m "feat: legg til ny funksjonalitet"
   ```
5. Push til din fork:
   ```bash
   git push origin feature/din-nye-funksjon
   ```
6. Opprett en Pull Request

## Utviklingsretningslinjer

### Kodestandard
- Bruk TypeScript for all ny kode
- Følg eksisterende kodestil
- Skriv beskrivende variabel- og funksjonsnavn
- Kommenter kompleks logikk
- Hold komponenter små og fokuserte

### Commit Meldinger
Følg disse formatene:
- `feat:` for nye funksjoner
- `fix:` for feilrettinger
- `docs:` for dokumentasjonsendringer
- `style:` for formatering/styling
- `refactor:` for koderefaktorering
- `test:` for testendringer
- `chore:` for vedlikeholdsoppgaver

### Testing
- Test endringene dine grundig lokalt
- Sjekk at eksisterende funksjonalitet ikke er påvirket
- Legg til nye tester for ny funksjonalitet

## Legge til Nye Komplimenter

### Retningslinjer for Komplimenter
1. Hold det positivt og respektfullt
2. Unngå støtende innhold
3. Følg eksisterende kategoristruktur
4. Test at formateringen er korrekt

### Prosess
1. Finn riktig språkfil i `public/data/`
2. Følg eksisterende JSON-struktur
3. Kjør normaliseringsscriptet:
   ```bash
   npm run normalize
   ```
4. Test at komplimentene vises korrekt i appen

## Hjelp og Kontakt

Hvis du har spørsmål eller trenger hjelp:
1. Sjekk eksisterende Issues
2. Opprett en ny Issue med "Spørsmål:" i tittelen
3. Vær tålmodig - vi er et lite team

## Lisens

Ved å bidra til prosjektet godtar du at bidragene dine vil være under samme lisens som prosjektet.
