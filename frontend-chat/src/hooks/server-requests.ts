import { Message } from '../types/message';
import { User } from '../types/user';

const endpoint = 'http://localhost:3000'; // todo: add endpoint (server) address (starting with http://)

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server

  const response = await fetch(`${endpoint}/mockMessages`);
  const mockMessages = await response.json();
  mockMessages.map((msg: Message) => {
    msg.status = 'ok';
  })
  return mockMessages;
};

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const response = await fetch(`${endpoint}/mockUsers`);
  const mockUsers = await response.json();
  return mockUsers.map( (user: User) => user = {id: user.id, name: user.name} );
};

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const res = await fetch(`${endpoint}/mockUsers/${userId}`);
  const user: User[] = await res.json();
  return user[0];
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server
  const res = await fetch(`${endpoint}/addNewMessage`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: `${JSON.stringify(message)}`
  });
  const postStatus = await res.status;
  if (postStatus === 200) return true
  return false; 
};

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo: implement sending a request to change the like of a message by the user
  const res = await fetch(`${endpoint}/handleLike`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: `${JSON.stringify({messageId, userId, like})}`
  })
}