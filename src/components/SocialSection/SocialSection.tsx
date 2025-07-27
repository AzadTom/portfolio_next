import Image from "next/image"

const SocialSection = () => {
    return (
        <div className="max-w-[600px] mx-auto px-4 flex justify-center items-center gap-6 absolute bottom-[32px] left-0 right-0 w-full">
            <Image src="/gmail.svg" width={24} height={24} alt="gmail"  className="flex-1"/>
            <Image src="/linkedin.svg" width={42} height={42} alt="linkedin" className="flex-1" />
            <Image src="/github_white.svg" width={42} height={42} alt="github" className="flex-1" />
            <Image src="/x_white.svg" width={42} height={42} alt="twitter"  className="flex-1"/>
        </div>
    )
}

export default SocialSection