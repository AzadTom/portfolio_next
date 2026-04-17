const WhyCard = ({ item }: any) => {
  return (
    <div className="
      w-full md:w-[600px]
      p-8 rounded-2xl
      bg-white
      border border-gray-200
      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
    ">
      <h3 className="text-xl font-semibold">{item.title}</h3>
      <p className="text-gray-600 mt-2">{item.desc}</p>
    </div>
  )
}

export default WhyCard;