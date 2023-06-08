import { Box, Button, Center, Image, Menu, MenuButton, MenuList, MenuItem, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Text, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const logos = {
  'Malaria': 'https://www.againstmalaria.com/downloads/AMF_logo_large.png',
  'Blindness': 'https://seeklogo.com/images/H/helen-keller-international-logo-54C0F2AFFC-seeklogo.com.png',
  'Climate change': 'https://www.catf.us/wp-content/uploads/2021/08/CATF_SocialFeature_Logo.jpg'
}

const DonationPage = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Text fontSize='xl'>🤔 How to save a life?</Text>
    </Box>
  );
};


const CenteredDropdown = ({ setProblemArea }) => {
  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Menu>
        <MenuButton as={Button} variant="outline" borderColor="black" borderWidth="1px" rightIcon={<ChevronDownIcon />}>
          🌐 Problem area
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setProblemArea('Malaria')}>Malaria</MenuItem>
          <MenuItem onClick={() => setProblemArea('Blindness')}>Blindness</MenuItem>
          <MenuItem onClick={() => setProblemArea('Climate change')}>Clean air</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

const InlineText = ({ text, fontSize, color }) => {
  return (
    <Text as="span" display="inline-block" fontSize={fontSize} color={color}>
      {text}
    </Text>
  );
};

const InlineTextWrapper = ({ center, children }) => {
  return (
    <Flex justifyContent={center ? 'center' : 'initial'}>
      {children}
    </Flex>
  );
};

const DonateButton = () => {
  return (
    <Center>
      <Box display="flex" justifyContent="center" mt={20}>
        <Button variant="solid" borderWidth="1px" colorScheme="pink" size="md">
         ✨ Buy Now
        </Button>
      </Box>
    </Center>
  );
};

const DonationSlider = ({ setDonation, setLifeYears, problemArea }) => {
  const donationLevels = [5, 10, 20, 50, 100, 500, 1000];
  const costToSaveLife = {
    'Malaria': 5500,
    'Blindness': 3500,
    'Climate change': 5700
  };

  const lifeYearsLevels = {
    'Malaria': [],
    'Blindness': [],
    'Climate change': [],
  };

  const handleChange = (value) => {
    setDonation(donationLevels[value]);
    setLifeYears(Math.round(donationLevels[value] * 80 / costToSaveLife[problemArea]));
  };

  return (
    <Box p={6}>
      <Slider min={0} max={6} step={1} colorScheme="blue" onChange={handleChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
        <Flex justifyContent="space-between" mt={10}>
          {donationLevels.map((level, index) => (
            <Text
              key={index}
              fontSize="sm"
              color="gray.500"
              fontWeight="bold"
              opacity={0.6}
              _hover={{ opacity: 1 }}
            >
              ${level}
            </Text>
          ))}
        </Flex>
      </Slider>
    </Box>
  );
};

const Logo = ({logoUrl}) => {
  return (
    <Box display="flex" justifyContent="center" w={32} h={32} > {/* Adjust the width and height to your desired scaling */}
      <Image src={logoUrl} alt="Logo" objectFit="contain" w="full" h="full" />
    </Box>
  );
};


export const App = () => {
  const [donation, setDonation] = useState(5);
  const [lifeYears, setLifeYears] = useState(1);
  const [problemArea, setProblemArea] = useState('Malaria');
  
  const solutions = {
    'Malaria': 'malaria nets',
    'Blindness': 'vitamin A supplements',
    'Climate change': 'carbon offsets'
  }
  

  return (
    <>
      <DonationPage />
      <CenteredDropdown setProblemArea={setProblemArea} />
    <Stack direction="row" spacing={4} mt={10} align="baseline" justify="center">
      <Text fontSize="lg">If you give</Text>
      <Text textAlign="center" fontSize="lg">
        {`$${donation}`}
      </Text>
    </Stack>
      <DonationSlider setDonation={setDonation} setLifeYears={setLifeYears} problemArea={problemArea} /> 
      <InlineTextWrapper center>
        <InlineText text="You can fund&nbsp;" fontSize="lg" />
      <InlineText text={`${solutions[problemArea]}`} fontSize="lg" color="blue.500" />
      </InlineTextWrapper>
      <Text textAlign="center">to buy </Text>
      <InlineTextWrapper center>
        <InlineText text={`worth ${lifeYears} year(s) worth of human life ❤️`} fontSize="lg" />
      </InlineTextWrapper>
      <DonateButton />
      <Logo logoUrl={logos[problemArea]}></Logo>
    </>
  );
};
