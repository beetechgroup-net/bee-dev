import { Link } from "react-router-dom";
import { Card } from "@heroui/react";
import {
  Braces,
  Code,
  GitBranch,
  CornerRightDown,
  Hash,
  Shield,
  Link as LinkIcon,
  Fingerprint,
  AlignLeft,
  Palette,
  Regex,
  ShieldCheck,
  MapPin,
} from "lucide-react";

const tools = [
  {
    name: "JSON Beautifier",
    path: "/json",
    icon: Braces,
    description: "Format, validate, and beautify your JSON data.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    name: "XML Beautifier",
    path: "/xml",
    icon: Code,
    description: "Format and validate XML strings easily.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    name: "Git Commands",
    path: "/git",
    icon: GitBranch,
    description: "Cheat sheet for essential Git operations.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    name: "Base64 Converter",
    path: "/base64",
    icon: CornerRightDown,
    description: "Encode and decode Base64 strings.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    name: "UUID Generator",
    path: "/uuid",
    icon: Hash,
    description: "Quickly generate random UUIDs (v4).",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    name: "JWT Decoder",
    path: "/jwt",
    icon: Shield,
    description: "Decode and inspect JSON Web Tokens.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    name: "URL Encoder",
    path: "/url",
    icon: LinkIcon,
    description: "Safely encode or decode URL parameters.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    name: "Hash Generator",
    path: "/hash",
    icon: Fingerprint,
    description: "Generate MD5, SHA-1, and SHA-256 hashes.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    name: "Lorem Ipsum",
    path: "/lorem",
    icon: AlignLeft,
    description: "Generate mock placeholder texts for UI.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    name: "Color Converter",
    path: "/color",
    icon: Palette,
    description: "Translate strings between HEX, RGB and HSL.",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    name: "Regex Tester",
    path: "/regex",
    icon: Regex,
    description: "Test regular expressions with real-time feedback.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    name: "CPF Gerador & Validador",
    path: "/cpf",
    icon: ShieldCheck,
    description: "Gere e valide CPFs brasileiros com verificação matemática.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    name: "CEP Busca",
    path: "/cep",
    icon: MapPin,
    description: "Gere CEPs para testes e busque informações no ViaCEP.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {tools.map((tool, index) => (
          <Link key={tool.path} to={tool.path} className="group outline-none">
            <Card
              className="h-full border-none shadow-xl glass-panel relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-primary/20 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Card.Header className="flex gap-4 px-6 pt-6 pb-2">
                <div
                  className={`flex gap-2 p-3 rounded-xl ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <tool.icon size={24} />
                  {tool.name}
                </div>
              </Card.Header>
              <Card.Content className="px-6 pb-6 pt-2">
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
