'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user && user.role !== 'customer') {
      router.push('/officer-dashboard')
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
          <h1 className="text-3xl font-bold text-secondary-900">Profile Settings</h1>
          <p className="text-secondary-600 mt-2">Manage your personal information and account settings.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <h2 className="text-xl font-semibold text-secondary-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={user.name}
                className="form-input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={user.email}
                className="form-input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={user.phone || ''}
                className="form-input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">Aadhaar Number</label>
              <input
                type="text"
                value={user.aadhaar || ''}
                className="form-input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">PAN Number</label>
              <input
                type="text"
                value={user.pan || ''}
                className="form-input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">Account Type</label>
              <input
                type="text"
                value={user.role === 'customer' ? 'Customer' : 'Officer'}
                className="form-input"
                disabled
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-secondary-200">
            <button className="btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
