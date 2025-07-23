'use client'

import { useState, useEffect, useMemo } from 'react'
import { rotation, sampleSettings, useRotationSettings } from './rotation-gallery'
import { GalleryWrapper, ItemRotationWrapper, RotationWrapper, StyledImage } from './style'
import { useGetImagesQuery } from '@/store/features/gallery/galleryApiSlice'
import { selectGallerySize } from '@/store/features/gallery/gallerySize' // при використанні стору
import { useAppSelector } from '@/store/hooks' // при використанні стору
import { ImageModal } from '../ImageModal/ImageModal'

export const RotationGallery: React.FC = () => {
  const { ref, size } = useRotationSettings()

  // const size = useAppSelector(selectGallerySize)  // при використанні стору

  // console.log('size: ', size)

  const [animatedObjects, setAnimatedObjects] = useState<HTMLElement[]>([])
  const [rotationDescription, setRotationDescription] = useState<{ [key: string]: any }>()

  const { data, isError, isLoading, isSuccess } = useGetImagesQuery(1)

  useEffect(() => {
    !!isLoading && console.log('isLoading: ', isLoading)
    !!isSuccess && console.log('isSuccess: ', isSuccess)
    console.log('rotationDescription: ', rotationDescription)
  }, [isLoading, isSuccess, rotationDescription])

  // ================================= + MODAL ==============================================

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  const modalImagesArr = useMemo(() => {
    return data?.hits.map((el: { largeImageURL: string }) => el.largeImageURL)
  }, [data?.hits])

  const openModal = (index: number) => setCurrentIndex(index)
  const closeModal = () => setCurrentIndex(null)

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (currentIndex === null) return
    const total = modalImagesArr.length
    const newIndex = direction === 'prev' ? (currentIndex - 1 + total) % total : (currentIndex + 1) % total
    setCurrentIndex(newIndex)
  }

  // ==========================================================================

  useEffect(() => {
    // if (!size.height && !size.width) {
    //   !size.height && !size.width && console.log('UPS!!!!!!!')
    //   return
    // }
    if (!!size.height && !!size.width) {
      // let updatedSettings = {
      //   ...sampleSettings,
      //   CENTER_Y: (size.height - 200) / 2,
      //   CENTER_X: (size.width - 200) / 2,
      //   X_R: (size.height - 200) / 2,
      //   Y_R: (size.width - 200) / 2,
      // }
      setRotationDescription(
        rotation(data?.hits.length, {
          ...sampleSettings,
          CENTER_Y: (size.height - 200) / 2,
          CENTER_X: (size.width - 200) / 2,
          X_R: (size.height - 200) / 2,
          Y_R: (size.width - 200) / 2,
        })
      )
    }
  }, [data?.hits.length, size.height, size.width])

  //  const rotationDescription = useMemo(() => {
  //   if (!!size.height && !!size.width) {
  //     let updatedSettings = {
  //       ...sampleSettings,
  //       CENTER_Y: (size.height - 200) / 2,
  //       CENTER_X: (size.width - 200) / 2,
  //       X_R: (size.height - 200) / 2,
  //       Y_R: (size.width - 200) / 2,
  //     }
  //     return rotation(data?.hits.length, updatedSettings)
  //   } else {
  //     !size.height && !size.width && console.log('UPS!!!!!!!')
  //     return null
  //   }
  // }, [data?.hits.length, size.height, size.width])

  useEffect(() => {
    let animatedElement
    let animatedElement1
    let elArr: HTMLElement[] = []
    let elArr1: HTMLElement[] = []
    rotationDescription?.animationNames.length &&
      rotationDescription?.animationNames.map((el: string) => {
        animatedElement = document.getElementById(`${el}`)
        animatedElement && elArr.push(animatedElement)
        animatedElement1 = document.getElementById(`${el + 'scale'}`)
        animatedElement1 && elArr1.push(animatedElement1)
      })
    setAnimatedObjects(elArr.concat(elArr1))
  }, [rotationDescription?.animationNames, rotationDescription?.animationNames.length])

  function pauseAnimation() {
    if (animatedObjects.length) {
      animatedObjects.map((el) => (el.style.animationPlayState = 'paused'))
    }
  }

  function resumeAnimation() {
    if (animatedObjects.length) {
      animatedObjects.map((el) => (el.style.animationPlayState = 'running'))
    }
  }

  return (
    <>
      {isError && (
        <div className="flex place-content-center pt-48 ">
          <h1 className="text-colorText">There was an error!!!</h1>
        </div>
      )}

      {/* {isSuccess && ( */}
      <GalleryWrapper ref={ref}>
        {data &&
          !!rotationDescription?.startPositionsArr.length &&
          data.hits.map((el: { [key: string]: any }, index: number) => (
            <RotationWrapper
              id={`${rotationDescription?.animationNames[index]}`}
              key={el.id}
              el_rotation={rotationDescription?.rotationsArr[index]}
              el_duration={rotationDescription?.duration}
              start_el_top={rotationDescription?.startPositionsArr[index]?.start_el_top}
              start_el_left={rotationDescription?.startPositionsArr[index]?.start_el_left}
              animation_name={rotationDescription?.animationNames[index]}
              onMouseOver={() => pauseAnimation()}
              onMouseOut={() => resumeAnimation()}
            >
              <ItemRotationWrapper
                id={`${rotationDescription?.animationNames[index] + 'scale'}`}
                el_scale={rotationDescription?.scalesArr[index]}
                el_duration={rotationDescription?.duration}
                animation_name={rotationDescription?.animationNames[index] + 'scale'}
                onClick={() => {
                  openModal(index)
                }}
              >
                <StyledImage src={el.previewURL} alt="img" />
              </ItemRotationWrapper>
            </RotationWrapper>
          ))}
        {currentIndex !== null && modalImagesArr.length && (
          <ImageModal
            images={modalImagesArr}
            currentIndex={currentIndex}
            onClose={closeModal}
            onNavigate={handleNavigate}
          />
        )}
      </GalleryWrapper>
      {/* )} */}
      {isLoading && (
        <div className="flex place-content-center pt-48 ">
          <h1 className="text-colorText">Loading...</h1>
        </div>
      )}
    </>
  )
}
