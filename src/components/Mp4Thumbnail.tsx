import { useState, useEffect, useRef } from "react";
import { Play, Dumbbell } from "lucide-react";

interface Mp4ThumbnailProps {
  videoUrl: string;
  className?: string;
}

export default function Mp4Thumbnail({ videoUrl, className = "" }: Mp4ThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!videoUrl) return;

    // Check if it's actually a direct MP4 URL
    const isMp4 = videoUrl.toLowerCase().includes(".mp4") || videoUrl.toLowerCase().includes("mixkit.co");
    if (!isMp4) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const video = document.createElement("video");
    
    // We set crossOrigin to anonymous in case CORS allows it, but handle error cases safely
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.preload = "auto";
    video.currentTime = 1.5; // Seek to 1.5 seconds to capture a good frame
    video.muted = true;
    video.playsInline = true;

    const handleSeeked = () => {
      if (!isMounted) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg");
          setThumbnail(dataUrl);
        }
      } catch (err) {
        console.warn("CORS restriction or error creating canvas thumbnail:", err);
        // Fallback is handled by state being null
      } finally {
        setLoading(false);
        video.removeEventListener("seeked", handleSeeked);
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      setLoading(false);
      video.removeEventListener("error", handleError);
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("error", handleError);

    // Force loading standard frame
    video.load();

    return () => {
      isMounted = false;
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
      video.src = "";
    };
  }, [videoUrl]);

  if (thumbnail) {
    return (
      <img
        src={thumbnail}
        alt="Workout Thumbnail"
        className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Fallback styling with dynamic gradient overlay, dumbbell icon and play button
  return (
    <div className={`w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center relative group overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:bg-emerald-500/20 transition-all duration-300" />
      <div className="w-12 h-12 rounded-full bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300 shadow-xl relative z-10">
        <Play className="w-5 h-5 fill-current translate-x-0.5" />
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] bg-zinc-950/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
        <Dumbbell className="w-3 h-3 text-emerald-500 animate-pulse" />
        <span>FIT REP VIDEO</span>
      </div>
    </div>
  );
}
