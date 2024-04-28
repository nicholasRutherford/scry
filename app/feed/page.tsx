import { auth } from "@/auth";
import { Feed } from "@/components/feed";
import { Landing } from "@/components/landing";

export default async function FeedPage() {
  const session = await auth();

  return <Feed />;
}
