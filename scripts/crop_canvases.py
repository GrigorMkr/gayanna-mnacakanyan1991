"""
Extract painting canvases from easel studio photos.
Preserves original paint and real signatures; invents nothing.
"""

from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "raw"
OUT = ROOT / "public" / "images" / "works"
OUT.mkdir(parents=True, exist_ok=True)

PAIRS = [
    ("painting1.jpg", "work-01.jpg"),
    ("painting2.jpg", "work-02.jpg"),
    ("painting3.jpg", "work-03.jpg"),
    ("painting4.jpg", "work-04.jpg"),
    ("painting5.jpg", "work-05.jpg"),
    ("painting6.jpg", "work-06.jpg"),
    ("painting7.jpg", "work-07.jpg"),
    ("painting8.jpg", "work-08.jpg"),
    ("painting9.jpg", "work-09.jpg"),
    ("painting10.jpg", "work-10.jpg"),
    ("painting11.jpg", "work-11.jpg"),
    ("painting12.jpg", "work-12.jpg"),
    ("painting13.jpg", "work-13.jpg"),
    ("painting15.jpg", "work-15.jpg"),
    ("painting17.jpg", "work-17.jpg"),
    ("painting18.jpg", "work-18.jpg"),
    ("painting19.jpg", "work-19.jpg"),
    ("painting20.jpg", "work-20.jpg"),
    ("painting23.jpg", "work-23.jpg"),
    ("painting24.jpg", "work-24.jpg"),
    ("painting25.jpg", "work-25.jpg"),
    ("painting26.jpg", "work-26.jpg"),
    ("painting27.jpg", "work-27.jpg"),
    ("painting28.jpg", "work-28.jpg"),
    ("painting31.jpg", "work-31.jpg"),
    ("painting32.jpg", "work-32.jpg"),
    ("painting33.jpg", "work-33.jpg"),
    ("painting34.jpg", "work-34.jpg"),
    ("painting35.jpg", "work-35.jpg"),
    ("painting36.jpg", "work-36.jpg"),
    ("painting37.jpg", "work-37.jpg"),
    ("painting116.jpg", "work-116.jpg"),
]


def order_points(pts: np.ndarray) -> np.ndarray:
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect


def warp_quad(image: np.ndarray, pts: np.ndarray) -> np.ndarray:
    rect = order_points(pts.astype("float32"))
    (tl, tr, br, bl) = rect
    width_a = np.linalg.norm(br - bl)
    width_b = np.linalg.norm(tr - tl)
    max_w = int(max(width_a, width_b))
    height_a = np.linalg.norm(tr - br)
    height_b = np.linalg.norm(tl - bl)
    max_h = int(max(height_a, height_b))
    max_w = max(max_w, 64)
    max_h = max(max_h, 64)
    dst = np.array(
        [[0, 0], [max_w - 1, 0], [max_w - 1, max_h - 1], [0, max_h - 1]],
        dtype="float32",
    )
    matrix = cv2.getPerspectiveTransform(rect, dst)
    return cv2.warpPerspective(image, matrix, (max_w, max_h))


def score_quad(pts: np.ndarray, image_shape: tuple[int, int]) -> float:
    h, w = image_shape[:2]
    area = cv2.contourArea(pts.astype(np.float32))
    if area < (h * w) * 0.08:
        return -1
    if area > (h * w) * 0.92:
        return -1

    rect = order_points(pts.astype("float32"))
    width = np.linalg.norm(rect[1] - rect[0])
    height = np.linalg.norm(rect[3] - rect[0])
    if width < 40 or height < 40:
        return -1
    ratio = width / max(height, 1)
    if ratio < 0.45 or ratio > 2.4:
        return -1

    M = cv2.moments(pts.astype(np.float32))
    if M["m00"] == 0:
        return -1
    cx = M["m10"] / M["m00"]
    cy = M["m01"] / M["m00"]
    center_score = 1.0 - (abs(cx - w / 2) / w + abs(cy - h / 2) / h)
    return float(area / (h * w) + center_score * 0.35)


def find_canvas_quad(image: np.ndarray) -> np.ndarray | None:
    h, w = image.shape[:2]
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, 40, 140)
    edges = cv2.dilate(edges, np.ones((3, 3), np.uint8), iterations=2)
    edges = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8), iterations=2)

    contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    best = None
    best_score = -1.0

    for contour in contours:
        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.03 * peri, True)
        if len(approx) != 4 or not cv2.isContourConvex(approx):
            continue
        pts = approx.reshape(4, 2)
        score = score_quad(pts, image.shape)
        if score > best_score:
            best_score = score
            best = pts

    if best is not None:
        return best

    # Fallback: adaptive threshold blobs
    thr = cv2.adaptiveThreshold(
        blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 31, 7
    )
    thr = cv2.morphologyEx(thr, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8), iterations=2)
    contours, _ = cv2.findContours(thr, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for contour in sorted(contours, key=cv2.contourArea, reverse=True)[:12]:
        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.03 * peri, True)
        if len(approx) == 4 and cv2.isContourConvex(approx):
            pts = approx.reshape(4, 2)
            score = score_quad(pts, image.shape)
            if score > best_score:
                best_score = score
                best = pts
        else:
            x, y, bw, bh = cv2.boundingRect(contour)
            if bw * bh < (h * w) * 0.1:
                continue
            pts = np.array(
                [[x, y], [x + bw, y], [x + bw, y + bh], [x, y + bh]], dtype=np.float32
            )
            score = score_quad(pts, image.shape)
            if score > best_score:
                best_score = score
                best = pts

    return best


def center_fallback(image: np.ndarray) -> np.ndarray:
    h, w = image.shape[:2]
    # Typical easel photos: canvas sits in upper-middle area
    top = int(h * 0.08)
    bottom = int(h * 0.72)
    left = int(w * 0.14)
    right = int(w * 0.86)
    crop = image[top:bottom, left:right]
    return crop


def enhance(image: np.ndarray) -> np.ndarray:
    # Mild contrast/clarity without inventing content
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=1.4, tileGridSize=(8, 8))
    l = clahe.apply(l)
    merged = cv2.merge([l, a, b])
    out = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
    return out


def process_one(src_name: str, out_name: str) -> dict:
    src = SRC / src_name
    image = cv2.imread(str(src), cv2.IMREAD_COLOR)
    if image is None:
        return {"file": src_name, "ok": False, "error": "read_failed"}

    quad = find_canvas_quad(image)
    method = "quad"
    if quad is not None:
        canvas = warp_quad(image, quad)
        # Trim a few pixels of easel lip if present
        h, w = canvas.shape[:2]
        trim_x = max(2, int(w * 0.012))
        trim_y = max(2, int(h * 0.012))
        canvas = canvas[trim_y : h - trim_y, trim_x : w - trim_x]
    else:
        canvas = center_fallback(image)
        method = "fallback"

    canvas = enhance(canvas)
    # Cap long side for web
    h, w = canvas.shape[:2]
    max_side = 1600
    scale = min(1.0, max_side / max(h, w))
    if scale < 1:
        canvas = cv2.resize(
            canvas, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA
        )

    out_path = OUT / out_name
    cv2.imwrite(str(out_path), canvas, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
    return {
        "file": src_name,
        "out": out_name,
        "ok": True,
        "method": method,
        "size": [canvas.shape[1], canvas.shape[0]],
    }


def main() -> None:
    results = [process_one(src, out) for src, out in PAIRS]
    print(json.dumps(results, ensure_ascii=False, indent=2))
    ok = sum(1 for r in results if r.get("ok"))
    print(f"\nDone: {ok}/{len(results)}")


if __name__ == "__main__":
    main()
