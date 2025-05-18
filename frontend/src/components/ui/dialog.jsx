import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Dialog({ ...props }) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-fade-in",
        "data-[state=closed]:animate-fade-out",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border",
            "transition-all duration-200",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2 text-center", className)} {...props} />;
}

function DialogFooter({ className, ...props }) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />;
}

function DialogTitle({ className, ...props }) {
  return <DialogPrimitive.Title className={cn("text-lg font-semibold", className)} {...props} />;
}

function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description className={cn("text-sm text-gray-500", className)} {...props} />;
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
