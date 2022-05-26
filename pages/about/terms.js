import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Image, Avatar, Button, Flex, IconButton } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const Terms = () => {
    return (
        <Box>
            <Head>
                <title>NFT Host Terms Of Service | NFT Host</title>
                <meta name="title" content='NFT Host' />
                <meta name="description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
                <meta name="robots" content='index, follow' />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content='en' />

                <meta property="og:type" content='website' />
                <meta property="og:url" content='https://www.nfthost.app/' />
                <meta property="og:title" content='NFT Host' />
                <meta property="og:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="og:image" content='https://www.nfthost.app/logo.png' />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content='https://www.nfthost.app/' />
                <meta property="twitter:title" content='NFT Host' />
                <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="twitter:image" content='https://www.nfthost.app/logo.png' />
            </Head>
            <Navbar />
            <Box 
                display='flex' 
                w='full' 
                p='2em'
                justifyContent='center'
            >
                <Box
                    display='flex'
                    flexDir='column'
                    maxW='1200px'
                    w='full'
                >
                    <Text fontSize='42pt' fontWeight='bold' lineHeight='48pt'>
                        Terms of Service
                    </Text>
                    <Text fontSize='14pt'>
                        Effective Date: May 19, 2022
                    </Text>
                    <Text fontSize='11pt' color='whiteAlpha.500'>
                        Agreement between User and https://www.swiftnft.io
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Terms