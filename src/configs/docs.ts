import { appRoutes } from '@/configs/app-routes';
import { MainNavItem, SidebarNavItem } from '@/types/nav';

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Documentation',
      href: '/docs',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: appRoutes.DOCS_INTRODUCTION,
          items: [],
        },
        {
          title: 'Infinite Scroll',
          href: appRoutes.DOCS_INFINITE_SCROLL,
          items: [],
        },
        {
          title: 'Infinite Select',
          href: appRoutes.DOCS_INFINITE_SELECT,
          items: [],
        },
      ],
    },
  ],
};
