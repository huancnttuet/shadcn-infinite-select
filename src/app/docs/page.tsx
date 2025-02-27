'use client';

import { appRoutes } from '@/configs/app-routes';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(appRoutes.DOCS_INTRODUCTION);
}
