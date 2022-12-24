interface IPlusMinusInput {
  value: number
  setValue: (value: number) => void
}

export const PlusMinusInput = ({ value, setValue }: IPlusMinusInput) => {
  console.log(value, 'value')
  return (
    <div className='flex'>
      <div
        onClick={() => setValue(value > 0 ? value - 1 : 0)}
        className='flex items-center justify-center w-8 bg-[#474747] rounded-sm p-2.5 cursor-pointer transition-all hover:bg-[#686868] select-none'>
        <img src={'./minus.svg'} alt='' />
      </div>
      <input className='w-8 text-center bg-transparent select-none' type='text' disabled value={value} />
      <div
        onClick={() => setValue(value + 1)}
        className='flex items-center justify-center w-8 bg-[#474747] rounded-sm p-2.5 cursor-pointer transition-all hover:bg-[#686868] select-none'>
        <img src={'./plus.svg'} alt='' />
      </div>
    </div>
  )
}