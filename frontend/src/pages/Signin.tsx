import { useSignin } from '../hooks/useSignin'
import { Form } from '../ui/form/Form';
import { Input } from '../ui/form/input';
import { Button } from '../ui/form/Buttons';
import { ErrorText } from '../ui/form/ErrorText';

const Signin = () => {
  const { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError } = useSignin()

  return (
    <div>
      <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            value={userName}
            placeholder='Enter your username'
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />

          <ErrorText message={hasError} />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Form>
    </div>
  );
};

export default Signin