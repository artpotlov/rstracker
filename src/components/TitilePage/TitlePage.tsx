import { Heading, HeadingProps } from '@chakra-ui/react';

type TTitlePageProps = {
  title: string;
};

export const TitlePage = ({ title, ...props }: TTitlePageProps & HeadingProps) => {
  return (
    <Heading
      as="h1"
      py={4}
      textTransform="capitalize"
      color="gray.700"
      size="xl"
      noOfLines={1}
      {...props}
    >
      {title}
    </Heading>
  );
};
