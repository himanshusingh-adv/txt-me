import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);

  const sendLoginReq = (event) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  const loginHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill the correct details",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error occured",
        status: "error",
        // description: error.response.data.message,
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email-address-login" isRequired onKeyDown={sendLoginReq}>
        <FormLabel> Email Address </FormLabel>
        <Input
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password-login" isRequired onKeyDown={sendLoginReq}>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {/* {show ? "Hide" : "Show"} */}
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={loginHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credential
      </Button>
    </VStack>
  );
};
export default Login;
