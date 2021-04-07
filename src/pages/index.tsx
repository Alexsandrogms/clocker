import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { firebaseClient, persistenceMode } from 'config/firebase/client';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Senha é obrigatória'),
});

export default function Home() {
  const router = useRouter();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: async ({ email, password }) => {
      firebaseClient.auth().setPersistence(persistenceMode);
      try {
        await firebaseClient.auth().signInWithEmailAndPassword(email, password);
        router.push('/schedule');
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    firebaseClient
      .auth()
      .onAuthStateChanged((user) => user && router.push('/schedule'));
  }, []);

  return (
    <Container p={4} centerContent>
      <Image src="/images/logo.svg" width={290} height={80} />

      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" children={<EmailIcon />} />
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.email && (
            <FormHelperText textColor="#FF6B6B">{errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" children={<LockIcon />} />
            <Input
              type="password"
              placeholder="*********"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.password && (
            <FormHelperText textColor="#FF6B6B">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Box w="full" p={4}>
          <Button
            type="submit"
            width="100%"
            isLoading={isSubmitting}
            colorScheme="blue"
            variant="solid"
          >
            Entrar
          </Button>
        </Box>
      </form>
      <Link href="/sign-up">Ainda não possui uma conta? Cadastra-se</Link>
    </Container>
  );
}
