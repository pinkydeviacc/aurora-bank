'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import DashboardLayout from '@/components/DashboardLayout'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function Documents() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Aadhaar Card',
      status: 'uploaded',
      uploadedDate: '2024-01-15',
      fileSize: '2.1 MB'
    },
    {
      id: 2,
      name: 'PAN Card',
      status: 'uploaded',
      uploadedDate: '2024-01-15',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      name: 'Salary Slip (Last 3 months)',
      status: 'pending',
      uploadedDate: null,
      fileSize: null
    },
    {
      id: 4,
      name: 'Bank Statement (Last 6 months)',
      status: 'pending',
      uploadedDate: null,
      fileSize: null
    },
    {
      id: 5,
      name: 'Address Proof',
      status: 'uploaded',
      uploadedDate: '2024-01-16',
      fileSize: '1.5 MB'
    }
  ])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    } else if (user && user.role !== 'customer') {
      router.push('/officer-dashboard')
    }
  }, [user, loading, router])

  const handleFileUpload = (documentId: number, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { 
            ...doc, 
            status: 'uploaded', 
            uploadedDate: new Date().toISOString().split('T')[0],
            fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`
          }
        : doc
    ))
  }

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Document Management</h1>
          <p className="text-secondary-600 mt-2">Upload and manage your loan application documents.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
          <div className="px-6 py-4 border-b border-secondary-200">
            <h2 className="text-lg font-semibold text-secondary-900">Required Documents</h2>
            <p className="text-sm text-secondary-600 mt-1">Upload all required documents to complete your loan application.</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === 'uploaded' ? 'bg-success-100' : 'bg-warning-100'
                    }`}>
                      {doc.status === 'uploaded' ? (
                        <CheckCircle className="w-5 h-5 text-success-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{doc.name}</h3>
                      {doc.status === 'uploaded' ? (
                        <p className="text-sm text-secondary-600">
                          Uploaded on {doc.uploadedDate} • {doc.fileSize}
                        </p>
                      ) : (
                        <p className="text-sm text-warning-600">Pending upload</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {doc.status === 'uploaded' ? (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View
                      </button>
                    ) : (
                      <label className="btn-primary cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(doc.id, file)
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
              <h3 className="font-medium text-secondary-900 mb-2">Document Guidelines</h3>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• All documents must be clear and legible</li>
                <li>• Supported formats: PDF, JPG, JPEG, PNG</li>
                <li>• Maximum file size: 10MB per document</li>
                <li>• Ensure all text is visible and not cut off</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
