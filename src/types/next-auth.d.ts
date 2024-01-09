import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
  interface DefaultUser {
    progress: string;
  }
  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    picture?: string;
  }
}
