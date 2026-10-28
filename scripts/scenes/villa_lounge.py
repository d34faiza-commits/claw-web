"""Hero: lounge villa Bali (4K, 3 lapis: far = pemandangan luar, room = interior, near = perabot depan).

Komposisi: sisi kiri lega untuk teks, area lantai kosong di kanan (x ≈ 2500–3400) untuk figur Tara.
Kedalaman dibuat dengan perspektif udara (jauh = pucat & kebiruan), bukan blur.
"""
from scenelib import COMMON_DEFS, Scene, banana, cloud, monstera, palm, rnd

WIN = (0, 300, 2520, 1260)  # x, y, w, h bukaan jendela


def build():
    s = Scene(["far", "room", "near"])
    s.defs.append(COMMON_DEFS)
    s.defs.append(
        """
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86c3e3"/><stop offset="0.55" stop-color="#cbe6ee"/><stop offset="1" stop-color="#f6e3c0"/></linearGradient>
<linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3bfbf"/><stop offset="1" stop-color="#bdd2c9"/></linearGradient>
<linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#76a088"/><stop offset="1" stop-color="#8fb394"/></linearGradient>
<linearGradient id="pool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86d8e2"/><stop offset="1" stop-color="#2a97ad"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d4c2c"/><stop offset="1" stop-color="#341c0f"/></linearGradient>
<linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ddd4c6"/><stop offset="1" stop-color="#f3eee5"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46301f"/><stop offset="0.5" stop-color="#2e1d12"/><stop offset="1" stop-color="#1e120a"/></linearGradient>
<linearGradient id="beamV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e120a"/><stop offset="0.4" stop-color="#3e2a1b"/><stop offset="1" stop-color="#1b1009"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/><stop offset="0.35" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.65" stop-color="#ffffff" stop-opacity="0.07"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
<linearGradient id="teak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93613a"/><stop offset="1" stop-color="#5a371d"/></linearGradient>
<linearGradient id="drawer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4c2a"/><stop offset="1" stop-color="#9a6a42"/></linearGradient>
<radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffdf9e" stop-opacity="0.7"/><stop offset="1" stop-color="#ffdf9e" stop-opacity="0"/></radialGradient>
<radialGradient id="floorLight" cx="0.4" cy="0" r="0.8"><stop offset="0" stop-color="#fff1cf" stop-opacity="0.3"/><stop offset="1" stop-color="#fff1cf" stop-opacity="0"/></radialGradient>
<radialGradient id="pot" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#ece3d3"/><stop offset="1" stop-color="#b8a98f"/></radialGradient>
<clipPath id="win"><rect x="0" y="300" width="2520" height="1260"/></clipPath>
"""
    )

    # ---------- far: langit, bukit, hutan, kelapa, kolam infinity, dek batu ----------
    f = lambda x: s.add("far", x)
    f('<g clip-path="url(#win)">')
    f('<rect x="-200" y="0" width="2900" height="1700" fill="url(#sky)"/>')
    for cx, cy, sc in ((380, 470, 1.0), (1280, 420, 1.35), (2150, 520, 0.9), (1750, 610, 0.6)):
        f(cloud(cx, cy, sc))
    f('<path d="M-200 940 C300 820 520 860 760 760 C980 670 1200 720 1420 800 C1700 900 1980 780 2240 820 C2400 845 2600 860 2800 880 V1300 H-200 Z" fill="url(#hill1)"/>')
    f('<path d="M-200 1040 C260 980 480 1010 700 960 C940 900 1180 980 1460 1000 C1760 1020 2060 950 2800 1010 V1300 H-200 Z" fill="url(#hill2)"/>')
    for y0, col, r, hi in ((1030, "#618f6b", 70, "#79a682"), (1090, "#4d7e58", 85, "#679a70"), (1150, "#3b6b47", 95, "#55865c")):
        for k in range(68):
            cx, cy, rr = k * 44 - 180 + rnd(-20, 20), y0 + rnd(-30, 30), r * rnd(0.6, 1.1)
            f(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{rr:.0f}" fill="{col}"/>')
            f(f'<circle cx="{cx - rr * 0.25:.0f}" cy="{cy - rr * 0.3:.0f}" r="{rr * 0.55:.0f}" fill="{hi}" opacity="0.6"/>')
    f(palm(380, 1240, 560, "#3c7a4a", "#5a9a62", lean=60, crown=420))
    f(palm(1820, 1240, 700, "#2f6b3e", "#4f8f58", lean=-90, crown=480))
    f(palm(2280, 1240, 480, "#3c7a4a", "#5a9a62", lean=30, crown=380))
    f('<rect x="-200" y="1220" width="2900" height="200" fill="url(#pool)"/>')
    f('<rect x="-200" y="1220" width="2900" height="200" fill="#ffffff" filter="url(#ripple)"/>')
    f('<rect x="-200" y="1214" width="2900" height="8" fill="#eaf8f9"/>')
    for k in range(-2, 24):
        f(f'<rect x="{k * 120}" y="1420" width="116" height="160" fill="{"#d8cbb3" if k % 2 else "#cdbea4"}"/>')
    f('<rect x="-200" y="1420" width="2900" height="160" fill="#fff" filter="url(#stone)"/>')
    f(banana(150, 1430, 420, -60))
    f(banana(2380, 1440, 380, -120))
    f("</g>")

    # ---------- room: kusen, kaca, plafon pergola, dinding, lampu, bufet, lantai ----------
    r = lambda x: s.add("room", x)
    r('<rect x="0" y="300" width="2520" height="1260" fill="url(#glass)"/>')
    for x in (0, 620, 1250, 1880, 2500):
        r(f'<rect x="{x}" y="270" width="36" height="1330" fill="url(#beamV)"/><rect x="{x}" y="270" width="36" height="1330" fill="#fff" filter="url(#woodfine)"/>')
    r('<rect x="0" y="270" width="2540" height="40" fill="url(#beam)"/><rect x="0" y="1540" width="2540" height="60" fill="url(#beam)"/>')
    # dinding plester kanan
    r('<rect x="2536" y="0" width="1304" height="1600" fill="url(#wall)"/><rect x="2536" y="0" width="1304" height="1600" fill="#fff" filter="url(#plaster)"/>')
    for k in range(4):  # bayangan kusen jatuh di dinding (statis); berkas sinar berdenyut ada di overlay
        x0 = 2820 + k * 70
        r(f'<path d="M{x0} 0 L{x0 + 22} 0 L{x0 + 722} 980 L{x0 + 700} 980 Z" fill="#c4b7a2" opacity="0.4"/>')
    r('<rect x="2536" y="0" width="200" height="1600" fill="url(#aoUp)" transform="rotate(-90 2636 800)" opacity="0"/>')
    # lukisan abstrak + lampu dinding
    r('<rect x="3330" y="560" width="380" height="560" fill="#2a1a10"/><rect x="3352" y="582" width="336" height="516" fill="#efe6d6"/>')
    r('<path d="M3380 1060 C3420 860 3480 960 3520 760 C3560 880 3620 820 3660 1060 Z" fill="#c2412d"/><path d="M3390 700 h90 v120 h-90 z" fill="#1f2b2a"/><circle cx="3600" cy="690" r="46" fill="#e2a33a"/>')
    r('<rect x="3330" y="1120" width="380" height="18" fill="#000" opacity="0.18"/>')
    r('<circle cx="2867" cy="600" r="150" fill="url(#lampGlow)"/><rect x="2860" y="640" width="14" height="70" fill="#8a6a3a"/><path d="M2820 640 h94 l-18 -80 h-58 z" fill="#f6ead3"/><path d="M2820 640 h94 l-18 -80 h-58 z" fill="url(#hiTop)"/>')
    # plafon & pergola
    r('<rect x="0" y="0" width="2536" height="270" fill="#26170d"/>')
    for k in range(9):
        x = k * 300 - 40
        r(f'<path d="M{x} 0 L{x + 130} 0 L{x + 175} 270 L{x + 45} 270 Z" fill="#fff3d6" opacity="0.12"/>')
    for y in (30, 120, 210):
        r(f'<rect x="0" y="{y}" width="2536" height="46" fill="url(#beam)"/><rect x="0" y="{y}" width="2536" height="46" fill="#fff" filter="url(#wood)"/><rect x="0" y="{y + 46}" width="2536" height="14" fill="url(#aoDown)"/>')
    for x in range(80, 2536, 310):
        r(f'<rect x="{x}" y="0" width="56" height="270" fill="url(#beamV)"/>')
    r('<rect x="0" y="270" width="3840" height="60" fill="url(#aoDown)" opacity="0.7"/>')
    # lampu gantung rotan (anyaman + cahaya)
    for cx in (820, 1700):
        r(f'<line x1="{cx}" y1="270" x2="{cx}" y2="500" stroke="#1d140e" stroke-width="5"/>')
        r(f'<circle cx="{cx}" cy="700" r="260" fill="url(#lampGlow)" opacity="0.5"/>')
        r(f'<ellipse cx="{cx}" cy="610" rx="170" ry="122" fill="url(#rattan)"/>')
        r(f'<ellipse cx="{cx}" cy="610" rx="170" ry="122" fill="url(#shadeBottom)"/><ellipse cx="{cx}" cy="610" rx="170" ry="122" fill="url(#hiTop)"/>')
        r(f'<ellipse cx="{cx}" cy="610" rx="170" ry="122" fill="none" stroke="#5b3d20" stroke-width="6"/>')
        r(f'<ellipse cx="{cx}" cy="702" rx="92" ry="24" fill="#ffe7b0"/>')
    # lantai jati mengilap
    r('<rect x="0" y="1590" width="3840" height="570" fill="url(#floor)"/>')
    for k in range(-20, 40):
        r(f'<line x1="{1900 + k * 70}" y1="1590" x2="{1900 + k * 300}" y2="2160" stroke="#21100a" stroke-width="3" opacity="0.55"/>')
    for yy, op in ((1640, 0.45), (1720, 0.4), (1830, 0.35), (1990, 0.3)):
        r(f'<line x1="0" y1="{yy}" x2="3840" y2="{yy}" stroke="#21100a" stroke-width="2" opacity="{op}"/>')
    r('<rect x="0" y="1590" width="3840" height="570" fill="#fff" filter="url(#woodfine)" opacity="0.5"/>')
    for x in (100, 720, 1350, 1980):
        r(f'<path d="M{x} 1600 L{x + 520} 1600 L{x + 640} 2160 L{x + 60} 2160 Z" fill="#d6ecf2" opacity="0.09"/>')
    r('<rect x="0" y="1590" width="3840" height="570" fill="url(#floorLight)"/>')
    r('<rect x="0" y="1590" width="3840" height="40" fill="url(#aoDown)" opacity="0.6"/>')
    # bufet jati & dekor
    r('<rect x="2620" y="1180" width="1180" height="400" rx="10" fill="url(#teak)"/><rect x="2620" y="1180" width="1180" height="400" fill="#fff" filter="url(#wood)"/>')
    r('<rect x="2600" y="1160" width="1220" height="36" rx="6" fill="#a2704a"/><rect x="2600" y="1160" width="1220" height="8" rx="4" fill="#c99a6c"/>')
    for k in range(3):
        x = 2660 + k * 380
        r(f'<rect x="{x}" y="1240" width="340" height="300" rx="8" fill="url(#drawer)"/><rect x="{x}" y="1240" width="340" height="300" rx="8" fill="none" stroke="#3a2212" stroke-width="5"/>')
        r(f'<rect x="{x + 150}" y="1380" width="40" height="10" rx="5" fill="#d9ad3a"/><rect x="{x + 150}" y="1380" width="40" height="4" rx="2" fill="#fff1b8"/>')
    r('<rect x="2620" y="1196" width="1180" height="384" fill="url(#shadeBottom)"/>')
    r('<rect x="2660" y="1580" width="20" height="40" fill="#3a2212"/><rect x="3740" y="1580" width="20" height="40" fill="#3a2212"/>')
    r('<ellipse cx="3210" cy="1612" rx="640" ry="26" fill="#000" opacity="0.28"/>')
    r('<path d="M2760 1160 C2730 1060 2750 980 2790 960 C2830 980 2850 1060 2820 1160 Z" fill="#2f3f3b"/><path d="M2770 1150 C2750 1070 2760 1000 2790 975" stroke="#fff" stroke-opacity="0.18" stroke-width="8" fill="none"/>')
    r('<path d="M2880 1160 C2860 1100 2870 1060 2900 1050 C2930 1060 2940 1100 2920 1160 Z" fill="#b9a68c"/>')
    for k, c in enumerate(("#c2412d", "#1f2b2a", "#e2a33a", "#efe6d6")):
        r(f'<rect x="{3060 + k * 34}" y="{1040 + k * 6}" width="30" height="{120 - k * 6}" fill="{c}"/><rect x="{3060 + k * 34}" y="{1040 + k * 6}" width="6" height="{120 - k * 6}" fill="#fff" opacity="0.15"/>')
    r(monstera(3560, 1160, 0.55, -20))
    r(monstera(3640, 1160, 0.5, 25, "url(#leafG2)"))
    r('<path d="M3540 1160 h160 l-20 -60 h-120 z" fill="url(#pot)"/>')
    r('<rect x="0" y="0" width="3840" height="2160" fill="url(#vignette)"/>')

    # ---------- near: kursi rotan & meja samping (kiri depan), pot monstera besar (kanan) ----------
    n = lambda x: s.add("near", x)
    n('<path d="M560 1780 L2500 1780 L2860 2160 L160 2160 Z" fill="url(#rattan)" opacity="0.25"/>')
    n('<ellipse cx="450" cy="2120" rx="380" ry="42" fill="#000" opacity="0.3"/>')
    n('<path d="M140 1500 C120 1700 160 1900 240 2000 L700 2000 C760 1900 780 1720 760 1500 C600 1440 300 1440 140 1500 Z" fill="url(#rattan)"/>')
    n('<path d="M140 1500 C120 1700 160 1900 240 2000 L700 2000 C760 1900 780 1720 760 1500 C600 1440 300 1440 140 1500 Z" fill="url(#shadeBottom)"/>')
    n('<path d="M190 1700 C300 1660 600 1660 720 1700 L700 1900 L230 1900 Z" fill="#efe6d6"/><path d="M190 1700 C300 1660 600 1660 720 1700 L700 1900 L230 1900 Z" fill="url(#shadeBottom)"/>')
    n('<path d="M230 1700 C350 1600 560 1600 690 1700" fill="#e7dcc8"/>')
    n('<rect x="250" y="1990" width="20" height="120" fill="#5b3d20"/><rect x="640" y="1990" width="20" height="120" fill="#5b3d20"/>')
    n('<ellipse cx="980" cy="2068" rx="120" ry="20" fill="#000" opacity="0.3"/>')
    n('<ellipse cx="980" cy="1860" rx="150" ry="34" fill="#6b4428"/><ellipse cx="980" cy="1852" rx="150" ry="26" fill="#87593a"/><rect x="965" y="1860" width="30" height="200" fill="#4a2e19"/><ellipse cx="980" cy="2060" rx="90" ry="20" fill="#4a2e19"/>')
    n('<path d="M950 1856 l-8 -110 h56 l-8 110 z" fill="#f6efe2" opacity="0.92"/><path d="M944 1790 h52" stroke="#e2a33a" stroke-width="18"/><circle cx="990" cy="1748" r="14" fill="#f97316"/><path d="M958 1752 v90" stroke="#fff" stroke-width="5" opacity="0.5"/>')
    n('<ellipse cx="3720" cy="2140" rx="260" ry="34" fill="#000" opacity="0.3"/>')
    n('<path d="M3560 2160 l40 -230 h260 l40 230 z" fill="url(#pot)"/><path d="M3600 1930 h260" stroke="#a8997f" stroke-width="10"/>')
    for cx, cy, sc, rr in ((3730, 1930, 0.95, -40), (3740, 1930, 1.05, 10), (3720, 1920, 0.85, 55), (3740, 1940, 0.75, -80)):
        n(monstera(cx, cy, sc, rr, "url(#leafG)" if rr % 20 else "url(#leafG2)"))
    return s


if __name__ == "__main__":
    import sys

    sc = build()
    for layer in sc.parts:
        open(f"{sys.argv[1]}/villa-lounge-{layer}.svg", "w").write(sc.svg(layer))
