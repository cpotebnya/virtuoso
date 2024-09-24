import SearchResultItem from './SearchResultItem';
import { Flex } from '@chakra-ui/react'

function SearchResults({ searchResults, maxLoadedItems, setSelectedArtPiece }) {

  return (
    <Flex wrap="wrap">
        { searchResults?.slice(0, maxLoadedItems).map(
            id => <SearchResultItem key={id} artPieceId={id} onImageClick={setSelectedArtPiece} /> 
        )}
    </Flex>
  )
}

export default SearchResults
