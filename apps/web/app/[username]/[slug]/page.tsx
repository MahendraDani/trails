import { cookies } from "next/headers";
import { TCollectionsWithTrails } from "@repo/db/types";
import { unstable_noStore as noStore } from "next/cache";

interface ICollectionPageProps {
  params: {
    slug: string;
  };
}

export default async function PAGE({ params }: ICollectionPageProps) {
  noStore();
  const token = cookies().get("next-auth.session-token")?.value;
  const res = await fetch(
    `http://localhost:3000/api/trails?collection-slug=${params.slug}`,
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
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {trailsExist ? (
          trails.data.map((c: TCollectionsWithTrails) => (
            <div className="w-[350px] bg-green-50 p-2" key={c.id}>
              <p className="leading-7 my-1">{c.name}</p>
              <p className="leading-7 my-1">{c.description}</p>
            </div>
          ))
        ) : (
          <h1>No trails found in this collection.</h1>
        )}
      </div>
    </main>
  );
}
