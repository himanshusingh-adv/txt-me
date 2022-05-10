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
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signup = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setUser } = ChatState();

  const history = useHistory();
  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "djve3tzro");
      fetch("https://api.cloudinary.com/v1_1/djve3tzro/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Password doesn't match",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Success",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Solved the blank screen bug by this
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      history.push("/chats");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occured",
        status: "error",
        description: error.response.data.message,
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel> Name </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email-address" isRequired>
        <FormLabel> Email Address </FormLabel>
        <Input
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel> Upload Your Picture </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="images/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
