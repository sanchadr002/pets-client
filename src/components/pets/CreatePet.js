import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createPet } from '../../api/pets'
import {createPetSuccess, createPetFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'

// create pet renders a form and calls createPet function
// maybe redirect(navigate) to the new pet show page
// props we'll need are user, msgAlert
const CreatePet = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [pet, setPet] = useState({name: '', type: '', age: '', adoptable: false})
    console.log('pet in create', pet)
    //  an empty pet object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "adoptable" && e.target.checked){
                value = true
            } else if (name === "adoptable" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return {...prevPet, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createPet(user, pet)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/pets/${res.data.pet.id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Pet Added! Success!',
                    message: createPetSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createPetFailure,
                    variant: 'danger',
                }))
        // console.log('this is the pet', pet)
    }

    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is your pet's name?"
                    value={pet.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="what type of animal is your pet?"
                    value={pet.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    placeholder="what is your pet's age?"
                    value={pet.age}
                    type="number"
                    name='age'
                    onChange={handleChange}
                />
                <Form.Check 
                    label='is this pet adoptable?'
                    name='adoptable'
                    defaultChecked={pet.adoptable}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default CreatePet