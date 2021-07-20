import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

export default function Home(props) {
  const READONLYTOKEN = process.env.READONLYTOKEN;
  
  const username = props.githubUser;

  const [userfollowing, setFollowing] = React.useState([]);
  
  const [userfollowers, setFollowers] = React.useState([]);

  const [usercommunities, setCommunities] = React.useState([]);

  const [userinfo, setUserInfo] = React.useState({});

  const attributes = {recados: 10,fotos: 5,videos: 10,fas: 14,mensagens: 40000,confiavel: 3,legal: 3,sexy: 3};

  React.useEffect(function() {
    // API GITHUB 
    fetch(`https://api.github.com/users/${username}`)
    .then(function (serverResponse){
      return serverResponse.json();
    })
    .then(function (finalResponse){
      setUserInfo(finalResponse);
      console.log(finalResponse);
    })

    // FOLLOWING
    fetch(`https://api.github.com/users/${username}/following`)
    .then(function (serverResponse){
      return serverResponse.json();
    })
    .then(function (finalResponse){
      setFollowing(finalResponse);
    })
    // FOLLOWERS
    fetch(`https://api.github.com/users/${username}/followers`)
    .then(function (serverResponse){
      return serverResponse.json();
    })
    .then(function (finalResponse){
      setFollowers(finalResponse);
    })

    // API GraphQL DATOCMS
    // COMMUNITIES
    fetch('https://graphql.datocms.com/', {
      method: 'POST', 
      headers: {
        'Authorization': READONLYTOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query":`query {
        allCommunities {
          id
          title
          imageUrl
          creatorName
        }
      }` })
    })
    .then(function (serverResponse){
      return serverResponse.json();
    })
    .then(function (finalResponse){
      const finalCommunities = finalResponse.data.allCommunities;

      setCommunities(finalCommunities);
    })
  }, [])
  
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
              title: dataForm.get('title'),
              imageUrl: dataForm.get('image'),
              creatorName: username
            }

            fetch('/api/communities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(community)
            })
            .then(async (response) => {
              const data = await response.json();
              console.log(data.createdRecord);
              const community = data.createdRecord;

              const newCommunities = [...usercommunities, community];
              setCommunities(newCommunities)
            })
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
        
        {/* Following Box */}
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Seguindo {userinfo.following}</h2>
          <ul>
              {userfollowing.map((currentItem, counter) => {
                if(counter + 1 <= 6){
                  return (
                    <li key={currentItem.login}>
                      <a href={`/users/${currentItem.login}`} key={currentItem.login}>
                        <img src={`https://github.com/${currentItem.login}.png`} />
                        <span>{currentItem.login}</span>
                      </a>
                    </li>
                  )
                }
              })}
          </ul>
        </ProfileRelationsBoxWrapper>
        
        {/* Followers Box*/}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Seguidores {userinfo.followers}</h2>
          <ul>
              {userfollowers.map((currentItem, counter) => {
                if(counter + 1 <= 6){
                  return (
                    <li key={currentItem.login}>
                      <a href={`/users/${currentItem.login}`} key={currentItem.login}>
                        <img src={`https://github.com/${currentItem.login}.png`} />
                        <span>{currentItem.login}</span>
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
                      <a href={`/communities/${currentItem.title}`} key={currentItem.id}>
                        <img src={`${currentItem.imageUrl}`} />
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((response) => response.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, 
  }
}