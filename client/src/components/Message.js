import React, { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

import { useAuthState } from "../context/authcontext";

const Message = ({ username }) => {
  const { isLoaded } = useAuthState();
  useEffect(() => {
    if (username && isLoaded) {
      refetch();
    }
  }, [username]);

  const {
    loading: messageLoading,
    data: messageData,
    refetch,
  } = useQuery(GET_MESSAGES, { variables: { from: username } });

  return (
    <div>
      {!messageLoading ? (
        messageData ? (
          messageData.getMessages && messageData.getMessages.length > 0 ? (
            messageData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>Start a conversation.Say Hi!</p>
          )
        ) : (
          <p>Click an user to see the conversations</p>
        )
      ) : (
        <p>Getting Messages..</p>
      )}
    </div>
  );
};

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      content
      to
      from
      uuid
      createdAt
    }
  }
`;

export default Message;
