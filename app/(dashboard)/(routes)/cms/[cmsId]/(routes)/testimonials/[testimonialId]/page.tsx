import prismadb from "@/lib/prismadb";
import { Params } from "@/types";
import { TestimonialForm } from "./components/testimonial-form";

const TestimonialPage = async ({
  params,
}: {
  params: Params<{ testimonialId: string; cmsId: string }>;
}) => {
  const { testimonialId, cmsId } = await params;

  const testimonial = await prismadb.testimonial.findFirst({
    where: {
      id: testimonialId,
      cmsPageId: cmsId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4">
          <TestimonialForm cmsId={cmsId} initialData={testimonial} />
        </div>
      </div>
    </>
  );
};

export default TestimonialPage;
