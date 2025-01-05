/**
 * utils.ts
 * Utility functions for the ImageCompressor component.
 */

// Assuming you want to include the `cn` function here directly

/**
 * Combines class names conditionally.
 * @param classNames - List of class names to combine.
 * @returns A string with all valid class names combined.
 */
export function cn(...classNames: string[]): string {
  return classNames.filter(Boolean).join(' ');
}

/**
 * Compresses an image file.
 * @param file - The image file to compress.
 * @param quality - The quality of the compressed image (0 to 100).
 * @param maxWidth - Optional maximum width for scaling.
 * @param maxHeight - Optional maximum height for scaling.
 * @param format - Optional image format ("image/jpeg", "image/webp", etc.)
 * @returns A promise that resolves with the compressed image blob.
 */
export async function compressImage(
  file: File,
  quality: number,
  maxWidth: number = 800,
  maxHeight: number = 800,
  format: 'image/jpeg' | 'image/webp' = 'image/jpeg' // Defaulting to JPEG format
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context is not available."));
          return;
        }

        // Calculate new dimensions based on maxWidth and maxHeight while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Compress the image
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress the image."));
            }
          },
          format, // Output format (can be "image/jpeg" or "image/webp")
          Math.min(Math.max(quality, 0), 100) / 100 // Ensures quality is between 0 and 100
        );
      };

      img.onerror = () => reject(new Error("Failed to load image."));
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

/**
 * Helper function to format file sizes into KB or MB.
 * @param size - File size in bytes.
 * @returns A human-readable string representation of the file size.
 */
export function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}
