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
import { RegisterSchema } from '@/schema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Login } from '@/lib/routes';
import { useTransition } from 'react';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { register } from '@/actions/register';

const RegisterForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirm_password: '',
    }
  })

  function onSubmit(formData: z.infer<typeof RegisterSchema>){
    
    setError("");
    setSuccess("");//clear on every new submit 

    startTransition(() => {
      register(formData)
        .then((validatedFields) => {
          setError(validatedFields.error);
          setSuccess(validatedFields.success);

        })
    })

  }
  
  return (
    <CardWrapper header='Create and account' 
                 backButtonHref={Login.href}
                 backButtonLabel="Already have an account?"
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
                    <Input {...field} disabled={isPending} type="email" placeholder='name@yourdomain.com'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    {/* NOTE: controlled component - spread field to give input controls that match the form */}
                    <Input {...field} disabled={isPending} type="text" placeholder='first-name last-name'/>
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
                    <Input {...field} disabled={isPending} type="password" placeholder='******'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm_password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    {/* NOTE: controlled component - spread field to give input controls that match the form */}
                    <Input {...field} disabled={isPending} type="password" placeholder='******'/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type='submit' className='w-full' disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm; //don't need this when it is just a component 
