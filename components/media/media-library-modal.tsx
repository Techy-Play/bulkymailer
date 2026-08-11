import React, { useState, useEffect, useRef } from 'react'
import { X, UploadCloud, Search, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import useDrivePicker from 'react-google-drive-picker'

interface MediaAsset {
  id: string
  url: string
  filename: string
  width: number | null
  height: number | null
  createdAt: string
}

interface MediaLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export function MediaLibraryModal({ isOpen, onClose, onSelect }: MediaLibraryModalProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [orgLogoUrl, setOrgLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [openPicker, authResponse] = useDrivePicker()

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (res.ok) {
        setAssets(data.items || [])
        setOrgLogoUrl(data.orgLogoUrl || null)
      } else {
        toast.error("Failed to load media library")
      }
    } catch (err) {
      console.error(err)
      toast.error("Network error")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const toastId = toast.loading("Uploading image...")
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload/template-image', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok && data.url) {
        toast.success("Uploaded successfully", { id: toastId })
        fetchMedia() // refresh library
      } else {
        toast.error(data.error || "Upload failed", { id: toastId })
      }
    } catch (err) {
      console.error(err)
      toast.error("Network error during upload", { id: toastId })
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const [pickedFile, setPickedFile] = useState<any>(null)

  // Handle Google Drive file processing after authResponse and pickedFile are available
  useEffect(() => {
    if (pickedFile && authResponse?.access_token) {
      const processGoogleDriveFile = async () => {
        const toastId = toast.loading("Importing from Google Drive...")
        try {
          const res = await fetch('/api/media/google-drive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileId: pickedFile.id,
              accessToken: authResponse.access_token,
              filename: pickedFile.name
            })
          })
          
          const result = await res.json()
          if (res.ok && result.url) {
            toast.success("Imported successfully", { id: toastId })
            fetchMedia()
          } else {
            toast.error(result.error || "Failed to import", { id: toastId })
          }
        } catch (err) {
          console.error(err)
          toast.error("Network error", { id: toastId })
        } finally {
          setPickedFile(null)
        }
      }
      processGoogleDriveFile()
    }
  }, [pickedFile, authResponse])

  const handleGoogleDriveImport = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID;
    const developerKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;

    if (!clientId || !developerKey) {
      toast.error("Google Drive is not configured properly in .env");
      return;
    }

    // Reset any previous picked file before opening picker
    setPickedFile(null)

    openPicker({
      clientId: clientId,
      developerKey: developerKey,
      viewId: "DOCS_IMAGES",
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === 'picked' && data.docs.length > 0) {
          // Set the picked file in state. The useEffect will handle the API call
          // once both this file and the authResponse (with access_token) are available.
          setPickedFile(data.docs[0])
        }
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center space-x-2 text-gray-900">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold">Media Library</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search images..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleGoogleDriveImport}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4 mr-2" />
              Import from Drive
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
              Upload Image
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading || uploading || pickedFile ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-sm font-medium text-gray-600">
                {pickedFile ? "Importing from Google Drive..." : uploading ? "Uploading image..." : "Loading media library..."}
              </p>
            </div>
          ) : assets.length === 0 && !orgLogoUrl ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ImageIcon className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No images yet</h3>
              <p className="text-sm">Upload an image or import from Google Drive to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {orgLogoUrl && (
                <div 
                  onClick={() => onSelect(orgLogoUrl)}
                  className="group relative aspect-square rounded-lg overflow-hidden border-2 border-indigo-200 bg-white cursor-pointer hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500 hover:ring-opacity-50 transition-all shadow-md"
                >
                  <img 
                    src={orgLogoUrl} 
                    alt="Organization Logo" 
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Org Logo
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate text-center">
                      Organization Logo
                    </p>
                  </div>
                </div>
              )}
              {assets.map((asset) => (
                <div 
                  key={asset.id}
                  onClick={() => onSelect(asset.url)}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100 cursor-pointer hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500 hover:ring-opacity-50 transition-all shadow-sm"
                >
                  <img 
                    src={asset.url} 
                    alt={asset.filename} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate" title={asset.filename}>
                      {asset.filename}
                    </p>
                    <p className="text-[10px] text-gray-300 mt-0.5">
                      {asset.width && asset.height ? `${asset.width}x${asset.height}` : 'Unknown size'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
