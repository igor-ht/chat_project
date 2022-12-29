import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mockMessages } from './chat/mockMessages';
import { mockUserDetails } from './chat/mockUserDetails';

const app = express();

app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:5173'
}));


app.get('/', (req, res) => {
  res.send('hello there')
});


app.get('/mockMessages', (req, res) => {
  const mockMessagesWithNames =  mockMessages.map((message) => {
    const author = mockUserDetails.find(user => user.id === message.authorId);
    const authorName = author && author.name;
    return { ...message, authorName };
  })
  res.send(mockMessagesWithNames)
});


app.post('/addNewMessage', (req, res) => {
  const msg = req.body;
  msg.likes = [];
  msg.authorName = mockUserDetails[msg.authorId]?.name
  try {
    mockMessages.push(msg);
    res.send({message: "Message succesfully received."});
    res.status(200);
  } catch (e) {
    console.log(e)
    res.send({message: "Server couldn`t save the message. Try again later."});
    res.status(500);
  }
});


app.post('/handleLike', (req, res) => {
  const msg = req.body;
  try {
    if( msg.like === false) {
      mockMessages.forEach( message => {
        if (message.id === msg.messageId) {
          message.likes.push(msg.userId)
        }
      })
    } else {
      mockMessages.forEach( message => {
        if (message.id === msg.messageId) {
          message.likes = message.likes.filter(id => +id !== +msg.userId);
        }
      })
    }
    res.status(200)
    res.send('Handle Input succesfully updated')
  } catch (e) {
    res.send(e)
    res.status(500)
  }
});


app.get('/mockUsers', (req, res) => {
  res.send(mockUserDetails);
});

app.get('/mockUsers/:id', (req, res) => {
  res.send(mockUserDetails.filter(user => {
    if (user.id === +req.params.id) {
      return true
    }
  }))
});


app.listen(3000, () => console.log('server 3000 listening'));