'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import OfficerDashboardLayout from '@/components/OfficerDashboardLayout'
import { Search, Filter, User, Mail, Phone } from 'lucide-react'

const customers = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    applications: 2,
    status: 'active',
    lastLogin: '2024-01-20'
  },
  {
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+91 9876543211',
    applications: 1,
    status: 'active',
    lastLogin: '2024-01-19'
  },
  {
    id: 'CUST003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+91 9876543212',
    applications: 3,
    status: 'inactive',
    lastLogin: '2024-01-15'
  }
]

export default function Customers() {
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
          <h1 className="text-3xl font-bold text-secondary-900">Customer Management</h1>
          <p className="text-secondary-600 mt-2">View and manage customer information.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
          <div className="px-6 py-4 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900">All Customers</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="btn-secondary flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{customer.name}</h3>
                      <p className="text-sm text-secondary-600">Customer ID: {customer.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-secondary-500">Email</p>
                      <p className="font-medium text-secondary-900">{customer.email}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-secondary-500">Phone</p>
                      <p className="font-medium text-secondary-900">{customer.phone}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-secondary-500">Applications</p>
                      <p className="font-medium text-secondary-900">{customer.applications}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-secondary-500">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-secondary-500">Last Login</p>
                      <p className="font-medium text-secondary-900">{customer.lastLogin}</p>
                    </div>
                    <button className="btn-secondary">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OfficerDashboardLayout>
  )
}
