import React, { useEffect } from 'react'
import { StyledImage } from './style'

type ImageModalProps = {
  images: any
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const imageUrl = images[currentIndex]

  useEffect(() => {
    // Блокуємо скролінг
    document.body.classList.add('overflow-hidden')

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        onNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      // Відновлюємо скролінг
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNavigate])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center "
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative"
        style={{
          //   maxWidth: '60vw',
          //   maxHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '36px',
          border: '1px solid #354239',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl p-2 text-black hover:text-gray-700"
          onClick={() => onNavigate('prev')}
        >
          &#10094;
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl p-2 text-black hover:text-gray-700"
          onClick={() => onNavigate('next')}
        >
          &#10095;
        </button>

        <StyledImage src={imageUrl} alt="Selected" />
      </div>
    </div>
  )
}
