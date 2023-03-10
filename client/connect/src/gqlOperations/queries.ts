import { gql } from "@apollo/client";

export const GET_QUOUTES_BY_USER = gql`query getQuotesByUser($by:ID!){
    quote(by:$by){
        text
    }, 
}`;
export const GET_ALL_USER = gql`query getAllUsers{
  users{
    id 
    firstName
    lastName 
    email
  }, 
}`;

export const CREATE_USER = gql`mutation createUser($userNew:UserInput!){
    signUpUser(userNew:$userNew){
      id 
      firstName
      lastName 
      email
      password
    }
}`;

export const SIGN_IN = gql`mutation login($user:UserSigninInput!){
  signInUser(userSignIn:$user){
    token, 
    id,
    firstName
      lastName 
      email
  }
}`;

export const CREATE_QUOTE = gql`mutation createQuote($text:String!){
  createQuote(text:$text)
}`;