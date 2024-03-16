import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ComingSoon = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen overflow-hidden">
        <Image src={'/coming.png'} width={0} height={0}
          className='lg: w-[490px] xxsm: w-40 mx-auto' 
          alt='Coming Soon Decoration'
          title='Coming Soon Decoration'
        />

        <h1 className="font-semibold text-primary text-center lg:text-[40px] p-1 md:text-[30px] xl:w-[70%] md:w-[90%] md:text-center leading-[50%]">
          Coming Soon
        </h1>

        <p className="text-gray text-sm text-center leading-2 md:pt-4 pt-2 md:text-center lg:text-base md:w-[70%] mb-4">
           This still in development process candidaters! <br />
           Stay tuned
        </p>

        <Link
          href="/superadmin"
          title="Back to Dashboard"
          about="Back to Dasboard"
          className="bg-secondary text-primary font-semibold self-center text-center md:text-base text-[16px] rounded-full md:px-16 md:py-4 px-8 py-3 text-center justify-center md:self-center self-start cursor-pointer lg:mt-5 md:mt-4 xxsm:mt-4 md:mt-[11px]"
        >
          Back to Dashboard
        </Link>
    </section>
  )
}

export default ComingSoon;
