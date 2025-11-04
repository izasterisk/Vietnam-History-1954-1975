'use client'

import dynamic from 'next/dynamic'

const VietnamMapClient = dynamic(
  () => import('./VietnamMapClient'),
  {
    ssr: false,
    loading: () => (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Bản đồ Việt Nam
            </h2>
            <p className="text-xl font-body text-gray-700 max-w-3xl mx-auto">
              Khám phá các địa điểm lịch sử quan trọng trong cuộc kháng chiến chống Mỹ, cứu nước (1954-1975)
            </p>
          </div>
          <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 font-body">Đang tải bản đồ...</p>
          </div>
        </div>
      </section>
    )
  }
)

export default function VietnamMapWrapper() {
  return <VietnamMapClient />
}