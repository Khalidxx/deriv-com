import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styled, { css } from 'styled-components'
import { platform_details, PlatformContent, ImageTag } from './_utils'
import type { TPlatformDetails } from './_utils'
import { Box, Flex } from 'components/containers'
import { Header } from 'components/elements'

const SelectedZone = styled(Flex)`
    left: 0;
    right: 0;
    box-shadow: rgba(131, 131, 131, 0.15) 0 16px 20px, rgba(131, 131, 131, 0.15) 0 0 20px;
    top: calc(50% - 152px / 2);
    z-index: 4;
`

type SelectedSlideProps = {
    selected_slide: TPlatformDetails
}

const SelectedSlide = ({ selected_slide }: SelectedSlideProps) => {
    const { title, icon, description, learn_more_link } = selected_slide
    return (
        <SelectedZone position="absolute" height="152px" background="white" p="16px">
            <ImageTag src={icon} alt={title} />
            <Flex fd="column" jc="start" ml="8px">
                <PlatformContent
                    title={title}
                    description={description}
                    learn_more_link={learn_more_link}
                    is_from_slider
                />
            </Flex>
        </SelectedZone>
    )
}

const Shadow = styled.div<{ location: 'start' | 'end' }>`
    position: absolute;
    left: 0;
    right: 0;
    height: calc(50% - 152px / 2);
    z-index: 1;
    pointer-events: none;
    ${({ location }) => {
        if (location === 'start') {
            return css`
                top: -0.5px;
                background: linear-gradient(
                    to top,
                    rgba(249, 251, 255, 0) 0%,
                    rgba(249, 251, 255, 1) 100%
                );
            `
        } else {
            return css`
                bottom: -0.5px;
                background: linear-gradient(rgba(249, 251, 255, 0) 0%, rgba(249, 251, 255, 1) 100%);
            `
        }
    }}
`

const Scene = styled.div`
    min-width: 100%;
    height: 100%;
    overflow: hidden;
`

const Viewport = styled(Flex)`
    user-select: none;
`

const WheelContainer = styled.div`
    height: 100px;
    width: 96%;
    perspective: 1000px;
    perspective-origin: 150%;
`

const Slide = styled(Flex)<{ distance_center: number }>`
    text-align: center;
    align-items: center;
    cursor: pointer;
    backface-visibility: hidden;
    ${({ distance_center }) => {
        if (Math.abs(distance_center) === 1) {
            if (distance_center < 0) {
                return css`
                    margin-bottom: 30px;
                `
            } else {
                return css`
                    margin-top: 30px;
                `
            }
        }
    }}
`

type PlatformSliderProps = {
    slide_index: number
    onSelectSlide: Dispatch<SetStateAction<number>>
}

const PlatformSlider = ({ slide_index, onSelectSlide }: PlatformSliderProps) => {
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        axis: 'y',
        skipSnaps: false,
    })

    const clickHandler = (index) => {
        embla.scrollTo(index)
        onSelectSlide(index)
    }

    return (
        <Box width="40%" height="640px" background="rgba(249, 251, 255, 1)" p="0 20px" m="0 auto">
            <Flex position="relative" max_width="384px" m="0 auto" jc="unset">
                <Shadow location="start" />
                <Shadow location="end" />
                <SelectedSlide
                    selected_slide={platform_details[slide_index] || platform_details[0]}
                />
                <Flex ai="center" jc="unset">
                    <Scene>
                        <Viewport position="relative" ai="center" ref={viewportRef}>
                            <WheelContainer>
                                {platform_details.map(({ title, icon, learn_more_link }, index) => {
                                    return (
                                        <Slide
                                            distance_center={index - slide_index}
                                            key={learn_more_link}
                                            onClick={() => clickHandler(index)}
                                        >
                                            <ImageTag src={icon} />
                                            <Header type="subtitle-1">{title}</Header>
                                        </Slide>
                                    )
                                })}
                            </WheelContainer>
                        </Viewport>
                    </Scene>
                </Flex>
            </Flex>
        </Box>
    )
}

export default PlatformSlider
