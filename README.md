# Kiukambers — Band-Website

Website der Band **Kiukambers**: Toni (E-Bass), Una (E-Gitarre), Marta (Akkordeon)
und Sina (Cello). *Vier Mädchen. Eine Band. Always on tour.*

**Online:** https://tonibund.github.io/kiukambers/

Reine statische Website (HTML + CSS + ein kleines JavaScript, keine Build-Tools),
gehostet mit GitHub Pages.

## Seiten

| Seite | Inhalt |
|-------|--------|
| `index.html` | **Home:** Bandfoto mit Sticker-Titel und Spruch |
| `uebersicht.html` | **Übersicht:** Band, neuster News-Eintrag, Kontakt — je als Vorschau |
| `band.html` | **Band:** Einleitung und die vier Profile |
| `aktuelles.html` | **Aktuelles:** Liste aller News-Einträge |
| `kontakt.html` | **Kontakt:** WhatsApp |
| `aktuelles/*.html` | Eine eigene Seite pro News-Eintrag |
| `404.html` | Fehlerseite bei falscher Adresse (nutzt feste Pfade `/kiukambers/…`) |

## Weitere Dateien

| Datei | Zweck |
|-------|-------|
| `style.css` | Design, Farben, Schriften, Handy-Ansicht |
| `script.js` | Handy-Menü, Neon-Mauszeiger, Blitz-Effekt, beweglicher Titel |
| `img/band.jpg` | Bandfoto auf der Startseite |
| `img/toni.jpg`, `una.jpg`, `marta.jpg`, `sina.jpg` | Profilbilder |
| `img/og.jpg` | Vorschaubild beim Teilen des Links (1200 × 630) |
| `favicon.svg`, `favicon.ico`, `img/favicon-*.png`, `img/apple-touch-icon.png` | Icon im Browser-Tab und auf dem Handy-Homescreen |
| `KIUKAMBERS.png` | Flyer zur Schlagzeugerin-Suche |

Schriften liegen lokal in `fonts/` (keine Verbindung zu Google): Lilita One (Titel),
Permanent Marker (Handschrift), Rubik (Text). Lizenz: SIL Open Font License, siehe `fonts/LIZENZ.txt`.

## Effekte

- **Mauszeiger:** neongrüne Plasma-Kugel mit Punkt, die der Maus folgt (wie bei offspring.com).
  Nur am Computer; auf Touch-Geräten und bei „Bewegung reduzieren“ aus. Pausiert nach
  2,5 Sekunden Stillstand, um Akku zu sparen.
- **Blitz:** Klick auf „Kiukambers“ (Sticker-Titel, Schriftzug oben links, Fusszeile oder im Text)
  lässt einen neongrünen Blitz durch die Seite schlagen.
- **Handy:** Burger-Menü, auf der Startseite das ganze Bandfoto mit allen Gesichtern.

## Häufige Änderungen

### Text ändern
Direkt in der jeweiligen HTML-Datei, z. B. Bandprofile in `band.html`, Spruch in `index.html`.

### Neuen News-Eintrag hinzufügen
1. Eine Seite in `aktuelles/` kopieren (z. B. `naechstes-konzert.html`) und anpassen:
   `<title>`, die Beschreibung (`description`, `og:title`, `og:description`, `og:url`) und den Inhalt.
2. In `aktuelles.html` einen `<li>`-Block kopieren, Datum, Titel und Text anpassen und
   auf die neue Seite verlinken. Neuste Einträge zuoberst.
3. Optional: in `uebersicht.html` den gezeigten neusten Eintrag ersetzen.

### Bild austauschen
Neue Datei mit gleichem Namen in `img/` speichern.
- `band.jpg`: Querformat (3:2), mindestens etwa 1500 px breit.
- Profilbilder: quadratisch, etwa 320 × 320 px, Gesicht in der Mitte.

### Farben und Schriften
Ganz oben in `style.css` unter `:root`.

### Nach einer Änderung an `style.css` oder `script.js`
In allen HTML-Dateien die Versionsnummer erhöhen (z. B. `style.css?v=5` → `?v=6`),
damit Browser die neue Version sofort laden statt der zwischengespeicherten.

## Lokal anschauen

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Veröffentlichen

Änderungen committen und auf `main` pushen — GitHub Pages veröffentlicht automatisch,
nach etwa einer Minute ist die neue Version online.

```bash
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push
```

Das Repository gehört dem GitHub-Account **tonibund**; zum Pushen muss dieser Account angemeldet sein.
