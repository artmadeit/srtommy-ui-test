import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hola, soy el sr. Tommys</h1>
      <p>Te ayudare en la administración de tu iglesia</p>
      <Link href="/portal">Ingresar</Link>
    </main>
  );
}
