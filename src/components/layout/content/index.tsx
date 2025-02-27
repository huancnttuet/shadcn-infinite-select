type Props = {
  children: React.ReactNode;
};

export default function Content({ children }: Props) {
  return (
    <main className='flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col items-center'>
      <div className='container relative'>{children}</div>
    </main>
  );
}
