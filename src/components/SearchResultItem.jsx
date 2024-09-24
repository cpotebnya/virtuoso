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
                {[
                  { label: 'Object date', value: artPiece?.objectDate }, 
                  { label: 'Department', value: artPiece?.department }, 
                  { label: 'Artist role', value: artPiece?.artistRole },
                  { label: 'Artist name', value: artPiece?.artistDisplayName },
                  { label: 'Artist nationality', value: artPiece?.artistNationality }
                ].map(({ label, value }) => (
                  <Flex key={label} justify="space-between" spacing="2px">
                      <Heading size="sm">{label}</Heading>
                      <Text>{getArtPieceInfo(value)}</Text>
                  </Flex>)
                )}
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
