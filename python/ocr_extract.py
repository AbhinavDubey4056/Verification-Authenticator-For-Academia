# python/ocr_extract.py
import sys
import pytesseract
from PIL import Image

# Certificate image path from Node.js
image_path = sys.argv[1]

# OCR extract
text = pytesseract.image_to_string(Image.open(image_path))

# Output text back to Node.js
print(text)
