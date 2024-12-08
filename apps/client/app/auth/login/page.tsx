"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import trpc from '@/trpcClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormInputs = z.infer<typeof loginSchema>

const LoginPage = () => {
    const { replace } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    console.log('Form Data:', data)
    try{
        await trpc.userLogin.mutate(data)
        replace("/rackets")
    }catch(error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error occurred.");
        }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Tennis Port</h2>
        <h3 className='text-2xl font-semibold mb-4'>Login</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C75828]`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-[#C75828]`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#202223] text-white py-2 rounded-md hover:bg-black transition duration-200"
        >
          <AnimatePresence mode="wait">
                {isSubmitting ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                    <LoaderCircle className="mx-auto animate-spin" />
                    </motion.div>
                ) : (
                    <motion.p
                        key="loginText"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                    >
                    Login
                    </motion.p>
                )}
            </AnimatePresence>
        </button>
      </form>
    </div>
  )
}

export default LoginPage
