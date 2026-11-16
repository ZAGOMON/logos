"""Check that every link in Logos' data files still works.

Usage:  python tools/check_links.py
        python tools/check_links.py --only gutenberg   (just one site)

Prints OK / BROKEN for each URL. Search links are skipped (they always work).
"""
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (Logos link checker)"


def collect():
    books = (ROOT / "data" / "books.js").read_text(encoding="utf-8")
    research = (ROOT / "data" / "research.js").read_text(encoding="utf-8")
    urls = {}
    for m in re.finditer(r'id: "([^"]+)".*?pg: (\d+|null), se: ("[^"]+"|null)', books, re.S):
        bid, pg, se = m.groups()
        if pg != "null":
            urls[f"https://www.gutenberg.org/ebooks/{pg}"] = f"book {bid} (Gutenberg)"
        if se != "null":
            urls["https://standardebooks.org/ebooks/" + se.strip('"')] = f"book {bid} (Standard Ebooks)"
    for m in re.finditer(r'sep: "([^"]+)"', books):
        urls[f"https://plato.stanford.edu/entries/{m.group(1)}/"] = "not-free list (SEP)"
    for m in re.finditer(r'id: "([^"]+)", type: "[^"]+", title: "[^"]+", url: ([^,]+),', research):
        rid, expr = m.groups()
        expr = expr.strip()
        if expr.startswith("SEP("):
            url = "https://plato.stanford.edu/entries/" + expr[5:-2] + "/"
        elif expr.startswith("IEP("):
            url = "https://iep.utm.edu/" + expr[5:-2] + "/"
        elif expr.startswith('"'):
            url = expr.strip('"')
        else:
            continue  # search links
        urls[url] = f"research {rid}"
    return urls


def check(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            body = r.read(4000).decode("utf-8", "ignore")
            if "Temporarily Down for Maintenance" in body:
                return "SITE DOWN"
            return "OK" if r.status < 400 else f"HTTP {r.status}"
    except urllib.error.HTTPError as e:
        return f"HTTP {e.code}"
    except Exception as e:  # noqa: BLE001
        return f"ERROR {type(e).__name__}"


def main():
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else ""
    urls = {u: w for u, w in collect().items() if only in u}
    bad = 0
    for url, where in sorted(urls.items()):
        status = check(url)
        if status != "OK":
            bad += 1
        print(f"{status:12} {where:45} {url}")
        time.sleep(0.4)  # be polite
    print(f"\n{len(urls)} links checked, {bad} not OK")


if __name__ == "__main__":
    main()
