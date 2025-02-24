"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "@/hooks/useTranslations";
import { Send } from "lucide-react";
import { useChat } from "./hooks/chat.hook";

export function ChatComponent() {
	const { messages, newMessage, sendMessage, setNewMessage } = useChat();
	const { t } = useTranslations();

	return (
		<div className="flex flex-col h-[400px] border rounded-lg p-4">
			<ScrollArea className="flex-1 pr-4 h-[300px] overflow-auto">
				<div className="space-y-4">
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`flex flex-col ${
								msg.role === "seller" ? "items-end" : "items-start"
							}`}
						>
							<div
								className={`rounded-lg px-3 py-2 max-w-[80%] ${
									msg.role === "seller"
										? "bg-primary text-primary-foreground"
										: "bg-muted"
								}`}
							>
								{msg.message}
							</div>
							<span className="text-xs text-muted-foreground mt-1">
								{msg.timestamp}
							</span>
						</div>
					))}
				</div>
			</ScrollArea>
			<form onSubmit={sendMessage} className="flex gap-2 mt-4">
				<Input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder={t("chat.placeholder")}
				/>
				<Button type="submit" size="icon">
					<Send className="h-4 w-4" />
				</Button>
			</form>
		</div>
	);
}
