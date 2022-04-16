import React from "react";

type ButtonProps = {
    title: string,
    className?: string,
    handleClick?: () => void
}

const Button = ({ title, className,handleClick }: ButtonProps) => {
    return (
        <button className={`cursor-pointer text-white text-2xl py-[13px] px-[35px] font-semibold rounded-md ${className}`} onClick={handleClick}>{title}</button>
    )
}

export default Button