import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

// API KEY for the scope of this project 
const API_KEY = "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";

// prompting 
const systemMessage = { //  Explain things like you're a helpful workout planner bot.
  "role": "system", "content": "Speak only in the context of workout related things. Refuse other requests. Help users make a workout plan when they type 'PLAN'. Give a motivational workout quote when they request it."
}

function ChatbotModal() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Nora, a personalized fitness helper! Let's help you reach your fitness goals. Ask me anything, or type 'PLAN' to start reaching your goals today.",
      sender: "Nora"
    },
    {
      message: "Ask for motivation if you want some inspiration for your day!",
      sender: "Nora"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.

    setIsTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Nora") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

  // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,  // The system message DEFINES the logic of our chatGPT
          ...apiMessages // The messages from our chat with ChatGPT
        ]
      }

      await fetch("https://api.openai.com/v1/chat/completions", 
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "Nora"
        }]);
        setIsTyping(false);
      });
    }

  return (
    <div className="ChatbotModal">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Nora is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default ChatbotModal;
