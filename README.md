# Kiukambers — Band-Website

Website der Band **Kiukambers** (Toni – E-Bass, Una – E-Gitarre, Marta – Akkordeon,
Sina – Cello). Rock/Punk-Look mit den Farben vom Flyer: Sticker-Titel,
Mauszeiger wie bei offspring.com in Neongrün (Plasma-Energiekugel + Punkt).

Reine statische Website (HTML + CSS + ein kleines JS, keine Build-Tools) — direkt auf GitHub Pages hostbar.

## Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | Home: Titelbild |
| `uebersicht.html` | Übersicht: kurze Vorschau aller Bereiche |
| `band.html` | Die Band |
| `aktuelles.html` | Aktuelles (Liste aller Einträge) |
| `kontakt.html` | Kontakt |
| `aktuelles/*.html` | Je eine Seite pro Aktuelles-Eintrag |
| `style.css` | Design, Farben, Schriften |
| `script.js` | Plasma-Mauszeiger, beweglicher Titel |
| `KIUKAMBERS.png` | Flyer Schlagzeugerin-Suche |
| `favicon.svg`, `img/apple-touch-icon.png` | Icon im Browser-Tab / auf dem Handy-Homescreen |
| `img/og.jpg` | Vorschaubild beim Teilen des Links |
| `img/band.jpg` | Bandfoto auf der Startseite |
| `img/toni.jpg` … `img/sina.jpg` | Profilbilder der Bandmitglieder |

Schriften werden über Google Fonts geladen (Lilita One, Permanent Marker, Rubik).

## Bandfoto

Das Foto der Band liegt als `img/band.jpg` und erscheint als
Hintergrund hinter dem Sticker-Titel. Am besten ein Querformat-Bild, mindestens
etwa 2000 px breit. Zum Austauschen einfach eine neue Datei mit gleichem Namen speichern.

## Neuen Aktuelles-Eintrag hinzufügen

1. Eine Seite in `aktuelles/` kopieren (z. B. `naechstes-konzert.html`) und Text anpassen.
2. In `aktuelles.html` im Bereich `id="aktuelles"` einen `<li>`-Block kopieren,
   Datum/Titel/Text anpassen und auf die neue Seite verlinken (neueste Einträge zuoberst).
3. Optional: In `uebersicht.html` den gezeigten neusten Eintrag ersetzen.

## Lokal anschauen

Einfach `index.html` im Browser öffnen — oder mit einem kleinen Server:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Auf GitHub Pages veröffentlichen

1. Ein neues Repository auf GitHub erstellen (z. B. `kiukambers`).
2. Die Dateien hochladen:

   ```bash
   cd kiukambers
   git init
   git add .
   git commit -m "Kiukambers Website"
   git branch -M main
   git remote add origin https://github.com/<DEIN-USERNAME>/kiukambers.git
   git push -u origin main
   ```

3. Auf GitHub: **Settings → Pages**.
4. Bei **Source** → *Deploy from a branch*, Branch **`main`** / Ordner **`/ (root)`**, dann **Save**.
5. Nach kurzer Zeit ist die Seite unter
   `https://<DEIN-USERNAME>.github.io/kiukambers/` erreichbar.

## Anpassen

- **Texte:** direkt in der jeweiligen Seite (`band.html`, `kontakt.html`, …).
- **Farben & Schriften:** ganz oben im `style.css` unter `:root` (CSS-Variablen).
