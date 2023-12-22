import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create movie",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Create movie page</p>
    </main>
  );
}
