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
import { z } from 'zod';
import { LoginSchema } from '@/schema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Home, Register } from '@/lib/routes';
import Link from 'next/link';
import FormError from '../form-error';
import FormSuccess from '../form-success';
//import { authenticate } from '@/app/lib/actions';

const LoginForm = () => {
  //const [errorMessage, dispath] = useFormState(authenticate, undefined);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })



  async function onSubmit(data: z.infer<typeof LoginSchema>){
    setLoading(true);
    console.log(data);
    //setLoading(false); after backend logic 
  }
  //onSubmit={form.handleSubmit(onSubmit)}
  return (
    <CardWrapper header='Welcome back' 
                 backButtonHref={Register.href}
                 backButtonLabel="Don't have an account?"
                 showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>              
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    {/* NOTE: controlled component - spread field to give input controls that match the form */}
                    <Input {...field} type="email" placeholder='name@yourdomain.com'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    {/* NOTE: controlled component - spread field to give input controls that match the form */}
                    <Input {...field} type="password" placeholder='******'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormError message=""/>
          <FormSuccess message=""/>
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
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

export default LoginForm; //don't need this when it is just a component 
