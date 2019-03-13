import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 8px;
`;

const TrelloCard = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom>{text}</Typography>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TrelloCard;
