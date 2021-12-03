import React from 'react'
import styled from 'styled-components'

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

export const PlatformSelector = ({
    platforms,
    selected_index,
}: PlatformSelectorProps): React.ReactElement => {
    console.log(platforms, selected_index)
    return <div>Platforms</div>
}
