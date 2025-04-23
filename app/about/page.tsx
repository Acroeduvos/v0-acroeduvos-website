import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-purple-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About AcroEduVos</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100 md:text-xl">
            Our mission is to provide accessible, quality education to learners worldwide
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Story</h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  AcroEduVos was founded in 2020 with a simple yet powerful vision: to make quality education accessible
                  to everyone, regardless of their location or background.
                </p>
                <p>
                  What started as a small initiative with just a handful of courses has now grown into a comprehensive
                  educational platform serving thousands of students worldwide.
                </p>
                <p>
                  Our team of dedicated educators and industry professionals work tirelessly to create courses that are
                  not only informative but also engaging and practical.
                </p>
                <p>
                  We believe that education is a lifelong journey, and we're committed to being your trusted companion
                  every step of the way.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Our story"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-purple-700">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from course content to student support. We believe that
                quality education can transform lives.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-purple-700">Accessibility</h3>
              <p className="text-gray-600">
                We are committed to making education accessible to all. Our platform is designed to be user-friendly and
                our courses are priced affordably.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-purple-700">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and continuously update our teaching methods and course content to reflect the
                latest developments in each field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Meet Our Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Our team of dedicated professionals is committed to providing you with the best educational experience
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={`/placeholder.svg?height=160&width=160&text=Team+${member}`}
                    alt={`Team Member ${member}`}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">Team Member {member}</h3>
                <p className="text-purple-700">Position Title</p>
                <p className="mt-2 text-gray-600">Brief description about the team member and their expertise.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
