"use client";

import { CourseForm, CourseFormValues } from "@/app/(components)/CourseForm";
import { Box } from "@mui/material";
import useSWR from "swr";
import { PersonDetail } from "../../person/Person";
import Loading from "@/app/(components)/Loading";

type CourseDetail = {
  id: number;
  name: string;
  startTime: Date;
  endTime: Date;
  address: string;
  description: string;
  speaker: PersonDetail[];
};

export default function CourseDetailPage({
  params,
}: {
  params: { id: number; locId: number };
}) {
  const { id, locId } = params;

  const { data: course, isLoading } = useSWR<CourseDetail>(`/events/${id}`);

  if (isLoading) return <Loading />;
  if (!course) return <div>Not found</div>;

  const initialValues: CourseFormValues = {
    name: course.name,
    startDate: course.startTime,
    startTime: course.startTime,
    endDate: course.endTime,
    endTime: course.endTime,
    address: course.address,
    speakers: [],
    description: course.description,
  };

  return (
    <Box>
      <CourseForm
        locId={locId}
        initialValues={initialValues}
        submit={() => console.log("Guardando")}
      />
    </Box>
  );
}
