import appConfig from "../config.json"
import { Box, Button, Text, TextField, Image } from "@skynexui/components"
import React from "react";

//Sitema de roteamento next
import { useRouter } from 'next/router';


function Title(props){

    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Nunito:wght@600&display=swap'); 
                font-family: 'Dancing Script';
                color: ${appConfig.theme.colors.neutrals["050"]};
                font-size: 42px;
                
            }
            `}</style>
        </>
    )
}

function MaisDadosGitHub(){
  return(
    <>
      <h1>Dados aqui</h1>
    </>
  )
}

//function HomePage() {
    //return (
    //<>
        //<GlobalStyle></GlobalStyle>
        //<Titulo tag = "h2">Boas vindas</Titulo>
        //<h2>Discord -Alura Matrix </h2>
    //</>
    //)
 // } 
//export default HomePage

export default function PaginaInicial() {
  const [username, setUsername]= React.useState('')
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          //backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://images8.alphacoders.com/503/503792.jpg)', //TELMI EDITION
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 50px 0 rgb(0 0 0 / 20%)',               //TELMI EDITION
            backgroundColor: 'rgba(0, 0, 0, 0.5)',                    //TELMI EDITION
            //backgroundColor: appConfig.theme.colors.neutrals[700],  //TELMI EDITION
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit = { function(event){
                event.preventDefault();
                console.log('Alguem submeteu o form')
                roteamento.push (`/chat?username=${username}`) //add user name a url 
                //window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Bem vindo! </Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/*<input 
                type="text"
                value={username}
                onChange = {function Handler(event) {
                    console.log('usuário digitou', event.target.value);
                    //Onde está o valor?
                    const valor = event.target.value;
                    //Trocar o valor da variavel
                    setUsername(valor);
                }}
            ></input>*/}
            <TextField
                value={username}
                onChange = {function (event) {
                    console.log('usuário digitou', event.target.value);
                    //Onde está o valor?
                    const valor = event.target.value;
                    //Trocar o valor da variavel
                    setUsername(valor);
                }}
                fullWidth
                textFieldColors={{
                    neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                    },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />

          <MaisDadosGitHub
            src = ""
          />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}