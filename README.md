# Logos

A small web app for going deep into philosophy:

1. **Library**: 58 public-domain classics (Plato to Wittgenstein, East and West). Search and filter by author, era, school and topic, track your reading status, and keep notes.
2. **Research**: hand-picked entries from the Stanford Encyclopedia of Philosophy (SEP), the Internet Encyclopedia of Philosophy (IEP), public-domain classic papers, and open-access journals.
3. **Debates**: 9 big questions (free will, God, mind, morality, ethics, identity, meaning, the state, knowledge). Each side is steelmanned with arguments, objections and replies. Take a stand, set your confidence, face the devil's advocate, answer the hard questions, then follow the reading list.

**Live:** https://zagomon.github.io/logos/

## Free and legal only

- Books link to Project Gutenberg, Standard Ebooks, Wikisource and Internet Archive (public-domain items).
- Modern classics still under copyright (Camus, Sartre, Rawls, Heidegger, Beauvoir, Arendt, Parfit…) are **not** included. The app lists them with a link to the free SEP entry instead.
- "Public domain" here means public domain in the US. Rules differ by country.

## Privacy

No accounts, no server, no tracking, no AI. Reading status and notes are saved only in your own browser (localStorage). Use **My notes → Back up** to save a copy, or **Export Markdown** to drop your notes into Obsidian.

## Run it locally

Just double-click `index.html`. Or, for a local server:

```bash
python -m http.server 8321
```

then open http://localhost:8321

## Add content

All content lives in plain JavaScript data files, no build step:

- `data/books.js`: books (`pg` = Project Gutenberg ebook number, `se` = Standard Ebooks path)
- `data/research.js`: research links
- `data/debates.js`: debates (positions, arguments, objections, sharpen questions, reading lists)

After editing, check every link still works:

```bash
python tools/check_links.py
```
