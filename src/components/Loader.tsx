import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Loader = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleStart = () => {
        setIsLoading(true)
    }

    const handleComplete = () => {
        setIsLoading(false)
    }

    
  }, [])

  return (
    <div>Loader</div>
  )
}

export default Loader