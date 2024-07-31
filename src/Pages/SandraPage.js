import React, {Component} from 'react';
import ReactGA from "react-ga";
import styled from "styled-components";

// Font Awesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {faTwitter} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import {faBook} from "@fortawesome/free-solid-svg-icons"
import {faCode} from "@fortawesome/free-solid-svg-icons"
import {faEdit} from "@fortawesome/free-solid-svg-icons"

library.add(faLinkedin, faTwitter, faEnvelope, faBook, faCode, faEdit)

// Hero image
const HeroImage = "https://dummyimage.com/400x400/000/fff";

// Styled components
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 160vh;
  }
`

const DataContainer = styled.div`
  // Animation for Fade-In effect
  animation: fadeInAnimation ease 1.5s forwards; 
  @keyframes fadeInAnimation { 
    0% { 
        opacity: 0; 
    } 
    100% { 
        opacity: 1; 
    } 
  } 

  margin-top: 200px;
  width: 900px;
  @media (max-width: 1600px) {
    width: 800px;
  }
  @media (max-width: 1400px) {
    width: 700px;
  }
  @media (max-width: 968px) {
    width: 800px;
  }
  @media (max-width: 768px) {
    margin-top: 100px;
    width: 300px;
  }
`

const ImageContainer = styled.img`
border-radius: 50%;
  width: 400px;
  height: 400px;
  @media (max-width: 1600px) {
    margin-top: 50px;
    width: 300px;
    height: 300px;
  }
  box-shadow: 0px 0px 20px #868686;
`

const Title = styled.div`
  color: #000;
  cursor: default;
  font-weight: bold;
  font-size: 3rem;
  @media (max-width: 1400px) {
    font-size: 2.2rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 2.4rem;
  }
`

const Subtitle = styled.div`
  color: #444;
  font-size: 1.2rem;
  cursor: default;
  padding-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.2;
  @media (max-width: 1400px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const Description = styled.div`
  color: #444;
  font-size: 1.1rem;
  padding-bottom: 2rem;
  cursor: default;
  letter-spacing: 0.2;
  width: 800px;
  @media (max-width: 1400px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.1rem;
    width: 250px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
`

const IconContainer = styled.div`
  margin-top: 200px;
  @media (max-width: 1600px) {
    margin-top: 180px;
  }
  @media only screen and (max-width: 968px) {
    margin-top: 100px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 60px;
    padding-bottom: 2rem;
  }
`

const IconData = styled.a`
  color: white;
  margin: 10px;
  text-decoration: none;
`

const FontAwesomeIconContainer = styled(FontAwesomeIcon)`
  color: #1E50BC;
  :hover {
    color: #000;
  }
  transition: all ease 300ms;
`
const Name = styled.span`
  background-image: webkit-linear-gradient(45deg, #1a8fe3 15%, #1E50BC 65%);
  background-image: linear-gradient(45deg, #1a8fe3 15%, #1E50BC 65%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`

// Styled components
const MainContainer = styled.div`
    background-color:white;
  text-align: center;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: -60px;
    height: 800px;
  }
`

const SkillContainer = styled.div`
`

const DataContainerSkill = styled.div`
  @media only screen and (max-width: 768px) {
    margin-top: 20px;
    display: block;
  }
`

const SkillBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: block;
  }
  padding-bottom: 20px;
`

const SkillBox = styled.div`
  width: 300px;
`

const SkillMiddleBox = styled.div`
  width: 100px;
`

const SkillHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

const Skill = styled.div`
  font-size: 1.1rem;
  @media only screen and (max-width: 768px) {
    padding-bottom: 60px;
  }
`

const FontAwesomeIconContainerSkill = styled(FontAwesomeIcon)`
  color: #1E50BC;
  margin-bottom: 1rem;
`

class SandraPage extends Component {


    state = {};

    componentDidMount() {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITYCS);
        ReactGA.pageview();
    }

    render() {
        return (
            // The id below is for the scroller
            <div>
                <HeroContainer id="home">
                    <DataContainer>
                        <Title>
                            <Name>Hi, I'm Nombre.</Name>
                        </Title>
                        <Subtitle>
                            Ciudad, Country
                        </Subtitle>
                        <Subtitle>
                            Clases impartidas en: lorem ipsum
                        </Subtitle>
                        <Subtitle>
                            Temario propio: Si / No
                        </Subtitle>
                        <Description>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Description>
                        <ButtonContainer>
                        </ButtonContainer>
                        <IconContainer>
                            <IconData href={`mailto:}`}>
                                <FontAwesomeIconContainer icon={["fas", "envelope"]} size="2x"/>
                            </IconData>
                            <IconData href={""}>
                                <FontAwesomeIconContainer icon={["fab", "linkedin"]} size="2x"/>
                            </IconData>
                            <IconData href={""}>
                                <FontAwesomeIconContainer icon={["fab", "twitter"]} size="2x"/>
                            </IconData>
                        </IconContainer>
                    </DataContainer>
                    <ImageContainer src={HeroImage}/>
                </HeroContainer>
                <MainContainer>
                    <SkillContainer id="skills">
                        <DataContainerSkill>
                            <SkillBoxContainer>
                                <SkillBox></SkillBox>
                                <SkillBox>
                                    <FontAwesomeIconContainerSkill icon={["fas", "book"]} size="3x"/>
                                    <SkillHeader>
                                        Temario Propio
                                    </SkillHeader>
                                    <Skill>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Skill>

                                </SkillBox>

                                <SkillMiddleBox></SkillMiddleBox>

                                <SkillBox>
                                    <FontAwesomeIconContainerSkill icon={["fas", "edit"]} size="3x"/>
                                    <SkillHeader>
                                        Esquemas
                                    </SkillHeader>
                                    <Skill>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Skill>
                                </SkillBox>

                                <SkillBox></SkillBox>

                            </SkillBoxContainer>
                        </DataContainerSkill>
                    </SkillContainer>
                </MainContainer>
            </div>
        );
    }
}

export default SandraPage;
