import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createPet } from '../../api/pets'

// create pet renders a form and calls createPet function
// maybe redirect(navigate) to the new pet show page
// props we'll need are user, msgAlert
const CreatePet = () => {
    // we'll need two states
    const [pet, setPet] = useState({name: '', type: '', age: '', adoptable: false})
    //  an empty pet object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            const value = e.target.value
            const updatedValue = { [name]: value }

            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return {...prevPet, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('this is the pet', pet)
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