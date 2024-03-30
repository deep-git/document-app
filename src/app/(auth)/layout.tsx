import MainNavbar from '@/components/navbar/main-navbar'
import React from 'react'
import ToasterContext from '../context/ToastContext'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary">
        <MainNavbar type="auth"/>
        <main>
          <ToasterContext/>
          {children}
        </main>
    </div>
  )
}

export default AuthLayout