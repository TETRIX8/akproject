
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCCIUAwYkXrCkYbGjBpBB4PHGMVLG-3i1k");

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  userName?: string;
  created_at?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [nameDialogOpen, setNameDialogOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());

  // Load messages and subscribe to new ones
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) {
          console.error("Error fetching messages:", error);
          return;
        }
        
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          role: "user" as const,
          content: msg.content,
          userName: msg.user_name,
          created_at: msg.created_at
        }));
        
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    // Fetch initial messages
    fetchMessages();
    
    // Subscribe to new messages
    const subscription = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages' 
      }, (payload) => {
        const newMessage = payload.new as any;
        
        // Only add the message if it's newer than our last fetch
        if (new Date(newMessage.created_at) > lastFetchTime) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              id: newMessage.id,
              role: "user",
              content: newMessage.content,
              userName: newMessage.user_name,
              created_at: newMessage.created_at
            }
          ]);
          setLastFetchTime(new Date());
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [lastFetchTime]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setNameDialogOpen(false);
      toast({
        title: "Welcome to the chat!",
        description: `You've joined as ${userName}`,
      });
    }
  };

  const sendToTelegram = async (userName: string, message: string) => {
    try {
      const botToken = "8038017389:AAFOlyzDr_-vO5uuEF2rXFFG6WSDFWapK9Q";
      const chatId = "7035622180";
      const text = `${userName}: ${message}`;
      
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text
        }),
      });
    } catch (error) {
      console.error("Error sending to Telegram:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !userName) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to local state optimistically
    const newMessageObj = { 
      role: "user" as const, 
      content: userMessage,
      userName: userName
    };
    
    setMessages(prev => [...prev, newMessageObj]);
    setIsLoading(true);

    try {
      // Store message in Supabase
      const { error } = await supabase
        .from('chat_messages')
        .insert([
          { 
            user_name: userName, 
            content: userMessage
          }
        ]);
        
      if (error) {
        console.error("Error saving message:", error);
        toast({
          variant: "destructive",
          title: "Failed to send message",
          description: "Please try again later."
        });
      }
      
      // Send to Telegram
      await sendToTelegram(userName, userMessage);

      // Get AI response
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chat = model.startChat({
        history: messages
          .filter(msg => msg.role === "user" || msg.role === "assistant")
          .map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
          })),
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Sorry, I encountered an error. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    if (content.includes("```")) {
      const parts = content.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) { // Code block
          return (
            <pre key={index} className="bg-black/20 p-4 rounded-lg my-2 overflow-x-auto">
              <code className="text-sm text-green-400">{part}</code>
            </pre>
          );
        }
        return <p key={index} className="whitespace-pre-wrap">{part}</p>;
      });
    }
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white p-4">
      <div className="max-w-4xl mx-auto flex flex-col h-screen">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]">
            AK Chat
          </h1>
          {userName && (
            <div className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white text-sm">
              {userName}
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.role === "assistant" 
                        ? "bg-white/10" 
                        : "bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]"
                    }`}
                  >
                    {message.role === "user" && message.userName && (
                      <div className="px-2 pt-1 text-xs text-white/90 font-medium">
                        {message.userName}
                      </div>
                    )}
                    <div className="p-4 rounded-lg">
                      {formatMessage(message.content)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            disabled={nameDialogOpen || isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || nameDialogOpen}
            className="bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#1f1f1f] to-[#2d2d2d] text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]">
              Welcome to AK Chat
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Please enter your name to join the chat
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white">
                  Your Name
                </Label>
                <Input
                  id="name"
                  autoFocus
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={!userName.trim()}
                className="bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] hover:opacity-90 w-full"
              >
                Join Chat
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
