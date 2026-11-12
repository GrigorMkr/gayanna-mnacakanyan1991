from pathlib import Path

import cv2

ASSETS = Path(r"C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-gayana\assets")
WORKS = Path(r"c:\Users\Admin\Desktop\gayana\public\images\works")
ROOMS = Path(r"c:\Users\Admin\Desktop\gayana\public\images\rooms")
WORKS.mkdir(parents=True, exist_ok=True)
ROOMS.mkdir(parents=True, exist_ok=True)


def trim_signature_band(img):
    h, w = img.shape[:2]
    # Cut a thin bottom band where AI usually stamps fake signatures.
    top = int(h * 0.008)
    bottom = int(h * 0.915)
    left = int(w * 0.008)
    right = int(w * 0.992)
    crop = img[top:bottom, left:right]
    ch, cw = crop.shape[:2]
    scale = min(1.0, 1600 / max(ch, cw))
    if scale < 1:
        crop = cv2.resize(crop, (int(cw * scale), int(ch * scale)), interpolation=cv2.INTER_AREA)
    return crop


def main():
    files = sorted(ASSETS.glob("work-*.jpg"))
    hero = ASSETS / "hero-painting.jpg"
    if hero.exists():
        files.append(hero)

    for src in files:
        img = cv2.imread(str(src))
        if img is None:
            print("bad", src.name)
            continue
        out = trim_signature_band(img)
        cv2.imwrite(str(WORKS / src.name), out, [int(cv2.IMWRITE_JPEG_QUALITY), 91])
        print("work", src.name, f"{out.shape[1]}x{out.shape[0]}")

    for src in sorted(ASSETS.glob("room-*.jpg")):
        img = cv2.imread(str(src))
        if img is None:
            continue
        h, w = img.shape[:2]
        scale = min(1.0, 1800 / max(h, w))
        if scale < 1:
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
        cv2.imwrite(str(ROOMS / src.name), img, [int(cv2.IMWRITE_JPEG_QUALITY), 88])
        print("room", src.name)

    print("done")


if __name__ == "__main__":
    main()
