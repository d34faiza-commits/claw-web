"""Bangun ulang latar ilustrasi 4K berlapis ke public/scenes/*.webp.

    python3 scripts/scenes/build.py

Butuh Python 3 + Pillow dan Node + Playwright (Chromium). Output: <adegan>-<lapis>-{1920,3840}.webp.
"""
import os
import subprocess
import sys
import tempfile

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "..", "public", "scenes"))
sys.path.insert(0, HERE)

import reception_desk  # noqa: E402
import villa_lounge  # noqa: E402

SCENES = {"villa-lounge": villa_lounge, "reception-desk": reception_desk}


def main():
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        names = []
        for scene, mod in SCENES.items():
            sc = mod.build()
            for layer in sc.parts:
                name = f"{scene}-{layer}"
                open(os.path.join(tmp, f"{name}.svg"), "w").write(sc.svg(layer))
                names.append(name)
        subprocess.run(["node", os.path.join(HERE, "render.cjs"), tmp, *names], check=True)
        for name in names:
            im = Image.open(os.path.join(tmp, f"{name}.png")).convert("RGBA")
            for w in (3840, 1920):
                img = im if w == 3840 else im.resize((w, w * 9 // 16), Image.LANCZOS)
                dst = os.path.join(OUT, f"{name}-{w}.webp")
                img.save(dst, "WEBP", quality=86, method=6)
                print(f"{os.path.relpath(dst)}  {os.path.getsize(dst) // 1024} KB")


if __name__ == "__main__":
    main()
