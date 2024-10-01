import { RenderBuilderContent } from "@/components/builder";
import { builder } from "@builder.io/sdk";
import LandingLayout from "../landing-layout";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function PrivacyPolicy() {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("Page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/privacy-policy",
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <LandingLayout>
      <RenderBuilderContent content={content} />
    </LandingLayout>
  );
}
