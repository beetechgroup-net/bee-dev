import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Hexagon, MessageSquarePlus } from "lucide-react";
import {
  Modal,
  Button,
  useOverlayState,
  Input,
  TextField,
  Label,
} from "@heroui/react";
import Home from "./pages/Home";
import JsonBeautifier from "./pages/JsonBeautifier";
import XmlBeautifier from "./pages/XmlBeautifier";
import GitCommands from "./pages/GitCommands";
import Base64Converter from "./pages/Base64Converter";
import UuidGenerator from "./pages/UuidGenerator";
import JwtDecoder from "./pages/JwtDecoder";
import UrlEncoder from "./pages/UrlEncoder";
import HashGenerator from "./pages/HashGenerator";
import LoremIpsum from "./pages/LoremIpsum";
import ColorConverter from "./pages/ColorConverter";
import RegexTester from "./pages/RegexTester";
import CpfGenerator from "./pages/CpfGenerator";
import CepGenerator from "./pages/CepGenerator";

function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const state = useOverlayState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (onClose: () => void) => {
    if (!suggestion) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/beetechgroup.net@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "Nova Sugestão: Bee Dev",
            name: name || "Anônimo",
            email: email,
            message: suggestion,
          }),
        },
      );

      if (response.ok) {
        setName("");
        setEmail("");
        setSuggestion("");
        onClose();
      } else {
        console.error("Failed to send suggestion.");
      }
    } catch (error) {
      console.error("Error sending suggestion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleMap: Record<string, string> = {
    "/": "Dashboard Overview",
    "/json": "JSON Beautifier Validator",
    "/xml": "XML Format Validate",
    "/git": "Git Command Reference",
    "/base64": "Base64 Encoder / Decoder",
    "/uuid": "UUID Generator",
    "/jwt": "JWT Decoder",
    "/url": "URL Encoder / Decoder",
    "/hash": "Cryptographic Hash Generator",
    "/lorem": "Lorem Ipsum Generator",
    "/color": "Color Code Converter",
    "/regex": "Regex Tester",
    "/cpf": "Gerador & Validador de CPF",
    "/cep": "Gerador & Busca de CEP",
  };

  return (
    <header className="h-20 mx-6 mt-4 rounded-2xl glass flex items-center px-8 shadow-sm transition-all duration-300 z-10 top-0 sticky shrink-0">
      <div className="flex items-center gap-6">
        {/* Logo / Back Button */}
        {isHome ? (
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary via-warning to-danger text-black shadow-lg shadow-primary/20">
              <Hexagon className="fill-black/20" size={22} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-br from-primary to-warning bg-clip-text text-transparent hidden sm:block">
              Bee Dev
            </h1>
          </div>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 group text-foreground/80 hover:text-primary transition-colors outline-none"
          >
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground/5 group-hover:bg-primary/10 transition-colors border border-foreground/10 group-hover:border-primary/20">
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              Back to Home
            </h1>
          </Link>
        )}
      </div>

      <div className="mx-6 h-8 w-px bg-foreground/10" />

      <div className="flex-1">
        <h2 className="text-xl font-semibold tracking-tight text-foreground/90">
          {titleMap[location.pathname] || "Developer Tool"}
        </h2>
        <p className="text-xs text-foreground/50 mt-0.5 hidden sm:block">
          Streamline your daily development workflow
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          onPress={state.open}
          className="font-semibold shadow-sm text-sm h-9 px-4 flex gap-2 items-center"
        >
          <MessageSquarePlus size={16} />
          Sugestões
        </Button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-warning shadow-md shadow-primary/20 flex items-center justify-center text-primary-foreground text-xs font-bold">
          BD
        </div>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={state.isOpen}
          onOpenChange={state.setOpen}
          className="bg-background/80 backdrop-blur-md border border-foreground/10"
        >
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-lg bg-surface border border-foreground/10 shadow-2xl rounded-2xl">
              <Modal.CloseTrigger className="right-4 top-4" />
              <Modal.Header className="flex flex-col gap-1 text-xl font-bold px-6 pt-6 pb-2">
                <Modal.Heading>Enviar Sugestão</Modal.Heading>
                <p className="text-sm font-normal text-foreground/60 w-full mt-1">
                  Tem uma ideia para uma nova ferramenta ou melhoria? Deixe-nos
                  saber!
                </p>
              </Modal.Header>

              <Modal.Body className="px-6 py-4 flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Nome</Label>
                  <Input
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </TextField>

                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </TextField>

                <TextField className="w-full" name="message">
                  <Label>
                    Sugestão <span className="text-danger">*</span>
                  </Label>
                  <Input
                    placeholder="O que você gostaria de ver no Bee Dev?"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                  />
                </TextField>
              </Modal.Body>

              <Modal.Footer className="px-6 pb-6 pt-2">
                <Button
                  variant="ghost"
                  className="text-foreground/70"
                  onPress={state.close}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  className="font-bold"
                  onPress={() => handleSubmit(state.close)}
                  isDisabled={!suggestion || isSubmitting}
                  isPending={isSubmitting}
                >
                  Enviar Sugestão
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </header>
  );
}

function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isContentSection =
    searchParams.get("section") === "content" ||
    location.hash === "#content" ||
    location.pathname === "/content";

  return (
    <div className="h-screen w-full bg-background bg-premium-gradient text-foreground overflow-hidden font-sans selection:bg-primary/30 flex flex-col perspective-1000">
      {!isContentSection && <Header />}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl w-full mx-auto pb-12">
          <div className="animate-in fade-in zoom-in-95 duration-300 ease-out min-h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/content" element={<Home />} />
              <Route path="/json" element={<JsonBeautifier />} />
              <Route path="/xml" element={<XmlBeautifier />} />
              <Route path="/git" element={<GitCommands />} />
              <Route path="/base64" element={<Base64Converter />} />
              <Route path="/uuid" element={<UuidGenerator />} />
              <Route path="/jwt" element={<JwtDecoder />} />
              <Route path="/url" element={<UrlEncoder />} />
              <Route path="/hash" element={<HashGenerator />} />
              <Route path="/lorem" element={<LoremIpsum />} />
              <Route path="/color" element={<ColorConverter />} />
              <Route path="/regex" element={<RegexTester />} />
              <Route path="/cpf" element={<CpfGenerator />} />
              <Route path="/cep" element={<CepGenerator />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
