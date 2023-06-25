import { BaseKey } from "@refinedev/core";

//props pentru cardul agentului 
export interface AgentCardProp {
    id?: BaseKey | undefined;
    name: string;
    email: string;
    avatar: string;
    noOfCars: number;
}

//props pentru info bar 
export interface InfoBarProps {
    icon: ReactNode;
    name: string;
}
