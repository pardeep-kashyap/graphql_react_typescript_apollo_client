import { gql } from 'apollo-server';

const typeDefs = gql`
type Query{
    users:[User]
    quotes:[QuoteWithName]
    user(id:ID!):User
    quote(by:ID!):[Quote]
}
type User{
    id:ID!
    firstName:String
    lastName:String
    email:String
    password:String
    quotes:[Quote]
}
type QuoteWithName{
    text:String, 
    by:QuoteBy!
}
type QuoteBy{
    id:ID!
    firstName:String
}
type Quote{
    by:ID!
    text:String
}
type Mutation{
    signUpUser(userNew:UserInput!):User
    signInUser(userSignIn:UserSigninInput!):LoginSuccess
    createQuote(text:String!):String
    createPost(post:PostInput!):String
}
input UserInput{
    firstName:String!,
    lastName:String!,
    email:String!,
    password:String!
}
input UserSigninInput{
    email:String!,
    password:String!
}
type Token{
    token:String
}
type LoginSuccess{
    token:String
    id:ID!
    firstName:String!
    lastName:String!
    email:String!,
}
type Post{
    caption:String,
    image:String,
    by:ID!
}
input PostInput{
    caption:String,
    image:String,
    by:ID!
}
` ;

export default typeDefs;