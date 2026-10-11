"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { UserProfile, Address } from "@/types/ecommerce"

interface AuthContextType {
  user: UserProfile | null
  login: (email: string, role?: "user" | "admin") => void
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
  addAddress: (address: Omit<Address, "id">) => void
  deleteAddress: (addressId: string) => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_STORAGE_KEY = "anu_arts_auth_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === "object" && parsed.id && parsed.email) {
          setUser(parsed)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [user, mounted])

  const login = (email: string, _role: "user" | "admin" = "user") => {
    const cleanEmail = email.trim().toLowerCase()
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      email: cleanEmail,
      displayName: cleanEmail.split("@")[0] || "Customer",
      role: "user", // Customers are strictly given "user" role
      addresses: [],
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return
    setUser({ ...user, ...data })
  }

  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) return
    const newAddress: Address = {
      ...address,
      id: "addr-" + Date.now(),
    }
    const updatedAddresses = user.addresses.map((a) => (newAddress.isDefault ? { ...a, isDefault: false } : a))
    setUser({
      ...user,
      addresses: [...updatedAddresses, newAddress],
    })
  }

  const deleteAddress = (addressId: string) => {
    if (!user) return
    setUser({
      ...user,
      addresses: user.addresses.filter((a) => a.id !== addressId),
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
