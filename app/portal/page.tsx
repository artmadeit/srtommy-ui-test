import Link from "next/link";

export default function PortalHome() {
  return (
    <main>
      <h1>Asistencias</h1>
      <Link href="/portal/person/create">Crear persona</Link>
    </main>
  );
}
