import React from 'react'
import { UserContext } from './UserContext'

export const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={{d:'ddd'}}>
        {children}
    </UserContext.Provider>
  )
}
