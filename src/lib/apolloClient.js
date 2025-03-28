// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://eu-west-2.cdn.hygraph.com/content/cm2xaipoi04f808urz37vnqbl/master', // Endpoint dell'API Hygraph
  headers: {
    Authorization: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzA4MzMwNjQsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20yeGFpcG9pMDRmODA4dXJ6Mzd2bnFibC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiY2I3ZDYxZjAtYzdlZC00MzQxLTg3ODctMmZkOTA1NjNkNzdiIiwianRpIjoiY20zNHRiZmo4MGY1YjA3bWY1NjViNTRwMiJ9.DgmdUMBTL7TuShOdpAKFAdV-POHEv_eG93AH9SV40QPdunEGGUJzEbcayf0xa3UcY_pN03Mq69zInoEmCcFTRjmExOLbpNYDDmx_yO33dX1C_SxXIJZUWkJ03tVGAeb-sZtFSSt-amCNc9_Dfqm5YdlLoEuOdGYZ7XKnl_L1Q7Zifi5wXLWWrJWCu8O9Flw7ROzOqM1NeMijRhyq-UgZ2FmAu6Rp164_AQY0g3opSqzPdmBc8FydIZ8WGT4i3OrtxO_282T819Sb2M358JmSNyMpPzgsmeyHCnRbg0plVvtMf8-_SMATjTdpqO_3qlY-5DppaENGfmih6iWwZx3xhuIXIdCG6N4p18IHzZVFbcKAoOmZwo4iIKk2Zm1Zhcu2zlMFEgVA1U7SDKQKvZeMIwKtfL40OFJ5rtKmfyx0ybaL83FehG69JE_N0xT5yuKNQr25vvIVSsOM95aYuQZ5TzWB2pIWgX6ax9lkweBtyp99R6dPCHFiRmyAsO4wzM8pNco9CYfi68hzUfrzjfevjbQTD6JDFti6ax7Zlww60I71NeqLorybHjViUvwvtjdgnu2OJ4HIQdYv-UM2C57Uow0leVB3ZAnAxT3dDmjHkXM-pCkpda_RyELTN8kWBBpW93RkJFmETeCE0s2LY4E_9n5CoUJPMJoXBc-kaxICyi4` // Token di accesso permanente
  },
  cache: new InMemoryCache()
});

export default client;
