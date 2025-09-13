'use client'

import { Plus, Upload, User, CreditCard, FileText, Settings } from 'lucide-react'

const quickActions = [
  {
    name: 'Apply for Loan',
    description: 'Start a new loan application',
    icon: Plus,
    href: '/dashboard/apply',
    color: 'bg-primary-100 text-primary-600'
  },
  {
    name: 'Upload Documents',
    description: 'Submit required documents',
    icon: Upload,
    href: '/dashboard/documents',
    color: 'bg-success-100 text-success-600'
  },
  {
    name: 'Update Profile',
    description: 'Manage your personal information',
    icon: User,
    href: '/dashboard/profile',
    color: 'bg-warning-100 text-warning-600'
  },
  {
    name: 'View Applications',
    description: 'Check application status',
    icon: FileText,
    href: '/dashboard/applications',
    color: 'bg-secondary-100 text-secondary-600'
  }
]

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      <div className="px-6 py-4 border-b border-secondary-200">
        <h3 className="text-lg font-semibold text-secondary-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <a
                key={action.name}
                href={action.href}
                className="flex items-center p-3 rounded-lg hover:bg-secondary-50 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${action.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900 group-hover:text-primary-600 transition-colors">
                    {action.name}
                  </p>
                  <p className="text-sm text-secondary-600">{action.description}</p>
                </div>
                <div className="text-secondary-400 group-hover:text-primary-600 transition-colors">
                  →
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
