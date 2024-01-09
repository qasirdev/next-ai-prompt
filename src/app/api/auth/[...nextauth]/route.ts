import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session?.user?.email });
      if (session.user) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        //server less function,this is lembda function, open up only when it is called
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: profile?.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
