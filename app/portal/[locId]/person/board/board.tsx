import styled from "@emotion/styled";
import type {
  DraggableLocation,
  DropResult,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";
import React, { useState } from "react";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import type { Quote, QuoteMap } from "./types";

interface ParentContainerProps {
  height: string;
}

const ParentContainer = styled.div<ParentContainerProps>`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

interface Props {
  initial: QuoteMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
  autoScrollerOptions?: PartialAutoScrollerOptions;
}

export default function Board({
  initial,
  autoScrollerOptions,
  isCombineEnabled = false,

  containerHeight,
  useClone,
  withScrollableColumns,
}: Props) {
  const [columns, setColumns] = useState(initial);
  const [ordered, setOrdered] = useState(Object.keys(initial));

  const onDragEnd = (result: DropResult): void => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow: string[] = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column: Quote[] = columns[result.source.droppableId];
      const withQuoteRemoved: Quote[] = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      setColumns({
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const newOrdered: string[] = reorder(
        ordered,
        source.index,
        destination.index
      );

      setOrdered(newOrdered);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });

    setColumns(data.quoteMap);
  };

  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided: DroppableProvided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {ordered.map((key: string, index: number) => (
            <Column
              key={key}
              index={index}
              title={key}
              quotes={columns[key]}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              useClone={useClone}
            />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );

  return (
    <React.Fragment>
      <DragDropContext
        onDragEnd={onDragEnd}
        autoScrollerOptions={autoScrollerOptions}
      >
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    </React.Fragment>
  );
}
