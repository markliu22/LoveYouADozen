from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from generate_bouquet import generate_bouquet
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

@app.route('/api/generate_bouquet', methods=['GET'])
@cross_origin()
def generate_bouquet_route():
    try:
        # Ensure the output directory exists
        output_folder = 'bouquet_images/'
        ensure_directory_exists(output_folder)

        image_path = generate_bouquet()

        # Explicitly set Content-Type header to application/json
        response = jsonify({'image_path': image_path})
        response.headers['Content-Type'] = 'application/json'

        # Print headers for debugging
        print(response.headers)

        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
