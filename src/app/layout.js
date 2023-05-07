// Imports
import "../styles/globals.css";

// Root definitions
export default function RootLayout({ children }) {

  // Render main layout
  return (
    <html lang="en">
      <body className="h-screen">
        {children}
      </body>
    </html>
  )
}
