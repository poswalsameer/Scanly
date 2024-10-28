'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText } from 'lucide-react'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string>('')
  const [isExtracting, setIsExtracting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const extractText = () => {
    setIsExtracting(true)
    setTimeout(() => {
      setExtractedText("This is a simulation of extracted text from the uploaded image.")
      setIsExtracting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-y-20 p-4">

      <div className=' text-8xl flex justify-center items-center text-white '>
        Scanly
      </div>

      
      <div className="flex flex-row items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer w-full">
              <div className="w-80 h-14 border-2 border-dashed border-blue-400 rounded-md flex items-center justify-center bg-blue-900/50 hover:bg-blue-900/70 transition-colors">
                {image ? (
                  <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="flex justify-center items-center gap-x-2 text-center">
                    <Upload className="mx-auto h-8 w-8 text-blue-300" />
                    <p className="mt-2 text-sm text-blue-300">Upload image</p>
                  </div>
                )}
              </div>
            </label>
            <Button
              onClick={extractText}
              disabled={!image || isExtracting}
              className="h-14 w-56 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isExtracting ? 'Extracting...' : 'Extract Text'}
            </Button>
      </div>
          
        

    </div>
  )
}


{/* <div className="mt-4">
            <div className="flex items-center mb-2">
              <FileText className="mr-2 h-5 w-5 text-blue-300" />
              <h2 className="text-lg font-semibold">Extracted Text</h2>
            </div>
            <Textarea
              value={extractedText}
              readOnly
              placeholder="Extracted text will appear here..."
              className="w-full h-32 bg-blue-900/50 text-blue-50 placeholder-blue-300 resize-none"
            />
          </div> */}