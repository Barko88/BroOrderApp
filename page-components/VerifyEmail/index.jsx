import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { Text } from '@/components/Text';
import Link from 'next/link';
import styles from './VerifyEmail.module.css';

export const VerifyEmail = ({ valid }) => {
  return (
    <Wrapper className={styles.root}>
      <Container column alignItems="center">
        <Text
          className={styles.text}
          color={valid ? 'success-light' : 'secondary'}
        >
          {valid
            ? 'Tack för att du verifierade din e-postadress. Du kan stänga denna sida.'
            : 'Det verkar som att du kan ha klickat på en ogiltig länk. Stäng det här fönstret och försök igen.'}
        </Text>
        <Spacer size={4} axis="vertical" />
        <Link href="/" passHref>
          <ButtonLink variant="ghost" type="success" size="large">
            Gå tillbaka till startsidan
          </ButtonLink>
        </Link>
      </Container>
    </Wrapper>
  );
};
