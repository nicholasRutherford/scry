import Link from "next/link";

export function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Welcome to scry.party</h1>
      <Link
        href="/api/auth/signin"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        login/signup
      </Link>
    </div>
  );
}
