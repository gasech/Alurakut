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
  const username = 'gasech';
  const userfriends = ['eduzznet','math-eusp','teofilooooo'];
  const [usercommunities, setCommunities] = React.useState([{
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
        <ProfileSidebar githubUser={username}/>
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
              id: new Date().toISOString(),
              title: dataForm.get('title'),
              image: dataForm.get('image')
            }

            const newCommunities = [...usercommunities, community]

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
          <h2 className="smallTitle">Amigos {userfriends.length}</h2>
          <ul>
              {userfriends.map((currentItem, counter) => {
                if(counter + 1 <= 6){
                return (
                    <li key={currentItem}>
                      <a href={`/users/${currentItem}`} key={currentItem}>
                        <img src={`https://github.com/${currentItem}.png`} />
                        <span>{currentItem}</span>
                      </a>
                    </li>
                  )
                }
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
        {/* Communities Box*/}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades {usercommunities.length}</h2>
          <ul>
              {usercommunities.map((currentItem, counter) => {
                if(counter + 1 <= 6){
                  return (
                    <li key={currentItem.id}>
                      <a href={`/users/${currentItem.title}`} key={currentItem.id}>
                        <img src={`${currentItem.image}`} />
                        <span>{currentItem.title}</span>
                      </a>
                    </li>
                  )
                }
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
