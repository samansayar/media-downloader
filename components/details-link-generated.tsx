"use client"
import React, { useState } from 'react'
import { toast } from "sonner"
import { motion } from "framer-motion"
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza"
import { Button } from "@/components/ui/button"
import { Download, Share, Copy, Check } from "lucide-react"

interface DetailsLinkGeneratedProps {
    show: boolean;
    onClose: () => void;
    generatedLink: string;
}

const ANIMATION_DURATION = 1500;
const ICON_SIZE = "h-6 w-6";
const BUTTON_CLASS = "w-full flex flex-col items-center gap-2 h-auto py-4 bg-muted rounded-lg";

export default function DetailsLinkGenerated({ show, onClose, generatedLink }: DetailsLinkGeneratedProps) {
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedLink;
        link.download = 'media_file';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTemporarySuccess(setDownloadSuccess);
    }

    const handleShare = () => {
        navigator.share({
            title: 'Download Link',
            text: 'Check out this download link!',
            url: generatedLink,
        })
            .then(() => setTemporarySuccess(setShareSuccess))
            .catch((error) => console.error('Error sharing', error));
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink)
            .then(() => {
                toast.success('Link copied to clipboard');
                setTemporarySuccess(setCopySuccess);
            })
            .catch(() => toast.error('Failed to copy link'));
    }

    const setTemporarySuccess = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
        setStateFunction(true);
        setTimeout(() => setStateFunction(false), ANIMATION_DURATION);
    }

    return (
        <Credenza open={show} onOpenChange={onClose}>
            <CredenzaContent className="sm:max-w-[425px] p-4">
                <CredenzaHeader>
                    <CredenzaTitle className="text-xl font-semibold">Choose how to save</CredenzaTitle>
                    <CredenzaDescription>
                        Select an option to save or share your file.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody>
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <ActionButton onClick={handleDownload} success={downloadSuccess} Icon={Download} label="download" />
                        <ActionButton onClick={handleShare} success={shareSuccess} Icon={Share} label="share" />
                        <ActionButton onClick={handleCopy} success={copySuccess} Icon={Copy} label="copy" />
                    </div>
                </CredenzaBody>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Your download link has been generated successfully. You can now choose to download, share, or copy the link using the buttons above.
                    </p>
                </div>
                <CredenzaFooter className="row-col">
                    <CredenzaClose asChild>
                        <Button type="button" size={'lg'} className="w-full" onClick={onClose}>Done</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

interface ActionButtonProps {
    onClick: () => void;
    success: boolean;
    Icon: React.ElementType;
    label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, success, Icon, label }) => (
    <Button variant="outline" className={BUTTON_CLASS} onClick={onClick}>
        {success ? (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Check strokeWidth={2} className={`${ICON_SIZE} text-green-500`} />
            </motion.div>
        ) : (
            <Icon strokeWidth={2} className={ICON_SIZE} />
        )}
        <span>{label}</span>
    </Button>
);
