import { gql } from "graphql-request";

export const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $displayName: String!
    $email: String!
    $image: String!
  ) {
    updateUsers(
      id: $id
      data: {
        name: $name
        displayName: $displayName
        email: $email
        image: $image
      }
    ) {
      _id
      _ts
      name
      displayName
      email
      image
    }
  }
`;

export const createSolveMutation = gql`
  mutation createSolve(
    $wordationStack: [String]!
    $userId: ID!
    $puzzleId: ID!
  ) {
    createSolves(
      data: {
        wordationStack: $wordationStack
        user: { connect: $userId }
        puzzle: { connect: $puzzleId }
      }
    ) {
      _id
      _ts
      wordationStack
      user {
        _id
        _ts
        name
        displayName
        email
        image
      }
      puzzle {
        _id
        _ts
        wi
        wj
        i
        j
        date
        solves {
          data {
            _id
            _ts
            wordationStack
            user {
              displayName
              name
              _id
            }
          }
        }
      }
    }
  }
`;
