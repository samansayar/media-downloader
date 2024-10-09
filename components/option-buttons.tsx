import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Music, VolumeX, ClipboardCopy } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadModeOption } from "@/types";

interface OptionButtonsProps {
    watchOption: DownloadModeOption;
    setValue: UseFormSetValue<{ option: DownloadModeOption; url: string }>;
}

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const BUTTON_CONFIGS = [
    { value: 'auto', Icon: Sparkles, label: 'auto' },
    { value: 'audio', Icon: Music, label: 'audio' },
    { value: 'mute', Icon: VolumeX, label: 'mute' },
] as const;

export function OptionButtons({ watchOption, setValue }: OptionButtonsProps) {
    const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);

    const handlePaste = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const text = await navigator.clipboard.readText();
            setValue('url', text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    if (typeof isDesktop !== 'boolean') {
        return <SkeletonButtons />;
    }

    return (
        <div className="flex justify-between relative z-50">
            <div className="space-x-2">
                {BUTTON_CONFIGS.map(({ value, Icon, label }) => (
                    <OptionButton
                        key={value}
                        isActive={watchOption === value}
                        isDesktop={isDesktop}
                        onClick={() => setValue('option', value)}
                        Icon={Icon}
                        label={label}
                    />
                ))}
            </div>
            <PasteButton isDesktop={isDesktop} onClick={handlePaste} />
        </div>
    );
}

interface OptionButtonProps {
    isActive: boolean;
    isDesktop: boolean;
    onClick: () => void;
    Icon: React.ElementType;
    label: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({ isActive, isDesktop, onClick, Icon, label }) => (
    <Button
        type="button"
        variant={isActive ? "default" : "secondary"}
        size={"sm"}
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
    >
        <Icon className="h-4 w-4 mr-1.5" />
        <span >{label}</span>
    </Button>
);

interface PasteButtonProps {
    isDesktop: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasteButton: React.FC<PasteButtonProps> = ({ isDesktop, onClick }) => (
    <Button variant="secondary" size={isDesktop ? 'sm' : "icon"} onClick={onClick}>
        <ClipboardCopy className="h-4 w-4 lg:mr-2" />
        <span className="lg:block hidden">paste</span>
    </Button>
);

const SkeletonButtons: React.FC = () => (
    <div className="row-between">
        <div className="row-center">
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
            <Skeleton className="h-8 w-14" />
        </div>
        <div><Skeleton className="h-8 w-14" /></div>
    </div>
);
