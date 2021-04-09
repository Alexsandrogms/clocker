import { ReactNode, useState } from 'react';
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

import Input from '../Input';
import { createSchedule } from 'hooks/useFetch';

interface ModalTimeBlockProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ModalTimeBlock = ({
  isOpen,
  onClose,
  children,
  onComplete,
}: ModalTimeBlockProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Faça sua reserva</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={onClose} mr={4}>
          Cancelar
        </Button>
        <Button colorScheme="blue" mr={3} onClick={onComplete}>
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
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen((prevState) => !prevState);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    onSubmit: ({ name, phone }) =>
      createSchedule({ name, phone, username, when: time }),
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
