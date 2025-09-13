'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'officer' | 'admin'
  phone?: string
  aadhaar?: string
  pan?: string
  profileComplete?: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  role: 'customer' | 'officer'
  aadhaar?: string
  pan?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - in real app, this would be an API call
      const mockUsers = [
        {
          id: '1',
          email: 'customer@aurorabank.com',
          password: 'password123',
          name: 'John Doe',
          role: 'customer' as const,
          phone: '+91 9876543210',
          aadhaar: '123456789012',
          pan: 'ABCDE1234F',
          profileComplete: true
        },
        {
          id: '2',
          email: 'officer@aurorabank.com',
          password: 'officer123',
          name: 'Jane Smith',
          role: 'officer' as const,
          phone: '+91 9876543211',
          profileComplete: true
        }
      ]
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('authToken', 'mock-jwt-token')
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword))
        toast.success('Login successful!')
        return true
      } else {
        toast.error('Invalid email or password')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        phone: userData.phone,
        aadhaar: userData.aadhaar,
        pan: userData.pan,
        profileComplete: false
      }
      
      setUser(newUser)
      localStorage.setItem('authToken', 'mock-jwt-token')
      localStorage.setItem('userData', JSON.stringify(newUser))
      toast.success('Registration successful!')
      return true
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    router.push('/')
    toast.success('Logged out successfully')
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false
      
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('userData', JSON.stringify(updatedUser))
      toast.success('Profile updated successfully!')
      return true
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Profile update failed. Please try again.')
      return false
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
