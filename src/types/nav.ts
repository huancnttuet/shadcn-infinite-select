import { Icons } from "@/components/ui/icon"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MainNavItem extends NavItem {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SidebarNavItem extends NavItemWithChildren {}