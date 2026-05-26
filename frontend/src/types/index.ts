export type Message = {
    role:'user' | 'assistant';
    content: string;
}

export type Mode = "global" | "custom" | "image";

export interface SourceInfo{
    name: string;
    relevance?: number;
}

export interface ChatResponse{
    answer: string;
    sources: SourceInfo[];
    mode_used: Mode;
}

export interface MessageBubbleProps{
    message: Message;
}