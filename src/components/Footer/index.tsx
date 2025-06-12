import { posix } from "node:path"

export const Footer = () => {

  return (
    <footer className="fixed bottom-0 left-0 flex flex-col items-center justify-start w-full px-8 min-h-[36px]" >
      <div className="w-full h-[1px] bg-repeat-x bg-[url('/images/Line.png')] overflow-hidden" />
      <p className="h-10 italic text-xs font-light text-colorTextLight" >
        © made with love by <span className="text-base font-semibold text-colorText">Rost</span> 2024
      </p>
    </footer>
  )
}
