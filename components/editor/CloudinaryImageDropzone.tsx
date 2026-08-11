"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";

interface CloudinaryImageDropzoneProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  placeholder?: string;
}

export function CloudinaryImageDropzone({
  value,
  onChange,
  className,
  placeholder = "Upload an image"
}: CloudinaryImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/template-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload");

      toast.success("Image uploaded successfully!");
      onChange(data.url);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className={clsx("w-full space-y-2", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer",
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100",
          isUploading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-indigo-600">
            <Loader2 className="w-8 h-8 mb-2 animate-spin" />
            <p className="text-sm font-medium">Uploading to Cloudinary CDN...</p>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center justify-center w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={value} 
              alt="Uploaded block element" 
              className="max-h-[150px] w-auto object-contain rounded border border-gray-200 mb-4 bg-white"
            />
            <div className="flex items-center text-sm text-gray-500 font-medium">
              <UploadCloud className="w-4 h-4 mr-2" />
              Replace image
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-1 text-sm font-semibold text-gray-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        )}
      </div>

      {value && (
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 w-full text-xs px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  );
}
