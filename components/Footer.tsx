'use client'

import { useState } from 'react'
import { VideoModal } from './VideoModal'

export function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <footer className="bg-gradient-to-b from-slate-900 to-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Project Info */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-yellow-500">
                Lịch Sử Việt Nam 1954-1975
              </h3>
              <p className="text-gray-300 font-body leading-relaxed mb-4">
                Dự án ghi nhớ và tôn vinh những hy sinh anh dũng của dân tộc Việt Nam trong cuộc kháng chiến chống Mỹ, cứu nước.
              </p>
              <p className="text-gray-400 text-sm font-body">
                © 2024 Vietnam History Project. Tất cả quyền được bảo lưu.
              </p>
            </div>

            {/* Right Column - Special Video Link */}
            <div className="flex flex-col items-start md:items-end justify-center">
              <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-500/50 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 w-full md:w-auto">
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-heading font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">▶️</span>
                  <div className="text-left">
                    <div className="text-lg">Nỗi đau giữa hoà bình</div>
                  </div>
                </button>
                <p className="text-xs text-gray-300 mt-3 text-center font-body italic">
                  Một góc nhìn về hậu quả chiến tranh
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-6"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-body">
            <div className="flex items-center gap-2">
              <span className="text-red-600 text-xl">🇻🇳</span>
              <span>Hoàng Sa, Trường Sa là của Việt Nam</span>
              <span className="text-red-600 text-xl">🇻🇳</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="/NoiDauGiuaHoaBinh.mp4"
        title="Nỗi đau giữa hoà bình"
      />
    </>
  )
}
