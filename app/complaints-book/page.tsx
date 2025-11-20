import LandingLayout from "../landing-layout";

import ComplaintForm from "./ComplaintForm";

export default function ComplaintsBook() {
  return (
    <LandingLayout>
      <ComplaintForm
        initialValues={{
          firstName: "",
          lastName: "",
          dni: "",
          address: "",
          email: "",
          comment: "",
        }}
      />
    </LandingLayout>
  );
}
