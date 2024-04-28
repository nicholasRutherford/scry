import { auth } from "@/auth"

export default async function Meow() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {session?.user?.email}
        </main>
    );
}