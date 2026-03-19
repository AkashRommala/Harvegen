'use client'

import * as React from 'react'

export function Card({ children, className, ...props }) {
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={`p-6 pb-0 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`p-6 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={`p-6 pt-0 border-t border-gray-200 ${className || ''}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={`font-mono text-base font-semibold text-slate-900 mb-2 ${className || ''}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={`text-slate-600 text-[0.85rem] leading-relaxed ${className || ''}`} {...props}>
      {children}
    </p>
  )
}