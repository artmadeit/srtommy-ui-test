import { colors } from "@atlaskit/theme";
import styled from "@emotion/styled";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";
import { borderRadius, grid } from "./constants";
import QuoteList from "./quote-list";
import Title from "./title";
import type { Author } from "./types";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

interface HeaderProps {
  isDragging: boolean;
}

const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.G50};
  }
`;

interface Props {
  title: string;
  authors: Author[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
}

export default function Column({
  title,
  authors,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
}: Props) {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {title}
            </Title>
          </Header>
          <QuoteList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : undefined,
            }}
            authors={authors}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            useClone={Boolean(useClone)}
          />
        </Container>
      )}
    </Draggable>
  );
}
