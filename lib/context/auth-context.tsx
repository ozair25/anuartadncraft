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

const MOCK_DEFAULT_USER: UserProfile = {
  id: "usr-1",
  email: "sayedozair25@gmail.com",
  displayName: "Ozair Sayed",
  role: "user",
  phone: "+91 98765 43210",
  createdAt: "2026-01-01T00:00:00Z",
  addresses: [
    {
      id: "addr-1",
      name: "Ozair Sayed",
      phone: "+91 98765 43210",
      street: "102 Art Studio Enclave, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      isDefault: true,
    },
  ],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) {
        setUser(JSON.parse(saved))
      } else {
        // Logged in as demo admin by default
        setUser(MOCK_DEFAULT_USER)
      }
    } catch (e) {
      console.error("Failed to load auth user", e)
      setUser(MOCK_DEFAULT_USER)
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

  const login = (email: string, role: "user" | "admin" = "user") => {
    const newUser: UserProfile = {
      id: "usr-" + Date.now(),
      email,
      displayName: email.split("@")[0],
      role,
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
