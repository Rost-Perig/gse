// обертання прописане функцією

import React, { useRef, useState, useEffect } from 'react'
import { changeGallerySize } from '@/store/features/gallery/gallerySize'
import { useAppDispatch } from '@/store/hooks'

interface IRotation {
  CENTER_X: number
  CENTER_Y: number
  SPIN: number
  ROTATION_AROUND_AXIS: number
  X_R: number
  Y_R: number
  DURATION: number
}

export const sampleSettings = {
  // почаккове положення першого елемента = 3-я година

  SPIN: 1, // спін напрям щбертання (1 або -1)
  CENTER_Y: 300, // зміщення центру обертання всередині діва-контейнера по осі У в пиіселях, 0- верхній лівий кут, У -> вниз
  CENTER_X: 600, //зміщення центру обертання всередині діва-контейнера по осі Х в пікселях, 0- верхній лівий кут, Х -> вправо
  ROTATION_AROUND_AXIS: 80, // кутове зміщення-поворот осі координат (разом з еліпсом), кут в градусах, + за год стрілкою
  X_R: 120, //радіуси еліпса в пікселях
  Y_R: 500,
  DURATION: 30000, //період повного обороту в мс
}

export function rotation(arrLength: number, rotationSettings: IRotation) {
  // arrLength - довжина масиву елементів-спутників (їх к-сть), що oбертаються

  let rotationsArr = []
  let scalesArr = []
  let startPositionsArr = []
  let animationNames = []

  const { CENTER_X, CENTER_Y, SPIN, X_R, Y_R, ROTATION_AROUND_AXIS, DURATION } = rotationSettings

  for (let i = 0; i < arrLength; i += 1) {
    let elLinearDisplacementArr = []
    let scaleArr = []

    let start_el_top = 0
    let start_el_left = 0
    const animationName = 'animation' + i
    animationNames.push(animationName)

    for (let n = 0; n <= 100; n += 1) {
      let step = 3.6
      let elementAngularDisplacement = step * n + i * (360 / arrLength) //кутове положення і-того елемента в n-ій точці еліпса
      if (elementAngularDisplacement > 360) {
        elementAngularDisplacement = elementAngularDisplacement - 360
      }

      let elementAngularPosition = SPIN * elementAngularDisplacement // кутове положення і-того елемента в n-ій точці еліпса в залежності від напрямку обертання (SPIN + або -)

      //формули координат класичного элліпса
      let x = X_R * Math.cos((elementAngularPosition * Math.PI) / 180)
      let y = Y_R * Math.sin((elementAngularPosition * Math.PI) / 180)

      //формули повороту осі координат
      let coordX =
        x * Math.cos((ROTATION_AROUND_AXIS * Math.PI) / 180) - y * Math.sin((ROTATION_AROUND_AXIS * Math.PI) / 180)
      let coordY =
        x * Math.sin((ROTATION_AROUND_AXIS * Math.PI) / 180) + y * Math.cos((ROTATION_AROUND_AXIS * Math.PI) / 180)

      let opacityFactor

      if (elementAngularDisplacement < 180) {
        opacityFactor = 1 - elementAngularDisplacement / 360
      } else {
        opacityFactor = 1 - (360 - elementAngularDisplacement) / 360
      }

      let scaleFactor
      if (elementAngularDisplacement < 180) {
        scaleFactor = 1 - elementAngularDisplacement / 270
      } else {
        scaleFactor = 1 - (360 - elementAngularDisplacement) / 270
      }

      let zIndexFactor = 1
      if (elementAngularDisplacement <= 180) {
        zIndexFactor = Math.round(51 - elementAngularDisplacement / step)
      } else {
        zIndexFactor = Math.round(elementAngularDisplacement / step - 49)
      }

      if (n === 0) {
        start_el_left = Math.round(coordX) + CENTER_X
        start_el_top = Math.round(coordY) + CENTER_Y

        startPositionsArr.push({ start_el_top, start_el_left })
      }

      let ElLinearDisplacement = `${n}% {z-index: ${zIndexFactor}; opacity: ${opacityFactor}; transform: translate(${
        Math.round(coordX) + CENTER_X - start_el_left
      }px, ${Math.round(coordY) + CENTER_Y - start_el_top}px)} `

      elLinearDisplacementArr.push(ElLinearDisplacement)

      let elScale = `${n}% {transform: scale(${scaleFactor})} `
      scaleArr.push(elScale)
    }
    rotationsArr.push(elLinearDisplacementArr.join(''))
    scalesArr.push(scaleArr.join(''))
  }

  return { rotationsArr, scalesArr, duration: DURATION, startPositionsArr, animationNames }
}

// хук - розміри компонента ( + динамічно в стор при необхідності)
export function useRotationSettings() {
  const ref = useRef<HTMLDivElement | null>(null)
  // const dispatch = useAppDispatch()
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      // dispatch(changeGallerySize({ width, height })) // при використанні стору
      setSize({ width, height })
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { ref, size }
}
