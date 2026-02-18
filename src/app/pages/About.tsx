import { Target, Users, Award } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-neutral-100">
        <img
          src="https://images.unsplash.com/photo-1762343291672-4434dbabb537?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYnJhbmQlMjBsaWZlc3R5bGUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwODk3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About Graduate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl uppercase tracking-wider mb-4">
              About Graduate
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200">
              Redefining fashion for the next generation
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl uppercase tracking-wider mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-neutral-700 leading-relaxed">
            <p>
              Graduate was born from a simple idea: fashion should be accessible, sustainable, 
              and expressive. Founded in 2020, we set out to create a brand that speaks to the 
              modern college student and young professional—someone who values style without 
              sacrificing comfort or breaking the bank.
            </p>
            <p>
              What started as a small collection of essential tees has grown into a full 
              lifestyle brand. We believe that what you wear is an extension of who you are, 
              and our mission is to help you express your unique identity through thoughtfully 
              designed, high-quality pieces.
            </p>
            <p>
              Every item in our collection is crafted with care, using sustainable materials 
              and ethical manufacturing practices. We're not just creating clothes—we're 
              building a community of conscious consumers who care about the impact of their 
              fashion choices.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl uppercase tracking-wider mb-4">Our Mission</h3>
              <p className="text-neutral-700 leading-relaxed">
                To provide fashion-forward, sustainable clothing that empowers young adults 
                to express themselves confidently while making a positive impact on the planet.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl uppercase tracking-wider mb-4">Our Vision</h3>
              <p className="text-neutral-700 leading-relaxed">
                To become the go-to fashion brand for the next generation, known for our 
                commitment to quality, sustainability, and inclusive design that celebrates 
                individuality.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl uppercase tracking-wider mb-4">Our Community</h3>
              <p className="text-neutral-700 leading-relaxed">
                Building a global community of style-conscious individuals who share our 
                values of authenticity, creativity, and social responsibility in fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl uppercase tracking-wider mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-neutral-200">
              <h3 className="text-xl mb-3">Sustainability</h3>
              <p className="text-neutral-700">
                We're committed to reducing our environmental footprint through sustainable 
                materials, ethical manufacturing, and circular fashion practices.
              </p>
            </div>
            <div className="p-6 border border-neutral-200">
              <h3 className="text-xl mb-3">Quality</h3>
              <p className="text-neutral-700">
                Every piece is crafted with attention to detail and built to last, because 
                we believe in creating timeless staples, not disposable fashion.
              </p>
            </div>
            <div className="p-6 border border-neutral-200">
              <h3 className="text-xl mb-3">Inclusivity</h3>
              <p className="text-neutral-700">
                Fashion is for everyone. We design for all body types, genders, and styles, 
                celebrating the diversity of our community.
              </p>
            </div>
            <div className="p-6 border border-neutral-200">
              <h3 className="text-xl mb-3">Affordability</h3>
              <p className="text-neutral-700">
                Great style shouldn't come with a premium price tag. We offer high-quality 
                fashion at prices that work for student budgets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Images */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl uppercase tracking-wider mb-12 text-center">
            The Graduate Lifestyle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1770739886778-ab36c4b55dbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMGZhc2hpb24lMjBvdXRmaXR8ZW58MXx8fHwxNzcwODk3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Campus Life"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                <p className="text-white text-xl">Campus Life</p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1731012106552-3e85ed12d420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjBjbG90aGluZyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NzA4OTczNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Urban Style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                <p className="text-white text-xl">Urban Style</p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1760551733107-25bd7b041623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY2FzdWFsJTIwc3RyZWV0d2VhcnxlbnwxfHx8fDE3NzA4OTczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Weekend Vibes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                <p className="text-white text-xl">Weekend Vibes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl uppercase tracking-wider mb-6">
            Join the Movement
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-neutral-300">
            Be part of a community that's redefining fashion for the next generation.
          </p>
          <a
            href="/shop"
            className="inline-block bg-white text-black px-8 py-4 hover:bg-neutral-100 transition-colors"
          >
            Shop the Collection
          </a>
        </div>
      </section>
    </div>
  );
}
