// Only visit every nth pixel inside the image
const PIXEL_SKIP_INCREMENT = 5;

// This is used if there is any error while deriving the dominant color
const DEFAULT_RGB = Object.freeze({ r: 0, g: 0, b: 0 });

type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * A lot of the contents of this function is pulled from:
 * https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * Note that this function can only be used in the NextJS server and browser-side
 */
export const getDominantRGB = (imageElement: HTMLImageElement): RGB => {
  // Create initial image context to be used in sampling process
  const canvas = document.createElement("canvas");
  const context = canvas.getContext && canvas.getContext("2d");

  if (!context) {
    return DEFAULT_RGB;
  }

  const height =
    imageElement.naturalHeight ||
    imageElement.offsetHeight ||
    imageElement.height;
  canvas.height = height;

  const width =
    imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;
  canvas.width = width;

  // Set up default image data to satisfy TypeScript and avoid later null checks
  let data: ImageData = new ImageData(width, height);

  context.drawImage(imageElement, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    // If this is hit, it's likely a security error (from an image on a different domain)
    // or something has gone horribly wrong with the data process
    return DEFAULT_RGB;
  }

  const rgb = { r: 0, g: 0, b: 0 };

  let i = -4;
  let count = 0;
  let length = 0;

  length = data?.data?.length || 0;

  if (length <= 0) {
    return DEFAULT_RGB;
  }

  while ((i += PIXEL_SKIP_INCREMENT) < length) {
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];

    count++;
  }

  // The ~~ operator can be used to floor values quickly
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  // The final dominant color value for the image
  return rgb;
};

/**
 * A utility function for easy building an image element
 *
 * Note that this function can only be used in the NextJS server and browser-side
 */
export const buildImageElement = (
  imagePath: string,
  height: number,
  width: number
): HTMLImageElement => {
  const imageElement = document.createElement("img");
  imageElement.src = imagePath;
  imageElement.height = height;
  imageElement.width = width;

  return imageElement;
};
