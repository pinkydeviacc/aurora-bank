'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import LoanApplicationForm from '@/components/LoanApplicationForm'

export default function ApplyLoan() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Apply for Loan</h1>
          <p className="text-secondary-600 mt-2">
            Complete the application form to get started with your loan process.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Loan Details', description: 'Choose loan type and amount' },
              { step: 2, title: 'Personal Info', description: 'Your personal information' },
              { step: 3, title: 'Financial Info', description: 'Income and employment details' },
              { step: 4, title: 'Documents', description: 'Upload required documents' },
              { step: 5, title: 'Review', description: 'Review and submit application' }
            ].map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.step
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-200 text-secondary-600'
                }`}>
                  {step.step}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.step ? 'text-primary-600' : 'text-secondary-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-secondary-500">{step.description}</p>
                </div>
                {index < 4 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.step ? 'bg-primary-600' : 'bg-secondary-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <LoanApplicationForm 
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
    </DashboardLayout>
  )
}
