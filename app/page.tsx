import { RenderBuilderContent } from "@/components/builder";
import { builder } from "@builder.io/sdk";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Home() {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/",
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
    </>
  );
}
