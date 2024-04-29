import { auth } from "@/auth";
import CreateQuestion from "@/components/question/create-question";

export default async function Meow() {
  const session = await auth();

  return <CreateQuestion />;
}
