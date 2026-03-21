'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('harvegen_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Save to localStorage when user changes
  useEffect(() => {
    localStorage.setItem('harvegen_user', JSON.stringify(user))
  }, [user])

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const login = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('harvegen_user')
  }

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
