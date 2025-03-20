import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function matchKeyToNumber(match_key: string): number {
    return Number.parseInt(match_key.split("_")[1].split("m").pop() ?? "")
}
