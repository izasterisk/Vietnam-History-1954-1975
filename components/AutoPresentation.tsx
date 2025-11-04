// 'use client'
//
// import { useState, useRef, useEffect } from 'react'
// import { EventData } from '@/lib/getEvents'
// import ReactMarkdown from 'react-markdown'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Narrator } from './Narrator'
//
// interface AutoPresentationProps {
//   events: EventData[]
// }
//
// // Cấu hình audio và ảnh cho từng giai đoạn
// const periodConfig: Record<string, any> = {
//   '1954 - 1960': {
//     audioPath: '/audio/1954-1960-narration.wav',
//     images: [
//       '/images/1954-1960/hoa-binh-geneva.jpg',
//       '/images/1954-1960/cai-cach-ruong-dat.png',
//       '/images/1954-1960/khoi-phuc-kinh-te.jpg',
//       '/images/1954-1960/dong-khoi-ben-tre.jpg',
//       '/images/1954-1960/mat-tran-gp.jpg',
//     ],
//     gradient: 'from-emerald-800 via-amber-700 to-emerald-900',
//     icon: '🌾'
//   },
//   '1961 - 1965': {
//     audioPath: '/audio/1961-1965-narration.wav',
//     images: [
//       '/images/1961-1965/dai-hoi-III.jpg',
//       '/images/1961-1965/duong-truong-son.jpg',
//       '/images/1961-1965/ap-bac.jpg',
//       '/images/1961-1965/binh-gia.jpg',
//       '/images/1961-1965/dong-xoai.jpg',
//     ],
//     gradient: 'from-red-800 via-orange-700 to-red-900',
//     icon: '⭐'
//   },
//   '1965 - 1968': {
//     audioPath: '/audio/1965-1968-narration.wav',
//     images: [
//       '/images/1965-1968/khong-quan-My.jpg',
//       '/images/1965-1968/phong-khong.jpg',
//       '/images/1965-1968/tet-mau-than.jpg',
//       '/images/1965-1968/hoi-nghi-paris.jpg',
//     ],
//     gradient: 'from-orange-800 via-red-700 to-slate-900',
//     icon: '🚀'
//   },
//   '1969 - 1973': {
//     audioPath: '/audio/1969-1973-narration.wav',
//     images: [
//       '/images/1969-1973/bac-ho-qua-doi.jpg',
//       '/images/1969-1973/lam-son-719.jpg',
//       '/images/1969-1973/dien-bien-phu-tren-khong.jpg',
//       '/images/1969-1973/B52-roi.jpg',
//       '/images/1969-1973/hiep-dinh-paris.jpg',
//     ],
//     gradient: 'from-slate-800 via-red-800 to-slate-900',
//     icon: '🏵️'
//   },
//   '1975': {
//     audioPath: '/audio/1975-narration.wav',
//     images: [
//       '/images/1975/buon-ma-thuot.jpg',
//       '/images/1975/giai-phong-hue.jpg',
//       '/images/1975/giai-phong-da-nang.jpg',
//       '/images/1975/chien-dich-ho-chi-minh.jpg',
//       '/images/1975/xe-tang-410.jpg',
//       '/images/1975/co-chien-thang.jpg',
//     ],
//     gradient: 'from-red-900 via-yellow-700 to-red-950',
//     icon: '🇻🇳'
//   }
// }
//
// function PresentationSlide({ event, isActive, config }: { event: EventData; isActive: boolean; config: any }) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [shownImages, setShownImages] = useState<number[]>([])
//   const [floatingImages, setFloatingImages] = useState<Array<{ index: number; position: { x: number; y: number; rotation: number; scale: number } }>>([])
//   const slideRef = useRef<HTMLDivElement>(null)
//
//   // Hàm tạo vị trí ngẫu nhiên cho ảnh
//   const generateRandomPosition = () => ({
//     x: Math.random() * 80 + 10, // 10% - 90% width
//     y: Math.random() * 80 + 10, // 10% - 90% height
//     rotation: Math.random() * 40 - 20, // -20deg to 20deg
//     scale: Math.random() * 0.3 + 0.7 // 0.7 to 1.0
//   })
//
//   // Hàm chọn ảnh tiếp theo một cách thông minh
//   const getNextImageIndex = (currentIndex: number, totalImages: number, alreadyShown: number[]) => {
//     // Nếu đã xem hết tất cả ảnh, reset lại
//     if (alreadyShown.length >= totalImages) {
//       setShownImages([])
//       return Math.floor(Math.random() * totalImages)
//     }
//
//     // Tạo mảng các ảnh chưa xem
//     const unseenImages = Array.from({ length: totalImages }, (_, i) => i)
//       .filter(i => !alreadyShown.includes(i))
//
//     // Nếu còn ảnh chưa xem
//     if (unseenImages.length > 0) {
//       // Ưu tiên các ảnh gần với ảnh hiện tại (tạo cảm giác tự nhiên hơn)
//       const nearbyImages = unseenImages.filter(i =>
//         Math.abs(i - currentIndex) <= 2 && i !== currentIndex
//       )
//
//       // 70% chọn ảnh gần, 30% chọn ảnh xa (random hoàn toàn)
//       if (nearbyImages.length > 0 && Math.random() < 0.7) {
//         return nearbyImages[Math.floor(Math.random() * nearbyImages.length)]
//       } else {
//         return unseenImages[Math.floor(Math.random() * unseenImages.length)]
//       }
//     }
//
//     // Fallback
//     return (currentIndex + 1) % totalImages
//   }
//
//   // Tự động chuyển ảnh và thêm ảnh floating
//   useEffect(() => {
//     if (!isActive) return
//
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => {
//         const nextIndex = getNextImageIndex(prevIndex, config.images.length, shownImages)
//         setShownImages(prev => [...prev, nextIndex])
//
//         // Thêm ảnh mới vào danh sách floating với vị trí ngẫu nhiên
//         setFloatingImages(prev => {
//           const newFloating = [
//             ...prev,
//             {
//               index: nextIndex,
//               position: generateRandomPosition()
//             }
//           ]
//           // Giới hạn tối đa 8 ảnh floating cùng lúc
//           return newFloating.slice(-8)
//         })
//
//         return nextIndex
//       })
//     }, 3000) // Chuyển ảnh mỗi 3 giây
//
//     return () => clearInterval(interval)
//   }, [isActive, config.images.length, shownImages])
//
//   // Reset khi chuyển slide
//   useEffect(() => {
//     if (isActive) {
//       const randomStart = Math.floor(Math.random() * config.images.length)
//       setCurrentImageIndex(randomStart)
//       setShownImages([randomStart])
//       setFloatingImages([{
//         index: randomStart,
//         position: generateRandomPosition()
//       }])
//     } else {
//       setFloatingImages([])
//     }
//   }, [isActive, config.images.length])
//
//   return (
//     <div
//       ref={slideRef}
//       className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden"
//       style={{
//         background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
//       }}
//     >
//       {/* Background animated gradient */}
//       <motion.div
//         className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`}
//         animate={{
//           backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
//         }}
//         transition={{ duration: 20, repeat: Infinity }}
//         style={{ backgroundSize: '400% 400%' }}
//       />
//
//       {/* Floating particles */}
//       <div className="absolute inset-0">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <motion.div
//             key={`particle-${i}`}
//             className="absolute w-2 h-2 bg-yellow-500/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -30, 0],
//               opacity: [0.3, 1, 0.3],
//             }}
//             transition={{
//               duration: 3 + Math.random() * 4,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//           />
//         ))}
//       </div>
//
//       {/* Floating Images - Ảnh bay khắp màn hình */}
//       <div className="absolute inset-0 pointer-events-none">
//         <AnimatePresence>
//           {floatingImages.map((floatingImg, idx) => (
//             <motion.div
//               key={`floating-${floatingImg.index}-${idx}`}
//               initial={{
//                 opacity: 0,
//                 scale: 0.3,
//                 x: '-100%',
//                 y: '-100%',
//                 rotate: -180
//               }}
//               animate={{
//                 opacity: 0.8,
//                 scale: floatingImg.position.scale,
//                 x: `${floatingImg.position.x}vw`,
//                 y: `${floatingImg.position.y}vh`,
//                 rotate: floatingImg.position.rotation
//               }}
//               exit={{
//                 opacity: 0,
//                 scale: 0,
//                 rotate: 180
//               }}
//               transition={{
//                 duration: 1.5,
//                 type: "spring",
//                 stiffness: 50
//               }}
//               className="absolute"
//               style={{
//                 width: '220px',
//                 height: '165px',
//                 zIndex: 5
//               }}
//             >
//               <motion.div
//                 className="w-full h-full rounded-xl shadow-2xl border-4 border-yellow-500/50 relative overflow-hidden bg-black"
//                 whileHover={{
//                   scale: 1.4,
//                   rotate: 0,
//                   zIndex: 50,
//                   transition: { duration: 0.3 }
//                 }}
//                 animate={{
//                   boxShadow: [
//                     '0 0 20px rgba(234, 179, 8, 0.3)',
//                     '0 0 40px rgba(234, 179, 8, 0.6)',
//                     '0 0 20px rgba(234, 179, 8, 0.3)',
//                   ]
//                 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 {/* Actual Image */}
//                 <img
//                   src={config.images[floatingImg.index]}
//                   alt={config.images[floatingImg.index].split('/').pop()?.split('.')[0]}
//                   className="w-full h-full object-cover"
//                 />
//
//                 {/* Shine effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                   initial={{ x: '-100%' }}
//                   animate={{ x: '200%' }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatDelay: 3,
//                     ease: "linear"
//                   }}
//                 />
//               </motion.div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//
//       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
//         {/* Left side - Main Image Display */}
//         <div className="flex flex-col gap-6">
//           {/* Main large image */}
//           <motion.div
//             key={currentImageIndex}
//             initial={{
//               opacity: 0,
//               scale: 0.8,
//               rotate: Math.random() > 0.5 ? 5 : -5,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               rotate: 0,
//             }}
//             transition={{
//               duration: 0.6,
//               type: "spring",
//               stiffness: 100
//             }}
//             className="relative h-96 rounded-2xl overflow-hidden border-4 border-yellow-500 shadow-2xl"
//           >
//             {/* Background image */}
//             <img
//               src={config.images[currentImageIndex]}
//               alt={config.images[currentImageIndex].split('/').pop()?.split('.')[0]}
//               className="w-full h-full object-cover absolute inset-0"
//             />
//
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//
//             {/* Icon badge */}
//             <div className="absolute top-4 right-4 text-5xl bg-black/50 rounded-full p-3 backdrop-blur-sm border-2 border-yellow-500/50">
//               {config.icon}
//             </div>
//
//             {/* Progress indicator */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {config.images.map((_: any, index: number) => (
//                 <motion.div
//                   key={`progress-${index}`}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index === currentImageIndex
//                       ? 'w-12 bg-yellow-500'
//                       : shownImages.includes(index)
//                       ? 'w-4 bg-green-500'
//                       : 'w-2 bg-white/30'
//                   }`}
//                   animate={index === currentImageIndex ? {
//                     scale: [1, 1.2, 1],
//                   } : {}}
//                   transition={{ duration: 0.3, repeat: Infinity }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//
//           {/* Thumbnail grid */}
//           <div className="grid grid-cols-5 gap-3">
//             {config.images.map((img: string, index: number) => (
//               <motion.div
//                 key={`thumb-${index}`}
//                 whileHover={{ scale: 1.15, rotate: 5 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setCurrentImageIndex(index)
//                   setShownImages(prev => [...prev, index])
//                   // Thêm vào floating khi click
//                   setFloatingImages(prev => [...prev, {
//                     index,
//                     position: generateRandomPosition()
//                   }].slice(-8))
//                 }}
//                 className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all pointer-events-auto ${
//                   index === currentImageIndex
//                     ? 'border-yellow-500 scale-105 shadow-lg shadow-yellow-500/50'
//                     : shownImages.includes(index)
//                     ? 'border-green-500 opacity-80'
//                     : 'border-gray-700 opacity-50'
//                 }`}
//                 animate={index === currentImageIndex ? {
//                   boxShadow: [
//                     '0 0 0 0 rgba(234, 179, 8, 0)',
//                     '0 0 0 10px rgba(234, 179, 8, 0.2)',
//                     '0 0 0 0 rgba(234, 179, 8, 0)'
//                   ]
//                 } : {}}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 {/* Actual thumbnail image */}
//                 <div className="w-full h-full relative bg-black">
//                   <img
//                     src={img}
//                     alt={img.split('/').pop()?.split('.')[0]}
//                     className="w-full h-full object-cover"
//                   />
//
//                   {/* Icon overlay */}
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                     <span className="text-3xl">{config.icon}</span>
//                   </div>
//                 </div>
//
//                 {shownImages.includes(index) && index !== currentImageIndex && (
//                   <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//
//           {/* Chú thích */}
//           <div className="text-center text-gray-400 text-sm font-body">
//             <div className="inline-flex flex-col gap-2">
//               <span className="inline-flex items-center gap-2">
//                 <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Đang xem
//                 <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span> Đã xem
//                 <span className="w-3 h-3 bg-white/30 rounded-full ml-2"></span> Chưa xem
//               </span>
//               <span className="text-yellow-500">
//                 💡 Click thumbnail để thêm ảnh bay!
//               </span>
//             </div>
//           </div>
//         </div>
//
//         {/* Right side - Content */}
//         <div className="flex flex-col justify-center space-y-6">
//           {/* Year badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className={`inline-block self-start px-6 py-3 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-heading font-bold text-3xl border-2 border-yellow-500 shadow-lg`}
//           >
//             {event.yearRange}
//           </motion.div>
//
//           {/* Title */}
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-5xl font-heading font-bold text-white leading-tight"
//           >
//             {event.title}
//           </motion.h2>
//
//           {/* Summary */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="text-2xl text-gray-300 font-body leading-relaxed"
//           >
//             {event.summary}
//           </motion.p>
//
//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="text-gray-200 text-lg font-body leading-relaxed markdown-content space-y-4"
//           >
//             <ReactMarkdown>
//               {event.content || ''}
//             </ReactMarkdown>
//           </motion.div>
//         </div>
//       </div>
//
//       {/* Period icon watermark */}
//       <div className="absolute bottom-8 left-8 text-9xl opacity-10">
//         {config.icon}
//       </div>
//     </div>
//   )
// }
//
// export function AutoPresentation({ events }: AutoPresentationProps) {
//   const [currentPeriod, setCurrentPeriod] = useState(0)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//
//   const currentEvent = events[currentPeriod]
//   const config = periodConfig[currentEvent.yearRange] || periodConfig['1975']
//
//   // Handle audio playback
//   useEffect(() => {
//     if (!isPlaying || !config) {
//       audioRef.current?.pause()
//       setIsSpeaking(false)
//       return
//     }
//
//     const audio = new Audio(config.audioPath)
//     audioRef.current = audio
//
//     audio.addEventListener('play', () => setIsSpeaking(true))
//     audio.addEventListener('pause', () => setIsSpeaking(false))
//     audio.addEventListener('ended', () => {
//       setIsSpeaking(false)
//       if (currentPeriod < events.length - 1) {
//         setTimeout(() => {
//           setCurrentPeriod((prev) => prev + 1)
//           window.scrollTo({
//             top: window.innerHeight * (currentPeriod + 1),
//             behavior: 'smooth'
//           })
//         }, 1000)
//       } else {
//         setIsPlaying(false)
//       }
//     })
//
//     audio.play().catch((error) => {
//       console.error('Audio playback failed:', error)
//       setIsSpeaking(false)
//     })
//
//     return () => {
//       audio.pause()
//       audio.remove()
//     }
//   }, [isPlaying, currentPeriod, config, events.length])
//
//   // Auto scroll to current period
//   useEffect(() => {
//     if (containerRef.current) {
//       const element = containerRef.current.children[currentPeriod] as HTMLElement
//       element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }, [currentPeriod])
//
//   // Keyboard controls
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (e.code === 'Space') {
//         e.preventDefault()
//         setIsPlaying((prev) => !prev)
//       } else if (e.code === 'ArrowRight' && currentPeriod < events.length - 1) {
//         setCurrentPeriod((prev) => prev + 1)
//         setIsPlaying(false)
//       } else if (e.code === 'ArrowLeft' && currentPeriod > 0) {
//         setCurrentPeriod((prev) => prev - 1)
//         setIsPlaying(false)
//       }
//     }
//
//     window.addEventListener('keydown', handleKeyPress)
//     return () => window.removeEventListener('keydown', handleKeyPress)
//   }, [currentPeriod, events.length])
//
//   return (
//     <div ref={containerRef} className="relative">
//       {/* Slides */}
//       {events.map((event, index) => (
//         <div key={event.slug} className={index === currentPeriod ? '' : 'hidden'}>
//           <PresentationSlide
//             event={event}
//             isActive={index === currentPeriod}
//             config={periodConfig[event.yearRange] || periodConfig['1975']}
//           />
//         </div>
//       ))}
//
//       {/* Narrator */}
//       <Narrator
//         isPlaying={isPlaying}
//         currentPeriod={currentPeriod}
//         onTogglePlay={() => setIsPlaying((prev) => !prev)}
//         isSpeaking={isSpeaking}
//       />
//
//       {/* Progress bar */}
//       <div className="fixed bottom-0 left-0 right-0 h-2 bg-gray-900 z-40">
//         <motion.div
//           className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600"
//           initial={{ width: '0%' }}
//           animate={{ width: `${((currentPeriod + 1) / events.length) * 100}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>
//
//       {/* Navigation controls */}
//       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40">
//         <motion.button
//           onClick={() => currentPeriod > 0 && setCurrentPeriod((prev) => prev - 1)}
//           disabled={currentPeriod === 0}
//           className="px-6 py-3 bg-slate-800 text-white rounded-lg font-heading font-bold disabled:opacity-30 hover:bg-slate-700 transition-all border-2 border-yellow-500"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           ← Trước
//         </motion.button>
//
//         <div className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-heading font-bold border-2 border-yellow-500">
//           {currentPeriod + 1} / {events.length}
//         </div>
//
//         <motion.button
//           onClick={() => currentPeriod < events.length - 1 && setCurrentPeriod((prev) => prev + 1)}
//           disabled={currentPeriod === events.length - 1}
//           className="px-6 py-3 bg-slate-800 text-white rounded-lg font-heading font-bold disabled:opacity-30 hover:bg-slate-700 transition-all border-2 border-yellow-500"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Sau →
//         </motion.button>
//       </div>
//
//       {/* Instructions overlay */}
//       <AnimatePresence>
//         {!isPlaying && currentPeriod === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
//             onClick={() => setIsPlaying(true)}
//           >
//             <motion.div
//               initial={{ scale: 0.8, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl shadow-2xl max-w-2xl text-center border-4 border-yellow-500"
//             >
//               <h2 className="text-5xl font-heading font-bold text-white mb-6">
//                 🎙️ Bài Thuyết Trình Tự Động
//               </h2>
//               <p className="text-2xl text-gray-300 mb-8 font-body">
//                 Nhấn <kbd className="px-3 py-1 bg-yellow-500 text-black rounded font-bold">PLAY</kbd> để bắt đầu hành trình lịch sử
//               </p>
//               <div className="space-y-3 text-gray-400 text-lg font-body">
//                 <p>⌨️ <kbd className="px-2 py-1 bg-slate-700 rounded">Space</kbd> - Tạm dừng/Tiếp tục</p>
//                 <p>⌨️ <kbd className="px-2 py-1 bg-slate-700 rounded">←</kbd> <kbd className="px-2 py-1 bg-slate-700 rounded">→</kbd> - Chuyển giai đoạn</p>
//               </div>
//               <motion.button
//                 onClick={() => setIsPlaying(true)}
//                 className="mt-8 px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-2xl font-heading font-bold rounded-xl shadow-lg border-2 border-yellow-500"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 ▶ Bắt Đầu Ngay
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
