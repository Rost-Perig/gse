'use client'

import { useEffect, useState } from 'react'
import { Item, Scene3D, Scene3DContainer, StyledImage, Viewport } from './style'
import { useGetImagesQuery } from '@/store/features/gallery/galleryApiSlice'

let perspectiveSettings = {
  scenePerspective: 820,
  scenePerspectiveOriginX: '50%',
  scenePerspectiveOriginY: '50%',
  cameraSpeed: 0.2,
  cameraZ: 0, //координата по Z в пікселях 'ніби' наїзду камери, насправді - переміщення екрану Scene3D з побудованою на ньому пепрспективою
}

export const Perspective3D = () => {
  const [scenePerspective, setScenePerspective] = useState(perspectiveSettings.scenePerspective)
  const [scenePerspectiveOriginX, setScenePerspectiveOriginX] = useState(perspectiveSettings.scenePerspectiveOriginX)
  const [scenePerspectiveOriginY, setScenePerspectiveOriginY] = useState(perspectiveSettings.scenePerspectiveOriginY)
  const [cameraSpeed, setCameraSpeed] = useState(perspectiveSettings.cameraSpeed)
  const [cameraZ, setCameraZ] = useState(perspectiveSettings.cameraZ)
  const [itemsTop, setItemsTop] = useState<number[]>([])
  const [itemsLeft, setItemsLeft] = useState<number[]>([])
  const [itemsZ, setItemsZ] = useState<number[]>([])
  // const [mouseOn, setMouseOn] = useState(false)

  const { data, isError, isLoading, isSuccess } = useGetImagesQuery(1)
  // console.log('data:', data)

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //Максимум и минимум включаются
  }

  useEffect(() => {
    // console.log('itemsLeft: ', itemsLeft)
    // console.log('itemsTop: ', itemsTop)
  }, [itemsTop, itemsLeft])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // console.log(e)
    let scrollValue = e.deltaY
    setCameraZ(cameraZ + scrollValue * cameraSpeed)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setScenePerspectiveOriginX(e.clientX + 'px')
    setScenePerspectiveOriginY(e.clientY + 'px')
  }

  useEffect(() => {
    let topArr: number[] = []
    let zArr: number[] = []
    let leftArr: number[] = []
    if (data) {
      data.hits.map((el: any) => {
        topArr.push(getRandomIntInclusive(0, 64))
        leftArr.push(getRandomIntInclusive(0, 72))
        zArr.push(Math.random())
      })
    }
    setItemsTop(topArr)
    setItemsLeft(leftArr)
    setItemsZ(zArr)
  }, [data])

  return (
    <Viewport>
      <Scene3DContainer
        id="my_scene"
        onWheel={handleWheel}
        scene_perspective={scenePerspective}
        camera_speed={cameraSpeed}
        scene_perspective_origin_x={scenePerspectiveOriginX}
        scene_perspective_origin_y={scenePerspectiveOriginY}
        onMouseMove={handleMouseMove}
      >
        <Scene3D camera_z={cameraZ}>
          {data &&
            data.hits.map((el: any, index: number) => (
              <Item
                key={el.id}
                random_top={itemsTop[index]}
                random_left={itemsLeft[index]}
                item_z={itemsZ[index] ? itemsZ[index] * -200 : 0}
                item_opacity={itemsZ[index] ? 1 - itemsZ[index] / 3 : 1}
                onClick={() => console.log('CLICK: ' + el.pageURL)}
              >
                <StyledImage src={el.largeImageURL} alt="img" />
              </Item>
            ))}
        </Scene3D>
      </Scene3DContainer>
    </Viewport>
  )
}
