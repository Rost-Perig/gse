export const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-baseline px-20">
        <h1 className="text-2xl font-bold text-right text-colorText">{title.toUpperCase()}</h1>
        <h2 className="italic text-xl font-semibold text-colorTextLight">{title}</h2>
      </div>
      <div className="h-[11px] bg-repeat-x bg-[url('/images/LineWide.png')]" />
    </div>
  )
}
