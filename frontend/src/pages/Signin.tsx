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
    <div className='flex items-center justify-center min-h-screen'>
      <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            value={userName}
            placeholder='Enter your username'
            onChange={(e) => setUserName(e.target.value)}
            error={hasError.userName || hasError.general}
          />
          
           <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              error={hasError.password || hasError.general}
              className='pr-12 w-full'
            />

            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 ${hasError.password || hasError.general ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'} `}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <ErrorText message={hasError.userName || hasError.password || hasError.general} />

        <Button type="submit" disabled={isLoading || status.rateLimit}>
            {isLoading ? (
              <ClipLoader size={18} color="white" />
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
        </Button>
      </Form>
    </div>
  );
};

export default Signin