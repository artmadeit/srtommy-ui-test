import Link from "next/link";

export default function PersonListPage() {
  return (
    <div>
      Person list page
      <Link href="/portal/person/create">Crear persona</Link>
    </div>
  );
}
