"use client";

import { ProfileForm } from "@/app/(components)/ProfileForm";
import MenuDrawer2 from "../MenuDrawer2";

export default function ProfilePage({ params }: { params: { locId: number } }) {
  const { locId } = params;

  return (
    <MenuDrawer2 locId={locId}>
      <ProfileForm />
    </MenuDrawer2>
  );
}
