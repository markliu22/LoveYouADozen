from flask import Flask, jsonify
from generate_bouquet import generate_bouquet
import os

app = Flask(__name__)

def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

@app.route('/api/generate_bouquet', methods=['GET'])
def generate_bouquet_route():
    try:
        # Ensure the output directory exists
        output_folder = 'bouquet_images/'
        ensure_directory_exists(output_folder)

        image_path = generate_bouquet()
        return jsonify({'image_path': image_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
