import { useState, useLayoutEffect } from 'react'
import { useCookieState } from './use-cookie-state'
import { BinarySocketBase } from 'common/websocket/socket_base'
import { getDateFromToday, isBrowser } from 'common/utility'

const WEBSITE_STATUS_COUNTRY_KEY = 'website_status'
const COOKIE_EXPIRY_DAYS = 7

export const useWebsiteStatus = () => {
    const [website_status, setWebsiteStatus] = useCookieState(null, WEBSITE_STATUS_COUNTRY_KEY, {
        expires: getDateFromToday(COOKIE_EXPIRY_DAYS),
    })

    const manual_clients_country = isBrowser() && localStorage.getItem('manual_clients_country')

    const [is_loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        setLoading(true)
        if (!website_status) {
            const binary_socket = BinarySocketBase.init()
            binary_socket.onopen = () => {
                binary_socket.send(JSON.stringify({ website_status: 1 }))
            }

            binary_socket.onmessage = (msg) => {
                const response = JSON.parse(msg.data)

                if (!response.error) {
                    const { clients_country, crypto_config } = response.website_status

                    setWebsiteStatus({ clients_country, crypto_config })
                }
                setLoading(false)
                binary_socket.close()
            }
        } else if (!manual_clients_country) {
            const binary_socket = BinarySocketBase.init()
            binary_socket.onopen = () => {
                binary_socket.send(JSON.stringify({ website_status: 1 }))
            }

            binary_socket.onmessage = (msg) => {
                const response = JSON.parse(msg.data)

                if (!response.error) {
                    const { clients_country, crypto_config } = response.website_status
                    if (clients_country !== website_status.clients_country) {
                        setWebsiteStatus({ clients_country, crypto_config })
                    }
                }
                binary_socket.close()
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [website_status])

    return [website_status, setWebsiteStatus, is_loading]
}
