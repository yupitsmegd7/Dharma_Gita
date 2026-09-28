# Dharma · धर्म

A manuscript-inspired companion for reading, reflecting on, and practicing teachings from the Bhagavad Gita.

## Included

- All 18 chapters and 701 verse entries in Sanskrit, romanization, Hindi and English. This numbering includes Arjuna's opening question in chapter 13; an edition note explains the familiar 700-verse count.
- Search, chapter and verse navigation, three translation display modes, and direct links to IIT Kanpur's Gita Supersite.
- 18 editorial chapter summaries and examples, with 33 focused verse reflections. Other verses explicitly show chapter-level context rather than invented verse commentary.
- Eight curated question-to-reading paths with an explanation for every step in their order. Local keyword/theme matching; no generative AI or API key.
- Mantras is the third sidebar section: 54 complete mantra and prayer passages, 14 feeling/situation filters, multilingual search, direct entry links, source links, and four reading modes. Sanskrit, IAST transliteration, Hindi and English meanings are included.
- A customizable seven-session habit practice, stored only in the current browser.
- Eight Mahabharata/Ramayana character studies, nine selected Mahabharata roles, 21 source-linked formation/deployment studies with army filters, and an introduction to six scriptural families.
- Responsive styling, semantic controls, keyboard access, reduced-motion support and optional WebMCP tool registration.

## Run locally

Serve `dist` with any static HTTP server. For example:

```sh
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Do not open the HTML through `file://`, because the reader loads the bundled `gita.json` using fetch.

## Sources and editorial boundaries

The site includes a full Sources & Approach page and passage-level links. The question sequences, modern examples and habit exercises are editorial applications, not quoted scripture. The formation drawings are conceptual diagrams, not proven ancient battle plans. The illustration is contemporary AI-generated art inspired by miniature painting, not an archival medieval painting.

Reader data comes from https://github.com/gita/gita under the repository's Unlicense. Translator attribution is retained. English: Swami Sivananda. Hindi: Swami Ramsukhdas, except 13.1, which uses Swami Tejomayananda because no Ramsukhdas translation is provided for that entry.

Pinned upstream Git blob references:

- `data/verse.json`: `7442434baa609e3fc85f6dd90a4124f0b8bb6ccf`
- `archive/translation_old.json`: `cd1da7b2be03ea7c4259ed499342418961208468`
- `LICENSE`: `fdddb29aa445bf3d6a5d843d6dd77e10a9f99657`

The original translation archive is deliberately used instead of the AI-corrected archive/current rewritten translations. Text is joined by `verse_id`, not the misleading globally numbered `verseNumber` property. Whitespace is trimmed for display; attributed wording is retained. The repository license is included in `data/LICENSE-gita.txt` and `dist/dataset-license.txt`.

Epic sources: K. M. Ganguli's Mahabharata (Internet Sacred Text Archive), IIT Kanpur's Valmiki Ramayanam, and D. C. Rao / Hindu American Foundation's introductory scripture guide. Numbering varies across editions and commentary traditions differ. These sources establish textual provenance, not empirical proof of every narrative or metaphysical claim.

## Structure

- `dist/index.html` — entry point and metadata
- `dist/app.js` — application views, local state and interactions
- `dist/content.js` — curated lessons and citations
- `dist/mantras.js` — 54 complete passages, source metadata, editorial meanings and IAST transliteration
- `dist/mantras-view.js` — mantra search, feeling filters and reader
- `dist/mantras.css` — responsive styles for the new section
- `dist/gita.json` — complete reader corpus
- `dist/style.css` — responsive manuscript theme
- `dist/assets/krishna-arjuna.webp` — original illustration
- `data/` — original retrieved corpus and provenance

## Verification

Validated sequential unique references and required language fields for all 701 entries. All 701 reader views render. DOM integration checks cover language switching, search, route boundaries, eight question paths, no-match handling, input escaping, practice saving/editing/cancel/progress, character filters, 21 formation studies and all navigation sections. WebMCP tool handlers and invalid inputs were checked in the DOM harness. A live browser layout check and native WebMCP-context validation were unavailable in the static preview environment; these checks are not claimed.

Key guided verses were spot-checked against Gita Supersite. The dataset has not received a complete scholarly proofreading; digitization errors may remain. The source links are supplied for comparison.

## Mantra collection

The collection has 6 Vedic mantras, 11 Upanishadic mantras or invocations, 36 traditional prayer verses, and 1 Bhagavad Gita verse used in prayer. These labels prevent devotional verses being falsely attributed to the Vedas. Complete means the complete selected verse or named prayer unit; it does not mean a complete longer hymn or Upanishad. The Asato Ma entry, for example, includes all three petitions, not the surrounding prose of Brihadaranyaka 1.3.28.

Ancient Sanskrit verse wording was compared with the linked source transcriptions and prayer anthology. Orthographic spacing and punctuation are normalized; Vedic pitch marks are not reproduced. Variant recensions and devotional claims are identified in entry notes where applicable. Modern anthology translations are not imported: the Hindi and English plain-language meanings are editorial renderings. Topic matching and practical reflections are also editorial, not promises of outcomes or ritual prescriptions. This is not a critically edited scholarly edition.

Mantra verification checks all 54 full Sanskrit renderings and required language/source fields, all 14 topic categories, language selection, multilingual and diacritic-insensitive search, type filtering, empty-result reset, escaped input, previous/next boundaries, direct hash links, saved language and the exact sidebar position. The existing Gita flows also pass the DOM regression harness. Browser rendering remains outside that harness.

## Motion, contact and expanded formations

`dist/motion.js` supplies 24-piece Sudarshan Chakra assembly at both page edges, direction-aware page turns, and left/right navigation in the Gita and mantra readers. Keyboard shortcuts ignore editable fields, selects, modifier keys and an open mobile menu. Animated duplicate pages are inert and hidden from assistive technology, then removed. Reduced-motion readers get immediate transitions and a static chakra. The generated transparent artwork is `dist/assets/sudarshan-chakra.webp`; styles and the scoped mantra hover correction are in `dist/enhancements.css`. The footer links to Gourav Dutta’s supplied Instagram and LinkedIn profiles.

`dist/formations.js` extends the original four records to 21 studies, keeping original citation indices stable. It covers named forms, compound-array components, and descriptions from Ganguli’s Bhishma, Drona, Karna and Shalya books. Both-army examples retain distinct occurrence-level sources and positions. Asura/Pishacha/Rakshasa styles and Madhyama are not assigned unsupported geometric plans. Descriptive all-facing and ocean imagery are distinguished from formally named arrays. The catalogue is scoped to this translation; popular names and exact day assignments are not imported without support.

The formation passages were compared against SriPedia/Internet Sacred Text Archive and the complete public-domain Ganguli war books in Project Gutenberg 15475 and 15476. Retrieved Gutenberg text blobs: volume 2 `51d5851e1a2af761ead542cac705270bbf24db39`; volume 3 `4d47c25b1e33ca302bdcd450a34293019d723c5d`. Drona section LXXXVII uses different mirror filenames: SriPedia `m07083.htm`, current Sacred Text Archive `m07084.htm`; citations use the section heading.

Update verification includes every formation and side filter, both chakra placements on every route, exact contact targets, arrow navigation and guards, boundary handling, page-turn direction and cleanup, rapid navigation, inert/hidden page copies and reduced-motion behavior. Existing 701 Gita entry and 54 mantra checks pass. These are DOM/state checks, not browser layout measurements; the static profile has no supported supervised visual preview.

The header chakra is centered independently of the side links. Header and footer share the generated burgundy/gold mythological frieze in `dist/assets/mythic-frieze.webp`; mobile navigation is aligned below the revised header. Scripture content and navigation behavior are unchanged by this decorative update.
