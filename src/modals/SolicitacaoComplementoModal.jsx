import { useEffect, useState } from "react";
import complementoIcon from "../assets/completar.png";

export default function SolicitacaoComplementoModal({
  visible,
  onClose,
  balanca,
}) {
  const [tara, setTara] = useState("");
  const [liquido, setLiquido] = useState("");
  const [bruto, setBruto] = useState(0);
  const [placa, setPlaca] = useState("");

  // Usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
  const solicitante = usuarioLogado?.nome || "Desconhecido";

  useEffect(() => {
    const t = parseFloat(tara) || 0;
    const l = parseFloat(liquido) || 0;
    setBruto(t + l);
  }, [tara, liquido]);

  const enviarSolicitacaoComplemento = async () => {
    try {
      const payload = {
        placa,
        balanca,
        solicitante,
        tara: parseInt(tara) || 0,
        liquido: parseInt(liquido) || 0,
        bruto_antes: bruto,
        bruto_depois: 0,
      };

      const response = await fetch("http://localhost:3000/complementos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar solicitação");
      }

      console.log("Solicitação enviada com sucesso");
      onClose();
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err);
      alert("Erro ao solicitar complemento.");
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute left-1/2 top-[520px] transform -translate-x-1/2 w-full max-w-3xl bg-white shadow rounded p-4 z-40">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={complementoIcon} className="w-5 h-5" alt="Complemento" />
          <h2 className="font-bold text-sm">Solicitação de Complemento</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Identificação da balança */}
      <div className="mt-4 mb-2 text-sm font-medium bg-gray-200 px-3 py-1 w-max rounded">
        {balanca}
      </div>

      {/* Formulário */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col text-sm w-32">
          <label className="mb-1 bg-gray-200 px-2 py-1 rounded">Placa</label>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="bg-gray-100 px-3 py-1 rounded outline-none"
          />
        </div>

        <div className="flex flex-col text-sm w-24">
          <label className="mb-1 bg-gray-200 px-2 py-1 rounded">Tara</label>
          <input
            type="number"
            value={tara}
            onChange={(e) => setTara(e.target.value)}
            className="bg-gray-100 px-3 py-1 rounded outline-none"
          />
        </div>

        <div className="flex flex-col text-sm w-24">
          <label className="mb-1 bg-gray-200 px-2 py-1 rounded">Líquido</label>
          <input
            type="number"
            value={liquido}
            onChange={(e) => setLiquido(e.target.value)}
            className="bg-gray-100 px-3 py-1 rounded outline-none"
          />
        </div>

        <div className="flex flex-col text-sm w-24">
          <label className="mb-1 bg-gray-200 px-2 py-1 rounded">Bruto</label>
          <input
            type="number"
            value={bruto}
            disabled
            className="bg-gray-100 px-3 py-1 rounded outline-none text-gray-500"
          />
        </div>

        <div className="flex-1 text-center mt-4">
          <button
            onClick={enviarSolicitacaoComplemento}
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition text-sm"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
