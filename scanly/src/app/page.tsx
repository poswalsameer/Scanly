"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [resetMenu, setResetMenu] = useState<boolean>(false);
  const[uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setUploadedFile(file);
    }
  };

  const extractText = async (file: File) => {
    setIsExtracting(true);

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      });

      setExtractedText(text);
      setResetMenu(true);
    } catch (error) {
      console.log("Error while reading the file: ", error);
    }

    setIsExtracting(false);
  };

  const startImageExtraction = () => {
    if(uploadedFile){
      extractText(uploadedFile);
    }
  }

  const backToMenu = () => {
    setUploadedFile(null);
    setResetMenu(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-around ">

      <div className="h-1/3 flex flex-col justify-center items-center gap-y-6">
        <div className=" w-full text-8xl flex justify-center items-center text-[#F4F6FF] font-bold ">
          Scanly
        </div>
        <div className="text-[#7C93C3] text-lg font-semibold">
            Get text from your images within a blink.
        </div>
      </div>

      <div className="h-2/3 flex flex-col justify-center items-center gap-y-8 ">

        {!resetMenu ? (

            <div className=" flex flex-row items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer w-full">
                <div className="w-80 h-14 border-2 border-dashed border-[#F4F6FF] rounded-md flex items-center justify-center transition-colors delay-75 ease-in bg-[#161235] hover:bg-[#201b49] ">
                  <div className="flex justify-center items-center gap-x-2 text-center">
                    <Upload className="mx-auto h-6 w-6 text-[#7C93C3]" />
                    <p className="text-sm text-[#7C93C3]">Upload image</p>
                  </div>
                </div>
              </label>
              <Button
                disabled={ !uploadedFile || isExtracting}
                className="h-14 w-56 transition-colors delay-75 ease-in bg-[#201b49] hover:bg-[#201b49ab] text-white rounded-md"
                onClick={startImageExtraction}
              >
                {isExtracting ? "Extracting..." : "Extract Text"}
              </Button>

            </div>

        ) : 
        ( 
          <div className="flex flex-row gap-x-5 mx-10">
            
            <div className="flex flex-col justify-center items-center text-[#CBDCEB] font-semibold text-lg gap-y-3 w-[30%] ">

              <p className="">Selected Image</p>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className=" w-full rounded-md object-contain"
              />
            ) : (
              <></>
            )}
            </div>
            
            <div className=" w-[70%] flex flex-col justify-center items-center text-[#CBDCEB] font-semibold text-lg gap-y-3">
              
              <div className="">
                Extracted Text
              </div>

              <div className="h-full w-full p-3 bg-[#1a183d] rounded-md text-white text-base font-semibold flex flex-col justify-center items-center text-center">
                {extractedText
                  ? extractedText
                  : "Upload an image to see extracted text"}
              </div>

            </div>
          
          </div> 
        ) 
        }

        {
          resetMenu && 
          <Button
            className="h-12 w-56 delay-75 ease-in bg-[#161235] hover:bg-[#201b49] text-white rounded-md"
            onClick={backToMenu}
          >
            Upload another image
          </Button>
        }

    
      </div>
      
    </div>
  );
}
