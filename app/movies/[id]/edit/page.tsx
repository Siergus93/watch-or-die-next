import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit movie",
};

export default function Page({ params }: { params: { id: string } }) {
  console.log("Edit page id", params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Edit movie page</p>
    </main>
  );
}
