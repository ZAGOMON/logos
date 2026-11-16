/* Logos: a tiny single-page app. No build step, no server, no tracking.
   Your data lives in localStorage under "logos.v1". */
(function () {
  "use strict";

  const BOOKS = window.LOGOS_BOOKS || [];
  const NOT_FREE = window.LOGOS_NOT_FREE || [];
  const RESEARCH = window.LOGOS_RESEARCH || [];
  const DEBATES = window.LOGOS_DEBATES || [];
  const TEXTS = window.LOGOS_TEXTS || {}; // books downloaded into texts/ (see tools/fetch_texts.py)
  const bookById = Object.fromEntries(BOOKS.map((b) => [b.id, b]));
  const resById = Object.fromEntries(RESEARCH.map((r) => [r.id, r]));
  const debateById = Object.fromEntries(DEBATES.map((d) => [d.id, d]));

  const ERAS = ["Ancient", "Medieval", "Renaissance & Early Modern", "Enlightenment", "19th Century", "20th Century"];
  const ERA_COLORS = { "Ancient": "#b5832a", "Medieval": "#6b4f8a", "Renaissance & Early Modern": "#2f5a7a",
    "Enlightenment": "#3f6b4e", "19th Century": "#8c3b2b", "20th Century": "#4a4a4a" };
  const STATUS = { want: "Want to read", reading: "Reading", finished: "Finished" };

  // ---------- Storage ----------
  const KEY = "logos.v1";
  const blank = () => ({ books: {}, research: {}, debates: {}, version: 1 });
  let store = blank();
  try { store = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { /* private mode etc. */ }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); return true; }
    catch (e) { toast("Couldn't save (browser storage is blocked)"); return false; }
  }
  const bookState = (id) => (store.books[id] = store.books[id] || {});
  const resState = (id) => (store.research[id] = store.research[id] || {});
  const debState = (id) => (store.debates[id] = store.debates[id] || { answers: {} });

  // ---------- Helpers ----------
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yearLabel = (y) => (y < 0 ? Math.abs(y) + " BCE" : String(y));
  const uniq = (arr) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const main = $("#main");

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function sourcesFor(b) {
    const q = encodeURIComponent(b.title + " " + b.author.split("(")[0]);
    const list = [];
    if (b.se) list.push({ name: "Standard Ebooks", note: "Beautiful free edition (EPUB, Kindle)", url: "https://standardebooks.org/ebooks/" + b.se });
    if (b.pg) list.push({ name: "Project Gutenberg", note: "Read online, EPUB, Kindle", url: "https://www.gutenberg.org/ebooks/" + b.pg });
    else list.push({ name: "Project Gutenberg", note: "Search", url: "https://www.gutenberg.org/ebooks/search/?query=" + q });
    list.push({ name: "Wikisource", note: "Search", url: "https://en.wikisource.org/w/index.php?search=" + q });
    list.push({ name: "Internet Archive", note: "Search (pick public-domain scans)", url: "https://archive.org/search?query=" + q + "&and%5B%5D=mediatype%3A%22texts%22" });
    return list;
  }

  // debounce-save textarea into a state object
  function bindNote(el, getObj, field, hintEl) {
    let t;
    el.addEventListener("input", () => {
      clearTimeout(t);
      if (hintEl) hintEl.textContent = "Saving…";
      t = setTimeout(() => {
        const obj = getObj();
        obj[field] = el.value;
        obj.updated = Date.now();
        if (save() && hintEl) hintEl.textContent = "Saved";
      }, 400);
    });
  }

  // daily question: same for everyone on a given day
  function dailyQuestion() {
    const all = [];
    DEBATES.forEach((d) => d.sharpen.forEach((q) => all.push({ q, d })));
    const day = Math.floor(Date.now() / 86400000);
    return all[day % all.length];
  }

  // ---------- Views ----------
  function viewHome() {
    const s = { want: 0, reading: 0, finished: 0 };
    Object.values(store.books).forEach((b) => { if (s[b.status] !== undefined) s[b.status]++; });
    const stands = Object.values(store.debates).filter((d) => d.lean).length;
    const reading = BOOKS.filter((b) => store.books[b.id] && store.books[b.id].status === "reading");
    const dq = dailyQuestion();
    const starters = ["plato-apology", "russell-problems", "aurelius-meditations", "epictetus-enchiridion"].map((id) => bookById[id]).filter(Boolean);

    main.innerHTML = `
      <section class="hero">
        <div>
          <div class="eyebrow">λόγος · reason, word, argument</div>
          <h1>Go <em>deep</em> into philosophy.</h1>
          <p class="lede">A library of free classics, a shelf of serious research, and debates that won't let you off easy.</p>
          <div class="btn-row">
            <a class="btn primary" href="#/debates">Pick a debate</a>
            <a class="btn" href="#/library">Browse the library</a>
          </div>
        </div>
        <div class="card question-card">
          <div class="eyebrow">Question of the day</div>
          <p class="q">${esc(dq.q)}</p>
          <a href="#/debate/${dq.d.id}">From the debate: ${esc(dq.d.title)} →</a>
        </div>
      </section>

      <section class="stats">
        <div class="card stat"><b>${BOOKS.length}</b><span>free books</span></div>
        <div class="card stat"><b>${s.reading}</b><span>reading now</span></div>
        <div class="card stat"><b>${s.finished}</b><span>finished</span></div>
        <div class="card stat"><b>${stands}/${DEBATES.length}</b><span>debates where you took a stand</span></div>
      </section>

      ${reading.length ? `
      <section class="section">
        <div class="section-head"><h2>Continue reading</h2><a href="#/library?status=reading">All</a></div>
        <div class="grid">${reading.map(bookCard).join("")}</div>
      </section>` : `
      <section class="section">
        <div class="section-head"><h2>Good places to start</h2><a href="#/library">Full library</a></div>
        <div class="grid">${starters.map(bookCard).join("")}</div>
      </section>`}

      <section class="section">
        <div class="pillars">
          <a class="card pillar" href="#/library"><div class="num">I.</div><h3>Library</h3><p>${BOOKS.length} public-domain classics from Plato to Wittgenstein, East and West. Filter by era, school and topic. Track what you read and keep notes.</p></a>
          <a class="card pillar" href="#/research"><div class="num">II.</div><h3>Research</h3><p>${RESEARCH.length} hand-picked entries from the Stanford and Internet Encyclopedias, classic papers, and open-access journals.</p></a>
          <a class="card pillar" href="#/debates"><div class="num">III.</div><h3>Debates</h3><p>${DEBATES.length} big questions, each side steelmanned. Take a stand, face the devil's advocate, then read your way out.</p></a>
        </div>
      </section>`;
  }

  const readMins = (words) => { const m = Math.round(words / 230); return m < 90 ? m + " min" : Math.round(m / 60) + " h"; };
  const progressOf = (id) => Math.round(((store.books[id] || {}).pos || 0) * 100);

  function bookCard(b) {
    const st = store.books[b.id] && store.books[b.id].status;
    const pct = progressOf(b.id);
    return `
      <a class="card book" href="#/book/${b.id}">
        <div class="spine" style="background:${ERA_COLORS[b.era] || "#999"}"></div>
        <h3>${esc(b.title)}</h3>
        <div class="author">${esc(b.author)} · ${yearLabel(b.year)}</div>
        <div class="sum">${esc(b.summary)}</div>
        <div class="meta">
          <div>${TEXTS[b.id] ? `<span class="tag good" title="Full text inside Logos">📖 Read here</span>` : ""}${b.schools.slice(0, 1).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          ${st ? `<span class="status-pill status-${st}">${STATUS[st]}${st === "reading" && pct ? " · " + pct + "%" : ""}</span>` : ""}
        </div>
      </a>`;
  }

  function viewLibrary(params) {
    const authors = uniq(BOOKS.map((b) => b.author));
    const schools = uniq(BOOKS.flatMap((b) => b.schools));
    const topics = uniq(BOOKS.flatMap((b) => b.topics));
    const f = {
      q: params.get("q") || "", era: params.get("era") || "", school: params.get("school") || "",
      topic: params.get("topic") || "", tradition: params.get("tradition") || "", status: params.get("status") || "",
      author: params.get("author") || "", sort: params.get("sort") || "year", here: params.get("here") === "1"
    };
    const opt = (list, val, label) => `<option value="">${label}</option>` + list.map((x) => `<option ${x === val ? "selected" : ""}>${esc(x)}</option>`).join("");

    main.innerHTML = `
      <div class="page-head">
        <div class="eyebrow">I · Library</div>
        <h1>The Library</h1>
        <p>Every book here is in the public domain and free to read. Click a book to see where to read it, where to start, and to keep notes.</p>
      </div>
      <div class="filters" role="search">
        <input class="search" id="q" type="search" placeholder="Search title, author, topic…" value="${esc(f.q)}" aria-label="Search books">
        <select id="era" aria-label="Era">${opt(ERAS, f.era, "All eras")}</select>
        <select id="tradition" aria-label="Tradition">${opt(["Western", "Eastern"], f.tradition, "East & West")}</select>
        <select id="school" aria-label="School">${opt(schools, f.school, "All schools")}</select>
        <select id="topic" aria-label="Topic">${opt(topics, f.topic, "All topics")}</select>
        <select id="author" aria-label="Author">${opt(authors, f.author, "All authors")}</select>
        <select id="status" aria-label="Reading status">
          <option value="">Any status</option>
          ${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${k === f.status ? "selected" : ""}>${v}</option>`).join("")}
          <option value="none" ${f.status === "none" ? "selected" : ""}>Not started</option>
        </select>
        <select id="sort" aria-label="Sort">
          <option value="year" ${f.sort === "year" ? "selected" : ""}>Oldest first</option>
          <option value="author" ${f.sort === "author" ? "selected" : ""}>By author</option>
          <option value="title" ${f.sort === "title" ? "selected" : ""}>By title</option>
        </select>
        <label class="btn"><input type="checkbox" id="here" ${f.here ? "checked" : ""}> 📖 Readable here</label>
      </div>
      <div class="count" id="count"></div>
      <div class="grid" id="books"></div>

      <section class="notfree">
        <h2>Not free (yet): modern classics</h2>
        <p class="muted">These are still under copyright, so they can't be included legally. Read the free encyclopedia entry instead, or borrow the book from your public library (the free Libby app works with most library cards).</p>
        <table>
          <thead><tr><th>Book</th><th class="hide-sm">Author</th><th>Free alternative</th></tr></thead>
          <tbody>${NOT_FREE.map((n) => `<tr><td><i>${esc(n.title)}</i> <span class="muted">(${n.year})</span><div class="muted" style="font-size:.85rem">${esc(n.author)}</div></td><td class="hide-sm">${esc(n.author)}</td><td><a href="https://plato.stanford.edu/entries/${n.sep}/" target="_blank" rel="noopener">SEP entry ↗</a></td></tr>`).join("")}</tbody>
        </table>
      </section>`;

    const render = () => {
      const q = norm(f.q.trim());
      let list = BOOKS.filter((b) => {
        const st = (store.books[b.id] || {}).status;
        if (f.era && b.era !== f.era) return false;
        if (f.tradition && b.tradition !== f.tradition) return false;
        if (f.school && !b.schools.includes(f.school)) return false;
        if (f.topic && !b.topics.includes(f.topic)) return false;
        if (f.author && b.author !== f.author) return false;
        if (f.here && !TEXTS[b.id]) return false;
        if (f.status === "none" && st) return false;
        if (f.status && f.status !== "none" && st !== f.status) return false;
        if (q) {
          const hay = norm([b.title, b.author, b.era, b.summary, ...b.schools, ...b.topics].join(" "));
          if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
        }
        return true;
      });
      list.sort(f.sort === "author" ? (a, b) => a.author.localeCompare(b.author) || a.year - b.year
        : f.sort === "title" ? (a, b) => a.title.localeCompare(b.title) : (a, b) => a.year - b.year);
      $("#count").textContent = `${list.length} of ${BOOKS.length} books`;
      $("#books").innerHTML = list.length ? list.map(bookCard).join("") : `<div class="empty">No books match. Try clearing a filter.</div>`;
      // keep filters in the URL so links are shareable and Back works
      const p = new URLSearchParams();
      Object.entries(f).forEach(([k, v]) => { if (v && !(k === "sort" && v === "year")) p.set(k, v === true ? "1" : v); });
      const qs = p.toString();
      history.replaceState(null, "", "#/library" + (qs ? "?" + qs : ""));
    };
    $("#q").addEventListener("input", (e) => { f.q = e.target.value; render(); });
    ["era", "tradition", "school", "topic", "author", "status", "sort"].forEach((k) =>
      $("#" + k).addEventListener("change", (e) => { f[k] = e.target.value; render(); }));
    $("#here").addEventListener("change", (e) => { f.here = e.target.checked; render(); });
    render();
  }

  function viewBook(id) {
    const b = bookById[id];
    if (!b) return notFound();
    const st = store.books[id] || {};
    const inDebates = DEBATES.filter((d) => d.books.includes(id));
    main.innerHTML = `
      <a class="back" href="#/library">← Library</a>
      <div class="detail">
        <article>
          <div class="eyebrow">${esc(b.era)} · ${yearLabel(b.year)} · ${esc(b.tradition)}</div>
          <h1>${esc(b.title)}</h1>
          <div class="by">${esc(b.author)}</div>
          <div>${b.schools.map((s) => `<a class="tag accent" href="#/library?school=${encodeURIComponent(s)}">${esc(s)}</a>`).join("")}${b.topics.map((t) => `<a class="tag" href="#/library?topic=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>
          <p style="margin-top:16px;font-size:1.05rem">${esc(b.summary)}</p>
          ${TEXTS[b.id] ? `<div class="read-cta">
            <a class="btn primary" href="#/read/${b.id}">📖 ${progressOf(id) ? "Continue reading (" + progressOf(id) + "%)" : "Read it here"}</a>
            <span class="muted">${TEXTS[b.id].words.toLocaleString()} words · about ${readMins(TEXTS[b.id].words)} · from ${esc(TEXTS[b.id].source)}</span>
          </div>` : `<p class="muted" style="margin-top:14px">Full text not downloaded into Logos yet. Use the free links on the right.</p>`}
          <div class="start"><b>Where to start:</b> ${esc(b.start)}</div>
          ${inDebates.length ? `<h3>Used in debates</h3><p>${inDebates.map((d) => `<a href="#/debate/${d.id}">${esc(d.title)}</a>`).join(" · ")}</p>` : ""}
          <h3 style="margin-top:24px">My notes</h3>
          <textarea id="notes" placeholder="Quotes, questions, disagreements… (saved in this browser)">${esc(st.notes || "")}</textarea>
          <div class="saved-hint" id="hint"></div>
        </article>
        <aside class="card">
          <h3>My status</h3>
          <div class="seg" role="group" aria-label="Reading status">
            ${Object.entries(STATUS).map(([k, v]) => `<button type="button" data-status="${k}" aria-pressed="${st.status === k}">${v}</button>`).join("")}
          </div>
          <h3>Read it free</h3>
          <div class="sources">
            ${sourcesFor(b).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.name)}<br><small>${esc(s.note)}</small></span><span aria-hidden="true">↗</span></a>`).join("")}
          </div>
          <p class="muted" style="font-size:.8rem;margin:8px 0 0">Public domain in the US. Copyright rules differ by country.</p>
        </aside>
      </div>`;

    $$(".seg button").forEach((btn) => btn.addEventListener("click", () => {
      const s = bookState(id);
      s.status = s.status === btn.dataset.status ? undefined : btn.dataset.status; // click again to clear
      if (!s.status) delete s.status;
      s.updated = Date.now();
      save();
      $$(".seg button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.status === s.status)));
      toast(s.status ? "Marked: " + STATUS[s.status] : "Status cleared");
    }));
    bindNote($("#notes"), () => bookState(id), "notes", $("#hint"));
  }

  // ---------- Reader ----------
  let readerCleanup = null;
  function viewReader(id) {
    const b = bookById[id];
    const meta = TEXTS[id];
    if (!b || !meta) return notFound();
    const st = bookState(id);
    const size = (() => { try { return +localStorage.getItem("logos.fontsize") || 20; } catch (e) { return 20; } })();
    main.innerHTML = `
      <div class="reader-bar">
        <a class="back" href="#/book/${id}" style="margin:0">← ${esc(b.title)}</a>
        <select id="toc" aria-label="Jump to section"><option value="">Contents…</option></select>
        <div class="btn-row">
          <button class="btn" type="button" id="smaller" aria-label="Smaller text">A−</button>
          <button class="btn" type="button" id="bigger" aria-label="Bigger text">A+</button>
        </div>
      </div>
      <div class="reader-progress" aria-hidden="true"><span id="prog"></span></div>
      <article class="reader" id="reader" style="font-size:${size}px">
        <header class="reader-head">
          <div class="eyebrow">${esc(b.era)} · ${yearLabel(b.year)}</div>
          <h1>${esc(b.title)}</h1>
          <div class="by">${esc(b.author)}</div>
          <p class="muted" style="font-size:.8rem;font-family:var(--sans)">Public-domain text from <a href="${esc(meta.url)}" target="_blank" rel="noopener">${esc(meta.source)}</a>. Your place is saved automatically.</p>
        </header>
        <div id="text"><p class="muted">Loading the book…</p></div>
        <footer class="reader-end">
          <p>You reached the end.</p>
          <button class="btn primary" type="button" id="finish">Mark as finished</button>
          <a class="btn" href="#/book/${id}">Write notes</a>
        </footer>
      </article>`;

    if (location.protocol === "file:") {
      $("#text").innerHTML = `<div class="empty">The reader needs the app to be opened from the website or a local server, not by double-clicking the file.<br>Run <code>python -m http.server 8321</code> in the Logos folder and open <a href="http://localhost:8321">localhost:8321</a>.</div>`;
      return;
    }

    fetch("texts/" + id + ".html").then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); }).then((htmlText) => {
      if (location.hash.split("?")[0] !== "#/read/" + id) return; // user navigated away
      const text = $("#text");
      text.innerHTML = htmlText; // our own sanitized file (tools/fetch_texts.py allowlist)
      // table of contents from headings
      const heads = $$("h2, h3", text).filter((h) => h.textContent.trim().length > 0 && h.textContent.trim().length < 120);
      heads.forEach((h, i) => { h.id = "s" + i; });
      $("#toc").innerHTML = `<option value="">Contents (${heads.length})…</option>` +
        heads.map((h, i) => `<option value="s${i}">${h.tagName === "H3" ? "  · " : ""}${esc(h.textContent.trim().replace(/\s+/g, " ").slice(0, 70))}</option>`).join("");
      $("#toc").style.display = heads.length > 1 ? "" : "none";

      const article = $("#reader");
      const top = () => article.getBoundingClientRect().top + window.scrollY;
      const frac = () => Math.min(1, Math.max(0, (window.scrollY - top()) / Math.max(1, article.offsetHeight - window.innerHeight)));
      // restore place
      if (st.pos) window.scrollTo(0, top() + st.pos * (article.offsetHeight - window.innerHeight));
      let t;
      const onScroll = () => {
        const f = frac();
        $("#prog").style.width = (f * 100).toFixed(1) + "%";
        clearTimeout(t);
        t = setTimeout(() => {
          st.pos = Math.round(f * 1000) / 1000;
          st.lastRead = Date.now();
          if (!st.status && f > 0.01) st.status = "reading";
          save();
        }, 500);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      readerCleanup = () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
      onScroll();
    }).catch(() => {
      $("#text").innerHTML = `<div class="empty">Couldn't load the book. If you're offline, open it once while online and it will be saved for next time.</div>`;
    });

    $("#toc").addEventListener("change", (e) => {
      const el = document.getElementById(e.target.value);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 110);
      e.target.value = "";
    });
    const setSize = (d) => {
      const art = $("#reader");
      const f = frac0();
      const s = Math.min(28, Math.max(15, parseInt(art.style.fontSize, 10) + d));
      art.style.fontSize = s + "px";
      try { localStorage.setItem("logos.fontsize", s); } catch (e) {}
      window.scrollTo(0, art.getBoundingClientRect().top + window.scrollY + f * (art.offsetHeight - window.innerHeight));
    };
    const frac0 = () => { const a = $("#reader"); const tp = a.getBoundingClientRect().top + window.scrollY; return Math.min(1, Math.max(0, (window.scrollY - tp) / Math.max(1, a.offsetHeight - window.innerHeight))); };
    $("#smaller").addEventListener("click", () => setSize(-1));
    $("#bigger").addEventListener("click", () => setSize(1));
    $("#finish").addEventListener("click", () => { st.status = "finished"; st.updated = Date.now(); save(); toast("Finished! Nice work."); });
  }

  function viewResearch(params) {
    const types = uniq(RESEARCH.map((r) => r.type));
    const topics = uniq(RESEARCH.flatMap((r) => r.topics));
    const f = { q: params.get("q") || "", type: params.get("type") || "", topic: params.get("topic") || "", saved: params.get("saved") === "1" };
    main.innerHTML = `
      <div class="page-head">
        <div class="eyebrow">II · Research</div>
        <h1>Research</h1>
        <p>Free, expert-written sources. Encyclopedia entries are the best way into any debate: start there, then go to the primary texts in the Library. Star what you want to come back to.</p>
      </div>
      <div class="filters" role="search">
        <input class="search" id="q" type="search" placeholder="Search research…" value="${esc(f.q)}" aria-label="Search research">
        <select id="type" aria-label="Type"><option value="">All types</option>${types.map((t) => `<option ${t === f.type ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
        <select id="topic" aria-label="Topic"><option value="">All topics</option>${topics.map((t) => `<option ${t === f.topic ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
        <label class="btn"><input type="checkbox" id="saved" ${f.saved ? "checked" : ""}> Starred only</label>
      </div>
      <div class="count" id="count"></div>
      <div class="res-list" id="list"></div>`;

    const typeClass = (t) => (t === "SEP" ? "SEP" : t === "IEP" ? "IEP" : t === "Classic paper" ? "paper" : "");
    const typeLabel = (t) => (t === "Classic paper" ? "PAPER" : t === "Open hub" ? "OPEN" : t);
    const render = () => {
      const q = norm(f.q.trim());
      const list = RESEARCH.filter((r) => {
        if (f.type && r.type !== f.type) return false;
        if (f.topic && !r.topics.includes(f.topic)) return false;
        if (f.saved && !(store.research[r.id] || {}).saved) return false;
        if (q && !q.split(/\s+/).every((w) => norm([r.title, r.note, r.type, ...r.topics].join(" ")).includes(w))) return false;
        return true;
      });
      $("#count").textContent = `${list.length} of ${RESEARCH.length} sources`;
      $("#list").innerHTML = list.length ? list.map((r) => {
        const saved = !!(store.research[r.id] || {}).saved;
        return `<div class="card res">
          <span class="res-type ${typeClass(r.type)}">${esc(typeLabel(r.type))}</span>
          <div>
            <h4><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a></h4>
            ${r.note ? `<p>${esc(r.note)}</p>` : ""}
            <div style="margin-top:6px">${r.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          </div>
          <button class="star" type="button" data-id="${r.id}" aria-pressed="${saved}" aria-label="Star ${esc(r.title)}" title="Star">${saved ? "★" : "☆"}</button>
        </div>`;
      }).join("") : `<div class="empty">Nothing matches.</div>`;
      $$(".star", $("#list")).forEach((btn) => btn.addEventListener("click", () => {
        const s = resState(btn.dataset.id);
        s.saved = !s.saved;
        save();
        btn.setAttribute("aria-pressed", String(s.saved));
        btn.textContent = s.saved ? "★" : "☆";
        toast(s.saved ? "Starred" : "Unstarred");
      }));
      const p = new URLSearchParams();
      if (f.q) p.set("q", f.q); if (f.type) p.set("type", f.type); if (f.topic) p.set("topic", f.topic); if (f.saved) p.set("saved", "1");
      history.replaceState(null, "", "#/research" + (p.toString() ? "?" + p : ""));
    };
    $("#q").addEventListener("input", (e) => { f.q = e.target.value; render(); });
    $("#type").addEventListener("change", (e) => { f.type = e.target.value; render(); });
    $("#topic").addEventListener("change", (e) => { f.topic = e.target.value; render(); });
    $("#saved").addEventListener("change", (e) => { f.saved = e.target.checked; render(); });
    render();
  }

  function viewDebates() {
    main.innerHTML = `
      <div class="page-head">
        <div class="eyebrow">III · Debates</div>
        <h1>Debates</h1>
        <p>Each debate lays out the strongest version of every side. Read them all before you choose. Then take a stand, face the devil's advocate, answer the hard questions, and follow the reading list.</p>
      </div>
      <div class="grid">${DEBATES.map((d) => {
        const st = store.debates[d.id] || {};
        const pos = st.lean != null && d.positions[st.lean];
        return `<a class="card debate-card" href="#/debate/${d.id}">
          <div>${d.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <h3 style="margin-top:8px">${esc(d.title)}</h3>
          <p>${esc(d.hook)}</p>
          ${pos ? `<div class="stance">✓ You lean: ${esc(pos.name)} (${st.confidence || 50}% sure)</div>` : `<div class="muted" style="font-size:.85rem">${d.positions.length} positions · not decided</div>`}
        </a>`;
      }).join("")}</div>`;
  }

  function viewDebate(id) {
    const d = debateById[id];
    if (!d) return notFound();
    const st = debState(id);
    let active = st.lean != null ? st.lean : 0;

    main.innerHTML = `
      <a class="back" href="#/debates">← Debates</a>
      <header class="debate-hero">
        <div>${d.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <h1 style="margin-top:8px">${esc(d.title)}</h1>
        <p class="hook">${esc(d.hook)}</p>
        <p class="setup">${esc(d.setup)}</p>
      </header>
      <div class="two-col">
        <div>
          <div class="tabs" role="tablist" aria-label="Positions">
            ${d.positions.map((p, i) => `<button type="button" role="tab" data-i="${i}" aria-selected="${i === active}">${esc(p.name)}${st.lean === i ? '<span class="mine" title="Your stance">★</span>' : ""}</button>`).join("")}
          </div>
          <div class="card position" id="pos" role="tabpanel"></div>

          <section class="card sharpen" style="margin-top:20px">
            <div class="eyebrow">Sharpen your thinking</div>
            <h3>Answer these honestly</h3>
            <ol>${d.sharpen.map((q, i) => `<li><p>${esc(q)}</p><textarea class="small" data-q="${i}" placeholder="Your answer…">${esc((st.answers || {})[i] || "")}</textarea></li>`).join("")}</ol>
            <div class="saved-hint" id="ansHint"></div>
          </section>
        </div>

        <aside class="sticky">
          <section class="card stand">
            <div class="eyebrow">Where do you stand?</div>
            ${d.positions.map((p, i) => `<label class="opt"><input type="radio" name="lean" value="${i}" ${st.lean === i ? "checked" : ""}> ${esc(p.name)}</label>`).join("")}
            <label for="conf" style="display:block;margin-top:12px;font-size:.88rem">How sure? <b id="confVal">${st.confidence || 50}%</b></label>
            <input type="range" id="conf" min="0" max="100" step="5" value="${st.confidence || 50}">
            <label for="why" style="display:block;margin-top:12px;font-size:.88rem">Why, in one or two sentences:</label>
            <textarea id="why" class="small" placeholder="My strongest reason is…">${esc(st.why || "")}</textarea>
            <div class="saved-hint" id="whyHint"></div>
            <button class="btn accent" type="button" id="devilBtn" style="margin-top:6px">😈 Devil's advocate</button>
            <div class="devil" id="devil" aria-live="polite"></div>
          </section>

          <section class="card reading" style="margin-top:16px">
            <div class="eyebrow">Read your way out</div>
            ${d.research.map((rid) => resById[rid]).filter(Boolean).map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗<small>${esc(r.type)}</small></a>`).join("")}
            ${d.books.map((bid) => bookById[bid]).filter(Boolean).map((b) => `<a href="#/book/${b.id}">${esc(b.title)}<small>${esc(b.author)} · Library</small></a>`).join("")}
          </section>
        </aside>
      </div>`;

    const renderPos = () => {
      const p = d.positions[active];
      $("#pos").innerHTML = `
        <p class="thesis">${esc(p.thesis)}</p>
        <div class="thinkers">Thinkers: ${p.thinkers.map(esc).join(", ")}</div>
        <h4>The case for it</h4>
        <ol class="args">${p.arguments.map((a) => `<li><b>${esc(a.claim)}</b><span>${esc(a.detail)}</span></li>`).join("")}</ol>
        <h4>Objections</h4>
        <p class="muted" style="font-size:.85rem">Try to answer each objection yourself before revealing the reply.</p>
        ${p.objections.map((o) => `<div class="obj"><div class="o">${esc(o.objection)}</div><details><summary>Show a reply</summary><div class="r">${esc(o.reply)}</div></details></div>`).join("")}`;
      $$(".tabs button").forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.i === active)));
    };
    $$(".tabs button").forEach((b) => b.addEventListener("click", () => { active = +b.dataset.i; renderPos(); }));
    renderPos();

    $$('input[name="lean"]').forEach((r) => r.addEventListener("change", () => {
      st.lean = +r.value; st.updated = Date.now(); save();
      $$(".tabs .mine").forEach((m) => m.remove());
      const tab = $(`.tabs button[data-i="${st.lean}"]`);
      tab.insertAdjacentHTML("beforeend", '<span class="mine" title="Your stance">★</span>');
      toast("Stance saved: " + d.positions[st.lean].name);
    }));
    $("#conf").addEventListener("input", (e) => { $("#confVal").textContent = e.target.value + "%"; });
    $("#conf").addEventListener("change", (e) => { st.confidence = +e.target.value; st.updated = Date.now(); save(); });
    bindNote($("#why"), () => st, "why", $("#whyHint"));
    $$("textarea[data-q]").forEach((ta) => {
      let t;
      ta.addEventListener("input", () => {
        clearTimeout(t); $("#ansHint").textContent = "Saving…";
        t = setTimeout(() => { st.answers = st.answers || {}; st.answers[ta.dataset.q] = ta.value; st.updated = Date.now(); if (save()) $("#ansHint").textContent = "Saved"; }, 400);
      });
    });

    // Devil's advocate: free, no AI. Pulls the hardest objections against your own side.
    let devilIdx = 0;
    $("#devilBtn").addEventListener("click", () => {
      const box = $("#devil");
      if (st.lean == null) {
        box.innerHTML = "Pick a side first. The devil needs a target.";
      } else {
        const mine = d.positions[st.lean];
        const pool = [
          ...mine.objections.map((o) => ({ text: o.objection, from: "An objection to your view" })),
          ...d.positions.filter((_, i) => i !== st.lean).flatMap((p) => p.arguments.map((a) => ({ text: a.claim + ": " + a.detail, from: "The " + p.name + " side says" })))
        ];
        const pick = pool[devilIdx++ % pool.length];
        box.innerHTML = `<b>${esc(pick.from)}:</b> ${esc(pick.text)}<div class="muted" style="margin-top:8px;font-size:.85rem">How do you answer that? Write it in your "why" above, or lower your confidence. Click again for another.</div>`;
      }
      box.classList.add("show");
    });
  }

  function viewNotes() {
    const bookNotes = BOOKS.filter((b) => (store.books[b.id] || {}).notes || (store.books[b.id] || {}).status);
    const debNotes = DEBATES.filter((d) => { const s = store.debates[d.id]; return s && (s.lean != null || s.why || Object.values(s.answers || {}).some(Boolean)); });
    const starred = RESEARCH.filter((r) => (store.research[r.id] || {}).saved);
    main.innerHTML = `
      <div class="page-head">
        <div class="eyebrow">My notes</div>
        <h1>My notes</h1>
        <p>Everything you've written, in one place. It's stored only in this browser, so back it up now and then. <b>Export Markdown</b> gives you a file you can drop straight into Obsidian.</p>
        <div class="btn-row">
          <button class="btn primary" id="md" type="button">Export Markdown (Obsidian)</button>
          <button class="btn" id="json" type="button">Back up (JSON)</button>
          <label class="btn" style="cursor:pointer">Restore backup<input type="file" id="imp" accept="application/json,.json" hidden></label>
        </div>
      </div>
      <section class="section">
        <h2>Debates</h2>
        ${debNotes.length ? debNotes.map((d) => { const s = store.debates[d.id]; return `<div class="card note-item"><h4><a href="#/debate/${d.id}">${esc(d.title)}</a></h4>
          ${s.lean != null ? `<p class="stance" style="margin:0 0 6px">Lean: ${esc(d.positions[s.lean].name)} · ${s.confidence || 50}% sure</p>` : ""}
          ${s.why ? `<pre>${esc(s.why)}</pre>` : ""}</div>`; }).join("") : `<p class="muted">No stances yet. <a href="#/debates">Pick a debate.</a></p>`}
      </section>
      <section class="section">
        <h2>Books</h2>
        ${bookNotes.length ? bookNotes.map((b) => { const s = store.books[b.id]; return `<div class="card note-item"><h4><a href="#/book/${b.id}">${esc(b.title)}</a> <span class="muted" style="font-weight:400">· ${esc(b.author)}</span> ${s.status ? `<span class="status-pill status-${s.status}">${STATUS[s.status]}</span>` : ""}</h4>${s.notes ? `<pre>${esc(s.notes)}</pre>` : ""}</div>`; }).join("") : `<p class="muted">No books tracked yet. <a href="#/library">Open the library.</a></p>`}
      </section>
      <section class="section">
        <h2>Starred research</h2>
        ${starred.length ? starred.map((r) => `<div class="card note-item"><h4><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a></h4></div>`).join("") : `<p class="muted">Nothing starred yet.</p>`}
      </section>`;

    const download = (name, text, type) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type }));
      a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    const today = new Date().toISOString().slice(0, 10);
    $("#json").addEventListener("click", () => download(`logos-backup-${today}.json`, JSON.stringify(store, null, 2), "application/json"));
    $("#md").addEventListener("click", () => download(`Logos notes ${today}.md`, toMarkdown(), "text/markdown"));
    $("#imp").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      file.text().then((txt) => {
        const data = JSON.parse(txt);
        if (!data || typeof data !== "object" || !data.books) throw new Error("bad file");
        if (!confirm("Replace your current notes with this backup?")) return;
        store = Object.assign(blank(), data);
        save(); toast("Backup restored"); viewNotes();
      }).catch(() => toast("That doesn't look like a Logos backup"));
    });
  }

  function toMarkdown() {
    const out = [`# Logos notes`, ``, `Exported ${new Date().toLocaleString()}`, ``, `## Debates`, ``];
    DEBATES.forEach((d) => {
      const s = store.debates[d.id];
      if (!s || (s.lean == null && !s.why && !Object.values(s.answers || {}).some(Boolean))) return;
      out.push(`### ${d.title}`);
      if (s.lean != null) out.push(`- **Lean:** ${d.positions[s.lean].name} (${s.confidence || 50}% sure)`);
      if (s.why) out.push(`- **Why:** ${s.why}`);
      d.sharpen.forEach((q, i) => { const a = (s.answers || {})[i]; if (a) out.push(``, `> ${q}`, ``, a); });
      out.push(``);
    });
    out.push(`## Books`, ``);
    BOOKS.forEach((b) => {
      const s = store.books[b.id];
      if (!s || (!s.notes && !s.status)) return;
      out.push(`### ${b.title} (${b.author})`);
      if (s.status) out.push(`- **Status:** ${STATUS[s.status]}`);
      if (s.notes) out.push(``, s.notes);
      out.push(``);
    });
    const starred = RESEARCH.filter((r) => (store.research[r.id] || {}).saved);
    if (starred.length) { out.push(`## Starred research`, ``); starred.forEach((r) => out.push(`- [${r.title}](${r.url})`)); }
    return out.join("\n");
  }

  function notFound() {
    main.innerHTML = `<div class="empty"><h2>Not found</h2><p><a href="#/">Go home</a></p></div>`;
  }

  // ---------- Router ----------
  function route() {
    const hash = location.hash.replace(/^#/, "") || "/";
    const [path, qs] = hash.split("?");
    const params = new URLSearchParams(qs || "");
    const parts = path.split("/").filter(Boolean);
    const section = parts[0] || "";
    if (readerCleanup) { readerCleanup(); readerCleanup = null; }
    document.body.classList.toggle("reading-mode", section === "read");
    $$(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === section || ((section === "book" || section === "read") && a.dataset.nav === "library") || (section === "debate" && a.dataset.nav === "debates")));
    if (!section) viewHome();
    else if (section === "library") viewLibrary(params);
    else if (section === "book") viewBook(parts[1]);
    else if (section === "read") viewReader(parts[1]);
    else if (section === "research") viewResearch(params);
    else if (section === "debates") viewDebates();
    else if (section === "debate") viewDebate(parts[1]);
    else if (section === "notes") viewNotes();
    else notFound();
    const titles = { library: "Library", book: (bookById[parts[1]] || {}).title, read: (bookById[parts[1]] || {}).title, research: "Research", debates: "Debates", debate: (debateById[parts[1]] || {}).title, notes: "My notes" };
    document.title = titles[section] ? titles[section] + " · Logos" : "Logos";
  }
  let lastPath = null;
  window.addEventListener("hashchange", () => {
    const path = location.hash.split("?")[0];
    const sameView = path === lastPath; // filter changes use replaceState and don't fire this
    lastPath = path;
    route();
    if (!sameView) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  });

  // ---------- Theme ----------
  const themeBtn = $("#themeToggle");
  try { const t = localStorage.getItem("logos.theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("logos.theme", next); } catch (e) {}
  });

  lastPath = location.hash.split("?")[0];
  route();

  // Offline support (only works on http/https, not when opened as a file)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
