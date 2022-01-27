  /* 
Usuário
    - usuário digita no campo text area 
    - aperta enter para enviar
    - tem que adicionar o texto na listagem
DEV
    - criar campo 
    - usar onChange e useState (if para quando apertar 'enter' limpar variavel)
    - listagem de mensagem
    */

//IMPORTS
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from '@supabase/supabase-js'

//Configuração API do SUPABASE 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxODA3MSwiZXhwIjoxOTU4ODk0MDcxfQ.dANh9tzZIANAYuhMJcJvjwXN1bkJjzOtIAkTN_GkmH8';
const SUPABASE_URL = 'https://amiuxlzcwgjmqshkaexg.supabase.co';
const supabaseClient = createClient (SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    
    React.useEffect(() => {                                      //useEffect foi feito para lidar c/ tudo que foge do seu padrão/extra, um dado externo, por exemplo. O useEffect é carregado por padrão sempre que a página carrega. Caso eu queira que em decorrencia de um estado ele rode de novo, é preciso passar a decorrencia como parametro.
        supabaseClient                                           //semelhando ao uso do fetch
            .from('mensagens')                                   //FROM ->tabela criada no supabase
            .select('*')
            .order ( 'id', { ascending:false})                    // carrega mensagens na ordem correta                  // SELECT -> o que vc quer fazer c/ a tabela selecionar!Selecionar o que? Tudo! ou seja: '*'
            .then(({ data }) => {                                //THEN -> o data é onde tem nosso array com as informações, os dados da consulta
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });
    }, []); 
    
  function handleNovaMensagem(novaMensagem) {

    //transformando 'mensagem' de uma string para um objeto
    const mensagem = {
      //id: listaDeMensagens.length + 1, -> usando o ID da API
      de: "TelmiAdame",
      texto: novaMensagem,
    };

    //Enviar nossa mensagem para API
    supabaseClient
        .from('mensagens')
        .insert([mensagem])
        .then(({data}) => {
            console.log('Criando mensagem:', data);
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens, 
            ]);
        }); 

    // Adcionar texto digitado na área box (só que sem formato de lista)
    //setListaDeMensagens([
    //  mensagem,                             //substitui o: 'novaMensagem' depois de criar o objeto 'mensagem'
    //  ...listaDeMensagens,                  // '...' pegar tudo anterior
    //]);
    //em seguida limpar variavel 'setMensagem'
    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          {/*Transformando mensagens recebidas em uma lista (percore, add em um li)
          listaDeMensagens.map( (mensagemAtual)=> {
            return (
                <li key={mensagemAtual.id}>
                    {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
            )
        })*/}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              //Atualizando 'variavel mensagem'
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              //Capturar digito 'ENTER'
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  event.preventDefault(); //retirar quebra de linha padrão do 'Enter'
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">
            Chat
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                  {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
