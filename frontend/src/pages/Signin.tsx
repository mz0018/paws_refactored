import { useSignin } from '../hooks/useSignin'
import { Form } from '../ui/form/Form';
import { Input } from '../ui/form/Input';
import { Button } from '../ui/form/Buttons';
import { ErrorText } from '../ui/form/ErrorText';

const Signin = () => {
  const { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError } = useSignin()

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
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            error={hasError.password || hasError.general}
          />

          <ErrorText message={hasError.userName || hasError.password || hasError.general} />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Form>
    </div>
  );
};

export default Signin