import React from 'react'
import styled from 'styled-components'
import { StyledLink } from 'components/elements'

export type Platform = {
    title: string
    icon: string
    description: string
    learn_more_link: string
}

type PlatformSelectorProps = {
    platforms: Array<Platform>
    selected_index: number
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`

const UnselectedPlatform = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem;
    span {
        font-weight: 700;
        font-size: 2rem;
        opacity: 0.3;
    }

    img {
        width: 32px;
        height: 32px;
        margin-right: 1rem;
        opacity: 0.3;
    }
`

const SelectedPlatform = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 384px;
    height: 200px;
    padding-top: 1.6rem;
    margin: 2rem 0;
    background: #ffffff;
    box-shadow: 0px 16px 20px rgba(131, 131, 131, 0.15), 0px 0px 20px rgba(131, 131, 131, 0.15);
    border-radius: 6px;
    img {
        width: 4rem;
        height: 4rem;
        /* margin-right: 1rem; */
    }
`

const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
        font-weight: 700;
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 2rem;
        line-height: 3rem;
        font-weight: 400;
        max-width: 250px;
        margin-bottom: 2.5rem;
    }
`

export const PlatformSelector = ({
    platforms,
    selected_index,
}: PlatformSelectorProps): React.ReactElement => {
    return (
        <ContentContainer>
            {platforms.map((platform, index) =>
                index === selected_index ? (
                    <SelectedPlatform>
                        <img src={platform.icon} alt="platform" />
                        <CardDetails>
                            <span>{platform.title}</span>
                            <p>{platform.description}</p>
                            <StyledLink href={platform.learn_more_link}>
                                Learn more {'>'}
                            </StyledLink>
                        </CardDetails>
                    </SelectedPlatform>
                ) : (
                    <UnselectedPlatform key={index}>
                        <img src={platform.icon} alt="platform" />
                        <span>{platform.title}</span>
                    </UnselectedPlatform>
                ),
            )}
        </ContentContainer>
    )
}
