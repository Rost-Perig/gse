import { Counter } from '@/components/counter/Counter'
import { PageTitle } from '@/components/PageTitle'
import { Quotes } from '@/components/quotes/Quotes'
import { pageTitles } from '@/constants/constants'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full max-w-maxWidthSite ">
      <PageTitle title={pageTitles.HOME} />
      <Counter />
      <Quotes />
    </div>
  )
}
