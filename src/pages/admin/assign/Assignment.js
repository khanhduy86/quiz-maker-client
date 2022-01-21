import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel, forwardRef,
    Heading,
    HStack,
    Input, Tag, TagCloseButton, TagLabel, Text,
    Textarea,
    useToast,
    VStack, Wrap, WrapItem
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {useParams} from "react-router-dom";
import {QuizEditContext} from "../../../providers/QuizEditProvider";
import {AdminContext} from "../../../providers/AdminSettingProvider";

const Assignment = () => {

    const {getQuizDetail, quiz} = useContext(QuizEditContext);
    const {isLoading} = useContext(AdminContext);
    const {id} = useParams();
    const [emails, setEmails] = useState([]);
    const [email, setEmail] = useState("");
    const [finishDate, setFinishDate] = useState(new Date());
    const [assignment, setAssignment] = useState({
        quizId: id,
        emails: []
    })
    const toast = useToast();
    const ExampleCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    useEffect(() => {
        console.log(id);
        getQuizDetail(id);
    }, [])
    return (
        <Box w={'100%'} minH={'100vh'}>
            {
                !isLoading && (
                    <VStack w={'100%'}>
                        <Box p={5} bg={'white'} w={'100%'}>
                            <HStack>
                                <Text>{quiz && quiz.title}</Text>
                            </HStack>
                        </Box>
                        <Flex w={'100%'}>
                            <VStack flex={8} w={'100%'} spacing={2}>
                                {/*TITLE*/}
                                <HStack w={'100%'}>
                                    <FormControl id="title" isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input bg={'white'} placeholder="Title"/>
                                    </FormControl>
                                </HStack>
                                {/*    DESCRIPTION*/}
                                <FormControl id="Description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea bg={'white'} placeholder="Description"/>
                                </FormControl>
                            </VStack>
                            <Box flex={3} bg={'white'} p={2} mx={2} minH={'100vh'}>
                                <VStack align={'start'} w={'100%'} spacing={5}>
                                    <Button alignSelf={'end'} colorScheme={'blue'}>Giao Bài</Button>
                                    <VStack w={'100%'} align={'start'}>
                                        <Text>Deadline</Text>
                                        <DatePicker
                                            customInput={<ExampleCustomInput/>}
                                            selected={finishDate}
                                            onChange={(date) => setFinishDate(date)}
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            showTimeInput
                                        />
                                        <DatePicker
                                            customInput={<ExampleCustomInput/>}
                                            selected={assignment.finishDate}
                                            onChange={(date) => setAssignment((prev) => ({
                                                ...prev,
                                                finishDate: date
                                            }))}
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            showTimeInput
                                        />
                                    </VStack>
                                    <VStack>
                                        <Wrap w={"100%"}>
                                            {assignment.emails && assignment.emails.map((email) => (
                                                <WrapItem key={email}>
                                                    <Tag
                                                        size={"sm"}
                                                        borderRadius="full"
                                                        variant="solid"
                                                        colorScheme="green"
                                                    >
                                                        <TagLabel>{email}</TagLabel>
                                                        <TagCloseButton
                                                            onClick={() => {
                                                                console.log(email)
                                                                setAssignment(prev => ({
                                                                    ...prev,
                                                                    emails: prev.emails.filter(e => e !== email)
                                                                }))
                                                            }}
                                                        />
                                                    </Tag>
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                        {/*INPUT & ADD BUTTOn*/}
                                        <HStack w={"100%"}>
                                            <Input
                                                size={"sm"}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={
                                                    "Email to share. Ex: test@gmail.com"
                                                }
                                            />
                                            <Button
                                                onClick={() => {
                                                    if (!assignment.emails.includes(email)) {
                                                        setAssignment(prev => ({
                                                            ...prev,
                                                            emails: [...prev.emails, email]
                                                        }))
                                                    }
                                                    setEmail("");

                                                }}
                                                isDisabled={email.length === 0}
                                                size={"sm"}
                                                colorScheme={"purple"}
                                            >
                                                Add
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </VStack>
                            </Box>
                        </Flex>
                    </VStack>
                )
            }
        </Box>
    );
};

export default Assignment;