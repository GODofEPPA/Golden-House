# Golden House — nettside

Statisk nettside (ren HTML/CSS/JS, ingen build-steg) for Golden House, asiatisk takeaway i Sandnes.

## Åpne siden lokalt

Åpne `index.html` direkte i nettleseren, eller kjør en enkel lokal server fra prosjektmappen:

```bash
python3 -m http.server 8000
```

og gå til `http://localhost:8000`.

## Sjekkliste før lansering (placeholders som må erstattes)

- [x] **Telefonnummer** — satt til `51 62 25 24` (`tel:+4751622524`)
- [x] **Postnummer** — bekreftet: `4318 Sandnes` for "Foren 2"
- [x] **E-postadresse** — satt til `goldenhouse@gmail.com`
- [x] **Kart** — kartet i `kontakt.html` og `index.html` bruker den bekreftede adressen "Foren 2, 4318 Sandnes" via Google Maps-embed
- [ ] **Domene** — `https://www.goldenhouse.no/` er placeholder brukt i canonical-tagger, Open Graph, sitemap.xml og robots.txt — oppdater til faktisk domene
- [ ] **Meny og priser** — eksempelretter i `meny.html` og menyhøydepunkter i `index.html` må erstattes med ekte meny
- [ ] **Om oss-tekst** — historien/teksten i `om-oss.html` er eksempeltekst

## Bilder / illustrasjoner

Siden bruker en blanding av ekte foto og håndtegnede SVG-illustrasjoner (linjetegninger i gull/rødt/svart):

**Ekte foto** (i `images/`):
- Hero-bilde: `index.html` (`.hero-photo`, bruker `Bilde 13.jpg`)
- "Om Golden House"-bilde med sirkelmerke: `index.html` (`.om-photo` / `.om-badge`, bruker `Gemini_Generated_Image_db1qacdb1qacdb1q.jpg` — merk: KI-generert bilde, ikke et ekte foto av restauranten)

**Håndtegnede SVG-illustrasjoner** (raskt, lisensfritt, skalerer perfekt — kan byttes ut med ekte foto senere om ønskelig):
- Menyhøydepunkt-ikoner: `index.html` (`.dish-icon` i hvert kort)
- Illustrasjonspaneler: `om-oss.html` (`.illustration-panel`)

Menykategoriene i `meny.html` hadde tidligere egne strek-ikoner (`.category-icon`), men disse er fjernet for å unngå stilbrudd mot de nye fotoseksjonene — kategoriene bruker nå ren tekst, med plan om å erstatte dem med ekte matbilder når den ekte menyen er klar.

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
sitemap.xml, robots.txt, site.webmanifest
```

## Fargeprofil

- Svart: `#1a1512`
- Rødt: `#a3231f`
- Gull: `#c9a24b`
- Krem (bakgrunn): `#faf6ee`
