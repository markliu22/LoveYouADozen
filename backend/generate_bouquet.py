import os
from itertools import permutations
from PIL import Image
import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime

# Assuming you have AWS credentials configured locally or on your server
# **DEACTIVATED**
AWS_ACCESS_KEY = 'AKIAWKKMVOTEGX7OGWO2'
AWS_SECRET_KEY = 'EaFYV6idVpcHtBVwRcCVB81ozYCcpVVAGkLdkSkx'
AWS_REGION = 'us-east-2'
S3_BUCKET_NAME = 'mark-bucketski'  # Replace with your S3 bucket name

def upload_to_s3(local_file, s3_file):
    try:
        s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name=AWS_REGION)
        s3.upload_file(local_file, S3_BUCKET_NAME, s3_file)
        print(f"File uploaded successfully to {S3_BUCKET_NAME}/{s3_file}")
        return f"https://{S3_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{s3_file}"
    except FileNotFoundError:
        print("The file was not found")
        return None
    except NoCredentialsError:
        print("Credentials not available")
        return None

def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def generate_bouquet():
    flowers = [f'flower_{i}.png' for i in range(1, 13)]

    # Generate one permutation of the flowers
    bouquet_permutation = next(permutations(flowers, len(flowers)))

    # Output folder for the generated bouquet image
    output_folder = 'bouquet_images/'

    # Define the number of rows and columns
    rows = 3
    columns = 4

    # Define the width and height of each flower in the bouquet
    flower_width = 120
    flower_height = 220

    # Set the amount of overlap
    x_overlap = 85
    y_overlap = 165

    # Additional overlap between the first and second row
    additional_overlap = 10  # Adjust this value as needed

    # Stagger offset for the middle row
    stagger_offset = flower_width // 4

    # Calculate the canvas size considering potential overlap
    canvas_width = columns * flower_width - (columns - 1) * x_overlap
    canvas_height = rows * flower_height - (rows - 1) * y_overlap

    # Create an image with a white background
    bouquet_image = Image.new('RGB', (canvas_width, canvas_height), (255, 255, 255))

    # Paste each flower onto the canvas with overlap
    for i, flower in enumerate(bouquet_permutation):
        flower_image = Image.open(flower).convert('RGBA')
        
        x_position = (i % columns) * (flower_width - x_overlap)
        y_position = (i // columns) * (flower_height - y_overlap)

        if (i // columns) == 1:  # Middle row
            x_position += stagger_offset
            y_position -= additional_overlap  # Bring the second row closer

        # Create a mask for the alpha channel
        mask = flower_image.split()[3]

        # Paste the flower image onto the bouquet image using the mask
        bouquet_image.paste(flower_image, (x_position, y_position), mask)

    # Save the generated bouquet image locally
    ensure_directory_exists(output_folder)
    current_time = datetime.now().strftime("%m.%d.%Y_%I:%M%p")
    s3_file_path = f'bouquet_{current_time}.png'
    local_file_path = os.path.join(output_folder, s3_file_path)
    bouquet_image.save(local_file_path)
    s3_image_url = upload_to_s3(local_file_path, s3_file_path)

    return s3_image_url
    # ensure_directory_exists(output_folder)
    # current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    # s3_file_path = f'final_bouquet_{current_time}.png'
    # local_file_path = os.path.join(output_folder, s3_file_path)
    # bouquet_image.save(local_file_path)

    # # Upload the local file to S3
    # s3_image_url = upload_to_s3(local_file_path, s3_file_path)

    # return s3_image_url

if __name__ == '__main__':
    generated_image_url = generate_bouquet()
    print(f"Generated bouquet image URL: {generated_image_url}")
