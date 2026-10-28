"""Pustaka kecil untuk menggambar adegan ilustrasi 4K (3840×2160) berlapis.

Setiap adegan menulis beberapa lapisan SVG (mis. far / room / near) yang dirender ke WebP transparan
oleh render.cjs. Elemen bergerak tidak digambar di sini: dibuat sebagai overlay SVG ringan di React.
Aturan avatar CLAU berlaku: tanpa teks, logo, merek, atau simbol sakral.
"""
import math
import random

W, H = 3840, 2160


class Scene:
    def __init__(self, layers, seed=7):
        self.parts = {name: [] for name in layers}
        self.defs = []
        random.seed(seed)

    def add(self, layer, svg):
        self.parts[layer].append(svg)

    def svg(self, layer):
        body = "\n".join(self.parts[layer])
        defs = "\n".join(self.defs)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
            f"<defs>{defs}</defs>{body}</svg>"
        )


# Gradien, tekstur, dan pola yang dipakai bersama.
COMMON_DEFS = """
<filter id="wood" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.16" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.08  0 0 0 0 0.03  0 0 0 0.6 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="woodfine" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.5" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 0.35 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="plaster" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.1 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="stone" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.27  0 0 0 0 0.22  0 0 0 0.25 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="ripple" x="0" y="0" width="100%" height="100%"><feTurbulence type="turbulence" baseFrequency="0.004 0.06" numOctaves="2" seed="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<pattern id="rattan" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="26" height="26" fill="#b0834f"/><path d="M0 13 H26 M13 0 V26" stroke="#7a5530" stroke-width="5"/><path d="M0 13 H26" stroke="#d1a56c" stroke-width="1.5" opacity="0.6"/></pattern>
<linearGradient id="aoDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="aoUp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.4"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="shadeBottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0.4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.38"/></linearGradient>
<linearGradient id="hiTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.35"/><stop offset="0.3" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="leafG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f9a5c"/><stop offset="1" stop-color="#1f5a33"/></linearGradient>
<linearGradient id="leafG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5aa866"/><stop offset="1" stop-color="#2b6b3d"/></linearGradient>
<linearGradient id="trunkG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a3a2c"/><stop offset="0.45" stop-color="#7a6450"/><stop offset="1" stop-color="#3b2d22"/></linearGradient>
<radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.42"/></radialGradient>
"""


def rnd(a, b):
    return random.uniform(a, b)


def palm_frond(x, y, length, angle, color, hi, width=7, n=34, droop=0.35):
    """Pelepah kelapa: tulang daun melengkung + anak daun dua warna (sisi terang)."""
    out = []
    pts = []
    sign = 1 if math.cos(math.radians(angle)) >= 0 else -1
    for k in range(n + 1):
        t = k / n
        a = math.radians(angle) + droop * t * t * sign
        pts.append((x + math.cos(a) * length * t, y + math.sin(a) * length * t + droop * 120 * t * t, a))
    d = "M" + " L".join(f"{p[0]:.1f} {p[1]:.1f}" for p in pts)
    out.append(f'<path d="{d}" stroke="{color}" stroke-width="{width}" fill="none" stroke-linecap="round"/>')
    for k in range(2, n):
        px, py, a = pts[k]
        t = k / n
        ll = length * 0.28 * math.sin(math.pi * min(1, t * 1.15)) + 10
        for side in (-1, 1):
            b = a + side * math.radians(62) + 0.5
            ex, ey = px + math.cos(b) * ll, py + math.sin(b) * ll + ll * 0.45
            cx, cy = px + math.cos(b) * ll * 0.5, py + math.sin(b) * ll * 0.5 - 8
            col = hi if side < 0 else color
            out.append(f'<path d="M{px:.1f} {py:.1f} Q{cx:.1f} {cy:.1f} {ex:.1f} {ey:.1f}" stroke="{col}" stroke-width="{max(2, width * 0.6):.1f}" fill="none" stroke-linecap="round"/>')
    return "".join(out)


def palm(x, base, height, leaf, leaf_hi, lean=0, crown=440):
    out = []
    tx, ty = x + lean, base - height
    out.append(
        f'<path d="M{x - 20} {base} C{x - 12} {base - height * 0.5} {x + lean * 0.6 - 13} {base - height * 0.8} {tx - 11} {ty} '
        f'L{tx + 11} {ty} C{x + lean * 0.6 + 13} {base - height * 0.8} {x + 12} {base - height * 0.5} {x + 20} {base} Z" fill="url(#trunkG)"/>'
    )
    for r in range(int(height / 24)):
        yy = base - r * 24
        t = r * 24 / height
        xx = x + lean * t * t
        out.append(f'<path d="M{xx - 18:.1f} {yy:.1f} q18 -7 36 0" stroke="#2f241b" stroke-width="3" fill="none" opacity="0.55"/>')
    out.append(f'<circle cx="{tx}" cy="{ty + 14}" r="22" fill="#5b4a2c"/><circle cx="{tx - 18}" cy="{ty + 24}" r="16" fill="#6b5a32"/><circle cx="{tx + 16}" cy="{ty + 26}" r="15" fill="#5b4a2c"/>')
    for ang in (-170, -140, -110, -75, -45, -15, 10, 200, 230):
        out.append(palm_frond(tx, ty, crown * rnd(0.82, 1.1), ang, leaf, leaf_hi))
    return "".join(out)


def monstera(cx, cy, s, rot, fill="url(#leafG)", vein="#cfe6c4"):
    g = f'<g transform="translate({cx} {cy}) rotate({rot}) scale({s})">'
    g += f'<path d="M0 0 C-120 -40 -170 -190 -90 -290 C-40 -350 40 -350 90 -290 C170 -190 120 -40 0 0 Z" fill="{fill}"/>'
    for k, yy in enumerate((-80, -140, -200, -250)):
        g += f'<path d="M-6 {yy} L-{140 - k * 22} {yy - 38}" stroke="{vein}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>'
        g += f'<path d="M6 {yy} L{140 - k * 22} {yy - 38}" stroke="{vein}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>'
        # belahan khas monstera
        g += f'<path d="M-{150 - k * 20} {yy - 16} L-{70 - k * 8} {yy - 24} L-{150 - k * 20} {yy - 30} Z" fill="#000" opacity="0.0"/>'
    g += f'<path d="M0 0 L0 -320" stroke="{vein}" stroke-width="7" opacity="0.9"/>'
    g += '<path d="M0 0 C-120 -40 -170 -190 -90 -290 C-40 -350 40 -350 90 -290" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="10"/>'
    g += "</g>"
    return g


def banana(cx, cy, length, rot, fill="url(#leafG2)", rib="#2c6337"):
    g = f'<g transform="translate({cx} {cy}) rotate({rot})">'
    g += f'<path d="M0 0 C{length * 0.3} -90 {length * 0.8} -80 {length} -10 C{length * 0.8} 40 {length * 0.3} 50 0 0 Z" fill="{fill}"/>'
    g += f'<path d="M0 0 Q{length * 0.5} -30 {length} -10" stroke="{rib}" stroke-width="6" fill="none"/>'
    for k in range(1, 14):
        x = length * k / 14
        g += f'<path d="M{x:.0f} {-30 * math.sin(math.pi * k / 14):.0f} l20 {-60 * math.sin(math.pi * k / 14):.0f}" stroke="{rib}" stroke-width="2.5" opacity="0.55"/>'
    g += "</g>"
    return g


def cloud(cx, cy, s, op=0.9):
    return (
        f'<g fill="#ffffff" opacity="{op}"><ellipse cx="{cx}" cy="{cy}" rx="{180 * s}" ry="{46 * s}"/>'
        f'<ellipse cx="{cx + 90 * s}" cy="{cy - 30 * s}" rx="{120 * s}" ry="{50 * s}"/>'
        f'<ellipse cx="{cx - 110 * s}" cy="{cy - 12 * s}" rx="{90 * s}" ry="{36 * s}"/>'
        f'<ellipse cx="{cx}" cy="{cy + 12 * s}" rx="{160 * s}" ry="{20 * s}" fill="#dbe9f0"/></g>'
    )
