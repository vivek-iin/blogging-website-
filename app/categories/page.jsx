import { getAllCategories } from "@/lib/firebase/category/read_server";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const categories = await getAllCategories();

    return (
        <main className="p-5 md:p-10">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {categories?.map((category, key) => {
                    return <CategoryCard category={category} key={key} />;
                })}
            </section>
        </main>
    );
}

function CategoryCard({ category }) {
    return (
        <Link href={`/categories/${category?.id}`}>
            <div className="flex flex-col items-center justify-center gap-2 hover:bg-blue-50 rounded-xl p-4 md:p-6">
                <img className="h-20 w-20 md:h-28 md:w-28 object-cover rounded-full" src={category?.iconURL} alt="" />
                <h1 className="font-bold text-sm md:text-base">{category?.name}</h1>
            </div>
        </Link>
    );
}
