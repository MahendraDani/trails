import { TCollectionsWithTrails } from "@repo/db/types";
import { cookies } from "next/headers";
import Link from "next/link";
import { DeleteCollectionForm } from "../../components/delete-collection-form";
import { unstable_noStore as noStore } from "next/cache";
import CreateCollectionForm from "../../components/create-collection-form";
import Modal from "../../components/modal";

interface IDashboardPageProps {
  params: {
    username: string;
  };
}

export default async function Dashboard({ params }: IDashboardPageProps) {
  noStore();
  const token = cookies().get("next-auth.session-token")?.value;
  const res = await fetch(`http://localhost:3000/api/collections/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let collectionsExist: boolean = false;
  if (!res.ok) {
    collectionsExist = false;
  } else {
    collectionsExist = true;
  }
  const collections = await res.json();

  return (
    <main className="p-3 max-w-[75%] mx-auto flex flex-col items-center pb-16">
      <Link href="?modal=true">
        <button
          type="button"
          className="px-4 py-2 mb-12 text-2xl rounded-3xl bg-black text-white"
        >
          +
        </button>
      </Link>
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {collectionsExist ? (
          collections.data.map((c: TCollectionsWithTrails, i: number) => (
            <div className="w-[350px] bg-green-50 p-2" key={c.id}>
              <Link
                href={`/${params.username}/${c.slug.split(":")[1]}`}
                key={i}
              >
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  {c.name}
                </h3>
              </Link>
              <p className="leading-7 my-1">{c.description}</p>
              <DeleteCollectionForm id={c.id} />
            </div>
          ))
        ) : (
          <h1>No collections found. Please create a collection first</h1>
        )}
      </div>

      <Modal>
        <CreateCollectionForm />
      </Modal>
    </main>
  );
}
