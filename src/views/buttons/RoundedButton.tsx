import { ReactNode } from "react";
import { Colors } from "../../models/classNames";

const RoundedButton = ({
    text,
    icon,
    onClick,
}: {
    text: string;
    icon: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}): JSX.Element => {
    return (
        <div>
            <button
                className={`w-20 rounded-full border-2 px-4 py-0.5 transition ${Colors.borderNeutral300_dark700} ${Colors.hoverBgNeutral100_dark800}`}
                onClick={onClick}
            >
                {icon}
            </button>
            <p className="text-center text-xs">{text}</p>
        </div>
    );
};

export default RoundedButton;
