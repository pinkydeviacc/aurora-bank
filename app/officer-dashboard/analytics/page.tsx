'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import OfficerDashboardLayout from '@/components/OfficerDashboardLayout'
import { BarChart3, TrendingUp, Users, FileText, CheckCircle, Clock } from 'lucide-react'

const analyticsData = {
  totalApplications: 156,
  approvedApplications: 122,
  pendingApplications: 24,
  rejectedApplications: 10,
  approvalRate: 78.2,
  avgProcessingTime: 2.5,
  monthlyApplications: [
    { month: 'Jan', applications: 45, approved: 35 },
    { month: 'Feb', applications: 52, approved: 41 },
    { month: 'Mar', applications: 38, approved: 30 },
    { month: 'Apr', applications: 61, approved: 48 },
    { month: 'May', applications: 43, approved: 34 },
    { month: 'Jun', applications: 39, approved: 31 }
  ],
  loanTypes: [
    { type: 'Home Loan', count: 45, percentage: 28.8 },
    { type: 'Personal Loan', count: 38, percentage: 24.4 },
    { type: 'Car Loan', count: 32, percentage: 20.5 },
    { type: 'Business Loan', count: 25, percentage: 16.0 },
    { type: 'Education Loan', count: 16, percentage: 10.3 }
  ]
}

export default function Analytics() {
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
          <h1 className="text-3xl font-bold text-secondary-900">Analytics Dashboard</h1>
          <p className="text-secondary-600 mt-2">Track performance metrics and application statistics.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Applications</p>
                <p className="text-2xl font-bold text-secondary-900 mt-1">{analyticsData.totalApplications}</p>
                <p className="text-sm text-success-600 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Approval Rate</p>
                <p className="text-2xl font-bold text-secondary-900 mt-1">{analyticsData.approvalRate}%</p>
                <p className="text-sm text-success-600 mt-1">+3.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-secondary-900 mt-1">{analyticsData.avgProcessingTime} days</p>
                <p className="text-sm text-success-600 mt-1">-0.5 days improvement</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Active Customers</p>
                <p className="text-2xl font-bold text-secondary-900 mt-1">89</p>
                <p className="text-sm text-success-600 mt-1">+5 this month</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Applications Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Monthly Applications</h3>
            <div className="space-y-4">
              {analyticsData.monthlyApplications.map((item, index) => (
                <div key={item.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-600">{item.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(item.applications / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 w-8">{item.applications}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Types Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Loan Types Distribution</h3>
            <div className="space-y-4">
              {analyticsData.loanTypes.map((item, index) => (
                <div key={item.type} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-600">{item.type}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-secondary-900 w-8">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Application Status Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">{analyticsData.approvedApplications}</div>
              <div className="text-sm text-success-700">Approved</div>
            </div>
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <div className="text-2xl font-bold text-warning-600">{analyticsData.pendingApplications}</div>
              <div className="text-sm text-warning-700">Pending</div>
            </div>
            <div className="text-center p-4 bg-error-50 rounded-lg">
              <div className="text-2xl font-bold text-error-600">{analyticsData.rejectedApplications}</div>
              <div className="text-sm text-error-700">Rejected</div>
            </div>
          </div>
        </div>
      </div>
    </OfficerDashboardLayout>
  )
}
