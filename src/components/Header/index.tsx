import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface HeaderProps extends FlexProps {
  children?: ReactNode;
}

export default function Header({ children, ...rest }: HeaderProps) {
  return (
    <Flex w="100%" justify="space-between" align="center" {...rest}>
      {children}
    </Flex>
  );
}
