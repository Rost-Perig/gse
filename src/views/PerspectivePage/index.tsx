import { PageTitle } from '@/components/PageTitle'
import { Perspective3D } from '@/components/Perspective3D'
import { pageTitles } from '@/constants/constants'

export default function PerspectivePage() {
  return (
    <>
      <PageTitle title={pageTitles.PERSPECTIVE} />
      <Perspective3D />
    </>
  )
}
