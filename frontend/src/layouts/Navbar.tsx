import * as React from "react"

import { cn } from "../lib/utils"

function Navbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar"
      className={cn(
        "bg-lime-200 flex flex-row gap-6 border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Navbar }