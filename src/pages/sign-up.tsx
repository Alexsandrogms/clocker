import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import { Logo } from 'components';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Senha é obrigatória'),
  username: yup.string().required('Username é obrigatório'),
});

export default function SignUp() {
  const { signUp } = useAuth();

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    onSubmit: signUp,
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  return (
    <Container p={4} centerContent>
      <Logo size={280} />

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

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>

          {touched.username && (
            <FormHelperText textColor="#FF6B6B">
              {errors.username}
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
      <Link href="/">Já possui uma conta? Acessar</Link>
    </Container>
  );
}
