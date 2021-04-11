import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: ReactNode;
  [x: string]: ReactNode;
};

const Section = ({ children, ...props }: Props): JSX.Element => {
  return (
    <Box h="100%" p={14} {...props}>
      {children}
    </Box>
  );
};

export default Section;
