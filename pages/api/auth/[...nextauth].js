import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    // OAuth authentication providers...
    Providers.Google({
      clientId:
        "577636646187-1ij7jo3p3c2vsgo691ut3oppa5pceiuv.apps.googleusercontent.com",
      clientSecret: "EI4yQQiYL7JcqPsqESUoBHNL",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (
        account.provider === "google" &&
        profile.verified_email === true &&
        profile.email.endsWith("@ku.th")
      ) {
        console.log("inCallBack ", account);
        return true;
      } else if (
        account.provider === "google" &&
        profile.verified_email === true &&
        profile.email.endsWith("@gmail.com")
      ) {
        //actually Email change to .eng
        console.log(profile.email);
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
    // signOut:'/registerNisit'
    // newUser: "/register",
  },
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL
  database: {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
