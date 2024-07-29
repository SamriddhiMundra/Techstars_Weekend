import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    ContextMenu,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export interface Album {
    name: string
    artist: string
    cover: string
}
interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    album: Album
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function Mentor({album, aspectRatio = "portrait", width, height, className, ...props}: AlbumArtworkProps) {
    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="overflow-hidden rounded-md">
                        <Image
                            src={album.cover}
                            alt={album.name}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )}
                        />
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium text-base leading-none">{album.name}</h3>
                <p className="text-sm text-muted-foreground">{album.artist}</p>
            </div>
        </div>
    )
}