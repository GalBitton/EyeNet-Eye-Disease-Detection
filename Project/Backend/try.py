import base64
import json

def prepare_image_payload(image_path, score=0.95, blur=1.8):
    with open(image_path, "rb") as img_file:
        b64_str = base64.b64encode(img_file.read()).decode()

    payload = [
        {
            "image": "data:image/jpeg;base64," + b64_str,
            "score": score,
            "blur": blur
        }
    ]

    return json.dumps(payload, indent=2)


image_path = "C:\\Users\\ron bendel\\Downloads\\try4.png"
json_payload = prepare_image_payload(image_path)

# הדפסת התוצאה (לשימוש בת'אנדר קליינט)
print(json_payload)

# אופציונלית – כתיבה לקובץ:
with open("payload.json", "w") as f:
    f.write(json_payload)
