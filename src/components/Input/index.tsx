import { Icon } from '@chakra-ui/icons';

import {
  MdEmail,
  MdPerson,
  MdLock,
  MdPhone,
  MdAccessTime,
} from 'react-icons/md';
import {
  InputGroup,
  InputLeftElement,
  Input as InputBase,
  InputProps as InputBaseProps,
  FormHelperText,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface InputProps extends InputBaseProps {
  label: string;
  icon?: boolean;
  iconName?: 'email' | 'name' | 'password' | 'time' | 'phone';
  iconColor?: 'blue.500' | string;
  error?: string;
  touched?: boolean;
}

export default function Input({
  label,
  icon,
  iconName,
  iconColor,
  error,
  touched,
  ...props
}: InputProps) {
  const getIcon = (type: string) => {
    const iconsAvailable: { [index: string]: any } = {
      email: MdEmail,
      name: MdPerson,
      password: MdLock,
      phone: MdPhone,
      time: MdAccessTime,
    };

    return iconsAvailable[type];
  };

  return (
    <FormControl id={props.name} p={4} isRequired>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {icon && (
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={getIcon(iconName)} color={iconColor} />}
          />
        )}
        <InputBase {...props} />
      </InputGroup>
      {touched && <FormHelperText textColor="#FF6B6B">{error}</FormHelperText>}
    </FormControl>
  );
}
