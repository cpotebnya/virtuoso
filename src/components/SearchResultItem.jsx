import { useState, useEffect } from 'react';
import { Skeleton, Card, CardBody, Image, Stack, Heading, Text, Flex, Tag, HStack, LinkBox, Link } from '@chakra-ui/react'
import { getSingleArtPiece } from '../api/met-api'

function ArtPieceLoading() {
    return (
        <Skeleton height="20px" />
    )
}

function SearchResultItem({ artPieceId, onImageClick }) {
  const [artPiece, setArtPiece] = useState(null);

  useEffect(() => {
    const fetchArtPiece = async () => {
      const data = await getSingleArtPiece({ id: artPieceId })
      setArtPiece(data)
    }
    fetchArtPiece()
  }, [])

  const getArtPieceInfo = (string) => {
    return string || 'Not Available'
  }

  if(!artPiece) return <ArtPieceLoading />
  
  return (
    <>
    {artPiece?.title && <Card flex="0 1 30%" m=".5rem">
      <LinkBox as={Link} href={artPiece?.objectURL} isExternal>
        <CardBody>
          <Image
            src={artPiece?.primaryImageSmall}
            fallbackSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png'
            borderRadius='lg'
            maxH="300px"
            margin="auto"
            onClick={(e) => {
              e.preventDefault()
              if(!artPiece?.primaryImageSmall) return
              onImageClick(artPiece)
            } }
            />
            <Stack>
                <Heading size='md' paddingY="1rem">{artPiece?.title}</Heading>
                <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Object date</Heading>
                    <Text>{getArtPieceInfo(artPiece?.objectDate)}</Text>
                </Flex>
                <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Department</Heading> 
                    <Text>{getArtPieceInfo(artPiece?.department)}</Text>
                </Flex>
                <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Artist role</Heading> 
                    <Text>{getArtPieceInfo(artPiece?.artistRole)}</Text>
                </Flex>
                <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Artist name</Heading> 
                    <Text>{getArtPieceInfo(artPiece?.artistDisplayName)}</Text>
                </Flex>
                <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Artist nationality</Heading> 
                    <Text>{getArtPieceInfo(artPiece?.artistNationality)}</Text>
                </Flex>
                {artPiece?.tags?.length && 
                  <Flex justify="space-between" spacing="2px">
                    <Heading size="sm">Tags</Heading> 
                    <HStack>{artPiece?.tags.map(tag => <Tag key={tag.term}>{tag.term}</Tag>)}</HStack>
                  </Flex>
                }
            </Stack>
        </CardBody>
      </LinkBox>
    </Card>}
    </>
  )
}

export default SearchResultItem
