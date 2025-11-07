'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        // Icon based on toast type
        const getIcon = () => {
          if (variant === 'destructive')
            return <XCircle className="h-5 w-5 text-red-500" />
          if (variant === 'success')
            return <CheckCircle2 className="h-5 w-5 text-green-500" />
          return <Info className="h-5 w-5 text-blue-500" />
        }

        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              'group relative flex w-[360px] items-start gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur-md transition-all duration-300 ',
              variant === 'destructive'
                ? 'border-red-200 bg-red-50/90 text-red-800'
                : variant === 'success'
                ? 'border-green-200 bg-green-50/90 text-green-800'
                : 'border-blue-200 bg-white/90 text-gray-800'
            )}
          >
            <div className="flex-shrink-0 mt-[3px]">{getIcon()}</div>

            <div className="flex flex-col gap-1 text-sm flex-1">
              {title && <ToastTitle className="font-semibold">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-muted-foreground">
                  {description}
                </ToastDescription>
              )}
            </div>

            {action}
            <ToastClose className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" />
          </Toast>
        )
      })}

      {/* Toast position and animation area */}
     <ToastViewport
  className="
    fixed z-[9999] flex flex-col gap-3
    bottom-6 left-10
    sm:right-6 sm:left-auto
    max-sm:left-1/2 max-sm:-translate-x-1/2
    max-sm:w-[90%]
  "
/>

    </ToastProvider>
  )
}
