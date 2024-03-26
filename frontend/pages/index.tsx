import React, { useEffect, useState } from "react"

export const Home: React.FC = () => {
  const [classes, setClasses] = useState<string[]>([])

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/classes")
      const data = await response.json()
      setClasses(data)
    } catch (error) {
      console.error("Error fetching classes:", error)
    }
  }

  console.log("classes:", classes)
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {/* Add your content here */}
    </div>
  )
}

export default Home
