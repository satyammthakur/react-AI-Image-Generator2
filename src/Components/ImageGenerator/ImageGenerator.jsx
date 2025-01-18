import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import punk from "../Assests/punk.svg"
import.meta.env.VITE_STABILITY_API_KEY
const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const userPrompt = inputRef.current.value;
    if (!userPrompt.trim()) {
      setError("Please enter a description");
      return;
    }
    if (!import.meta.env.VITE_STABILITY_API_KEY) {
      setError("API key not found. Please check your environment variables.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`,
          },
          body: JSON.stringify({
            text_prompts: [{ text: userPrompt }],
            cfg_scale: 7,
            steps: 30,
            width: 1024,
            height: 1024,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedImageBase64 = data.artifacts[0].base64;
      setImageUrl(`data:image/png;base64,${generatedImageBase64}`);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-5 gap-8">
      <div className="text-3xl font-semibold">
        AI Image <span className="text-[#DE1B89] font-semibold">Generator</span>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <div >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[#DE1B89]" />
              <p className="text-gray-500">Generating your image...</p>
            </div>
          ) : (
            <img
               className='h-52'
              src={imageUrl === "/" ? punk : imageUrl}
              alt="AI Generated"
            />
          )}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      <div className="border-slate-800 flex flex-wrap justify-around rounded-3xl items-center h-16 w-8/12 bg-slate-800">
        <input
          ref={inputRef}
          className="bg-transparent text-lg text-white h-12 border-0 w-6/12 focus:outline-none border-none"
          placeholder="Describe what you want to see"
          type="text"
          onKeyPress={(e) => e.key === 'Enter' && imageGenerator()}
        />
        <button
          onClick={imageGenerator}
          disabled={loading}
          className={`flex items-center justify-around w-40 h-12 border rounded-3xl 
            ${loading ? 'bg-gray-500' : 'bg-[#DE1B89]'} 
            text-xl text-white cursor-pointer transition-colors
            ${loading ? 'cursor-not-allowed' : 'hover:bg-[#C0147A]'}`}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;