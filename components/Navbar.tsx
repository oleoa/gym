import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
