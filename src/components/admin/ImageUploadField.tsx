"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Image, Link2, Loader2, X, ImageOff } from "lucide-react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
  showPreview?: boolean;
  previewAspect?: "video" | "square" | "auto";
  accept?: string;
}

export function ImageUploadField({
  value,
  onChange,
  label = "Imagen",
  placeholder = "https://... o sube una imagen",
  helpText,
  showPreview = true,
  previewAspect = "video",
  accept = "image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml",
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset image error when value changes
  useEffect(() => {
    setImageError(false);
  }, [value]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir el archivo");
      }

      // Guardamos la URL tal cual para que el consumo sea coherente con el rewrite
      onChange(data.url);
    } catch (error: any) {
      setUploadError(error.message || "Error al subir el archivo");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearImage = () => {
    onChange("");
    setUploadError("");
  };

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    auto: "",
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      {label && (
        <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
          <Image className="w-4 h-4" />
          {label}
        </label>
      )}

      {/* Toggle entre URL y Upload */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            mode === "url"
              ? "bg-brand/20 text-brand border border-brand/30"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <Link2 className="w-4 h-4" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            mode === "upload"
              ? "bg-brand/20 text-brand border border-brand/30"
              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <Upload className="w-4 h-4" />
          Subir
        </button>
      </div>

      {/* Modo URL */}
      {mode === "url" && (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="admin-input w-full pr-10"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Modo Upload */}
      {mode === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
            id={`upload-${label?.replace(/\s/g, "-")}`}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-white/5 text-gray-300 border-2 border-dashed border-white/20 rounded-lg hover:bg-white/10 hover:border-brand/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Click para seleccionar imagen
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            PNG, JPG, GIF, WebP, SVG (max 5MB)
          </p>
        </div>
      )}

      {/* Error */}
      {uploadError && (
        <p className="text-red-500 text-sm">{uploadError}</p>
      )}

      {/* Help text */}
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}

      {/* Preview */}
      {showPreview && (
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-gray-400 mb-2">Vista previa:</p>
          <div className={`${aspectClasses[previewAspect]} rounded-lg overflow-hidden bg-black/30 ${previewAspect === "auto" ? "min-h-[100px]" : ""}`}>
            {value && !imageError ? (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-contain"
                onLoad={() => setImageError(false)}
                onError={() => setImageError(true)}
              />
            ) : value && imageError ? (
              <div className="w-full h-full flex items-center justify-center text-red-400 min-h-[100px]">
                <div className="text-center">
                  <ImageOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Error al cargar imagen</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 min-h-[100px]">
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Sin imagen</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploadField;
