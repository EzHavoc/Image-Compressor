'use client'

import React, { useState, useCallback, useEffect } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useDropzone } from 'react-dropzone';
import { compressImage } from '../lib/utils';

export function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [quality, setQuality] = useState(80);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
  });

  // Compress image
  const compressCurrentImage = async () => {
    if (!image) return;

    try {
      const compressedBlob = await compressImage(image, quality);
      const compressedUrl = URL.createObjectURL(compressedBlob);
      setCompressed({
        url: compressedUrl,
        size: compressedBlob.size,
      });
    } catch (error) {
      console.error('Image compression failed:', error);
      setCompressed(null);
    }
  };

  // Automatically compress image when image or quality changes
  useEffect(() => {
    if (image) {
      compressCurrentImage();
    }
  }, [image, quality]);

  // Handle download of the compressed image
  const handleDownload = () => {
    if (compressed) {
      const link = document.createElement('a');
      link.href = compressed.url;
      link.download = `compressed-${image?.name || 'image'}`;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Card */}
      <Card className="border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div
          {...getRootProps()}
          className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-4 border-dashed border-black bg-white p-8 text-center ${
            isDragActive ? 'bg-blue-50' : ''
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mb-4 h-12 w-12" />
          <h3 className="mb-2 text-2xl font-bold">Drop your image here</h3>
          <p className="text-gray-600">Or click to select a file</p>
        </div>
      </Card>

      {/* Preview and Compression Settings */}
      {preview && (
        <Card className="border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Compression Settings */}
          <div className="mb-8 space-y-4">
            <h3 className="text-2xl font-bold">Compression Settings</h3>
            <div className="space-y-2">
              <label className="font-medium">Quality: {quality}%</label>
              <Slider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                min={0}
                max={100}
                step={1}
                className="[&_[role=slider]]:border-4 [&_[role=slider]]:border-black [&_[role=slider]]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Original Image */}
            <ImagePreview
              title="Original"
              src={preview}
              size={(image?.size || 0) / 1024}
            />

            {/* Compressed Image */}
            <ImagePreview
              title="Compressed Preview"
              src={compressed?.url || ''}
              size={compressed ? compressed.size / 1024 : undefined}
              placeholder={!compressed}
            />
          </div>

          {/* Download Button */}
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleDownload}
              disabled={!compressed}
              className="border-4 border-black bg-[#90A8EE] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Download Compressed Image
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// Helper Component: Image Preview
function ImagePreview({ title, src, size, placeholder }: {
  title: string;
  src: string;
  size?: number;
  placeholder?: boolean;
}) {
  return (
    <div className="space-y-2">
      <h4 className="font-bold">{title}</h4>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border-4 border-black bg-white/50">
        {placeholder ? (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        ) : (
          <img src={src} alt={title} className="h-full w-full object-contain" />
        )}
      </div>
      <p className="text-sm text-gray-600">
        {size !== undefined ? `Size: ${size.toFixed(2)} KB` : 'Estimated size: -- KB'}
      </p>
    </div>
  );
}
