interface IPlusMinusInput {
  value: number
  setValue: (value: number) => void
  minValue?: number
  maxValue?: number
}

export const PlusMinusInput = ({ value, setValue, minValue, maxValue }: IPlusMinusInput) => {
  const min = minValue !== undefined ? minValue : 0
  const max = maxValue !== undefined ? maxValue : 9999999

  return (
    <div className='flex'>
      <div
        onClick={() => setValue(value > min ? value - 1 : min)}
        className='flex items-center justify-center w-8 bg-[#474747] rounded-sm p-2.5 cursor-pointer transition-all hover:bg-[#686868] select-none'>
        <img src={'./minus.svg'} alt='' />
      </div>
      <input className='w-8 text-center bg-transparent select-none' type='text' disabled value={value} />
      <div
        onClick={() => setValue(value < max ? value + 1 : max)}
        className='flex items-center justify-center w-8 bg-[#474747] rounded-sm p-2.5 cursor-pointer transition-all hover:bg-[#686868] select-none'>
        <img src={'./plus.svg'} alt='' />
      </div>
    </div>
  )
}