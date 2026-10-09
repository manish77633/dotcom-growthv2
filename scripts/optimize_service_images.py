from pathlib import Path
from PIL import Image

source = Path(r"C:\Users\manis\.codex\generated_images\01a11b51-833a-7740-af27-7ab8d863be35")
target = Path(__file__).resolve().parents[1] / "src" / "assets" / "services"
target.mkdir(parents=True, exist_ok=True)

images = {
    "marketing-automation": "exec-f476db29-724f-4cb9-af48-65fa7b39b1e5.png",
    "crm-integration": "exec-74798964-7fa5-403d-a8d0-75efe9926981.png",
    "ai-martech": "exec-a1ef9bdb-810a-425c-8d7b-d3933355ca31.png",
    "digital-transformation": "exec-9903e5bf-f681-4204-a16c-b33886afec8d.png",
    "analytics-attribution": "exec-a40558fb-0e56-4141-ae67-8698eb5f7176.png",
    "performance-marketing": "exec-3c8d48a8-3ca7-4140-8c62-174d9754d023.png",
    "demand-generation": "exec-4001886e-7305-442b-8514-a2fb1601b883.png",
    "seo-content": "exec-fb33e973-8a8b-429e-9246-836fde00793b.png",
    "conversion-optimization": "exec-090620d4-d76a-4b5f-92f2-7072df17a8f4.png",
    "revenue-attribution": "exec-81b943b2-bda9-433e-aa07-eb12f813223f.png",
    "brand-strategy": "exec-24480bf7-9593-4d5a-83d5-5e66883a0fc2.png",
    "campaign-creative": "exec-44c867d2-8e7f-4489-9435-835dd58dff7c.png",
    "content-marketing": "exec-5e450360-6d9e-4e2d-94f1-bb011722158d.png",
    "social-media": "exec-9724dd06-353f-4e87-b8eb-d5261f9740bb.png",
    "thought-leadership": "exec-d7a0042d-1cb2-4041-8bad-9a0958c152bc.png",
}

for name, filename in images.items():
    with Image.open(source / filename) as image:
        image.convert("RGB").resize((640, 480), Image.Resampling.LANCZOS).save(target / f"{name}.webp", "WEBP", quality=78, method=6)
