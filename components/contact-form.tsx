"use client"

import type React from "react"
import { useState } from "react"
import { AlertCircle, Check, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje')
      }
      
      setStatus("success")
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
        setStatus("idle")
      }, 5000)
    } catch (error) {
      console.error('Error sending message:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje')
      setStatus("error")
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary transition-colors relative after:content-[''] after:block after:w-16 after:h-1 after:bg-gold after:mt-2 mb-6">
        Envíanos un Mensaje
      </h2>

      {status === "success" && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800 font-medium">
                ¡Mensaje enviado correctamente! Hemos enviado una confirmación a tu email y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 font-medium">
                {errorMessage || 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
              className="w-full px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              aria-describedby="name-required"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "submitting"}
              className="w-full px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Asunto <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
            className="w-full px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="">Selecciona un asunto</option>
            <option value="info">Información General</option>
            <option value="cria">Servicios de Cría</option>
            <option value="doma">Servicios de Doma</option>
            <option value="visita">Solicitar Visita</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mensaje <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === "submitting"}
            rows={5}
            className="w-full px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          ></textarea>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="text-red-500">*</span> Campos obligatorios
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 focus:bg-primary/90 text-white py-3 px-6 rounded-md 
            transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed 
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Mensaje"
          )}
        </button>
      </form>
    </div>
  )
}
