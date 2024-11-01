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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      extractText(file);
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

  return (
    <div className="h-screen flex flex-col items-center justify-around ">

      <div className="h-1/3 flex flex-col justify-center items-center gap-y-4">
        <div className=" w-full text-8xl flex justify-center items-center text-white ">
          Scanly
        </div>
        <div className="text-white text-lg">
            Get text from your images within a blink.
        </div>
      </div>

      <div className="h-2/3 flex flex-col justify-center items-center gap-y-8">

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
                <div className="w-80 h-14 border-2 border-dashed border-blue-400 rounded-md flex items-center justify-center bg-blue-900/50 hover:bg-blue-900/70 transition-colors">
                  <div className="flex justify-center items-center gap-x-2 text-center">
                    <Upload className="mx-auto h-8 w-8 text-blue-300" />
                    <p className="mt-2 text-sm text-blue-300">Upload image</p>
                  </div>
                </div>
              </label>
              <Button
                disabled={!imagePreview || isExtracting}
                className="h-14 w-56 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                {isExtracting ? "Extracting..." : "Extract Text"}
              </Button>

            </div>

        ) : 
        ( 
          <div className="flex flex-row gap-x-5 mx-10">
            
            <div className=" flex flex-col justify-center items-center text-white text-lg gap-y-3 w-[30%] ">

              <p>Selected Image</p>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="h-full w-full rounded-md object-contain"
              />
            ) : (
              <></>
            )}
            </div>
            
            <div className="w-[70%] flex flex-col justify-center items-center text-white text-lg gap-y-3">
              
              <div>
                Extracted Text
              </div>

              <div className="h-full w-full p-3 border-2 border-white rounded-md text-white text-lg flex flex-col justify-center items-center font-normal">
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
            className="h-12 w-56 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            onClick={ () => setResetMenu(false) }
          >
            Upload another image
          </Button>
        }

    
      </div>
      
      


      {/* {resetMenu ? (
        <div className="max-w-2xl text-white text-lg flex flex-col justify-center items-center font-semibold">
          {extractedText
            ? extractedText
            : "Upload an image to see extracted text"}
        </div>
      ) : ( <></> )
      } */}
    </div>
  );
}

{
  /* <div className="mt-4">
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
          </div> */
}
