export const AboutUsCard = ({
    label,
    description
}) => {
    return (
        <button className='flex flex-col items-center justify-center px-8 py-4 !bg-[#0c4160] text-[#ccd8e4] rounded-xl shadow-md border-none appearance-none outline-none focus:outline-none'>
            <span className='text-3xl font-extrabold'>{label}</span>
            <span className='text-sm text-gray-300'>{description}</span>
        </button>
    )
}