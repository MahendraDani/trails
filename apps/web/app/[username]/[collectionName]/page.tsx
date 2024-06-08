import Link from "next/link";
import { cookies } from "next/headers";
import { TCollectionsWithTrails } from "@repo/db/types";
import { unstable_noStore as noStore } from "next/cache";
import Modal from "../../../components/modal";
import CreateTrailForm from "../../../components/create-trail-form";

interface ICollectionPageProps {
  params: {
    collectionName: string;
  };
}

export default async function PAGE({ params }: ICollectionPageProps) {
  noStore();
  const token = cookies().get("next-auth.session-token")?.value;
  const res = await fetch(
    `http://localhost:3000/api/${params.collectionName}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  let trailsExist: boolean = false;
  if (!res.ok) {
    trailsExist = false;
  } else {
    trailsExist = true;
  }

  const trails = await res.json();

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
        {trailsExist ? (
          trails.data.map((c: TCollectionsWithTrails) => (
            <div className="w-[350px] bg-green-50 p-2" key={c.id}>
              <p className="leading-7 my-1">{c.description}</p>
            </div>
          ))
        ) : (
          <h1>No trails found in this collection.</h1>
        )}
      </div>

      <Modal>
        <CreateTrailForm collectionName={params.collectionName} />
      </Modal>
    </main>
  );
}
