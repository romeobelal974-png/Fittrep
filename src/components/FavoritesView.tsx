import { Heart, Play, Clock, Eye, Trash2, Shield, HeartCrack } from "lucide-react";
import { Video, Category, User } from "../types";
import { TranslationSet } from "../data/translations";
import Mp4Thumbnail from "./Mp4Thumbnail";

interface FavoritesViewProps {
  t: TranslationSet;
  lang: "en" | "ar";
  videos: Video[];
  categories: Category[];
  currentUser: User;
  onToggleFavorite: (videoId: string) => void;
  onPlayVideo: (video: Video) => void;
}

export default function FavoritesView({
  t,
  lang,
  videos,
  categories,
  currentUser,
  onToggleFavorite,
  onPlayVideo
}: FavoritesViewProps) {
  const isRtl = lang === "ar";

  // Filter videos that are inside current user's favorites
  const favoriteVideos = videos.filter((vid) => currentUser.favorites.includes(vid.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* 1. HEADER */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Heart className="w-6 h-6 text-emerald-500 fill-current" />
          {t.favsTitle}
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          {t.favsSub}
        </p>
      </div>

      {/* 2. GRID OF FAVORITED VIDEOS */}
      {favoriteVideos.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl py-16 px-6 text-center space-y-4">
          <HeartCrack className="w-12 h-12 text-zinc-600 mx-auto animate-bounce" />
          <h3 className="text-sm font-bold text-zinc-300">{t.favsEmpty}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVideos.map((video) => {
            const categoryObj = categories.find((c) => c.id === video.categoryId);

            return (
              <div
                id={`fav-video-card-${video.id}`}
                key={video.id}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5"
              >
                {/* Visual Thumbnail Area */}
                <div className="relative aspect-video bg-zinc-950 overflow-hidden shrink-0">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Mp4Thumbnail videoUrl={video.url} className="w-full h-full" />
                  )}

                  {/* Dark transparent scrim overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Play Hover Button */}
                  <button
                    onClick={() => onPlayVideo(video)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </button>

                  {/* Heart Favorite toggle - filled */}
                  <button
                    onClick={() => onToggleFavorite(video.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-center text-red-500 hover:bg-zinc-950 transition-all cursor-pointer z-10"
                    title={lang === "en" ? "Remove from Favorites" : "إزالة من المفضلة"}
                  >
                    <Heart className="w-4.5 h-4.5 fill-current" />
                  </button>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-zinc-950/80 backdrop-blur-xs text-[10px] font-mono font-bold text-zinc-300 rounded-md border border-zinc-800/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {video.duration} {t.browseDurationLabel}
                  </span>
                </div>

                {/* Card Info Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Category Label */}
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-emerald-400">
                      {categoryObj ? categoryObj.name : "Workout"}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-white text-base leading-snug tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {video.title}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                      {video.description}
                    </p>
                  </div>

                  {/* Trainer & Views Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-850 pt-3 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      {video.trainer.slice(0, 18)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-emerald-500" />
                      {video.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
