import React from 'react'
import { useEffect } from "react"
import { createNonNullExpression } from 'typescript'

function useSpotify() {

    const { data: session, status } = useSession()

    useEffect(() => {

    }, [session])

  return null
}

export default useSpotify