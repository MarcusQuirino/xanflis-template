import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="flex h-full w-1/2 bg-[url('/light-bg.svg')] bg-cover dark:bg-[url('/dark-bg.svg')]" />
      <div className="flex h-full w-1/2 flex-col items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
}
