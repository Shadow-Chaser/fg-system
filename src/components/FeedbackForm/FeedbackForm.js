import React, { useContext, useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftAddon, Radio, RadioGroup, HStack, Button, useToast
} from "@chakra-ui/react"
import { emailRegex, indianPhoneRegex } from './RegEx'
import india_flag from '../../assets/india_flag.png'
import { FeedbackContext } from '../TabContainer/TabContainer';
import './FeedbackForm.css'

const FeedbackForm = () => {
    const toast = useToast()
    // const feedbacks = localStorage.getItem('feedbacks') ? JSON.parse(localStorage.getItem('feedbacks')) : [];
    const [formData, setFormData] = useState({})
    const [inputError, setInputError] = useState({})
    const [feedbacks, setFeedbacks] = useContext(FeedbackContext)
    const [serviceQuality, setServiceQuality] = useState('Excellent')
    const [beverageQuality, setBeverageQuality] = useState('Excellent')
    const [cleanness, setCleanness] = useState('Excellent')
    const [diningExperience, setDiningExperience] = useState('Excellent')

    console.log("error:", inputError)

    const handleInputValidation = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        const info = { ...formData };
        if (inputName === 'email') {
            if (!emailRegex.test(inputValue)) {
                setInputError({ name: inputName, errorMessage: 'Please Type a Valid Email !' })
                info[inputName] = null;
                setFormData(info)
            } else {
                setInputError(null);
                info[inputName] = inputValue;
                setFormData(info)
            };
        };
        if (inputName === 'phoneField') {
            if (!indianPhoneRegex.test(inputValue)) {
                setInputError({ name: inputName, errorMessage: 'Enter an Indian Phone Number!' })
                info[inputName] = null;
                setFormData(info)
            }
            else {
                setInputError(null)
                info[inputName] = inputValue;
                setFormData(info)
            }
        };
        if (inputName === 'name') {
            info[inputName] = inputValue;
            setFormData(info)
        }

        if (inputName === 'textField') {
            info[inputName] = inputValue;
            setFormData(info)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.name && formData.phoneField && formData.textField) {
            const newFormData = { ...formData }
            newFormData['serviceQuality'] = serviceQuality;
            newFormData['beverageQuality'] = beverageQuality;
            newFormData['cleanness'] = cleanness;
            newFormData['diningExperience'] = diningExperience;
            newFormData['formName'] = 'Aromatic Bar';

            console.log(newFormData);
            const newFeedbacks = [...feedbacks]
            newFeedbacks.push(newFormData)
            setFeedbacks(newFeedbacks)
            localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks))
            toast({
                title: `Thank you for
            completing the information! `,
                status: "success",
                position: "top",
                isClosable: true,
            })
        }
        else {
            toast({
                title: `Please fill out all the required fields! `,
                status: "error",
                position: "top",
                isClosable: true,
            })
        }
    }

    return (
        <div className=''>
            <h1 className="form_title">Aromatic Bar</h1>
            <p className="form_description">We are committed to providing you with the best
                dining experience possible, so we welcome your comments. Please fill
                out this questionnaire. Thank you.</p>

            <form className="row">
                <div className="col-md-6">
                    <FormControl id="textField" isRequired>
                        <FormLabel>Text Field</FormLabel>
                        <Input onChange={handleInputValidation} type="text" name='textField' />
                    </FormControl>

                    <FormControl id='phoneField' isRequired>
                        <FormLabel>Phone Field</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children={<img src={india_flag} alt='' />} />
                            <Input onChange={handleInputValidation} type="tel" name='phoneField' placeholder="phone number" />
                        </InputGroup>
                        {
                            inputError?.name === 'phoneField' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                        }
                    </FormControl>

                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input onChange={handleInputValidation} type="text" name='name' />
                    </FormControl>
                </div>

                <div className="col-md-6">
                    <FormControl id="email" isRequired>
                        <FormLabel>Email Field</FormLabel>
                        <Input onChange={handleInputValidation} type="email" name='email' />
                        {
                            inputError?.name === 'email' && <p className='text-danger text-center'>{inputError?.errorMessage}</p>
                        }
                    </FormControl>


                    <FormControl className='radio' as="fieldset" isRequired>
                        <FormLabel as="legend">1. Please rate the quality of the service you received from your host</FormLabel>
                        <RadioGroup onChange={setServiceQuality} value={serviceQuality} defaultValue="Excellent">
                            <HStack spacing="24px">
                                <Radio value="Excellent">Excellent</Radio>
                                <Radio value="Good">Good</Radio>
                                <Radio value="Fair">Fair</Radio>
                                <Radio value="Bad">Bad</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>


                    <FormControl className='radio' as="fieldset" isRequired>
                        <FormLabel as="legend">2. Please rate the quality of your beverage.</FormLabel>
                        <RadioGroup onChange={setBeverageQuality} value={beverageQuality} defaultValue="Excellent">
                            <HStack spacing="24px">
                                <Radio value="Excellent">Excellent</Radio>
                                <Radio value="Good">Good</Radio>
                                <Radio value="Fair">Fair</Radio>
                                <Radio value="Bad">Bad</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>

                    <FormControl className='radio' as="fieldset" isRequired>
                        <FormLabel as="legend">3. Was our restaurant clean?</FormLabel>
                        <RadioGroup onChange={setCleanness} value={cleanness} defaultValue="Excellent">
                            <HStack spacing="24px">
                                <Radio value="Excellent">Excellent</Radio>
                                <Radio value="Good">Good</Radio>
                                <Radio value="Fair">Fair</Radio>
                                <Radio value="Bad">Bad</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>

                    <FormControl className='radio' as="fieldset" isRequired>
                        <FormLabel as="legend">4. Please rate your overall dining experience</FormLabel>
                        <RadioGroup onChange={setDiningExperience} value={diningExperience} defaultValue="Excellent">
                            <HStack spacing="24px">
                                <Radio value="Excellent">Excellent</Radio>
                                <Radio value="Good">Good</Radio>
                                <Radio value="Fair">Fair</Radio>
                                <Radio value="Bad">Bad</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>

                    <Button type='submit' id='submitBtn' onClick={handleSubmit} colorScheme="teal">Button</Button>
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;