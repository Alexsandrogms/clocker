import { ReactNode, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

import { createSchedule } from 'hooks/useFetch';

import Input from '../Input';
import { AuthContext } from 'context/AuthProvider';
interface ModalTimeBlockProps {
  children: ReactNode;
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ModalTimeBlock = ({
  isOpen,
  onClose,
  children,
  onComplete,
  isSubmitting,
}: ModalTimeBlockProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Faça sua reserva</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        {!isSubmitting && (
          <Button variant="ghost" onClick={onClose} mr={4}>
            Cancelar
          </Button>
        )}
        <Button
          colorScheme="blue"
          mr={3}
          onClick={onComplete}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Reservar horário
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

interface TimeBlockProps {
  time: string;
  username: string;
}

const TimeBlock = ({ time, username }: TimeBlockProps) => {
  const { notification } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    onSubmit: async ({ name, phone }) => {
      try {
        await createSchedule({ name, phone, username, when: time });
        notification({
          status: 'success',
          title: 'Horário reservado!',
          description: `Temos um horário marcado para ${time}`,
        });
        toggle();
      } catch (error) {
        console.log('entrou: ', error);

        notification();
      }
    },
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Nome é obrigatório!'),
      phone: yup.string().required('Telefone é obrigatório'),
    }),
  });

  return (
    <Button p={8} bg="blue.500" color="white" onClick={toggle}>
      {time}
      <ModalTimeBlock
        isOpen={isOpen}
        onClose={toggle}
        onComplete={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <Stack spacing={4}>
          <Input
            icon
            label="Nome"
            iconName="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Informe seu nome"
            error={errors.name}
            touched={touched.name}
          />

          <Input
            icon
            label="Telefone"
            iconName="phone"
            type="tel"
            name="phone"
            placeholder="(99) 9 9999-9999"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
          />
        </Stack>
      </ModalTimeBlock>
    </Button>
  );
};

export default TimeBlock;
