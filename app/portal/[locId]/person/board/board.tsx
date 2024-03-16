// @flow
import React, { Component, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import {
  DropResult,
  DraggableLocation,
  DroppableProvided,
  DragDropContext,
  Droppable,
} from "react-beautiful-dnd";
import type { QuoteMap, Quote } from "./types";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { colors } from "@atlaskit/theme";

const ParentContainer = styled.div`
  height: ${({ height }: { height: string }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${colors.B100};
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

type Props = {
  initial: QuoteMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
};

type State = {
  columns: QuoteMap;
  ordered: string[];
};

export default function Board({
  initial,
  containerHeight,
  useClone,
  withScrollableColumns,
  isCombineEnabled = false,
}: Props) {
  const [columns, setColumns] = useState<QuoteMap>(initial);
  const [ordered, setOrdered] = useState<string[]>(Object.keys(initial));

  let boardRef: HTMLElement;

  const onDragEnd = (result: DropResult) => {
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
      const newColumns: QuoteMap = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(newColumns);
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
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
      <Global
        styles={css`
          body {
            background: ${colors.B200};
          }
        `}
      />
    </React.Fragment>
  );
}
