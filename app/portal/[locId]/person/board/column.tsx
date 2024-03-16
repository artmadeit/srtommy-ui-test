import styled from "@emotion/styled";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Quote } from "./types";
import { grid, borderRadius } from "./constants";
import Title from "./title";
import QuoteList from "./quote-list";
import { colors } from "@atlaskit/theme";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.G50};
  }
`;

type Props = {
  title: string;
  quotes: Quote[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
};

export default function Column({
  title,
  quotes,
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
              // TODO: isDragging={snapshot.isDragging}
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
              backgroundColor: snapshot.isDragging ? colors.G50 : null,
            }}
            quotes={quotes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            useClone={Boolean(useClone)}
          />
        </Container>
      )}
    </Draggable>
  );
}
