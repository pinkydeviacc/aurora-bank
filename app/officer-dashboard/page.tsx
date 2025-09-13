'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import OfficerDashboardLayout from '@/components/OfficerDashboardLayout'
import OfficerOverview from '@/components/OfficerOverview'
import ApplicationQueue from '@/components/ApplicationQueue'
import RecentReviews from '@/components/RecentReviews'

export default function OfficerDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user && user.role !== 'officer') {
      router.push('/dashboard')
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
    <OfficerDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Officer Dashboard</h1>
          <p className="text-secondary-600 mt-2">Welcome back, {user.name}! Manage loan applications and reviews.</p>
        </div>

        <OfficerOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ApplicationQueue />
          </div>
          <div>
            <RecentReviews />
          </div>
        </div>
      </div>
    </OfficerDashboardLayout>
  )
}
