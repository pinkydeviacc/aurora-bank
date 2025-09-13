'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">Aurora Bank</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/#products" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link href="/#features" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="/contact" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-1 z-50">
                    <Link
                      href={user.role === 'customer' ? '/dashboard' : '/officer-dashboard'}
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-secondary-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="btn-primary"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/#products" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Products
              </Link>
              <Link href="/#features" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Features
              </Link>
              <Link href="/contact" className="text-secondary-700 hover:text-primary-600 transition-colors">
                Contact
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-secondary-200">
                  <Link
                    href={user.role === 'customer' ? '/dashboard' : '/officer-dashboard'}
                    className="block text-secondary-700 hover:text-primary-600 transition-colors mb-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block text-secondary-700 hover:text-primary-600 transition-colors mb-2"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-secondary-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-secondary-200 space-y-2">
                  <button
                    onClick={onLoginClick}
                    className="block w-full text-left text-secondary-700 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onRegisterClick}
                    className="btn-primary w-full"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
