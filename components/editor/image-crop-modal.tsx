'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Crop, Check, RotateCcw } from 'lucide-react'
import ReactCrop, { Crop as PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onApplyCrop: (cropParams: { width: number, height: number, x: number, y: number }) => void
}

export function ImageCropModal({ isOpen, onClose, imageUrl, onApplyCrop }: ImageCropModalProps) {
  const [crop, setCrop] = useState<PixelCrop>({ unit: 'px', x: 0, y: 0, width: 0, height: 0 })
  const imgRef = useRef<HTMLImageElement>(null)
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (isOpen) {
      setCrop({ unit: 'px', x: 0, y: 0, width: 0, height: 0 })
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setNaturalSize({ width: naturalWidth, height: naturalHeight })
    // Initialize crop to 80% of image size, centered
    const minDim = Math.min(naturalWidth, naturalHeight) * 0.8
    setCrop({
      unit: 'px',
      width: minDim,
      height: minDim,
      x: (naturalWidth - minDim) / 2,
      y: (naturalHeight - minDim) / 2,
    })
  }

  const handleApply = () => {
    if (!imgRef.current) return

    const image = imgRef.current
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const realCrop = {
      x: Math.round(crop.x * scaleX),
      y: Math.round(crop.y * scaleY),
      width: Math.round(crop.width * scaleX),
      height: Math.round(crop.height * scaleY)
    }

    onApplyCrop(realCrop)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Crop className="w-5 h-5 mr-2 text-indigo-600" />
            Crop Image
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-gray-50 flex-1 overflow-auto flex items-center justify-center">
          {imageUrl ? (
            <ReactCrop crop={crop} onChange={c => setCrop(c)}>
              <img 
                ref={imgRef}
                src={imageUrl} 
                className="max-h-[50vh] w-auto max-w-full"
                onLoad={handleImageLoad}
                alt="Crop preview" 
              />
            </ReactCrop>
          ) : (
            <div className="text-gray-500">No image selected</div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <button 
            onClick={() => {
              if (imgRef.current) {
                const { naturalWidth, naturalHeight } = imgRef.current
                setCrop({ unit: 'px', x: 0, y: 0, width: naturalWidth, height: naturalHeight })
              }
            }}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Crop
          </button>
          
          <div className="space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm flex items-center transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
