'use client'
//i was getting the error: useForm from react hook form is not a function until I declared the 
//component as a client component with the 'use client' tag 
import CardWrapper from './card-wrapper';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
//import { LoginSchema } from '@/schema/form-schema';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Home, Register } from '@/lib/routes';
import Link from 'next/link';
//import { authenticate } from '@/app/lib/actions';

const LoginForm = () => {
  //const [errorMessage, dispath] = useFormState(authenticate, undefined);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

//   const form = useForm({
//     resolver: zodResolver(LoginSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     }
//   })



  async function onSubmit(){
    setLoading(true);
    //console.log(data);
    //setLoading(false); after backend logic 
  }
  //onSubmit={form.handleSubmit(onSubmit)}
  return (
    <CardWrapper header='Login' 
                 label='Sign in to you account' 
                 backButtonHref={Register.href}
                 backButtonLabel="Don't have an account? Register here."
    >
      <div>
        Card Wrapper
      </div>
    </CardWrapper>
  )
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in
    </Button>
  );
}

export default LoginForm
