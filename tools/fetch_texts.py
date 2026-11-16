"""Download the full text of every Library book into texts/<id>.html,
so Logos can show them in its built-in reader (and offline).

Usage (from the repo root):
    python -I tools/fetch_texts.py            # fetch anything missing
    python -I tools/fetch_texts.py --force    # re-fetch everything
    python -I tools/fetch_texts.py plato-republic kant-groundwork   # just these

Source priority per book: Standard Ebooks > Wikisource (ws) > Project Gutenberg (pg).
Raw downloads are cached in .cache/raw/ (git-ignored). Output HTML is sanitized
to a small allowlist of tags (no scripts, links, images or attributes), and the
Project Gutenberg license header/footer is removed, as Gutenberg permits for
public-domain texts. Writes data/texts.js, the list of downloaded books.
"""
import html
import urllib.error
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / ".cache" / "raw"
OUT = ROOT / "texts"
UA = "Logos-reader/1.0 (personal philosophy study app; github.com/ZAGOMON/logos)"
DELAY = 3  # seconds between requests: be polite to volunteer-run sites

ALLOWED = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "em", "i", "strong", "b", "br", "hr",
           "ol", "ul", "li", "table", "thead", "tbody", "tr", "td", "th", "sup", "sub", "pre", "cite", "dl", "dt", "dd"}
VOID = {"br", "hr"}
SKIP_TAGS = {"script", "style", "head", "nav", "noscript", "svg", "math", "img", "figure", "audio", "video", "iframe", "form", "button", "input"}
SKIP_CLASS = re.compile(r"pg-boilerplate|pgheader|pgfooter|wst-header|ws-noexport|noprint|mw-editsection|pagenum|ws-pagenum|reference|mw-cite-backlink|licenseContainer|wst-license", re.I)
SKIP_ID = re.compile(r"^(pg-header|pg-footer|pg-machine-header|pg-start-separator|pg-end-separator)$", re.I)
SKIP_EPUB = re.compile(r"imprint|colophon|copyright-page|toc|loi|backlink", re.I)


class Cleaner(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip_depth = 0
        self.stack = []  # (tag, skipping, emitted)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        skipping = self.skip_depth > 0 or tag in SKIP_TAGS \
            or SKIP_CLASS.search(a.get("class") or "") or SKIP_ID.match(a.get("id") or "") \
            or SKIP_EPUB.search(a.get("epub:type") or a.get("data-epub-type") or "")
        if tag in VOID:
            if not skipping and tag in ALLOWED:
                self.out.append(f"<{tag}>")
            return
        emitted = not skipping and tag in ALLOWED
        if skipping:
            self.skip_depth += 1
        if emitted:
            self.out.append(f"<{tag}>")
        self.stack.append((tag, skipping, emitted))

    def handle_startendtag(self, tag, attrs):
        if tag in VOID and self.skip_depth == 0:
            self.out.append(f"<{tag}>")

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        # pop to the matching tag (HTML in the wild is not always well-formed)
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                for t, skipping, emitted in reversed(self.stack[i:]):
                    if emitted:
                        self.out.append(f"</{t}>")
                    if skipping:
                        self.skip_depth -= 1
                del self.stack[i:]
                return

    def handle_data(self, data):
        if self.skip_depth == 0:
            self.out.append(html.escape(data, quote=False))


def clean_html(raw):
    c = Cleaner()
    c.feed(raw)
    c.close()
    text = "".join(c.out)
    # Older Gutenberg files: cut everything outside the START/END markers
    m = re.search(r"\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG EBOOK[^*]*\*\*\*", text, re.I)
    if m:
        text = text[m.end():]
    m = re.search(r"\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG EBOOK", text, re.I)
    if m:
        text = text[:m.start()]
    text = re.sub(r"<(p|h\d|li|blockquote|em|i|b|strong)>\s*</\1>", "", text)  # empty tags
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    # unclosed tags at a cut point are harmless: the browser closes them
    return text.strip()


def get(url, tries=5):
    path = RAW / (re.sub(r"[^A-Za-z0-9._-]+", "_", url)[-180:])
    if path.exists() and path.stat().st_size > 2000:
        return path.read_text(encoding="utf-8", errors="replace")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read().decode("utf-8", errors="replace")
            break
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == tries - 1:
                raise
            wait = int(e.headers.get("Retry-After") or 0) or 20 * (attempt + 1)
            print(f"        rate-limited, waiting {wait}s")
            time.sleep(min(wait, 120))
    if "Temporarily Down for Maintenance" in body[:3000]:
        raise RuntimeError("site down for maintenance")
    path.write_text(body, encoding="utf-8")
    time.sleep(DELAY)
    return body


def wikisource(pages):
    parts = []
    for page in pages:
        api = "https://en.wikisource.org/w/api.php?" + urllib.parse.urlencode(
            {"action": "parse", "page": page, "prop": "text", "format": "json", "formatversion": 2, "disablelimitreport": 1})
        data = json.loads(get(api))
        title = page.split("/")[-1] if "/" in page else page
        parts.append(f"<h2>{html.escape(title.replace('_', ' '))}</h2>\n" + clean_html(data["parse"]["text"]))
    return "\n".join(parts)


def load_books():
    src = (ROOT / "data" / "books.js").read_text(encoding="utf-8")
    books = []
    for chunk in src.split("{ id: ")[1:]:
        field = lambda name, pat: (re.search(r"\b" + name + r": " + pat, chunk) or [None, None])[1]
        pg, se, part, ws = field("pg", r"(\d+|null)"), field("se", r'("[^"]+"|null)'), field("part", r'"([^"]+)"'), field("ws", r"(\[[^\]]*\])")
        books.append({"id": re.match(r'"([^"]+)"', chunk)[1], "pg": int(pg) if pg and pg != "null" else None,
                      "se": se.strip('"') if se and se != "null" else None, "part": part,
                      "ws": json.loads(ws) if ws else None})
    return books


def extract_section(raw, sec_id):
    """Return the full <section id=sec_id>...</section> (with nested sections) from an SE file."""
    start = raw.find(f'<section id="{sec_id}"')
    if start < 0:
        raise RuntimeError(f"section {sec_id} not found")
    depth = 0
    for m in re.finditer(r"<(/?)section\b", raw[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return raw[start:raw.find(">", start + m.end()) + 1]
    return raw[start:]


def fetch(book):
    if book["se"]:
        url = f"https://standardebooks.org/ebooks/{book['se']}"
        raw = get(url + "/text/single-page")
        if book["part"]:
            raw = extract_section(raw, book["part"])
        return clean_html(raw), "Standard Ebooks", url
    if book["ws"]:
        url = "https://en.wikisource.org/wiki/" + urllib.parse.quote(book["ws"][0].split("/")[0])
        return wikisource(book["ws"]), "Wikisource", url
    if book["pg"]:
        n = book["pg"]
        url = f"https://www.gutenberg.org/ebooks/{n}"
        try:
            raw = get(f"https://www.gutenberg.org/cache/epub/{n}/pg{n}-images.html")
        except urllib.error.HTTPError as e:
            if e.code != 404:
                raise
            raw = get(f"https://www.gutenberg.org/cache/epub/{n}/pg{n}.txt")
            paras = [p.strip() for p in re.split(r"\r?\n\s*\r?\n", raw) if p.strip()]
            raw = "".join("<p>" + html.escape(re.sub(r"\s*\r?\n\s*", " ", p)) + "</p>" for p in paras)
        return clean_html(raw), "Project Gutenberg", url
    raise RuntimeError("no download source (needs a pg, se or ws entry)")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    force = "--force" in sys.argv
    RAW.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(exist_ok=True)
    manifest_path = ROOT / "data" / "texts.js"
    manifest = {}
    if manifest_path.exists():
        m = re.search(r"=\s*(\{.*\});", manifest_path.read_text(encoding="utf-8"), re.S)
        if m:
            manifest = json.loads(m.group(1))
    books = load_books()
    ok, failed = 0, []
    for b in books:
        if args and b["id"] not in args:
            continue
        target = OUT / f"{b['id']}.html"
        if target.exists() and b["id"] in manifest and not force:
            ok += 1
            continue
        try:
            body, source, url = fetch(b)
            words = len(re.sub(r"<[^>]+>", " ", body).split())
            if words < 500:
                raise RuntimeError(f"only {words} words, looks wrong")
            target.write_text(body, encoding="utf-8")
            manifest[b["id"]] = {"source": source, "url": url, "words": words}
            ok += 1
            print(f"OK      {b['id']:28} {source:18} {words:>8,} words")
        except Exception as e:  # noqa: BLE001
            failed.append(b["id"])
            print(f"FAILED  {b['id']:28} {type(e).__name__}: {e}")
        manifest_path.write_text("// Generated by tools/fetch_texts.py: books downloaded into texts/\nwindow.LOGOS_TEXTS = "
                                 + json.dumps(dict(sorted(manifest.items())), indent=1, ensure_ascii=False) + ";\n", encoding="utf-8")
    print(f"\n{ok} books downloaded, {len(failed)} failed" + (": " + ", ".join(failed) if failed else ""))


if __name__ == "__main__":
    main()
