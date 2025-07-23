// 'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { siteNavigation } from '@/constants/constants'
import { changePage, selectPage } from '@/store/features/current-page/currentPage'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export const SiteNavigation = () => {
  const moreBtnRef = useRef(null)
  const menuRef = useRef(null)

  const [isVerticallyMenuOpen, setIsVerticallyMenuOpen] = useState(false)

  const dispatch = useAppDispatch()
  const currPage = useAppSelector(selectPage)

  // console.log('currentPage: ', currPage)

  const documentClickCallback = (e: MouseEvent): void => {
    const dropdownMenu = menuRef.current
    const dropdownBtn = moreBtnRef.current
    const isMenuClicked = e.composedPath().find((el) => el === dropdownMenu)
    const isDropdownBtn = e.composedPath().find((el) => el === dropdownBtn)
    if (!isMenuClicked && !isDropdownBtn) {
      setIsVerticallyMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', documentClickCallback)
    return () => {
      document.removeEventListener('click', documentClickCallback)
    }
  }, [])

  return (
    <div className="flex">
      <ul className="flex">
        {siteNavigation.horizontally.length &&
          siteNavigation.horizontally.map((el) => (
            <li key={el.name} className="flex">
              <Link
                href={el.link}
                className="flex flex-col justify-center min-w-[120px] w-32 px-3"
                onClick={() => dispatch(changePage(el.name))}
              >
                <p className="italic text-xs font-light text-colorText">{el.name}</p>
                <p
                  className={`text-base font-semibold text-right ${currPage === el.name ? 'text-colorText' : 'text-colorTextLight'} hover:text-colorText`}
                >
                  {el.name.toUpperCase()}
                </p>
              </Link>
              <div className="w-px h-full bg-repeat-y bg-[url('/images/MenuSeparator.png')]" />
            </li>
          ))}
        <button
          ref={moreBtnRef}
          onClick={() => setIsVerticallyMenuOpen(!isVerticallyMenuOpen)}
          className="relative flex flex-col justify-center min-w-[120px] w-32 px-3 pointer"
        >
          <p className="w-full italic text-xs font-light text-left text-colorText">more...</p>
          <p className="w-full text-base font-semibold text-right text-colorTextLight hover:text-colorText">
            {'more...'.toUpperCase()}
          </p>
          {isVerticallyMenuOpen && (
            <div
              ref={menuRef}
              onClick={() => setIsVerticallyMenuOpen(false)}
              className="absolute top-12 left-2 bg-repeat bg-[url('/images/bgSubmenu.png')]"
            >
              <ul className="flex flex-col">
                {siteNavigation.vertically.length &&
                  siteNavigation.vertically.map((el) => (
                    <li key={el.name} className="flex flex-col">
                      <Link
                        href={el.link}
                        className="min-w-[120px] w-32 px-3 py-1"
                        onClick={() => dispatch(changePage(el.name))}
                      >
                        <p
                          className={`italic text-xs font-light ${currPage === el.name ? 'text-colorText' : 'text-colorTextLight'} hover:text-colorText`}
                        >
                          {el.name}
                        </p>
                      </Link>
                      {siteNavigation.vertically.indexOf(el) !== siteNavigation.vertically.length - 1 && (
                        <div className="w-full h-px bg-repeat-y bg-[url('/images/sub_menu_separator.png')]" />
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </button>
      </ul>
    </div>
  )
}
