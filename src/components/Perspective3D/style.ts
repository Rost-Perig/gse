import styled from 'styled-components'

interface IStylesPerspectiveProps {
  scene_perspective?: number
  scene_perspective_origin_x?: string
  scene_perspective_origin_y?: string
  item_z?: number
  camera_speed?: number
  camera_z?: number //координата по Z в пікселях 'ніби' наїзду камери, насправді - переміщення екрану Scene3D з побудованою на ньому пепрспективою
  viewport_height?: number
  random_top?: number
  random_left?: number
  item_opacity?: number
}

export const Viewport = styled.div<IStylesPerspectiveProps>`
  /* Viewport позволит нам установить высоту окна. Позже мы будем использовать его, чтобы установить 
  глубину сцены и использовать полосу прокрутки для навигации по оси Z. */
  position: relative;
  flex-grow: 1;
  width: 100%;
  height: 78vh;
  /* height: 720px; */
  margin: 16px 0;
  overflow: hidden;
  border: 1px solid #354239;
`
/* scene3D-контейнер - контейнер перспективи(уявляти як паралепіпед (коробка з-під взуття, в яку ми заглядаємо) 
наповнений площинами-прямокутниками через 1рх (координата z) на яких розміщуються всі інші елементи перспективи) .*/
// scene3D-контейнер задає перспективу сцени та початок перспективи. Його положення фіксоване, тому він завжди залишається на екрані.
export const Scene3DContainer = styled.div<IStylesPerspectiveProps>`
  /* перспектива - це властивість CSS, яка задає відстань між z=0 (основним екраном-площиною в Scene3DContainer) і користувачем. 
  Чим меншим є значення перспективи, тим більшим буде спотворення нашого зору.*/
  /* perspective-origin - це властивість CSS, точка сходження перспетиви b Scene3DContainer 
  (коортитати точки на лицевій грані (Scene3D) в якій сходяться поздовжні лінії Scene3DContainer-a, 
  точка на лицевій грані (Scene3D) коробки з-під взуття, навпроти якої знаходиться око-камера спостерігача)*/
  perspective: ${(props) => props.scene_perspective}px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* -webkit-perspective: calc(var(--scene_perspective) * var(--camera_speed) * 1px); */
  /* perspective: calc(var(--scene_perspective) * var(--camera_speed) * 1px); */
  /* perspective: calc(${(props) => props.scene_perspective} * ${(props) => props.camera_speed} * 1px); */

  /* -webkit-perspective-origin: calc(var(--scene_perspective_origin_x) * 1%) calc(var(--scene_perspective_origin_y) * 1%); */
  /* perspective-origin: calc(var(--scene_perspective_origin_x) * 1%) calc(var(--scene_perspective_origin_y) * 1%); */
  perspective-origin: ${(props) => props.scene_perspective_origin_x} ${(props) => props.scene_perspective_origin_y};
  /* will-change: perspective-origin; */
  /* -webkit-transform: translate3d(0, 0, 0); */
  transform: translate3d(0, 0, 0);
  /* opacity: 0.4; */
  /* filter: blur(16px); */
`

export const Item = styled.div<IStylesPerspectiveProps>`
  position: absolute;
  /* display: block; */
  top: ${(props) => props.random_top}%;
  left: ${(props) => props.random_left}%;

  display: flex;
  align-items: center;
  width: 400px;
  padding: 12px;
  border: 1px solid #354239;
  padding: 8px;
  /* background-color: red; */
  opacity: ${(props) => props.item_opacity};
  // -webkit-transform: translate3D(-2%, -20%, calc(var(--item_z) * var(--camera_speed) * 13 * -1px));
  /* transform: translate3D(0, 0, calc(var(--item_z) * var(--camera_speed) * 1 * -1px)); */
  z-index: ${(props) => props.item_z};
  transform: translate3D(0, 0, ${(props) => props.item_z}px);
`

// Scene3D встановлює положення нашої сцени по осі z.
// Scene3D - Це як екран в кіно, на який поектуються інші елементи перспективи(якщо віоно поміщені в нього і спозиційовані відносно нього)
/* Scene3D можна переміщати по осі Z. Це буде схоже на переміщення камери по осі z. Але насправді ми переміщуємо сцену, 
а камера(вікно перегляду) залишається нерухомою.*/
// У решті частини цієї статті ми будемо використовувати порівняння камер. .scene3D отримує повну висоту і ширину області перегляду.
export const Scene3D = styled.div<IStylesPerspectiveProps>`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  /* -webkit-transform-style: preserve-3d; */
  transform-style: preserve-3d;
  /* -webkit-transform: translateZ(calc(var(--cameraZ) * 1px)); */
  /* transform: translateZ(calc(var(--cameraZ) * 1px)); */
  /* camera_z?: Number //координата по Z в пікселях ніби наїзду камери, насправді переміщення екрану Scene3D з побудованою на ньому пепрспективою */
  transform: translateZ(
    ${(props) => {
      return props.camera_z
    }}px
  );
  will-change: transform;
  background: rgba(250, 250, 250, 0.02); /* потрібно тільки для візуального контролю */
`

export const StyledImage = styled.img`
  width: 100%;
  image-rendering: pixelated;
  box-shadow:
    0px 0px 10px 6px rgba(0, 0, 0, 0.1),
    0px 0px 12px 8px rgba(255, 255, 255, 0.3),
    0px 0px 4px 2px #354239;
`
