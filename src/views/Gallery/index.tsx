import { PageTitle } from '@/components/PageTitle'
import { RotationGallery } from '@/components/RotationGallery'
import { pageTitles } from '@/constants/constants'

export default function Gallery() {
  return (
    <div className="flex flex-col w-full max-w-maxWidthSite">
      <PageTitle title={pageTitles.GALLERY} />
      <RotationGallery />
    </div>
  )
}
