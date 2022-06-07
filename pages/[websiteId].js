import Head from 'next/head'
import { useRouter } from 'next/router'
import { Text, Flex, Tag, TagLeftIcon, Link, Image, VStack, Button } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUserWebsite } from '@/hooks/useUserWebsite'
import CookieModal from '@/components/CookieModal'
import parse from 'html-react-parser'
import { CgCopyright } from 'react-icons/cg'
import { GiCutDiamond } from 'react-icons/gi'

const Service = () => {
    const router = useRouter();
    const { userWebsite } = useWebsite();
    const { websiteId } = router.query;
    useUserWebsite();

    return userWebsite && !userWebsite?.isExpired && (
        <main>
            <Head>
                <title>{userWebsite?.components?.title}</title>
                <link rel="shortcut icon" type="image/png" href={userWebsite?.meta?.favicon} />
                <meta name="title" content={userWebsite?.components?.title} />
                <meta name="description" content={userWebsite?.components?.description} />
                <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
                <meta name="robots" content={userWebsite?.meta?.robot} />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content={userWebsite?.meta?.language} />

                <meta property="og:type" content='website' />
                <meta property="og:url" content={`https://www.nfthost.app/${websiteId}`} />
                <meta property="og:title" content='NFT Host' />
                <meta property="og:description" content={userWebsite?.components?.description} />
                <meta property="og:image" content={userWebsite?.components?.unrevealedImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://www.nfthost.app/${websiteId}`} />
                <meta property="twitter:title" content={userWebsite?.components?.title} />
                <meta property="twitter:description" content={userWebsite?.components?.description} />
                <meta property="twitter:image" content={userWebsite?.components?.unrevealedImage} />

                {userWebsite?.components?.script && parse(userWebsite?.components?.script)}
            </Head>
            <CookieModal />
            <Flex
                flexDir='column'
                justifyContent='center'
                alignItems='center'
                py='3em'
                minH='100vh'
                position='relative'
            >
                <VStack spacing='2em'>
                    <Image 
                        src='https://i.ibb.co/WxNRq35/bitmoji.png'
                        alt={userWebsite?.components?.title}
                        boxSize='240px'
                        objectFit='scale-down'
                    />
                    <VStack>
                        <Text variant='content_title'>
                            {userWebsite?.components?.title}
                        </Text>
                        <Text>
                            {userWebsite?.components?.description}
                        </Text>
                        {userWebsite?.isPremium && (
                            <Tag>
                                <TagLeftIcon as={GiCutDiamond} color='skyblue' />
                                <Text>
                                    Premium
                                </Text>
                            </Tag>
                        )}
                    </VStack>
                    {parse(userWebsite?.components?.embed)}
                    <Link href='https://www.nfthost.app/' isExternal>
                        <Tag 
                            opacity='.25'
                            position='absolute'
                            bottom='2'
                            right='2'
                            cursor='pointer'
                            _hover={{
                                opacity: '.75'
                            }}
                        >
                            <TagLeftIcon as={CgCopyright} />
                            <Text>
                                Hosted from NFTHost.app
                            </Text>
                        </Tag>
                    </Link>
                </VStack>
            </Flex>
        </main>
    )
}

export default Service