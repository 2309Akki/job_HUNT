import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * Avatar component wrapping Radix UI's AvatarPrimitive.
 *
 * @param {object} props - Props for the Avatar component.
 * @returns {JSX.Element}
 */
const Avatar = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    className={cn(
      "relative flex w-8 h-8 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

/**
 * AvatarImage component for displaying the user image inside the avatar.
 *
 * @param {object} props - Props for the AvatarImage component.
 * @returns {JSX.Element}
 */
const AvatarImage = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    data-slot="avatar-image"
    className={cn("w-full h-full object-cover", className)}
    {...props}
  />
);

/**
 * AvatarFallback component displayed when the image is not available.
 *
 * @param {object} props - Props for the AvatarFallback component.
 * @returns {JSX.Element}
 */
const AvatarFallback = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    data-slot="avatar-fallback"
    className={cn(
      "flex w-full h-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
);

export { Avatar, AvatarImage, AvatarFallback };
