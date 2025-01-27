import { motion } from "framer-motion";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Choosing Your Perfect Motorcycle",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
      excerpt:
        "Expert tips on selecting the right motorcycle for your riding style and needs.",
      author: "Sarah Walker",
      category: "Buying Guide",
    },
    {
      id: 2,
      title: "Essential Bike Maintenance",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87",
      excerpt:
        "Keep your motorcycle in top condition with these professional maintenance tips.",
      author: "Mike Chen",
      category: "Maintenance",
    },
    {
      id: 3,
      title: "Street Riding Safety",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f",
      excerpt:
        "Master the art of safe street riding with these proven strategies.",
      author: "Emma Thompson",
      category: "Safety",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Latest From Our Blog</h2>
          <p className="text-gray-600">
            Expert advice and inspiring stories from the cycling world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-blue-600 text-sm font-semibold">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.author}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Read More Articles
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
