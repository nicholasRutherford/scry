import { auth } from "@/auth";
import Navigation from "@/components/navigation";

export default async function Meow() {
  const session = await auth();

  return <main className="">{session?.user?.email}</main>;
}
