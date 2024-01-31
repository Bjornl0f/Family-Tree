import express from 'express';
import { Person } from '../models/personModel.js';

const router = express.Router();

//Route for Save a new person
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.gender ||
            !request.body.birthDate ||
            !request.body.birthPlace 
            ) {
                return response.status(400).send({
                    message: 'Send all required fields: firstName, lastName, gender, birthDate, birthPlace',
                });
            }
            const newPerson = {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                gender: request.body.gender,
                birthDate: request.body.birthDate,
                birthPlace: request.body.birthPlace,
                deathDate: request.body.deathDate,
                deathDate: request.body.deathDate,
                photo: request.body.photo,
                relations: request.body.relations
            };
            const person = await Person.create(newPerson);

            return response.status(201).send(person);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message }); 
    }
});

//Route for Get All People from database
router.get('/', async (request, response) => {
    try {
        const people = await Person.find({});

        return response.status(200).json(people);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Get One Person from database
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const person = await Person.findById(id);

        return response.status(200).json(person);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Update a Person
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.gender ||
            !request.body.birthDate ||
            !request.body.birthPlace
            ) {
                return response.status(400).send({
                    message: 'Send all required fields: firstName, lastName, gender, birthDate, birthPlace',
                });
            }
        const { id } = request.params;
        const result = await Person.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Person not found' });
        }

        return response.status(200).send({ message: 'Person updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route for Delete a Person
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Person.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Person not found' });
        }

        return response.status(200).send({ message: 'Person deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;