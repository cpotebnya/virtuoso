import { useEffect, useMemo, useState } from 'react';
import { Box, Input, Stack, Button, Text, Spinner } from '@chakra-ui/react'
import { Select } from "chakra-react-select";
import { getArtPieces, getArtDepartments } from '../../api/met-api'
import { ImageModal, SearchResults } from '../../components';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [artPieces, setArtPieces] = useState(null)
  const [artDepartments, setArtDepartments] = useState(null)
  const [departmentId, setDepartmentId] = useState(null)
  const [selectedArtPiece, setSelectedArtPiece] = useState(null)
  const [maxLoadedItems, setMaxLoadedItems] = useState(10)

  useEffect(() => { 
    const getDepartments = async () => {
        const { departments } = await getArtDepartments()
        const departmentOptions = departments?.map(({ departmentId, displayName }) => {
            return { label: displayName, value: departmentId }
        })
        setArtDepartments([
            {
                label: 'No preference',
                value: 0,
            },
            ...departmentOptions
        ]);
    }
    getDepartments()
  }, []);

  const fetchArtPieces = async () => {
    setIsLoading(true);
    const data = await getArtPieces({ query: searchTerm, departmentId: departmentId });
    setMaxLoadedItems(10);
    setArtPieces(data);
    setIsLoading(false);
}

const canLoadMoreResults = useMemo(() => maxLoadedItems <= artPieces?.total && artPieces && !isLoading, [maxLoadedItems, artPieces, isLoading])

  return (
    <Box paddingY="1rem">
        <Stack>
            <Input 
                placeholder="Search" 
                onChange={(e) => setSearchTerm(e.target.value)} 
                isInvalid={!searchTerm && !!departmentId}
            />
            {!searchTerm && !!departmentId && <Text fontSize="xs" color="red">Must include search term if department is selected</Text>}
            <Select
                options={artDepartments}
                onChange={({ value }) => {
                    setDepartmentId(value)
                }}
            />
            <Button onClick={fetchArtPieces} isDisabled={(!searchTerm && !!departmentId) || isLoading}>Search</Button>
        </Stack>

        Number of results: { isLoading ? <Spinner size="xs" /> : artPieces?.total }

        {artPieces?.objectIDs && !isLoading && <SearchResults searchResults={artPieces?.objectIDs} maxLoadedItems={maxLoadedItems} setSelectedArtPiece={setSelectedArtPiece} />}
        
        {canLoadMoreResults && 
            <Box marginTop="1rem">
                <Button width="100%" isDisabled={!canLoadMoreResults} onClick={() => setMaxLoadedItems(maxLoadedItems + 10)}>Load 10 more</Button>
            </Box>
        }

        <ImageModal artPiece={selectedArtPiece} onClose={() => setSelectedArtPiece(null)} />
    </Box>
  )
}

export default Home
