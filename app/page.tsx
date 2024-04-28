import { auth } from "@/auth";
import { Feed } from "@/components/feed";
import { Landing } from "@/components/landing";

export default async function Home() {
  const session = await auth();

  return <main>{session?.user ? <Feed /> : <Landing />}</main>;
}
