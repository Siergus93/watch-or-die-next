import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies page",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Movies page</p>
    </main>
  );
}
