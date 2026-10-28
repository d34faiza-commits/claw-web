"""Section meja: meja resepsionis hotel dari ketinggian meja (4K, 3 lapis: far = lobi, mid = monitor & lampu,
desk = permukaan meja & properti). Figur agent berdiri di permukaan meja (≈ y 1250–1300).
Kedalaman lewat kabut hangat di lapisan jauh, bukan blur.
"""
from scenelib import COMMON_DEFS, Scene, monstera, rnd


def build():
    s = Scene(["far", "mid", "desk"])
    s.defs.append(COMMON_DEFS)
    s.defs.append(
        """
<linearGradient id="lobby" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c9b2"/><stop offset="1" stop-color="#b19a7d"/></linearGradient>
<linearGradient id="slat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5434"/><stop offset="0.5" stop-color="#a0734a"/><stop offset="1" stop-color="#6e4a2c"/></linearGradient>
<linearGradient id="garden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8ef"/><stop offset="1" stop-color="#f3ead6"/></linearGradient>
<linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c79e74"/><stop offset="1" stop-color="#7a5434"/></linearGradient>
<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d77a"/><stop offset="0.45" stop-color="#d1a12c"/><stop offset="1" stop-color="#8a6516"/></linearGradient>
<linearGradient id="ceramic" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dcd6cc"/><stop offset="0.35" stop-color="#ffffff"/><stop offset="1" stop-color="#cfc7ba"/></linearGradient>
<linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a2a"/><stop offset="1" stop-color="#111111"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d2733"/><stop offset="1" stop-color="#0f141a"/></linearGradient>
<radialGradient id="bulbGlass" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/><stop offset="0.7" stop-color="#ffffff" stop-opacity="0.08"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.25"/></radialGradient>
<radialGradient id="sconce" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffd890" stop-opacity="0.85"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>
<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4e2" stop-opacity="0.28"/><stop offset="1" stop-color="#fff4e2" stop-opacity="0.12"/></linearGradient>
<linearGradient id="keyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4d4d4"/></linearGradient>
"""
    )

    # ---------- far: lobi ----------
    f = lambda x: s.add("far", x)
    f('<rect width="3840" height="1400" fill="url(#lobby)"/><rect width="3840" height="1400" fill="#fff" filter="url(#plaster)"/>')
    for k in range(34):  # panel bilah kayu kiri & kanan
        for x0 in (0, 2560):
            x = x0 + k * 38
            if x0 == 0 and x > 1180 or x0 == 2560 and x > 3840:
                continue
            f(f'<rect x="{x}" y="160" width="30" height="1240" fill="url(#slat)"/>')
    f('<rect x="0" y="160" width="1200" height="1240" fill="#fff" filter="url(#woodfine)" opacity="0.5"/><rect x="2560" y="160" width="1280" height="1240" fill="#fff" filter="url(#woodfine)" opacity="0.5"/>')
    f('<rect width="3840" height="160" fill="#efe5d6"/><rect y="160" width="3840" height="40" fill="url(#aoDown)"/>')
    # jendela lengkung ke taman
    f('<path d="M1460 1400 V560 a420 420 0 0 1 840 0 V1400 Z" fill="url(#garden)"/>')
    for k in range(40):
        cx, cy, rr = 1460 + rnd(0, 840), rnd(900, 1300), rnd(40, 110)
        f(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{rr:.0f}" fill="{["#7fae86", "#6a9c73", "#8dbb91"][k % 3]}"/>')
    f('<path d="M1460 1400 V560 a420 420 0 0 1 840 0 V1400" fill="none" stroke="#f7f1e7" stroke-width="28"/><line x1="1880" y1="140" x2="1880" y2="1400" stroke="#f7f1e7" stroke-width="16"/><line x1="1460" y1="900" x2="2300" y2="900" stroke="#f7f1e7" stroke-width="12"/>')
    # lukisan & lampu dinding
    for x, c1, c2 in ((520, "#2a9d8f", "#e9c46a"), (3060, "#e76f51", "#264653")):
        f(f'<rect x="{x}" y="420" width="300" height="400" fill="#2a1a10"/><rect x="{x + 18}" y="438" width="264" height="364" fill="#f3ecdf"/>')
        f(f'<circle cx="{x + 150}" cy="580" r="80" fill="{c1}"/><rect x="{x + 60}" y="660" width="180" height="90" fill="{c2}"/>')
    for x in (1240, 2520):
        f(f'<circle cx="{x}" cy="640" r="220" fill="url(#sconce)"/><path d="M{x - 40} 660 h80 l-14 -70 h-52 z" fill="#f8ecd4"/><rect x="{x - 6}" y="660" width="12" height="50" fill="#a8823e"/>')
    # tanaman tinggi di belakang meja
    for cx in (300, 3560):
        for k, rr in enumerate((-50, -20, 10, 40, 65)):
            f(monstera(cx, 1400, 1.0 - k * 0.08, rr))
    f('<rect width="3840" height="1400" fill="url(#haze)"/>')

    # ---------- mid: monitor kanan atas & lampu bohlam kaca kiri ----------
    m = lambda x: s.add("mid", x)
    m('<rect x="2620" y="-80" width="1400" height="760" rx="40" fill="url(#bezel)"/><rect x="2660" y="-40" width="1320" height="680" rx="14" fill="url(#screen)"/>')
    tiles = (("#7cc6e8", "#2f9fb4", "#f6e3a6"), ("#f5c58a", "#e76f51", "#ffe7b0"), ("#9fd6a0", "#2a9d8f", "#f2efe6"), ("#f2b8c6", "#b56576", "#fff1e6"), ("#c8b6ff", "#6d597a", "#ffe8a3"))
    for k, (sky, ground, sun) in enumerate(tiles):
        x = 2720 + k * 250
        m(f'<rect x="{x}" y="60" width="220" height="280" rx="22" fill="#f8f5ef"/>')
        m(f'<rect x="{x + 14}" y="74" width="192" height="150" rx="14" fill="{sky}"/><circle cx="{x + 160}" cy="110" r="22" fill="{sun}"/>')
        m(f'<path d="M{x + 14} 224 V180 Q{x + 70} 150 {x + 120} 178 T{x + 206} 170 V224 Z" fill="{ground}"/>')
        m(f'<rect x="{x + 20}" y="246" width="150" height="14" rx="7" fill="#1f2937" opacity="0.7"/><rect x="{x + 20}" y="272" width="110" height="12" rx="6" fill="#1f2937" opacity="0.4"/>')
        m(f'<rect x="{x + 20}" y="300" width="70" height="22" rx="11" fill="#0f766e"/>')
    for k in range(4):
        m(f'<rect x="{2720 + k * 320}" y="400" width="280" height="170" rx="16" fill="#26313d"/><rect x="{2740 + k * 320}" y="430" width="{120 + k * 30}" height="14" rx="7" fill="#5eead4" opacity="0.6"/>')
    m('<rect x="3000" y="680" width="90" height="560" fill="#cfcfcf"/><rect x="3000" y="680" width="24" height="560" fill="#fff" opacity="0.5"/>')
    m('<ellipse cx="3045" cy="1240" rx="260" ry="34" fill="#bdbdbd"/>')
    # ---------- desk: permukaan meja & properti ----------
    d = lambda x: s.add("desk", x)
    d('<rect x="0" y="1230" width="3840" height="930" fill="url(#deskTop)"/><rect x="0" y="1230" width="3840" height="930" fill="#fff" filter="url(#wood)"/>')
    for k in range(16):
        d(f'<path d="M0 {1290 + k * 56} Q1920 {1262 + k * 60} 3840 {1290 + k * 58}" stroke="#5a3d24" stroke-width="3" fill="none" opacity="0.28"/>')
    d('<rect x="0" y="1222" width="3840" height="14" fill="#e6c9a2"/><rect x="0" y="1236" width="3840" height="70" fill="url(#aoDown)" opacity="0.5"/>')
    d('<rect x="0" y="1230" width="3840" height="930" fill="url(#vignette)"/>')
    # lampu bohlam kaca (berdiri di meja, kiri)
    d('<g transform="translate(-40 430)">')
    d('<ellipse cx="560" cy="1196" rx="400" ry="70" fill="#000" opacity="0.28"/>')
    d('<ellipse cx="560" cy="1190" rx="380" ry="80" fill="#e9e4da"/><path d="M240 1190 Q240 980 400 930 L720 930 Q880 980 880 1190 Z" fill="url(#ceramic)"/>')
    d('<path d="M240 1190 Q240 980 400 930 L720 930 Q880 980 880 1190 Z" fill="url(#shadeBottom)"/>')
    d('<rect x="460" y="770" width="200" height="164" rx="22" fill="url(#brass)"/>')
    for k in range(5):
        d(f'<rect x="460" y="{790 + k * 28}" width="200" height="6" fill="#8a6516" opacity="0.5"/>')
    d('<path d="M470 770 C470 690 330 600 330 450 C330 300 440 210 560 210 C680 210 790 300 790 450 C790 600 650 690 650 770 Z" fill="url(#bulbGlass)" stroke="#ffffff" stroke-opacity="0.6" stroke-width="6"/>')
    d('<path d="M400 520 C380 420 420 320 500 280" stroke="#ffffff" stroke-opacity="0.6" stroke-width="16" fill="none" stroke-linecap="round"/>')
    d('<path d="M540 760 V470 M580 760 V470" stroke="#8a6a3a" stroke-width="6"/>')
    d('<path d="M540 470 q20 -80 40 0" stroke="#ffb547" stroke-width="10" fill="none"/>')
    d('</g>')
    # bel resepsionis
    d('<ellipse cx="1060" cy="1760" rx="200" ry="40" fill="#000" opacity="0.28"/>')
    d('<path d="M890 1740 a170 160 0 0 1 340 0 Z" fill="url(#brass)"/>')
    d('<path d="M940 1710 a120 110 0 0 1 150 -90" stroke="#fff6cf" stroke-width="16" fill="none" opacity="0.75" stroke-linecap="round"/>')
    d('<rect x="860" y="1734" width="400" height="34" rx="14" fill="#7a5a14"/><rect x="860" y="1734" width="400" height="8" rx="4" fill="#d9b54a"/>')
    d('<rect x="1044" y="1560" width="32" height="42" rx="8" fill="url(#brass)"/><ellipse cx="1060" cy="1556" rx="34" ry="10" fill="#e8c35a"/>')
    # kopi
    d('<ellipse cx="2620" cy="1880" rx="230" ry="44" fill="#000" opacity="0.25"/><ellipse cx="2620" cy="1860" rx="230" ry="46" fill="url(#ceramic)"/>')
    d('<path d="M2470 1660 h300 l-24 190 a126 34 0 0 1 -252 0 Z" fill="url(#ceramic)"/>')
    d('<path d="M2770 1700 q86 14 56 84 q-20 34 -66 30" stroke="#e9e4dc" stroke-width="24" fill="none"/>')
    d('<ellipse cx="2620" cy="1660" rx="150" ry="30" fill="#5b3a22"/><ellipse cx="2600" cy="1654" rx="60" ry="10" fill="#8a5a36"/>')
    # keyboard
    d('<path d="M2960 1500 L3880 1440 L3880 1720 L3060 1800 Z" fill="#e9e9e9"/><path d="M2960 1500 L3880 1440 L3880 1460 L2964 1520 Z" fill="#fff"/>')
    for k in range(36):
        cx = 3040 + (k % 12) * 66
        cy = 1530 + (k // 12) * 70 - (k % 12) * 4.2
        d(f'<rect x="{cx}" y="{cy:.0f}" width="54" height="54" rx="9" fill="url(#keyG)"/><rect x="{cx}" y="{cy + 48:.0f}" width="54" height="6" rx="3" fill="#b9b9b9"/>')
    # buku catatan & pena, kartu kunci, tanaman kecil
    d('<rect x="1500" y="1820" width="460" height="300" rx="14" fill="#1f3b36" transform="rotate(-6 1730 1970)"/><rect x="1520" y="1836" width="20" height="270" fill="#e9c46a" transform="rotate(-6 1730 1970)"/>')
    d('<rect x="1600" y="1780" width="380" height="16" rx="8" fill="#2a2a2a" transform="rotate(-18 1790 1788)"/><rect x="1600" y="1780" width="60" height="16" rx="8" fill="#d1a12c" transform="rotate(-18 1790 1788)"/>')
    d('<rect x="560" y="1880" width="280" height="170" rx="18" fill="#0f766e" transform="rotate(-10 700 1965)"/><rect x="590" y="1910" width="100" height="18" rx="6" fill="#ccfbf1" transform="rotate(-10 700 1965)"/>')
    d('<ellipse cx="2060" cy="1640" rx="110" ry="20" fill="#000" opacity="0.25"/><path d="M1980 1520 h160 l-20 120 h-120 z" fill="#b45309"/><path d="M1980 1520 h160 l-4 20 h-152 z" fill="#d97706"/>')
    for rr in (-35, -10, 15, 40):
        d(monstera(2060, 1520, 0.32, rr, "url(#leafG2)"))
    return s


if __name__ == "__main__":
    import sys

    sc = build()
    for layer in sc.parts:
        open(f"{sys.argv[1]}/reception-desk-{layer}.svg", "w").write(sc.svg(layer))
