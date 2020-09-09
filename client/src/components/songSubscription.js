import { gql, useSubscription } from "@apollo/client";

export const subscription = gql`
  subscription songAdded {
    songAdded {
      title
      id
      user {
        username
      }
    }
  }
`;

export default () => useSubscription(subscription);
