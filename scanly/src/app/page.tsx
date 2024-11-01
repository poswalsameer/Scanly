"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast"
import Tesseract from "tesseract.js";

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [resetMenu, setResetMenu] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setUploadedFile(file);
    }

    toast({
      description: "Image uploaded successfully",
    })
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
    if (uploadedFile) {
      extractText(uploadedFile);
    }
  };

  const backToMenu = () => {
    setUploadedFile(null);
    setResetMenu(false);
  };

  return (
    <div className="
      min-h-screen flex flex-col items-center justify-around  
      sm:min-h-screen sm:flex sm:flex-col sm:items-center sm:justify-around  
      md:min-h-screen md:flex md:flex-col md:items-center md:justify-around
      lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-around 
      xl:min-h-screen xl:flex xl:flex-col xl:items-center xl:justify-around 
      2xl:min-h-screen 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-around ">

      {!resetMenu && (
        <>
          <div className="
            h-1/3 flex flex-col justify-center items-center gap-y-6
            sm:h-1/3 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-y-6
            md:h-1/3 md:flex md:flex-col md:justify-center md:items-center md:gap-y-6
            lg:h-1/3 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-y-6
            xl:h-1/3 xl:flex xl:flex-col xl:justify-center xl:items-center xl:gap-y-6
            2xl:h-1/3 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:gap-y-6">
            <div className=" 
            w-full text-7xl flex justify-center items-center
            sm:w-full sm:text-8xl sm:flex sm:justify-center sm:items-center
            md:w-full md:text-8xl md:flex md:justify-center md:items-center 
            lg:w-full lg:text-8xl lg:flex lg:justify-center lg:items-center 
            xl:w-full xl:text-8xl xl:flex xl:justify-center xl:items-center            
            2xl:w-full 2xl:text-8xl 2xl:flex 2xl:justify-center 2xl:items-center 
            
            text-[#F4F6FF] font-bold ">
              Scanly
            </div>
            <div className="
            text-sm
            sm:text-lg
            md:text-lg
            lg:text-lg
            xl:text-lg
            2xl:text-lg 
            
            text-[#7C93C3] font-semibold">
              Get text from your images within a blink.
            </div>
          </div>

          <div className="
          h-2/3 flex flex-col justify-center items-center
          sm:h-2/3 sm:flex sm:flex-col sm:justify-center sm:items-center
          md:h-2/3 md:flex md:flex-col md:justify-center md:items-center
          lg:h-2/3 lg:flex lg:flex-col lg:justify-center lg:items-center
          xl:h-2/3 xl:flex xl:flex-col xl:justify-center xl:items-center
          2xl:h-2/3 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center ">

            <div className=" 
            flex flex-col items-center gap-y-4
            sm:flex sm:flex-row sm:items-center
            md:flex md:flex-row md:items-center
            lg:flex lg:flex-row lg:items-center
            xl:flex xl:flex-row xl:items-center
            2xl:flex 2xl:flex-row 2xl:items-center">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer w-full">

                <div className="
                  w-64 h-12 border-2 border-dashed border-[#F4F6FF] rounded-md flex items-center justify-center transition-colors delay-75 
                  sm:w-80 sm:h-14 sm:border-2 sm:border-dashed sm:border-[#F4F6FF] sm:rounded-md sm:flex sm:items-center sm:justify-center sm:transition-colors sm:delay-75 sm:ease-in sm:bg-[#161235] sm:hover:bg-[#201b49]
                  md:w-80 md:h-14 md:border-2 md:border-dashed md:border-[#F4F6FF] md:rounded-md md:flex md:items-center md:justify-center md:transition-colors md:delay-75 md:ease-in md:bg-[#161235] md:hover:bg-[#201b49]
                  lg:w-80 lg:h-14 lg:border-2 lg:border-dashed lg:border-[#F4F6FF] lg:rounded-md lg:flex lg:items-center lg:justify-center lg:transition-colors lg:delay-75 lg:ease-in lg:bg-[#161235] lg:hover:bg-[#201b49]
                  xl:w-80 xl:h-14 xl:border-2 xl:border-dashed xl:border-[#F4F6FF] xl:rounded-md xl:flex xl:items-center xl:justify-center xl:transition-colors xl:delay-75 xl:ease-in xl:bg-[#161235] xl:hover:bg-[#201b49]
                  2xl:w-80 2xl:h-14 2xl:border-2 2xl:border-dashed 2xl:border-[#F4F6FF] 2xl:rounded-md 2xl:flex 2xl:items-center 2xl:justify-center 2xl:transition-colors 2xl:delay-75 2xl:ease-in 2xl:bg-[#161235] 2xl:hover:bg-[#201b49] ">
                  <div className="
                    flex justify-center items-center gap-x-2 text-center
                    sm:flex sm:justify-center sm:items-center sm:gap-x-2 sm:text-center
                    md:flex md:justify-center md:items-center md:gap-x-2 md:text-center
                    lg:flex lg:justify-center lg:items-center lg:gap-x-2 lg:text-center
                    xl:flex xl:justify-center xl:items-center xl:gap-x-2 xl:text-center
                    2xl:flex 2xl:justify-center 2xl:items-center 2xl:gap-x-2 2xl:text-center">
                    <Upload className="
                    mx-auto h-6 w-6 text-[#7C93C3]
                    sm:mx-auto sm:h-6 sm:w-6 sm:text-[#7C93C3]
                    md:mx-auto md:h-6 md:w-6 md:text-[#7C93C3]
                    lg:mx-auto lg:h-6 lg:w-6 lg:text-[#7C93C3]
                    xl:mx-auto xl:h-6 xl:w-6 xl:text-[#7C93C3]
                    2xl:mx-auto 2xl:h-6 2xl:w-6 2xl:text-[#7C93C3]" />
                    <p className="
                    text-sm text-[#7C93C3]
                    sm:text-sm sm:text-[#7C93C3]
                    md:text-sm md:text-[#7C93C3]
                    lg:text-sm lg:text-[#7C93C3]
                    xl:text-sm xl:text-[#7C93C3]
                    2xl:text-sm 2xl:text-[#7C93C3]">Upload image</p>
                  </div>
                </div>
              </label>
              <Button
                disabled={!uploadedFile || isExtracting}
                className="
                h-12 w-40 transition-colors delay-75 ease-in bg-[#201b49] hover:bg-[#201b49ab] text-white rounded-md
                sm:h-14 sm:w-56 sm:transition-colors sm:delay-75 sm:ease-in sm:bg-[#201b49] sm:hover:bg-[#201b49ab] sm:text-white sm:rounded-md
                md:h-14 md:w-56 md:transition-colors md:delay-75 md:ease-in md:bg-[#201b49] md:hover:bg-[#201b49ab] md:text-white md:rounded-md
                lg:h-14 lg:w-56 lg:transition-colors lg:delay-75 lg:ease-in lg:bg-[#201b49] lg:hover:bg-[#201b49ab] lg:text-white lg:rounded-md
                xl:h-14 xl:w-56 xl:transition-colors xl:delay-75 xl:ease-in xl:bg-[#201b49] xl:hover:bg-[#201b49ab] xl:text-white xl:rounded-md
                2xl:h-14 2xl:w-56 2xl:transition-colors 2xl:delay-75 2xl:ease-in 2xl:bg-[#201b49] 2xl:hover:bg-[#201b49ab] 2xl:text-white 2xl:rounded-md"
                onClick={startImageExtraction}
              >
                {isExtracting ? "Extracting..." : "Extract Text"}
              </Button>
            </div>
          </div>
        </>
      )}

      {resetMenu && (
        <>
          <div className="
            mt-5 flex flex-col justify-center items-center gap-y-16
            sm:mt-5 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-y-16
            md:mt-5 md:flex md:flex-col md:justify-center md:items-center md:gap-y-16
            lg:mt-5 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-y-16
            xl:mt-5 xl:flex xl:flex-col xl:justify-center xl:items-center xl:gap-y-16
            2xl:mt-5 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:gap-y-16">
            <div className=" 
            h-40 w-80 flex flex-col justify-center items-center text-[#CBDCEB] font-semibold text-lg gap-y-3
            sm:h-48 sm:w-96 sm:flex sm:flex-col sm:justify-center sm:items-center sm:text-[#CBDCEB] sm:font-semibold sm:text-lg sm:gap-y-3
            md:h-48 md:w-96 md:flex md:flex-col md:justify-center md:items-center md:text-[#CBDCEB] md:font-semibold md:text-lg md:gap-y-3
            lg:h-48 lg:w-96 lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-[#CBDCEB] lg:font-semibold lg:text-lg lg:gap-y-3
            xl:h-48 xl:w-96 xl:flex xl:flex-col xl:justify-center xl:items-center xl:text-[#CBDCEB] xl:font-semibold xl:text-lg xl:gap-y-3
            2xl:h-48 2xl:w-96 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:text-[#CBDCEB] 2xl:font-semibold 2xl:text-lg 2xl:gap-y-3 ">
              <p className="
              text-xl
              sm:text-xl
              md:text-xl
              lg:text-xl
              xl:text-xl
              2xl:text-xl">Selected Image</p>

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="
                  h-full w-full rounded-md object-contain
                  sm:h-full sm:w-full sm:rounded-md sm:object-contain
                  md:h-full md:w-full md:rounded-md md:object-contain
                  lg:h-full lg:w-full lg:rounded-md lg:object-contain
                  xl:h-full xl:w-full xl:rounded-md xl:object-contain
                  2xl:h-full 2xl:w-full 2xl:rounded-md 2xl:object-contain"
                />
              ) : (
                <></>
              )}
            </div>

            <div className="
              h-64 w-[20rem] flex flex-col justify-center items-center bg-[#1a183d] text-[#CBDCEB] font-semibold rounded-md text-lg gap-y-1
              sm:h-64 sm:w-[35rem] sm:flex sm:flex-col sm:justify-center sm:items-center sm:bg-[#1a183d] sm:text-[#CBDCEB] sm:font-semibold sm:rounded-md sm:text-lg sm:gap-y-1
              md:h-64 md:w-[45rem] md:flex md:flex-col md:justify-center md:items-center md:bg-[#1a183d] md:text-[#CBDCEB] md:font-semibold md:rounded-md md:text-lg md:gap-y-1
              lg:h-64 lg:w-[60rem] lg:flex lg:flex-col lg:justify-center lg:items-center lg:bg-[#1a183d] lg:text-[#CBDCEB] lg:font-semibold lg:rounded-md lg:text-lg lg:gap-y-1
              xl:h-64 xl:w-[70rem] xl:flex xl:flex-col xl:justify-center xl:items-center xl:bg-[#1a183d] xl:text-[#CBDCEB] xl:font-semibold xl:rounded-md xl:text-lg xl:gap-y-1
              2xl:h-64 2xl:w-[70rem] 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:bg-[#1a183d] 2xl:text-[#CBDCEB] 2xl:font-semibold 2xl:rounded-md 2xl:text-lg 2xl:gap-y-1">
              <div className="
                mt-4 text-xl
                sm:mt-4 sm:text-xl
                md:mt-4 md:text-xl
                lg:mt-4 lg:text-xl
                xl:mt-4 xl:text-xl
                2xl:mt-4 2xl:text-xl">
                  Extracted Text
              </div>

              <div className="
                h-full w-full p-3 text-white text-sm font-normal flex flex-col justify-center items-center text-center overflow-auto
                sm:h-full sm:w-full sm:p-3 sm:text-white sm:text-base sm:font-semibold sm:flex sm:flex-col sm:justify-center sm:items-center sm:text-center sm:overflow-auto
                md:h-full md:w-full md:p-3 md:text-white md:text-base md:font-semibold md:flex md:flex-col md:justify-center md:items-center md:text-center md:overflow-auto
                lg:h-full lg:w-full lg:p-3 lg:text-white lg:text-base lg:font-semibold lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center lg:overflow-auto 
                xl:h-full xl:w-full xl:p-3 xl:text-white xl:text-base xl:font-semibold xl:flex xl:flex-col xl:justify-center xl:items-center xl:text-center xl:overflow-auto 
                2xl:h-full 2xl:w-full 2xl:p-3 2xl:text-white 2xl:text-base 2xl:font-semibold 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:text-center 2xl:overflow-auto ">
                {extractedText
                  ? extractedText
                  : "Upload an image to see extracted text"}
              </div>
            </div>
          </div>

          <Button
            className="
            h-12 w-56 delay-75 ease-in bg-[#161235] hover:bg-[#201b49] text-white rounded-md
            sm:h-12 sm:w-56 sm:delay-75 sm:ease-in sm:bg-[#161235] sm:hover:bg-[#201b49] sm:text-white sm:rounded-md
            md:h-12 md:w-56 md:delay-75 md:ease-in md:bg-[#161235] md:hover:bg-[#201b49] md:text-white md:rounded-md
            lg:h-12 lg:w-56 lg:delay-75 lg:ease-in lg:bg-[#161235] lg:hover:bg-[#201b49] lg:text-white lg:rounded-md
            xl:h-12 xl:w-56 xl:delay-75 xl:ease-in xl:bg-[#161235] xl:hover:bg-[#201b49] xl:text-white xl:rounded-md
            2xl:h-12 2xl:w-56 2xl:delay-75 2xl:ease-in 2xl:bg-[#161235] 2xl:hover:bg-[#201b49] 2xl:text-white 2xl:rounded-md"
            onClick={backToMenu}
          >
            Upload another image
          </Button>
        </>
      )}
    </div>
  );
}
