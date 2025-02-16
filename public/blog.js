import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Sample blog post data with full content
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    date: "2023-06-01",
    readTime: "5 min read",
    content: "Next.js is a powerful React framework that makes it easy to build fast, SEO-friendly web applications. Here are some key features of Next.js:\n\n1. **Server-Side Rendering (SSR)**: Next.js can render React components on the server, which improves initial load time and SEO.\n2. **Static Site Generation (SSG)**: You can generate static HTML files at build time for even faster loading.\n3. **API Routes**: Next.js allows you to create API endpoints as part of your application.\n4. **File-based Routing**: Simply create files in the 'pages' directory to define routes.\n5. **Built-in CSS Support**: Next.js supports CSS Modules, Sass, and other styling options out of the box.\n\nTo get started with Next.js, you can use the following command: `npx create-next-app@latest my-next-app`"
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    excerpt: "Discover how Tailwind CSS can streamline your styling workflow",
    date: "2023-06-05",
    readTime: "4 min read",
    content: "Tailwind CSS is a utility-first CSS framework that can significantly speed up your development process. Instead of writing custom CSS, you apply pre-existing classes directly in your HTML.\n\nKey benefits of Tailwind CSS include:\n\n1. **Rapid Development**: With utility classes, you can quickly style elements without switching between HTML and CSS files.\n2. **Consistency**: Tailwind provides a set of pre-defined design tokens, ensuring consistency across your project.\n3. **Customization**: You can easily customize the default configuration to match your design system.\n4. **Responsive Design**: Tailwind includes responsive utility variants, making it simple to create responsive layouts.\n5. **Smaller File Sizes**: When properly configured, Tailwind can eliminate unused CSS, resulting in smaller file sizes.\n\nTo start using Tailwind CSS in your project, you can install it with npm: `npm install tailwindcss`\n\nThen, add the Tailwind directives to your CSS file and start using the utility classes in your HTML. Enjoy the power of Tailwind!"
  },
  {
    id: 3,
    title: "React Hooks Explained",
    excerpt: "Dive deep into React Hooks and how they can simplify your components",
    date: "2023-06-10",
    readTime: "6 min read",
    content: "React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 and have revolutionized how we write React components.\n\nSome of the most commonly used hooks are:\n\n1. **useState**: Allows you to add state to functional components.\n2. **useEffect**: Lets you perform side effects in functional components.\n3. **useContext**: Provides a way to pass data through the component tree without manually passing props.\n4. **useReducer**: An alternative to useState for managing complex state logic.\n5. **useCallback and useMemo**: Help optimize performance by memoizing functions and values.\n\nHere's a simple example using useState and useEffect:\n\n```jsx\nimport { useState, useEffect } from 'react'\n\nfunction ExampleComponent() {\n  const [count, setCount] = useState(0)\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`\n  }, [count])\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  )\n}\n```\n\nHooks simplify your components and make it easier to reuse stateful logic."
  },
  {
    id: 4,
    title: "Building Accessible Web Apps",
    excerpt: "Learn best practices for creating inclusive and accessible web applications",
    date: "2023-06-15",
    readTime: "7 min read",
    content: "Creating accessible web applications is crucial for ensuring that all users, including those with disabilities, can use your website effectively. Here are some key principles to follow:\n\n1. **Semantic HTML**: Use appropriate HTML elements for their intended purpose. For example, use `<button>` for buttons and `<a>` for links.\n2. **ARIA attributes**: When necessary, use ARIA (Accessible Rich Internet Applications) attributes to provide additional context to screen readers.\n3. **Keyboard Navigation**: Ensure that all interactive elements can be accessed and operated using only a keyboard.\n4. **Color Contrast**: Make sure there's sufficient color contrast between text and background for readability.\n5. **Alternative Text**: Provide alt text for images to describe their content to users who can't see them.\n6. **Focus Management**: Properly manage focus, especially in single-page applications and dynamic content.\n7. **Responsive Design**: Create layouts that adapt to different screen sizes and orientations.\n\nRemember, accessibility is not just about complying with guidelines—it's about creating a better user experience for everyone."
  }
]

export default function BlogApp() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)

  const handlePostClick = (postId: number) => {
    setSelectedPost(postId)
  }

  const handleBackClick = () => {
    setSelectedPost(null)
  }

  const currentPost = selectedPost !== null ? blogPosts.find(post => post.id === selectedPost) : null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TEJA'S BLOG</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedPost !== null && currentPost ? (
          <div>
            <Button
              variant="outline"
              onClick={handleBackClick}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
            </Button>
            <h2 className="text-3xl font-bold mb-2">{currentPost.title}</h2>
            <p className="text-muted-foreground mb-4">{currentPost.date} · {currentPost.readTime}</p>
            <div className="prose max-w-none">
              {currentPost.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} onClick={() => handlePostClick(post.id)} className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {post.date} · {post.readTime}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-8">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2025 Teja's Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
