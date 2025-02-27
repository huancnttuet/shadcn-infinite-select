import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import Link from 'next/link';

const BuyMeACoffee = () => (
  <>
    <Link
      href='https://buymeacoffee.com/dev347'
      target='_blank'>
      <Button
        variant='outline'
        className='h-10'>
        <Coffee className='mr-2 h-4 w-4' />
        Buy me a coffee
      </Button>
    </Link>
  </>
);

export default BuyMeACoffee;
