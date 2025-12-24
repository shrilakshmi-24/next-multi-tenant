import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { orgId } = await auth();

  if (!orgId) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        No organization selected
      </div>
    );
  }

  const client =await  clerkClient();

  const org = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const blogs = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.orgId, orgId));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Organization Profile */}
      <div className="mb-10 flex items-center gap-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
          {org.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {org.name}
          </h1>
          <p className="text-sm text-gray-500">
            Organization ID: {org.id}
          </p>
        </div>
      </div>

      {/* Blogs Section */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Blogs
        </h2>

        {blogs.length === 0 ? (
          <div className="rounded-lg border border-dashed bg-white p-8 text-center text-gray-500">
            No blogs yet for this organization
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {blog.title}
                </h3>

                <p className="line-clamp-4 text-sm text-gray-600">
                  {blog.content}
                </p>

                <div className="mt-4 text-xs text-gray-400">
                  Blog ID: {blog.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
