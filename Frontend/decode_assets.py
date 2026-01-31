import base64
import os
import glob

assets_dir = 'src/assets'
for path in glob.glob(os.path.join(assets_dir, '*.png')):
    try:
        with open(path, 'r') as f:
            data = f.read().strip()
            # Common Base64 starts for JPEG (/9j/) and PNG (iVBO)
            if data.startswith('/9j/') or data.startswith('iVBORw0GH'):
                print(f"Decoding {path}")
                decoded = base64.b64decode(data)
                with open(path, 'wb') as wf:
                    wf.write(decoded)
            else:
                print(f"Skipping {path}: Not recognized as base64")
    except Exception as e:
        # If it fails to read as text, it might already be binary
        print(f"Skipping {path}: {type(e).__name__}")
