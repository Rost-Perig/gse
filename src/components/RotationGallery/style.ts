import styled from 'styled-components'

interface IStylesProps {
  el_duration?: number
  el_rotation?: string
  el_top?: number
  el_left?: number
  el_delay?: number
  el_scale?: string
  start_el_top?: number
  start_el_left?: number
  animation_name?: string
}

export const GalleryWrapper = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #354239;
  height: 78vh;
  /* height: 720px; */
  margin: 16px 0;
  overflow: hidden;
  border: 1px solid #354239;
`

export const ItemRotationWrapper = styled.div<IStylesProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 200px;
  /* height: 160px; */
  padding: 12px;
  border: 2px solid #354239;

  animation: ${(props) => props.animation_name} ${(props) => props.el_duration + 'ms'} normal linear infinite 0ms;
  /* animation-play-state: running; */
  @keyframes ${(props) => props.animation_name} {
    ${(props) => props.el_scale}
  }
`

export const RotationWrapper = styled.div<IStylesProps>`
  position: absolute;
  top: ${(props) => props.start_el_top + 'px'};
  left: ${(props) => props.start_el_left + 'px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  animation: ${(props) => props.animation_name} ${(props) => props.el_duration + 'ms'} normal linear infinite 0ms;
  /* animation-play-state: paused; */

  @keyframes ${(props) => props.animation_name} {
    ${(props) => props.el_rotation}
  }
`

export const StyledImage = styled.img`
  width: 100%;
  box-shadow:
    0px 0px 10px 6px rgba(0, 0, 0, 0.1),
    0px 0px 12px 8px rgba(255, 255, 255, 0.3),
    0px 0px 4px 2px #354239;
`

/* @keyframes rotation {
    0% {
      opacity: 1;
      transform: scale(1) translate(0, 0);
    }

    66% {
      opacity: 0.5;
      transform: scale(1) translate(600px, 100px);
    }

    100% {
      opacity: 1;
      transform: scale(1) translate(60px, 40px);
    } */
