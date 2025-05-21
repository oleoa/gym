import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Link from "@/components/Link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full flex justify-between items-center p-4 gap-4 h-16 border-b-2"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/machines">Machines</Link>
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
