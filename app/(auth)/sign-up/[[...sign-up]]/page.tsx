import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="w-full h-screen flex-center">
      <SignUp />
    </main>
  );
}
