import express from 'express';
const app = express();
import { getCitizens, getCitizen, createCitizen } from './database.js';
app.use(express.json());

app.get('/citizens', async (req, res) => {
    const citizens = await getCitizens();
    res.send(citizens);
})
app.get('/citizens/:id', async (req, res) => {
    const id = req.params.id;
    const citizen = await getCitizen(id);
    res.send(citizen);
})

app.post('/citizens', async (req, res) => {
    const { id, name, date_of_birth, gender, status } = req.body;
  
    if (!id || !name || !date_of_birth || !gender || !status) {
      return res.status(400).send('All fields are required.');
    }
  
    try {
      const newCitizen = await createCitizen(id, name, date_of_birth, gender, status);
      res.status(201).json(newCitizen);
    } catch (error) {
      console.error('Error creating citizen:', error);
      res.status(500).send('Error creating citizen.');
    }
  });

app.use((req, res, next) => {
    console.log(error)
    res.status(500).send("Something wendt wrong ")
});

app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000")
})