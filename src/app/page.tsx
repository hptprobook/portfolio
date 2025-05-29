import MainBackground from "@/layouts/MainBackground/MainBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
        <MainBackground />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">About Me</h2>
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
            <p className="text-lg text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 bg-gray-900/20 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">My Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-shadow duration-200">
                <div className="h-40 bg-gray-800 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2 text-white">Project {item}</h3>
                <p className="text-gray-400">
                  Brief description of project {item} and the technologies used.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Latest Blog Posts</h2>
          <div className="space-y-8">
            {[1, 2, 3].map((post) => (
              <article key={post} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-2 text-white">Blog Post Title {post}</h3>
                <p className="text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-white hover:underline">Read more →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More Section */}
      <section id="more" className="py-20 px-4 bg-gray-900/20 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">More About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Skills & Technologies</h3>
              <p className="text-gray-400">
                React, Next.js, TypeScript, Tailwind CSS, Node.js, and more.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-white">Experience</h3>
              <p className="text-gray-400">
                5+ years of experience building web applications and digital products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Let&apos;s Work Together</h2>
          <p className="text-xl text-gray-400 mb-8">
            Ready to bring your ideas to life? Let&apos;s discuss your next project.
          </p>
          <a
            href="mailto:hello@example.com"
            className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 inline-block"
          >
            Book a Call
          </a>
        </div>
      </section>
    </div>
  );
}
