import CountdownTimer from "./views/CountdownTimer";
import { Colors, Fonts } from "./models/classNames";
import githubMarkSVG from "./assets/github-mark.svg";
import githubMarkWhiteSVG from "./assets/github-mark-white.svg";

const App = (): JSX.Element => {
    return (
        <div
            className={`p-4 ${Fonts.michromaRegular} ${Colors["textNeutral900_dark100"]}`}
        >
            <h1 className="mb-4 text-center text-4xl">
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    IQO5 Timer
                </span>
            </h1>
            <CountdownTimer />
            <div className="fixed inset-x-0 bottom-4 flex items-center justify-center gap-2">
                <a
                    href="https://github.com/Telehakke/iqo5-timer"
                    target="_blank"
                >
                    <picture className="hover:opacity-70">
                        <source
                            srcSet={githubMarkWhiteSVG}
                            media="(prefers-color-scheme: dark)"
                        />
                        <img src={githubMarkSVG} className="h-6 w-6" />
                    </picture>
                </a>
                <small className="">© 2024 Telehakke</small>
            </div>
        </div>
    );
};

export default App;
