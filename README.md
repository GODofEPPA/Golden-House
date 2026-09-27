# Golden House — nettside

Statisk nettside (ren HTML/CSS/JS, ingen build-steg) for Golden House, asiatisk takeaway i Sandnes.

## Åpne siden lokalt

Åpne `index.html` direkte i nettleseren, eller kjør en enkel lokal server fra prosjektmappen:

```bash
python3 -m http.server 8000
```

og gå til `http://localhost:8000`.

## Redigere menyen (Pages CMS)

Retter og priser er ikke lenger hardkodet i `meny.html` — de ligger i [data/menu.json](data/menu.json), og [scripts/build-menu.js](scripts/build-menu.js) bygger den faktiske HTML-en (menypunktene i `meny.html` og de tre synkroniserte prisene i "Menyhøydepunkter" på forsiden) ut fra den filen. Dette gjøres for å beholde ren, søkemotor-vennlig HTML uten å måtte redigere menyen for hånd.

**Slik redigerer restauranteieren menyen, uten å røre kode:**

1. Gå til [pagescms.org](https://pagescms.org) og logg inn med en GitHub-konto (eierens egen — se merknad om innlogging under).
2. Installer Pages CMS' GitHub App på dette repoet (`GODofEPPA/Golden-House`), med skrivetilgang kun til dette repoet.
3. Åpne repoet i [app.pagescms.org](https://app.pagescms.org) — konfigurasjonen i [.pages.yml](.pages.yml) gir et skjema med kategorier og retter (navn, pris, rettnummer, «Nyhet»-merke).
4. Endre og trykk «Save». Pages CMS committer endringen til `data/menu.json`.
5. GitHub Action-en i [.github/workflows/build-menu.yml](.github/workflows/build-menu.yml) kjører automatisk, bygger `meny.html`/`index.html` på nytt og committer dem. Etter ca. ett minutt er endringen live (forutsatt at hostingen redeployer på push, som GitHub Pages/Netlify/Cloudflare Pages alle gjør).

**Om innlogging:** ikke del din egen GitHub-konto med kunden — inviter kunden som *collaborator* på repoet med deres egen GitHub-konto i stedet, slik at du kan fjerne tilgangen igjen uten å bytte passord.

**Lokal testing:** etter å ha endret `data/menu.json` for hånd, kjør:

```bash
npm run build:menu
```

Ikke rediger innholdet mellom `<!-- MENU:...:START -->`/`<!-- MENU:...:END -->`-markørene i `meny.html` direkte — det blir overskrevet neste gang scriptet kjører.

## Sjekkliste før lansering (placeholders som må erstattes)

- [x] **Telefonnummer** — satt til `51 62 25 24` (`tel:+4751622524`)
- [x] **Postnummer** — bekreftet: `4318 Sandnes` for "Foren 2"
- [x] **E-postadresse** — satt til `goldenhouse@gmail.com`
- [x] **Kart** — kartet i `kontakt.html` og `index.html` bruker den bekreftede adressen "Foren 2, 4318 Sandnes" via Google Maps-embed
- [ ] **Domene** — `https://www.goldenhouse.no/` er placeholder brukt i canonical-tagger, Open Graph, sitemap.xml og robots.txt — oppdater til faktisk domene
- [x] **Meny og priser** — ekte meny (fra `Golden_House_meny_2025.xlsx`) ligger i `data/menu.json` og bygges inn i `meny.html`, med tre utvalgte retter som menyhøydepunkter i `index.html` (se "Redigere menyen" over)
- [ ] **Om oss-tekst** — historien/teksten i `om-oss.html` er eksempeltekst

## Bilder / illustrasjoner

Siden bruker en blanding av ekte foto og håndtegnede SVG-illustrasjoner (linjetegninger i gull/rødt/svart):

**Ekte foto** (i `images/`):
- Hero-bilde: `index.html` (`.hero-photo`, bruker `Bilde 13.jpg`)
- "Om Golden House"-bilde med sirkelmerke: `index.html` (`.om-photo` / `.om-badge`, bruker `Gemini_Generated_Image_db1qacdb1qacdb1q.jpg` — merk: KI-generert bilde, ikke et ekte foto av restauranten)

**Håndtegnede SVG-illustrasjoner** (raskt, lisensfritt, skalerer perfekt — kan byttes ut med ekte foto senere om ønskelig):
- Menyhøydepunkt-ikoner: `index.html` (`.dish-icon` i hvert kort)
- Illustrasjonspaneler: `om-oss.html` (`.illustration-panel`)

Menykategoriene i `meny.html` hadde tidligere egne strek-ikoner (`.category-icon`), men disse er fjernet for å unngå stilbrudd mot de nye fotoseksjonene — kategoriene bruker nå ren tekst, med plan om å legge til ekte matbilder senere.

## Struktur

```
index.html          Forside
meny.html            Meny
om-oss.html           Om oss
kontakt.html            Kontakt
404.html                Egendefinert 404-side
css/styles.css            Delt stilark (design-tokens, layout, komponenter)
js/main.js                 Mobilmeny, kart-flytting og live åpent/stengt-status
images/                      Bilde 13.jpg, Gemini_Generated_Image_...jpg (ekte foto), favicon.svg, og-image.svg (placeholder-grafikk)
data/menu.json                Retter og priser — redigeres via Pages CMS eller for hånd
scripts/build-menu.js          Bygger meny.html/index.html fra data/menu.json
.pages.yml                      Pages CMS-konfigurasjon (skjema for menyredigering)
.github/workflows/build-menu.yml  Bygger menyen på nytt automatisk ved endring
sitemap.xml, robots.txt, site.webmanifest
```

## Fargeprofil

- Svart: `#1a1512`
- Rødt: `#a3231f`
- Gull: `#c9a24b`
- Krem (bakgrunn): `#faf6ee`
