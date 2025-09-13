'use client'

import { ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react'

interface HeroSectionProps {
  onGetStartedClick: () => void
  onLoginClick: () => void
}

export default function HeroSection({ onGetStartedClick, onLoginClick }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Digital Loan Process
            <span className="block text-primary-200">Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Apply for loans online with our secure, fast, and user-friendly platform. 
            Get approved in minutes, not days.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStartedClick}
              className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={onLoginClick}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Login
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
              <p className="text-primary-100">
                Bank-grade security with end-to-end encryption
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-primary-100">
                Get approved in as little as 24 hours
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Application</h3>
              <p className="text-primary-100">
                Simple step-by-step process
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
