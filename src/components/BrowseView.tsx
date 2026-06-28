import { useState, useMemo } from "react";
import { Search, Heart, Play, Clock, Eye, Sparkles, Shield, Compass, Calendar, CheckCircle } from "lucide-react";
import { Video, Category, User } from "../types";
import { TranslationSet } from "../data/translations";
import Mp4Thumbnail from "./Mp4Thumbnail";

interface BrowseViewProps {
  t: TranslationSet;
  lang: "en" | "ar";
  videos: Video[];
  categories: Category[];
  currentUser: User;
  onToggleFavorite: (videoId: string) => void;
  onPlayVideo: (video: Video) => void;
  remainingDays: number;
}

export default function BrowseView({
  t,
  lang,
  videos,
  categories,
  currentUser,
  onToggleFavorite,
  onPlayVideo,
  remainingDays
}: BrowseViewProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isRtl = lang === "ar";

  // Filter videos based on category and search (memoized for high performance)
  const filteredVideos = useMemo(() => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    return videos.filter((vid) => {
      const matchesCategory = selectedCategoryId === "all" || vid.categoryId === selectedCategoryId;
      if (!matchesCategory) return false;
      if (!cleanQuery) return true;
      return (
        vid.title.toLowerCase().includes(cleanQuery) ||
        vid.description.toLowerCase().includes(cleanQuery) ||
        vid.trainer.toLowerCase().includes(cleanQuery)
      );
    });
  }, [videos, selectedCategoryId, searchQuery]);

  // Calculate formatted expiration date
  const getExpirationDateString = () => {
    if (!currentUser.subscription?.expiresAt) return "N/A";
    const date = new Date(currentUser.subscription.expiresAt);
    return date.toLocaleDateString(lang === "en" ? "en-US" : "ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getPlanTranslation = (plan: string) => {
    if (lang === "ar") {
      switch (plan) {
        case "Basic": return "الأساسي (شهر)";
        case "Premium": return "الممتاز (٣ أشهر)";
        case "Elite": return "النخبة (سنة)";
        case "Custom": return "اشتراك مخصص";
        default: return "لا يوجد";
      }
    }
    return plan;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* 1. SUBSCRIPTION EXPIRATION SUMMARY CARD */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-full bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
              {lang === "en" ? "Subscription Status" : "حالة اشتراكك الرياضي"}
            </div>
            <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {getPlanTranslation(currentUser.subscription?.plan || "None")}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {lang === "en" ? "Account ID" : "معرّف الحساب"}: {currentUser.phone}
            </p>
          </div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-850 px-5 py-3 rounded-2xl shrink-0 text-right md:text-left">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
            {lang === "en" ? "Remaining Access" : "صلاحية المشاهدة المتبقية"}
          </div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">
            {remainingDays > 0 ? (
              lang === "en" ? (
                `Valid for ${remainingDays} days`
              ) : (
                `صالح لمدة ${remainingDays} يوم`
              )
            ) : (
              t.browseNoDays
            )}
          </div>
          <div className="text-[10px] text-zinc-400 mt-1 font-sans">
            {lang === "en" ? "Expires on" : "ينتهي في"}: {getExpirationDateString()}
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER HEADER */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-emerald-500" />
            {t.browseHeaderTitle}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {lang === "en" 
              ? `Displaying ${filteredVideos.length} premium exercises` 
              : `نعرض الآن ${filteredVideos.length} تدريباً رياضياً ممتازاً`}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full lg:max-w-md">
          <span className={`absolute inset-y-0 flex items-center text-zinc-400 ${isRtl ? "left-3" : "right-3"}`}>
            <Search className="w-4 h-4" />
          </span>
          <input
            id="browse-video-search"
            type="text"
            placeholder={t.browseSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-white rounded-xl py-3 px-4 outline-none transition-all ${
              isRtl ? "pl-10" : "pr-10"
            }`}
          />
        </div>
      </div>

      {/* 3. CATEGORY SCROLLBAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <button
          id="category-filter-all"
          onClick={() => setSelectedCategoryId("all")}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedCategoryId === "all"
              ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/10"
              : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          {t.browseAllCategories}
        </button>
        {categories.map((cat) => (
          <button
            id={`category-filter-${cat.id}`}
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategoryId === cat.id
                ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/10"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 4. VIDEO GRID */}
      {filteredVideos.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl py-16 px-6 text-center space-y-4">
          <Search className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-300">{t.browseNoVideosFound}</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {lang === "en" 
              ? "Try adjusting your search query, clearing filters, or browsing other categories." 
              : "حاول تغيير كلمات البحث أو مسح الفلاتر أو تصفح الأقسام الأخرى."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isFav = currentUser.favorites.includes(video.id);
            const categoryObj = categories.find(c => c.id === video.categoryId);

            return (
              <div
                id={`video-card-${video.id}`}
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

                  {/* Heart Favorite toggle (absolute) */}
                  <button
                    onClick={() => onToggleFavorite(video.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-950 transition-all cursor-pointer z-10"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 transition-transform duration-200 active:scale-125 ${
                        isFav ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
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
