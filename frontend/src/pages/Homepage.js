import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg={"white"}
        p={3}
        m="40px 0px 15px 0px "
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          txt-me
        </Text>
      </Box>
      <Box
        bg={"white"}
        p={4}
        width="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
