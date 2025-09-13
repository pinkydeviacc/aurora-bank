'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import OfficerDashboardLayout from '@/components/OfficerDashboardLayout'
import ApplicationQueue from '@/components/ApplicationQueue'

export default function OfficerApplications() {
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
          <h1 className="text-3xl font-bold text-secondary-900">Application Management</h1>
          <p className="text-secondary-600 mt-2">Review and process loan applications.</p>
        </div>

        <ApplicationQueue />
      </div>
    </OfficerDashboardLayout>
  )
}
