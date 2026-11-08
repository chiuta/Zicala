# Jurnal de modificări — ZICALA

## 2.2.3 — 2026-11-08
Doar documentare: README (8 limbi) — licența e MIT (există `LICENSE`), nu «nedeclarată».

## 2.2.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.2.0 — 2026-10-27

Anterior: v2.1.0. Recenzie 2 (2026-10-27).

- Căutare după culegere: câmpul de căutare potrivește acum și numele celor două culegeri-sursă (rămăseseră excluse în 2.1.0): „hintescu” listează exact selecția Hințescu, „culegeri online” selecția „Alte culegeri online” (în limba interfeței: de ex. „collection”). Doar numele culegerii; nu se atribuie nicio sursă proverbelor individuale.
- Textul de ghidaj al căutării („cuvânt, temă sau culegere”) în 8 limbi (fr/it/es/pt/de/hu asistate de AI, neverificate de vorbitori nativi).
- Test nou `tests/cautare-culegere.test.mjs`. Hash-ul CSP recalculat; versiunea aliniată.
- README: EN/RO actualizate; fr/it/es/pt/de/hu doar versiunea și data.

Nu s-a implementat: corespondențe suplimentare în alte limbi (nu există surse verificabile pentru echivalente noi; panoul „Înrudiri” din 2.0.0 rămâne cum era); sursă per proverb pentru „Alte culegeri online” (nu e înregistrată); licență (autorul nu a declarat-o).

## 2.1.0 — 2026-10-27

Anterior: v2.0.0. Recenzie 2026-10-27.

- Nou: căutare după temă. Câmpul de căutare potrivește și numele temei (română + limba interfeței) pentru cele 11 categorii tematice (categoriile „Hințescu”, „Alte culegeri” și proverbele proprii nu se potrivesc după nume). Test manual: „rabdare” → 13 rezultate, „familie” → 6.
- Surse: fișă bibliografică pentru culegerea Hințescu în secțiunea „Surse, drepturi și avertisment” (cheia `srcP4`, 8 limbi): I. C. Hințescu, *Proverbele româniloru*, Sibiu, tipografia eredei de Closius, 1877, VIII + 210 p., după înregistrarea BCU Cluj (dspace.bcucluj.ro, verificată la 27.10.2026). Ediția după care urmează transcrierea de pe ro.wikisource.org rămâne neverificată și este marcată astfel.
- Textul de ghidaj al câmpului de căutare („cuvânt sau temă”) în 8 limbi.
- README (EN/RO): „Stare: stabil”, „Offline: complet”, secțiunea „Sursele proverbelor”.
- Hash-ul CSP al scriptului principal recalculat; versiunea aliniată (`app.json`, `fff-info`, `sw.js`, subsol).

Nu s-a implementat: corespondențe suplimentare în alte limbi (panoul „Înrudiri” cu cele 7 limbi există deja din 2.0.0); atribuirea unei surse pentru fiecare proverb din „Alte culegeri online” (sursa exactă nu e înregistrată și nu a putut fi stabilită); atribuiri de proverbe nevalidate.
