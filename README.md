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
- [ ] **Domene** — `https://www.goldenhouse.no/` er placeholder brukt i canonical-tagger, Open Graph, sitemap.xml og robots.txt — oppdater til faktisk domene
- [ ] **Meny og priser** — eksempelretter i `meny.html` og menyhøydepunkter i `index.html` må erstattes med ekte meny
- [ ] **Om oss-tekst** — historien/teksten i `om-oss.html` er eksempeltekst

## Bilder / illustrasjoner

Siden bruker egne håndtegnede SVG-illustrasjoner (linjetegninger i gull/rødt/svart — sushi, wok, dumplings, skål med spisepinner osv.) i stedet for fotografier. Dette er et bevisst designvalg (raskt, lisensfritt, skalerer perfekt), ikke en midlertidig løsning — men de kan byttes ut med ekte restaurant-/matfoto senere om ønskelig:
- Hero-illustrasjon: `index.html` (`.hero-emblem`)
- Menykategori-ikoner: `meny.html` (`.category-icon` i hver `<h2>`)
- Menyhøydepunkt-ikoner: `index.html` (`.dish-icon` i hvert kort)
- Illustrasjonspaneler: `om-oss.html` (`.illustration-panel`)

Alle er inline SVG i HTML-filene (søk etter `<svg class="hero-emblem"`, `class="category-icon"`, `class="dish-icon"` eller `class="illustration-panel"`), så de er enkle å style om eller erstatte med `<img>`-tagger senere.
- [x] **Kart** — kartet i `kontakt.html` bruker den bekreftede adressen "Foren 2, 4318 Sandnes" via Google Maps-embed

## Struktur

```
index.html          Forside
meny.html            Meny
om-oss.html           Om oss
kontakt.html            Kontakt
css/styles.css            Delt stilark (design-tokens, layout, komponenter)
js/main.js                 Mobilmeny (hamburger-toggle)
images/                      favicon.svg, og-image.svg (placeholder-grafikk)
sitemap.xml, robots.txt, site.webmanifest
```

## Fargeprofil

- Svart: `#1a1512`
- Rødt: `#a3231f`
- Gull: `#c9a24b`
- Krem (bakgrunn): `#faf6ee`
# Golden-House
# Golden-House
# Golden-House
