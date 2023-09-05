import React from 'react';
import { Button } from '@/components/ui/button'; // Check the path to Button
import { Link } from 'lucide-react';
import { link } from 'fs';

const LandingPage = () => {
  return (
    <div>
      LandingPage (Unprotected)
      <div className='flex space-x-5'>
        {/* Make sure 'asChild' is a valid prop for 'Button' */}
        <form action="/sign-in">
          <button className='bg-black text-white rounded-2xl w-20 h-8 hover:bg-blue-900'>
            Login
          </button>
        </form>
        <form action="/sign-up">
          <button className='bg-black text-white rounded-2xl w-24 h-8 hover:bg-blue-900'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
