import { gql, useSubscription } from "@apollo/client";

export const msgsubscription = gql`
  subscription messageSent {
    messageSent {
      uuid
      content
      to
      from
      createdAt
    }
  }
`;

export default () => useSubscription(msgsubscription);
