import { Card, CardBody, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { LogoGithub } from '@carbon/icons-react';

type TProps = {
  name: string;
  position: string;
  avatar: JSX.Element;
  githubNick: string;
  githubLink: string;
  description: string;
};

export const PersonCard = ({
  name,
  position,
  avatar,
  githubNick,
  githubLink,
  description,
}: TProps) => {
  return (
    <Card maxW="314px">
      <CardBody>
        <Stack spacing={2}>
          {avatar}
          <Heading as="h2" size="md">
            {name}
          </Heading>
          <Text fontSize="md">{position}</Text>
          <Link href={githubLink} color="gray.500">
            <Flex gap={2} alignItems="center" justifyContent="center">
              <LogoGithub size={16} />
              <Text>{githubNick}</Text>
            </Flex>
          </Link>
          <Text>{description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
