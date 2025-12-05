export default function MNCProblem({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{params.slug.toUpperCase()}</h1>
      <p className="mt-2 text-gray-600">Company-tagged problem. Open in solver to code and test.</p>
    </div>
  )
}
