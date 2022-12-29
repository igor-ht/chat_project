import './App.scss'
import { useEffect, useRef } from 'react'
import { useChat } from './hooks/useChat';

function App() {

  const chatApi = useChat();

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView()
    }
  }, [chatApi.messages]);


  return (

    <div className="App">
      <div className="chat">
        {chatApi.messages.map((message, index) => (
          <div className="message" key={index}>
            <div className="message-header">
              <span className="message-time">{new Date(message.timestamp).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric", hour: "2-digit", minute: "2-digit"
              })}
                {message.status && <span>
                  {message.status === 'ok' ? '✔️' : '🕒'}
                </span>}
              </span>

              <span className="message-author"
                    onClick={() => chatApi.openAuthorDetails({
                      id: message.authorId,
                      name: message.authorName!
                    })}>{message.authorName}</span>

              <span className="message-like" onClick={() => chatApi.toggleLike(message)}>Like</span>

              <span className="message-likes" onClick={() => {
                chatApi.setSelectedMessage(message);
                chatApi.setShowMessageDetails(true);
              }}>{message.likes!.length}</span>

            </div>
            <div className="message-body">
              {message.body}
            </div>
          </div>
        ))}

        <div className="bottom-spacer" ref={myRef}/>
      </div>

      <div className="write-message">
        <select onChange={(event) => chatApi.selectUser(event.target.value)}
                value={chatApi.currentUser?.id}>
          {chatApi.users?.map(user => (
            <option id={user.name} key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <input name="message" className="message-input" onKeyUp={chatApi.addMessage}/>
      </div>

      {chatApi.selectedAuthor && (
        <div className="popup">
          <div className="close" onClick={() => chatApi.setSelectedAuthor(null)}>X</div>
          <h2>{chatApi.selectedAuthor?.name}</h2>
          {chatApi.selectedAuthor.username ?
           <p>{JSON.stringify(chatApi.selectedAuthor)}</p> :
           <div className="spinner"/>
          }
        </div>)}

      {chatApi.showMessageDetails && chatApi.selectedMessage && (
        <div className="popup">
          <div className="close" onClick={() => chatApi.setShowMessageDetails(false)}>X</div>
          <h2>Liked By:</h2>
          <ul>
            {chatApi.selectedMessage.likes!.map((userId) => {
              const likedUser = chatApi.users.find(user => user.id === userId);
              return likedUser && (
                <li key={likedUser.id}>{likedUser.name}</li>
              )
            })}
          </ul>
        </div>)}

    </div>
  )
}

export default App;
