def crop_eye_with_eyebrows(image, eye_coords):
    """
    Crop the eye region from the image based on the given coordinates and include the eyebrows.
    Adds padding around the eye to ensure the eyebrows are included.
    """
    padding_x = 20  # Horizontal padding
    padding_y = 40  # Vertical padding to include eyebrows

    x1 = max(0, min([x for x, y in eye_coords]) - padding_x)
    y1 = max(0, min([y for x, y in eye_coords]) - padding_y)  # Increase vertical padding upwards
    x2 = min(image.shape[1], max([x for x, y in eye_coords]) + padding_x)
    y2 = min(image.shape[0], max([y for x, y in eye_coords]) + padding_y // 2)  # Minor padding below the eye

    return image[y1:y2, x1:x2]
