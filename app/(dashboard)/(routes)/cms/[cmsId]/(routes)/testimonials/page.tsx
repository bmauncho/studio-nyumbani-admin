import { Params } from "@/types";
import TestimonialsClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { TestimonialColumn } from "./components/testimonial-column";
import { format } from "date-fns";

const TestimonialsPage = async ({
  params,
}: {
  params: Params<{ cmsId: string }>;
}) => {
  const { cmsId } = await params;
  const cmsPage = await prismadb.cMSPage.findUnique({
    where: {
      id: cmsId,
    },
    include: {
      testimonials: true,
      testimonialInfo: true,
    },
  });

  const formattedTestimonials: TestimonialColumn[] =
    cmsPage?.testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role ?? "",
      content: testimonial.content,
      createdAt: format(testimonial.createdAt, "MMMM do yyyy"),
    })) || [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4">
        <TestimonialsClient
          data={cmsPage}
          testimonials={formattedTestimonials}
        />
      </div>
    </div>
  );
};

export default TestimonialsPage;
