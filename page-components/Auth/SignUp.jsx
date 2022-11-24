import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Auth.module.css';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();

  const { mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const response = await fetcher('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
          }),
        });
        mutate({ user: response.user }, false);
        toast.success('Ditt konto har skapats');
        router.replace('/feed');
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, router]
  );

  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Gå med nu</h1>
        <form onSubmit={onSubmit}>
          <Container alignItems="center">
            <p className={styles.subtitle}>Din inloggning</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={emailRef}
            htmlType="email"
            autoComplete="email"
            placeholder="E-postadress"
            ariaLabel="E-postadress"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={passwordRef}
            htmlType="password"
            autoComplete="new-password"
            placeholder="Lösenord"
            ariaLabel="Lösenord"
            size="large"
            required
          />
          <Spacer size={0.75} axis="vertical" />
          <Container alignItems="center">
            <p className={styles.subtitle}>Om dig</p>
            <div className={styles.seperator} />
          </Container>
          <Input
            ref={usernameRef}
            autoComplete="username"
            placeholder="Användarnamn"
            ariaLabel="Användarnamn"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Input
            ref={nameRef}
            autoComplete="name"
            placeholder="Ditt namn"
            ariaLabel="Ditt namn"
            size="large"
            required
          />
          <Spacer size={1} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
            loading={isLoading}
          >
            Bli Kund
          </Button>
        </form>
      </div>
      <div className={styles.footer}>
        <Link href="/login" passHref>
          <TextLink color="link" variant="highlight">
            Har du redan ett konto? Logga in
          </TextLink>
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
