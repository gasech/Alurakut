import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties){
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius:'8px'}}/>
      <hr/>

      <p>
        <a className="boxLink" href="https://github.com/${properties.githubUser}">
          @{properties.githubUser}
        </a>
      </p>

      <hr/>
      
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home() { 
  const randomUser = 'gasech';
  const randomFriends = ['eduzznet','math-eusp','teofilooooo'];
  const [randomCommunities, setCommunities] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const attributes = {recados: 10,fotos: 5,videos: 10,fas: 14,mensagens: 40000,confiavel: 3,legal: 3,sexy: 3};
  
  return (
    <>
    {/* Nav Bar Menu */}
    <AlurakutMenu/>

    <MainGrid>
      {/* Profile Area */}
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={randomUser}/>
      </div>

      {/* Welcome Area */}
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h2 className="title">Bem Vindo(a)</h2>
          <OrkutNostalgicIconSet {...attributes}/>
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();
            const dataForm = new FormData(e.target);

            const community = {
              id: new Date().toISOString,
              title: dataForm.get('title'),
              image: dataForm.get('image')
            }

            const newCommunities = [...randomCommunities, community]

            setCommunities(newCommunities);
          }}>
            <div>
              <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text"/>
              <input placeholder="Coloque uma URL para usarmos de capa" name="image" aria-label="Coloque uma URL para usarmos de capa" type="text"/>
            </div>

            <button>Criar comunidade</button>
          </form>
        </Box>
      </div>
      
      {/* Profile Relations Area */}
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        {/* Friends Box */}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Amigos {randomFriends.length}</h2>
          <ul>
              {randomFriends.map((index) => {
                return (
                  <li key={index}>
                    <a href={`/users/${index}`} key={index}>
                      <img src={`https://github.com/${index}.png`} />
                      <span>{index}</span>
                    </a>
                  </li>
                )
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
        {/* Communities Box*/}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades {randomCommunities.length}</h2>
          <ul>
              {randomCommunities.map((index) => {
                return (
                  <li key={index.id}>
                    <a href={`/users/${index.title}`} key={index.id}>
                      <img src={`${index.image}`} />
                      <span>{index.title}</span>
                    </a>
                  </li>
                )
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
      </div>
    </MainGrid>
    </>
  )
}
