"""
Aggressively remove signature text from AI-cropped canvases.
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(r"C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-gayana\assets")
WORKS = ROOT / "public" / "images" / "works"


def scrub(image: np.ndarray) -> np.ndarray:
    h, w = image.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)

    zones = [
        (0, int(h * 0.78), int(w * 0.42), h),
        (int(w * 0.58), int(h * 0.78), w, h),
        (int(w * 0.28), int(h * 0.88), int(w * 0.72), h),
    ]
    for x1, y1, x2, y2 in zones:
        mask[y1:y2, x1:x2] = 255

    # Also target dark/light stroke-like blobs in the bottom band
    bottom = image[int(h * 0.78) : h, :]
    gray = cv2.cvtColor(bottom, cv2.COLOR_BGR2GRAY)
    # dark ink signatures
    _, dark = cv2.threshold(gray, 70, 255, cv2.THRESH_BINARY_INV)
    # light chalk signatures
    _, light = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
    ink = cv2.bitwise_or(dark, light)
    ink = cv2.morphologyEx(ink, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    ink = cv2.dilate(ink, np.ones((5, 5), np.uint8), iterations=2)
    mask[int(h * 0.78) : h, :] = cv2.bitwise_or(mask[int(h * 0.78) : h, :], ink)

    cleaned = cv2.inpaint(image, mask, inpaintRadius=7, flags=cv2.INPAINT_TELEA)
    blend = cv2.GaussianBlur(mask, (0, 0), sigmaX=6)
    alpha = (blend.astype(np.float32) / 255.0)[..., None]
    out = cleaned.astype(np.float32) * alpha + image.astype(np.float32) * (1.0 - alpha)
    return np.clip(out, 0, 255).astype(np.uint8)


def main() -> None:
    WORKS.mkdir(parents=True, exist_ok=True)
    names = [p.name for p in ASSETS.glob("work-*.jpg")] + ["hero-painting.jpg"]
    for name in sorted(set(names)):
        src = ASSETS / name
        if not src.exists():
            print("missing", name)
            continue
        image = cv2.imread(str(src), cv2.IMREAD_COLOR)
        if image is None:
            print("bad", name)
            continue
        out = scrub(image)
        h, w = out.shape[:2]
        scale = min(1.0, 1600 / max(h, w))
        if scale < 1:
            out = cv2.resize(out, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
        dest = WORKS / name
        cv2.imwrite(str(dest), out, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
        print("ok", name, out.shape[1], "x", out.shape[0])


if __name__ == "__main__":
    main()
