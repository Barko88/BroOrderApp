import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ForgetPassword.module.css';

const NewPassword = ({ token }) => {
  const passwordRef = useRef();
  // 'loading' | 'success'
  const [status, setStatus] = useState();
  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setStatus('loading');
      try {
        await fetcher('/api/user/password/reset', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            password: passwordRef.current.value,
          }),
        });
        setStatus('success');
      } catch (e) {
        toast.error(e.message);
        setStatus(undefined);
      }
    },
    [token]
  );
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Återställ lösenord</h1>
      {status === 'success' ? (
        <>
          <p className={styles.subtitle}>
            Ditt lösenord har uppdaterats framgångsrikt.
          </p>
        </>
      ) : (
        <>
          <p className={styles.subtitle}>
            Ange ett nytt lösenord för ditt konto
          </p>
          <Spacer size={1} />
          <form onSubmit={onSubmit}>
            <Input
              ref={passwordRef}
              htmlType="password"
              autoComplete="new-password"
              placeholder="Nytt lösenord"
              ariaLabel="Nytt lösenord"
              size="large"
              required
            />
            <Spacer size={0.5} axis="vertical" />
            <Button
              htmlType="submit"
              className={styles.submit}
              type="success"
              size="large"
            >
              Återställ lösenord
            </Button>
          </form>
        </>
      )}
      <Spacer size={0.25} axis="vertical" />
      <Link href="/login" passHref>
        <ButtonLink type="success" size="large" variant="ghost">
          Återgå till inloggning
        </ButtonLink>
      </Link>
    </div>
  );
};

const BadLink = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Invalid Link</h1>
      <p className={styles.subtitle}>
        Det verkar som att du kan ha klickat på en ogiltig länk. Stäng den här
        sidan och försök igen.
      </p>
      <Spacer size={1} />
      <Link href="/login" passHref>
        <ButtonLink type="success" size="large" variant="ghost">
          Return to login
        </ButtonLink>
      </Link>
    </div>
  );
};

const ForgetPasswordToken = ({ valid, token }) => {
  return (
    <Wrapper className={styles.root}>
      {valid ? <NewPassword token={token} /> : <BadLink />}
    </Wrapper>
  );
};

export default ForgetPasswordToken;
