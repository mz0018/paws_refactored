import { useState } from 'react'
import { useSignin } from '../hooks/useSignin'
import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Button } from '../ui/form/Buttons'
import { ErrorText } from '../ui/form/ErrorText'
import { Eye, EyeOff } from 'lucide-react'
import { ClipLoader } from 'react-spinners'
import { LogIn } from 'lucide-react'

const Signin = () => {
  const { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError, status } = useSignin()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className='flex min-h-dvh items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <Form
        onSubmit={handleSubmit}
        className='w-full max-w-lg rounded-xl  p-6 sm:p-8'
      >
        <div className='space-y-1 text-center sm:text-left'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Veterinary <span className="text-btn-black-bg">Admin Portal</span>
          </h1>

          <p className='text-md tracking-wide text-text-body'>
            Sign in to manage veterinary records and system access.
          </p>
        </div>

        <div className='my-2 relative'>
          <div className='h-px w-full bg-text-body/10' />
          <div className='absolute inset-0 shadow-md' />
        </div>

        <Input
          type='text'
          value={userName}
          label='Username'
          placeholder='Enter your username'
          onChange={(e) => setUserName(e.target.value)}
          error={hasError.userName || hasError.general}
        />

        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            label='Password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            error={hasError.password || hasError.general}
            className='w-full pr-12'
          />

          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-4 bottom-4 cursor-pointer transition-colors ${
              hasError.password || hasError.general
                ? 'text-red-500'
                : 'text-text-body/30 hover:text-text-body/50'
            }`}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <ErrorText
          message={
            hasError.userName ||
            hasError.password ||
            hasError.general
          }
        />

        <Button
          type='submit'
          disabled={isLoading || status.rateLimit}
          className='font-semibold tracking-wide mt-2 flex w-full items-center justify-center gap-2 bg-btn-black-bg hover:bg-btn-black-hover-header-bg py-3 text-white transition'
        >
          {isLoading ? (
            <ClipLoader size={18} color='white' />
          ) : (
            <>
              <LogIn size={18} />
              Sign In
            </>
          )}
        </Button>

        <div className='flex justify-end'>
          <button
            type='button'
            className='text-sm font-medium text-text-body/70 transition-colors cursor-pointer'
          >
            Forgot password?
          </button>
        </div>

      </Form>
    </div>
  )
}

export default Signin