import { gql } from "apollo-boost";

export const GET_EXPENSES = gql`
  {
    getExpenses {
      id
      description
      createdAt
      value
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation($description: String!, $value: Int!) {
    createExpense(args: { description: $description, value: $value }) {
      id
      description
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation($id: ID!) {
    deleteExpense(id: $id)
  }
`;
