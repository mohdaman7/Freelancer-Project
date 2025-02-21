const SkillBadge = ({ name, experience }) => {
    const getColorClass = () => {
      switch (experience) {
        case "Beginner":
          return "bg-blue-900 text-blue-300"
        case "Intermediate":
          return "bg-purple-900 text-purple-300"
        case "Expert":
          return "bg-green-900 text-green-300"
        default:
          return "bg-gray-700 text-gray-300"
      }
    }
  
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColorClass()}`}>
        {name}
        <span className="ml-2 text-xs opacity-75">{experience}</span>
      </span>
    )
  }
  
  export default SkillBadge
  
  