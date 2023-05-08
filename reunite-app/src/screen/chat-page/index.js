import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  KeyboardAvoidingView,
} from '../../elements';

import Header from './Header';
import Message from './Message';
import MessageBox from './MessageBox';

const MESSAGES = [
  {
    id: 0,
    user_id: 0,
    message: 'Hey, how are you?',
  },
  {
    id: 1,
    user_id: 1,
    message: 'I am doing great, what about you?',
  },
  {
    id: 2,
    user_id: 0,
    message: 'Yeah, I am fine too. So, how is your work going',
  },
  {
    id: 3,
    user_id: 1,
    message: 'Going good',
  },
];

const ChatPage = () => {
  // STATE
  const [sendingUser, setSendingUser] = useState(null);
  const [receivingUser, setReceivingUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // EFFECTS
  useEffect(() => {
    setSendingUser({id: 0});
    setReceivingUser({
      id: 1,
      Avtar:
        'https://www.shutterstock.com/image-photo/communication-technology-internet-business-global-world-1421446100',
      name: 'Receiver',
    });
    setMessages(MESSAGES.reverse());
  }, []);

  // METHODS
  const handleOnSend = message => {
    const messageObj = {
      id: new Date().toISOString(),
      user_id: sendingUser?.id,
      message,
    };
    setMessages([messageObj, ...messages]);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} bgCol="primary" flex={1}>
      <Header userData={receivingUser} />
      <KeyboardAvoidingView flex={1}>
        <View flex={1} bgCol="bgCol">
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <Message data={item} sendingUser={sendingUser} />
            )}
            keyExtractor={({id}) => id}
            inverted
            pd={[10, 10]}
          />
        </View>
        <MessageBox onSend={handleOnSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatPage;
