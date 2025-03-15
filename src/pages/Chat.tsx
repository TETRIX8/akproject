
import { useState, useEffect, useRef } from "react";
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

interface Message {
  id?: string;
  role: "user" | "waiting";
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
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "default">("default");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());

  // Запрос разрешения на уведомления
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Загрузка сообщений и подписка на новые
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true });
          
        if (error) {
          console.error("Ошибка при загрузке сообщений:", error);
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
        console.error("Ошибка при загрузке сообщений:", error);
      }
    };

    // Загрузка начальных сообщений
    fetchMessages();
    
    // Подписка на новые сообщения
    const subscription = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages' 
      }, (payload) => {
        const newMessage = payload.new as any;
        
        // Если сообщение новее последней загрузки
        if (new Date(newMessage.created_at) > lastFetchTime) {
          // Отправка уведомления при новом сообщении
          if (Notification.permission === "granted" && newMessage.user_name !== userName) {
            const notification = new Notification("Новое сообщение", {
              body: `${newMessage.user_name}: ${newMessage.content}`,
              icon: "/favicon.ico"
            });
            
            notification.onclick = function() {
              window.focus();
            };
          }
          
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
  }, [lastFetchTime, userName]);

  // Автопрокрутка вниз при изменении сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setNameDialogOpen(false);
      toast({
        title: "Добро пожаловать в чат!",
        description: `Вы присоединились как ${userName}`,
      });
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === "granted") {
        toast({
          title: "Уведомления включены",
          description: "Теперь вы будете получать уведомления о новых сообщениях",
        });
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !userName) return;

    const userMessage = input.trim();
    setInput("");
    
    // Добавляем сообщение "ожидается ответ"
    const waitingMsgId = Date.now().toString();
    setMessages(prev => [...prev, { 
      id: waitingMsgId, 
      role: "waiting", 
      content: "Ожидается ответ...",
      userName: userName
    }]);
    
    setIsLoading(true);

    try {
      // Сохраняем сообщение в Supabase
      const { error } = await supabase
        .from('chat_messages')
        .insert([
          { 
            user_name: userName, 
            content: userMessage
          }
        ]);
        
      if (error) {
        console.error("Ошибка при сохранении сообщения:", error);
        toast({
          variant: "destructive",
          title: "Ошибка отправки",
          description: "Пожалуйста, попробуйте позже."
        });
      }
      
      // Удаляем сообщение "ожидается ответ" после успешной отправки
      setMessages(prev => prev.filter(msg => msg.id !== waitingMsgId));
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Извините, произошла ошибка. Пожалуйста, попробуйте снова."
      });
      // Удаляем сообщение "ожидается ответ" в случае ошибки
      setMessages(prev => prev.filter(msg => msg.id !== waitingMsgId));
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    if (content.includes("```")) {
      const parts = content.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) { // Код
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
            AK Чат
          </h1>
          {userName && (
            <div className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white text-sm">
              {userName}
            </div>
          )}
          {notificationPermission !== "granted" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={requestNotificationPermission}
              className="ml-2"
            >
              Включить уведомления
            </Button>
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
                  className={`flex ${message.role === "waiting" ? "justify-start" : message.userName === userName ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg ${
                      message.role === "waiting"
                        ? "bg-gray-700/50 text-white/70" 
                        : message.userName === userName
                          ? "bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]"
                          : "bg-white/10"
                    }`}
                  >
                    {message.role !== "waiting" && message.userName && (
                      <div className="px-2 pt-1 text-xs text-white/90 font-medium">
                        {message.userName}
                      </div>
                    )}
                    <div className="p-4">
                      {message.role === "waiting" ? (
                        <div className="flex items-center gap-2">
                          <span>{message.content}</span>
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </div>
                        </div>
                      ) : (
                        formatMessage(message.content)
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Введите сообщение..."
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
              Добро пожаловать в AK Чат
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Пожалуйста, введите ваше имя для присоединения к чату
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white">
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  autoFocus
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Введите ваше имя"
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
                Присоединиться к чату
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
