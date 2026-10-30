#!/usr/bin/env python3
"""Produce resumable local translations for the workbook's extracted paragraphs."""
import json
import pathlib
import re
import argostranslate.translate

root = pathlib.Path(__file__).resolve().parent.parent
source = json.loads((root / 'workbook-originals.json').read_text())
path = root / 'workbook-translations.json'
translations = json.loads(path.read_text()) if path.exists() else {}
for chapter in source:
    for page in chapter['pages']:
        for index, raw in enumerate(page['text'].split('\n')):
            text = raw.strip()
            key = f"{page['page']}:{index}"
            if not text or key in translations or not re.search(r'[A-Za-z]', text):
                continue
            translations[key] = argostranslate.translate.translate(text, 'en', 'zh')
        path.write_text(json.dumps(translations, ensure_ascii=False, indent=2) + '\n')
        print(f"PDF page {page['page']} complete; {len(translations)} segments", flush=True)
