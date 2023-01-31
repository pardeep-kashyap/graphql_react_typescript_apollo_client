import { model } from "mongoose";
import bcrypt from 'bcryptjs'
import { randomBytes } from "crypto";
import { quotes, users } from "./fakedb.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config.js";
const User = model('users');
const Quote = model('quotes');
const resolvers = {
    Query: {
        users: async () => await User.find({}),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
        user: async (_, { id }) => await User.findOne({ id: id }),
        quote: async (_, { by }) => await Quote.find({ by }),
    },
    User: {
        quotes: async (us) => await Quote.find({ by: us._id })
    },
    Mutation: {
        signUpUser: async (_, { userNew }) => {
            const id = randomBytes(5).toString('hex');
            userNew.id = id;
            const user = await User.findOne({ email: userNew.email });
            if (user) {
                console.log("Already Exit");
                throw new Error('User Already Exist')
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 12);
            const newUser = new User({
                ...userNew,
                password: hashedPassword
            });
            return await newUser.save();
        },
        signInUser: async (_, { userSignIn }) => {
            try {
                const user = await User.findOne({ email: userSignIn.email });
                if (!user) {
                    console.log("User Does not exit Exit");
                    throw new Error('User Already Exist')
                }
                console.log("user", user);
                const isPasswordMatched = await bcrypt.compare(userSignIn.password, user.password);
                if (!isPasswordMatched) {
                    throw new Error('Email or password is incorrect')
                }

                const token = jwt.sign({ userId: user._id }, JWT_SECRET);
                return { token, id: user.id };
            } catch (e) {
                console.log("Error", e)
                throw e;
            }
        },
        createQuote: async (_, { text }, context) => {
            try {
                console.log("context", context)
                if (!context.userId) {
                    throw new Error('Please Login')
                }
                const newQuote = new Quote({
                    text,
                    by: context.userId
                })
                await newQuote.save();
                return 'Quote Saved Success Fully'
            } catch (e) {
                console.log("Error", e)
                throw e;
            }
        }
    }
}

export default resolvers;