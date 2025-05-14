// 2
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('dist'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// app.get('/', (req, res) => {
//    res.send('<h1>hello worlds</h1>')
// })

app.get('/api/persons', (req, res) => {
   res.json(persons)
})

app.get('/api/info', (req, res) => {
   res.send(`there are ${persons.length} in list and now is ${Date()}`);
})

app.post('/api/persons', (req, res) => {
   let newNote = req.body;
   console.log(newNote);
   console.log(req.headers);
   const newId = Number.parseInt(Math.random() * 10000);
   newNote.id = newId;
   if (!newNote.name) {
      res.status(400).json({
         error: 'name missing'
      });
      return;
   }

   if (!newNote.number) {
      res.status(400).json({
         error: 'number missing'
      });
      return;
   }
   
   if(persons.some(el => el.name == newNote.name)) {
      res.status(400).json(
         { error: 'name must be unique' }
      )
   }

   persons = persons.concat({
      name: newNote.name,
      number: newNote.number,
      id: newId,
   })
   
   res.json(newNote);
})

app.get('/api/persons/:id', (req, res) => {
   const id = req.params.id;
   const person = persons.find((el) => el.id == id);
   if(!person) {
      res.status(404).end()
      return;
   }
   res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
   const id = req.params.id;
   persons = persons.filter(el => el.id != id);
   res.status(204).end();
})

let undefEndpoint = (req, res, next) => {
   res.status(404).send({error: "undef"})
}
app.use(undefEndpoint)
const PORT = process.env.port || 3001;
app.listen(PORT, () => {
   console.log("started");
})


// 1
// const http = require('http');


// const data = [
//  {
//     name:'jon',
//     age: 12,
//  },
//  {
//     name:'jon',
//     age: 12,
//  },
//  {
//     name:'jon',
//     age: 12,
//  }
// ]

// const app = http.createServer((res, req) => {
//     req.writeHead(200, { 'Content-Type': 'application/json' });
//     req.end(JSON.stringify(data));
// })

// app.listen(3000, () => {
//     console.log('Server running at http://localhost:3000/');
// });

