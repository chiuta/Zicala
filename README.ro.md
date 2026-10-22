# ZICALA — proverbe românești

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versiune:** 1.2.5 · **Ultima actualizare:** 2026-10-22

Limbile interfeței: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Colecție de 550 de proverbe și zicători românești într-un singur fișier HTML: proverbul zilei, tras la sorți, căutare, favorite și comentarii SWOT / TOWS.

**Live:** https://chiuta.github.io/Zicala/

![Captura de ecran](screenshot.ro.png)

## Ce este

ZICALA este o aplicație offline („fără frontiere”, trade-free): fără cont, fără urmărire, fără apeluri de rețea. Proverbele sunt grupate în 13 categorii (11 tematice, „Din culegerea Hințescu (selecție)” și „Alte culegeri online (selecție)”).

## Funcții

- Proverbul zilei: ales determinist după data locală; într-un ciclu de 550 de zile nu se repetă niciunul.
- „Trage la sorți”: parcurge toate proverbele în ordine aleatorie (amestecare Fisher–Yates), fără repetări până se termină tururile; buton „Copiază”.
- Căutare pe cuvinte (toate cuvintele trebuie să apară), insensibilă la diacritice și la majuscule: „tacerea” găsește „Tăcerea”.
- Filtru pe categorie și pe favorite; listă afișată progresiv (60 de rânduri, „Arată încă”).
- Favorite (★) și proverbe proprii (adăugare/ștergere), salvate local.
- Export al favoritelor și adăugirilor într-un fișier text și import al aceluiași fișier (adaugă, nu înlocuiește).
- „Copiază” pe fiecare proverb din listă; mărimea textului A− / A+ (4 trepte, memorată local); scurtături de tastatură: `/` pentru căutare, `R` pentru „Trage la sorți” (nu se declanșează când scrii într-un câmp).
- Tipărire: „Tipărește lista” (sau Ctrl/Cmd+P) tipărește toată lista filtrată curentă (de exemplu doar favoritele), alb-negru, fără butoane.
- Pentru fiecare proverb, un panou „SWOT / TOWS” (interpretare editorială, vezi mai jos).

## Manual de utilizare

1. Deschide pagina; „Proverbul zilei” apare sus.
2. Apasă „Trage la sorți” pentru un proverb aleatoriu; „Favorit” îl salvează.
3. Scrie în „Caută” unul sau mai multe cuvinte; alege categoria sau „Favorite” din liste.
4. Apasă „SWOT / TOWS” lângă un proverb pentru a deschide sau închide comentariul.
5. Scrie un proverb în „Adaugă un proverb al tău” și apasă „Adaugă” (sau Enter); „Șterge” apare doar la proverbele tale.
6. „Exportă favoritele și adăugirile” descarcă `zicala-export.txt`; „Importă (fișierul exportat)” îl reîncarcă (de exemplu într-un alt browser).
7. „Copiază” copiază un proverb; A− / A+ schimbă mărimea textului; „Tipărește lista” pregătește pagina pentru imprimantă (alege mai întâi „Favorite” pentru a tipări doar favoritele).

## Confidențialitate și rețea

- Storage: `localStorage` (cheile `zf` pentru favorite, `zm` pentru proverbele adăugate, `zs` pentru mărimea textului), dacă browserul îl permite; altfel aplicația funcționează, dar nu păstrează datele și te avertizează. Nu se folosesc cookie-uri, `sessionStorage` sau IndexedDB.
- Rețea: niciun apel extern. Pagina are o politică CSP (`default-src 'none'`, scripturi doar pe bază de hash, fără `'unsafe-inline'` pentru script) care blochează orice conexiune sau resursă externă. Numele site-urilor din secțiunea „Surse” sunt doar text, nu linkuri.
- Permisiuni ale browserului: niciuna.

## Limite și avertismente

- Proverbele în sine sunt date în română, limba originală. Comentariile SWOT / TOWS există în toate cele 8 limbi (toate cele 549 de analize sunt traduse); traducerile sunt automate, **neverificate de vorbitori nativi**, iar comentariile care ating bani, sănătate, siguranța copiilor sau alcool (și câteva despre moarte sau doliu) **necesită revizie de specialitate**; aplicația nu adaugă niciun sfat.
- **SWOT / TOWS sunt interpretări editoriale**, generate asistat de AI, ca exercițiu de reflecție. Nu sunt surse paremiologice sau istorice; sensul, originea („biblică”, „latină”) și atribuirile pot fi inexacte. Nu înlocuiesc sfatul medical, juridic sau financiar.
- Colecția nu este exhaustivă. Pentru categoria „Alte culegeri online” sursa exactă a fiecărui proverb nu este înregistrată (surse generale: ppli.ie, digitalpedia.ro, Enciclopedia comunei Șerbănești, proverbesicitate.blogspot.com, adevarul.ro). Categoria „Hințescu” provine din I. C. Hințescu, *Proverbele românilor* (via ro.wikisource.org, ortografie actualizată).
- Proverbele populare sunt anonime, din tradiția orală; comentariile și aranjările unor culegeri moderne pot fi protejate. Pentru corecții sau retrageri: alexio@trom.tf.
- Unele proverbe vechi conțin stereotipuri sau limbaj depășit; sunt păstrate ca documente de limbă, nu ca îndemnuri.

## Rulare locală / offline

Descarcă `index.html` și deschide-l în browser; nu are nevoie de server sau de internet.

## Licență

Licența nu este încă declarată.

## Istoric / Changelog

- 1.2.5 — 2026-10-22: fff-kit 1.1.4: ținte tactile și text minim; ținte tactile/text corectate
- 1.2.4 — 2026-10-22: fff-kit 1.1.2: PBKDF2 600 000 de iterații, protecție anti-clickjacking.
- 1.2.3 — 2026-10-22: **remediere**: butonul „Copiază” urmează acum limba aleasă.
- 1.2.2 — 2026-10-19: toate cele 549 de analize SWOT / TOWS sunt traduse în en, fr, it, es, pt, de, hu; notele nu mai spun că restul rămâne în română. Proverbele rămân în română.

- 1.1.0 — 2026-10-14: Copie de rezervă și etichetare date (fff-kit).

- 1.0.0 — 2026-10-12: versiunea și data ultimei actualizări sunt afișate în aplicație (prima versiune numerotată; în cardul informativ de sub listă).

Runda 7:
- **Import:** butonul „Importă (fișierul exportat)” citește `zicala-export.txt` (secțiunile `FAVORITE` și `ADĂUGATE DE MINE`) și **adaugă** favoritele (doar pentru proverbe existente în colecție sau tocmai importate) și proverbele proprii noi; nu șterge nimic, ignoră duplicatele, respectă limitele (8–300 de caractere, fișier ≤ 200 KB) și afișează câte au fost adăugate/omise. Înainte, exportul nu putea fi reîncărcat (datele nu se puteau muta între browsere). Hash-ul CSP recalculat; axe-core = 0 violări la 1280 și 360 px.
- Conținutul (proverbe, SWOT/TOWS) nu a fost modificat.

Runda 6:
- Nou: „Copiază” pe fiecare rând, A− / A+, scurtături `/` și `R`, „Tipărește lista” cu stil de tipărire. CSP: scriptul este acum permis prin hash în loc de `'unsafe-inline'`. Panourile SWOT/TOWS folosesc `h3` (ordine corectă a titlurilor); lista de categorii nu mai depășește ecranul de 360 px la text mărit. Captura de ecran reîmprospătată.
- Verificare de rutină: axe-core = 0 violări la 1280 și 360 px, 0 erori JS, fără depășire orizontală; proverbul zilei se calculează din data locală, deci nu necesită actualizare. Fără modificări de cod.

## Autor

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## Rezumat

ZICALA este o colecție offline, într-un singur fișier, de 550 de proverbe românești: proverbul zilei, extragere aleatorie (Fisher–Yates), căutare insensibilă la diacritice, favorite și proverbe adăugate de utilizator (localStorage, cu rezervă elegantă). Nu face cereri de rețea (CSP strict) și nu cere permisiuni. Panourile SWOT/TOWS pentru fiecare proverb sunt interpretări editoriale, asistate de AI, nu surse academice. Atribuirea surselor este generală; proveniența fiecărui element nu este înregistrată. Nicio licență declarată încă.
