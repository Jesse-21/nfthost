import NextLink from 'next/link'
import { Box, Text, useColorModeValue, VStack, HStack, 
    Avatar, IconButton, Button, useColorMode, Flex, Link,
    Image
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import ConnectWalletTag from './ConnectWalletTag'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineDashboard, MdOutlineMiscellaneousServices, 
    MdOutlineDarkMode, MdOutlineLightMode, MdPayment 
} from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineTeam } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'

const sidebarItemArr = [
    { 
        parent: 'navigation',
        items: [ 
            { 
                name: 'Get Started', 
                link: '/getStarted', 
                icon: <MdOutlineDashboard />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Payments', 
                link: '/payments', 
                icon: <MdPayment />, 
                children: [],
                isExternal: false
            }
        ]
    },
    { 
        parent: 'apps',
        items: [ 
            { 
                name: 'Generator', 
                link: '/generator', 
                icon: <MdOutlineMiscellaneousServices />, 
                children: [],
                isExternal: false
            },
            { 
                name: 'Website', 
                link: '/website', 
                icon: <CgWebsite />, 
                children: [
                    { name: 'Templates', link: '/website/templates' },
                    { name: 'Addons', link: '/website/addons' },
                    { name: 'Domain', link: '/website/domain' }
                ],
                isExternal: false
            }
        ]
    },
    { 
        parent: 'about',
        items: [ 
            { 
                name: 'Partners', 
                link: '/partners', 
                icon: <VscOrganization />, 
                children: [],
                isExternal: false
            },
            // { 
            //     name: 'Team', 
            //     link: '/team', 
            //     icon: <AiOutlineTeam />, 
            //     children: [],
            //     isExternal: false
            // },
            { 
                name: 'Support', 
                link: 'https://discord.gg/BMZZXZMnmv', 
                icon: <BiSupport />, 
                children: [],
                isExternal: true
            }
        ]
    },
]

const Layout = ({ children, currentApp }) => {
    const { isSidebar, setIsSidebar } = useCore();
    const { colorMode, toggleColorMode } = useColorMode();

    const sidebarBG = useColorModeValue('white', 'rgb(55,66,76)');
    const sidebarColor = useColorModeValue('#60677d', '#9097a7');
    const toolbarBG = useColorModeValue('rgba(250,250,250,1)', 'rgb(60,71,82)');
    const defaultColor = useColorModeValue('rgba(0,0,0,0.7)', 'white');

    //https://coderthemes.com/codefox/#demos

    return (
        <>
            <HStack 
                position='fixed'
                top='0'
                w='full'
                bg={toolbarBG}
                h='70px'
                px='2em'
                justifyContent='space-between'
                zIndex='1337 !important'
                boxShadow='sm'
            >
                <HStack spacing='2em'>
                    <Link href='/dashboard' style={{ textDecoration: 'none' }}>
                        <HStack spacing='1em' cursor='pointer' p='1em'>
                            <Image src={colorMode === 'dark' ? '/assets/logo_new_full_white.png' : '/assets/logo_new_full_black.png'} alt='NFTHost Logo' width='140px' />
                        </HStack>
                    </Link>
                    <IconButton 
                        bg='transparent' 
                        color={defaultColor} 
                        fontSize='16pt' 
                        _hover={{ bg: 'transparent', color: defaultColor }}
                        onClick={() => setIsSidebar(!isSidebar)}
                    >
                        <GiHamburgerMenu />
                    </IconButton>
                </HStack>
                <HStack spacing='2em'>
                    <IconButton 
                        aria-label='Toggle Color Mode' 
                        bg='transparent'
                        color={defaultColor} 
                        _hover={{ bg: 'transparent', color: defaultColor }}
                        onClick={toggleColorMode}
                    >
                        {colorMode === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
                    </IconButton>
                    <ConnectWalletTag 
                        isUserProfile
                        isPayments
                        isCopyAddress
                    />
                </HStack>
            </HStack>
            {isSidebar && (
                <VStack
                    position='fixed'
                    top='0'
                    flexDir='column'
                    bg={sidebarBG}
                    w='245px'
                    h='full'
                    p='1.5em'
                    alignItems='flex-start'
                    mt='70px'
                    boxShadow='sm'
                    spacing='1em'
                    color={sidebarColor}
                    zIndex='1337 !important'
                >
                    {sidebarItemArr?.map((item, idx) => (
                        <VStack key={idx} spacing='1.5em' alignItems='flex-start' w='full'>
                            <Text fontSize='10pt'>
                                {item.parent.toUpperCase()}
                            </Text>
                            <VStack spacing='.25em'>
                                {item.items.map((nav, idx) => (
                                    <Box key={idx} w='full'>
                                        {!nav.isExternal ? (
                                            <NextLink href={`/dashboard${nav.link}`} shallow passHref>
                                                <Button 
                                                    borderRadius='0' 
                                                    leftIcon={nav.icon}
                                                    w='full' 
                                                    justifyContent='flex-start' 
                                                    bg='transparent'
                                                    _hover={{ bg: 'transparent', color: 'rgb(52,140,212)' }}
                                                    color={currentApp === nav.name.replace(' ', '').toLowerCase() ? 'rgb(52,140,212)' : null}
                                                >
                                                    {nav.name}
                                                </Button>
                                            </NextLink>
                                        ) : (
                                            <Link href={nav.link} isExternal style={{ textDecoration: 'none' }}>
                                                <Button 
                                                    borderRadius='0' 
                                                    leftIcon={nav.icon}
                                                    w='full' 
                                                    justifyContent='flex-start' 
                                                    bg='transparent'
                                                    _hover={{ bg: 'transparent', color: 'rgb(52,140,212)' }}
                                                    color={currentApp === nav.name.replace(' ', '').toLowerCase() ? 'rgb(52,140,212)' : null}
                                                >
                                                    {nav.name}
                                                </Button>
                                            </Link>
                                        )}
                                        <VStack spacing='0' pl='1.5em'>
                                            {nav.children.map((children, idx) => (
                                                <NextLink href={`/dashboard${children.link}`} shallow passHref key={idx}>
                                                    <Button 
                                                        borderRadius='0' 
                                                        w='full' 
                                                        justifyContent='flex-start' 
                                                        bg='transparent'
                                                        _hover={{ bg: 'transparent', color: 'rgb(52,140,212)' }}
                                                        fontSize='10pt'
                                                        color={currentApp === children.name.toLowerCase() ? 'rgb(52,140,212)' : null}
                                                    >
                                                        {children.name}
                                                    </Button>
                                                </NextLink>
                                            ))}
                                        </VStack>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>
                    ))}
                </VStack>
            )}
            <Flex flexDir='column' pt='80px' pb='102px' ml={isSidebar ? '245px' : '0'} px='2rem' minH='100vh'>
                {children}
            </Flex>
        </>
    )
}

export default Layout