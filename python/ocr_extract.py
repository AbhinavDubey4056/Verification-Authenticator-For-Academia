import ssl
ssl._create_default_https_context = ssl._create_unverified_context


import sys
import easyocr
import json
import os

def run_easyocr(image_path):
    # This needs to be run only once to load the model into memory
    # We use 'en' for English language support.
    # gpu=False to run on CPU only, to avoid GPU-related errors.
    reader = easyocr.Reader(['en'], gpu=False)

    # The .readtext method returns a list of results, with bounding boxes,
    # text, and a confidence score.
    result = reader.readtext(image_path)

    # Extract just the text from the results
    extracted_text = ""
    for (bbox, text, prob) in result:
        extracted_text += text + " "
    
    return extracted_text.strip()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No file path provided."}), file=sys.stderr)
        sys.exit(1)

    image_path = sys.argv[1]

    if not os.path.exists(image_path):
        print(json.dumps({"error": f"File not found at {image_path}"}), file=sys.stderr)
        sys.exit(1)
        
    try:
        text = run_easyocr(image_path)
        print(text)
    except Exception as e:
        print(json.dumps({"error": f"EasyOCR Error: {e}"}), file=sys.stderr)
        sys.exit(1)