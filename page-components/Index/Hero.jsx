import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>
          <span className={styles.nextjs}>Bosphorus AB</span>
          <span>Beställning App</span>
        </h1>
        <p className={styles.subtitle}>
          Du loggar in genom att ange ditt email och ditt lösenord. Har du bytt
          e-postadress loggar du in med tidigare uppgifter eller kontaktar oss.
          Om du inte är kund hos oss idag klickar du på "Ny Kund" till nedan.
        </p>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/sign-up">
              <ButtonLink className={styles.button}>Ny Kund</ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
        </Container>
      </div>
    </Wrapper>
  );
};

export default Hero;
