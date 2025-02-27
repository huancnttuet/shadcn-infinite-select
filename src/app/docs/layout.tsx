import DocsSidebar from '@/components/layout/sidebar/docs';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen items-center'>
      <div className='container flex'>
        <DocsSidebar />

        <div className='flex-1 overflow-auto'>{children}</div>
      </div>
    </div>
  );
}
