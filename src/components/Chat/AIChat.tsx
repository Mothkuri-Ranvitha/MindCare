import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import chatbotData from '../../data/chatbot.json';
import { 
  MessageCircle, 
  Send, 
  AlertTriangle, 
  Phone, 
  Bot, 
  User,
  Languages
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'crisis';
  content: string;
  timestamp: Date;
  language: string;
}

const AIChat: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: chatbotData.responses.greeting[language] || chatbotData.responses.greeting.english,
      timestamp: new Date(),
      language
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisisKeywords = (message: string): boolean => {
    const keywords = chatbotData.crisisKeywords[language] || chatbotData.crisisKeywords.english;
    const lowerMessage = message.toLowerCase();
    return keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
  };

  const generateBotResponse = (userMessage: string): string => {
    const isCrisis = detectCrisisKeywords(userMessage);
    
    if (isCrisis) {
      setShowCrisisAlert(true);
      return chatbotData.responses.crisis[language] || chatbotData.responses.crisis.english;
    }

    // Simple keyword-based responses (in a real app, this would be more sophisticated)
    const responses = [
      chatbotData.responses.default[language] || chatbotData.responses.default.english,
      "I hear you. Mental health challenges are common among college students. Would you like to talk about what specific concerns you have?",
      "It's brave of you to reach out. Can you tell me more about what's been troubling you lately?",
      "Thank you for sharing. Have you considered speaking with one of our counselors? They're specially trained to help with these feelings.",
      "Your feelings are valid. Would you like me to suggest some coping strategies or connect you with resources?"
    ];

    if (language === 'hindi') {
      const hindiResponses = [
        "मैं आपकी बात सुन रहा हूं। कॉलेज के छात्रों में मानसिक स्वास्थ्य की चुनौतियां आम हैं। क्या आप अपनी विशिष्ट चिंताओं के बारे में बात करना चाहेंगे?",
        "आपका संपर्क करना साहस की बात है। क्या आप मुझे बता सकते हैं कि हाल ही में आपको क्या परेशान कर रहा है?",
        "साझा करने के लिए धन्यवाद। क्या आपने हमारे सलाहकारों से बात करने पर विचार किया है?",
        "आपकी भावनाएं वैध हैं। क्या आप चाहेंगे कि मैं कुछ सामना करने की रणनीतियां सुझाऊं?"
      ];
      return hindiResponses[Math.floor(Math.random() * hindiResponses.length)];
    }

    if (language === 'tamil') {
      const tamilResponses = [
        "நான் உங்கள் பேச்சைக் கேட்கிறேன். கல்லூரி மாணவர்களிடையே மன அழுத்தம் பொதுவானது. உங்கள் குறிப்பிட்ட கவலைகளைப் பற்றி பேச விரும்புகிறீர்களா?",
        "தொடர்பு கொள்வது தைரியம். சமீபத்தில் உங்களை என்ன தொந்தரவு செய்கிறது என்று சொல்ல முடியுமா?",
        "பகிர்ந்ததற்கு நன்றி। எங்கள் ஆலோசகர்களுடன் பேச நீங்கள் யோசித்திருக்கிறீர்களா?",
        "உங்கள் உணர்வுகள் சரியானவை. சில சமாளிக்கும் உத்திகளை பரிந்துரைக்கட்டுமா?"
      ];
      return tamilResponses[Math.floor(Math.random() * tamilResponses.length)];
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const isCrisis = detectCrisisKeywords(inputMessage);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: isCrisis ? 'crisis' : 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date(),
        language
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Crisis Alert */}
      {showCrisisAlert && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Crisis Support Alert</h3>
              <p className="text-red-700 mb-4">
                I'm concerned about what you shared. Your life has value and help is available. 
                Please consider reaching out to a professional immediately.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="tel:022-2754-6669" 
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Crisis Helpline
                </a>
                <button className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-medium transition-colors">
                  Connect with Counselor
                </button>
                <button 
                  onClick={() => setShowCrisisAlert(false)}
                  className="text-red-700 hover:text-red-900 px-4 py-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold">MindCare AI Support</h2>
                <p className="text-sm text-blue-100">Always here to listen • Confidential & Safe</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5" />
              <span className="text-sm">
                {language === 'english' ? 'EN' : language === 'hindi' ? 'हि' : 'த'}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : message.type === 'crisis'
                    ? 'bg-red-600'
                    : 'bg-green-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : message.type === 'crisis' ? (
                    <AlertTriangle className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'crisis'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' 
                      ? 'text-blue-100' 
                      : message.type === 'crisis'
                      ? 'text-red-600'
                      : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs">
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Type your message in ${language === 'english' ? 'English' : language === 'hindi' ? 'Hindi' : 'Tamil'}...`}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This AI provides supportive guidance but doesn't replace professional help. 
            In crisis situations, please contact emergency services or our crisis helpline.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Need Human Support?</h3>
          <p className="text-sm text-gray-600 mb-3">Connect with our trained counselors</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Book Session
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Crisis Helpline</h3>
          <p className="text-sm text-gray-600 mb-3">24/7 emergency support</p>
          <a 
            href="tel:022-2754-6669"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors inline-block"
          >
            Call Now
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Urgent Help</h3>
          <p className="text-sm text-gray-600 mb-3">Immediate crisis intervention</p>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
            Get Help Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;