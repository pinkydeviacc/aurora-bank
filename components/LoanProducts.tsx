'use client'

import { Home, Car, CreditCard, Building, GraduationCap, Briefcase } from 'lucide-react'
import { useState } from 'react'
import LoginModal from './LoginModal'

const loanProducts = [
  {
    id: 'home-loan',
    name: 'Home Loan',
    description: 'Buy your dream home with competitive interest rates',
    icon: Home,
    features: ['Up to 90% financing', 'Flexible tenure up to 30 years', 'Low interest rates'],
    interestRate: '8.5% - 12%',
    maxAmount: '₹5 Crores'
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    description: 'Quick personal loans for all your needs',
    icon: CreditCard,
    features: ['Quick approval', 'No collateral required', 'Flexible repayment'],
    interestRate: '10.5% - 18%',
    maxAmount: '₹50 Lakhs'
  },
  {
    id: 'car-loan',
    name: 'Car Loan',
    description: 'Drive home your favorite car today',
    icon: Car,
    features: ['Up to 100% financing', 'Quick processing', 'Competitive rates'],
    interestRate: '9% - 15%',
    maxAmount: '₹1 Crore'
  },
  {
    id: 'business-loan',
    name: 'Business Loan',
    description: 'Fuel your business growth with our business loans',
    icon: Briefcase,
    features: ['High loan amounts', 'Flexible terms', 'Quick disbursement'],
    interestRate: '12% - 20%',
    maxAmount: '₹10 Crores'
  },
  {
    id: 'education-loan',
    name: 'Education Loan',
    description: 'Invest in your future with education loans',
    icon: GraduationCap,
    features: ['No margin for top courses', 'Moratorium period', 'Tax benefits'],
    interestRate: '8% - 14%',
    maxAmount: '₹1.5 Crores'
  },
  {
    id: 'property-loan',
    name: 'Property Loan',
    description: 'Finance your commercial property purchase',
    icon: Building,
    features: ['Long tenure', 'Competitive rates', 'Easy documentation'],
    interestRate: '9.5% - 16%',
    maxAmount: '₹25 Crores'
  }
]

export default function LoanProducts() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleApplyNow = () => {
    // Check if user is logged in, if not show login modal
    const user = localStorage.getItem('userData')
    if (user) {
      // User is logged in, redirect to dashboard
      window.location.href = '/dashboard/apply'
    } else {
      // User not logged in, show login modal
      setShowLoginModal(true)
    }
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Our Loan Products
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Choose from our wide range of loan products designed to meet your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanProducts.map((product) => {
            const IconComponent = product.icon
            return (
              <div
                key={product.id}
                className="bg-white border border-secondary-200 rounded-xl p-6 card-hover shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-secondary-600">
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-secondary-100 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-secondary-500">Interest Rate</p>
                      <p className="text-lg font-semibold text-secondary-900">
                        {product.interestRate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-secondary-500">Max Amount</p>
                      <p className="text-lg font-semibold text-secondary-900">
                        {product.maxAmount}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleApplyNow}
                    className="w-full btn-primary"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false)
            // You can add register modal here if needed
          }}
        />
      )}
    </section>
  )
}
