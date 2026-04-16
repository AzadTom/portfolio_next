"use client"

const ServiceCard = ({ service }: any) => {
    return (
        <div className="min-w-[85%] md:min-w-[380px] h-[420px] rounded-2xl overflow-hidden relative group   shadow-lg bg-white border border-gray-200">

            {/* Image */}
            <img
                src={service.image}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-200 mt-2">
                    {service.description}
                </p>

                <button className="mt-4 text-sm underline underline-offset-4">
                    Explore →
                </button>
            </div>
        </div>
    )
}

export default ServiceCard