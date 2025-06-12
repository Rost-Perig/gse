import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/images/Logo.png'
import { SiteNavigation } from '../SiteNavigation'
import { Clock } from '../Clock'

export const Header = () => {

  return (
    <>
     <header className="fixed top-0 flex flex-col w-full px-8 bg-repeat-x bg-[url('/images/bgPattern.png')]">
      
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center ">
            <Link href="/" className="w-52 p-1 mr-4 border border-solid border-colorBorder">
              <Image 
                src={Logo}
                alt="Logo" 
                className="w-52 h-10"  />
            </Link>
            <SiteNavigation />
          </div>
         
          <Clock />
        </div>
        <div className="w-full h-[1px] bg-repeat-x bg-[url('/images/Line.png')] overflow-hidden" />

    </header>
    </>
   
  )
}
