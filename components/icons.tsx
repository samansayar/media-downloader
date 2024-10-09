import { cn } from "@/lib/utils";
import { icons, LucideProps, Moon, SunMedium, Ticket, TicketIcon, Twitter } from "lucide-react";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from "next/dynamic";


export interface IconPropsDynamic extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconPropsDynamic) => {
    const LucideIcon = dynamic(dynamicIconImports[name])

    return <LucideIcon {...props} />;
};

export default Icon;
