import { Box, HStack, Text, Flex, Button,
    Input, Textarea, NumberInput, NumberInputField, 
    NumberInputStepper, NumberIncrementStepper, 
    NumberDecrementStepper, FormControl, Tag, TagCloseButton, 
    FormHelperText, useColorModeValue, Wrap, Checkbox, VStack
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useMetadata } from '@/hooks/useMetadata'

const Configuration = () => {
    const { 
        layers,
        name,
        setName,
        description: desc,
        setDescription,
        externalURL,
        setExternalURL,
        standardType,
        collectionSize,
        setCollectionSize,
        symbol,
        setSymbol,
        creatorAddress,
        setCreatorAddress,
        sellerFee,
        setSellerFee,
        creatorShare,
        setCreatorShare,
        creators,
        storageURL,
        setStorageURL,
        animationURL,
        setAnimationURL,
        youtubeURL,
        setYoutubeURL,
        backgroundColor,
        setBackgroundColor,
        isRandomizedMetadata,
        setIsRandomizedMetadata
    } = useGenerator();
    const { AddCreator, DeleteCreator } = useMetadata();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const bgColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    const isDisplay = (component) => standardType?.components?.includes(component);
    
    const previewMetadata = () => {
        const standard = standardType.name.toLowerCase();
        const externalStorage = storageURL.trim().charAt(storageURL.length - 1) === '/' ? storageURL.substring(0, storageURL.length - 1) : storageURL;
    
        const DEFAULT_METADATA = {
            name: `${name.trim()} #1`,
            description: desc.trim(),                
            image: `${externalStorage}/0.png`,
            attributes: layers.map((layer) => {
                return {
                    trait_type: layer.name,
                    value: layer?.images[0]?.name || 'Sample Value'
                }
            }),
            compiler: 'https://nfthost.app/'
        }
    
        let metadataObj = {
            ethereum: {
                ...DEFAULT_METADATA,
            },
            solana: {
                ...DEFAULT_METADATA,
                symbol,
                seller_fee_basis_points: sellerFee,
                properties: {
                    category: 'image',
                    files: [
                        {
                            uri: `0.png`,
                            type: 'image/png'
                        }
                    ],
                    creators: creators
                }
            }
        }
    
        // Optional data
    
        if (externalURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, external_url: externalURL};
            metadataObj.solana = {...metadataObj.solana, external_url: externalURL};
        }
    
        if (backgroundColor.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, background_color: backgroundColor};
        }
    
        if (animationURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, animation_url: animationURL};
            metadataObj.solana = {...metadataObj.solana, animation_url: animationURL};
        }
    
        if (youtubeURL.length > 0) {
            metadataObj.ethereum = {...metadataObj.ethereum, youtube_url: youtubeURL};
        }
    
        return JSON.stringify(metadataObj[standard], null, 4);
    }

    return (
        <Flex 
            flexDir='column'
            id='metadata'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
            w='full'
        >
            <Wrap spacing='2em'>
                <Flex flexDir='column' flex='1'>
                    <Text fontWeight='bold' fontSize='10pt'>
                        Configuration
                    </Text>
                    <Text fontSize='9pt'>
                        Current Standard: <span style={{ color: 'rgb(52,140,212)' }}>{standardType?.name}</span>
                    </Text>
                    <Text fontSize='9pt' mb='1.5em'>
                        Fields with * are required. Otherwise, leave it empty if you want.
                    </Text>
                    <HStack>
                        {isDisplay('name') && (
                            <FormControl flex='1'>
                                <Input 
                                    id='collectionName' 
                                    placeholder='Name*'
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    size='sm'
                                />
                                <FormHelperText fontSize='9pt'>Name of your NFT Collection.</FormHelperText>
                            </FormControl>
                        )}
                        {isDisplay('size') && (
                            <FormControl flex='1'>
                                <NumberInput min={1} max={10000} value={collectionSize} onChange={setCollectionSize} size='sm'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormHelperText fontSize='9pt'>Size of your NFT Collection.</FormHelperText>
                            </FormControl>
                        )}
                    </HStack>
                    <HStack alignItems='flex-start' mt='1em'>
                        {isDisplay('symbol') && (
                            <FormControl flex='1'>
                                <Input 
                                    id='collectionSymbol' 
                                    placeholder='Symbol'
                                    value={symbol} 
                                    onChange={(e) => setSymbol(e.target.value)}
                                    size='sm'
                                />
                                <FormHelperText fontSize='9pt'>Symbol of your NFT Collection.</FormHelperText>
                            </FormControl>
                        )}
                        {isDisplay('seller_fee_basis_points') && (
                            <FormControl flex='1'>
                                <NumberInput id='collectionSellerFee' min={1} max={1000} value={sellerFee} onChange={setSellerFee} size='sm'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormHelperText fontSize='9pt'>Royalties percentage awarded to creators. Shown as a percentage received by each co-creator.</FormHelperText>
                            </FormControl>
                        )}
                    </HStack>     
                    {isDisplay('description') && (
                        <FormControl mt='1em'>
                            <Textarea size='sm' id='collectionDescription' placeholder='Description*' w='full' rows='5' value={desc} onChange={(e) => setDescription(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>Short Description of your NFT Collection. Markdown is supported.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('image') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionUrl' placeholder='Image Storage URL' w='full' value={storageURL} onChange={(e) => setStorageURL(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>This is the External URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by OpenSea), and can be IPFS URLs or paths. We recommend using a 350 x 350 image.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('external_url') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionExternalUrl' placeholder='External URL' w='full' value={externalURL} onChange={(e) => setExternalURL(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site. URL to an external application or website where users can also view the asset.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('background_color') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionBackgroundColor' placeholder='Background Color' w='full' value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>Background color of the item on OpenSea. Must be a six-character hexadecimal without a pre-pended #.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('animation_url') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionAnimationUrl' placeholder='Animation URL' w='full' value={animationURL} onChange={(e) => setAnimationURL(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Animation_url also supports HTML pages, allowing you to build rich experiences and interactive NFTs using JavaScript canvas, WebGL, and more. Scripts and relative paths within the HTML page are now supported. However, access to browser extensions is not supported.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('youtube_url') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionYoutubeUrl' placeholder='Youtube URL' w='full' value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)}/>
                            <FormHelperText fontSize='9pt'>A URL to a YouTube video.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('compiler') && (
                        <FormControl mt='1em'>
                            <Input size='sm' id='collectionCompiler' w='full' value='https://nfthost.app/' readOnly disabled/>
                            <FormHelperText fontSize='9pt'>Compiler of your NFT Collection.</FormHelperText>
                        </FormControl>
                    )}
                    {isDisplay('creators') && (
                        <Box mt='1em'>
                            <HStack w='full' alignItems='flex-start'>
                                <FormControl>
                                    <Input 
                                        id='collectionCreatorAddress' 
                                        placeholder='Creator Wallet Address'
                                        value={creatorAddress} 
                                        onChange={(e) => setCreatorAddress(e.target.value)} 
                                        flex='1'
                                        size='sm'
                                    />
                                    <FormHelperText fontSize='9pt'>Wallet Address of a Creator</FormHelperText>
                                </FormControl>
                                <HStack alignItems='flex-start'>
                                    <FormControl>
                                        <NumberInput id='collectionCreatorShare' min={1} max={100} w='100px' value={creatorShare} onChange={setCreatorShare} size='sm'>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <FormHelperText fontSize='9pt'>Share Percentage</FormHelperText>
                                    </FormControl>
                                    <Text>
                                        %
                                    </Text>
                                </HStack>
                                <Button w='80px' onClick={AddCreator} size='sm' variant='primary'>
                                    Add
                                </Button>
                            </HStack>
                            <Text fontSize='10pt' mt='1em'>
                                Creators:
                            </Text>
                            <Flex flexDir='column' justifyContent='center' w='full'>
                                {creators?.map((creator, idx) => (
                                    <Tag key={idx} mb='.5em' justifyContent='space-between'>
                                        <HStack justifyContent='space-between' w='full'>
                                            <Text noOfLines='1'>
                                                Address: {creator.address}
                                            </Text>
                                            <Text>
                                                Share: {creator.share}%
                                            </Text>
                                        </HStack>
                                        <TagCloseButton onClick={() => DeleteCreator(idx)}/>
                                    </Tag>
                                ))}
                            </Flex>
                        </Box>
                    )}
                </Flex>
                <Flex flexDir='column' flex='1'>
                    <Text fontWeight='bold' fontSize='10pt'>
                        Preview
                    </Text>
                    <Text fontSize='9pt' mb='1.5em'>
                        A preview of your NFT collection's metadata json file.
                    </Text>
                    <Flex bg={bgColor} borderRadius='10px' justifyContent='center' alignItems='center' p='1em'>
                        <Textarea value={previewMetadata()} size='sm' rows={20} readOnly disabled/>
                    </Flex>
                    <Text fontWeight='bold' fontSize='10pt' mt='1.5em'>
                        Options
                    </Text>
                    <Text fontSize='9pt' mb='1em'>
                        This will affect your collection's metadata.json file.
                    </Text>
                    <VStack p='1em' alignItems='flex-start'>
                        <Checkbox value={isRandomizedMetadata} onChange={(e) => setIsRandomizedMetadata(e.target.value)} size='sm'>
                            Randomized Metadata
                        </Checkbox>
                    </VStack>
                </Flex>
            </Wrap>
        </Flex>
    )
}

export default Configuration