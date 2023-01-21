import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiFile } from "react-icons/fi";

import "./style.css";

import logoImg from "../../../assets/logo.png";

import api from "../../../services/api";

function FazerPedido() {
  const [clientes, setClientes] = useState([]);
  const history = useHistory();

  const empresaName = localStorage.getItem("nomeEmpresa");
  const empresaId = localStorage.getItem("empresaId");

  useEffect(() => {
    api
      .get("profile/pedido", {
        headers: {
          Authorization: empresaId,
        },
      })
      .then((response) => {
        setClientes(response.data);
      });
  }, [empresaId]);

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  async function handleNotaPed(id) {
    try {
      await api.get(`pdf/${id}`, {
        headers: {
          Authorization: empresaId,
        },
      });
      alert(`Arquivo Gerado Com Sucesso!! Verificar na pasta Notas`);

    } catch (erro) {
      alert(`Erro ao Gerar a Nota!!`);
    }
  }
  return (
    <div className="profile-containerprod">  { /* utilziando class/css de listar produtos */ }
      <header>
        <img src={logoImg} alt="Checkpoint" />
        <span>Bem vinda, {empresaName}</span>
        <Link className="button" to="/painel-vendedor">
          Menu
        </Link>
        <Link className="button" to="/pedido-novo">
          Fazer Pedido
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>
      <h1>Pedidos</h1>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>ID DO PEDIDO :</strong>
            <p>{cliente.id}</p>
            <strong>NOME DO CLIENTE :</strong>
            <p>{cliente.nome}</p>
            <strong>CPF DO CLIENTE :</strong>
            <p>{cliente.cpfDoComprador}</p>
            <strong>ENDEREÇO DO CLIENTE :</strong>
            <p>{cliente.endereco}</p>
            <strong>PRODUTO :</strong>
            <p>{cliente.nomeDoProduto}</p>
            <strong>VALOR DO PEDIDO:</strong>
            <p>
              {Intl.NumberFormat("py-BR", {
                style: "currency",
                currency: "BRL",
              }).format(cliente.value)}
            </p>
            <strong>FORMA DE PAGAMENTO:</strong>
            <p>{cliente.formaPagamento}</p>
            <strong>QUANTIDADE DO PRODUTO:</strong>
            <p>{cliente.quantidade}</p>
            <button onClick={() => handleNotaPed(cliente.id)} type="button">
              <FiFile size={20}></FiFile>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FazerPedido;
