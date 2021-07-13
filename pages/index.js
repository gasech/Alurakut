import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(properties){
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{borderRadius:'8px'}}/>
    </Box>
  )
}

export default function Home() {
  const randomUser = 'gasech';
  const randomFriends = ['eduzznet','math-eusp'];

  return (
    <>
    <AlurakutMenu/>

    <MainGrid>

      <div className="profileArea" style={{gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={randomUser}/>
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h2 className="title">Bem Vindo(a)</h2>
          <OrkutNostalgicIconSet/>
        </Box>
      </div>
      
      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Amigos {randomFriends.length}</h2>
          <ul>
              {randomFriends.map((index) => {
                return (
                  <li>
                    <a href={`/users/${index}`} key={index}>
                      <img src={`https://github.com/${index}.png`} />
                      <span>{index}</span>
                    </a>
                  </li>
                )
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
        <Box>
          <h2 className="smallTitle">Comunidades</h2>
        </Box>
        
      </div>
    </MainGrid>
    </>
  )
}