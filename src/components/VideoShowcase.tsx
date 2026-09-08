import React, { useState } from 'react';
import { videoData, videoCategories } from '../data/videoData';
import { VideoItem } from '../types';
import { Play, Eye, Heart, ExternalLink, Plus, Sparkles, X, Video, Share2 } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [videos, setVideos] = useState<VideoItem[]>(videoData);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  // Form for adding custom link
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VideoItem['category']>('mau-tiktok');

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const handleAddVideoLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.trim()) return;

    // Detect thumbnail based on link or fallback
    let videoUrl = newLink.trim();
    if (newLink.includes('tiktok.com') || newLink.includes('youtube.com') || newLink.includes('instagram.com')) {
      // Default placeholder mp4 for social links preview demo
      videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4';
    }

    const newVideoItem: VideoItem = {
      id: `vid-custom-${Date.now()}`,
      title: newTitle.trim() || 'Video Demo Mới Được Gắn Link',
      category: newCategory,
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      videoUrl: videoUrl,
      tiktokUrl: newLink.trim().startsWith('http') ? newLink.trim() : `https://${newLink.trim()}`,
      views: '1.2K',
      likes: '95',
      author: '@vuacapcutprotuananh',
      tags: ['Video Mới', 'Gắn Link']
    };

    setVideos([newVideoItem, ...videos]);
    setNewTitle('');
    setNewLink('');
    setShowAddModal(false);
  };

  return (
    <section id="sec-video-showcase" className="py-16 sm:py-20 bg-[#090318] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/50 border border-purple-600/40 text-pink-400 text-xs sm:text-sm font-semibold mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>Video chuyên nghiệp khi có Capcutpro</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Capcutpro Edit Ra <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Video Mẫu Hot Trend</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-purple-200/80">
            Xem thực tế các video thành phẩm khi có CapCut Pro
          </p>
        </div>

        {/* Categories + Add Link Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
            {videoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#180a30] text-purple-200/70 hover:text-white hover:bg-[#231045] border border-purple-800/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Add Link Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Gắn Link Video Mới</span>
          </button>
        </div>

        {/* 9:16 Vertical Video Grid matching uploaded image style */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#14082e]/60 border border-purple-800/40 max-w-xl mx-auto">
            <Video className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
            <p className="text-purple-200 text-sm sm:text-base font-medium">Chưa có video nào hiển thị</p>
            <p className="text-purple-400/70 text-xs mt-1">Bấm nút "Gắn Link Video Mới" phía trên để thêm video mẫu của bạn</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Gắn Link Video Mới</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredVideos.map((item) => {
              const isHovered = hoveredVideoId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredVideoId(item.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => setSelectedVideo(item)}
                  className="group relative rounded-2xl overflow-hidden bg-black border border-purple-800/50 hover:border-pink-500/80 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-pink-900/30 aspect-[9/16] flex flex-col justify-between"
                >
                  {/* Video / Poster preview */}
                  <div className="absolute inset-0 z-0">
                    {isHovered ? (
                      <video
                        src={item.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:from-black/95 group-hover:via-black/20 transition-all duration-300" />
                  </div>

                  {/* Top Badge Overlay */}
                  <div className="relative z-10 p-3 flex justify-between items-start gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-purple-200 border border-white/10">
                      {item.author}
                    </span>
                    <a
                      href={item.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Mở link TikTok"
                      className="p-1.5 rounded-full bg-black/60 hover:bg-pink-600/80 text-white backdrop-blur-md transition-all hover:scale-110"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="w-12 h-12 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg shadow-pink-600/50 group-hover:scale-110 group-hover:bg-pink-500 transition-all duration-300 backdrop-blur-sm border border-white/30">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Meta Overlay */}
                  <div className="relative z-10 p-3 text-left">
                    <div className="flex items-center gap-2 text-[10px] text-pink-300 font-medium mb-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                        {item.likes}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/70 text-purple-200 border border-purple-700/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative bg-[#14082e] border border-purple-700/60 rounded-2xl overflow-hidden max-w-sm sm:max-w-md w-full shadow-2xl flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-purple-800/60 bg-[#1c0c3f]">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-pink-400" />
                  <span className="text-sm font-bold text-white line-clamp-1">{selectedVideo.title}</span>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-800/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vertical 9:16 Video Player Container */}
              <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-4 bg-[#14082e] space-y-3">
                <div className="flex items-center justify-between text-xs text-purple-200/80">
                  <span className="font-semibold text-pink-400">{selectedVideo.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-purple-400" /> {selectedVideo.views} lượt xem</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> {selectedVideo.likes}</span>
                  </div>
                </div>

                <a
                  href={selectedVideo.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Xem Trên TikTok Chính Chủ</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Gắn Link Video Mới */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="relative bg-[#180a35] border border-purple-600/80 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  Gắn Link Video Mới
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-purple-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddVideoLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Tiêu Đề Video (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Mẫu CapCut Pro Xuất 4K Siêu Nét"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0f0524] border border-purple-700/60 text-white text-sm focus:outline-none focus:border-pink-500 placeholder-purple-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Đường Dẫn Link Video (TikTok, YouTube Shorts, Reels, MP4...) *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.tiktok.com/@vuacapcutprotuananh/video/..."
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0f0524] border border-purple-700/60 text-white text-sm focus:outline-none focus:border-pink-500 placeholder-purple-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Danh Mục
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0f0524] border border-purple-700/60 text-white text-sm focus:outline-none focus:border-pink-500"
                  >
                    <option value="mau-tiktok">Mẫu CapCut Pro HOT</option>
                    <option value="review-pro">Review Mẫu TikTok</option>
                    <option value="ai-voice">Lồng Tiếng AI Voice</option>
                    <option value="huong-dan">Hướng Dẫn Nâng Cấp</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-purple-950 text-purple-300 font-semibold text-xs hover:bg-purple-900"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-slate-950 font-bold text-xs hover:opacity-90 shadow-lg shadow-amber-500/20"
                  >
                    Thêm Link Vào Trang
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
