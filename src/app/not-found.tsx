import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full">Return Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
