import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// show function
export const getOnePet = (petId) => {
    return axios(`${apiUrl}/pets/${petId}`)
}

// POST -> create function
export const createPet = (user, newPet) => {
    console.log('user', user)
    console.log('this is newPet', newPet)
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}

// PATCH -> update function

// DELETE -> remove function