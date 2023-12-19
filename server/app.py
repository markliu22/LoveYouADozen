from itertools import permutations
from PIL import Image

# Assuming you have a list of flower images named flower_1.png, flower_2.png, etc.
flowers = [f'flower_{i}.png' for i in range(1, 5)]

# Generate one permutation of the flowers
bouquet_permutation = next(permutations(flowers, len(flowers)))

# Output folder for the generated bouquet image
output_folder = 'bouquet_images/'

# Define the number of rows and columns
rows = 2
columns = 2

# Define the width and height of each flower in the bouquet
flower_width = 200
flower_height = 200

# Set the amount of overlap (adjust these values as needed)
x_overlap = 0
y_overlap = 0

# Calculate the canvas size considering potential overlap
canvas_width = columns * flower_width - (columns - 1) * x_overlap
canvas_height = rows * flower_height - (rows - 1) * y_overlap
bouquet_image = Image.new('RGBA', (canvas_width, canvas_height), (255, 255, 255, 0))

# Paste each flower onto the canvas with a white background and overlap
for i, flower in enumerate(bouquet_permutation):
    flower_image = Image.open(flower).convert('RGBA')
    # Calculate the position of each flower in the bouquet with overlap
    x_position = (i % columns) * (flower_width - x_overlap)
    y_position = (i // columns) * (flower_height - y_overlap)

    # Composite the flower onto the canvas using the alpha channel
    bouquet_image.alpha_composite(flower_image, dest=(x_position, y_position))

# Save the generated bouquet image with a white canvas
bouquet_image.save(f'{output_folder}final_bouquet.png')
