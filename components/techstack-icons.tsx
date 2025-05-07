import {Icons} from "./icons";

type TechStackIconType = {
    [key: string]: {
        name: string;
        icon: any;
    };
};
export const techStackIcons: TechStackIconType = {
    nextJs: {
        name: "Nextjs",
        icon: <Icons.nextJS className="w-10 h-10"/>,
    },
    react: {
        name: "React",
        icon: <Icons.react className="w-10 h-10"/>,
    },
    flutter: {
        name: "flutter",
        icon: <Icons.flutter className="w-10 h-10"/>,
    }
};