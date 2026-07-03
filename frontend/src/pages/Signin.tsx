import { useState } from 'react'
import { useSignin } from '../hooks/useSignin'
import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Button } from '../ui/form/Buttons'
import { ErrorText } from '../ui/form/ErrorText'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { ClipLoader } from 'react-spinners'

const Signin = () => {
  const {
    handleSubmit,
    isLoading,
    setUserName,
    userName,
    setPassword,
    password,
    hasError,
    status,
  } = useSignin()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="bg-gray-50 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">

        <Form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl"
        >

          <div className="mb-6">
            <span className="inline-flex rounded-full bg-btn-black-bg/10 px-3 py-1 text-sm font-medium text-btn-black-bg">
              Admin Portal
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-body">
              Welcome Back
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Sign in to manage appointments, veterinary records, consultations,
              and system access.
            </p>
          </div>

          <div className="my-8 border-t border-gray-200" />

          <div className="space-y-5">

            <Input
              type="text"
              value={userName}
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              error={hasError.userName || hasError.general}
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                label="Password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                error={hasError.password || hasError.general}
                className="w-full pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 bottom-4 transition-colors ${
                  hasError.password || hasError.general
                    ? 'text-red-500'
                    : 'text-text-body/40 hover:text-text-body'
                }`}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

          </div>

          <ErrorText
            message={
              hasError.userName ||
              hasError.password ||
              hasError.general
            }
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Secure administrator access
            </span>

            <button
              type="button"
              onClick={() =>
                alert('Password reset is not available. Please contact the developer via Gmail for assistance.')
              }
              className="text-sm font-medium text-text-body/70 transition-colors hover:text-btn-black-bg"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading || status.rateLimit}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-btn-black-bg font-semibold tracking-wide text-white transition hover:bg-btn-black-hover-header-bg"
          >
            {isLoading ? (
              <ClipLoader size={18} color="white" />
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </Button>

          <p className="mt-8 text-center text-xs text-gray-400">
            Authorized personnel only.
          </p>

        </Form>

      </div>
    </div>
  )
}

export default Signin