import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-rose-800 group-[.toaster]:text-white group-[.toaster]:border-rose-900 group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-rose-100",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-rose-800",
          cancelButton:
            "group-[.toast]:bg-rose-700 group-[.toast]:text-rose-100",
          success: "group-[.toaster]:bg-rose-800",
          error: "group-[.toaster]:bg-red-700",
          info: "group-[.toaster]:bg-rose-700",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
