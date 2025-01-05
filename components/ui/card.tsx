import * as React from "react";
import { cn } from "@/lib/utils";

// Card Component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className || "")} // Fallback to empty string if className is undefined
      {...props}
    />
  )
);
Card.displayName = "Card";

// CardHeader Component
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className || "")} // Fallback to empty string if className is undefined
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// CardTitle Component
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className || "")} // Fallback to empty string if className is undefined
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// CardDescription Component
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className || "")} // Fallback to empty string if className is undefined
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

// CardContent Component
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className || "")} {...props} /> // Fallback to empty string if className is undefined
  )
);
CardContent.displayName = "CardContent";

// CardFooter Component
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className || "")} // Fallback to empty string if className is undefined
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
