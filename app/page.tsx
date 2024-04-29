import { auth } from "@/auth";
import { Landing } from "@/components/landing";

export default async function Home() {
  const session = await auth();

  return <main>{session?.user ? <Landing /> : <Landing />}</main>;
}
