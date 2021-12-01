import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { localize } from 'components/localization'
import { Header, QueryImage, Text } from 'components/elements'
import { Container, SectionContainer } from 'components/containers'

const query = graphql`
    query {
        platforms_dtrader: file(relativePath: { eq: "home/platforms_dtrader.png" }) {
            ...homePageHeroFadeIn
        }
        platforms_mt5: file(relativePath: { eq: "home/platforms_mt5.png" }) {
            ...fadeIn
        }
        platforms_smarttrader: file(relativePath: { eq: "home/platforms_smarttrader.png" }) {
            ...fadeIn
        }
        platforms_dbot: file(relativePath: { eq: "home/platforms_dbot.png" }) {
            ...fadeIn
        }
        platforms_binary_bot: file(relativePath: { eq: "home/platforms_binary_bot.png" }) {
            ...fadeIn
        }
        platforms_deriv_go: file(relativePath: { eq: "home/platforms_deriv_go.png" }) {
            ...fadeIn
        }
        platforms_derivx: file(relativePath: { eq: "home/platforms_derivx.png" }) {
            ...fadeIn
        }
        platforms_api: file(relativePath: { eq: "home/platforms_api.png" }) {
            ...fadeIn
        }
    }
`

const StyledSection = styled(SectionContainer)`
    background: #f9fbff;
`

const ContentWrapper = styled(Container)`
    width: 100%;

    h2 {
        text-align: center;
    }
`

const MainContent = styled(Container)`
    height: 100%;
    padding: 5rem;
`

const OurPlatforms = (): React.ReactElement => {
    const {
        platforms_dtrader,
        platforms_mt5,
        platforms_smarttrader,
        platforms_dbot,
        platforms_binary_bot,
        platforms_deriv_go,
        platforms_derivx,
        platforms_api,
    } = useStaticQuery(query)
    return (
        <StyledSection height="1065px">
            <ContentWrapper direction="column">
                <Header as="h2" size="4.8rem" type="heading-1" weight="700">
                    {localize('Our platforms')}
                </Header>
                <Text size="2.4rem">
                    {localize(
                        'Choose from 8 powerful platforms — each designed with your needs in mind',
                    )}
                </Text>
                <MainContent></MainContent>
            </ContentWrapper>
        </StyledSection>
    )
}

export default OurPlatforms
