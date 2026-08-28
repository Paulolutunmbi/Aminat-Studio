import React, { useRef, useState } from 'react';
import { Upload, X, RefreshCw, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (imageUrl: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Artwork Image',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const sampleImages = [
    { label: 'Floral Abstraction', url: '/images/artwork/floral-abstraction.jpg' },
    { label: 'The Path', url: '/images/artwork/the-path.jpg' },
    { label: 'Surreal Landscape', url: '/images/artwork/surreal-landscape.jpg' },
    { label: 'Paint With Me', url: '/images/artwork/paint-with-me.jpg' },
    { label: "The Artist's Journey", url: '/images/artwork/artists-journey.jpg' },
  ];

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onChange(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
          {label} *
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#8A9A5B] hover:underline flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL field' : 'Enter Image URL'}</span>
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://... or /images/artwork/..."
            className="flex-1 text-xs bg-[#FFFFFF] border border-[#E7E7E2] px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 bg-[#1A1C19] text-white text-xs uppercase tracking-wider hover:bg-[#8A9A5B] transition-colors shadow-xs"
          >
            Apply
          </button>
        </div>
      )}

      {value ? (
        /* Image Preview with Replace and Remove actions */
        <div className="relative border border-[#1A1C19] bg-[#F5F5F2] p-2 flex flex-col items-center">
          <div className="relative max-h-60 w-full flex items-center justify-center overflow-hidden">
            <img
              src={value}
              alt="Uploaded preview"
              className="max-h-60 max-w-full object-contain"
            />
          </div>
          <div className="flex gap-2 mt-3 w-full justify-between items-center border-t border-[#E7E7E2] pt-2">
            <span className="text-[11px] text-[#737871] truncate max-w-[200px]">
              {value.startsWith('data:') ? 'Custom uploaded image' : value}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs bg-[#FFFFFF] border border-[#E7E7E2] text-[#1A1A1A] hover:bg-[#E8EDE0] transition-colors flex items-center gap-1 shadow-xs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1 border border-red-200 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Dropzone for Drag & Drop + Browse */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#8A9A5B] bg-[#E8EDE0]/30'
              : 'border-[#E7E7E2] hover:border-[#8A9A5B] bg-[#F9F9F7]'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-[#E8EDE0] rounded-full text-[#8A9A5B]">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
              Click to browse or drag and drop artwork
            </p>
            <p className="text-[11px] text-[#737871]">
              PNG, JPG, JPEG, or WebP up to 10MB
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Quick Select from Studio Collection Presets */}
      {!value && (
        <div className="pt-2">
          <span className="text-[11px] text-[#737871] uppercase tracking-wider block mb-1.5">
            Or select existing studio piece:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleImages.map((s) => (
              <button
                key={s.url}
                type="button"
                onClick={() => onChange(s.url)}
                className="text-[11px] px-2.5 py-1 bg-[#F5F5F2] border border-[#E7E7E2] hover:bg-[#1A1C19] hover:text-white transition-colors flex items-center gap-1 text-[#5A5E57]"
              >
                <ImageIcon className="w-3 h-3" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
