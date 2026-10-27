# ZICALA — Romanian proverbs

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 2.2.0 · **Last updated:** 2026-10-27

**Status:** stable · **Offline:** complete (no network requests)

Interface languages: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

A collection of 550 Romanian proverbs and sayings in a single HTML file: proverb of the day, random draw, search, favourites and SWOT / TOWS commentaries.

**Live:** https://chiuta.github.io/Zicala/

![Screenshot](screenshot.en.png)

## What it is

ZICALA is an offline ("without borders", trade-free) application: no account, no tracking, no network calls. The proverbs are grouped into 13 categories (11 thematic ones, "From the Hințescu collection (selection)" and "Other online collections (selection)").

## Features

- **Game of the day (2.0.0):** a matching game and a generated crossword built daily from the 550 proverbs; **kinships** (the same thought in the other 7 languages, plus close proverbs found automatically from the translations, flagged as editorial interpretation); printable cards; optional local daily notification.
- Proverb of the day: chosen deterministically from the local date; within a cycle of 550 days none is repeated.
- "Draw at random": goes through all the proverbs in random order (Fisher–Yates shuffle), with no repeats until the rounds are finished; "Copy" button.
- **Search by theme (2.1.0):** the search box also matches the *name of the theme* (in Romanian and in the interface language) for the 11 thematic categories: typing "patience", "family" or "răbdare" lists the proverbs of that theme as well as those containing the word. The category list and the "Kinships" panel (the same thought in the other 7 languages) already existed.
- **Search by collection (2.2.0):** the box also matches the names of the two source collections: typing "hintescu" lists exactly the selection from the Hințescu collection, "culegeri online" (or "collection" in English) the "Other online collections" selection. The search hint now says "a word, a theme or a collection".
- Word search (all words must appear), insensitive to diacritics and letter case: "tacerea" finds "Tăcerea".
- Filter by category and by favourites; list displayed progressively (60 rows, "Show more").
- Favourites (★) and your own proverbs (add/delete), saved locally.
- Export of favourites and additions to a text file and import of the same file (adds, does not replace).
- "Copy" on every proverb in the list; text size A− / A+ (4 steps, remembered locally); keyboard shortcuts: `/` for search, `R` for "Draw at random" (not triggered while you are typing in a field).
- Printing: "Print list" (or Ctrl/Cmd+P) prints the whole currently filtered list (for example only the favourites), in black and white, without buttons.
- For each proverb, a "SWOT / TOWS" panel (editorial interpretation, see below).

## Sources of the proverbs (bibliographic record)

- **Hințescu category:** I. C. Hințescu, *Proverbele româniloru*, Sibiu, Editura și tiparulu tipografiei eredei de Closius, 1877, VIII + 210 p. (record of the Cluj Central University Library digital repository, https://dspace.bcucluj.ro/handle/123456789/78917, checked on 2026-10-27). The text in the app was taken from ro.wikisource.org with updated spelling; **which edition that transcription follows was not checked** (to be verified).
- **"Other online collections" category:** the exact source of each proverb is not recorded (general sources: ppli.ie, digitalpedia.ro, Enciclopedia comunei Șerbănești, proverbesicitate.blogspot.com, adevarul.ro). No edition or author is attributed.
- **First 11 categories:** a basic collection from the oral tradition; no source is attributed. Folk proverbs are anonymous.
- The same record appears in the app ("Sources, rights and a warning…", 8 languages).

## User guide

1. Open the page; the "Proverb of the day" appears at the top.
2. Press "Draw at random" for a random proverb; "Favourite" saves it.
3. Type one or more words in "Search"; choose the category or "Favourites" from the lists.
4. Press "SWOT / TOWS" next to a proverb to open or close the commentary.
5. Type a proverb in "Add a proverb of your own" and press "Add" (or Enter); "Delete" appears only on your own proverbs.
6. "Export favourites and additions" downloads `zicala-export.txt`; "Import (the exported file)" reloads it (for example in another browser).
7. "Copy" copies a proverb; A− / A+ changes the text size; "Print list" prepares the page for the printer (first choose "Favourites" to print only the favourites).

## Privacy and network

- Storage: `localStorage` (keys `zicala.zf` for favourites, `zicala.zm` for added proverbs, `zicala.zs` for text size), if the browser allows it; otherwise the app works but does not keep the data and warns you. No cookies, `sessionStorage` or IndexedDB are used.
- Network: no external calls. The page has a CSP policy (`default-src 'none'`, scripts only by hash, no `'unsafe-inline'` for scripts) that blocks any external connection or resource. The names of the sites in the "Sources" section are plain text, not links.
- Browser permissions: none.

## Limits and warnings

- The proverbs themselves are given in the original Romanian. The SWOT / TOWS commentaries exist in all 8 languages (all 549 analyses translated); the translations are automatic, **not verified by native speakers**, and the commentaries touching on money, health, children's safety or alcohol (and a few on death or mourning) **need specialist review**; the app adds no advice.
- **SWOT / TOWS are editorial interpretations**, generated with AI assistance, as an exercise in reflection. They are not paremiological or historical sources; the meaning, the origin ("biblical", "Latin") and the attributions may be inaccurate. They do not replace medical, legal or financial advice.
- The collection is not exhaustive. For the "Other online collections" category the exact source of each proverb is not recorded (general sources: ppli.ie, digitalpedia.ro, Enciclopedia comunei Șerbănești, proverbesicitate.blogspot.com, adevarul.ro). The "Hințescu" category comes from I. C. Hințescu, *Proverbele românilor* (via ro.wikisource.org, updated spelling).
- Folk proverbs are anonymous, from the oral tradition; the commentaries and arrangements of some modern collections may be protected. For corrections or withdrawals: alexio@trom.tf.
- Some old proverbs contain stereotypes or outdated language; they are kept as documents of the language, not as exhortations.

## Running locally / offline

Download `index.html` and open it in a browser; it needs no server or internet.

## License

The license has not been declared yet.

## History / Changelog

Full changelog: [`CHANGELOG.md`](CHANGELOG.md).

### 2.1.0 — 2026-10-27 (previous: v2.0.0)
- New: search by theme; bibliographic record of the Hințescu collection in the "Sources" section (8 languages); search placeholder updated.

- 1.2.8 — 2026-10-23: audit: the interface language is now stored under `zicala.lang` (it used the unprefixed key `lang`, shared by every app on the same `chiuta.github.io` origin); an existing `lang` value is still read once as a fallback and is not deleted. `zicala.zf`, `zicala.zm` and `zicala.lang` are now declared in `storageKeys`.
- 1.2.7 — 2026-10-23: fff-kit 1.2.0: the browser keys now carry the `zicala.` prefix (`zf` → `zicala.zf`, `zm` → `zicala.zm`, `zs` → `zicala.zs`); the old ones are migrated automatically at start-up (also after importing an old .fff.json backup), so favourites, added proverbs and text size are kept. The leftover availability-probe key `z` is no longer written (and is removed if present). The Romanian dictionary now has the `edRo` message too (dictionaries are symmetric in all 8 languages).
- 1.2.5 — 2026-10-22: fff-kit 1.1.4: touch targets and minimum text size; touch targets/text fixed
- 1.2.4 — 2026-10-22: fff-kit 1.1.2: PBKDF2 600,000 iterations, anti-clickjacking protection.
- 1.2.3 — 2026-10-22: **fix**: the “Copy” button now follows the selected language.
- 1.2.2 — 2026-10-19: all 549 SWOT / TOWS analyses are translated into en, fr, it, es, pt, de, hu; the notes no longer say that the rest stays in Romanian. The proverbs remain in Romanian.

- 1.1.0 — 2026-10-14: Backup and data labelling (fff-kit).

- 1.0.0 — 2026-10-12: the version and the date of the last update are shown in the app (first numbered version; in the info card below the list).

Round 7:
- **Import:** the "Import (the exported file)" button reads `zicala-export.txt` (the `FAVORITE` and `ADĂUGATE DE MINE` sections) and **adds** the favourites (only for proverbs existing in the collection or just imported) and the new proverbs of your own; it deletes nothing, ignores duplicates, respects the limits (8–300 characters, file ≤ 200 KB) and shows how many were added/skipped. Previously, the export could not be reloaded (data could not be moved between browsers). CSP hash recalculated; axe-core = 0 violations at 1280 and 360 px.
- The content (proverbs, SWOT/TOWS) was not modified.

Round 6:
- New: "Copy" on every row, A− / A+, shortcuts `/` and `R`, "Print list" with print styling. CSP: the script is now allowed by hash instead of `'unsafe-inline'`. The SWOT/TOWS panels use `h3` (correct heading order); the category list no longer overflows the 360 px screen with enlarged text. Screenshot refreshed.
- Routine check: axe-core = 0 violations at 1280 and 360 px, 0 JS errors, no horizontal overflow; the proverb of the day is computed from the local date, so it needs no updating. No code changes.

## Author

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## Summary

ZICALA is a single-file, offline collection of 550 Romanian proverbs: daily proverb, random draw (Fisher–Yates), diacritic-insensitive search, favorites and user-added proverbs (localStorage, with graceful fallback). It makes no network requests (strict CSP) and requests no permissions. The per-proverb SWOT/TOWS panels are editorial, AI-assisted interpretations, not scholarly sources. Source attribution is general; per-item provenance is not recorded. No license declared yet.
