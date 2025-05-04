"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ChevronDown, ChevronUp, Check } from "lucide-react"

type CookieType = {
  id: string
  name: string
  description: string
  required: boolean
  checked: boolean
}

const defaultCookies: CookieType[] = [
  {
    id: "essential",
    name: "Cookies esenciales",
    description: "Necesarias para el funcionamiento del sitio web. No pueden ser desactivadas.",
    required: true,
    checked: true
  },
  {
    id: "analytics",
    name: "Cookies analíticas",
    description: "Nos ayudan a entender cómo interactúan los visitantes con el sitio web.",
    required: false,
    checked: false
  },
  {
    id: "marketing",
    name: "Cookies de marketing",
    description: "Utilizadas para mostrar anuncios relevantes según tus intereses.",
    required: false,
    checked: false
  },
  {
    id: "preferences",
    name: "Cookies de preferencias",
    description: "Ayudan a recordar configuraciones y personalización del sitio.",
    required: false,
    checked: false
  }
]

export default function CookieForm() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [cookies, setCookies] = useState<CookieType[]>(defaultCookies)

  // Check if consent is already given on component mount
  useEffect(() => {
    const consent = sessionStorage.getItem("cookieConsent")
    
    if (!consent) {
      // Show banner if no consent is stored
      const timer = setTimeout(() => {
        setVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Handle cookie preference toggling
  const handleCookieToggle = (id: string) => {
    setCookies(cookies.map(cookie => 
      cookie.id === id && !cookie.required 
        ? { ...cookie, checked: !cookie.checked } 
        : cookie
    ))
  }

  // Accept all cookies
  const acceptAll = () => {
    const acceptedCookies = cookies.map(cookie => ({
      ...cookie,
      checked: true
    }))
    
    setCookies(acceptedCookies)
    saveCookiePreferences(acceptedCookies)
    setVisible(false)
  }

  // Decline optional cookies (accept only required ones)
  const declineOptional = () => {
    const minimalCookies = cookies.map(cookie => ({
      ...cookie,
      checked: cookie.required
    }))
    
    setCookies(minimalCookies)
    saveCookiePreferences(minimalCookies)
    setVisible(false)
  }

  // Save current cookie preferences
  const savePreferences = () => {
    saveCookiePreferences(cookies)
    setVisible(false)
  }

  // Store cookie preferences in sessionStorage
  const saveCookiePreferences = (cookieSettings: CookieType[]) => {
    const consentData = {
      preferences: cookieSettings.reduce((acc, cookie) => {
        acc[cookie.id] = cookie.checked
        return acc
      }, {} as Record<string, boolean>),
      timestamp: new Date().toISOString(),
    }
    
    sessionStorage.setItem("cookieConsent", JSON.stringify(consentData))

    // Here you would also trigger any tag management or analytics based on selected preferences
    // For example: if (consentData.preferences.analytics) { initAnalytics() }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-primary">Política de Cookies</h3>
          <button 
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Utilizamos cookies para mejorar su experiencia de navegación, mostrar contenido personalizado y analizar el tráfico del sitio web.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/cookies" className="text-blue-600 hover:underline">
              Ver política completa de cookies
            </Link>
          </p>
        </div>

        {/* Expanded cookie selection section */}
        {expanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4">
            {cookies.map((cookie) => (
              <div key={cookie.id} className="flex items-start space-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id={cookie.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={cookie.checked}
                    onChange={() => handleCookieToggle(cookie.id)}
                    disabled={cookie.required}
                  />
                </div>
                <div className="flex-1 text-sm">
                  <label htmlFor={cookie.id} className="font-medium text-gray-900 dark:text-gray-100">
                    {cookie.name}
                    {cookie.required && <span className="ml-2 text-xs text-gray-500">(Obligatoria)</span>}
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">{cookie.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className={`flex ${expanded ? 'flex-col space-y-2 mt-6' : 'space-x-2 mt-4'}`}>
          {expanded ? (
            <>
              <button
                onClick={savePreferences}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Check size={16} className="mr-2" />
                Guardar preferencias
              </button>
              <button
                onClick={acceptAll}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Aceptar todo
              </button>
              <button
                onClick={declineOptional}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Solo esenciales
              </button>
            </>
          ) : (
            <>
              <button
                onClick={acceptAll}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Aceptar todo
              </button>
              <button
                onClick={declineOptional}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Rechazar
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {expanded ? (
                  <ChevronUp size={16} className="inline mr-1" />
                ) : (
                  <ChevronDown size={16} className="inline mr-1" />
                )}
                Gestionar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}